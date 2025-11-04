'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { BlogPosts } from '../config'
import { extractLocalizedPaths, extractLocalizedValues } from '@/lib/translationUtils'

import { GoogleGenAI, Type } from '@google/genai'

type SupportedLocale = 'hr' | 'en' | 'es' | 'de' | 'pl' | 'pt' | 'uk' | 'ru' | 'fr' | 'it'
const localeList: SupportedLocale[] = ['en', 'es', 'de', 'pl', 'pt', 'uk', 'ru', 'fr', 'it']

// Translation tracking types
interface TranslationStatus {
  locale: SupportedLocale
  success: boolean
  error?: string
  attempts: number
  duration: number
  timestamp: Date
}

interface TranslationSummary {
  totalLocales: number
  successful: number
  failed: number
  successRate: number
  totalDuration: number
  startTime: Date
  endTime: Date
  results: TranslationStatus[]
  failedLocales: SupportedLocale[]
}

export const translateBlogPostText = async (blogPostId: string) => {
  const startTime = new Date()
  const translationTracking: Map<SupportedLocale, TranslationStatus> = new Map()

  const payload = await getPayload({ config })
  const blogPost = await payload.find({
    collection: 'blogPosts',
    where: {
      id: {
        equals: blogPostId,
      },
    },
  })

  if (!blogPost.docs[0]) {
    return { error: 'BlogPost not found' }
  }

  const localizedPaths = extractLocalizedPaths(BlogPosts)
  const _translationPayload = extractLocalizedValues(blogPost.docs[0], localizedPaths)

  console.log(JSON.stringify(_translationPayload, null, 2))

  // Translate all locales in parallel
  const locales = localeList
  console.log(`\n${'='.repeat(80)}`)
  console.log(`🌍 Starting parallel translation for ${locales.length} locales (plain text)...`)
  console.log(`${'='.repeat(80)}\n`)

  const translations = await translateAllLocalesInParallelWithTracking(
    _translationPayload.map((item) => {
      return { path: item.path, value: item.value }
    }),
    locales,
    translationTracking,
  )

  // Retry failed translations
  const failedLocales = Array.from(translationTracking.values())
    .filter((s) => !s.success)
    .map((s) => s.locale)

  if (failedLocales.length > 0) {
    console.log(`\n${'='.repeat(80)}`)
    console.log(`🔄 Retrying ${failedLocales.length} failed translation(s)...`)
    console.log(`${'='.repeat(80)}\n`)

    const retryTranslations = await translateAllLocalesInParallelWithTracking(
      _translationPayload.map((item) => {
        return { path: item.path, value: item.value }
      }),
      failedLocales,
      translationTracking,
      true, // isRetry
    )

    // Merge retry results with original translations
    for (const retryTranslation of retryTranslations) {
      if (retryTranslation && retryTranslation.success) {
        const originalIndex = translations.findIndex((t) => t.locale === retryTranslation.locale)
        if (originalIndex >= 0) {
          translations[originalIndex] = retryTranslation
        } else {
          translations.push(retryTranslation)
        }
      }
    }
  }

  // Create and update translated blogPosts in payload
  const validTranslations = translations.filter((t) => t && t.success)
  const result = await createAndUpdateTranslatedBlogPosts(blogPostId, validTranslations)

  // Generate and print detailed summary
  const summary = generateTranslationSummary(translationTracking, startTime)
  printTranslationSummary(summary)

  return {
    ...result,
    summary: summary,
  }
}

const translateAllLocalesInParallelWithTracking = async (
  text: { path: string; value: string }[],
  locales: SupportedLocale[],
  tracking: Map<SupportedLocale, TranslationStatus>,
  isRetry: boolean = false,
) => {
  const translationPromises = locales.map((locale) => {
    const attemptNum = tracking.has(locale) ? tracking.get(locale)!.attempts + 1 : 1
    console.log(
      `${isRetry ? '🔄' : '📝'} [${locale}] Queuing translation (attempt ${attemptNum})...`,
    )
    return translateTextWithTracking(text, locale, tracking)
  })

  const results = await Promise.allSettled(translationPromises)

  // Process results
  const translations: Array<{
    locale: string
    translations: {
      path: string
      value: string
    }[]
    success: boolean
  }> = []
  results.forEach((result, index) => {
    const locale = locales[index]
    if (result.status === 'fulfilled') {
      console.log(`[RESULT] ${locale}: fulfilled with value`)
      translations.push(result.value)
    } else {
      const reason = result.reason
      const reasonMsg = reason instanceof Error ? reason.message : String(reason)
      console.error(`[RESULT] ${locale}: rejected - ${reasonMsg}`)

      if (!tracking.has(locale)) {
        console.log(`[TRACKING] Creating new failed entry for ${locale}`)
        tracking.set(locale, {
          locale,
          success: false,
          error: reasonMsg,
          attempts: 1,
          duration: 0,
          timestamp: new Date(),
        })
      } else {
        console.log(`[TRACKING] Updating existing entry for ${locale} to failed`)
        const status = tracking.get(locale)!
        status.success = false
        status.error = reasonMsg
        status.attempts += 1
      }
    }
  })

  console.log(`✅ Completed attempt for ${translations.length}/${locales.length} locales`)
  return translations
}

const translateTextWithTracking = async (
  text: { path: string; value: string }[],
  locale: string,
  tracking: Map<SupportedLocale, TranslationStatus>,
) => {
  const startTime = Date.now()

  try {
    const result = await translateText(text, locale)

    const duration = Date.now() - startTime
    tracking.set(locale as SupportedLocale, {
      locale: locale as SupportedLocale,
      success: true,
      attempts: tracking.has(locale as SupportedLocale)
        ? tracking.get(locale as SupportedLocale)!.attempts + 1
        : 1,
      duration,
      timestamp: new Date(),
    })

    console.log(`✅ [${locale}] Translation successful (${duration}ms)`)
    return result
  } catch (error) {
    const duration = Date.now() - startTime
    const errorMsg = error instanceof Error ? error.message : String(error)

    console.error(`❌ [${locale}] Translation failed (caught): ${errorMsg}`)

    tracking.set(locale as SupportedLocale, {
      locale: locale as SupportedLocale,
      success: false,
      error: errorMsg,
      attempts: tracking.has(locale as SupportedLocale)
        ? tracking.get(locale as SupportedLocale)!.attempts + 1
        : 1,
      duration,
      timestamp: new Date(),
    })

    console.error(`❌ [${locale}] Translation failed (duration: ${duration}ms)`)
    throw error
  }
}

const generateTranslationSummary = (
  tracking: Map<SupportedLocale, TranslationStatus>,
  startTime: Date,
): TranslationSummary => {
  const endTime = new Date()
  const results = Array.from(tracking.values())
  const successful = results.filter((r) => r.success).length
  const failed = results.filter((r) => !r.success).length
  const failedLocales = results.filter((r) => !r.success).map((r) => r.locale)
  const totalDuration = endTime.getTime() - startTime.getTime()

  return {
    totalLocales: results.length,
    successful,
    failed,
    successRate: results.length > 0 ? (successful / results.length) * 100 : 0,
    totalDuration,
    startTime,
    endTime,
    results: results.sort((a, b) => a.locale.localeCompare(b.locale)),
    failedLocales,
  }
}

const printTranslationSummary = (summary: TranslationSummary) => {
  console.log(`\n${'='.repeat(80)}`)
  console.log(`📊 TRANSLATION SUMMARY (Plain Text)`)
  console.log(`${'='.repeat(80)}`)

  console.log(`\n📈 Overall Statistics:`)
  console.log(`   Total Locales:     ${summary.totalLocales}`)
  console.log(`   ✅ Successful:     ${summary.successful}`)
  console.log(`   ❌ Failed:         ${summary.failed}`)
  console.log(`   Success Rate:      ${summary.successRate.toFixed(2)}%`)
  console.log(`   Total Duration:    ${(summary.totalDuration / 1000).toFixed(2)}s`)

  console.log(`\n⏱️  Timeline:`)
  console.log(`   Started:           ${summary.startTime.toISOString()}`)
  console.log(`   Ended:             ${summary.endTime.toISOString()}`)

  console.log(`\n📋 Details by Language:`)
  const header = `   ${'Language'.padEnd(12)} ${'Status'.padEnd(12)} ${'Attempts'.padEnd(12)} ${'Duration'.padEnd(12)}`
  console.log(header)
  console.log(`   ${'-'.repeat(50)}`)

  summary.results.forEach((result) => {
    const status = result.success ? '✅ Success' : '❌ Failed'
    const duration = `${result.duration}ms`
    const line = `   ${result.locale.padEnd(12)} ${status.padEnd(12)} ${String(result.attempts).padEnd(12)} ${duration.padEnd(12)}`
    console.log(line)
    if (result.error) {
      console.log(`      └─ Error: ${result.error}`)
    }
  })

  if (summary.failedLocales.length > 0) {
    console.log(`\n⚠️  Failed Languages: ${summary.failedLocales.join(', ')}`)
  }

  console.log(`\n${'='.repeat(80)}\n`)
}

const translateText = async (text: { path: string; value: string }[], locale: string) => {
  const google = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  })

  const response = await google.models.generateContent({
    model: 'gemini-2.5-flash',
    contents:
      `Translate the following text to ${locale}\n` +
      `Do not change the formatting of the text, only the text itself.\n` +
      `Do not add any additional text to the response.\n` +
      `Do not escape the backslash characters.\n` +
      `${JSON.stringify(text, null, 2)}`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ['locale', 'translations'],
        properties: {
          locale: {
            type: Type.STRING,
          },
          translations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ['path', 'value'],
              properties: {
                path: {
                  type: Type.STRING,
                },
                value: {
                  type: Type.STRING,
                },
              },
            },
          },
        },
      },
    },
  })

  const textResponse = response.text

  const jsonResponse = JSON.parse(textResponse)

  console.log(JSON.stringify(jsonResponse, null, 2))

  const localeTranslations: {
    path: string
    value: string
  }[] = []

  if (jsonResponse.translations && Array.isArray(jsonResponse.translations)) {
    for (const translation of jsonResponse.translations) {
      localeTranslations.push({
        path: translation.path,
        value: translation.value,
      })
    }
  }

  return {
    locale: jsonResponse.locale || locale,
    translations: localeTranslations,
    success: true,
  }
}

// Helper function to set nested object property
function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.')
  let current: Record<string, unknown> = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]

    // Check if the next key is a numeric index
    if (!isNaN(Number(nextKey))) {
      // Ensure the current property is an array
      if (!Array.isArray(current[key])) {
        current[key] = []
      }

      const arrayIndex = Number(nextKey)
      const array = current[key] as Record<string, unknown>[]

      // Ensure the array has enough elements
      while (array.length <= arrayIndex) {
        array.push({})
      }

      current = array[arrayIndex]
      i++ // Skip the next key since we've handled it as an array index
    } else {
      // Regular object property
      if (!(key in current)) {
        current[key] = {}
      }
      current = current[key] as Record<string, unknown>
    }
  }

  current[keys[keys.length - 1]] = value
}

/**
 * Process richText content to replace MediaBlock media field objects with their IDs
 * This is necessary because MediaBlocks should store only the media ID, not the full object
 */
function processMediaBlocksInRichText(richText: unknown): unknown {
  if (!richText || typeof richText !== 'object') {
    return richText
  }

  const processedRichText = JSON.parse(JSON.stringify(richText)) as unknown as Record<
    string,
    unknown
  >

  // Process root-level nodes
  if (processedRichText.root && typeof processedRichText.root === 'object') {
    const root = processedRichText.root as Record<string, unknown>
    if (Array.isArray(root.children)) {
      root.children = (root.children as unknown[]).map((node) => {
        return processNodeForMediaBlocks(node as Record<string, unknown>)
      })
    }
  }

  return processedRichText
}

/**
 * Recursively process a node and its children to replace MediaBlock media objects with IDs
 */
function processNodeForMediaBlocks(node: Record<string, unknown>): Record<string, unknown> {
  const processedNode = { ...node }

  // Check if this is a MediaBlock
  if (processedNode.type === 'block' && processedNode.fields) {
    const fields = processedNode.fields as Record<string, unknown>
    if (fields.blockType === 'MediaBlock' && fields.media) {
      const media = fields.media as Record<string, unknown>
      // Replace the entire media object with just the ID
      if (typeof media.id !== 'undefined') {
        fields.media = media.id
      }
    }
  }

  // Recursively process children if they exist
  if (Array.isArray(processedNode.children)) {
    processedNode.children = (processedNode.children as Record<string, unknown>[]).map((child) =>
      processNodeForMediaBlocks(child),
    )
  }

  return processedNode
}

/**
 * Recursively process all fields in an object to find and process richText with MediaBlocks
 */
function processMediaBlocksInBlogPost(obj: unknown, visited = new WeakSet()): unknown {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj !== 'object') {
    return obj
  }

  // Avoid infinite loops with circular references
  if (visited.has(obj as object)) {
    return obj
  }
  visited.add(obj as object)

  if (Array.isArray(obj)) {
    return obj.map((item) => processMediaBlocksInBlogPost(item, visited))
  }

  const processed: Record<string, unknown> = {}
  const record = obj as Record<string, unknown>

  for (const [key, value] of Object.entries(record)) {
    // Check if this is a richText field (has root.children structure)
    if (
      value &&
      typeof value === 'object' &&
      'root' in value &&
      typeof (value as Record<string, unknown>).root === 'object'
    ) {
      processed[key] = processMediaBlocksInRichText(value)
    } else if (Array.isArray(value)) {
      processed[key] = value.map((item) => processMediaBlocksInBlogPost(item, visited))
    } else if (typeof value === 'object') {
      processed[key] = processMediaBlocksInBlogPost(value, visited)
    } else {
      processed[key] = value
    }
  }

  return processed
}

// Helper function to generate a random MongoDB ObjectId-like ID
function generateRandomId(): string {
  const chars = '0123456789abcdef'
  let id = ''
  for (let i = 0; i < 24; i++) {
    id += chars[Math.floor(Math.random() * 16)]
  }
  return id
}

// Helper function to find all link fields nested inside 'root' and regenerate their IDs
function regenerateLinkIds(obj: unknown, visited = new WeakSet()): unknown {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj !== 'object') {
    return obj
  }

  // Avoid infinite loops with circular references
  if (visited.has(obj as object)) {
    return obj
  }
  visited.add(obj as object)

  if (Array.isArray(obj)) {
    return obj.map((item) => {
      // Check if this is a link field object (has a 'link' property and an 'id' property)
      if (
        item &&
        typeof item === 'object' &&
        'link' in item &&
        typeof (item as Record<string, unknown>).link === 'object' &&
        'id' in item
      ) {
        // Regenerate the ID for this link
        return {
          ...item,
          id: generateRandomId(),
        }
      }
      // Recursively process nested structures
      return regenerateLinkIds(item, visited)
    })
  }

  const processed: Record<string, unknown> = {}
  const record = obj as Record<string, unknown>

  for (const [key, value] of Object.entries(record)) {
    // Only regenerate link IDs if we're inside a 'root' object
    if (key === 'root' && value && typeof value === 'object') {
      processed[key] = regenerateLinkIdsInRoot(value, visited)
    } else {
      processed[key] = regenerateLinkIds(value, visited)
    }
  }

  return processed
}

// Helper function to regenerate link IDs only within a root object
function regenerateLinkIdsInRoot(obj: unknown, visited = new WeakSet()): unknown {
  if (obj === null || obj === undefined) {
    return obj
  }

  if (typeof obj !== 'object') {
    return obj
  }

  // Avoid infinite loops with circular references
  if (visited.has(obj as object)) {
    return obj
  }
  visited.add(obj as object)

  if (Array.isArray(obj)) {
    return obj.map((item) => {
      // Check if this is a link field object (has a 'link' property and an 'id' property)
      if (
        item &&
        typeof item === 'object' &&
        'link' in item &&
        typeof (item as Record<string, unknown>).link === 'object' &&
        'id' in item
      ) {
        // Regenerate the ID for this link
        return {
          ...item,
          id: generateRandomId(),
        }
      }
      // Recursively process nested structures
      return regenerateLinkIdsInRoot(item, visited)
    })
  }

  const processed: Record<string, unknown> = {}
  const record = obj as Record<string, unknown>

  for (const [key, value] of Object.entries(record)) {
    processed[key] = regenerateLinkIdsInRoot(value, visited)
  }

  return processed
}

export const createAndUpdateTranslatedBlogPosts = async (
  originalBlogPostId: string,
  translationsData: {
    locale: string
    translations: {
      path: string
      value: string
    }[]
  }[],
) => {
  const payload = await getPayload({ config })

  // Get the original blogPost
  const originalBlogPostResult = await payload.find({
    collection: 'blogPosts',
    where: {
      id: {
        equals: originalBlogPostId,
      },
    },
  })

  if (!originalBlogPostResult.docs[0]) {
    return { error: 'Original blogPost not found' }
  }

  const originalBlogPost = originalBlogPostResult.docs[0] as unknown as Record<string, unknown>

  // Create or update blogPosts for each locale
  for (const localeTranslation of translationsData) {
    const locale = localeTranslation.locale as SupportedLocale

    // Create a deep copy of the original blogPost for this locale
    const translatedBlogPost: Record<string, unknown> = JSON.parse(JSON.stringify(originalBlogPost))

    // Remove the id and Payload metadata fields so we can create a new document
    delete translatedBlogPost.id
    delete translatedBlogPost.createdAt
    delete translatedBlogPost.updatedAt

    // Apply translations to the blogPost
    for (const translation of localeTranslation.translations) {
      setNestedValue(translatedBlogPost, translation.path, translation.value)
    }

    // Process MediaBlocks in richText fields
    const processedBlogPost = processMediaBlocksInBlogPost(translatedBlogPost) as Record<
      string,
      unknown
    >

    // Regenerate IDs for all link fields
    const blogPostWithNewLinkIds = regenerateLinkIds(processedBlogPost) as Record<string, unknown>

    console.dir(blogPostWithNewLinkIds, { depth: null })

    try {
      // Check if a blogPost with this slug already exists for this locale
      const existingBlogPostResult = await payload.find({
        collection: 'blogPosts',
        where: {
          slug: {
            equals: blogPostWithNewLinkIds.slug as string,
          },
        },
        locale: locale,
      })

      if (existingBlogPostResult.docs[0]) {
        // Update existing blogPost
        await payload.update({
          collection: 'blogPosts',
          id: existingBlogPostResult.docs[0].id,
          data: blogPostWithNewLinkIds as never,
          locale: locale,
        })
        console.log(`Updated blogPost for locale: ${locale}`)
      } else {
        // Create new blogPost
        await payload.create({
          collection: 'blogPosts',
          data: blogPostWithNewLinkIds as never,
          locale: locale,
        })
        console.log(`Created new blogPost for locale: ${locale}`)
      }
    } catch (error) {
      console.dir(error, { depth: null })
      throw error
    }
  }

  return { success: true, message: 'All translated blogPosts created/updated successfully' }
}

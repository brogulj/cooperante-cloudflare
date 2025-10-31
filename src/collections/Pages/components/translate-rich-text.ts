'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { Pages } from '../config'
import { extractLocalizedPaths, extractLocalizedValues } from '@/lib/translationUtils'

import {
  extractLocalizedPaths as extractRichTextLocalizedPaths,
  extractLocalizedValues as extractRichTextLocalizedValues,
} from '@/lib/richTextTranslationUtils'
// import { extractPageTextForTranslation } from '@/lib/translationUtils'

import { GoogleGenAI, Type } from '@google/genai'
import {
  BlocksFeature,
  BoldFeature,
  convertMarkdownToLexical,
  DefaultNodeTypes,
  editorConfigFactory,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { CTABlock } from '@/blocks/CTABlock/config'

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

export const translatePageRichText = async (pageId: string) => {
  const startTime = new Date()
  const translationTracking: Map<SupportedLocale, TranslationStatus> = new Map()

  const payload = await getPayload({ config })
  const page = await payload.find({
    collection: 'pages',
    where: {
      id: {
        equals: pageId,
      },
    },
  })

  if (!page.docs[0]) {
    return { error: 'Page not found' }
  }

  const localizedPaths = extractLocalizedPaths(Pages)
  const _translationPayload = extractLocalizedValues(page.docs[0], localizedPaths)

  const richTextLocalizedPaths = extractRichTextLocalizedPaths(Pages)
  const [richText] = await extractRichTextLocalizedValues(
    page.docs[0] as unknown as Record<string, unknown>,
    richTextLocalizedPaths,
  )

  console.log(JSON.stringify(richText, null, 2))

  // Translate all locales in parallel
  const locales = localeList
  console.log(`\n${'='.repeat(80)}`)
  console.log(`🌍 Starting parallel translation for ${locales.length} locales...`)
  console.log(`${'='.repeat(80)}\n`)

  const translations = await translateAllLocalesInParallelWithTracking(
    richText,
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
      richText,
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

  // Create and update translated pages in payload
  const validTranslations = translations.filter((t) => t && t.success)
  const result = await createAndUpdateTranslatedPages(pageId, validTranslations)

  // Generate and print detailed summary
  const summary = generateTranslationSummary(translationTracking, startTime)
  printTranslationSummary(summary)

  return {
    ...result,
    summary: summary,
  }
}

const translateAllLocalesInParallelWithTracking = async (
  markdown: Record<string, unknown>,
  locales: SupportedLocale[],
  tracking: Map<SupportedLocale, TranslationStatus>,
  isRetry: boolean = false,
) => {
  const translationPromises = locales.map((locale) => {
    const attemptNum = tracking.has(locale) ? tracking.get(locale)!.attempts + 1 : 1
    console.log(
      `${isRetry ? '🔄' : '📝'} [${locale}] Queuing translation (attempt ${attemptNum})...`,
    )
    return translateMarkdownWithTracking(markdown, locale, tracking)
  })

  const results = await Promise.allSettled(translationPromises)

  // Process results
  const translations: Array<{
    locale: string
    translations: {
      path: string
      richText: SerializedEditorState<DefaultNodeTypes>
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

const translateMarkdownWithTracking = async (
  markdown: Record<string, unknown>,
  locale: string,
  tracking: Map<SupportedLocale, TranslationStatus>,
) => {
  const startTime = Date.now()

  try {
    const result = await translateMarkdown(markdown, locale)

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
  console.log(`📊 TRANSLATION SUMMARY`)
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

const translateMarkdown = async (markdown: Record<string, unknown>, locale: string) => {
  const google = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
  })

  const response = await google.models.generateContent({
    model: 'gemini-2.5-flash',
    contents:
      `Translate the following text to ${locale}\n` +
      `Do not change the formatting of the text, only the text itself.\n` +
      `Do not add any additional text to the response.\n` +
      `Do not touch the <MediaBlock> tags or change anything inside them.\n` +
      `You can change label of the links, but not the URL.\n` +
      `Do not escape the backslash characters.\n` +
      `Preserve all the \\n and \\r\\n characters in the text.\n` +
      `${JSON.stringify(markdown, null, 2)}`,
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
              required: ['path', 'text'],
              properties: {
                path: {
                  type: Type.STRING,
                },
                text: {
                  type: Type.STRING,
                },
              },
            },
          },
        },
      },
    },
  })

  const payload = await getPayload({ config })

  // Create the editor config using editorConfigFactory.fromFeatures
  const editorConfig = await editorConfigFactory.fromFeatures({
    config: payload.config,
    features: [
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      ParagraphFeature(),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      LinkFeature(),
      HorizontalRuleFeature(),
      BlocksFeature({ blocks: [MediaBlock, CTABlock] }),
    ],
  })

  const textResponse = response.text

  const jsonResponse = JSON.parse(textResponse)

  console.log(JSON.stringify(jsonResponse, null, 2))

  const localeTranslations: {
    path: string
    richText: SerializedEditorState<DefaultNodeTypes>
  }[] = []

  if (jsonResponse.translations && Array.isArray(jsonResponse.translations)) {
    for (const translation of jsonResponse.translations) {
      // Normalize escaped newlines to actual newlines
      const normalizedMarkdown = normalizeMarkdown(translation.text)

      try {
        const richText = convertMarkdownToLexical({
          markdown: normalizedMarkdown,
          editorConfig: editorConfig,
        })
        localeTranslations.push({
          path: translation.path,
          richText: richText,
        })
      } catch (parseError) {
        console.error(
          `Failed to parse markdown for path ${translation.path}:`,
          parseError instanceof Error ? parseError.message : String(parseError),
        )
        // Log the problematic markdown for debugging
        console.log(`Problematic markdown:\n${normalizedMarkdown}`)
        throw new Error(`Failed to parse translation for path ${translation.path}`)
      }
    }
  }

  return {
    locale: jsonResponse.locale || locale,
    translations: localeTranslations,
    success: true,
  }
}

/**
 * Normalize markdown by converting escaped newlines to actual newlines
 * This handles cases where AI returns \\n instead of \n
 */
const normalizeMarkdown = (markdown: string): string => {
  // Replace escaped newlines \\n with actual newlines
  let normalized = markdown.replace(/\\n/g, '\n')

  // Also handle \\r\\n -> \n (escaped CRLF)
  normalized = normalized.replace(/\\r\\n/g, '\n')

  // Handle any remaining escaped backslashes
  normalized = normalized.replace(/\\\\/g, '\\')

  return normalized
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

export const createAndUpdateTranslatedPages = async (
  originalPageId: string,
  translationsData: {
    locale: string
    translations: {
      path: string
      richText: SerializedEditorState<DefaultNodeTypes>
    }[]
  }[],
) => {
  const payload = await getPayload({ config })

  // Create or update pages for each locale
  for (const localeTranslation of translationsData) {
    const locale = localeTranslation.locale as SupportedLocale

    // Create a deep copy of the original page for this locale

    const localizedPage = await payload.find({
      collection: 'pages',
      where: {
        id: {
          equals: originalPageId,
        },
      },
      locale: locale,
    })

    if (!localizedPage.docs[0]) {
      return { error: 'Localized page not found' }
    }

    const translatedPage: Record<string, unknown> = JSON.parse(
      JSON.stringify(localizedPage.docs[0]),
    )

    // Remove the id and Payload metadata fields so we can create a new document
    delete translatedPage.id
    delete translatedPage.createdAt
    delete translatedPage.updatedAt

    // Apply translations to the page
    for (const translation of localeTranslation.translations) {
      setNestedValue(translatedPage, translation.path, translation.richText)
    }

    try {
      // Check if a page with this slug already exists for this locale
      const existingPageResult = await payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: translatedPage.slug as string,
          },
        },
        locale: locale,
      })

      if (existingPageResult.docs[0]) {
        // Update existing page
        await payload.update({
          collection: 'pages',
          id: existingPageResult.docs[0].id,
          data: translatedPage as never,
          locale: locale,
        })
        console.log(`Updated page for locale: ${locale}`)
        console.dir(translatedPage, { depth: null })
      } else {
        // Create new page
        await payload.create({
          collection: 'pages',
          data: translatedPage as never,
          locale: locale,
        })
        console.log(`Created new page for locale: ${locale}`)
      }
    } catch (error) {
      console.dir(error, { depth: null })
      throw error
    }
  }

  return { success: true, message: 'All translated pages created/updated successfully' }
}

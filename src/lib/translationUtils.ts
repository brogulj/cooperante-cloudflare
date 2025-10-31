import {
  CollectionConfig,
  Field,
  ArrayField,
  GroupField,
  BlocksField,
  TabsField,
  RowField,
  CollapsibleField,
  FieldWithSubFields,
} from 'payload'

// --- 1. CORE TYPES ---

type DataField = Field & { name: string }
export type TranslationItem = {
  path: string
  value: string
}

// --- 2. TYPE GUARDS ---

function isDataField(field: Field): field is DataField {
  return 'name' in field
}

function isLocalizableDataField(field: DataField): field is DataField & { localized: boolean } {
  return 'localized' in field
}

function isPathThroughField(field: Field): field is RowField | CollapsibleField {
  return field.type === 'row' || field.type === 'collapsible'
}

// ======================================================================================

// --- 3. PATH EXTRACTION LOGIC (Simplified: only text and textarea) ---

function findLocalizedTextPaths(
  fields: Field[],
  currentPath: (string | number)[] = [],
  localizedPaths: string[][] = [],
): string[][] {
  fields.forEach((field) => {
    if (isPathThroughField(field)) {
      findLocalizedTextPaths(field.fields, currentPath, localizedPaths)
      return
    }

    if (field.type === 'tabs') {
      const tabsField = field as TabsField
      tabsField.tabs.forEach((tab) => {
        if ('fields' in tab && Array.isArray(tab.fields)) {
          findLocalizedTextPaths(tab.fields, currentPath, localizedPaths)
        }
      })
      return
    }

    if (!isDataField(field)) {
      return
    }

    const fieldName = String(field.name)
    const newPath = [...currentPath, fieldName]

    // --- A. Direct Match Check (NOW ONLY TEXT AND TEXTAREA) ---
    const textTypes = ['text', 'textarea', 'email']

    if (isLocalizableDataField(field) && field.localized === true) {
      if (textTypes.includes(field.type)) {
        localizedPaths.push(newPath.map((p) => String(p)))
      }
    }

    // --- B. Nested Field Traversal ---
    switch (field.type) {
      case 'group':
        const groupField = field as GroupField
        if (groupField.fields) {
          findLocalizedTextPaths(groupField.fields, newPath, localizedPaths)
        }
        break

      case 'array':
        const arrayField = field as ArrayField
        if (arrayField.fields) {
          findLocalizedTextPaths(arrayField.fields, newPath, localizedPaths)
        }
        break

      case 'blocks':
        const blocksField = field as BlocksField
        if (blocksField.blocks) {
          blocksField.blocks.forEach((block) => {
            const blockPath = [...newPath, block.slug]
            findLocalizedTextPaths(block.fields, blockPath, localizedPaths)
          })
        }
        break

      default:
        break
    }
  })

  return localizedPaths
}

export const extractLocalizedPaths = (config: CollectionConfig): string[][] => {
  return findLocalizedTextPaths(config.fields)
}

// ======================================================================================

// --- 4. VALUE EXTRACTION LOGIC (NO richText HANDLING) ---

/**
 * Recursively extracts values from a document segment based on the configuration path.
 */
function deepGetValue(
  currentDocSegment: any,
  configPathSegments: string[],
  docPathSegments: string[],
  results: TranslationItem[],
): void {
  // 🛑 BASE CASE: If no more config segments, we should have the final value/data.
  if (configPathSegments.length === 0) {
    // 1. Handle simple string fields (text, textarea, email)
    if (typeof currentDocSegment === 'string' && currentDocSegment.trim().length > 0) {
      results.push({
        path: docPathSegments.join('.'),
        value: currentDocSegment,
      })
    }
    // NOTE: RichText JSON structure check removed here
    return
  }

  if (!currentDocSegment || typeof currentDocSegment !== 'object') {
    return
  }

  const [currentConfigSegment, ...remainingConfigSegments] = configPathSegments

  // 1. Array or Blocks Traversal (When the current segment is an array)
  if (Array.isArray(currentDocSegment)) {
    currentDocSegment.forEach((item, index) => {
      const newDocPath = [...docPathSegments, index.toString()]

      // --- Block Handling Check ---
      if (item && item.blockType) {
        // If the item is a block, the config segment *must* match the block slug to continue
        if (currentConfigSegment === item.blockType) {
          // We found the correct block type. The next config segments
          // (e.g., ['title']) are fields *within* this item.
          deepGetValue(item, remainingConfigSegments, newDocPath, results)
        }
      }
      // --- Standard Array Item Handling ---
      else {
        // Standard Array Item (e.g., Group field inside an Array field)
        const nextDocSegment = item[currentConfigSegment]

        if (nextDocSegment !== undefined) {
          deepGetValue(
            nextDocSegment,
            remainingConfigSegments,
            [...newDocPath, currentConfigSegment],
            results,
          )
        }
      }
    })
  }
  // 2. Standard Object (Group/Top-Level Field) Traversal
  else {
    const nextDocSegment = currentDocSegment[currentConfigSegment]

    if (nextDocSegment !== undefined) {
      const newDocPath = [...docPathSegments, currentConfigSegment]

      deepGetValue(nextDocSegment, remainingConfigSegments, newDocPath, results)
    }
  }
}

export function extractLocalizedValues(
  documentData: any,
  localizedPaths: string[][],
): TranslationItem[] {
  const results: TranslationItem[] = []

  localizedPaths.forEach((configPath) => {
    const [firstSegment, ...restSegments] = configPath

    const initialDocSegment = documentData[firstSegment]

    if (initialDocSegment === undefined || initialDocSegment === null) {
      return
    }

    // --- Array/Blocks Field Starter Logic ---
    if (Array.isArray(initialDocSegment)) {
      initialDocSegment.forEach((item, index) => {
        const newDocPath = [firstSegment, index.toString()]

        if (item && item.blockType) {
          const blockSlug = restSegments[0]
          const blockFieldsPath = restSegments.slice(1)

          if (blockSlug === item.blockType) {
            deepGetValue(item, blockFieldsPath, newDocPath, results)
          }
        } else {
          deepGetValue(item, restSegments, newDocPath, results)
        }
      })
    }
    // --- Simple Field or Group Starter Logic ---
    else {
      deepGetValue(initialDocSegment, restSegments, [firstSegment], results)
    }
  })

  return results
}

// ======================================================================================

// --- 5. PARALLEL TRANSLATION UTILITIES ---

export interface ParallelTranslationOptions {
  maxConcurrent?: number
  retryAttempts?: number
  retryDelayMs?: number
}

/**
 * Executes async translation tasks in parallel with optional concurrency control and retries
 */
export async function executeParallelTranslations<T>(
  items: T[],
  translationFn: (item: T, index: number) => Promise<any>,
  options: ParallelTranslationOptions = {},
): Promise<any[]> {
  const { maxConcurrent = Infinity, retryAttempts = 3, retryDelayMs = 1000 } = options

  const results: any[] = new Array(items.length)
  const executing: Promise<void>[] = []

  for (let i = 0; i < items.length; i++) {
    const executeWithRetry = async (): Promise<void> => {
      let lastError: Error | null = null

      for (let attempt = 1; attempt <= retryAttempts; attempt++) {
        try {
          console.log(
            `[${new Date().toISOString()}] Processing item ${i + 1}/${items.length} (attempt ${attempt}/${retryAttempts})`,
          )
          results[i] = await translationFn(items[i], i)
          return
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error))
          if (attempt < retryAttempts) {
            const delay = retryDelayMs * attempt
            console.warn(
              `  ⚠️  Attempt ${attempt} failed, retrying in ${delay}ms...`,
              lastError.message,
            )
            await new Promise((resolve) => setTimeout(resolve, delay))
          }
        }
      }

      throw new Error(`Failed after ${retryAttempts} attempts for item ${i}: ${lastError?.message}`)
    }

    const promise = executeWithRetry().catch((error) => {
      console.error(`❌ Error processing item ${i + 1}/${items.length}:`, error.message)
      throw error
    })

    executing.push(promise)

    // Control concurrency
    if (executing.length >= maxConcurrent) {
      await Promise.race(executing)
      // Remove the first finished promise from the executing array
      // This handles concurrency correctly for ongoing tasks
      executing.splice(
        executing.findIndex((p) => p === Promise.race(executing)),
        1,
      )
    }
  }
  await Promise.all(executing)
  return results
}

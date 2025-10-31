import { MediaBlock } from '@/blocks/MediaBlock/config'
import {
  BlocksFeature,
  BoldFeature,
  convertLexicalToMarkdown,
  convertMarkdownToLexical,
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
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  CollectionConfig,
  Field,
  ArrayField,
  GroupField,
  BlocksField,
  TabsField,
  RowField,
  CollapsibleField,
} from 'payload'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { CTABlock } from '@/blocks/CTABlock/config'

// --- 1. CORE TYPES ---

type DataField = Field & { name: string }
export type TranslationItem = {
  path: string
  value: unknown
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

// --- 3. PATH EXTRACTION LOGIC (target richText fields) ---

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

    // --- A. Direct Match Check (richText only) ---
    const textTypes = ['richText']

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

// --- 4. VALUE EXTRACTION LOGIC (return raw richText content) ---

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Recursively extracts values from a document segment based on the configuration path.
 */
function deepGetValue(
  currentDocSegment: unknown,
  configPathSegments: string[],
  docPathSegments: string[],
  results: TranslationItem[],
): void {
  // 🛑 BASE CASE: If no more config segments, we should have the final value/data.
  if (configPathSegments.length === 0) {
    const value = currentDocSegment
    if (value !== undefined && value !== null) {
      results.push({ path: docPathSegments.join('.'), value })
    }
    return
  }

  const [currentConfigSegment, ...remainingConfigSegments] = configPathSegments

  // 1. Array or Blocks Traversal (When the current segment is an array)
  if (Array.isArray(currentDocSegment)) {
    currentDocSegment.forEach((item, index) => {
      const newDocPath = [...docPathSegments, index.toString()]

      // --- Block Handling Check ---
      if (isRecord(item) && typeof item['blockType'] === 'string') {
        // If the item is a block, the config segment *must* match the block slug to continue
        if (currentConfigSegment === item['blockType']) {
          // We found the correct block type. The next config segments
          // (e.g., ['title']) are fields *within* this item.
          deepGetValue(item, remainingConfigSegments, newDocPath, results)
        }
      }
      // --- Standard Array Item Handling ---
      else {
        // Standard Array Item (e.g., Group field inside an Array field)
        const nextDocSegment = isRecord(item) ? item[currentConfigSegment] : undefined

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
    if (!isRecord(currentDocSegment)) {
      return
    }
    const nextDocSegment = currentDocSegment[currentConfigSegment]

    if (nextDocSegment !== undefined) {
      const newDocPath = [...docPathSegments, currentConfigSegment]

      deepGetValue(nextDocSegment, remainingConfigSegments, newDocPath, results)
    }
  }
}

export async function extractLocalizedValues(
  documentData: Record<string, unknown>,
  localizedPaths: string[][],
): Promise<[Record<string, unknown>, string[]]> {
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

  // Get the payload instance to access the sanitized config
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

  const markdownObject: Record<string, string> = {}

  for (const t of results) {
    const markdown = await convertLexicalToMarkdown({
      data: t.value as SerializedEditorState,
      editorConfig: editorConfig,
    })

    const reconverted = convertMarkdownToLexical({
      markdown: markdown,
      editorConfig: editorConfig,
    })
    markdownObject[t.path] = markdown
  }

  return [markdownObject, Object.values(markdownObject)]
}

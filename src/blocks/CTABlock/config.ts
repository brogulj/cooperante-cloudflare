import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

/**
 * Decode HTML entities in a string
 * Converts &quot; to ", &amp; to &, etc.
 */
function decodeHtmlEntities(text: string): string {
  const map: Record<string, string> = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&#39;': "'",
  }
  let decoded = text
  for (const [entity, char] of Object.entries(map)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char)
  }
  return decoded
}

export const CTABlock: Block = {
  slug: 'CTABlock',
  interfaceName: 'CTABlock',
  labels: {
    singular: {
      en: 'CTA Block',
      hr: 'CTA Blok',
    },
    plural: {
      en: 'CTA Blocks',
      hr: 'CTA Blokovi',
    },
  },
  fields: [
    {
      name: 'dark',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'title',
      label: {
        en: 'Title',
        hr: 'Naslov',
      },
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'subtitle',
      label: {
        en: 'Subtitle',
        hr: 'Podnaslov',
      },
      type: 'text',
      localized: true,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        label: {
          en: 'Buttons',
          hr: 'Gumbi',
        },
      },
    }),
  ],
  jsx: {
    /**
     * Convert from Lexical -> MDX:
     */
    export: ({ fields }) => {
      const props: Record<string, string | unknown> = {}

      if (fields.dark !== undefined) {
        props.dark = fields.dark
      }

      if (fields.title) {
        props.title = fields.title
      }

      if (fields.subtitle) {
        props.subtitle = fields.subtitle
      }

      if (fields.links) {
        props.links = JSON.stringify(fields.links)
      }

      if (fields.id) {
        props.id = fields.id
      }

      if (fields.blockName) {
        props.blockName = fields.blockName
      }

      if (fields.blockType) {
        props.blockType = fields.blockType
      }

      return {
        props,
      }
    },
    /**
     * Convert from MDX -> Lexical:
     */
    import: ({ props }) => {
      let links = undefined

      // Parse the links JSON if it exists
      if (props?.links) {
        // Decode HTML entities before parsing JSON
        const decodedLinks = decodeHtmlEntities(props.links)
        links = JSON.parse(decodedLinks)
      }

      return {
        dark: props?.dark,
        title: props?.title,
        subtitle: props?.subtitle,
        links,
        id: props?.id,
        blockName: props?.blockName,
        blockType: props?.blockType,
      }
    },
  },
}

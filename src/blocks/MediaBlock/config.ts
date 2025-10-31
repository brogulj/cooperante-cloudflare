import type { Block } from 'payload'

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

export const MediaBlock: Block = {
  slug: 'MediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
  jsx: {
    /**
     * Convert from Lexical -> MDX:
     * <MediaBlock media={JSON stringified media object} caption="caption text" />
     */
    export: ({ fields }) => {
      const props: Record<string, string | undefined> = {}

      // Handle media reference - serialize the entire media object as JSON
      if (fields.media) {
        props.media = JSON.stringify(fields.media)
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

      // Handle caption
      if (fields.caption) {
        props.caption = fields.caption
      }

      return {
        props,
      }
    },
    /**
     * Convert from MDX -> Lexical:
     */
    import: ({ props }) => {
      let media = undefined

      // Parse the media JSON if it exists
      if (props?.media) {
        // Decode HTML entities before parsing JSON
        const decodedMedia = decodeHtmlEntities(props.media)
        media = Number(JSON.parse(decodedMedia).id)
      }

      if (props?.id) {
        console.log('id', props.id)
        props.id = props.id
      }

      return {
        media,
        caption: props?.caption,
        id: props?.id,
      }
    },
  },
}

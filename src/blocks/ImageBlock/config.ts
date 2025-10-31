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

export const ImageBlock: Block = {
  slug: 'ImageBlock',
  interfaceName: 'ImageBlock',
  fields: [
    {
      name: 'image',
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
}

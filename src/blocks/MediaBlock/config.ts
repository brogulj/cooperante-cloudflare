import type { Block } from 'payload'

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
}

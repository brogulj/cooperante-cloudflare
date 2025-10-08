import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const JobBoardBlock: Block = {
  slug: 'JobBoardBlock',
  interfaceName: 'JobBoardBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      localized: true,
    },
    linkGroup({
      overrides: {
        label: {
          hr: 'Linkovi',
          en: 'Links',
        },
      },
      appearances: ['default', 'outline'],
    }),
  ],
}

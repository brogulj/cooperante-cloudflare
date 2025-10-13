import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

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
        localized: true,
      },
    }),
  ],
}

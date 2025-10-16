import { Block } from 'payload'

export const BenefitsBlock: Block = {
  slug: 'BenefitsBlock',
  interfaceName: 'BenefitsBlock',
  labels: {
    singular: {
      en: 'Benefits Block',
      hr: 'Prednosti Blok',
    },
    plural: {
      en: 'Benefits Blocks',
      hr: 'Prednosti Blokovi',
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
      type: 'text',
      localized: true,
      required: false,
    },
    {
      name: 'items',
      type: 'array',
      label: {
        en: 'Benefit',
        hr: 'Prednost',
      },
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'text',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

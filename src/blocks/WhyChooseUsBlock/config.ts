import { Block } from 'payload'

export const WhyChooseUsBlock: Block = {
  slug: 'WhyChooseUsBlock',
  interfaceName: 'WhyChooseUsBlock',
  labels: {
    singular: {
      en: 'Why Choose Us Block',
      hr: 'Zašto Odabrati Nas',
    },
    plural: {
      en: 'Why Choose Us Blocks',
      hr: 'Zašto Odabrati Nas Blokovi',
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
    },
    {
      name: 'reasons',
      type: 'array',
      label: {
        en: 'Reason',
        hr: 'Razlog',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}

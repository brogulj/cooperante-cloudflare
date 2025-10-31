import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'

export const LanderHero: Block = {
  slug: 'LanderHero',
  interfaceName: 'LanderHero',
  labels: {
    singular: {
      en: 'Lander Hero',
      hr: 'Lander Hero',
    },
    plural: {
      en: 'Lander Heroes',
      hr: 'Lander Heroes',
    },
  },
  fields: [
    {
      name: 'title',
      label: {
        en: 'Title',
        hr: 'Naslov',
      },
      type: 'text',
      localized: true,
    },
    {
      name: 'dark',
      type: 'checkbox',
      defaultValue: false,
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
          en: 'Links',
          hr: 'Linkovi',
        },
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Background Image',
        hr: 'Pozadinska slika',
      },
    },
    {
      name: 'stats',
      type: 'array',
      label: {
        en: 'Stats',
        hr: 'Statistike',
      },
      fields: [
        {
          name: 'stat',
          type: 'group',
          label: {
            en: 'Stat',
            hr: 'Statistika',
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              label: {
                en: 'Value',
                hr: 'Vrijednost',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: {
                en: 'Label',
                hr: 'Label',
              },
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'logos',
      type: 'array',
      label: {
        en: 'Logos',
        hr: 'Logotipi',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Logo',
            hr: 'Logotip',
          },
        },
      ],
    },
  ],
}

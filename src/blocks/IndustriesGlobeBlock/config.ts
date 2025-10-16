import { Block } from 'payload'

export const IndustriesGlobeBlock: Block = {
  slug: 'IndustriesGlobeBlock',
  interfaceName: 'IndustriesGlobeBlock',
  labels: {
    singular: {
      en: 'Industries Globe Block',
      hr: 'Industries Globe Block',
    },
    plural: {
      en: 'Industries Globe Blocks',
      hr: 'Industries Globe Blocks',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'industries',
      type: 'array',
      fields: [
        {
          name: 'industry',
          type: 'text',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'countries',
      type: 'array',
      fields: [
        {
          name: 'country',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'mainLocationLatLong',
      type: 'text',
      required: true,
    },
    {
      name: 'locationsLatLong',
      type: 'array',
      fields: [
        {
          name: 'latLong',
          type: 'text',
        },
      ],
    },
  ],
}

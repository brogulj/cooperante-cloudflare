import { Block } from 'payload'

export const IndustriesBlock: Block = {
  slug: 'IndustriesBlock',
  interfaceName: 'IndustriesBlock',
  fields: [
    {
      name: 'title',
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
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'countriesTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'industries',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
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
      ],
    },
    {
      name: 'countries',
      type: 'array',
      fields: [
        {
          name: 'country',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'flag',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'seoLine',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  labels: {
    plural: 'Industries Blocks',
    singular: 'Industries Block',
  },
}

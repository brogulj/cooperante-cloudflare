import { Block } from 'payload'

export const ProcessBlock: Block = {
  slug: 'ProcessBlock',
  interfaceName: 'ProcessBlock',
  fields: [
    {
      name: 'dark',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'steps',
      type: 'array',
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
      ],
    },
  ],
}

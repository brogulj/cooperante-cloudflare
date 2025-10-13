import { Block } from 'payload'

export const TableBlock: Block = {
  slug: 'TableBlock',
  interfaceName: 'TableBlock',
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
      name: 'columns',
      type: 'array',
      required: true,
      minRows: 2,
      labels: {
        singular: { en: 'Column', hr: 'Stupac' },
        plural: { en: 'Columns', hr: 'Stupci' },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      required: true,
      labels: {
        singular: { en: 'Row', hr: 'Red' },
        plural: { en: 'Rows', hr: 'Redovi' },
      },
      fields: [
        {
          name: 'cells',
          type: 'array',
          required: true,
          minRows: 2,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
    },
  ],
}

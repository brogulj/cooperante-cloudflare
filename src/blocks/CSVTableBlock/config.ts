import { Block } from 'payload'

export const CSVTableBlock: Block = {
  slug: 'CSVTableBlock',
  interfaceName: 'CSVTableBlock',
  labels: {
    singular: {
      en: 'CSV Table',
      hr: 'CSV Tabela',
    },
    plural: {
      en: 'CSV Tables',
      hr: 'CSV Tabele',
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'dark',
      label: 'Dark',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'csv',
      label: 'CSV',
      type: 'textarea',
      localized: true,
      required: true,
    },
  ],
}

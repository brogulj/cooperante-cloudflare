import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

const employmentTypeOptions = [
  {
    label: {
      hr: 'Permanentni',
      en: 'Full-time',
    },
    value: 'full_time',
  },
  {
    label: {
      hr: 'Sezonski',
      en: 'Seasonal',
    },
    value: 'seasonal',
  },
  {
    label: {
      hr: 'Privremeni',
      en: 'Temporary',
    },
    value: 'temporary',
  },
]

export const JobAds: CollectionConfig = {
  slug: 'jobAds',
  labels: {
    singular: {
      hr: 'Oglas',
      en: 'Job Ad',
    },
    plural: {
      hr: 'Oglasi',
      en: 'Job Ads',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    components: {
      edit: {
        beforeDocumentControls: ['@/collections/JobAds/components/edit#Translate'],
      },
    },
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        hr: 'Naziv pozicije (sa ključnom riječi)',
        en: 'Position Title (with keyword)',
      },
      localized: true,
    },
    ...slugField(),
    {
      name: 'location',
      type: 'text',
      required: true,
      label: {
        hr: 'Lokacija (grad, regija)',
        en: 'Location (city, region)',
      },
      localized: true,
    },
    {
      name: 'employmentType',
      type: 'select',
      required: true,
      label: {
        hr: 'Vrsta zaposlenja',
        en: 'Type of Employment',
      },
      options: employmentTypeOptions,
    },
    {
      name: 'industry',
      type: 'text',
      required: true,
      label: {
        hr: 'Industrija',
        en: 'Industry',
      },
      localized: true,
    },
    {
      name: 'numberOfOpenings',
      type: 'number',
      required: true,
      label: {
        hr: 'Broj otvorenih pozicija (npr. 15)',
        en: 'Number of Open Positions (e.g. 15)',
      },
      min: 1,
    },
    {
      name: 'description',
      type: 'textarea',
      label: {
        hr: 'Opis',
        en: 'Description',
      },
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: {
        hr: 'Kratak opis (1–2 rečenice, uključi SEO fraze: posao u Hrvatskoj, zaposlenje stranih radnika, dobiven dopust, smještaj pružen)',
        en: 'Short Description (1–2 sentences, include SEO phrases: job in Croatia, employment of foreign workers, work permit provided, accommodation provided)',
      },
      localized: true,
    },
    {
      name: 'benefits',
      type: 'textarea',
      required: true,
      label: {
        hr: 'Benefiti / Ključne informacije (dopust za rad, smještaj, nekih dopusti)',
        en: 'Benefits / Key Information (work permit, accommodation, salary negotiable)',
      },
      localized: true,
    },
    {
      name: 'status',
      type: 'select',
      label: {
        hr: 'Status',
        en: 'Status',
      },
      options: [
        {
          label: {
            hr: 'Aktivan',
            en: 'Active',
          },
          value: 'active',
        },
        {
          label: {
            hr: 'Neaktivan',
            en: 'Inactive',
          },
          value: 'inactive',
        },
      ],
      defaultValue: 'inactive',
    },
    {
      name: 'form',
      type: 'relationship',
      label: {
        hr: 'Forma',
        en: 'Form',
      },
      relationTo: 'forms',
    },
    {
      name: 'translated',
      type: 'checkbox',
      label: {
        hr: 'Prevedeno',
        en: 'Translated',
      },
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
  ],
}

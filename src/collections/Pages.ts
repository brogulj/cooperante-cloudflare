import { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { LanderHero } from '@/blocks/LanderHero/config'
import { slugField } from '@/fields/slug'
import { TrustBlock } from '@/blocks/TrustBlock/config'
import { ServicesBlock } from '@/blocks/ServicesBlock/config'
import { JobBoardBlock } from '@/blocks/JobBoardBlock/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: {
      en: 'Page',
      hr: 'Stranica',
    },
    plural: {
      en: 'Pages',
      hr: 'Stranice',
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        hr: 'Naslov',
      },
      required: true,
    },
    ...slugField(),
    {
      name: 'content',
      type: 'blocks',
      label: {
        en: 'Content',
        hr: 'Sadržaj',
      },
      blocks: [LanderHero, TrustBlock, ServicesBlock, JobBoardBlock],
    },
  ],
}

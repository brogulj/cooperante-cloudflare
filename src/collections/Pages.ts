import { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { LanderHero } from '@/blocks/LanderHero/config'
import { slugField } from '@/fields/slug'
import { TrustBlock } from '@/blocks/TrustBlock/config'
import { ServicesBlock } from '@/blocks/ServicesBlock/config'
import { JobBoardBlock } from '@/blocks/JobBoardBlock/config'
import { IndustriesBlock } from '@/blocks/IndustriesBlock/config'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/config'
import { WorkersTestimonialsBlock } from '@/blocks/WorkersTestimonialsBlock/config'
import { FAQBlock } from '@/blocks/FAQBlock/config'
import { WhyChooseUsBlock } from '@/blocks/WhyChooseUsBlock/config'
import { ProcessBlock } from '@/blocks/ProcessBlock/config'
import { TableBlock } from '@/blocks/TableBlock/config'
import { BenefitsBlock } from '@/blocks/BenefitsBlock/config'
import { CTABlock } from '@/blocks/CTABlock/config'

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
      blocks: [
        LanderHero,
        TrustBlock,
        ServicesBlock,
        JobBoardBlock,
        IndustriesBlock,
        TestimonialsBlock,
        WorkersTestimonialsBlock,
        FAQBlock,
        WhyChooseUsBlock,
        ProcessBlock,
        TableBlock,
        BenefitsBlock,
        CTABlock,
      ],
    },
  ],
}

import { LanderHero } from '@/blocks/LanderHero/component'
import { ServicesBlock } from '@/blocks/ServicesBlock/component'
import { TrustBlock } from '@/blocks/TrustBlock/component'
import { JobBoardBlock } from '@/blocks/JobBoardBlock/component'
import { IndustriesBlock } from '@/blocks/IndustriesBlock/component'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/component'
import { WorkersTestimonialsBlock } from '@/blocks/WorkersTestimonialsBlock/component'
import { FAQBlock } from '@/blocks/FAQBlock/component'
import { WhyChooseUsBlock } from '@/blocks/WhyChooseUsBlock/component'
import { ProcessBlock } from '@/blocks/ProcessBlock/component'
import { TableBlock } from '@/blocks/TableBlock/component'
import { BenefitsBlock } from '@/blocks/BenefitsBlock/component'
import { CTABlock } from '@/blocks/CTABlock/component'
import { FormBlock } from '@/blocks/Form/component'
import { IndustriesGlobeBlock } from '@/blocks/IndustriesGlobeBlock/component'
import { BlogPostsBlock } from '@/blocks/BlogPostsBlock/component'
import { Page } from '@/payload-types'
import React from 'react'
import { ContactBlock } from '@/blocks/ContactBlock/component'
import { RichTextBlock } from '@/blocks/RichTextBlock/component'
import { AboutUsBlock } from '@/blocks/AboutUsBlock/component'
import { ImageBlock } from '@/blocks/ImageBlock/component'
import { PortalBlock } from '@/blocks/PortalBlock/component'
import { CSVTableBlock } from '@/blocks/CSVTableBlock/component'

type Block = NonNullable<Page['content']>[number]

type BlockComponentMap = {
  LanderHero: React.ComponentType<Extract<Block, { blockType: 'LanderHero' }>>
  TrustBlock: React.ComponentType<Extract<Block, { blockType: 'TrustBlock' }>>
  ServicesBlock: React.ComponentType<Extract<Block, { blockType: 'ServicesBlock' }>>
  JobBoardBlock: React.ComponentType<Extract<Block, { blockType: 'JobBoardBlock' }>>
  IndustriesBlock: React.ComponentType<Extract<Block, { blockType: 'IndustriesBlock' }>>
  TestimonialsBlock: React.ComponentType<Extract<Block, { blockType: 'TestimonialsBlock' }>>
  WorkersTestimonialsBlock: React.ComponentType<
    Extract<Block, { blockType: 'WorkersTestimonialsBlock' }>
  >
  FAQBlock: React.ComponentType<Extract<Block, { blockType: 'FAQBlock' }>>
  WhyChooseUsBlock: React.ComponentType<Extract<Block, { blockType: 'WhyChooseUsBlock' }>>
  ProcessBlock: React.ComponentType<Extract<Block, { blockType: 'ProcessBlock' }>>
  TableBlock: React.ComponentType<Extract<Block, { blockType: 'TableBlock' }>>
  BenefitsBlock: React.ComponentType<Extract<Block, { blockType: 'BenefitsBlock' }>>
  CTABlock: React.ComponentType<Extract<Block, { blockType: 'CTABlock' }>>
  // The `FormBlock` component expects a populated form object; relax typing to avoid mismatch
  // between generated `Page['content']` block type (which may be number | Form) and component props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FormBlock: React.ComponentType<any>
  IndustriesGlobeBlock: React.ComponentType<Extract<Block, { blockType: 'IndustriesGlobeBlock' }>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BlogPostsBlock: React.ComponentType<any>
  ContactBlock: React.ComponentType<Extract<Block, { blockType: 'ContactBlock' }>>
  RichTextBlock: React.ComponentType<Extract<Block, { blockType: 'RichTextBlock' }>>
  AboutUsBlock: React.ComponentType<Extract<Block, { blockType: 'AboutUsBlock' }>>
  ImageBlock: React.ComponentType<Extract<Block, { blockType: 'ImageBlock' }>>
  PortalBlock: React.ComponentType<Extract<Block, { blockType: 'PortalBlock' }>>
  CSVTableBlock: React.ComponentType<Extract<Block, { blockType: 'CSVTableBlock' }>>
}

const blockComponents: BlockComponentMap = {
  LanderHero: LanderHero,
  TrustBlock: TrustBlock,
  ServicesBlock: ServicesBlock,
  JobBoardBlock: JobBoardBlock,
  IndustriesBlock: IndustriesBlock,
  TestimonialsBlock: TestimonialsBlock,
  WorkersTestimonialsBlock: WorkersTestimonialsBlock,
  FAQBlock: FAQBlock,
  WhyChooseUsBlock: WhyChooseUsBlock,
  ProcessBlock: ProcessBlock,
  TableBlock: TableBlock,
  BenefitsBlock: BenefitsBlock,
  CTABlock: CTABlock,
  FormBlock: FormBlock,
  IndustriesGlobeBlock: IndustriesGlobeBlock,
  BlogPostsBlock: BlogPostsBlock,
  ContactBlock: ContactBlock,
  RichTextBlock: RichTextBlock,
  AboutUsBlock: AboutUsBlock,
  ImageBlock: ImageBlock,
  PortalBlock: PortalBlock,
  CSVTableBlock: CSVTableBlock,
}

export const RenderBlocks: React.FC<{ blocks?: Page['content'] }> = ({ blocks }) => {
  if (!blocks?.length) return null
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'LanderHero':
            return <blockComponents.LanderHero key={block.id ?? `LanderHero-${i}`} {...block} />
          case 'TrustBlock':
            return <blockComponents.TrustBlock key={block.id ?? `TrustBlock-${i}`} {...block} />
          case 'ServicesBlock':
            return (
              <blockComponents.ServicesBlock key={block.id ?? `ServicesBlock-${i}`} {...block} />
            )
          case 'JobBoardBlock':
            return (
              <blockComponents.JobBoardBlock key={block.id ?? `JobBoardBlock-${i}`} {...block} />
            )
          case 'IndustriesBlock':
            return (
              <blockComponents.IndustriesBlock
                key={block.id ?? `IndustriesBlock-${i}`}
                {...block}
              />
            )
          case 'TestimonialsBlock':
            return (
              <blockComponents.TestimonialsBlock
                key={block.id ?? `TestimonialsBlock-${i}`}
                {...block}
              />
            )
          case 'WorkersTestimonialsBlock':
            return (
              <blockComponents.WorkersTestimonialsBlock
                key={block.id ?? `WorkersTestimonialsBlock-${i}`}
                {...block}
              />
            )
          case 'FAQBlock':
            return <blockComponents.FAQBlock key={block.id ?? `FAQBlock-${i}`} {...block} />
          case 'WhyChooseUsBlock':
            return (
              <blockComponents.WhyChooseUsBlock
                key={block.id ?? `WhyChooseUsBlock-${i}`}
                {...block}
              />
            )
          case 'ProcessBlock':
            return <blockComponents.ProcessBlock key={block.id ?? `ProcessBlock-${i}`} {...block} />
          case 'TableBlock':
            return <blockComponents.TableBlock key={block.id ?? `TableBlock-${i}`} {...block} />
          case 'BenefitsBlock':
            return (
              <blockComponents.BenefitsBlock key={block.id ?? `BenefitsBlock-${i}`} {...block} />
            )
          case 'CTABlock':
            return <blockComponents.CTABlock key={block.id ?? `CTABlock-${i}`} {...block} />
          case 'FormBlock':
            return (
              <div
                className="py-12 container mx-0 xl:px-20 flex justify-center w-full max-w-screen"
                key={block.id ?? `FormBlock-${i}`}
              >
                <blockComponents.FormBlock {...block} />
              </div>
            )
          case 'IndustriesGlobeBlock':
            return (
              <blockComponents.IndustriesGlobeBlock
                key={block.id ?? `IndustriesGlobeBlock-${i}`}
                {...block}
              />
            )
          case 'BlogPostsBlock':
            return (
              <blockComponents.BlogPostsBlock key={block.id ?? `BlogPostsBlock-${i}`} {...block} />
            )
          case 'ContactBlock':
            return <blockComponents.ContactBlock key={block.id ?? `ContactBlock-${i}`} {...block} />
          case 'RichTextBlock':
            return (
              <blockComponents.RichTextBlock key={block.id ?? `RichTextBlock-${i}`} {...block} />
            )
          case 'AboutUsBlock':
            return <blockComponents.AboutUsBlock key={block.id ?? `AboutUsBlock-${i}`} {...block} />
          case 'ImageBlock':
            return <blockComponents.ImageBlock key={block.id ?? `ImageBlock-${i}`} {...block} />
          case 'PortalBlock':
            return <blockComponents.PortalBlock key={block.id ?? `PortalBlock-${i}`} {...block} />
          case 'CSVTableBlock':
            return (
              <blockComponents.CSVTableBlock key={block.id ?? `CSVTableBlock-${i}`} {...block} />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

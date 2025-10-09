import { LanderHero } from '@/blocks/LanderHero/component'
import { ServicesBlock } from '@/blocks/ServicesBlock/component'
import { TrustBlock } from '@/blocks/TrustBlock/component'
import { JobBoardBlock } from '@/blocks/JobBoardBlock/component'
import { IndustriesBlock } from '@/blocks/IndustriesBlock/component'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/component'
import { WorkersTestimonialsBlock } from '@/blocks/WorkersTestimonialsBlock/component'
import { FAQBlock } from '@/blocks/FAQBlock/component'
import { Page } from '@/payload-types'
import React from 'react'

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
          default:
            return null
        }
      })}
    </div>
  )
}

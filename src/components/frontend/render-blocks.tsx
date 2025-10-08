import { LanderHero } from '@/blocks/LanderHero/component'
import { ServicesBlock } from '@/blocks/ServicesBlock/component'
import { TrustBlock } from '@/blocks/TrustBlock/component'
import { JobBoardBlock } from '@/blocks/JobBoardBlock/component'
import { Page } from '@/payload-types'
import React from 'react'

type Block = NonNullable<Page['content']>[number]

type BlockComponentMap = {
  LanderHero: React.ComponentType<Extract<Block, { blockType: 'LanderHero' }>>
  TrustBlock: React.ComponentType<Extract<Block, { blockType: 'TrustBlock' }>>
  ServicesBlock: React.ComponentType<Extract<Block, { blockType: 'ServicesBlock' }>>
  JobBoardBlock: React.ComponentType<Extract<Block, { blockType: 'JobBoardBlock' }>>
}

const blockComponents: BlockComponentMap = {
  LanderHero: LanderHero,
  TrustBlock: TrustBlock,
  ServicesBlock: ServicesBlock,
  JobBoardBlock: JobBoardBlock,
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
          default:
            return null
        }
      })}
    </div>
  )
}

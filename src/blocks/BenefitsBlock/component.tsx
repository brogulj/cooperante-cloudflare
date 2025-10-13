import React from 'react'
import type { BenefitsBlock as BenefitsBlockType } from '@/payload-types'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export const BenefitsBlock: React.FC<BenefitsBlockType> = (block) => {
  const { title, items, dark } = block

  return (
    <section
      className={cn(
        'container py-20 gap-4 flex flex-col max-w-screen xl:px-20 bg-background text-foreground',
        dark && 'dark',
      )}
    >
      <div className="">
        {title && <h2 className="text-4xl md:text-5xl font-semibold mb-6">{title}</h2>}
      </div>
      <ul className="space-y-4">
        {items?.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground flex-shrink-0">
              <Check className="h-6 w-6" />
            </span>
            <span className="text-xl leading-relaxed mt-1">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

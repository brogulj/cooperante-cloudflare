import React from 'react'
import type { BenefitsBlock as BenefitsBlockType } from '@/payload-types'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Media } from '@/components/frontend/Media'

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.map((item) => (
          <Card key={item.id} className="h-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border bg-muted text-muted-foreground overflow-hidden">
                {item.icon ? (
                  <Media
                    resource={item.icon ?? null}
                    htmlElement={null}
                    imgClassName="h-8 w-8 object-contain"
                  />
                ) : (
                  <Check className="h-6 w-6" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-base md:text-lg leading-relaxed">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-base text-muted-foreground">{item.text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

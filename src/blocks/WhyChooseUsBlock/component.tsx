import { Card, CardContent } from '@/components/ui/card'
import { WhyChooseUsBlock as WhyChooseUsBlockType } from '@/payload-types'
import React from 'react'
import { cn } from '@/lib/utils'

export const WhyChooseUsBlock: React.FC<WhyChooseUsBlockType> = (block) => {
  const { title, reasons, dark } = block

  return (
    <div
      className={cn(
        'container py-16 lg:py-32 gap-4 flex flex-col max-w-screen xl:px-20 bg-background text-foreground',
        dark && 'dark',
      )}
    >
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {reasons?.map((reason, index) => (
          <Card key={reason.id} className="flex flex-col gap-4">
            <CardContent>
              <div className="text-xl font-medium flex flex-row gap-3 leading-relaxed">
                <span className="font-semibold">{index + 1}.</span>
                <h3 className="mb-2">{reason.text}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

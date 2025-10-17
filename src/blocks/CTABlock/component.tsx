import React from 'react'
import type { CTABlock as CTABlockType } from '@/payload-types'
import { CMSLink } from '@/components/frontend/link'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const CTABlock: React.FC<CTABlockType> = (block) => {
  const { title, subtitle, dark } = block
  const links = Array.isArray(block.links) ? block.links : []

  return (
    <div className={cn('py-20 bg-background text-foreground px-4', dark && 'dark')}>
      <Card className="container flex flex-col gap-2 lg:max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-semibold text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <CardDescription className="text-center text-foreground text-lg">
            {subtitle}
          </CardDescription>
          <ul className="flex gap-4 flex-col sm:flex-row mt-4 justify-center">
            {links.map(({ link }, i) => (
              <li key={i} className="flex-1 sm:flex-none">
                <CMSLink {...link} className="w-full sm:w-auto" size="lg" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

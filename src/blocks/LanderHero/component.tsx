'use client'

import React from 'react'

import { CMSLink } from '@/components/frontend/link'
import { LanderHero as LanderHeroType, Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Media } from '@/components/frontend/Media'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export const LanderHero: React.FC<LanderHeroType> = (block) => {
  const title = block.title || ''
  const subtitle = block.subtitle || ''
  const links = Array.isArray(block.links) ? block.links : []
  const stats = Array.isArray(block.stats) ? block.stats : []
  const bg = block.backgroundImage
  const dark = block.dark
  const { locale }: { locale: string } = useParams()
  const bgUrl =
    bg && typeof bg === 'object' && (bg as MediaType).url ? getMediaUrl((bg as MediaType).url) : ''

  const logos = Array.isArray(block.logos) ? block.logos : []

  return (
    <div className={cn('relative bg-background text-foreground', dark && 'dark')}>
      <div
        className={cn(
          'container relative flex items-end sm:items-center md:items-end justify-end lg:justify-center bg-background text-foreground min-h-[80vh] xl:px-20',
        )}
      >
        <div className=" mb-12 sm:mb-10 z-10 relative pt-24 flex-1">
          <div className="flex w-full flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="max-w-[36.5rem] md:text-left lg:mb-20 xl:mb-32">
              <h1 className="text-4xl font-semibold mb-4 leading-tight xl:text-5xl">{title}</h1>
              <p className="text-lg mb-12 xl:text-xl">{subtitle}</p>
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex gap-4 flex-col sm:flex-row">
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i} className="flex-1 md:flex-none">
                        <CMSLink
                          {...link}
                          className="w-full md:w-auto lg:text-[1.15rem] lg:h-11"
                          size="lg"
                          locale={locale}
                        />
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            {(Array.isArray(stats) && stats.length > 0) ||
            (Array.isArray(logos) && logos.length > 0) ? (
              <div className="mt-10 lg:mt-0 lg:ml-auto flex flex-col justify-end">
                {Array.isArray(stats) && stats.length > 0 && (
                  <ul
                    className={cn(
                      'flex mt-0 justify-between md:gap-10 md:justify-start lg:flex-row lg:justify-end',
                      Array.isArray(logos) && logos.length > 0 ? '' : 'mb-20',
                    )}
                  >
                    {stats.map(({ stat }, i) => {
                      return (
                        <li key={i} className="flex flex-col gap-2 items-center">
                          <p className="text-3xl font-semibold lg:text-3xl xl:text-4xl">
                            {stat?.value}
                          </p>
                          <p className="text-lg xl:text-xl text-center">{stat?.label}</p>
                        </li>
                      )
                    })}
                  </ul>
                )}
                {Array.isArray(logos) && logos.length > 0 && (
                  <div className="mt-8">
                    <div className="flex flex-row gap-4 h-[100px] lg:justify-end">
                      {logos.map(({ logo }, i) => (
                        <div key={i} className="flex justify-center sm:justify-start">
                          {logo && typeof logo === 'object' && (
                            <Image
                              src={(logo as MediaType).url}
                              alt={(logo as MediaType).alt}
                              className={cn('h-20 w-auto object-contain', i > 3 && 'md:hidden')}
                              width={(logo as MediaType).width}
                              height={(logo as MediaType).height}
                              quality={80}
                              sizes="20vw"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none inset-0 absolute">
        {bg && (
          <Image
            src={(bg as MediaType).url}
            className="-z-10 object-cover h-full w-full"
            fetchPriority="high"
            alt={(bg as MediaType).alt}
            loading="eager"
            width={(bg as MediaType).width}
            height={(bg as MediaType).height}
            quality={80}
            sizes="100vw"
          />
        )}
      </div>
    </div>
  )
}

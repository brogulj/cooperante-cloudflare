'use client'

import React from 'react'

import Image from 'next/image'
import type { TrustBlock as TrustBlockProps, Media as MediaDoc, Media } from '@/payload-types'
import RichText from '@/components/frontend/richtext'

export const TrustBlock: React.FC<TrustBlockProps> = (props) => {
  const { title, description, companyLogos } = props

  const logos: MediaDoc[] = React.useMemo(() => {
    const collected = companyLogos
      ?.map((item) => (typeof item?.logo === 'object' ? (item.logo as MediaDoc) : null))
      .filter((l): l is MediaDoc => Boolean(l))
    return collected || []
  }, [companyLogos])

  const visibleLogos: MediaDoc[] = React.useMemo(() => logos, [logos])

  return (
    <section className="container my-16 lg:my-20 mx-auto xl:px-20">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-6 gap-x-16">
        <div className="col-span-4 lg:col-span-12 max-w-4xl">
          {title && (
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {description && <RichText data={description} className="[&_p]:mt-6 [&_p]:text-lg" />}
        </div>

        <div className="col-span-4 lg:col-span-12 space-y-6">
          {(() => {
            const mid = Math.ceil((visibleLogos?.length || 0) / 2)
            const firstRow = visibleLogos.slice(0, mid)
            const secondRow = visibleLogos.slice(mid)

            const renderRow = (items: MediaDoc[], reverse?: boolean) => (
              <div className="overflow-hidden">
                <div className={reverse ? 'marquee-track reverse' : 'marquee-track'}>
                  <div className="marquee-items">
                    {[...items, ...items].map((media, i) => (
                      <div className="marquee-item" key={`a-${media?.id ?? i}`}>
                        <Image
                          src={(media as Media).url || ''}
                          alt={media?.alt || ''}
                          width={80}
                          height={(80 / (media as Media).height) * (media as Media).width}
                          quality={80}
                          className="h-20 md:h-20 lg:h-32 w-auto object-contain brightness-0"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="marquee-items" aria-hidden="true">
                    {[...items, ...items].map((media, i) => (
                      <div className="marquee-item" key={`b-${media?.id ?? i}`}>
                        <Image
                          src={(media as Media).url || ''}
                          alt={media?.alt || ''}
                          width={80}
                          height={(80 / (media as Media).height) * (media as Media).width}
                          quality={80}
                          className="h-20 md:h-20 lg:h-32 w-auto object-contain brightness-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )

            return (
              <>
                {renderRow(firstRow, false)}
                {renderRow(secondRow.length > 0 ? secondRow : firstRow, true)}
              </>
            )
          })()}
        </div>
      </div>
    </section>
  )
}

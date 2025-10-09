import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { MediaBlock as MediaBlockProps, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/frontend/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    caption,
    staticImage,
    disableInnerContainer,
  } = props

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <img
          className={cn('border border-border rounded-[0.8rem]', imgClassName)}
          src={(media as MediaType).url}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6 text-muted-foreground',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          {caption}
        </div>
      )}
    </div>
  )
}

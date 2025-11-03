import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { ImageBlock as ImageBlockProps, Media as MediaType } from '@/payload-types'
import Image from 'next/image'

type Props = ImageBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const ImageBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    image,
    caption,
    staticImage,
    disableInnerContainer,
  } = props

  return (
    <div
      className={cn(
        'container xl:px-20 py-12',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(image || staticImage) && (
        <Image
          className={cn('', imgClassName)}
          src={(image as MediaType).url}
          alt={(image as MediaType).alt}
          width={(image as MediaType).width}
          height={(image as MediaType).height}
          quality={80}
          sizes="80vw"
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

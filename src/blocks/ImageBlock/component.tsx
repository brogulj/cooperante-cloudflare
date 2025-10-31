import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { ImageBlock as ImageBlockProps, Media as MediaType } from '@/payload-types'

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
        <img className={cn('', imgClassName)} src={(image as MediaType).url} />
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

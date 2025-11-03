import React from 'react'
import { Media, ServicesBlock as ServicesBlockProps } from '@/payload-types'
import RichText from '@/components/frontend/richtext'
import Image from 'next/image'

export const ServicesBlock: React.FC<ServicesBlockProps> = (params) => {
  const { title, subtitle, content, backgroundImage, imageIcons, icons } = params
  return (
    <div className="container my-20 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:my-32 xl:px-20">
      <div className="col-span-1">
        {subtitle && <h3 className="text-lg font-medium mb-2 uppercase">{subtitle}</h3>}
        <h2 className="text-3xl font-semibold mb-6 lg:text-4xl">{title}</h2>
        {content && <RichText data={content} className="[&_p]:text-lg" />}
      </div>
      <div className="h-[50vh] relative sm:h-[40vh] md:h-[50vh] col-span-1 lg:h-full">
        {backgroundImage && typeof backgroundImage === 'object' && (
          <Image
            src={backgroundImage.url}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
            width={(backgroundImage as Media).width}
            height={(backgroundImage as Media).height}
            quality={80}
            sizes="(max-width: 768px) 80vw, 30vw"
          />
        )}
        <div className="flex flex-row gap-3 absolute bottom-0 left-0 right-0 px-3 pb-3 justify-end">
          {imageIcons?.map((icon) => (
            <div
              key={(icon.icon as Media).url}
              className="flex flex-col items-center justify-center rounded-lg bg-white p-2"
            >
              <Image
                src={(icon.icon as Media).url}
                alt={(icon.icon as Media).alt}
                width={48}
                height={(48 / (icon.icon as Media).width) * (icon.icon as Media).height}
                quality={80}
                className="w-12 h-12 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:col-span-2">
        {icons?.map((icon, index) => (
          <div key={index} className="flex flex-col border border-border rounded-lg px-6 py-4">
            <Image
              src={(icon.icon as Media).url}
              alt={(icon.icon as Media).alt}
              width={(icon.icon as Media).width}
              height={(40 / (icon.icon as Media).width) * (icon.icon as Media).height}
              quality={80}
              className="w-10 h-10 object-cover mb-2"
            />
            <h3 className="text-xl font-medium mb-2">{icon.title}</h3>
            <p className="text-base text-muted-foreground">{icon.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

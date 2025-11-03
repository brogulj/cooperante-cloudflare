import { Media, PortalBlock as PortalBlockProps } from '@/payload-types'
import React from 'react'
import Image from 'next/image'

export const PortalBlock: React.FC<PortalBlockProps> = ({ title, subtitle, list, image }) => {
  return (
    <div className="container py-20 max-w-screen xl:px-20 bg-background text-foreground grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="flex flex-col gap-6">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        <ul className="grid grid-cols-1  gap-6">
          {list.map((item) => (
            <li key={item.id} className="list-disc ml-3">
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-base text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-end">
        <Image
          src={(image as Media).url}
          alt={(image as Media).alt}
          className="w-full h-full object-cover"
          width={(image as Media).width}
          height={(image as Media).height}
          quality={80}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}

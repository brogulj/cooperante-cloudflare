/* eslint-disable @next/next/no-img-element */
import { Media, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { StarIcon } from 'lucide-react'

import React from 'react'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
  const { title, subtitle, testimonials } = props

  return (
    <div className="container my-16 gap-8 flex flex-col">
      <div className="max-w-4xl">
        <h3 className="text-xl font-medium mb-2 leading-relaxed uppercase">{subtitle}</h3>
        <h2 className="text-5xl font-semibold mb-6">{title}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:grid-cols-3">
        {testimonials?.map((testimonial) => (
          <div key={testimonial.id} className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-4 lg:gap-6 border border-border rounded-lg px-4 py-4 lg:px-6 lg:py-4">
              <img
                src={(testimonial.personImage as Media).url || ''}
                alt=""
                className="h-full object-cover rounded-md col-span-2"
              />
              <div className="flex flex-col items-start col-span-3">
                <img
                  src={(testimonial.companyLogo as Media).url || ''}
                  alt=""
                  className="h-8 w-auto mb-2"
                />
                <h3 className="text-xl font-medium mb-1 leading-relaxed">
                  {testimonial.personName}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{testimonial.personTitle}</p>
                <div className="hidden flex-row mb-3 lg:flex">
                  {Array.from({ length: testimonial.numberOfStars }).map((_, index) => (
                    <StarIcon
                      key={index}
                      className="w-6 h-6 text-yellow-500"
                      fill="currentColor"
                      stroke="currentColor"
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-5">
                <div className="flex flex-row mb-3 lg:hidden">
                  {Array.from({ length: testimonial.numberOfStars }).map((_, index) => (
                    <StarIcon
                      key={index}
                      className="w-6 h-6 text-yellow-500"
                      fill="currentColor"
                      stroke="currentColor"
                    />
                  ))}
                </div>
                <p className="text-lg text-foreground">{testimonial.testimonial}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

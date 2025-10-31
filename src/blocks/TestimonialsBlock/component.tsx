/* eslint-disable @next/next/no-img-element */
'use client'
import { Media, TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { StarIcon } from 'lucide-react'

import React, { useState } from 'react'

const CHAR_LIMIT = 150

const TestimonialText: React.FC<{ text: string }> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isLong = text.length > CHAR_LIMIT
  const displayText = isExpanded ? text : text.slice(0, CHAR_LIMIT) + (isLong ? '...' : '')

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg text-foreground">{displayText}</p>
      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-semibold text-primary hover:opacity-80 transition-opacity w-fit"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  )
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
  const { title, subtitle, testimonials } = props

  return (
    <div className="container py-16 lg:py-32 gap-8 flex flex-col xl:px-20">
      <div className="max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6 lg:text-4xl xl:text-5xl">{title}</h2>
        <h3 className="text-lg font-medium mb-2 leading-relaxed text-muted-foreground">
          {subtitle}
        </h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:grid-cols-3">
        {testimonials?.map((testimonial) => (
          <div key={testimonial.id} className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-4 lg:gap-6 border border-border rounded-lg px-4 py-4 lg:px-6 lg:py-4">
              <div className="col-span-2 aspect-[3/4] overflow-hidden">
                <img
                  src={(testimonial.personImage as Media).url || ''}
                  alt=""
                  className="h-full object-cover rounded-md"
                />
              </div>
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
                <TestimonialText text={testimonial.testimonial} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

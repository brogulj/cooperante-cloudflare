import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQBlock as FAQBlockProps } from '@/payload-types'
import React from 'react'

export const FAQBlock: React.FC<FAQBlockProps> = (params) => {
  const { title, description, faqs } = params
  return (
    <div className="container py-16 lg:py-32 gap-8 flex flex-col xl:px-20">
      <div className="max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6 lg:text-4xl xl:text-5xl">{title}</h2>
        <h3 className="text-lg font-medium mb-2 leading-relaxed text-muted-foreground">
          {description}
        </h3>
      </div>
      <div className="grid max-w-4xl">
        <Accordion type="single" collapsible>
          {faqs?.map((faq, index) => (
            <AccordionItem key={faq.id} value={faq.question + index.toString()}>
              <AccordionTrigger className="font-semibold text-lg">
                {index + 1}. {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

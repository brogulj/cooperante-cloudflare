/* eslint-disable @next/next/no-img-element */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { IndustriesBlock as IndustriesBlockProps, Media } from '@/payload-types'

export const IndustriesBlock: React.FC<IndustriesBlockProps> = (props) => {
  const { title, description, subtitle, industries, countriesTitle, countries, seoLine } = props

  const industriesFirstHalf = industries?.slice(0, Math.ceil(industries.length / 2))
  const industriesSecondHalf = industries?.slice(Math.ceil(industries.length / 2))
  return (
    <div className="container flex flex-col gap-12 py-12 lg:py-32">
      <div className="max-w-4xl">
        <h3 className="text-xl font-medium mb-2 leading-relaxed">{subtitle}</h3>
        <h2 className="text-5xl font-semibold mb-6">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <Accordion type="single" collapsible className="lg:hidden">
        {industries?.map((industry, index) => (
          <AccordionItem key={industry.id} value={industry.title + index.toString()}>
            <AccordionTrigger className="font-semibold text-lg">{industry.title}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 md:flex-row">
                <img
                  src={(industry.image as Media).url || ''}
                  alt={industry.title}
                  className="w-full h-full object-cover aspect-[4/3] object-top rounded-lg md:h-[50vh] md:w-auto"
                />
                <div>
                  <h4 className="text-lg font-semibold mb-2 hidden md:block">{industry.title}</h4>
                  <p className="text-lg ">{industry.description}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="hidden lg:flex gap-8">
        <Accordion
          type="single"
          collapsible
          className="hidden lg:block flex-1"
          defaultValue={industriesFirstHalf?.[0]?.title + '0'}
        >
          {industriesFirstHalf?.map((industry, index) => (
            <AccordionItem key={industry.id} value={industry.title + index.toString()}>
              <AccordionTrigger className="font-semibold text-lg">
                {industry.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div>
                    <p className="text-lg ">{industry.description}</p>
                  </div>
                  <img
                    src={(industry.image as Media).url || ''}
                    alt={industry.title}
                    className="w-full h-full object-cover aspect-[4/3] object-top rounded-lg md:w-[50%]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Accordion
          type="single"
          collapsible
          className="hidden lg:block flex-1"
          defaultValue={industriesSecondHalf?.[0]?.title + '0'}
        >
          {industriesSecondHalf?.map((industry, index) => (
            <AccordionItem key={industry.id} value={industry.title + index.toString()}>
              <AccordionTrigger className="font-semibold text-lg">
                {industry.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div>
                    <p className="text-lg ">{industry.description}</p>
                  </div>
                  <img
                    src={(industry.image as Media).url || ''}
                    alt={industry.title}
                    className="w-full h-full object-cover aspect-[4/3] object-top rounded-lg md:w-[50%]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="">
        <h3 className="text-xl font-medium mb-4 leading-relaxed">{countriesTitle}</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-8">
          {countries?.map((country) => (
            <div key={country.id} className="flex flex-col gap-2 items-center aspect-video">
              <img
                src={(country.flag as Media).url || ''}
                alt={country.country}
                className="w-full h-full object-contain "
              />
              <h4 className="text-base font-medium">{country.country}</h4>
            </div>
          ))}
        </div>
        <p className="text-foreground mt-4">{seoLine}</p>
      </div>
    </div>
  )
}

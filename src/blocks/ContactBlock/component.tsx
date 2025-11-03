import { ContactBlock as ContactBlockType, Form, Media } from '@/payload-types'
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react'
import { FormBlock, FormBlockType } from '../Form/component'
import Image from 'next/image'

const SocialIcon = ({ social }: { social: string }) => {
  switch (social.toLocaleLowerCase()) {
    case 'facebook':
      return <FacebookIcon className="h-6 w-6" />
    case 'instagram':
      return <InstagramIcon className="h-6 w-6" />
    case 'twitter':
      return <TwitterIcon className="h-6 w-6" />
    case 'linkedin':
      return <LinkedinIcon className="h-6 w-6" />
    case 'youtube':
      return <YoutubeIcon className="h-6 w-6" />
    case 'tiktok':
      return <LinkIcon className="h-6 w-6" />
  }
  return <LinkIcon className="h-6 w-6" />
}

export const ContactBlock: React.FC<ContactBlockType> = (block) => {
  const { title, subtitle, contactInformation, form, clients, testimonials } = block

  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1 flex flex-col gap-4 md:col-span-2 mb-8">
          <h2 className="text-4xl font-medium xl:text-5xl">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 xl:text-lg">
            {contactInformation?.phones?.map((phone) => (
              <div key={phone.id}>
                <a
                  href={phone.phoneLink}
                  className="text-lg text-foreground flex flex-row items-center gap-2"
                >
                  <PhoneIcon className="h-4 w-4 xl:h-5 xl:w-5" />{' '}
                  <span className="underline">{phone.phone}</span>
                </a>
              </div>
            ))}
            {contactInformation?.emails?.map((email) => (
              <div key={email.id}>
                <a
                  href={email.emailLink}
                  className="text-lg text-foreground flex flex-row items-center gap-2"
                >
                  <MailIcon className="h-4 w-4 xl:h-5 xl:w-5" />{' '}
                  <span className="underline">{email.email}</span>
                </a>
              </div>
            ))}
            {contactInformation?.addresses?.map((address) => (
              <div key={address.id}>
                <a
                  href={address.addressLink}
                  className="text-lg text-foreground flex flex-row items-center gap-2"
                >
                  <MapPinIcon className="h-4 w-4 xl:h-5 xl:w-5" />{' '}
                  <span className="underline">{address.address}</span>
                </a>
              </div>
            ))}
            {contactInformation?.workingHours?.map((workingHour) => (
              <div key={workingHour.id}>
                <p className="text-lg text-foreground flex flex-row items-center gap-2">
                  <ClockIcon className="h-4 w-4 xl:h-5 xl:w-5" /> <span>{workingHour.hours}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-4 mt-8">
            {contactInformation?.socials?.map((social) => (
              <div key={social.id}>
                <a
                  href={social.socialLink}
                  className="text-lg text-foreground flex flex-row items-center gap-2"
                >
                  <SocialIcon social={social.social} />{' '}
                </a>
              </div>
            ))}
          </div>
          {contactInformation?.mapEmbedUrl && (
            <div className="mt-10">
              <iframe
                src={contactInformation.mapEmbedUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Map"
              />
            </div>
          )}
          <div className="mt-6 flex flex-row gap-4 flex-wrap">
            {clients?.map((client) => (
              <div key={client.id} className="mt-6 w-25 h-25">
                <Image
                  src={(client.client as Media)?.url}
                  alt={(client.client as Media)?.alt}
                  quality={80}
                  width={100}
                  height={
                    (100 / (client.client as Media)?.width) * (client.client as Media)?.height
                  }
                  className="brightness-0 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <FormBlock form={form as unknown as FormBlockType['form']} />
        </div>
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 mt-10">
          {testimonials?.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col gap-2">
              <p className="text-lg text-foreground">{testimonial.testimonial}</p>
              <p className="text-sm text-muted-foreground font-medium">{testimonial.person}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

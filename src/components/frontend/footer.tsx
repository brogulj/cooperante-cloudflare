/* eslint-disable @next/next/no-img-element */
'use client'

import { CMSLink } from '@/components/frontend/link'
import { Separator } from '@/components/ui/separator'
import { Footer as FooterType, Media } from '@/payload-types'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkIcon,
  TextIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react'
import Link from 'next/link'

export const Footer = ({ footer }: { footer: FooterType }) => {
  const links = footer.links || []
  const groupSections = links.filter((item) => item.type === 'linkGroup' && item.linkGroupContent)
  const singleLinks = links.filter(
    (item) => item.type === 'singleLink' && item.singleLinkContent?.link,
  )

  return (
    <footer className="border-t">
      <div className="max-w-screen-2xl mx-auto">
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-4 sm:px-6 xl:px-0">
          <div className="col-span-full xl:col-span-2">
            <div className="flex items-center gap-3">
              {footer.logo && (
                <img src={(footer.logo as Media)?.url || ''} className="h-8 w-auto" alt="Logo" />
              )}
              <span className="text-sm text-muted-foreground">
                {footer.copyright || `© ${new Date().getFullYear()}`}
              </span>
            </div>
          </div>

          {groupSections.map((item) => {
            const group = item.linkGroupContent!
            return (
              <div key={item.id}>
                <h6 className="font-medium">{group.label}</h6>
                <ul className="mt-6 space-y-4">
                  {group.links?.map((sub) => {
                    const subLink = sub.link
                    return (
                      <li key={sub.id}>
                        <CMSLink
                          appearance="inline"
                          className="text-muted-foreground hover:text-foreground"
                          type={subLink.type ?? undefined}
                          newTab={subLink.newTab ?? undefined}
                          reference={
                            subLink.reference
                              ? { relationTo: 'pages', value: subLink.reference.value }
                              : null
                          }
                          url={subLink.url ?? undefined}
                          label={subLink.label}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}

          {singleLinks.length > 0 && (
            <div key="footer-single-links">
              <h6 className="font-medium">Links</h6>
              <ul className="mt-6 space-y-4">
                {singleLinks.map((item) => {
                  const l = item.singleLinkContent!.link
                  return (
                    <li key={item.id}>
                      <CMSLink
                        appearance="inline"
                        className="text-muted-foreground hover:text-foreground"
                        type={l.type ?? undefined}
                        newTab={l.newTab ?? undefined}
                        reference={
                          l.reference ? { relationTo: 'pages', value: l.reference.value } : null
                        }
                        url={l.url ?? undefined}
                        label={l.label}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>

        <Separator />

        <div className="py-8 flex items-center justify-between gap-x-2 gap-y-5 px-4 sm:px-6 xl:px-2">
          <span className="text-sm text-muted-foreground">{`© ${new Date().getFullYear()}`}</span>
          <div className="flex items-center gap-5 text-muted-foreground">
            {(() => {
              const s = footer.socialLinks as FooterType['socialLinks'] | undefined
              const socials = [
                { key: 'twitter', href: s?.twitter, Icon: TwitterIcon, label: 'Twitter' },
                { key: 'instagram', href: s?.instagram, Icon: InstagramIcon, label: 'Instagram' },
                { key: 'facebook', href: s?.facebook, Icon: FacebookIcon, label: 'Facebook' },
                { key: 'linkedin', href: s?.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
                { key: 'youtube', href: s?.youtube, Icon: YoutubeIcon, label: 'YouTube' },
                { key: 'tiktok', href: s?.tiktok, Icon: LinkIcon, label: 'TikTok' },
                { key: 'whatsapp', href: s?.whatsapp, Icon: TextIcon, label: 'WhatsApp' },
                { key: 'telegram', href: s?.telegram, Icon: LinkIcon, label: 'Telegram' },
              ].filter((x) => Boolean(x.href)) as Array<{
                key: string
                href: string
                Icon: React.ComponentType<{ className?: string }>
                label: string
              }>

              return socials.map(({ key, href, Icon, label }) => (
                <Link
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))
            })()}
          </div>
        </div>
      </div>
    </footer>
  )
}

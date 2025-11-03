/* eslint-disable @next/next/no-img-element */
'use client'

import { Media, Navbar as NavbarType } from '@/payload-types'
import { CMSLink } from '@/components/frontend/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ChevronDownIcon, MenuIcon, Globe } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { languagesList, fallbackLng } from '@/app/i18n/settings'
import type { AppLocale } from '@/app/i18n/settings'

// Only show supported locales
const supportedLocales: AppLocale[] = ['hr', 'en', 'es', 'de', 'pl', 'pt', 'uk', 'ru', 'fr', 'it']

export const Navbar = ({ navbar }: { navbar: NavbarType }) => {
  const links = navbar.links || []
  const params = useParams()
  const pathname = usePathname()
  const currentLocale = (params.locale as string) || 'hr'

  const getLanguageUrl = (newLocale: string) => {
    // Replace the current locale in the pathname with the new locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
    // If switching to default language, don't prefix with locale
    if (newLocale === fallbackLng) {
      return pathWithoutLocale
    }
    return `/${newLocale}${pathWithoutLocale}`
  }

  return (
    <header className="border-b bg-background fixed top-0 left-0 right-0 z-50 h-[62px]">
      <div className="mx-auto flex max-w-screen-2xl items-center h-full justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            {navbar.logo && (
              <img src={(navbar.logo as Media)?.url || ''} className="h-6 w-auto" alt="Logo" />
            )}
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {links.map((item) => {
            if (item.type === 'singleLink' && item.singleLinkContent?.link) {
              const l = item.singleLinkContent.link
              return (
                <CMSLink
                  key={item.id}
                  appearance={l.appearance ?? 'link'}
                  className="px-3 py-2 text-sm"
                  type={l.type ?? undefined}
                  newTab={l.newTab ?? undefined}
                  reference={l.reference ? { relationTo: 'pages', value: l.reference.value } : null}
                  url={l.url ?? undefined}
                  label={l.label}
                  locale={currentLocale}
                />
              )
            }

            if (item.type === 'linkGroup' && item.linkGroupContent) {
              const group = item.linkGroupContent
              return (
                <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-3 py-2 text-sm">
                      {group.label} <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 p-1">
                    {group.links?.map((sub) => {
                      const subLink = sub.link
                      return (
                        <DropdownMenuItem key={sub.id} asChild className="rounded-sm">
                          <CMSLink
                            appearance={subLink.appearance ?? 'link'}
                            className="w-full rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                            type={subLink.type ?? undefined}
                            newTab={subLink.newTab ?? undefined}
                            reference={
                              subLink.reference
                                ? { relationTo: 'pages', value: subLink.reference.value }
                                : null
                            }
                            url={subLink.url ?? undefined}
                            label={subLink.label}
                            locale={currentLocale}
                          />
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return null
          })}
        </nav>

        {/* Language Selector - Desktop */}
        <div className="hidden md:flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <span className="text-xl">
                  {languagesList[currentLocale as keyof typeof languagesList]?.flag}{' '}
                </span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {supportedLocales.map((lang) => {
                const langInfo = languagesList[lang as keyof typeof languagesList]
                return (
                  <DropdownMenuItem key={lang} asChild>
                    <Link href={getLanguageUrl(lang)} className="w-full cursor-pointer">
                      <span className="mr-2">{langInfo?.flag}</span>
                      {langInfo?.name}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          {/* Language Selector - Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Select language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {supportedLocales.map((lang) => {
                const langInfo = languagesList[lang as keyof typeof languagesList]
                return (
                  <DropdownMenuItem key={lang} asChild>
                    <Link href={getLanguageUrl(lang)} className="w-full cursor-pointer">
                      <span className="mr-2">{langInfo?.flag}</span>
                      {langInfo?.name}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MenuIcon className="!h-6 !w-6" size={32} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="px-0">
              <div className="px-4 py-3">
                <Link href="/" className="flex items-center gap-2">
                  {navbar.logo && (
                    <img
                      src={(navbar.logo as Media)?.url || ''}
                      className="h-8 w-auto"
                      alt="Logo"
                    />
                  )}
                </Link>
              </div>

              <div className="flex flex-col gap-1 px-2 pb-4">
                {links.map((item) => {
                  if (item.type === 'singleLink' && item.singleLinkContent?.link) {
                    const l = item.singleLinkContent.link
                    return (
                      <CMSLink
                        key={item.id}
                        appearance="link"
                        className="rounded-md px-3 py-2 text-base hover:bg-accent hover:text-accent-foreground w-full whitespace-normal"
                        type={l.type ?? undefined}
                        newTab={l.newTab ?? undefined}
                        reference={
                          l.reference ? { relationTo: 'pages', value: l.reference.value } : null
                        }
                        url={l.url ?? undefined}
                        label={l.label}
                        locale={currentLocale}
                      />
                    )
                  }

                  if (item.type === 'linkGroup' && item.linkGroupContent) {
                    const group = item.linkGroupContent
                    return (
                      <div key={item.id} className="px-1">
                        <div className="text-muted-foreground px-2 pt-2 text-xs font-medium uppercase">
                          {group.label}
                        </div>
                        <div className="mt-1 flex flex-col">
                          {group.links?.map((sub) => {
                            const subLink = sub.link
                            return (
                              <CMSLink
                                key={sub.id}
                                appearance="link"
                                className="rounded-md px-3 py-2 text-base hover:bg-accent hover:text-accent-foreground"
                                type={subLink.type ?? undefined}
                                newTab={subLink.newTab ?? undefined}
                                reference={
                                  subLink.reference
                                    ? { relationTo: 'pages', value: subLink.reference.value }
                                    : null
                                }
                                url={subLink.url ?? undefined}
                                label={subLink.label}
                                locale={currentLocale}
                              />
                            )
                          })}
                        </div>
                      </div>
                    )
                  }

                  return null
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

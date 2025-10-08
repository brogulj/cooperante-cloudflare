import React from 'react'
import './styles.css'
import { Navbar } from '@/components/frontend/navbar'
import { Footer } from '@/components/frontend/footer'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { AppLocale } from '@/app/i18n/settings'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { children } = props
  const { locale } = await props.params

  const payload = await getPayload({ config })

  const [navbar, footer] = await Promise.all([
    payload.findGlobal({ slug: 'navbar', locale: locale as AppLocale }),
    payload.findGlobal({ slug: 'footer', locale: locale as AppLocale }),
  ])

  return (
    <html>
      <body className="min-h-screen flex flex-col">
        <Navbar navbar={navbar} />
        <main className="flex-1 mt-[62px] flex flex-col">{children}</main>
        <Footer footer={footer} />
      </body>
    </html>
  )
}

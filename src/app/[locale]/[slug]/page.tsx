import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers.js'
import config from '@/payload.config'
import { AppLocale } from '@/app/i18n/settings'
import { RenderBlocks } from '@/components/frontend/render-blocks'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as AppLocale,
  })

  if (!page.docs[0]) {
    return <div>Page not found</div>
  }

  return <RenderBlocks blocks={page.docs[0].content} />
}

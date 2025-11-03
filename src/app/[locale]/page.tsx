import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { RenderBlocks } from '@/components/frontend/render-blocks'
import { AppLocale } from '../i18n/settings'
import { Metadata } from 'next'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const page = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } } })

  if (page.docs[0]) {
    return {
      title: page.docs[0].meta?.title,
      description: page.docs[0].meta?.description,
    }
  }

  return {
    title: 'Home',
    description: 'Home',
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    locale: locale as AppLocale,
  })

  if (!page.docs[0]) {
    return <div>Page not found</div>
  }

  return <RenderBlocks blocks={page.docs[0].content} />
}

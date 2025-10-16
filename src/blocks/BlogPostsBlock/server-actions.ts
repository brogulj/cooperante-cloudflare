'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getLatestBlogPosts(locale: string) {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'blogPosts',
    limit: 3,
    sort: '-publishedAt',
    where: { publishedAt: { exists: true } },
    locale: locale as 'hr' | 'en' | 'de' | 'es' | 'pt',
  })
  return posts.docs
}

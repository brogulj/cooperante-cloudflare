'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getJobs(locale: string) {
  const payload = await getPayload({ config })
  const jobs = await payload.find({
    collection: 'jobAds',
    limit: 6,
    sort: '-createdAt',
    locale: locale as 'hr' | 'en' | 'de' | 'es' | 'pt',
  })
  return jobs.docs
}

import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getServerSideURL } from '@/utilities/getURL'

const slugsToExclude = [
  'politika-privatnosti',
  'uvjeti-koristenja',
  'politika-kolacica',
  'cookies',
  'blog',
  'job-ads',
  'home',
]

const locales = ['en', 'es', 'de', 'pl', 'pt', 'uk', 'ru', 'fr', 'it']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    limit: 0,
    where: {},
  })

  const categories = await payload.find({
    collection: 'categories',
    limit: 0,
    where: {},
  })

  const blogPosts = await payload.find({
    collection: 'blogPosts',
    limit: 0,
    where: {},
  })

  const url = getServerSideURL()

  return [
    {
      url: `${url}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${url}/${locale}`]),
        ) as Record<string, string>,
      },
    },
    {
      url: `${url}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${url}/${locale}/blog`]),
        ) as Record<string, string>,
      },
    },
    {
      url: `${url}/job-ads`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${url}/${locale}/job-ads`]),
        ) as Record<string, string>,
      },
    },
    ...pages.docs
      .filter((page) => !slugsToExclude.includes(page.slug))
      .map((page) => ({
        url: `${url}/${page.slug}`,
        lastModified: new Date(page.updatedAt),
        alternates: {
          languages: Object.fromEntries(
            locales.map((locale) => [locale, `${url}/${locale}/${page.slug}`]),
          ) as Record<string, string>,
        },
      })),
    ...blogPosts.docs.map((blogPost) => ({
      url: `${url}/blog/${blogPost.slug}`,
      lastModified: new Date(blogPost.updatedAt),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${url}/${locale}/blog/${blogPost.slug}`]),
        ) as Record<string, string>,
      },
    })),
    ...categories.docs.map((category) => ({
      url: `${url}/blog/category/${category.slug}`,
      lastModified: new Date(category.updatedAt),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${url}/${locale}/blog/category/${category.slug}`]),
        ) as Record<string, string>,
      },
    })),
  ]
}

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AppLocale } from '@/app/i18n/settings'

import { Media as MediaType } from '@/payload-types'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'
import { LinkBase } from '@/components/ui/locale-link'
import getT from '@/app/i18n'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type SearchParams = Promise<{ page?: string; sort?: string }>

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params

  const payload = await getPayload({ config: configPromise })
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'blog' } },
    locale: locale as AppLocale,
  })
  if (!page.docs[0]) {
    return { title: 'Blog', description: 'Blog' }
  }

  return {
    title: page.docs[0].meta?.title || 'Blog',
    description: page.docs[0].meta?.description || 'Blog',
  }
}

export default async function BlogArchivePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: SearchParams
}) {
  const { locale } = await params
  const { page: pageParam, sort: sortParam } = await searchParams
  const { t } = await getT('common')

  const page = Math.max(1, Number(pageParam) || 1)
  const limit = 9

  const payload = await getPayload({ config: configPromise })

  // Fetch all categories
  const categoriesResult = await payload.find({
    collection: 'categories',
    locale: locale as AppLocale,
    limit: 1000,
    depth: 0,
  })
  const allCategories = categoriesResult.docs as any[]

  // Build where clause
  const whereClause: Record<string, unknown> = {
    publishedAt: { exists: true },
  }

  // Determine sort order (default is descending by published date)
  const sortOrder = sortParam === 'asc' ? 'publishedAt' : '-publishedAt'

  const result = await payload.find({
    collection: 'blogPosts',
    locale: locale as AppLocale,
    where: whereClause,
    sort: sortOrder,
    depth: 1,
    limit,
    page,
  })

  const posts = result.docs
  const totalPages = result.totalPages || 1
  const currentPage = result.page || page

  function buildPageItems(current: number, total: number): (number | 'ellipsis')[] {
    const pages: number[] = []
    const delta = 1
    for (let i = 1; i <= total; i += 1) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        pages.push(i)
      }
    }
    const items: (number | 'ellipsis')[] = []
    let prev: number | undefined
    for (const p of pages) {
      if (prev && p - prev > 1) {
        items.push('ellipsis')
      }
      items.push(p)
      prev = p
    }
    return items
  }
  const pageItems = buildPageItems(currentPage, totalPages)

  return (
    <div className="max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 lg:text-4xl">{t('blog')}</h1>

      {/* Categories Links */}
      {allCategories.length > 0 && (
        <div className="mb-8 flex flex-col gap-4">
          <label className="text-sm font-medium">{t('categories')}</label>
          <div className="flex gap-2 flex-row flex-wrap">
            {allCategories.map((category: any) => (
              <LinkBase
                lng={locale}
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors hover:border-gray-400"
              >
                {category.name}
              </LinkBase>
            ))}
          </div>
        </div>
      )}

      {/* Sort Order */}
      <div className="mb-8 flex flex-col gap-2">
        <label className="text-sm font-medium">{t('sortByDate')}</label>
        <div className="flex gap-2">
          <LinkBase
            lng={locale}
            href="/blog"
            className={`px-3 py-2 border rounded-md text-sm transition-colors ${
              !sortParam || sortParam === 'desc'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {t('sortByDateOptions.newestFirst')}
          </LinkBase>
          <LinkBase
            lng={locale}
            href="/blog?sort=asc"
            className={`px-3 py-2 border rounded-md text-sm transition-colors ${
              sortParam === 'asc'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            {t('sortByDateOptions.oldestFirst')}
          </LinkBase>
        </div>
      </div>

      {posts.length === 0 ? (
        <p>{t('noPostsFound')}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <div className="px-6">
                <LinkBase lng={locale} href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-md border bg-muted">
                    {post.headerImage ? (
                      <Image
                        src={(post.headerImage as MediaType).url}
                        alt={post.title}
                        className="object-cover h-full w-full"
                        width={(post.headerImage as MediaType).width}
                        height={(post.headerImage as MediaType).height}
                        quality={80}
                        sizes="(max-width: 768px) 80vw, (max-width: 768px) 50vw, 20vw"
                      />
                    ) : null}
                  </div>
                </LinkBase>
              </div>
              <CardContent className="pt-2 flex flex-col items-start">
                {Array.isArray((post as any).categories) && (post as any).categories.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {(post as any).categories.map((c: any, idx: number) => (
                      <LinkBase lng={locale} href={`/blog/category/${c.slug}`} key={c?.id ?? idx}>
                        <Badge key={c?.id ?? idx} variant="secondary">
                          {typeof c === 'object' && c?.name ? c.name : ''}
                        </Badge>
                      </LinkBase>
                    ))}
                  </div>
                )}
                <CardTitle className="text-lg leading-snug">
                  <LinkBase lng={locale} href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </LinkBase>
                </CardTitle>
                {post.publishedAt && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(post.publishedAt).toLocaleDateString('hr-HR').replaceAll('/', '. ')}.
                  </p>
                )}
                <LinkBase
                  lng={locale}
                  href={`/blog/${post.slug}`}
                  className={cn(
                    buttonVariants(),
                    'mt-4 hover:cursor-pointer w-full lg:w-auto lg:self-end',
                  )}
                >
                  {t('viewDetails')}
                </LinkBase>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  lng={locale}
                  href={`/blog?page=${currentPage - 1}${sortParam ? `&sort=${sortParam}` : ''}`}
                />
              </PaginationItem>
            )}
            {pageItems.map((item, idx) => (
              <PaginationItem key={`${item}-${idx}`}>
                {item === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    lng={locale}
                    href={`/blog?page=${item}${sortParam ? `&sort=${sortParam}` : ''}`}
                    isActive={item === currentPage}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  lng={locale}
                  href={`/blog?page=${currentPage + 1}${sortParam ? `&sort=${sortParam}` : ''}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

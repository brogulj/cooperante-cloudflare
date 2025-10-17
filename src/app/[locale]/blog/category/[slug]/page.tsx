import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AppLocale } from '@/app/i18n/settings'
import { Media } from '@/components/frontend/Media'
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
import { Media as MediaType } from '@/payload-types'
import { LinkBase } from '@/components/ui/locale-link'
import getT from '@/app/i18n'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SearchParams = Promise<{ page?: string; sort?: string }>

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>
  searchParams: SearchParams
}) {
  const { locale, slug } = await params
  const { page: pageParam, sort: sortParam } = await searchParams

  const page = Math.max(1, Number(pageParam) || 1)
  const limit = 10

  const { t } = await getT('common')

  const payload = await getPayload({ config: configPromise })

  const category = (
    await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      locale: locale as AppLocale,
      limit: 1,
    })
  ).docs[0]

  if (!category) {
    return (
      <div className="max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto px-4 py-12">
        {t('categoryNotFound')}
      </div>
    )
  }

  // Determine sort order (default is descending by published date)
  const sortOrder = sortParam === 'asc' ? 'publishedAt' : '-publishedAt'

  const result = await payload.find({
    collection: 'blogPosts',
    locale: locale as AppLocale,
    where: {
      and: [{ publishedAt: { exists: true } }, { categories: { contains: category.id } }],
    },
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
      <div className="mb-6">
        <LinkBase
          lng={locale}
          href={`/blog`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← {t('backToBlog')}
        </LinkBase>
      </div>
      <h1 className="text-3xl font-bold mb-2 lg:text-4xl">{category.name}</h1>
      <p className="text-muted-foreground mb-8">{t('postsInThisCategory')}</p>

      {/* Sort Order */}
      <div className="mb-8 flex flex-col gap-2">
        <label className="text-sm font-medium">{t('sortByDate')}</label>
        <div className="flex gap-2">
          <LinkBase
            lng={locale}
            href={`/blog/category/${slug}`}
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
            href={`/blog/category/${slug}?sort=asc`}
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
                      <img
                        src={(post.headerImage as MediaType).url}
                        alt={post.title}
                        className="object-cover h-full w-full"
                      />
                    ) : null}
                  </div>
                </LinkBase>
              </div>
              <CardContent className="pt-2">
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
                    {new Date(post.publishedAt).toLocaleDateString().replaceAll('/', '. ')}.
                  </p>
                )}
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
                  href={`/blog/category/${slug}?page=${currentPage - 1}${sortParam ? `&sort=${sortParam}` : ''}`}
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
                    href={`/blog/category/${slug}?page=${item}${sortParam ? `&sort=${sortParam}` : ''}`}
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
                  href={`/blog/category/${slug}?page=${currentPage + 1}${sortParam ? `&sort=${sortParam}` : ''}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

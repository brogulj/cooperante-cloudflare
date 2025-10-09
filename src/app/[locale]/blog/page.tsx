import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AppLocale } from '@/app/i18n/settings'
import { Media } from '@/components/frontend/Media'
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

type SearchParams = Promise<{ page?: string }>

export default async function BlogArchivePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: SearchParams
}) {
  const { locale } = await params
  const { page: pageParam } = await searchParams

  const page = Math.max(1, Number(pageParam) || 1)
  const limit = 9

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blogPosts',
    locale: locale as AppLocale,
    where: {
      publishedAt: { exists: true },
    },
    sort: '-publishedAt',
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
      <h1 className="text-3xl font-bold mb-8 lg:text-4xl">Blog</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <div className="px-6">
                <Link href={`/${locale}/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-md border bg-muted">
                    {post.headerImage ? (
                      <img
                        src={(post.headerImage as MediaType).url}
                        className="object-cover h-full w-full"
                      />
                    ) : null}
                  </div>
                </Link>
              </div>
              <CardContent className="pt-2">
                {Array.isArray((post as any).categories) && (post as any).categories.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {(post as any).categories.map((c: any, idx: number) => (
                      <Link href={`/${locale}/blog/category/${c.slug}`} key={c?.id ?? idx}>
                        <Badge key={c?.id ?? idx} variant="secondary">
                          {typeof c === 'object' && c?.name ? c.name : ''}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
                <CardTitle className="text-lg leading-snug">
                  <Link href={`/${locale}/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
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
                <PaginationPrevious href={`/${locale}/blog?page=${currentPage - 1}`} />
              </PaginationItem>
            )}
            {pageItems.map((item, idx) => (
              <PaginationItem key={`${item}-${idx}`}>
                {item === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={`/${locale}/blog?page=${item}`}
                    isActive={item === currentPage}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={`/${locale}/blog?page=${currentPage + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

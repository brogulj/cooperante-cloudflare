import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AppLocale } from '@/app/i18n/settings'
import { JobAd } from '@/payload-types'
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
import getT from '@/app/i18n'
import { Button } from '@/components/ui/button'
import { LinkBase } from '@/components/ui/locale-link'

type SearchParams = Promise<{ page?: string }>

export default async function JobAdsArchivePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: SearchParams
}) {
  const { locale } = await params
  const { page: pageParam } = await searchParams
  const { t } = await getT('common')
  const page = Math.max(1, Number(pageParam) || 1)
  const limit = 9

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'jobAds',
    locale: locale as AppLocale,
    where: {
      status: { equals: 'active' },
    },
    sort: '-createdAt',
    depth: 0,
    limit,
    page,
  })

  const ads = result.docs as JobAd[]
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
      <h1 className="text-3xl font-bold mb-8 lg:text-4xl">{t('jobAds')}</h1>

      {ads.length === 0 ? (
        <p>{t('noJobAdsFound')}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <LinkBase lng={locale} href={`/job-ads/${ad.slug}`} className="block" key={ad.id}>
              <Card>
                <CardContent className=" flex flex-col">
                  <CardTitle className="text-lg leading-snug mb-6">{ad.title}</CardTitle>
                  <div className=" flex flex-wrap gap-2">
                    <div>
                      <span className="font-medium">{t('location')}:</span> {ad.location}
                    </div>
                    <div>
                      <span className="font-medium">{t('employmentType')}:</span>{' '}
                      {t(`employmentTypeOptions.${ad.employmentType}`)}
                    </div>
                    <div>
                      <span className="font-medium">{t('numberOfOpenings')}:</span>{' '}
                      {ad.numberOfOpenings}
                    </div>
                  </div>
                  <div className="pt-4">
                    <span className="font-medium">{t('shortDescription')}:</span>{' '}
                    {ad.shortDescription && (
                      <p className="text-sm text-muted-foreground mt-1">{ad.shortDescription}</p>
                    )}
                  </div>
                  <Button className="mt-4 hover:cursor-pointer">{t('viewDetails')}</Button>
                </CardContent>
              </Card>
            </LinkBase>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious lng={locale} href={`/job-ads?page=${currentPage - 1}`} />
              </PaginationItem>
            )}
            {pageItems.map((item, idx) => (
              <PaginationItem key={`${item}-${idx}`}>
                {item === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    lng={locale}
                    href={`/job-ads?page=${item}`}
                    isActive={item === currentPage}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext lng={locale} href={`/job-ads?page=${currentPage + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

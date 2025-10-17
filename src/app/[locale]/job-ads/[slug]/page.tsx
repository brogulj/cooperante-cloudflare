import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AppLocale } from '@/app/i18n/settings'
import Link from 'next/link'
import getT from '@/app/i18n'
import { FormBlock } from '@/blocks/Form/component'

export default async function JobAdDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const { t } = await getT('common')
  const payload = await getPayload({ config: configPromise })

  const jobAd = (
    await payload.find({
      collection: 'jobAds',
      where: { slug: { equals: slug } },
      locale: locale as AppLocale,
      limit: 1,
    })
  ).docs[0] as any

  if (!jobAd) {
    return (
      <div className="max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto px-4 py-12">
        Job ad not found
      </div>
    )
  }

  return (
    <div className="max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href={`/${locale}/job-ads`} className="text-sm underline">
          ← {t('backToJobAds')}
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4 lg:text-4xl">{jobAd.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-6 text-base">
        <div>
          <span className="font-medium">{t('location')}:</span> {jobAd.location}
        </div>
        <div>
          <span className="font-medium">{t('industry')}:</span> {jobAd.industry}
        </div>
        <div>
          <span className="font-medium">{t('employmentType')}:</span>{' '}
          {t(`employmentTypeOptions.${jobAd.employmentType}`)}
        </div>
        <div>
          <span className="font-medium">{t('numberOfOpenings')}:</span> {jobAd.numberOfOpenings}
        </div>
      </div>
      {jobAd.shortDescription && <p className="text-lg mb-6">{jobAd.shortDescription}</p>}
      {jobAd.description && <p className="text-lg mb-6">{jobAd.description}</p>}
      {jobAd.benefits && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{t('benefits')}</h2>
          <p className="whitespace-pre-line text-base leading-relaxed">{jobAd.benefits}</p>
        </div>
      )}
      {jobAd.form && (
        <div className="py-12">
          <FormBlock form={jobAd.form} />
        </div>
      )}
    </div>
  )
}

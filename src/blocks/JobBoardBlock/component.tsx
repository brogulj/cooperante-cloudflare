'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { JobAd, JobBoardBlock as JobBoardBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/frontend/link'
import { buttonVariants } from '@/components/ui/button'
import { getJobs } from './server-actions'
import { useParams } from 'next/navigation'
import { useT } from '@/app/i18n/client'

export const JobBoardBlock: React.FC<JobBoardBlockProps> = (params) => {
  const { title, subtitle, description, links } = params
  const { locale }: { locale: string } = useParams()
  const [jobs, setJobs] = useState<JobAd[]>([])

  const { t } = useT('common')

  useEffect(() => {
    getJobs(locale).then((jobs) => {
      setJobs(jobs)
    })
  }, [locale])

  return (
    <section className="container py-12 lg:py-32">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8">
        <div className="col-span-4 lg:col-span-12 max-w-4xl">
          {subtitle && <h3 className="text-lg font-medium mb-2">{subtitle}</h3>}
          {title && (
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-6 text-muted-foreground text-lg md:text-lg">{description}</p>
          )}
          {!!links?.length && (
            <div className="flex flex-wrap gap-3 mt-6">
              {links.map(({ link }, i) => (
                <CMSLink key={i} size="lg" {...link} className="w-full lg:w-auto" />
              ))}
            </div>
          )}
        </div>

        <div className="col-span-4 lg:col-span-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
              const href = job?.slug ? `/jobAds/${job.slug}` : undefined

              return (
                <article
                  key={job.id}
                  className="border border-border rounded-lg overflow-hidden h-full"
                >
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold leading-snug">
                        {href ? (
                          <Link href={href} className="hover:underline">
                            {job.title}
                          </Link>
                        ) : (
                          job.title
                        )}
                      </h3>
                      <span className="text-xs rounded px-2 py-1 bg-secondary text-secondary-foreground shrink-0">
                        {t(`employmentTypeOptions.${job.employmentType}`)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {job.location} • {job.industry}
                    </div>
                    <p className="text-sm line-clamp-3">{job.shortDescription}</p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">{t('numberOfOpenings')}:</span>{' '}
                      {job.numberOfOpenings}
                    </div>
                    {href && (
                      <div className="mt-3 flex justify-end">
                        <Link href={href} className={buttonVariants({ variant: 'default' })}>
                          {t('viewDetails')}
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

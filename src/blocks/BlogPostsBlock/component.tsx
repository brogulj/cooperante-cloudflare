'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { BlogPost, BlogPostsBlock as BlogPostsBlockProps, Media } from '@/payload-types'
import { buttonVariants } from '@/components/ui/button'
import { getLatestBlogPosts } from './server-actions'
import { LinkBase } from '@/components/ui/locale-link'
import { useT } from '@/app/i18n/client'

export const BlogPostsBlock: React.FC<BlogPostsBlockProps> = (props) => {
  const { title, description, links } = props
  const { locale }: { locale: string } = useParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const { t } = useT('common')

  useEffect(() => {
    getLatestBlogPosts(locale).then((docs) => setPosts(docs))
  }, [locale])

  return (
    <section className="dark bg-background text-foreground">
      <div className="container py-12 lg:py-32">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8">
          <div className="col-span-4 lg:col-span-12 max-w-4xl">
            {title && (
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                {title}
              </h2>
            )}
            {description && <p className="mt-6 text-lg md:text-lg">{description}</p>}
          </div>

          <div className="col-span-4 lg:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const href = post?.slug ? `/blog/${post.slug}` : undefined
                return (
                  <article
                    key={post.id}
                    className="border border-border rounded-lg overflow-hidden h-full bg-primary text-primary-foreground flex flex-col"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      {post.headerImage ? (
                        <LinkBase lng={locale} href={href} className="group">
                          <img
                            src={(post.headerImage as Media).url || ''}
                            alt=""
                            className="object-cover w-full group-hover:scale-105 transition-all duration-300"
                          />
                        </LinkBase>
                      ) : null}
                    </div>
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <h3 className="text-xl font-semibold leading-snug">
                        {href ? (
                          <LinkBase lng={locale} href={href} className="hover:underline">
                            {post.title}
                          </LinkBase>
                        ) : (
                          post.title
                        )}
                      </h3>
                      {post.publishedAt && (
                        <div className="text-sm text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString().replaceAll('/', '. ')}.
                        </div>
                      )}

                      {post.excerpt && <div className="text-sm">{post.excerpt}</div>}
                      {href && (
                        <div className="mt-auto flex justify-end">
                          <LinkBase
                            lng={locale}
                            href={href}
                            className={buttonVariants({ variant: 'default' })}
                          >
                            {t('readMore')}
                          </LinkBase>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
            {links?.length ? (
              <div className="flex justify-end mt-6">
                {links[0]?.link?.url ? (
                  <LinkBase
                    lng={locale}
                    href={links[0].link.url}
                    className={buttonVariants({ variant: 'outline', size: 'lg' })}
                  >
                    {links[0].link.label || t('allBlogs')}
                  </LinkBase>
                ) : null}
              </div>
            ) : (
              <div className="flex justify-end mt-6">
                <LinkBase
                  lng={locale}
                  href="/blog"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  {t('allBlogs')}
                </LinkBase>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

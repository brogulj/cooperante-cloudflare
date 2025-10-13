import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AppLocale } from '@/app/i18n/settings'
import RichText from '@/components/frontend/richtext'
import TableOfContents from '@/components/frontend/TableOfContents'
import { Media as MediaType } from '@/payload-types'
import { Category, User } from '@/payload-types'
import Link from 'next/link'
import getT from '@/app/i18n'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  const { t } = await getT('common')

  const payload = await getPayload({ config: configPromise })

  const blogPost = (
    await payload.find({
      collection: 'blogPosts',
      where: { slug: { equals: slug } },
      locale: locale as AppLocale,
    })
  ).docs[0]

  if (!blogPost) {
    return <div>{t('blogPostNotFound')}</div>
  }

  return (
    <div>
      <div className="w-full h-[50vh] relative lg:h-[60vh]">
        {blogPost.headerImage && (
          <img
            src={(blogPost.headerImage as MediaType).url}
            className="object-cover h-full w-full"
          />
        )}
        <div
          className={`absolute bottom-0 left-0 right-0 px-4 pb-8 justify-end flex flex-col max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto ${blogPost.headerTheme === 'dark' ? 'text-white' : 'text-black'}`}
        >
          <h1 className="text-3xl font-bold mb-4 lg:text-4xl lg:font-semibold lg:pr-18 xl:text-5xl leading-tight">
            {blogPost.title}
          </h1>
          {blogPost.author && (
            <p className=" text-sm mb-1 lg:text-base">{(blogPost.author as User).name}</p>
          )}
          {blogPost.publishedAt && (
            <p className=" text-sm lg:text-base">
              {new Date(blogPost.publishedAt).toLocaleDateString().replaceAll('/', '. ')}.
            </p>
          )}
        </div>
      </div>
      <div className=" mt-12 max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto px-4">
        <p className="text-lg font-semibold mb-2">{t('categories')}:</p>
        {blogPost.categories && (
          <div className=" text-base font-semibold flex flex-wrap gap-2">
            {blogPost.categories.map((c) => {
              const category = c as Category
              return (
                <Link
                  href={`/blog/category/${category.slug}`}
                  key={category.id}
                  className="text-base font-medium"
                >
                  <span className="underline">{category.name}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
      {/* Mobile TOC below categories */}
      <div className="mt-6 max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:hidden">
        <TableOfContents content={blogPost.content} containerId="article-content" />
      </div>
      <div className="px-4 mt-16 max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div id="article-content">
            <RichText data={blogPost.content} />
          </div>
          <aside className="lg:block hidden sticky top-24 h-fit">
            <TableOfContents content={blogPost.content} containerId="article-content" />
          </aside>
        </div>
      </div>
    </div>
  )
}

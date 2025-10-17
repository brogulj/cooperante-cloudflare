// storage-adapter-import-placeholder
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'
import { hr } from '@payloadcms/translations/languages/hr'
import { en } from '@payloadcms/translations/languages/en'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Navbar } from './globals/Navbar'
import { Footer } from './globals/Footer'
import { JobAds } from './collections/JobAds'
import { BlogPosts } from './collections/BlogPosts'
import { defaultLexical } from './fields/defaultLexical'
import { Categories } from './collections/Categories'
import { testEmail } from './testEmail'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cloudflare = process.argv.find((value) => value.match(/^(generate|migrate):?/))
  ? await getCloudflareContextFromWrangler()
  : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, JobAds, BlogPosts, Categories],
  globals: [Navbar, Footer],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY,
    defaultFromAddress: 'noreply@brick.com.hr',
    defaultFromName: 'Brick Software',
  }),
  plugins: [
    payloadCloudPlugin(),
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    seoPlugin({
      collections: ['pages', 'blogPosts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => doc.title,
      generateDescription: ({ doc }) => doc.excerpt,
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        radio: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        date: false,
        payment: false,
      },
      redirectRelationships: ['pages', 'blogPosts'],
      defaultToEmail: 'roguljbruno@gmail.com',
      beforeEmail: (c) => {
        console.log(c)
        return c
      },
      formOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'privacyPolicy',
            type: 'checkbox',
            label: 'I agree with the privacy policy',
          },
          {
            name: 'contact',
            type: 'checkbox',
            label: 'I want to be contacted by the company',
          },
          {
            name: 'newsletter',
            type: 'checkbox',
            label: 'I want to receive the newsletter',
          },
          {
            name: 'marketing',
            type: 'checkbox',
            label: 'I want to receive marketing materials',
          },
          {
            name: 'termsAndConditions',
            type: 'checkbox',
            label: 'I agree with the terms and conditions',
          },
        ],
      },
    }),
  ],
  localization: {
    locales: ['hr', 'en', 'es', 'de', 'pl', 'pt', 'uk', 'ru', 'fr', 'it'],
    defaultLocale: 'hr',
    fallback: true,
  },
  i18n: {
    supportedLanguages: {
      hr,
      en,
    },
    fallbackLanguage: 'hr',
  },
})

async function getCloudflareContextFromWrangler<
  CfProperties extends Record<string, unknown> = IncomingRequestCfProperties,
  Context = ExecutionContext,
>(options?: GetPlatformProxyOptions): Promise<CloudflareContext<CfProperties, Context>> {
  // Note: we never want wrangler to be bundled in the Next.js app, that's why the import below looks like it does
  const { getPlatformProxy } = await import(
    /* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`
  )

  // This allows the selection of a wrangler environment while running in next dev mode
  const environment = options?.environment ?? process.env.CLOUDFLARE_ENV

  const { env, cf, ctx } = await getPlatformProxy({
    ...options,
    environment,
    experimental: { remoteBindings: process.env.NODE_ENV === 'production' },
  })
  return {
    env,
    cf: cf as unknown as CfProperties,
    ctx: ctx as Context,
  }
}

import { withPayload } from '@payloadcms/next/withPayload'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import path from 'path'

initOpenNextCloudflareForDev({ environment: process.env.CLOUDFLARE_ENV })

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cooperante-cloudflare.roguljbruno.workers.dev',
        pathname: '/**',
      },
    ],
  },
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: '.',
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs'],
    resolveAlias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
} satisfies import('next').NextConfig

export default withPayload(nextConfig, { devBundleServerPackages: false })

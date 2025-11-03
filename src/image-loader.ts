// imageLoader.js or imageLoader.ts
const normalizeSrc = (src: string) => {
  // Remove leading slash if present
  return src.startsWith('/') ? src.slice(1) : src
}

const isSvg = (src: string) => {
  return src.endsWith('.svg')
}

export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality: number
}) {
  if (process.env.NODE_ENV === 'development') {
    // In development, you might just return the original src
    // or a full absolute URL if you need it to work locally (e.g., using a test domain)
    return src
  }

  if (isSvg(src)) {
    return src
  }

  const params = [`width=${width}`, 'format=auto']
  if (quality) {
    params.push(`quality=${quality}`)
  }

  const paramsString = params.join(',')

  // Constructs the Cloudflare Image URL
  // NOTE: Cloudflare will handle the optimization based on these params
  // Ensure the src is relative to your domain's root where the images are hosted
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`
}

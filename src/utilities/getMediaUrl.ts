// Note: Avoid prefixing origin for relative URLs to keep SSR/CSR consistent

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const tag = cacheTag && cacheTag !== '' ? encodeURIComponent(cacheTag) : null

  // If absolute URL, append cache tag and return as absolute
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (!tag) return url
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}${tag}`
  }

  // For relative URLs, do NOT prepend origin to avoid SSR/CSR hydration mismatches
  if (!tag) return url
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}${tag}`
}

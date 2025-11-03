import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { cookieName, fallbackLng, headerName, languages } from './app/i18n/settings'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon\.ico|sw\.js|site\.webmanifest).*)',
    '/api/media/file/:path*',
    '/favicon.ico',
  ],
}

const dontTranslatePaths = [
  '/fonts',
  '/_next',
  '/assets',
  '/images',
  '/favicon.ico',
  '/sw.js',
  '/site.webmanifest',
  '/logo.png',
  '/hgk-logo.png',
  '/brick-logo.png',
  '/api',
  '/admin',
]

export function middleware(req: NextRequest) {
  // --- PRIORITY ONE: Server Action Bypass ---
  // If it's a POST request and has the x-action header, let it pass through immediately.
  // This means no URL rewrites, no custom response headers from the middleware.
  // Next.js needs to handle these responses directly.
  if (req.method === 'POST' && req.headers.has('x-action')) {
    // console.log("Middleware: Bypassing for Server Action:", req.nextUrl.pathname);
    return NextResponse.next()
  }

  // Ensure correct content-type for uploaded SVGs served via API route
  if (req.nextUrl.pathname.startsWith('/api/media/file/')) {
    const response = NextResponse.next()
    if (req.nextUrl.pathname.toLowerCase().endsWith('.svg')) {
      response.headers.set('content-type', 'image/svg+xml; charset=utf-8')
      if (!response.headers.has('content-disposition')) {
        response.headers.set('content-disposition', 'inline')
      }
    }
    return response
  }

  // Your existing bypass for icons/chrome
  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) {
    // console.log("Middleware: Bypassing for icon/chrome:", req.nextUrl.pathname);
    return NextResponse.next()
  }

  // --- Language Detection Logic ---
  let lng
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  }
  if (!lng) {
    lng = fallbackLng
  }

  // Determine if language is already in the path
  const lngInPath = languages.find(
    (loc) => req.nextUrl.pathname == `/${loc}` || req.nextUrl.pathname.startsWith(`/${loc}/`),
  )

  // --- Response Object for Language Header & Cookie ---
  // Create a base response. We'll add headers/cookies to this.
  let response: NextResponse

  // Case 1: Language is NOT in the path (e.g., /pretraga -> /en/pretraga)
  if (!lngInPath && !dontTranslatePaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    const url = req.nextUrl.clone()
    url.pathname = `/${lng}${req.nextUrl.pathname}`
    // console.log("Middleware: Rewriting URL to:", url.pathname);
    response = NextResponse.rewrite(url)
  }
  // Case 2: Language IS in the path, or a path to be ignored (e.g., /en/pretraga, /assets/image.png)
  else {
    // console.log("Middleware: No rewrite needed for:", req.nextUrl.pathname);
    response = NextResponse.next()
  }

  // --- Apply i18n Header to the Response (for client-side knowledge) ---
  // This header is for your i18n library on the client, not for Next.js internal routing.
  response.headers.set(headerName, lngInPath || lng)

  // --- Referer Logic (applies to all non-server-action, non-bypassed requests) ---
  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '')
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    if (lngInReferer) {
      // console.log("Middleware: Setting language cookie from referer:", lngInReferer);
      response.cookies.set(cookieName, lngInReferer)
    }
  }

  // Return the configured response
  return response
}

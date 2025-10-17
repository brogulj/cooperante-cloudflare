'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { GlobeMethods } from 'react-globe.gl'
import {
  IndustriesGlobeBlock as IndustriesGlobeBlockProps,
  Media as MediaType,
} from '@/payload-types'
import earthImage from './earthspec4k.jpg'
import { useT } from '@/app/i18n/client'

type LatLng = { lat: number; lng: number }

function parseLatLng(value?: string | null): LatLng | null {
  if (!value) return null
  const cleaned = value.replace(/,/g, ' ').replace(/\s+/g, ' ').trim()
  const parts = cleaned.split(' ').map((p) => parseFloat(p.trim()))
  if (parts.length !== 2) return null
  const [lat, lng] = parts
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null
  return { lat, lng }
}

export const IndustriesGlobeBlock: React.FC<IndustriesGlobeBlockProps> = (props) => {
  const { title, description, industries, countries, mainLocationLatLong, locationsLatLong } = props

  const globeRef = React.useRef<GlobeMethods | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [dims, setDims] = React.useState<{ w: number; h: number }>({ w: 0, h: 0 })
  const [globeReady, setGlobeReady] = React.useState(false)
  const { t } = useT('common')

  const main = React.useMemo(() => parseLatLng(mainLocationLatLong), [mainLocationLatLong])
  const others: LatLng[] = React.useMemo(
    () =>
      Array.isArray(locationsLatLong)
        ? (locationsLatLong
            .map((l) => parseLatLng(l?.latLong ?? null))
            .filter((v): v is LatLng => !!v) as LatLng[])
        : [],
    [locationsLatLong],
  )

  const pointsData = React.useMemo(
    () => [
      ...(main ? [{ ...main, isMain: true }] : []),
      ...others.map((o) => ({ ...o, isMain: false })),
    ],
    [main, others],
  )

  const arcsData = React.useMemo(
    () =>
      main && others.length > 0
        ? others.map((o) => ({
            startLat: o.lat,
            startLng: o.lng,
            endLat: main.lat,
            endLng: main.lng,
          }))
        : [],
    [main, others],
  )

  // Resolve earth texture URL robustly (works whether import yields string or object)
  const earthUrl = React.useMemo(() => {
    try {
      if (typeof earthImage === 'string') return earthImage
      if (earthImage && typeof (earthImage as { src?: string }).src === 'string') {
        return (earthImage as { src: string }).src
      }
    } catch {}
    return 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
  }, [])

  React.useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth || 1
      const h = el.clientHeight || 1
      setDims({ w, h })
    })
    ro.observe(el)
    // initial
    const w = el.clientWidth || 1
    const h = el.clientHeight || 1
    setDims({ w, h })
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    if (!globeReady || !globeRef.current) return
    try {
      // Disable all user interactions (orbit controls)
      const controls = globeRef.current.controls()
      if (controls) {
        controls.enabled = false
        controls.enableZoom = false
        controls.enableRotate = false
        controls.enablePan = false
      }
      const id = requestAnimationFrame(() => {
        if (!globeRef.current) return
        if (main) {
          globeRef.current.pointOfView({ lat: main.lat - 20, lng: main.lng, altitude: 1.6 }, 1000)
        }
      })
      return () => cancelAnimationFrame(id)
    } catch {}
  }, [main, dims.w, dims.h, globeReady])

  return (
    <section className="py-16 lg:py-32">
      <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          {title ? <h2 className="text-3xl font-semibold lg:text-4xl">{title}</h2> : null}

          {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}

          <h3 className="text-xl font-medium leading-relaxed mt-4">{t('industries')}</h3>
          {Array.isArray(industries) && industries.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {industries.map((it) => (
                <div key={it.id ?? it.industry} className="">
                  <div className="flex justify-center">
                    <p className="font-medium text-center">{it.industry}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <h3 className="text-xl font-medium leading-relaxed mt-4">{t('countriesOfOrigin')}</h3>
          {Array.isArray(countries) && countries.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {countries.map((c) => (
                <div
                  key={c.id ?? c.country}
                  className="px-3 py-2 rounded-lg border border-black text-center text-sm bg-background text-foreground font-medium"
                >
                  {c.country}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          <div
            ref={containerRef}
            className="relative w-full max-h-[520px] overflow-hidden pointer-events-none aspect-square"
          >
            {dims.w > 0 && dims.h > 0 ? (
              <DynamicGlobe
                ref={globeRef}
                width={dims.w}
                height={dims.h}
                backgroundColor="#fcfcfc"
                globeImageUrl={earthUrl}
                pointsData={pointsData}
                pointLat={(d: object) => (d as LatLng & { isMain?: boolean }).lat}
                pointLng={(d: object) => (d as LatLng & { isMain?: boolean }).lng}
                pointAltitude={0}
                pointRadius={(d: object) => ((d as { isMain?: boolean }).isMain ? 1 : 0.7)}
                pointColor={(d: object) =>
                  (d as { isMain?: boolean }).isMain ? '#ef4444' : '#3b82f6'
                }
                arcsData={arcsData}
                arcColor={() => ['#00000000', '#3b82f6']}
                arcAltitude={0.3}
                arcStroke={0.9}
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={5000}
                onGlobeReady={() => setGlobeReady(true)}
                enablePointerInteraction={false}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

// Lazy-load react-globe.gl on client only to avoid SSR window reference
const DynamicGlobe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
      Loading globe...
    </div>
  ),
})

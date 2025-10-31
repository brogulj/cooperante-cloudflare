import React from 'react'
import { CookieSettings } from '@/components/frontend/cookie-settings'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Settings',
  description: 'Manage your cookie preferences',
}

export default function CookiesPage() {
  return <CookieSettings />
}

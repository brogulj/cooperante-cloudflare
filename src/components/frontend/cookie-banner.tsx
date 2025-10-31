'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useT } from '@/app/i18n/client'
import { X } from 'lucide-react'

type CookiePreference = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const COOKIE_CONSENT_NAME = 'cookie-consent'
const COOKIE_EXPIRY_DAYS = 365

export const CookieBanner = () => {
  const { t } = useT('common')
  const [isVisible, setIsVisible] = useState(false)
  const [isDetailedView, setIsDetailedView] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreference>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    // Check if cookie consent has already been given
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_NAME)
    if (!savedConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreference = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    saveCookiePreference(allAccepted)
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreference = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    saveCookiePreference(onlyNecessary)
  }

  const handleSavePreferences = () => {
    saveCookiePreference(preferences)
  }

  const saveCookiePreference = (prefs: CookiePreference) => {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS)

    const consentData = {
      ...prefs,
      timestamp: new Date().toISOString(),
      expiryDate: expiryDate.toISOString(),
    }

    localStorage.setItem(COOKIE_CONSENT_NAME, JSON.stringify(consentData))

    // Load external scripts based on preferences
    loadScriptsBasedOnPreferences(prefs)

    setIsVisible(false)
  }

  const togglePreference = (key: keyof Omit<CookiePreference, 'necessary'>) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-lg">
          <div className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6">
            {!isDetailedView ? (
              // Simple view
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{t('cookies.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('cookies.description')}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {t('cookies.essentialOnly')}{' '}
                    <Link href="/privacy" className="underline hover:no-underline">
                      {t('cookies.privacyPolicy')}
                    </Link>
                    {' · '}
                    <Link href="/cookies" className="underline hover:no-underline">
                      {t('cookies.settings')}
                    </Link>
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 sm:flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="text-xs sm:text-sm"
                  >
                    {t('cookies.rejectAll')}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleAcceptAll}
                    className="text-xs sm:text-sm"
                  >
                    {t('cookies.acceptAll')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDetailedView(true)}
                    className="text-xs sm:text-sm"
                  >
                    {t('cookies.settings')}
                  </Button>
                </div>
              </div>
            ) : (
              // Detailed view
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{t('cookies.detailedSettings')}</h3>
                  <button
                    onClick={() => setIsDetailedView(false)}
                    className="p-1 hover:bg-accent rounded"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {/* Necessary cookies */}
                  <div className="border rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{t('cookies.necessary')}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('cookies.necessaryDescription')}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="h-4 w-4 cursor-not-allowed"
                        aria-label="Necessary cookies"
                      />
                    </div>
                  </div>

                  {/* Functional cookies */}
                  <div className="border rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{t('cookies.functional')}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('cookies.functionalDescription')}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => togglePreference('functional')}
                        className="h-4 w-4 cursor-pointer"
                        aria-label="Functional cookies"
                      />
                    </div>
                  </div>

                  {/* Analytics cookies */}
                  <div className="border rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{t('cookies.analytics')}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('cookies.analyticsDescription')}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                        className="h-4 w-4 cursor-pointer"
                        aria-label="Analytics cookies"
                      />
                    </div>
                  </div>

                  {/* Marketing cookies */}
                  <div className="border rounded p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{t('cookies.marketing')}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('cookies.marketingDescription')}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => togglePreference('marketing')}
                        className="h-4 w-4 cursor-pointer"
                        aria-label="Marketing cookies"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="text-xs sm:text-sm"
                  >
                    {t('cookies.rejectAll')}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSavePreferences}
                    className="text-xs sm:text-sm"
                  >
                    {t('cookies.save')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// Helper function to load scripts based on preferences
function loadScriptsBasedOnPreferences(_prefs: CookiePreference) {
  // Future: implement script loading based on preferences
  // For now, scripts should be loaded conditionally in your app components
}

// Note: These functions are templates for script loading
// In production, consider using conditional script loading in your layout or using a tag manager

// Export a function to get current cookie preferences
export function getCookiePreferences(): CookiePreference | null {
  if (typeof window === 'undefined') return null
  const consent = localStorage.getItem(COOKIE_CONSENT_NAME)
  if (!consent) return null
  try {
    const data = JSON.parse(consent)
    return {
      necessary: data.necessary,
      analytics: data.analytics,
      marketing: data.marketing,
      functional: data.functional,
    }
  } catch {
    return null
  }
}

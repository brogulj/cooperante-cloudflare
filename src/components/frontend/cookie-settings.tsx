'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useT } from '@/app/i18n/client'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'
import {
  getCookiePreferences,
  setCookiePreferences,
  areAnalyticsCookiesAccepted,
  areMarketingCookiesAccepted,
  areFunctionalCookiesAccepted,
  clearCookiePreferences,
} from '@/utilities/cookies'

type CookiePreference = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export const CookieSettings = () => {
  const { t } = useT('common')
  const [preferences, setPreferences] = useState<CookiePreference>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  })
  const [hasConsent, setHasConsent] = useState(false)
  const [isSaved, setIsSaved] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load preferences from localStorage
    const stored = getCookiePreferences()
    if (stored) {
      setPreferences({
        necessary: stored.necessary ?? true,
        analytics: stored.analytics ?? false,
        marketing: stored.marketing ?? false,
        functional: stored.functional ?? false,
      })
      setHasConsent(true)
    }
    setIsLoading(false)
  }, [])

  const handleToggle = (key: keyof Omit<CookiePreference, 'necessary'>) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    setIsSaved(false)
  }

  const handleSave = () => {
    setCookiePreferences(preferences)
    setHasConsent(true)
    setIsSaved(true)

    // Show success message for 3 seconds
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreference = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(allAccepted)
    setCookiePreferences(allAccepted)
    setHasConsent(true)
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreference = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(onlyNecessary)
    setCookiePreferences(onlyNecessary)
    setHasConsent(true)
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  const handleReset = () => {
    clearCookiePreferences()
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    })
    setHasConsent(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">{t('cookies.loading') || 'Loading...'}</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('cookies.detailedSettings')}</h1>
        <p className="text-muted-foreground">
          {t('cookies.settingsDescription') || 'Manage your cookie preferences'}
        </p>
      </div>

      {/* Status Messages */}
      {isSaved && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-green-900 dark:text-green-100">
              {t('cookies.saved') || 'Preferences saved'}
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200 mt-1">
              {t('cookies.savedDescription') || 'Your cookie preferences have been updated.'}
            </p>
          </div>
        </div>
      )}

      {!hasConsent && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100">
              {t('cookies.noConsent') || 'No preferences set'}
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
              {t('cookies.noConsentDescription') ||
                'You have not given any cookie preferences yet. Choose your preferences below.'}
            </p>
          </div>
        </div>
      )}

      {/* Cookie Categories */}
      <div className="space-y-4 mb-8">
        {/* Necessary Cookies */}
        <div className="border rounded-lg p-6 bg-card">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {t('cookies.necessary')}
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  {t('cookies.required') || 'Required'}
                </span>
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('cookies.necessaryDescription')}
              </p>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">{t('cookies.examples')}:</span> Session cookies,
                  CSRF tokens, language preferences
                </p>
              </div>
            </div>
            <div className="ml-4">
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="h-5 w-5 cursor-not-allowed accent-primary"
                aria-label="Necessary cookies"
              />
            </div>
          </div>
        </div>

        {/* Functional Cookies */}
        <div className="border rounded-lg p-6 bg-card hover:bg-accent/50 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{t('cookies.functional')}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('cookies.functionalDescription')}
              </p>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">{t('cookies.examples')}:</span> User preferences, UI
                  customization, remember-me functionality
                </p>
              </div>
            </div>
            <div className="ml-4">
              <input
                type="checkbox"
                checked={preferences.functional}
                onChange={() => handleToggle('functional')}
                className="h-5 w-5 cursor-pointer accent-primary"
                aria-label="Functional cookies"
              />
            </div>
          </div>
        </div>

        {/* Analytics Cookies */}
        <div className="border rounded-lg p-6 bg-card hover:bg-accent/50 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{t('cookies.analytics')}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('cookies.analyticsDescription')}
              </p>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">{t('cookies.examples')}:</span> Google Analytics,
                  page views, user interactions
                </p>
              </div>
            </div>
            <div className="ml-4">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => handleToggle('analytics')}
                className="h-5 w-5 cursor-pointer accent-primary"
                aria-label="Analytics cookies"
              />
            </div>
          </div>
        </div>

        {/* Marketing Cookies */}
        <div className="border rounded-lg p-6 bg-card hover:bg-accent/50 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{t('cookies.marketing')}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('cookies.marketingDescription')}
              </p>
              <div className="mt-3 text-xs text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">{t('cookies.examples')}:</span> Facebook Pixel,
                  Google Ads, retargeting pixels
                </p>
              </div>
            </div>
            <div className="ml-4">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => handleToggle('marketing')}
                className="h-5 w-5 cursor-pointer accent-primary"
                aria-label="Marketing cookies"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between pb-8">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={handleRejectAll} className="min-w-32">
            {t('cookies.rejectAll')}
          </Button>
          <Button variant="default" onClick={handleAcceptAll} className="min-w-32">
            {t('cookies.acceptAll')}
          </Button>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={handleReset} className="min-w-32">
            {t('cookies.reset') || 'Reset'}
          </Button>
          <Button variant="default" onClick={handleSave} className="min-w-32" disabled={isSaved}>
            {t('cookies.save')}
          </Button>
        </div>
      </div>

      {/* Info Box */}
      <div className="border rounded-lg p-4 bg-muted/30">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {t('cookies.info') || 'Information'}
        </h4>
        <p className="text-sm text-muted-foreground">
          {t('cookies.infoCookieStorage') ||
            'Your preferences are stored locally in your browser for 365 days. You can change these settings at any time by visiting this page.'}
        </p>
      </div>
    </div>
  )
}

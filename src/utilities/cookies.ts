/**
 * Cookie utilities for managing user cookie preferences
 * This module provides helper functions to interact with cookie consent
 */

const COOKIE_CONSENT_NAME = 'cookie-consent'

export type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
  timestamp?: string
  expiryDate?: string
}

/**
 * Get current cookie preferences from localStorage
 * Returns null if no preferences have been set
 */
export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null

  const consent = localStorage.getItem(COOKIE_CONSENT_NAME)
  if (!consent) return null

  try {
    return JSON.parse(consent)
  } catch (error) {
    console.error('Failed to parse cookie preferences:', error)
    return null
  }
}

/**
 * Set cookie preferences in localStorage
 */
export function setCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === 'undefined') return

  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 365)

  const data = {
    ...preferences,
    timestamp: new Date().toISOString(),
    expiryDate: expiryDate.toISOString(),
  }

  localStorage.setItem(COOKIE_CONSENT_NAME, JSON.stringify(data))
}

/**
 * Check if a specific cookie type has been accepted
 */
export function isCookieTypeAccepted(
  cookieType: keyof Omit<CookiePreferences, 'timestamp' | 'expiryDate'>,
): boolean {
  const prefs = getCookiePreferences()
  return prefs?.[cookieType] ?? false
}

/**
 * Check if analytics cookies are accepted
 */
export function areAnalyticsCookiesAccepted(): boolean {
  return isCookieTypeAccepted('analytics')
}

/**
 * Check if marketing cookies are accepted
 */
export function areMarketingCookiesAccepted(): boolean {
  return isCookieTypeAccepted('marketing')
}

/**
 * Check if functional cookies are accepted
 */
export function areFunctionalCookiesAccepted(): boolean {
  return isCookieTypeAccepted('functional')
}

/**
 * Clear cookie preferences (will show banner again on next visit)
 */
export function clearCookiePreferences(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(COOKIE_CONSENT_NAME)
}

/**
 * Check if user has already given consent
 */
export function hasUserGivenConsent(): boolean {
  return getCookiePreferences() !== null
}

/**
 * Check if consent has expired (365 days)
 */
export function hasConsentExpired(): boolean {
  const prefs = getCookiePreferences()
  if (!prefs?.expiryDate) return false

  const expiryDate = new Date(prefs.expiryDate)
  return new Date() > expiryDate
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  setCookiePreferences({
    necessary: true,
    analytics: true,
    marketing: true,
    functional: true,
  })
}

/**
 * Reject all non-essential cookies
 */
export function rejectAllCookies(): void {
  setCookiePreferences({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  })
}

/**
 * Get a summary of which cookies are accepted
 */
export function getCookieSummary(): string {
  const prefs = getCookiePreferences()
  if (!prefs) return 'No cookie preferences set'

  const types = []
  if (prefs.analytics) types.push('Analytics')
  if (prefs.marketing) types.push('Marketing')
  if (prefs.functional) types.push('Functional')
  if (types.length === 0) types.push('Essential Only')

  return `Cookies accepted: ${types.join(', ')}`
}

/**
 * Event listener callback for cookie preference changes
 */
export type CookiePreferenceListener = (preferences: CookiePreferences) => void

const listeners: Set<CookiePreferenceListener> = new Set()

/**
 * Subscribe to cookie preference changes
 * Returns an unsubscribe function
 */
export function onCookiePreferenceChange(callback: CookiePreferenceListener): () => void {
  listeners.add(callback)

  return () => {
    listeners.delete(callback)
  }
}

/**
 * Notify all listeners of a cookie preference change
 * (Used internally by the cookie banner)
 */
export function notifyCookiePreferenceChange(preferences: CookiePreferences): void {
  listeners.forEach((listener) => {
    try {
      listener(preferences)
    } catch (error) {
      console.error('Error in cookie preference listener:', error)
    }
  })
}

'use server'

import i18next from './i18next'
import { headerName } from './settings'
import { headers } from 'next/headers'

async function getT(ns?: string | string[], options?: any) {
  const namespace = ns ?? 'common'
  const headerList = await headers()
  const lng = headerList.get(headerName)
  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng)
  }
  if (namespace && !i18next.hasLoadedNamespace(namespace)) {
    await i18next.loadNamespaces(namespace)
  }
  return {
    t: i18next.getFixedT(
      lng ?? i18next.resolvedLanguage ?? '',
      Array.isArray(namespace) ? namespace[0] : namespace,
      options?.keyPrefix,
    ),
    i18n: i18next,
  }
}

export default getT

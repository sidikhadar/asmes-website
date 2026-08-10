'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  DEFAULT_LOCALE,
  DICTIONARIES,
  isRtl,
  LOCALES,
  type Dictionary,
  type Locale,
} from '@/lib/i18n'

const STORAGE_KEY = 'asmes-locale'

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  /** Dictionary for the active locale. Access like `t.hero.title`. */
  t: Dictionary
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function applyDocumentLocale(locale: Locale) {
  const html = document.documentElement
  html.lang = locale
  html.dir = isRtl(locale) ? 'rtl' : 'ltr'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // Restore a previously chosen locale on mount and reflect it on <html>.
  // Defaults to French; we intentionally do NOT auto-detect the browser
  // language so the site always opens in French unless the visitor picks
  // another language themselves.
  useEffect(() => {
    let initial: Locale = DEFAULT_LOCALE
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved && (LOCALES as readonly string[]).includes(saved)) {
        initial = saved as Locale
      }
    } catch {
      /* localStorage unavailable — fall back to default */
    }
    setLocaleState(initial)
    applyDocumentLocale(initial)
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    applyDocumentLocale(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore persistence errors */
    }
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: DICTIONARIES[locale],
      dir: isRtl(locale) ? 'rtl' : 'ltr',
    }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

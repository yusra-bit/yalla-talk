import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LANGUAGE_META, translations, type Language, type Translation } from './translations'

const STORAGE_KEY = 'yalla-talk:lang'

interface LanguageContextValue {
  lang: Language
  dir: 'ltr' | 'rtl'
  t: Translation
  /** Locale-aware numbers (Arabic-Indic digits in Arabic). */
  fmt: (n: number) => string
  setLang: (lang: Language) => void
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ar') return stored
  } catch {
    /* storage unavailable — fall through */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStoredLanguage)
  const dir = LANGUAGE_META[lang].dir

  // Keep <html lang/dir> in sync so CSS, fonts and the browser all follow.
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang, dir])

  const setLang = useCallback((next: Language) => setLangState(next), [])
  const toggleLang = useCallback(() => setLangState((c) => (c === 'en' ? 'ar' : 'en')), [])

  const value = useMemo(
    () => {
      const nf = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en')
      return { lang, dir, t: translations[lang], fmt: (n: number) => nf.format(n), setLang, toggleLang }
    },
    [lang, dir, setLang, toggleLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}

import { useLanguage } from '../i18n/LanguageContext'

/** First tab stop. A button (not an #anchor) because the app routes on the URL hash. */
export default function SkipLink() {
  const { t } = useLanguage()
  return (
    <button
      type="button"
      onClick={() => document.getElementById('main')?.focus()}
      className="sr-only rounded-full bg-plum text-sm font-bold text-cream focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:min-h-11 focus:px-5 focus:py-3"
    >
      {t.ui.skipToContent}
    </button>
  )
}

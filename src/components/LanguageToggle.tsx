import { useLanguage } from '../i18n/LanguageContext'
import { GlobeIcon } from './icons'

/** Button label shows the language you'll switch TO, written in that language. */
export default function LanguageToggle() {
  const { t, toggleLang, lang } = useLanguage()
  return (
    <button
      type="button"
      onClick={toggleLang}
      lang={lang === 'en' ? 'ar' : 'en'}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-plum/15 bg-paper px-3 text-sm sm:gap-2 sm:px-4 font-bold text-plum
                 transition duration-200 hover:border-lavender-deep hover:bg-lavender-tint active:scale-95"
    >
      <GlobeIcon className="size-4.5" />
      {t.switchTo}
    </button>
  )
}

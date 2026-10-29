import { BRAND } from '../config/brand'
import { useLanguage } from '../i18n/LanguageContext'

export default function Wordmark() {
  const { lang } = useLanguage()
  return (
    <div className="flex items-center gap-2.5" aria-label={BRAND.name[lang]}>
      <span className="grid size-9 place-items-center rounded-2xl sm:size-10 bg-lavender shadow-soft">
        <svg viewBox="0 0 32 32" className="size-6 text-plum rtl:-scale-x-100" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7 10a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7l-5.500 4.500V20A3 3 0 0 1 7 17z"
          />
          <circle cx="12" cy="13.500" r="1.400" fill="#B9A6F0" />
          <circle cx="16" cy="13.500" r="1.400" fill="#F6D97A" />
          <circle cx="20" cy="13.500" r="1.400" fill="#F2836B" />
        </svg>
      </span>
      <span className="text-lg font-extrabold tracking-tight sm:text-xl">{BRAND.name[lang]}</span>
    </div>
  )
}

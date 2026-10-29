import { useLanguage } from '../i18n/LanguageContext'
import { useRouter } from '../router/Router'
import { ArrowIcon } from './icons'

export default function BackButton() {
  const { t } = useLanguage()
  const { goBack } = useRouter()
  return (
    <button
      type="button"
      onClick={goBack}
      className="group inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-plum/15 bg-paper ps-3 pe-5 text-base font-bold text-plum
                 transition duration-200 hover:border-lavender-deep hover:bg-lavender-tint active:scale-95"
    >
      <ArrowIcon className="size-5 -scale-x-100 transition duration-200 group-hover:-translate-x-0.5 rtl:scale-x-100 rtl:group-hover:translate-x-0.5" />
      {t.ui.back}
    </button>
  )
}

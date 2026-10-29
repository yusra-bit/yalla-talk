import { useLanguage } from '../i18n/LanguageContext'
import { HeartIcon } from './icons'

/** Toggle with a constant accessible name; the pressed state tells assistive tech whether it's saved. */
export default function FavoriteButton({ saved, onToggle }: { saved: boolean; onToggle: () => void }) {
  const { t } = useLanguage()
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={t.ui.favorites.save}
      title={saved ? t.ui.favorites.remove : t.ui.favorites.save}
      onClick={onToggle}
      className={`grid size-12 shrink-0 place-items-center rounded-full border-2 [touch-action:manipulation] transition duration-200 active:scale-90
        ${saved ? 'border-coral-deep/40 bg-coral-tint' : 'border-plum/20 bg-paper hover:border-coral-deep hover:bg-coral-tint'}`}
    >
      <HeartIcon key={String(saved)} filled={saved} className={`size-6 ${saved ? 'animate-pop text-coral-deep' : 'text-plum'}`} />
    </button>
  )
}

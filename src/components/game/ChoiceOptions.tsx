import { TONES, type CardTone } from '../../config/modes'
import type { Localized } from '../../data'
import { useLanguage } from '../../i18n/LanguageContext'
import { CheckIcon } from '../icons'

interface Props {
  options: readonly [Localized, Localized]
  selected: 0 | 1 | undefined
  onSelect: (choice: 0 | 1) => void
  tone: CardTone
  /** tiles: short answers side by side (stacked on phones). stacked: longer scenarios, always stacked with A/B badges. */
  variant: 'tiles' | 'stacked'
}

export default function ChoiceOptions({ options, selected, onSelect, tone, variant }: Props) {
  const { lang, t } = useLanguage()
  const letters = [t.ui.preview.a, t.ui.preview.b]
  const stacked = variant === 'stacked'

  const option = (i: 0 | 1) => {
    const on = selected === i
    return (
      <button
        key={i}
        type="button"
        aria-pressed={on}
        onClick={() => onSelect(i)}
        className={`relative flex w-full items-center gap-4 rounded-3xl border-2 p-5 font-extrabold [touch-action:manipulation]
          transition duration-200 active:scale-[0.98]
          ${stacked ? 'min-h-28 text-start text-xl sm:text-2xl' : 'min-h-32 justify-center text-center text-2xl sm:min-h-44 sm:text-3xl'}
          ${on ? `border-plum ${TONES[tone].chip} shadow-lift` : 'border-plum/15 bg-paper hover:-translate-y-0.5 hover:border-lavender-deep hover:shadow-soft'}`}
      >
        {stacked && (
          <span className={`grid size-10 shrink-0 place-items-center rounded-full text-base ${on ? 'bg-plum text-cream' : `${TONES[tone].chip} text-plum`}`}>
            {letters[i]}
          </span>
        )}
        <span className="min-w-0 text-balance">{options[i][lang]}</span>
        {on && (
          <>
            <span className="animate-pop absolute -top-3 end-4 grid size-7 place-items-center rounded-full bg-plum text-cream">
              <CheckIcon className="size-4" />
            </span>
            <span className="sr-only">{t.ui.game.selected}</span>
          </>
        )}
      </button>
    )
  }

  const or = <span className="justify-self-center rounded-full bg-plum px-3 py-1 text-sm font-bold text-cream">{t.ui.preview.or}</span>

  return (
    <div className={`grid grid-cols-1 items-center gap-3 ${stacked ? '' : 'sm:grid-cols-[1fr_auto_1fr]'}`}>
      {option(0)}
      {or}
      {option(1)}
    </div>
  )
}

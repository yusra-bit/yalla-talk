import { useLanguage } from '../../i18n/LanguageContext'
import { ArrowIcon } from '../icons'
import RestartControl from './RestartControl'

interface Props {
  /** Label of the main action — same button element throughout, so keyboard focus survives Reveal → Next. */
  primaryLabel: string
  onPrimary: () => void
  onSkip: () => void
  onRestart: () => void
  restartNeedsConfirm: boolean
}

export default function GameControls({ primaryLabel, onPrimary, onSkip, onRestart, restartNeedsConfirm }: Props) {
  const { t } = useLanguage()
  return (
    <div className="sticky-controls sticky bottom-0 z-10 -mx-5 mt-auto flex flex-col items-center gap-1 bg-gradient-to-t from-cream from-70% to-transparent px-5 pt-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8">
      <div className="flex w-full max-w-xl flex-wrap gap-3">
        <button
          type="button"
          onClick={onSkip}
          className="min-h-14 shrink-0 rounded-full border-2 border-plum/20 bg-paper px-5 text-base font-bold [touch-action:manipulation] transition duration-200 hover:border-lavender-deep hover:bg-lavender-tint active:scale-95 sm:px-6"
        >
          {t.ui.game.skip}
        </button>
        <button
          type="button"
          onClick={onPrimary}
          className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-plum px-3 text-base font-extrabold min-w-36 text-cream shadow-lift min-[360px]:px-4 min-[360px]:text-lg [touch-action:manipulation] transition duration-200 hover:bg-lavender-deep active:scale-[0.98] sm:px-6"
        >
          {primaryLabel}
          <ArrowIcon className="size-5 shrink-0 rtl:-scale-x-100" />
        </button>
      </div>
      <RestartControl onRestart={onRestart} needsConfirm={restartNeedsConfirm} />
    </div>
  )
}

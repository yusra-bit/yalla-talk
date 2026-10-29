import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { hrefFor } from '../../router/Router'

interface Props {
  onRestart: () => void
  /** False when there's nothing to lose (still on the first, untouched question): restart immediately. */
  needsConfirm: boolean
}

/** Restart with an inline confirmation (no modal), plus Back to Games. Neither touches favorites. */
export default function RestartControl({ onRestart, needsConfirm }: Props) {
  const { t } = useLanguage()
  const [asking, setAsking] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (asking) cancelRef.current?.focus() // safest default for keyboard users
  }, [asking])

  const cancel = () => {
    setAsking(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const linkCls = 'inline-flex min-h-11 items-center rounded-full px-4 text-sm font-bold text-plum-soft underline-offset-4 transition hover:text-plum hover:underline'

  if (asking) {
    return (
      <div
        role="group"
        aria-label={t.ui.game.restartAsk}
        onKeyDown={(e) => e.key === 'Escape' && cancel()}
        className="animate-card-in flex w-full max-w-xl flex-col items-center gap-2 rounded-3xl border-2 border-plum/15 bg-paper p-3 text-center"
      >
        <p className="text-sm font-extrabold">{t.ui.game.restartAsk}</p>
        <p className="text-sm text-plum-soft">{t.ui.game.restartSafe}</p>
        <div className="flex gap-2">
          <button ref={cancelRef} type="button" onClick={cancel} className="min-h-11 rounded-full border-2 border-plum/20 px-5 text-sm font-bold transition hover:bg-lavender-tint active:scale-95">
            {t.ui.game.restartCancel}
          </button>
          <button
            type="button"
            onClick={() => {
              setAsking(false)
              onRestart()
            }}
            className="min-h-11 rounded-full bg-coral-deep px-5 text-sm font-extrabold text-cream transition hover:brightness-110 active:scale-95"
          >
            {t.ui.game.restartYes}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-center">
      <button ref={triggerRef} type="button" onClick={() => (needsConfirm ? setAsking(true) : onRestart())} className={linkCls}>
        {t.ui.game.restart}
      </button>
      <span aria-hidden="true" className="size-1 rounded-full bg-plum/30" />
      <a href={hrefFor({ name: 'home' })} className={linkCls}>
        {t.ui.game.backToGames}
      </a>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { TONES, type CardTone } from '../../config/modes'
import { useLanguage } from '../../i18n/LanguageContext'
import { hrefFor } from '../../router/Router'

interface Props {
  total: number
  tone: CardTone
  favoritesCount: number
  onRestart: () => void
}

export default function ExhaustedCard({ total, tone, favoritesCount, onRestart }: Props) {
  const { t, fmt } = useLanguage()
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => ref.current?.focus({ preventScroll: true }), [])

  return (
    <section className={`animate-card-in flex flex-col items-start gap-5 rounded-(--radius-card) border-2 border-plum/10 p-6 shadow-soft sm:p-10 ${TONES[tone].card}`}>
      <span className="flex gap-2" aria-hidden="true">
        {['bg-lavender', 'bg-butter', 'bg-coral'].map((c, i) => (
          <span key={c} className={`animate-dot-hop size-4 rounded-full ${c}`} style={{ animationDelay: `${i * 120}ms` }} />
        ))}
      </span>
      <h2 ref={ref} tabIndex={-1} className="text-4xl leading-tight font-extrabold tracking-tight text-balance outline-none sm:text-5xl">
        {t.ui.game.doneTitle}
      </h2>
      <p className="max-w-xl text-lg leading-relaxed text-plum-soft">{t.ui.game.doneBody.replace('{total}', fmt(total))}</p>

      <p className="max-w-xl rounded-2xl bg-paper px-4 py-3 text-base font-semibold">
        {favoritesCount > 0 ? (
          <>
            {t.ui.game.doneFavorites.replace('{n}', fmt(favoritesCount))}{' '}
            <a href={hrefFor({ name: 'favorites' })} className="font-extrabold text-lavender-deep underline underline-offset-4">
              {t.ui.favorites.viewAll}
            </a>
          </>
        ) : (
          t.ui.game.doneTip
        )}
      </p>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="min-h-14 rounded-full bg-plum px-8 text-lg font-extrabold text-cream shadow-lift [touch-action:manipulation] transition duration-200 hover:bg-lavender-deep active:scale-[0.98]"
        >
          {t.ui.game.shuffleAgain}
        </button>
        <a
          href={hrefFor({ name: 'home' })}
          className="inline-flex min-h-14 items-center justify-center rounded-full border-2 border-plum/20 bg-paper px-8 text-lg font-bold transition duration-200 hover:border-lavender-deep hover:bg-lavender-tint active:scale-[0.98]"
        >
          {t.ui.game.backToGames}
        </a>
      </div>
    </section>
  )
}

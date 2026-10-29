import { useRef } from 'react'
import BackButton from '../components/BackButton'
import { ArrowIcon } from '../components/icons'
import { TONES, getMode } from '../config/modes'
import { useLanguage } from '../i18n/LanguageContext'
import type { GameModeId } from '../i18n/translations'
import { useSessionApi } from '../game/SessionContext'
import { hrefFor, useArrivalFocus } from '../router/Router'

/** Shows the round layout (one card, or two options) without any real questions. */
function ModePreview({ choices }: { choices: 1 | 2 }) {
  const { t } = useLanguage()
  const tile = 'grid min-h-24 place-items-center rounded-2xl border-2 border-plum/10 bg-paper text-4xl font-extrabold text-plum shadow-soft'
  return (
    <div aria-hidden="true" className="mt-8 max-w-xl">
      {choices === 1 ? (
        <div className={`${tile} min-h-32`}>{t.ui.preview.q}</div>
      ) : (
        <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className={tile}>{t.ui.preview.a}</div>
          <span className="justify-self-center rounded-full bg-plum px-3 py-1 text-sm font-bold text-cream">{t.ui.preview.or}</span>
          <div className={tile}>{t.ui.preview.b}</div>
        </div>
      )}
    </div>
  )
}

export default function ModeIntro({ mode }: { mode: GameModeId }) {
  const { t } = useLanguage()
  const sessions = useSessionApi()
  const cfg = getMode(mode)
  const m = t.modes[mode]
  const tone = TONES[cfg.tone]
  const headingRef = useRef<HTMLHeadingElement>(null)
  useArrivalFocus(headingRef)

  return (
    <main id="main" tabIndex={-1} className="outline-none flex flex-1 flex-col gap-8 py-6 sm:py-10">
      <div>
        <BackButton />
      </div>

      <section className={`rounded-(--radius-card) border-2 border-plum/10 p-6 shadow-soft sm:p-10 ${tone.card}`}>
        <span className={`grid size-16 place-items-center rounded-2xl text-plum ${tone.chip}`}>
          <cfg.Icon className="size-9" />
        </span>
        <h1 ref={headingRef} tabIndex={-1} className="mt-5 text-4xl leading-tight font-extrabold tracking-tight text-balance outline-none sm:text-6xl">
          {m.title}
        </h1>
        <p className="mt-3 text-xl font-bold sm:text-2xl">{m.tagline}</p>
        <p className="mt-2 max-w-xl text-lg leading-relaxed text-plum-soft">{m.description}</p>
        <ModePreview choices={cfg.choices} />
      </section>

      <section aria-labelledby="how-heading" className="flex flex-col gap-4">
        <h2 id="how-heading" className="text-lg font-bold text-plum-soft">
          {t.ui.howItWorks}
        </h2>
        <ol className="grid gap-3 sm:grid-cols-3">
          {m.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 rounded-2xl border-2 border-plum/10 bg-paper p-4">
              <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-extrabold text-plum ${tone.chip}`}>
                {t.ui.numerals[i]}
              </span>
              <span className="pt-0.5 text-base leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="sticky-controls sticky bottom-0 z-10 -mx-5 mt-auto bg-gradient-to-t from-cream from-60% to-transparent px-5 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8">
        <a
          href={hrefFor({ name: 'play', mode })}
          onClick={() => sessions.begin(mode)}
          className="flex min-h-16 w-full items-center justify-center gap-3 rounded-full bg-plum px-8 text-xl font-extrabold text-cream shadow-lift [touch-action:manipulation]
                     transition duration-200 hover:-translate-y-0.5 hover:bg-lavender-deep active:scale-[0.98] sm:w-auto sm:min-w-72"
        >
          {t.ui.startPlaying}
          <ArrowIcon className="size-6 rtl:-scale-x-100" />
        </a>
      </div>
    </main>
  )
}

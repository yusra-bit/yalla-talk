import { useRef } from 'react'
import GameModeCard from '../components/GameModeCard'
import { HeartIcon } from '../components/icons'
import { MODES } from '../config/modes'
import { useFavorites } from '../favorites/FavoritesContext'
import { useLanguage } from '../i18n/LanguageContext'
import { hrefFor, useArrivalFocus } from '../router/Router'

export default function Home() {
  const { t, fmt } = useLanguage()
  const { count } = useFavorites()
  const headingRef = useRef<HTMLHeadingElement>(null)
  useArrivalFocus(headingRef)

  return (
    <>
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col gap-10 py-8 outline-none sm:gap-14 sm:py-16">
        <section className="relative max-w-2xl">
          <span aria-hidden="true" className="absolute -top-3 end-2 size-6 rounded-full bg-butter sm:end-24 sm:size-8" />
          <span aria-hidden="true" className="absolute -top-1 end-12 size-3 rounded-full bg-coral sm:end-12" />
          <svg aria-hidden="true" viewBox="0 0 80 12" className="mb-5 h-3 w-20 text-coral">
            <path d="M2 6c6-8 12 8 18 0s12 8 18 0 12 8 18 0 12 8 18 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <h1 ref={headingRef} tabIndex={-1} className="text-5xl leading-[1.05] font-extrabold tracking-tight text-balance outline-none sm:text-7xl">
            {t.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-plum-soft sm:text-xl">{t.subtitle}</p>
        </section>

        <section aria-labelledby="modes-heading" className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="modes-heading" className="text-lg font-bold text-plum-soft">
              {t.modesHeading}
            </h2>
            <a
              href={hrefFor({ name: 'favorites' })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-plum/15 bg-paper px-4 text-sm font-bold transition duration-200 hover:border-coral-deep hover:bg-coral-tint active:scale-95"
            >
              <HeartIcon filled={count > 0} className="size-5 text-coral-deep" />
              {t.ui.favorites.link}
              {count > 0 && (
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-coral-deep px-1.5 text-xs font-extrabold text-cream tabular-nums">{fmt(count)}</span>
              )}
            </a>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {MODES.map(({ id, tone, Icon, tilt }, i) => {
              const m = t.modes[id]
              return (
                <li key={id} className={`flex ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                  <GameModeCard title={m.title} description={m.description} hint={m.hint} tone={tone} Icon={Icon} tilt={tilt} href={hrefFor({ name: 'intro', mode: id })} />
                </li>
              )
            })}
          </ul>
        </section>
      </main>

      <footer className="flex items-center justify-center gap-2 pt-4 text-sm font-semibold text-plum-soft">
        <span aria-hidden="true" className="size-2 rounded-full bg-lavender" />
        <span aria-hidden="true" className="size-2 rounded-full bg-butter" />
        <span aria-hidden="true" className="size-2 rounded-full bg-coral" />
        <span className="ms-1">{t.footer}</span>
      </footer>
    </>
  )
}

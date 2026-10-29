import { useRef, useState } from 'react'
import BackButton from '../components/BackButton'
import FavoriteButton from '../components/FavoriteButton'
import { HeartIcon } from '../components/icons'
import { MODES, TONES, getMode } from '../config/modes'
import { getQuestion } from '../data'
import { useFavorites } from '../favorites/FavoritesContext'
import type { FavoriteEntry } from '../favorites/storage'
import { useLanguage } from '../i18n/LanguageContext'
import { hrefFor, useArrivalFocus } from '../router/Router'

function FavoriteCard({ entry, index }: { entry: FavoriteEntry; index: number }) {
  const { lang, t } = useLanguage()
  const favs = useFavorites()
  const q = getQuestion(entry.mode, entry.id)
  if (!q) return null
  const saved = favs.isFavorite(entry.mode, entry.id)
  const tone = TONES[getMode(entry.mode).tone]

  return (
    <li
      data-favorite-id={entry.id}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
      className={`animate-card-in flex items-start gap-3 rounded-3xl border-2 border-plum/10 p-4 shadow-soft sm:p-5 ${tone.card} ${saved ? '' : 'opacity-80'}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {q.options ? (
          <>
            <p className="text-sm font-bold text-plum-soft">{q.prompt[lang]}</p>
            <div className="flex flex-col gap-1.5">
              <p className="rounded-xl bg-paper px-3 py-2 text-lg font-extrabold">{q.options[0][lang]}</p>
              <span className="w-fit rounded-full bg-plum px-2.5 py-0.5 text-xs font-bold text-cream">{t.ui.preview.or}</span>
              <p className="rounded-xl bg-paper px-3 py-2 text-lg font-extrabold">{q.options[1][lang]}</p>
            </div>
          </>
        ) : (
          <p className="text-xl leading-snug font-extrabold text-balance">{q.prompt[lang]}</p>
        )}
        {!saved && <p className="text-sm font-semibold text-plum-soft">{t.ui.favorites.undoHint}</p>}
      </div>
      <FavoriteButton saved={saved} onToggle={() => favs.toggle(entry.mode, entry.id)} />
    </li>
  )
}

export default function Favorites() {
  const { t, fmt } = useLanguage()
  const favs = useFavorites()
  const headingRef = useRef<HTMLHeadingElement>(null)
  useArrivalFocus(headingRef)

  // Snapshot on arrival: un-saving a card keeps it visible (dimmed, with the heart to undo)
  // until you leave this screen, so an accidental tap is never a loss.
  const [snapshot] = useState(() => favs.favorites)

  return (
    <main id="main" tabIndex={-1} className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 py-5 outline-none sm:py-10">
      <div>
        <BackButton />
      </div>

      <header className="flex flex-col gap-2">
        <h1 ref={headingRef} tabIndex={-1} className="flex items-center gap-3 text-4xl font-extrabold tracking-tight outline-none sm:text-5xl">
          <HeartIcon filled className="size-9 text-coral-deep sm:size-11" />
          <span className="min-w-0">{t.ui.favorites.title}</span>
        </h1>
        <p className="text-lg text-plum-soft">{t.ui.favorites.subtitle}</p>
        {snapshot.length > 0 && (
          <p role="status" className="w-fit rounded-full bg-paper px-3 py-1 text-sm font-bold tabular-nums">
            {t.ui.favorites.countLabel.replace('{n}', fmt(favs.count))}
          </p>
        )}
      </header>

      {snapshot.length === 0 ? (
        <section className="animate-card-in flex flex-col items-start gap-4 rounded-(--radius-card) border-2 border-dashed border-plum/25 bg-coral-tint p-6 sm:p-10">
          <span className="grid size-16 place-items-center rounded-full bg-paper text-coral-deep">
            <HeartIcon className="size-8" />
          </span>
          <h2 className="text-2xl font-extrabold">{t.ui.favorites.emptyTitle}</h2>
          <p className="max-w-md text-lg text-plum-soft">{t.ui.favorites.emptyBody}</p>
          <a
            href={hrefFor({ name: 'home' })}
            className="inline-flex min-h-12 items-center rounded-full bg-plum px-6 text-base font-extrabold text-cream transition duration-200 hover:bg-lavender-deep active:scale-95"
          >
            {t.ui.favorites.emptyCta}
          </a>
        </section>
      ) : (
        MODES.map(({ id, Icon, tone }) => {
          const entries = snapshot.filter((f) => f.mode === id)
          if (!entries.length) return null
          return (
            <section key={id} aria-labelledby={`fav-${id}`} className="flex flex-col gap-3">
              <h2 id={`fav-${id}`} className="flex w-fit items-center gap-2 rounded-full bg-paper py-1.5 ps-2 pe-4 text-sm font-bold">
                <span className={`grid size-7 place-items-center rounded-full text-plum ${TONES[tone].chip}`}>
                  <Icon className="size-4" />
                </span>
                {t.modes[id].title}
              </h2>
              <ul className={`grid grid-cols-1 gap-3 ${entries.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                {entries.map((e, i) => (
                  <FavoriteCard key={e.mode + e.id} entry={e} index={i} />
                ))}
              </ul>
            </section>
          )
        })
      )}
    </main>
  )
}

import { useEffect, useRef, useState } from 'react'
import BackButton from '../components/BackButton'
import FavoriteButton from '../components/FavoriteButton'
import ChoiceOptions from '../components/game/ChoiceOptions'
import ExhaustedCard from '../components/game/ExhaustedCard'
import GameControls from '../components/game/GameControls'
import ProgressIndicator from '../components/game/ProgressIndicator'
import { TONES, getMode } from '../config/modes'
import { getQuestion } from '../data'
import { useFavorites } from '../favorites/FavoritesContext'
import { useSessionApi } from '../game/SessionContext'
import { useLanguage } from '../i18n/LanguageContext'
import type { GameModeId } from '../i18n/translations'
import { useArrivalFocus } from '../router/Router'

export default function Game({ mode }: { mode: GameModeId }) {
  const { lang, t } = useLanguage()
  const api = useSessionApi()
  const favs = useFavorites()
  const session = api.getSession(mode)
  const cfg = getMode(mode)
  const tone = TONES[cfg.tone]
  const headingRef = useRef<HTMLHeadingElement>(null)
  useArrivalFocus(headingRef)

  const total = session.order.length
  const questionId = session.order[session.index]
  const position = session.finished ? total : session.index + 1
  const question = getQuestion(mode, questionId)
  const options = question?.options
  const saved = !!question && favs.isFavorite(mode, question.id)
  const modeFavorites = favs.favorites.filter((f) => f.mode === mode).length

  // Friendly, short-lived feedback (picks and favorites). Cleared on every new question.
  // Each message remembers which question it belongs to, so it disappears on its own when the question changes.
  const [feedback, setFeedback] = useState<{ text: string; id: number; forQuestion: string } | null>(null)
  const say = (text: string) => setFeedback({ text, id: Date.now(), forQuestion: questionId })
  useEffect(() => {
    if (!feedback) return
    const h = window.setTimeout(() => setFeedback(null), 3200)
    return () => window.clearTimeout(h)
  }, [feedback])
  const visibleFeedback = feedback && feedback.forQuestion === questionId && !session.finished ? feedback : null

  const toggleFavorite = () => {
    if (!question) return
    favs.toggle(mode, question.id)
    say(saved ? t.ui.favorites.removedMsg : t.ui.favorites.savedMsg)
  }

  const select = (choice: 0 | 1) => {
    if (!question) return
    const previous = session.selections[question.id]
    api.select(mode, question.id, choice)
    if (previous === choice) return
    say(previous === undefined ? (mode === 'thisOrThat' ? t.ui.game.nicePick : t.ui.game.boldPick) : t.ui.game.changedMind)
  }

  // Double-tap protection: ignore Reveal/Next/Skip taps that land within ~0.3s of the screen changing,
  // so an accidental second tap can't skip a question nobody has seen yet.
  const changeKey = `${questionId}|${session.revealed}|${session.finished}`
  const lastChange = useRef({ key: changeKey, at: 0 })
  useEffect(() => {
    if (lastChange.current.key !== changeKey) lastChange.current = { key: changeKey, at: Date.now() }
  }, [changeKey])
  const guarded = (fn: () => void) => () => {
    if (Date.now() - lastChange.current.at < 300) return
    fn()
  }

  const advance = () => api.advance(mode)
  const restart = () => {
    api.restart(mode) // sessions only — favorites live elsewhere and are never touched
    headingRef.current?.focus({ preventScroll: true })
  }
  const nothingToLose = session.index === 0 && !session.revealed && Object.keys(session.selections).length === 0
  const primary =
    mode === 'direct' && !session.revealed
      ? { label: t.ui.game.reveal, run: () => api.reveal(mode) }
      : { label: t.ui.game.next, run: advance }

  return (
    <main id="main" tabIndex={-1} className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-5 py-5 outline-none sm:gap-6 sm:py-10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
        <BackButton />
        <ProgressIndicator position={position} total={total} />
      </div>

      <h1 ref={headingRef} tabIndex={-1} className="flex w-fit items-center gap-2 rounded-full bg-paper py-1.5 ps-2 pe-4 text-sm font-bold outline-none">
        <span className={`grid size-7 place-items-center rounded-full text-plum ${tone.chip}`}>
          <cfg.Icon className="size-4" />
        </span>
        {t.modes[mode].title}
      </h1>

      {/* Stable live region: the keyed card inside is announced when the question changes. */}
      <div aria-live="polite" className="flex flex-col">
        {session.finished ? (
          <ExhaustedCard total={total} tone={cfg.tone} favoritesCount={modeFavorites} onRestart={restart} />
        ) : question && !options ? (
          <section
            key={question.id}
            data-question-id={question.id}
            className={`animate-card-in relative grid min-h-72 place-items-center rounded-(--radius-card) border-2 border-plum/10 p-6 text-center shadow-soft sm:min-h-96 sm:p-12 ${session.revealed ? 'pt-16 sm:pt-14' : ''} ${tone.card}`}
          >
            {session.revealed && (
              <div className="absolute end-3 top-3 sm:end-4 sm:top-4">
                <FavoriteButton saved={saved} onToggle={toggleFavorite} />
              </div>
            )}
            {session.revealed ? (
              <p key="q" className="animate-reveal max-w-2xl text-2xl leading-snug font-extrabold text-balance min-[400px]:text-3xl sm:text-5xl">
                {question.prompt[lang]}
              </p>
            ) : (
              <div key="hidden" className="flex flex-col items-center gap-4">
                <span className={`grid size-24 place-items-center rounded-full text-6xl font-extrabold text-plum ${tone.chip}`}>{t.ui.preview.q}</span>
                <p className="text-2xl font-extrabold">{t.ui.game.hiddenTitle}</p>
                <p className="max-w-xs text-base text-plum-soft">{t.ui.game.hiddenHint}</p>
              </div>
            )}
          </section>
        ) : question && options ? (
          <section key={question.id} data-question-id={question.id} className="animate-card-in flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <p className="min-w-0 pt-1 text-2xl leading-tight font-extrabold text-balance min-[400px]:text-3xl sm:text-4xl">{question.prompt[lang]}</p>
              <FavoriteButton saved={saved} onToggle={toggleFavorite} />
            </div>
            <ChoiceOptions
              options={options}
              selected={session.selections[question.id]}
              onSelect={select}
              tone={cfg.tone}
              variant={mode === 'thisOrThat' ? 'tiles' : 'stacked'}
            />
          </section>
        ) : null}
      </div>

      {/* Reserved height so the layout never jumps when feedback appears. */}
      <div role="status" aria-live="polite" className="flex min-h-11 items-center justify-center">
        {visibleFeedback && (
          <p key={visibleFeedback.id} className="animate-pop rounded-full bg-plum px-4 py-2 text-center text-sm font-bold text-cream">
            {visibleFeedback.text}
          </p>
        )}
      </div>

      {!session.finished && (
        <GameControls primaryLabel={primary.label} onPrimary={guarded(primary.run)} onSkip={guarded(advance)} onRestart={restart} restartNeedsConfirm={!nothingToLose} />
      )}
    </main>
  )
}

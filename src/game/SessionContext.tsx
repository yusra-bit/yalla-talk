import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { GameModeId } from '../i18n/translations'
import { freshOrder, loadSessions, saveSessions, sessionReducer, type ModeSession } from './session'

interface SessionApi {
  getSession: (mode: GameModeId) => ModeSession
  reveal: (mode: GameModeId) => void
  select: (mode: GameModeId, questionId: string, choice: 0 | 1) => void
  /** Next and Skip both move forward; a question is never shown twice in one session. */
  advance: (mode: GameModeId) => void
  begin: (mode: GameModeId) => void
  restart: (mode: GameModeId) => void
}

const Ctx = createContext<SessionApi | null>(null)

/** Lives above the router, so progress survives navigating between screens (not page reloads). */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessions, dispatch] = useReducer(sessionReducer, undefined, loadSessions)
  useEffect(() => saveSessions(sessions), [sessions])

  const getSession = useCallback((mode: GameModeId) => sessions[mode], [sessions])
  const reveal = useCallback((mode: GameModeId) => dispatch({ type: 'reveal', mode }), [])
  const select = useCallback((mode: GameModeId, questionId: string, choice: 0 | 1) => dispatch({ type: 'select', mode, questionId, choice }), [])
  const advance = useCallback((mode: GameModeId) => dispatch({ type: 'advance', mode }), [])
  const begin = useCallback((mode: GameModeId) => dispatch({ type: 'begin', mode, order: freshOrder(mode) }), [])
  const restart = useCallback(
    (mode: GameModeId) => dispatch({ type: 'restart', mode, order: freshOrder(mode, sessions[mode].order[sessions[mode].order.length - 1]) }),
    [sessions],
  )

  const value = useMemo(() => ({ getSession, reveal, select, advance, begin, restart }), [getSession, reveal, select, advance, begin, restart])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSessionApi(): SessionApi {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSessionApi must be used inside <SessionProvider>')
  return ctx
}

import { poolIds } from '../data'
import type { GameModeId } from '../i18n/translations'
import { MODES } from '../config/modes'
import { shuffle } from './shuffle'

/**
 * One session per game mode. It stores IDs and positions only — never translated text —
 * so changing the interface language can't disturb progress.
 */
export interface ModeSession {
  /** Shuffled question IDs. Each appears exactly once, so nothing repeats until the pool is exhausted. */
  order: string[]
  index: number
  revealed: boolean
  /** questionId -> chosen option (0 or 1). Optional: players may advance without choosing. */
  selections: Record<string, 0 | 1>
  /** True once the player has moved past the last question. */
  finished: boolean
}

export type Sessions = Record<GameModeId, ModeSession>

export type SessionAction =
  | { type: 'reveal'; mode: GameModeId }
  | { type: 'select'; mode: GameModeId; questionId: string; choice: 0 | 1 }
  | { type: 'advance'; mode: GameModeId } // used by both Next and Skip
  | { type: 'begin'; mode: GameModeId; order: string[] } // entering a mode: resume, unless finished
  | { type: 'restart'; mode: GameModeId; order: string[] }

export const freshOrder = (mode: GameModeId, avoidFirst?: string): string[] => shuffle(poolIds(mode), avoidFirst)

const newSession = (order: string[]): ModeSession => ({ order, index: 0, revealed: false, selections: {}, finished: false })

export function initSessions(): Sessions {
  return Object.fromEntries(MODES.map((m) => [m.id, newSession(freshOrder(m.id))])) as Sessions
}

export function sessionReducer(state: Sessions, action: SessionAction): Sessions {
  const s = state[action.mode]
  switch (action.type) {
    case 'reveal':
      return { ...state, [action.mode]: { ...s, revealed: true } }
    case 'select':
      if (s.order[s.index] !== action.questionId) return state
      return { ...state, [action.mode]: { ...s, selections: { ...s.selections, [action.questionId]: action.choice } } }
    case 'advance':
      if (s.finished) return state
      return {
        ...state,
        [action.mode]: s.index + 1 >= s.order.length ? { ...s, finished: true } : { ...s, index: s.index + 1, revealed: false },
      }
    case 'begin':
      return s.finished ? { ...state, [action.mode]: newSession(action.order) } : state
    case 'restart':
      return { ...state, [action.mode]: newSession(action.order) }
  }
}

// ---- Refresh safety -------------------------------------------------------------------------
// Sessions are kept in sessionStorage so a page refresh resumes the game (a new visit starts fresh).
// Anything that doesn't match the current question bank is discarded rather than trusted.
const STORAGE_KEY = 'yalla-talk:sessions:v1'

function parseSession(mode: GameModeId, v: unknown): ModeSession | null {
  if (!v || typeof v !== 'object') return null
  const o = v as Record<string, unknown>
  const ids = poolIds(mode)
  const valid = new Set(ids)
  if (!Array.isArray(o.order) || o.order.length !== ids.length) return null
  if (!o.order.every((x) => typeof x === 'string' && valid.has(x)) || new Set(o.order).size !== ids.length) return null
  const index = o.index
  if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= ids.length) return null
  const selections: Record<string, 0 | 1> = {}
  if (o.selections && typeof o.selections === 'object') {
    for (const [k, val] of Object.entries(o.selections)) if (valid.has(k) && (val === 0 || val === 1)) selections[k] = val
  }
  return { order: o.order as string[], index, revealed: o.revealed === true, selections, finished: o.finished === true }
}

export function loadSessions(): Sessions {
  const sessions = initSessions()
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return sessions
    const data = JSON.parse(raw) as Record<string, unknown> | null
    for (const m of MODES) {
      const restored = parseSession(m.id, data?.[m.id])
      if (restored) sessions[m.id] = restored
    }
  } catch {
    /* unavailable or corrupted: start fresh */
  }
  return sessions
}

export function saveSessions(sessions: Sessions): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch {
    /* ignore */
  }
}

import { isModeId } from '../config/modes'
import { getQuestion } from '../data'
import type { GameModeId } from '../i18n/translations'

/** Favorites store IDs only (never text), so they display in whichever language is active. */
export interface FavoriteEntry {
  mode: GameModeId
  id: string
  savedAt: number
}

const KEY = 'yalla-talk:favorites:v1'

/** Defensive load: tolerates missing, corrupted or outdated data, and silently drops IDs no longer in the bank. */
export function loadFavorites(): FavoriteEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const data: unknown = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    const seen = new Set<string>()
    const out: FavoriteEntry[] = []
    for (const e of data) {
      if (!e || typeof e !== 'object') continue
      const { mode, id, savedAt } = e as Record<string, unknown>
      if (typeof mode !== 'string' || !isModeId(mode) || typeof id !== 'string' || !getQuestion(mode, id)) continue
      const k = `${mode}:${id}`
      if (seen.has(k)) continue
      seen.add(k)
      out.push({ mode, id, savedAt: typeof savedAt === 'number' ? savedAt : 0 })
    }
    return out.sort((a, b) => b.savedAt - a.savedAt)
  } catch {
    return [] // storage unavailable (e.g. private mode) or invalid JSON
  }
}

export function saveFavorites(list: FavoriteEntry[]): void {
  try {
    const next = JSON.stringify(list)
    if (localStorage.getItem(KEY) !== next) localStorage.setItem(KEY, next)
  } catch {
    /* storage full/unavailable — favorites keep working for this visit */
  }
}

export const FAVORITES_STORAGE_KEY = KEY

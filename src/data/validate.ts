import { MODE_CATEGORIES } from './categories'
import { POOLS } from './index'
import { MODES } from '../config/modes'
import type { GameModeId } from '../i18n/translations'
import type { Localized, Question } from './types'

export const MIN_PER_MODE = 30
const ID_PREFIX: Record<GameModeId, string> = { direct: 'd', thisOrThat: 't', wouldYouRather: 'w' }
const ARABIC = /[\u0600-\u06FF]/
const LATIN = /[A-Za-z]/

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

function checkLocalized(where: string, v: Localized | undefined, errors: string[]) {
  if (!v) return errors.push(`${where}: missing`)
  const { en, ar } = v
  if (typeof en !== 'string' || !en.trim()) errors.push(`${where}: empty English`)
  if (typeof ar !== 'string' || !ar.trim()) errors.push(`${where}: empty Arabic`)
  if (typeof en === 'string' && en.trim()) {
    if (en !== en.trim()) errors.push(`${where}: English has stray whitespace`)
    if (!LATIN.test(en)) errors.push(`${where}: English has no Latin letters`)
    if (ARABIC.test(en)) errors.push(`${where}: English contains Arabic script`)
  }
  if (typeof ar === 'string' && ar.trim()) {
    if (ar !== ar.trim()) errors.push(`${where}: Arabic has stray whitespace`)
    if (!ARABIC.test(ar)) errors.push(`${where}: Arabic has no Arabic letters (untranslated?)`)
    if (LATIN.test(ar)) errors.push(`${where}: Arabic contains Latin letters`)
    if (ar === en) errors.push(`${where}: Arabic identical to English`)
  }
}

export interface BankReport {
  errors: string[]
  counts: Record<GameModeId, number>
  byCategory: Record<GameModeId, Record<string, number>>
}

export function validateBank(): BankReport {
  const errors: string[] = []
  const counts = {} as Record<GameModeId, number>
  const byCategory = {} as Record<GameModeId, Record<string, number>>
  const allIds = new Set<string>()
  const seenText = new Map<string, string>()

  for (const { id: mode } of MODES) {
    const pool: readonly Question[] = POOLS[mode]
    counts[mode] = pool.length
    byCategory[mode] = {}
    if (pool.length < MIN_PER_MODE) errors.push(`${mode}: only ${pool.length} entries (need ${MIN_PER_MODE})`)

    for (const q of pool) {
      const w = `${mode}/${q.id}`
      if (!new RegExp(`^${ID_PREFIX[mode]}\\d{2,3}$`).test(q.id)) errors.push(`${w}: id must look like ${ID_PREFIX[mode]}NN`)
      if (allIds.has(q.id)) errors.push(`${w}: duplicate id`)
      allIds.add(q.id)

      if (!(MODE_CATEGORIES[mode] as readonly string[]).includes(q.category)) errors.push(`${w}: category "${q.category}" not allowed for ${mode}`)
      byCategory[mode][q.category] = (byCategory[mode][q.category] ?? 0) + 1

      checkLocalized(`${w}.prompt`, q.prompt, errors)

      if (mode === 'direct') {
        if (q.options) errors.push(`${w}: Direct questions must not have options`)
      } else if (!q.options || q.options.length !== 2) {
        errors.push(`${w}: needs exactly two options`)
      } else {
        q.options.forEach((o, i) => checkLocalized(`${w}.options[${i}]`, o, errors))
        if (norm(q.options[0].en) === norm(q.options[1].en)) errors.push(`${w}: both options identical (English)`)
        if (norm(q.options[0].ar) === norm(q.options[1].ar)) errors.push(`${w}: both options identical (Arabic)`)
      }

      // Duplicate detection (order-insensitive for option pairs), across all modes.
      const key = q.options ? [...q.options.map((o) => norm(o.en))].sort().join(' | ') : norm(q.prompt.en)
      const keyAr = q.options ? [...q.options.map((o) => norm(o.ar))].sort().join(' | ') : norm(q.prompt.ar)
      for (const k of [`en:${key}`, `ar:${keyAr}`]) {
        const prev = seenText.get(k)
        if (prev) errors.push(`${w}: duplicates ${prev}`)
        else seenText.set(k, w)
      }
    }
  }
  return { errors, counts, byCategory }
}

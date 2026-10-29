import type { Language } from '../i18n/translations'

/** Every user-facing string in the question bank exists in every supported language. */
export type Localized = Record<Language, string>

/** Tiny helper so bank files stay readable: l('English', 'العربية'). */
export const l = (en: string, ar: string): Localized => ({ en, ar })

export type Options = readonly [Localized, Localized]

/**
 * One entry shape for all three game modes.
 *  - Direct Questions: `prompt` is the question; no `options`.
 *  - This or That:     `prompt` is a short topic heading; exactly two `options`.
 *  - Would You Rather: `prompt` is the lead-in line; exactly two `options`.
 * IDs are stable: never reuse or renumber one, even if an entry is retired.
 */
export interface Question<C extends string = string> {
  id: string
  category: C
  prompt: Localized
  options?: Options
}

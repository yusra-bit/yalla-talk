import type { GameModeId } from '../i18n/translations'
import { DIRECT_QUESTIONS } from './direct'
import { THIS_OR_THAT_QUESTIONS } from './thisOrThat'
import type { Question } from './types'
import { WOULD_YOU_RATHER_QUESTIONS } from './wouldYouRather'

export type { Category } from './categories'
export { CATEGORY_LABELS } from './categories'
export type { Localized, Question } from './types'

export const POOLS: Record<GameModeId, readonly Question[]> = {
  direct: DIRECT_QUESTIONS,
  thisOrThat: THIS_OR_THAT_QUESTIONS,
  wouldYouRather: WOULD_YOU_RATHER_QUESTIONS,
}

const BY_ID: Record<GameModeId, Map<string, Question>> = {
  direct: new Map(DIRECT_QUESTIONS.map((q) => [q.id, q])),
  thisOrThat: new Map(THIS_OR_THAT_QUESTIONS.map((q) => [q.id, q])),
  wouldYouRather: new Map(WOULD_YOU_RATHER_QUESTIONS.map((q) => [q.id, q])),
}

export const poolIds = (mode: GameModeId): string[] => POOLS[mode].map((q) => q.id)
export const getQuestion = (mode: GameModeId, id: string): Question | undefined => BY_ID[mode].get(id)

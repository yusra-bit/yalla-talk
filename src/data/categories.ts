import type { GameModeId } from '../i18n/translations'
import { l, type Localized } from './types'

export type DirectCategory =
  | 'funny-embarrassing' | 'friendship-memories' | 'opinions-habits' | 'dreams-ambitions' | 'thought-provoking' | 'hypotheticals'
export type ThisOrThatCategory =
  | 'food-drinks' | 'travel-lifestyle' | 'personality-habits' | 'entertainment' | 'friends-social' | 'everyday-dilemmas'
export type WouldYouRatherCategory =
  | 'funny-hypotheticals' | 'tough-but-light' | 'travel-lifestyle' | 'friends-social' | 'imaginative'

export type Category = DirectCategory | ThisOrThatCategory | WouldYouRatherCategory

/** Which categories each mode may use (checked by the validator). */
export const MODE_CATEGORIES: Record<GameModeId, readonly Category[]> = {
  direct: ['funny-embarrassing', 'friendship-memories', 'opinions-habits', 'dreams-ambitions', 'thought-provoking', 'hypotheticals'],
  thisOrThat: ['food-drinks', 'travel-lifestyle', 'personality-habits', 'entertainment', 'friends-social', 'everyday-dilemmas'],
  wouldYouRather: ['funny-hypotheticals', 'tough-but-light', 'travel-lifestyle', 'friends-social', 'imaginative'],
}

/** Display names, ready for a future category filter or label. */
export const CATEGORY_LABELS: Record<Category, Localized> = {
  'funny-embarrassing': l('Funny & embarrassing moments', 'مواقف مضحكة ومحرجة'),
  'friendship-memories': l('Friendship & memories', 'الصداقة والذكريات'),
  'opinions-habits': l('Opinions & habits', 'آراء وعادات'),
  'dreams-ambitions': l('Dreams & ambitions', 'أحلام وطموحات'),
  'thought-provoking': l('Thought-provoking', 'أسئلة للتأمل'),
  hypotheticals: l('Lighthearted hypotheticals', 'افتراضات خفيفة'),
  'food-drinks': l('Food & drinks', 'الطعام والمشروبات'),
  'travel-lifestyle': l('Travel & lifestyle', 'السفر وأسلوب الحياة'),
  'personality-habits': l('Personality & habits', 'الشخصية والعادات'),
  entertainment: l('Entertainment', 'الترفيه'),
  'friends-social': l('Friends & social situations', 'الأصدقاء والمواقف الاجتماعية'),
  'everyday-dilemmas': l('Funny everyday dilemmas', 'معضلات يومية طريفة'),
  'funny-hypotheticals': l('Funny hypotheticals', 'مواقف افتراضية مضحكة'),
  'tough-but-light': l('Tough but lighthearted choices', 'خيارات صعبة لكن خفيفة'),
  imaginative: l('Imaginative scenarios', 'سيناريوهات خيالية'),
}

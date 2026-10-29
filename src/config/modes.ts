import type { ComponentType, SVGProps } from 'react'
import { DirectIcon, RatherIcon, ThisOrThatIcon } from '../components/icons'
import type { GameModeId } from '../i18n/translations'

export type CardTone = 'lavender' | 'butter' | 'coral'

export interface ModeConfig {
  id: GameModeId
  tone: CardTone
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  /** Number of options shown per round — drives the intro preview layout. */
  choices: 1 | 2
  /** Loose "hand of cards" tilt on the home screen (desktop only, mirrored in RTL). */
  tilt: string
}

export const MODES: ModeConfig[] = [
  { id: 'direct', tone: 'lavender', Icon: DirectIcon, choices: 1, tilt: 'lg:-rotate-2 rtl:lg:rotate-2' },
  { id: 'thisOrThat', tone: 'butter', Icon: ThisOrThatIcon, choices: 2, tilt: 'lg:translate-y-4 lg:rotate-1 rtl:lg:-rotate-1' },
  { id: 'wouldYouRather', tone: 'coral', Icon: RatherIcon, choices: 2, tilt: 'lg:-rotate-1 rtl:lg:rotate-1' },
]

export const TONES: Record<CardTone, { card: string; chip: string }> = {
  lavender: { card: 'bg-lavender-tint', chip: 'bg-lavender' },
  butter: { card: 'bg-butter-tint', chip: 'bg-butter' },
  coral: { card: 'bg-coral-tint', chip: 'bg-coral' },
}

export const isModeId = (v: string | undefined): v is GameModeId => MODES.some((m) => m.id === v)
export const getMode = (id: GameModeId): ModeConfig => MODES.find((m) => m.id === id)!

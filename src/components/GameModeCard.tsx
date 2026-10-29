import type { ComponentType, SVGProps } from 'react'
import { TONES, type CardTone } from '../config/modes'
import { ArrowIcon } from './icons'

interface Props {
  title: string
  description: string
  hint: string
  tone: CardTone
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  href: string
  tilt?: string
}

/** A real link: Enter works, long-press/new-tab work, and the whole card is one large touch target. */
export default function GameModeCard({ title, description, hint, tone, Icon, href, tilt = '' }: Props) {
  const c = TONES[tone]
  return (
    <a
      href={href}
      className={`group relative flex w-full flex-col gap-5 rounded-(--radius-card) border-2 border-plum/10 p-6 text-start shadow-soft [touch-action:manipulation]
                  transition duration-300 ease-out hover:-translate-y-1.5 hover:rotate-0 hover:shadow-lift active:scale-[0.98]
                  ${c.card} ${tilt}`}
    >
      <span className={`grid size-14 place-items-center rounded-2xl text-plum ${c.chip}`}>
        <Icon className="size-8" />
      </span>

      <span className="flex flex-col gap-1.5">
        <span className="text-2xl font-extrabold leading-tight">{title}</span>
        <span className="text-base leading-relaxed text-plum-soft">{description}</span>
      </span>

      <span className="mt-auto flex items-center justify-between gap-3 border-t-2 border-dashed border-plum/15 pt-4">
        <span className="text-sm font-bold text-plum">{hint}</span>
        <span className="grid size-10 place-items-center rounded-full bg-plum text-cream transition duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          <ArrowIcon className="size-5 rtl:-scale-x-100" />
        </span>
      </span>
    </a>
  )
}

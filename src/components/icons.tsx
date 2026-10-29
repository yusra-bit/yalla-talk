import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>
const base: IconProps = {
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

/** Speech bubble with a question mark — Direct Questions */
export const DirectIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 9a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8l-6 5v-5a4 4 0 0 1-4-4z" />
    <path d="M13 11.5a3 3 0 1 1 4.2 2.7c-.8.4-1.2.9-1.2 1.8" />
    <circle cx="16" cy="18.4" r=".6" fill="currentColor" />
  </svg>
)

/** Two overlapping options — This or That */
export const ThisOrThatIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="16" r="7" />
    <circle cx="21" cy="16" r="7" strokeDasharray="1 4.2" />
    <path d="M16.5 10.5c1.4 1.4 2.2 3.2 2.2 5.5s-.8 4.100-2.200 5.500" />
  </svg>
)

/** Fork in the road — Would You Rather? */
export const RatherIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M16 28V17" />
    <path d="M16 17c0-4-6-4-6-9" />
    <path d="M16 17c0-4 6-4 6-9" />
    <path d="M7.500 10 10 7.500 12.500 10" />
    <path d="M19.500 10 22 7.500 24.500 10" />
  </svg>
)

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 16h18M18 9l7 7-7 7" />
  </svg>
)

export const GlobeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="16" cy="16" r="11" />
    <path d="M5 16h22M16 5c3.500 3.500 3.500 18.500 0 22M16 5c-3.500 3.500-3.500 18.500 0 22" />
  </svg>
)

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 17l5.500 5.500L24 11" />
  </svg>
)

export const HeartIcon = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M16 27S5 20.500 5 12a6 6 0 0 1 11-3.200A6 6 0 0 1 27 12c0 8.500-11 15-11 15z" />
  </svg>
)

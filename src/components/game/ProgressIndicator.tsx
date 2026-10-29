import { useLanguage } from '../../i18n/LanguageContext'

/** Subtle bar plus a "3 / 10" counter (digits follow the interface language). */
export default function ProgressIndicator({ position, total }: { position: number; total: number }) {
  const { lang, t } = useLanguage()
  const nf = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en')
  const label = t.ui.game.progress.replace('{n}', nf.format(position)).replace('{total}', nf.format(total))
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={position}
        aria-label={label}
        className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-plum/10"
      >
        <div className="h-full rounded-full bg-lavender-deep transition-[width] duration-500 ease-out" style={{ width: `${(position / total) * 100}%` }} />
      </div>
      <span className="shrink-0 text-sm font-bold text-plum-soft tabular-nums">{label}</span>
    </div>
  )
}

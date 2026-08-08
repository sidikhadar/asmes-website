'use client'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { useLanguage } from '@/components/language-provider'
import { SDG_NUMBERS } from '@/lib/i18n'

// Official UN SDG brand colors — kept as literal values on purpose: they are
// the recognizable identity of each Goal (load-bearing, not decorative).
const SDG_COLORS: Record<number, string> = {
  1: '#E5243B',
  2: '#DDA63A',
  3: '#4C9F38',
  4: '#C5192D',
  5: '#FF3A21',
  6: '#26BDE2',
  8: '#A21942',
  10: '#DD1367',
  13: '#3F7E44',
  14: '#0A97D9',
  15: '#56C02B',
  16: '#00689D',
  17: '#19486A',
}

export function Sdg() {
  const { t } = useLanguage()
  const s = t.sections.odd

  return (
    <section id="odd" className="scroll-mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {s.goals.map((label, i) => {
            const number = SDG_NUMBERS[i]
            const color = SDG_COLORS[number]
            return (
              <Reveal as="li" key={number} delay={i}>
                <div
                  className="flex h-full flex-col justify-between rounded-xl p-4 text-white shadow-sm transition-transform hover:-translate-y-1"
                  style={{ backgroundColor: color }}
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
                      {t.common.sdgLabel}
                    </span>
                    <span className="font-heading text-2xl font-extrabold leading-none">
                      {number}
                    </span>
                  </div>
                  <p className="mt-3 text-pretty text-sm font-semibold leading-snug">{label}</p>
                </div>
              </Reveal>
            )
          })}
        </ul>

        <Reveal delay={2}>
          <div className="mt-10 rounded-2xl border-s-4 border-clay bg-background p-6 shadow-sm sm:p-8">
            <p className="text-pretty leading-relaxed text-foreground/80">{s.conclusion}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

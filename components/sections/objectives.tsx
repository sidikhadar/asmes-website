'use client'

import {
  Droplets,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  HeartPulse,
  Landmark,
  Leaf,
  Wheat,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { useLanguage } from '@/components/language-provider'

// Icons map to objective cards by index (content lives in the dictionary).
const ICONS: LucideIcon[] = [
  HandCoins,
  HeartHandshake,
  GraduationCap,
  Droplets,
  Landmark,
  HeartPulse,
  Wheat,
  Leaf,
]

export function Objectives() {
  const { t } = useLanguage()
  const s = t.sections.objectifs

  return (
    <section id="objectifs" className="scroll-mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.cards.map((card, i) => {
            const Icon = ICONS[i] ?? HandCoins
            return (
              <Reveal key={i} delay={i}>
                <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-sm">
                    <Icon className="size-6" />
                  </span>
                  <span
                    aria-hidden
                    className="mt-4 font-heading text-4xl font-extrabold leading-none text-brand/10 transition-colors group-hover:text-brand/20"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-pretty font-heading text-base font-bold leading-snug text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

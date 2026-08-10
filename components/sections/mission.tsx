'use client'

import {
  GraduationCap,
  HeartHandshake,
  LifeBuoy,
  Leaf,
  ShieldCheck,
  Users,
  Vote,
  Wheat,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { useLanguage } from '@/components/language-provider'

// Icons map to mission items by index (content lives in the dictionary).
const ICONS: LucideIcon[] = [
  Users,
  HeartHandshake,
  LifeBuoy,
  GraduationCap,
  ShieldCheck,
  Wheat,
  Leaf,
  Vote,
]

export function Mission() {
  const { t } = useLanguage()
  const s = t.sections.mission

  return (
    <section id="mission" className="scroll-mt-24 border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {s.items.map((item, i) => {
            const Icon = ICONS[i] ?? Users
            return (
              <Reveal as="li" key={i} delay={i}>
                <div className="group flex h-full items-center gap-4 rounded-xl border border-border bg-background p-5 transition-colors hover:border-brand/40">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-dark transition-colors group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-dark group-hover:text-brand-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-pretty font-medium leading-snug text-foreground">
                    {item}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

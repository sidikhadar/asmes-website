'use client'

import { CalendarCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { useLanguage } from '@/components/language-provider'

export function About() {
  const { t } = useLanguage()
  const s = t.sections['qui-sommes-nous']

  return (
    <section id="qui-sommes-nous" className="scroll-mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} />

        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Narrative */}
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-pretty text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                {s.lead}
              </p>
            </Reveal>
            <div className="mt-6 space-y-5">
              {s.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i + 1}>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Key facts */}
          <Reveal delay={2} className="lg:pt-1">
            <div className="rounded-2xl border border-brand/15 bg-gradient-to-br from-accent to-background p-6 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-sm">
                  <CalendarCheck className="size-5" />
                </span>
                <span className="font-heading text-sm font-bold uppercase tracking-wide text-brand-dark">
                  ASMES
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {s.facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-clay" />
                    <span className="font-medium leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

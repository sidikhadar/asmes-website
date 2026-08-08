'use client'

import { Compass } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/components/language-provider'

export function Vision() {
  const { t } = useLanguage()
  const s = t.sections.vision

  return (
    <section
      id="vision"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-brand to-brand-dark"
    >
      {/* Subtle radial highlight, kept very low-contrast for a sober feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(60rem 40rem at 85% -10%, white, transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal>
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/15 text-brand-foreground ring-1 ring-white/25">
            <Compass className="size-6" />
          </span>
        </Reveal>
        <Reveal delay={1}>
          <p className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80">
            <span className="h-px w-8 bg-white/50" />
            {s.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {s.title}
          </h2>
        </Reveal>

        <div className="mt-8 space-y-6">
          {s.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i + 2}>
              <p
                className={
                  i === 0
                    ? 'text-balance text-xl font-medium leading-relaxed text-white sm:text-2xl'
                    : 'max-w-3xl text-pretty leading-relaxed text-white/85'
                }
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

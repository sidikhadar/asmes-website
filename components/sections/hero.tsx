'use client'

import Image from 'next/image'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

function scrollToId(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

export function Hero() {
  const { t } = useLanguage()
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-20"
    >
      {/* Video background with brand overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 z-0">
        <video
          className="size-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Poster fallback shown when motion is reduced */}
        <div
          className="absolute inset-0 hidden bg-cover bg-center motion-reduce:block"
          style={{ backgroundImage: 'url(/hero-poster.jpg)' }}
        />
        {/* Readability overlays: soft brand tint + light veil */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/55 via-brand-dark/35 to-brand/45" />
        <div className="absolute inset-0 bg-background/35" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative mx-auto mb-8 block size-28 overflow-hidden rounded-full shadow-xl ring-4 ring-background sm:size-36">
            <Image
              src="/asmes-logo.jpeg"
              alt="Logo officiel de l'ASMES"
              fill
              sizes="(min-width: 640px) 144px, 112px"
              className="object-cover"
              priority
            />
          </span>
        </div>

        <span className="animate-in fade-in slide-in-from-bottom-4 delay-100 duration-700 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-background/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-dark backdrop-blur">
          <span className="size-1.5 rounded-full bg-clay" />
          {t.hero.badge}
        </span>

        <h1 className="animate-in fade-in slide-in-from-bottom-4 delay-150 duration-700 mt-6 text-balance font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {t.hero.titleLead}{' '}
          <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
            {t.hero.titleHighlight}
          </span>
        </h1>

        <p className="animate-in fade-in slide-in-from-bottom-4 delay-200 duration-700 mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-4 delay-300 duration-700 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-7 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition-all hover:shadow-xl hover:shadow-brand/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
          >
            {t.hero.ctaContact}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollToId('qui-sommes-nous')}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-7 text-sm font-semibold text-foreground/80 backdrop-blur transition-colors hover:border-brand/40 hover:text-brand-dark sm:w-auto"
          >
            {t.hero.ctaDiscover}
          </button>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        onClick={() => scrollToId('qui-sommes-nous')}
        aria-label={t.hero.scroll}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-brand-dark motion-safe:animate-bounce sm:block"
      >
        <ChevronDown className="size-6" />
      </button>
    </section>
  )
}

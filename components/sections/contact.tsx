'use client'

import { MapPin, Mail, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/reveal'

const EMAIL = 'ongasme94@gmail.com'
const FACEBOOK_URL = 'https://www.facebook.com/ongasmerim/'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function Contact() {
  const { t } = useLanguage()
  const s = t.sections.contact

  return (
    <section id="contact" className="scroll-mt-24 bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Address */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand-dark">
                <MapPin className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-base font-bold text-foreground">
                {s.addressLabel}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {s.address}
              </p>
            </div>
          </Reveal>

          {/* Email */}
          <Reveal delay={0.08}>
            <a
              href={`mailto:${EMAIL}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand-dark">
                <Mail className="size-6" />
              </span>
              <h3 className="mt-5 flex items-center gap-1.5 font-heading text-base font-bold text-foreground">
                {s.emailLabel}
                <ArrowUpRight className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100 rtl:-scale-x-100" />
              </h3>
              <p className="mt-2 break-all text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-brand-dark">
                {EMAIL}
              </p>
            </a>
          </Reveal>

          {/* Facebook */}
          <Reveal delay={0.16}>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand-dark">
                <FacebookIcon className="size-6" />
              </span>
              <h3 className="mt-5 flex items-center gap-1.5 font-heading text-base font-bold text-foreground">
                {s.facebookLabel}
                <ArrowUpRight className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100 rtl:-scale-x-100" />
              </h3>
              <p className="mt-2 break-all text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-brand-dark">
                {s.facebookvalue}
              </p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

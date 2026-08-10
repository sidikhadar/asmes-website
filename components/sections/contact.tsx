'use client'

import { MapPin, Mail, ArrowUpRight, FileText } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/reveal'

const EMAIL = 'ongasme94@gmail.com'
const FACEBOOK_URL = 'https://www.facebook.com/ongasmerim/'
const WHATSAPP_URL = 'https://wa.me/34637184831'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.599 5.34l-1.058 3.862 3.949-1.001zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
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

          {/* WhatsApp */}
          <Reveal delay={0.24}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand-dark">
                <WhatsAppIcon className="size-6" />
              </span>
              <h3 className="mt-5 flex items-center gap-1.5 font-heading text-base font-bold text-foreground">
                {s.whatsappLabel}
                <ArrowUpRight className="size-4 text-brand opacity-0 transition-opacity group-hover:opacity-100 rtl:-scale-x-100" />
              </h3>
              <p
                dir="ltr"
                className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-brand-dark rtl:text-right"
              >
                {s.whatsappValue}
              </p>
            </a>
          </Reveal>

          {/* NGO registration (récépissé) */}
          <Reveal delay={0.32}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand/10 text-brand-dark">
                <FileText className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-base font-bold text-foreground">
                {s.recepisseLabel}
              </h3>
              <p
                dir="ltr"
                className="mt-2 break-all text-sm leading-relaxed text-muted-foreground rtl:text-right"
              >
                {s.recepisseValue}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

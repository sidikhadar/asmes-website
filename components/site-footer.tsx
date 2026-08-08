'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'

const FACEBOOK_URL = 'https://www.facebook.com/ongasmerim/'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="relative size-11 overflow-hidden rounded-full ring-1 ring-border">
            <Image
              src="/asmes-logo.jpeg"
              alt="Logo ASMES"
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-base font-extrabold tracking-tight text-brand-dark">
              ASMES
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              {t.brand.tagline}
            </span>
          </div>
        </div>

        {/* Facebook */}
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-brand/40 hover:text-brand-dark"
        >
          <FacebookIcon className="size-4" />
          {t.footer.followUs}
        </a>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6 sm:text-start">
          <p>© 2026 ASMES. {t.footer.rights}</p>
          <p className="font-medium">{t.footer.developedBy}</p>
        </div>
      </div>
    </footer>
  )
}

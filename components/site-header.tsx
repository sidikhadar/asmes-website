'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Globe, Menu, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/site-nav'
import { useLanguage } from '@/components/language-provider'
import { LANGUAGE_LABELS, LOCALES } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const { t, locale, setLocale } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '')
  const [logoRevealed, setLogoRevealed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Portals need the DOM; only render the drawer after mount.
  useEffect(() => setMounted(true), [])

  // Reveal the header logo once the splash animation has flown into place.
  useEffect(() => {
    if (document.documentElement.getAttribute('data-splash') === 'done') {
      setLogoRevealed(true)
      return
    }
    const onDone = () => setLogoRevealed(true)
    window.addEventListener('asmes:splash-done', onDone)
    // Safety net in case the splash never fires (e.g. asset error).
    const fallback = setTimeout(() => setLogoRevealed(true), 4000)
    return () => {
      window.removeEventListener('asmes:splash-done', onDone)
      clearTimeout(fallback)
    }
  }, [])

  // Compact / add elevation once the user scrolls past the hero fold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav item matching the section currently in view.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close the language menu on outside interaction / Escape.
  // Uses pointerdown so it fires reliably for both mouse and touch (mousedown
  // is unreliable on mobile and could leave the menu unresponsive to taps).
  useEffect(() => {
    if (!langOpen) return
    const onPointer = (e: Event) => {
      if (!(e.target as HTMLElement).closest('[data-lang-menu]')) setLangOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLangOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [langOpen])

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault()
      const target = document.getElementById(id)
      if (!target) return
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
      setActiveId(id)
      setMobileOpen(false)
      history.replaceState(null, '', `#${id}`)
    },
    [],
  )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/80 bg-background/85 shadow-[0_1px_20px_rgba(74,122,44,0.08)] backdrop-blur-md'
          : 'border-b border-transparent bg-background/60 backdrop-blur-sm',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <a
          href="#accueil"
          onClick={(e) => handleNavClick(e, 'accueil')}
          className={cn(
            'flex shrink-0 items-center gap-3 transition-all duration-300',
            scrolled ? 'py-2.5' : 'py-3.5',
          )}
          aria-label={t.a11y.home}
        >
          <span
            id="header-logo-anchor"
            className={cn(
              'relative overflow-hidden rounded-full ring-1 ring-border transition-[width,height,opacity] duration-300',
              scrolled ? 'size-10' : 'size-12',
              logoRevealed ? 'opacity-100' : 'opacity-0',
            )}
          >
            <Image
              src="/asmes-logo.jpeg"
              alt="Logo ASMES"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-base font-extrabold tracking-tight text-brand-dark sm:text-lg">
              ASMES
            </span>
            <span className="text-[10px] font-medium text-muted-foreground sm:text-[11px]">
              {t.brand.tagline}
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label={t.a11y.menu}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-brand-dark'
                    : 'text-foreground/70 hover:text-brand-dark',
                )}
              >
                {t.nav[item.id as keyof typeof t.nav]}
                <span
                  className={cn(
                    'absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300',
                    isActive ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            )
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1.5">
          {/* Language selector — available on every screen size so visitors
              can switch language straight from the header, phone included */}
          <div className="relative" data-lang-menu>
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className={cn(
                'inline-flex h-11 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium transition-colors sm:gap-2 sm:px-3',
                langOpen
                  ? 'bg-accent text-brand-dark'
                  : 'text-foreground/70 hover:bg-accent hover:text-brand-dark',
              )}
              aria-label={t.a11y.changeLanguage}
              aria-haspopup="menu"
              aria-expanded={langOpen}
            >
              <Globe className="size-5" />
              <span className="hidden sm:inline">{LANGUAGE_LABELS[locale]}</span>
              <ChevronDown
                className={cn('size-4 transition-transform', langOpen && 'rotate-180')}
              />
            </button>
            <div
              role="menu"
              className={cn(
                'absolute end-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-border bg-background shadow-lg transition-all duration-200',
                langOpen
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-1 opacity-0',
              )}
            >
              {LOCALES.map((code) => {
                const isCurrent = code === locale
                return (
                  <button
                    key={code}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setLocale(code)
                      setLangOpen(false)
                    }}
                    dir={code === 'ar' ? 'rtl' : 'ltr'}
                    className={cn(
                      'flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors',
                      isCurrent
                        ? 'bg-accent text-brand-dark'
                        : 'text-foreground/80 hover:bg-accent hover:text-brand-dark',
                    )}
                  >
                    {LANGUAGE_LABELS[code]}
                    {isCurrent && <span className="size-1.5 rounded-full bg-brand" />}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-accent hover:text-brand-dark lg:hidden"
            aria-label={t.a11y.openMenu}
            aria-expanded={mobileOpen}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer — rendered in a portal on <body> so it escapes the
          header's backdrop-filter stacking context (which was letting page
          content show through the panel). */}
      {mounted &&
        createPortal(
          <div
            className={cn(
              'fixed inset-0 z-[60] lg:hidden',
              mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            aria-hidden={!mobileOpen}
          >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            'absolute inset-0 bg-brand-dark/60 backdrop-blur-md transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        {/* Panel — fully opaque so page content underneath stays hidden */}
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ease-out',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
          style={{ backgroundColor: 'var(--background)' }}
          role="dialog"
          aria-modal="true"
          aria-label={t.a11y.menu}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="relative size-9 overflow-hidden rounded-full ring-1 ring-border">
                <Image src="/asmes-logo.jpeg" alt="" fill sizes="36px" className="object-cover" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-heading text-base font-extrabold text-brand-dark">
                  ASMES
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  {t.brand.tagline}
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-accent hover:text-brand-dark"
              aria-label={t.a11y.closeMenu}
            >
              <X className="size-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-4" aria-label={t.a11y.menu}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors',
                    isActive
                      ? 'bg-accent text-brand-dark'
                      : 'text-foreground/80 hover:bg-accent hover:text-brand-dark',
                  )}
                >
                  {t.nav[item.id as keyof typeof t.nav]}
                </a>
              )
            })}
          </nav>

          <div className="mt-auto border-t border-border p-4">
            <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Globe className="size-4" />
              <span>{t.a11y.language}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {LOCALES.map((code) => {
                const isCurrent = code === locale
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setLocale(code)
                      setMobileOpen(false)
                    }}
                    dir={code === 'ar' ? 'rtl' : 'ltr'}
                    aria-pressed={isCurrent}
                    className={cn(
                      'rounded-lg border px-2 py-2.5 text-center text-sm font-medium transition-colors',
                      isCurrent
                        ? 'border-brand bg-accent text-brand-dark'
                        : 'border-border text-foreground/80 hover:bg-accent hover:text-brand-dark',
                    )}
                  >
                    {LANGUAGE_LABELS[code]}
                  </button>
                )
              })}
            </div>
          </div>
          </div>
          </div>,
          document.body,
        )}
    </header>
  )
}

'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Globe, Menu, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/site-nav'
import { cn } from '@/lib/utils'

// Placeholder language list — wiring comes in step 4 (trilingual + RTL).
const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
] as const

export function SiteHeader() {
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

  // Close the desktop language menu on outside click / Escape.
  useEffect(() => {
    if (!langOpen) return
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-lang-menu]')) setLangOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLangOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
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
          aria-label="ASMES — retour à l'accueil"
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
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-heading text-lg font-extrabold tracking-tight text-brand-dark">
              ASMES
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              Milieu Environnemental &amp; Social
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
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
                {item.label}
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
          {/* Language selector (desktop) — names shown explicitly */}
          <div className="relative hidden lg:block" data-lang-menu>
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors',
                langOpen
                  ? 'bg-accent text-brand-dark'
                  : 'text-foreground/70 hover:bg-accent hover:text-brand-dark',
              )}
              aria-label="Changer de langue"
              aria-haspopup="menu"
              aria-expanded={langOpen}
            >
              <Globe className="size-5" />
              <span>Français</span>
              <ChevronDown
                className={cn('size-4 transition-transform', langOpen && 'rotate-180')}
              />
            </button>
            <div
              role="menu"
              className={cn(
                'absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-border bg-background shadow-lg transition-all duration-200',
                langOpen
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-1 opacity-0',
              )}
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  role="menuitem"
                  onClick={() => setLangOpen(false)}
                  dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-brand-dark"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-accent hover:text-brand-dark lg:hidden"
            aria-label="Ouvrir le menu"
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
          aria-label="Menu de navigation"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="relative size-9 overflow-hidden rounded-full ring-1 ring-border">
                <Image src="/asmes-logo.jpeg" alt="" fill sizes="36px" className="object-cover" />
              </span>
              <span className="font-heading text-base font-extrabold text-brand-dark">ASMES</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-accent hover:text-brand-dark"
              aria-label="Fermer le menu"
            >
              <X className="size-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-4" aria-label="Navigation mobile">
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
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="mt-auto border-t border-border p-4">
            <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Globe className="size-4" />
              <span>Langue</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
                  className="rounded-lg border border-border px-2 py-2.5 text-center text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-brand-dark"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          </div>
          </div>,
          document.body,
        )}
    </header>
  )
}

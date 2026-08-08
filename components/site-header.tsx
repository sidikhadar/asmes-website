'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Globe, Menu, X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/site-nav'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '')

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
            className={cn(
              'relative overflow-hidden rounded-full ring-1 ring-border transition-all duration-300',
              scrolled ? 'size-10' : 'size-12',
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
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-accent hover:text-brand-dark"
            aria-label="Changer de langue"
          >
            <Globe className="size-5" />
          </button>

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

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            'absolute inset-0 bg-brand-dark/30 backdrop-blur-sm transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        {/* Panel */}
        <div
          className={cn(
            'absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ease-out',
            mobileOpen ? 'translate-x-0' : 'translate-x-full',
          )}
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
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-brand-dark"
              aria-label="Changer de langue"
            >
              <Globe className="size-4" />
              Langue / اللغة / Language
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

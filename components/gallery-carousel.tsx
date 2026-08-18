'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { cn } from '@/lib/utils'

type GalleryCarouselProps = {
  /** Localised category label, used for alt text and the lightbox caption. */
  title: string
  images: string[]
}

/**
 * Horizontal, swipe/scroll-able strip of photos for a single gallery
 * category. Thumbnails share a fixed aspect ratio, lazy-load via next/image,
 * and open in a lightweight lightbox that supports keyboard + arrow
 * navigation. Fully RTL-aware (arrow direction follows the document dir).
 */
export function GalleryCarousel({ title, images }: GalleryCarouselProps) {
  const { dir } = useLanguage()
  const isRtl = dir === 'rtl'
  const trackRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const updateArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    // Normalise scrollLeft for RTL (can be negative or reversed across browsers).
    const max = el.scrollWidth - el.clientWidth
    const pos = Math.abs(el.scrollLeft)
    setCanPrev(pos > 4)
    setCanNext(pos < max - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  const scrollByCards = useCallback(
    (direction: 'prev' | 'next') => {
      const el = trackRef.current
      if (!el) return
      const amount = Math.round(el.clientWidth * 0.8)
      const sign = direction === 'next' ? 1 : -1
      // In RTL the visual "next" is a negative scrollLeft delta.
      el.scrollBy({ left: sign * amount * (isRtl ? -1 : 1), behavior: 'smooth' })
    },
    [isRtl],
  )

  // Lightbox navigation + keyboard handling.
  const showAt = useCallback(
    (next: (i: number) => number) =>
      setLightbox((cur) => (cur === null ? cur : (next(cur) + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === 'ArrowRight') showAt((i) => (isRtl ? i - 1 : i + 1))
      else if (e.key === 'ArrowLeft') showAt((i) => (isRtl ? i + 1 : i - 1))
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, showAt, isRtl])

  return (
    <div className="relative">
      {/* Prev / next controls (hidden on touch-first small screens) */}
      <button
        type="button"
        aria-label="Précédent"
        onClick={() => scrollByCards('prev')}
        className={cn(
          'absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-md backdrop-blur transition hover:border-brand/40 hover:text-brand-dark sm:flex',
          isRtl ? 'right-0 -mr-3' : 'left-0 -ml-3',
          !canPrev && 'pointer-events-none opacity-0',
        )}
      >
        {isRtl ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />}
      </button>
      <button
        type="button"
        aria-label="Suivant"
        onClick={() => scrollByCards('next')}
        className={cn(
          'absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 text-foreground shadow-md backdrop-blur transition hover:border-brand/40 hover:text-brand-dark sm:flex',
          isRtl ? 'left-0 -ml-3' : 'right-0 -mr-3',
          !canNext && 'pointer-events-none opacity-0',
        )}
      >
        {isRtl ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
      </button>

      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <li
            key={src}
            className="w-64 shrink-0 snap-start sm:w-72"
          >
            <button
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
            >
              <Image
                src={src || '/placeholder.svg'}
                alt={`${title} — photo ${i + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 16rem, 18rem"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      {lightbox !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-background/10 p-2 text-background transition hover:bg-background/20"
          >
            <X className="size-6" />
          </button>

          <button
            type="button"
            aria-label="Précédent"
            onClick={(e) => {
              e.stopPropagation()
              showAt((i) => (isRtl ? i + 1 : i - 1))
            }}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-full bg-background/10 p-2 text-background transition hover:bg-background/20',
              isRtl ? 'right-4' : 'left-4',
            )}
          >
            <ChevronLeft className="size-7" />
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={(e) => {
              e.stopPropagation()
              showAt((i) => (isRtl ? i - 1 : i + 1))
            }}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-full bg-background/10 p-2 text-background transition hover:bg-background/20',
              isRtl ? 'left-4' : 'right-4',
            )}
          >
            <ChevronRight className="size-7" />
          </button>

          <figure
            className="relative flex max-h-[85vh] w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={images[lightbox] || '/placeholder.svg'}
                alt={`${title} — photo ${lightbox + 1}`}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-background/80">
              {title} · {lightbox + 1} / {images.length}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  )
}

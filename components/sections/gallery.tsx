'use client'

import { useLanguage } from '@/components/language-provider'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/reveal'
import { GalleryCarousel } from '@/components/gallery-carousel'
import { GALLERY } from '@/lib/gallery'

/**
 * "Galerie" section — one horizontal carousel per field-action category,
 * stacked vertically. Titles come from the trilingual dictionary so the
 * whole gallery stays translated from a single source of truth.
 */
export function Gallery() {
  const { t } = useLanguage()
  const s = t.sections.galerie

  return (
    <section id="galerie" className="scroll-mt-24 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <div className="mt-14 flex flex-col gap-14">
          {GALLERY.map((category, i) => (
            <Reveal key={category.key} delay={i * 0.5}>
              <GalleryCarousel
                title={s.categories[category.key]}
                images={category.images}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

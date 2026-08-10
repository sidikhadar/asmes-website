'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/reveal'

/**
 * Partner list — names are proper nouns kept identical across locales.
 * Logos live in /public/partners and are shown in full colour.
 */
const PARTNERS = [
  // 1. Mauritania
  { name: 'République Islamique de Mauritanie', src: '/mauritania-emblem.jpeg' },
  // 2. Arab partners
  { name: 'UAE AID', src: '/partners/uae-aid.jpeg' },
  { name: 'Kuwait is by your side', src: '/partners/kuwait.jpeg' },
  { name: 'Oman Charitable Organization', src: '/partners/oman-charitable.jpeg' },
  // 3. China
  { name: 'Chine', src: '/partners/china.jpeg' },
  // 4. Others (alphabetical)
  { name: 'ANYL4PSD', src: '/partners/anyl4psd.jpeg' },
  { name: 'Coopération allemande (GIZ)', src: '/partners/giz.jpeg' },
  { name: 'Member of GNDR', src: '/partners/gndr.jpeg' },
  { name: 'Partenariat Union Européenne - Mauritanie', src: '/partners/eu-mauritanie.jpeg' },
  { name: 'Réseau des Femmes Leaders Maghrébines (RFLM)', src: '/partners/rflm.jpeg' },
  { name: 'RIMRAP / IRAM / Union Européenne', src: '/partners/rimrap-copco.jpeg' },
] as const

export function Partners() {
  const { t } = useLanguage()
  const s = t.sections.partenaires

  return (
    <section id="partenaires" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3">
          {PARTNERS.map((partner, i) => (
            <Reveal key={partner.name} delay={i * 0.05}>
              <div className="group flex h-32 items-center justify-center rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 sm:h-36">
                <div className="relative h-full w-full">
                  <Image
                    src={partner.src || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 320px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/components/language-provider'
import type { Dictionary } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type SectionId = keyof Dictionary['sections']

type SectionPlaceholderProps = {
  id: SectionId
  /** Alternate the background to create visual rhythm between sections. */
  tinted?: boolean
}

/**
 * Temporary scaffold for a content section.
 * Eyebrow + title are pulled from the active locale's dictionary so the
 * section stays fully translated; real content is added in later steps.
 */
export function SectionPlaceholder({ id, tinted }: SectionPlaceholderProps) {
  const { t } = useLanguage()
  const { eyebrow, title } = t.sections[id]

  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 border-t border-border/60',
        tinted ? 'bg-muted/40' : 'bg-background',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-dark">
          <span className="h-px w-8 bg-clay" />
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-3xl text-balance font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-6 max-w-xl text-sm text-muted-foreground">{t.common.comingSoon}</p>
      </div>
    </section>
  )
}

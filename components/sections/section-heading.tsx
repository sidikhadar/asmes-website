import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  /** Optional lead/intro paragraph shown under the title. */
  intro?: string
  /** Center the heading block (used for full-width feature sections). */
  centered?: boolean
  className?: string
}

/**
 * Shared eyebrow + title block used across every content section, so the
 * rhythm (clay tick, uppercase eyebrow, extrabold heading) stays consistent.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  centered,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && 'mx-auto max-w-3xl text-center', className)}>
      <Reveal>
        <p
          className={cn(
            'flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-dark',
            centered && 'justify-center',
          )}
        >
          <span className="h-px w-8 bg-clay" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-4 text-balance font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={2}>
          <p
            className={cn(
              'mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground',
              centered && 'mx-auto',
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}

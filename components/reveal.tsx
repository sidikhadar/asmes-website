'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Stagger index — each step adds a small delay for a cascading entrance. */
  delay?: number
  className?: string
  /** Render as a list item when used inside a <ul>. */
  as?: 'div' | 'li'
  /** Optional anchor id, e.g. for in-page navigation targets. */
  id?: string
}

/**
 * Lightweight scroll-reveal wrapper: fades + lifts its children into view the
 * first time they enter the viewport. Fully static when the visitor prefers
 * reduced motion, so it never blocks or distracts.
 */
export function Reveal({ children, delay = 0, className, as = 'div', id }: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = as === 'li' ? motion.li : motion.div

  if (reduce) {
    const Tag = as
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: delay * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const HEADER_LOGO_ID = 'header-logo-anchor'
const SPLASH_LOGO_SIZE = 148 // px — centered logo diameter
const HOLD_MS = 1400 // pause after entrance before flying to the header

type Phase = 'enter' | 'move'

/**
 * One-time opening animation. The ASMES logo fades/scales in at the center of
 * the screen, holds briefly, then flies (FLIP-measured) to its final spot in
 * the header while the overlay fades out to reveal the page underneath.
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<Phase>('enter')
  const [target, setTarget] = useState({ x: 0, y: 0, scale: 1 })
  const prefersReduced = useReducedMotion()
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Prevent scrolling while the splash is on screen.
  useEffect(() => {
    if (!visible) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [visible])

  // Reduced motion: show the logo briefly, then reveal the site without flying.
  useEffect(() => {
    if (!prefersReduced) return
    const t = setTimeout(() => {
      revealHeaderLogo()
      setVisible(false)
    }, 900)
    return () => clearTimeout(t)
  }, [prefersReduced])

  // Measure the header logo and compute the transform to fly there.
  const startMove = () => {
    const anchor = document.getElementById(HEADER_LOGO_ID)
    if (!anchor) {
      revealHeaderLogo()
      setVisible(false)
      return
    }
    const rect = anchor.getBoundingClientRect()
    const targetCenterX = rect.left + rect.width / 2
    const targetCenterY = rect.top + rect.height / 2
    const dx = targetCenterX - window.innerWidth / 2
    const dy = targetCenterY - window.innerHeight / 2
    setTarget({ x: dx, y: dy, scale: rect.width / SPLASH_LOGO_SIZE })
    setPhase('move')
  }

  const revealHeaderLogo = () => {
    document.documentElement.setAttribute('data-splash', 'done')
    window.dispatchEvent(new CustomEvent('asmes:splash-done'))
  }

  if (prefersReduced) {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <SplashLogo />
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'move' ? 0 : 1 }}
          transition={{ duration: phase === 'move' ? 0.7 : 0.3, ease: 'easeInOut' }}
        >
          {/* Soft brand halo behind the logo */}
          <motion.div
            aria-hidden
            className="absolute size-[320px] rounded-full bg-brand/10 blur-3xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: phase === 'move' ? 0 : 1,
              scale: phase === 'move' ? 0.4 : 1,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          <motion.div
            style={{ width: SPLASH_LOGO_SIZE, height: SPLASH_LOGO_SIZE }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              phase === 'enter'
                ? { opacity: 1, scale: 1, x: 0, y: 0 }
                : { opacity: 1, scale: target.scale, x: target.x, y: target.y }
            }
            transition={
              phase === 'enter'
                ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.75, ease: [0.65, 0, 0.35, 1] }
            }
            onAnimationComplete={() => {
              if (phase === 'enter') {
                holdTimer.current = setTimeout(startMove, HOLD_MS)
              } else {
                // Logo has landed on the header spot — swap them and unmount.
                revealHeaderLogo()
                setVisible(false)
              }
            }}
          >
            <SplashLogo />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SplashLogo() {
  return (
    <span className="relative block size-full overflow-hidden rounded-full shadow-[0_10px_40px_rgba(74,122,44,0.25)] ring-1 ring-border">
      <Image
        src="/asmes-logo.jpeg"
        alt="Logo ASMES"
        fill
        sizes="148px"
        className="object-cover"
        priority
      />
    </span>
  )
}

'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function SmoothScrollProvider({ children }) {
  const lenisRef   = useRef(null)
  const tickerFnRef = useRef(null)

  useEffect(() => {
    let mounted = true

    import('lenis').then(({ default: Lenis }) => {
      if (!mounted) return

      const lenis = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      })
      lenisRef.current = lenis

      // Critical: tell ScrollTrigger when Lenis scrolls
      lenis.on('scroll', ScrollTrigger.update)

      // Drive Lenis from GSAP's ticker (keeps both in sync)
      const fn = (time) => lenis.raf(time * 1000)
      tickerFnRef.current = fn
      gsap.ticker.add(fn)
      gsap.ticker.lagSmoothing(0)

      ScrollTrigger.refresh()
    })

    return () => {
      mounted = false
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current)
      lenisRef.current?.destroy()
    }
  }, [])

  return children
}

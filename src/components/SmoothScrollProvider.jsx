'use client'
import { useEffect } from 'react'

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    let lenis
    let rafId

    async function init() {
      const { default: Lenis } = await import('lenis')
      lenis = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      })

      function raf(time) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return children
}

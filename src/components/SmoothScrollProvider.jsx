'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Critical bridge — must exist before any ScrollTrigger is created
    lenis.on('scroll', ScrollTrigger.update)

    const rafFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafFn)
    gsap.ticker.lagSmoothing(0)

    // Immediate refresh once Lenis is wired
    ScrollTrigger.refresh()
    // Deferred refresh catches child ScrollTriggers that initialize after mount
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      clearTimeout(refreshTimer)
      gsap.ticker.remove(rafFn)
      lenis.destroy()
    }
  }, [])

  return children
}

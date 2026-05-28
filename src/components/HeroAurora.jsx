'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const DiagnosticOrb = dynamic(() => import('./DiagnosticOrb'), { ssr: false })

const STATS = [
  { value: 3200, suffix: '+', label: 'Adjustments Performed' },
  { value: 98,   suffix: '%', label: 'Patient Satisfaction' },
  { value: 15,   suffix: '+', label: 'Years of Excellence' },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      let start = 0
      const step = target / 80
      const id = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(id) }
        else setCount(Math.floor(start))
      }, 20)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function HeroAurora() {
  const heroRef = useRef(null)

  useEffect(() => {
    async function animate() {
      const { gsap } = await import('gsap')
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.25 })
        tl.from('.h-eyebrow', { y: 16, opacity: 0, duration: 0.55, ease: 'power3.out' })
          .from('.h-headline', { y: 50, opacity: 0, duration: 0.85, ease: 'power3.out' }, '-=0.25')
          .from('.h-sub',      { y: 30, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.45')
          .from('.h-ctas',     { y: 20, opacity: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.35')
          .from('.h-stats',    { y: 18, opacity: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.3')
          .from('.h-orb',      { scale: 0.82, opacity: 0, duration: 1.1, ease: 'back.out(1.5)' }, '-=0.7')
      }, heroRef)
      return () => ctx.revert()
    }
    animate()
  }, [])

  return (
    <section ref={heroRef} id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-surface">

      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="aurora-blob blob-teal animate-aurora-1 w-[700px] h-[700px] -top-56 -left-40" />
        <div className="aurora-blob blob-purple animate-aurora-2 w-[550px] h-[550px] -top-32 -right-32" style={{ animationDelay: '-4s' }}/>
        <div className="aurora-blob blob-pink animate-aurora-3 w-[600px] h-[600px] bottom-0 left-1/3" style={{ animationDelay: '-8s' }}/>
        <div className="aurora-blob blob-cyan animate-aurora-4 w-[400px] h-[400px] bottom-20 -right-20" style={{ animationDelay: '-2s' }}/>
        <div className="grid-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 md:pt-28 md:pb-20
        flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

        {/* Left: Copy */}
        <div className="flex-1 max-w-2xl lg:pr-8">
          <div className="h-eyebrow eyebrow mb-6">
            East Valley's Premier Chiropractic Clinic
          </div>

          <h1 className="h-headline font-display font-700 text-ink leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)' }}>
            Where Pain Ends<br/>
            <span className="gradient-text">and Performance</span><br/>
            Begins.
          </h1>

          <p className="h-sub font-body text-ink-2 leading-relaxed mb-8 max-w-lg"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}>
            Data-driven chiropractic care engineered for the modern body. Precision adjustments,
            advanced decompression, and performance-focused rehabilitation — all calibrated to your
            unique anatomy.
          </p>

          <div className="h-ctas flex flex-wrap gap-4 mb-12">
            <button onClick={() => document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-aurora px-7 py-3.5 rounded-xl text-base font-display font-600 shadow-teal-md">
              Book Free Consultation
            </button>
            <button onClick={() => document.querySelector('#treatments')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost px-7 py-3.5 rounded-xl text-base">
              Explore Treatments →
            </button>
          </div>

          {/* Stats row */}
          <div className="h-stats flex flex-wrap gap-6">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="flex flex-col">
                <span className="metric-value font-display font-700 text-ink"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
                  <Counter target={value} suffix={suffix} />
                </span>
                <span className="font-mono text-xs text-ink-3 tracking-wide uppercase mt-0.5">{label}</span>
                <div className="mt-1.5 h-px w-full bg-gradient-to-r from-aurora-teal/50 to-transparent"/>
              </div>
            ))}
          </div>
        </div>

        {/* Right: DiagnosticOrb */}
        <div className="h-orb flex-shrink-0 flex items-center justify-center lg:pl-8">
          <DiagnosticOrb />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[10px] text-ink-3 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-aurora-teal/60 to-transparent animate-float"/>
      </div>
    </section>
  )
}

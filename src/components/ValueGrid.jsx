'use client'
import { useEffect, useRef } from 'react'

const VALUES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 4 L14 24 M9 8 L19 8 M8 14 L20 14 M9 20 L19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Precision Adjustments',
    sub: 'Neural pathway optimization',
    body: 'Board-certified spinal manipulation calibrated to your unique anatomy. Each adjustment is a calculated intervention — restoring alignment, reducing inflammation, and maximizing nerve transmission.',
    accent: '#00D4AA',
    bg: 'rgba(0,212,170,0.06)',
    border: 'rgba(0,212,170,0.15)',
    glow: 'rgba(0,212,170,0.12)',
    stat: { value: '94%', label: 'Pain Relief Rate' },
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3 L14 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 8 C7 8 10 10 14 10 C18 10 21 8 21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 14 C6 14 9.5 16 14 16 C18.5 16 22 14 22 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 20 C7 20 10 22 14 22 C18 22 21 20 21 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Spinal Decompression',
    sub: 'Non-surgical disc restoration',
    body: 'FDA-cleared traction therapy creates targeted negative intradiscal pressure, allowing herniated and bulging discs to retract and heal — without surgery, without downtime.',
    accent: '#818CF8',
    bg: 'rgba(129,140,248,0.06)',
    border: 'rgba(129,140,248,0.15)',
    glow: 'rgba(129,140,248,0.12)',
    stat: { value: '89%', label: 'Disc Improvement' },
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M8 22 L8 12 C8 9 10 7 14 7 C18 7 20 9 20 12 L20 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 16 L8 16 M20 16 L23 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 22 L18 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Sports Recovery',
    sub: 'Return faster. Perform better.',
    body: 'ART and Graston soft tissue therapy combined with athlete-specific rehabilitation. We\'ve returned 96% of treated athletes to full performance — faster than conventional care.',
    accent: '#34D399',
    bg: 'rgba(52,211,153,0.06)',
    border: 'rgba(52,211,153,0.15)',
    glow: 'rgba(52,211,153,0.12)',
    stat: { value: '96%', label: 'Return-to-Play Rate' },
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20 L10 14 L14 18 L20 10 L24 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="14" r="2" fill="currentColor"/>
        <path d="M4 24 L24 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    title: 'Neural Performance',
    sub: 'Optimize your nervous system',
    body: 'Beyond pain relief — our neurological performance protocols optimize central nervous system function, enhancing proprioception, reaction time, and cognitive-physical integration.',
    accent: '#F472B6',
    bg: 'rgba(244,114,182,0.06)',
    border: 'rgba(244,114,182,0.15)',
    glow: 'rgba(244,114,182,0.12)',
    stat: { value: '3.2×', label: 'Faster Recovery' },
  },
]

export default function ValueGrid() {
  const sectionRef = useRef(null)

  useEffect(() => {
    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from('.value-card', {
        y: 60, opacity: 0, scale: 0.94,
        duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.value-grid', start: 'top 78%' },
      })
      gsap.from('.value-heading', {
        y: 30, opacity: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }
    animate()
  }, [])

  return (
    <section ref={sectionRef} id="value" className="section-pad relative overflow-hidden bg-white">

      {/* Subtle background mesh */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-blob blob-teal w-[500px] h-[400px] -top-20 -right-20 opacity-30" style={{ animationDuration: '20s' }}/>
        <div className="aurora-blob blob-purple w-[400px] h-[400px] bottom-0 -left-20 opacity-20"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="value-heading text-center mb-14">
          <div className="eyebrow mx-auto mb-5">Live Pain-Free</div>
          <h2 className="font-display font-700 text-ink mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Four Pillars of{' '}
            <span className="gradient-text">High-Performance</span> Care
          </h2>
          <p className="font-body text-ink-3 max-w-xl mx-auto leading-relaxed">
            Every modality we offer is selected for its measurable clinical outcomes —
            not trends, not guesswork. Your recovery is calculated.
          </p>
        </div>

        {/* Grid */}
        <div className="value-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="value-card glass-card rounded-2xl p-6 flex flex-col group cursor-default"
              style={{ '--accent': v.accent }}>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
                group-hover:scale-110"
                style={{
                  background: v.bg,
                  border: `1px solid ${v.border}`,
                  color: v.accent,
                  boxShadow: `0 0 20px ${v.glow}`,
                }}>
                {v.icon}
              </div>

              {/* Title */}
              <h3 className="font-display font-600 text-ink text-[1.05rem] mb-1">{v.title}</h3>
              <p className="font-mono text-[10px] tracking-wider uppercase mb-3" style={{ color: v.accent }}>{v.sub}</p>

              {/* Body */}
              <p className="font-body text-ink-3 text-sm leading-relaxed flex-1 mb-5">{v.body}</p>

              {/* Stat chip */}
              <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: v.border }}>
                <span className="metric-value font-display font-700 text-lg" style={{ color: v.accent }}>
                  {v.stat.value}
                </span>
                <span className="font-mono text-[10px] text-ink-3 uppercase tracking-wide leading-tight">
                  {v.stat.label}
                </span>
              </div>

              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${v.glow} 0%, transparent 60%)` }}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

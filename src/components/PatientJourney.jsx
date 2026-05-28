'use client'
import { useEffect, useRef } from 'react'

const STEPS = [
  {
    number: '01',
    title: 'Open Consultation',
    sub: 'Your story shapes your plan',
    body: 'A focused 30-minute intake where specialists map your pain history, lifestyle, and performance goals — building the complete clinical picture before any treatment begins.',
    accent: '#00D4AA',
    accentClass: 'step-accent-teal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M3 19 C3 15 6 13 11 13 C16 13 19 15 19 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Digital Diagnostics',
    sub: 'Precision imaging & baseline data',
    body: 'Advanced postural screening, range-of-motion testing, and digital X-ray analysis build your biomechanical baseline — your body\'s performance dataset, quantified.',
    accent: '#06B6D4',
    accentClass: 'step-accent-cyan',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M7 11 L10 14 L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Custom Care Plan',
    sub: 'Your recovery roadmap',
    body: 'A phase-based treatment roadmap with clear milestones, session frequency, and projected outcomes — designed specifically for your anatomy and goals.',
    accent: '#818CF8',
    accentClass: 'step-accent-purple',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6 L18 6 M4 11 L14 11 M4 16 L11 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M15.8 16 L17 17.2 L18.2 15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'First Adjustment',
    sub: 'Immediate, measurable change',
    body: 'Precision spinal correction begins. Most patients report a noticeable structural shift after a single session — the launch point of your functional transformation.',
    accent: '#F472B6',
    accentClass: 'step-accent-pink',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3 L11 19 M7 6.5 L11 3 L15 6.5 M7 15.5 L11 19 L15 15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 11 L14 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Progress Tracking',
    sub: 'Data-driven reassessment',
    body: 'Regular biometric comparisons and outcome tracking quantify your recovery progress at every phase. Your results are measured, not assumed.',
    accent: '#34D399',
    accentClass: 'step-accent-emerald',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17 L7 11 L11 14 L15 8 L19 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19" cy="10" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Peak Performance',
    sub: 'Life lived without limits',
    body: 'Transition from rehabilitation to performance optimization. Maintaining spinal health, enhancing athleticism, and sustaining the quality of life you worked for.',
    accent: '#00D4AA',
    accentClass: 'step-accent-teal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3 L13.5 9 L20 9.5 L15 14 L16.5 20.5 L11 17 L5.5 20.5 L7 14 L2 9.5 L8.5 9 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function PatientJourney() {
  const sectionRef = useRef(null)

  useEffect(() => {
    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from('.journey-heading', {
        y: 30, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      gsap.from('.step-card', {
        y: 55, opacity: 0, scale: 0.94,
        duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.journey-grid', start: 'top 80%' },
      })

      // Connecting line draw
      gsap.from('.journey-line', {
        scaleX: 0, transformOrigin: 'left center',
        duration: 1.5, ease: 'power2.inOut',
        scrollTrigger: { trigger: '.journey-grid', start: 'top 75%' },
      })
    }
    animate()
  }, [])

  return (
    <section ref={sectionRef} id="journey" className="section-pad relative overflow-hidden bg-surface">

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-blob blob-teal w-[500px] h-[300px] top-20 right-0 opacity-20"/>
        <div className="aurora-blob blob-pink w-[400px] h-[300px] bottom-0 left-0 opacity-15"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="journey-heading text-center mb-14">
          <div className="eyebrow mx-auto mb-5">The Patient Journey</div>
          <h2 className="font-display font-700 text-ink mb-4" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)' }}>
            Join Hundreds Already{' '}
            <span className="gradient-text">Living Pain-Free</span>
          </h2>
          <p className="font-body text-ink-3 max-w-xl mx-auto text-sm leading-relaxed">
            Six precision-engineered phases from first consultation to peak performance.
            Each step is a calculated advance toward the pain-free life you deserve.
          </p>
        </div>

        {/* Steps grid */}
        <div className="journey-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <div key={step.number} className={`step-card glass-card rounded-2xl p-6 flex flex-col ${step.accentClass}`}>

              {/* Header row */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: step.accent + '15', color: step.accent }}>
                  {step.icon}
                </div>
                <span className="metric-value font-mono font-600 text-3xl"
                  style={{ color: step.accent + '30' }}>
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display font-700 text-ink text-base mb-1">{step.title}</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: step.accent }}>{step.sub}</p>
              <p className="font-body text-ink-3 text-sm leading-relaxed flex-1">{step.body}</p>

              {/* Progress dot indicator */}
              <div className="flex items-center gap-1.5 mt-5">
                {STEPS.map((_, j) => (
                  <div key={j} className="rounded-full transition-all duration-300"
                    style={{
                      width: j === i ? 18 : 6,
                      height: 4,
                      background: j === i ? step.accent : 'rgba(15,23,42,0.1)',
                    }}/>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA nudge */}
        <div className="text-center mt-12">
          <button onClick={() => document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-aurora px-8 py-4 rounded-xl font-display font-600 shadow-teal-md">
            Begin Your Journey — Free Consultation
          </button>
          <p className="font-mono text-xs text-ink-3 mt-3">No commitment required · Same-week appointments available</p>
        </div>
      </div>
    </section>
  )
}

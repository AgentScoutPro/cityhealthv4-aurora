'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const CONDITIONS = [
  'Neuropathy', 'Arthritis', 'Back Pain', 'Sciatica',
  'Neck Pain', 'Chronic Pain', 'Headaches', 'Personal Injury',
]

export default function CoreProblemSplit() {
  const sectionRef = useRef(null)
  const track1Ref  = useRef(null)
  const track2Ref  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.from('.cps-heading', {
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.cps-body', {
        y: 30, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        delay: 0.15,
      })

      // Infinite marquee — row 1 scrolls left, row 2 scrolls right
      const total1 = track1Ref.current?.scrollWidth / 2 || 0
      const total2 = track2Ref.current?.scrollWidth / 2 || 0

      gsap.to(track1Ref.current, {
        x: -total1,
        duration: 22,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % total1}px`,
        },
      })
      gsap.to(track2Ref.current, {
        x: total2,
        duration: 28,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % total2}px`,
        },
      })

      // Condition pills stagger on entry
      gsap.from('.condition-pill', {
        scale: 0.85, opacity: 0, duration: 0.45, stagger: 0.06, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.pills-row', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const doubled = [...CONDITIONS, ...CONDITIONS]

  return (
    <section ref={sectionRef} id="problem" className="section-pad relative overflow-hidden bg-white">

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-blob blob-purple w-[500px] h-[400px] -top-20 right-0 opacity-20"/>
        <div className="aurora-blob blob-teal   w-[400px] h-[300px] bottom-0 left-0 opacity-15"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="cps-heading max-w-3xl mx-auto text-center mb-6">
          <div className="eyebrow mx-auto mb-5">Conditions We Treat</div>
          <h2 className="font-display font-700 text-ink leading-[1.1] mb-0"
            style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)' }}>
            Unveiling a Path to Better Health<br/>
            and <span className="gradient-text">Pain-Free Living</span>
          </h2>
        </div>

        {/* Kinetic word marquees */}
        <div className="my-10 overflow-hidden select-none" aria-hidden>
          {/* Row 1 — left scroll */}
          <div className="overflow-hidden mb-3">
            <div ref={track1Ref} className="flex gap-4 whitespace-nowrap will-change-transform"
              style={{ width: 'max-content' }}>
              {doubled.map((cond, i) => (
                <div key={`r1-${i}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card"
                  style={{
                    border: '1px solid rgba(0,212,170,0.18)',
                    background: i % 3 === 0
                      ? 'rgba(0,212,170,0.07)'
                      : i % 3 === 1
                      ? 'rgba(129,140,248,0.07)'
                      : 'rgba(244,114,182,0.07)',
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-data-pulse"
                    style={{ background: i % 3 === 0 ? '#00D4AA' : i % 3 === 1 ? '#818CF8' : '#F472B6' }}/>
                  <span className="font-display font-600 text-ink text-sm tracking-tight">{cond}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — right scroll (subset, offset) */}
          <div className="overflow-hidden">
            <div ref={track2Ref} className="flex gap-4 whitespace-nowrap will-change-transform"
              style={{ width: 'max-content', transform: `translateX(-50%)` }}>
              {[...CONDITIONS.slice(4), ...CONDITIONS, ...CONDITIONS.slice(0,4)].map((cond, i) => (
                <div key={`r2-${i}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card"
                  style={{
                    border: '1px solid rgba(6,182,212,0.18)',
                    background: 'rgba(6,182,212,0.06)',
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-aurora-cyan opacity-70"/>
                  <span className="font-display font-600 text-ink-2 text-sm">{cond}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Condition pills grid (accessible / non-scrolling version) */}
        <div className="pills-row flex flex-wrap gap-3 justify-center mb-12">
          {CONDITIONS.map(c => (
            <div key={c} className="condition-pill glass-card px-5 py-2.5 rounded-full
              flex items-center gap-2 cursor-default hover:shadow-teal-sm transition-all duration-200 hover:-translate-y-0.5">
              <div className="w-2 h-2 rounded-full bg-aurora-teal animate-data-pulse"/>
              <span className="font-display font-600 text-ink text-sm">{c}</span>
            </div>
          ))}
        </div>

        {/* Body text */}
        <div className="cps-body max-w-3xl mx-auto text-center">
          <p className="font-body text-ink-2 leading-relaxed mb-4"
            style={{ fontSize: 'clamp(0.95rem, 1.7vw, 1.08rem)' }}>
            The medical professionals at the City Health Services pain treatment clinic know where
            successful pain management treatments start — with a thorough understanding of you.
            Each patient receives a precision-crafted care plan built around their specific condition,
            anatomy, and recovery goals.
          </p>
          <p className="font-body text-ink-3 text-sm leading-relaxed">
            From neuropathy and sciatica to sports-related injuries and chronic musculoskeletal pain,
            our multi-disciplinary team delivers evidence-based interventions that produce measurable,
            lasting results.
          </p>

          <button onClick={() => document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-aurora mt-8 inline-flex px-7 py-3.5 rounded-xl font-display font-600 shadow-teal-sm">
            Begin Your Recovery Today
          </button>
        </div>
      </div>
    </section>
  )
}

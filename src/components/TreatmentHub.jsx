'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const TABS = [
  {
    id: 'spinal',
    label: 'Spinal Adjustments',
    icon: '⟁',
    tagline: 'Precision alignment for peak neural function',
    description: 'Our board-certified chiropractors use evidence-based spinal manipulation techniques calibrated to your unique anatomy. Each adjustment optimizes nerve transmission, reduces inflammation, and restores natural range of motion with measurable outcomes after every session.',
    stats: [
      { value: '3,200+', label: 'Adjustments' },
      { value: '94%',   label: 'Pain Relief' },
      { value: '2.3',   label: 'Avg Sessions' },
    ],
    price: 89,
    unit: 'session',
    features: ['Digital posture analysis', 'Custom adjustment protocol', 'Post-session mobility test', 'Lifestyle optimization plan'],
    accent: '#00D4AA',
    gradient: 'linear-gradient(135deg, rgba(0,212,170,0.08) 0%, rgba(6,182,212,0.04) 100%)',
    border: 'rgba(0,212,170,0.2)',
  },
  {
    id: 'decompression',
    label: 'Decompression',
    icon: '◎',
    tagline: 'Non-surgical relief for disc conditions',
    description: 'FDA-cleared spinal decompression therapy creates precise negative intradiscal pressure, allowing herniated or bulging discs to retract and heal. Ideal for chronic lower back pain, sciatica, and degenerative disc disease — no surgery, no downtime.',
    stats: [
      { value: '580+', label: 'Sessions Done' },
      { value: '89%',  label: 'Improvement' },
      { value: '8-12', label: 'Sessions Avg' },
    ],
    price: 149,
    unit: 'session',
    features: ['Computerized traction table', 'Real-time pressure monitoring', 'Targeted neural pathway relief', 'Home care protocol included'],
    accent: '#818CF8',
    gradient: 'linear-gradient(135deg, rgba(129,140,248,0.08) 0%, rgba(244,114,182,0.04) 100%)',
    border: 'rgba(129,140,248,0.2)',
  },
  {
    id: 'physio',
    label: 'Physiotherapy',
    icon: '⊕',
    tagline: 'Restore movement. Rebuild strength.',
    description: 'Integrated physiotherapy combining manual therapy, therapeutic exercise, dry needling, and TENS to address musculoskeletal dysfunction at its source. Functional movement screening ensures your program is precision-matched to your performance goals.',
    stats: [
      { value: '210+', label: 'Active Patients' },
      { value: '91%',  label: 'Mobility Gain' },
      { value: '6wk',  label: 'Avg to Goal' },
    ],
    price: 99,
    unit: 'session',
    features: ['Functional movement screen', 'Therapeutic exercise library', 'Dry needling available', 'Progress biometrics dashboard'],
    accent: '#34D399',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(0,212,170,0.04) 100%)',
    border: 'rgba(52,211,153,0.2)',
  },
  {
    id: 'sports',
    label: 'Sports Injury',
    icon: '◈',
    tagline: 'Return faster. Perform beyond baseline.',
    description: 'Our sports injury protocol combines ART (Active Release Technique), Graston instrument-assisted soft tissue mobilization, and athlete-specific rehabilitation programming. 96% of treated athletes return to full competitive performance.',
    stats: [
      { value: '160+', label: 'Athletes Treated' },
      { value: '96%',  label: 'Return-to-Play' },
      { value: '40%',  label: 'Faster Recovery' },
    ],
    price: 119,
    unit: 'session',
    features: ['Sport-specific movement analysis', 'ART & Graston therapy', 'Performance enhancement', 'Injury prevention programming'],
    accent: '#F472B6',
    gradient: 'linear-gradient(135deg, rgba(244,114,182,0.08) 0%, rgba(129,140,248,0.04) 100%)',
    border: 'rgba(244,114,182,0.2)',
  },
]

export default function TreatmentHub() {
  const [active, setActive] = useState('spinal')
  const contentRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    async function animateIn() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.from('.treatment-heading', {
        y: 30, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.treatment-tabs-row', {
        y: 20, opacity: 0, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        delay: 0.15,
      })
    }
    animateIn()
  }, [])

  useLayoutEffect(() => {
    async function crossDissolve() {
      const { gsap } = await import('gsap')
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        )
      }
    }
    crossDissolve()
  }, [active])

  const handleTab = async (id) => {
    if (id === active) return
    const { gsap } = await import('gsap')
    gsap.to(contentRef.current, {
      opacity: 0, y: -8, duration: 0.18, ease: 'power2.in',
      onComplete: () => setActive(id),
    })
  }

  const tab = TABS.find(t => t.id === active)

  return (
    <section ref={sectionRef} id="treatments" className="section-pad relative overflow-hidden bg-surface">

      {/* Background aurora accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-blob blob-cyan w-[600px] h-[400px] top-0 right-0 opacity-25"/>
        <div className="aurora-blob blob-pink w-[400px] h-[300px] bottom-0 left-1/4 opacity-15"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="treatment-heading text-center mb-12">
          <div className="eyebrow mx-auto mb-5">Treatment Portfolio</div>
          <h2 className="font-display font-700 text-ink mb-4" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)' }}>
            Select Your{' '}
            <span className="gradient-text">Care Protocol</span>
          </h2>
          <p className="font-body text-ink-3 max-w-xl mx-auto text-sm leading-relaxed">
            Each treatment is a specialized clinical discipline. Choose your pathway below.
          </p>
        </div>

        {/* Tab bar */}
        <div className="treatment-tabs-row flex flex-wrap gap-2 justify-center mb-10">
          {TABS.map(t => (
            <button key={t.id} onClick={() => handleTab(t.id)}
              className="px-5 py-2.5 rounded-xl font-display font-500 text-sm transition-all duration-250"
              style={active === t.id ? {
                background: t.accent,
                color: '#fff',
                boxShadow: `0 0 24px ${t.accent}55`,
              } : {
                background: 'rgba(255,255,255,0.7)',
                color: '#334155',
                border: '1px solid rgba(15,23,42,0.1)',
              }}>
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div ref={contentRef} className="tab-panel grid grid-cols-1 lg:grid-cols-5 gap-6"
          style={{ minHeight: 340 }}>

          {/* Left: info block (3 cols) */}
          <div className="lg:col-span-3 glass-card rounded-2xl p-8 flex flex-col"
            style={{ background: tab.gradient, borderColor: tab.border }}>

            <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: tab.accent }}>
              {tab.icon} {tab.tagline}
            </p>
            <h3 className="font-display font-700 text-ink text-xl md:text-2xl mb-4">{tab.label}</h3>
            <p className="font-body text-ink-2 text-sm leading-relaxed mb-6">{tab.description}</p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {tab.stats.map(s => (
                <div key={s.label} className="text-center py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.5)', border: `1px solid ${tab.border}` }}>
                  <div className="metric-value font-display font-700 text-lg" style={{ color: tab.accent }}>{s.value}</div>
                  <div className="font-mono text-[9px] text-ink-3 uppercase tracking-wide mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-auto">
              {tab.features.map(f => (
                <li key={f} className="flex items-center gap-2 font-body text-xs text-ink-2">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[8px]"
                    style={{ background: tab.accent + '20', color: tab.accent }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: pricing card (2 cols) */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="font-mono text-xs text-ink-3 uppercase tracking-widest mb-3">Starting From</div>
            <div className="flex items-start gap-1 mb-1">
              <span className="font-display font-500 text-xl text-ink-2 mt-2">$</span>
              <span className="metric-value font-display font-700 text-ink"
                style={{ fontSize: '4rem', lineHeight: 1 }}>{tab.price}</span>
            </div>
            <div className="font-mono text-xs text-ink-3 uppercase tracking-wide mb-8">per {tab.unit}</div>

            <button onClick={() => document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-aurora w-full py-3.5 rounded-xl font-display font-600 text-sm mb-4"
              style={{ background: `linear-gradient(135deg, ${tab.accent}, ${tab.accent}99)` }}>
              Book This Treatment
            </button>
            <button onClick={() => document.querySelector('#careplans')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost w-full py-3 rounded-xl text-sm">
              View Care Plans →
            </button>

            <p className="font-mono text-[10px] text-ink-3 mt-5 leading-relaxed text-center">
              Free consultation included with first session.<br/>
              Most insurance plans accepted.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

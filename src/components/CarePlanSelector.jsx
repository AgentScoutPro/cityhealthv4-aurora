'use client'
import { useEffect, useRef, useState } from 'react'

const FREQUENCIES = [
  { id: '1x', label: '1× / week',  sublabel: 'Maintenance' },
  { id: '2x', label: '2× / week',  sublabel: 'Active Care' },
  { id: '3x', label: '3× / week',  sublabel: 'Intensive' },
]

const PLANS = {
  foundation: {
    name: 'Foundation',
    tagline: 'Essential care for pain-free living',
    individual: { '1x': 179, '2x': 299, '3x': 399 },
    family:     { '1x': 299, '2x': 499, '3x': 649 },
    features: [
      'Monthly posture analysis',
      'Priority booking',
      '10% retail discount',
      'Digital health dashboard',
    ],
    accent: '#06B6D4',
    highlight: false,
  },
  advanced: {
    name: 'Advanced',
    tagline: 'Accelerated recovery for lasting results',
    individual: { '1x': 249, '2x': 399, '3x': 529 },
    family:     { '1x': 399, '2x': 649, '3x': 849 },
    features: [
      'Bi-weekly progress reports',
      'Decompression included',
      'Nutrition consultation',
      '20% retail discount',
      'Same-day emergency slots',
    ],
    accent: '#00D4AA',
    highlight: true,
  },
  performance: {
    name: 'Performance',
    tagline: 'Elite-level care for peak performers',
    individual: { '1x': 349, '2x': 549, '3x': 699 },
    family:     { '1x': 549, '2x': 849, '3x': 1099 },
    features: [
      'Weekly biometric tracking',
      'Unlimited physiotherapy',
      'Sports injury coverage',
      '30% retail discount',
      'Dedicated care coordinator',
      'Annual wellness review',
    ],
    accent: '#818CF8',
    highlight: false,
  },
}

export default function CarePlanSelector() {
  const [mode, setMode] = useState('individual')
  const [freq, setFreq] = useState('2x')
  const sectionRef = useRef(null)

  useEffect(() => {
    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.from('.plan-card', {
        y: 50, opacity: 0, scale: 0.95, duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.plans-grid', start: 'top 80%' },
      })
      gsap.from('.selector-controls', {
        y: 24, opacity: 0, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        delay: 0.1,
      })
    }
    animate()
  }, [])

  const planEntries = Object.entries(PLANS)

  return (
    <section ref={sectionRef} id="careplans" className="section-pad relative overflow-hidden bg-white">

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-blob blob-emerald w-[500px] h-[400px] -top-10 left-0 opacity-20"/>
        <div className="aurora-blob blob-purple w-[450px] h-[350px] bottom-0 right-0 opacity-20"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="eyebrow mx-auto mb-5">Find Your Perfect Care Plan</div>
          <h2 className="font-display font-700 text-ink mb-4" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)' }}>
            Invest in Your{' '}
            <span className="gradient-text">High Performance</span>
          </h2>
          <p className="font-body text-ink-3 max-w-xl mx-auto text-sm leading-relaxed">
            Transparent, straightforward care memberships. Adjust the parameters below to see your personalized plan.
          </p>
        </div>

        {/* Controls */}
        <div className="selector-controls flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">

          {/* Individual / Family toggle */}
          <div className="glass-card rounded-2xl p-1.5 flex gap-1">
            {['individual','family'].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className="px-6 py-2 rounded-xl font-display font-600 text-sm capitalize transition-all duration-250"
                style={mode === m ? {
                  background: 'linear-gradient(135deg, #00D4AA, #06B6D4)',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(0,212,170,0.3)',
                } : { color: '#64748B' }}>
                {m}
              </button>
            ))}
          </div>

          {/* Frequency selector */}
          <div className="glass-card rounded-2xl p-1.5 flex gap-1">
            {FREQUENCIES.map(f => (
              <button key={f.id} onClick={() => setFreq(f.id)}
                className="px-4 py-2 rounded-xl text-center transition-all duration-250"
                style={freq === f.id ? {
                  background: 'rgba(0,212,170,0.1)',
                  border: '1px solid rgba(0,212,170,0.3)',
                } : {}}>
                <div className="font-display font-600 text-xs text-ink">{f.label}</div>
                <div className="font-mono text-[9px] text-ink-3 uppercase tracking-wide">{f.sublabel}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="plans-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {planEntries.map(([key, plan]) => {
            const price = plan[mode][freq]
            return (
              <div key={key}
                className={`plan-card glass-card rounded-2xl p-7 flex flex-col relative overflow-hidden transition-all duration-300
                  ${plan.highlight ? 'scale-[1.03] shadow-teal-md' : ''}`}
                style={plan.highlight ? {
                  border: '1.5px solid rgba(0,212,170,0.35)',
                  background: 'rgba(255,255,255,0.85)',
                } : {}}>

                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: 'linear-gradient(90deg, transparent, #00D4AA, transparent)' }}/>
                )}

                {/* Badge */}
                {plan.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="eyebrow text-[9px] px-2 py-0.5">Most Popular</span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: plan.accent }}>
                    {plan.tagline}
                  </div>
                  <h3 className="font-display font-700 text-ink text-xl">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-start gap-1">
                    <span className="font-display font-500 text-ink-2 text-lg mt-1">$</span>
                    <span className="metric-value font-display font-700 text-ink"
                      style={{ fontSize: '3rem', lineHeight: 1 }}>
                      {price}
                    </span>
                    <div className="flex flex-col ml-1 mt-2">
                      <span className="font-mono text-[10px] text-ink-3">/mo</span>
                      <span className="font-mono text-[9px] text-ink-3 capitalize">{mode}</span>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-ink-3 mt-1 uppercase tracking-wide">
                    {FREQUENCIES.find(f => f.id === freq)?.label}
                  </div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 font-body text-sm text-ink-2">
                      <span className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-[8px]"
                        style={{ background: plan.accent + '18', color: plan.accent }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button onClick={() => document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3.5 rounded-xl font-display font-600 text-sm transition-all duration-250"
                  style={plan.highlight ? {
                    background: 'linear-gradient(135deg, #00D4AA, #06B6D4)',
                    color: '#fff',
                    boxShadow: '0 4px 20px rgba(0,212,170,0.35)',
                  } : {
                    background: `${plan.accent}15`,
                    color: plan.accent,
                    border: `1px solid ${plan.accent}30`,
                  }}>
                  Start with {plan.name}
                </button>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <p className="text-center font-mono text-xs text-ink-3 mt-8">
          All plans include a free initial consultation · No contracts · Cancel anytime ·{' '}
          <span className="text-aurora-teal">Most insurance plans accepted</span>
        </p>
      </div>
    </section>
  )
}

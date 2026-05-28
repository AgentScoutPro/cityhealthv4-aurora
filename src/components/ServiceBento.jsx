'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const SERVICES = [
  {
    id: 'neuro',
    title: 'Neuropathy Treatment',
    sub: 'Sanexas Electro-Analgesic Technology',
    body: 'The Sanexas neoGEN-Series® delivers non-invasive, drug-free nerve stimulation therapy using Energy Delivery Device (EDD) technology. Clinically proven to regenerate nerve fibers, reduce pain signals, and restore sensation in patients with peripheral neuropathy.',
    tags: ['Peripheral Neuropathy', 'Diabetic Nerve Pain', 'Numbness & Tingling', 'Burning Sensation'],
    accent: '#00D4AA',
    bg: 'rgba(0,212,170,0.06)',
    border: 'rgba(0,212,170,0.18)',
    span: 'lg:col-span-1 lg:row-span-2',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4 C16 4 8 8 8 16 C8 24 16 28 16 28 C16 28 24 24 24 16 C24 8 16 4 16 4Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 14 L16 18 L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="11" r="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 20 L22 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'antiaging',
    title: 'Anti-Aging Medicine',
    sub: 'Weight Loss · Hormones · IV Nutrition',
    body: 'Comprehensive wellness optimization including medically supervised weight management, bioidentical hormone replacement therapy, and IV micronutrient infusions — restoring vitality at the cellular level.',
    tags: ['Medical Weight Loss', 'Hormone Therapy', 'IV Nutrition', 'Peptide Therapy'],
    accent: '#818CF8',
    bg: 'rgba(129,140,248,0.06)',
    border: 'rgba(129,140,248,0.18)',
    span: 'lg:col-span-1 lg:row-span-1',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 10 L16 16 L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.4"/>
        <path d="M12 6 C12 6 10 9 10 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M20 6 C20 6 22 9 22 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'physmed',
    title: 'Physical Medicine',
    sub: 'Arthritis · Chiropractic · Physical Therapy',
    body: 'Integrated musculoskeletal care combining precision chiropractic adjustments, evidence-based physical therapy, and arthritis management. Our multi-disciplinary approach addresses the root cause of pain — not just the symptom.',
    tags: ['Chiropractic Care', 'Physical Therapy', 'Arthritis Management', 'Spinal Decompression', 'Sports Injuries'],
    accent: '#34D399',
    bg: 'rgba(52,211,153,0.06)',
    border: 'rgba(52,211,153,0.18)',
    span: 'lg:col-span-2 lg:row-span-1',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4 L16 28 M10 9 L22 9 M9 16 L23 16 M10 23 L22 23"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: 'injury',
    title: 'Personal Injury Care',
    sub: 'Auto Accidents · Workers Comp',
    body: 'Comprehensive injury documentation and treatment for auto accident and workplace injury victims. We work directly with attorneys and insurance carriers, providing the medical evidence and care coordination you need for a complete recovery and fair settlement.',
    tags: ['Auto Accidents', 'Workers\' Comp', 'Whiplash', 'Insurance Billing', 'Legal Documentation'],
    accent: '#F472B6',
    bg: 'rgba(244,114,182,0.06)',
    border: 'rgba(244,114,182,0.18)',
    span: 'lg:col-span-1 lg:row-span-1',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 24 L8 16 L14 12 L18 12 L24 16 L26 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="11" cy="25" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="21" cy="25" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 12 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="6" r="1.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
]

export default function ServiceBento() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sb-heading', {
        y: 35, opacity: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.bento-card', {
        y: 55, opacity: 0, scale: 0.95,
        duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.bento-grid', start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="section-pad relative overflow-hidden bg-surface">

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-blob blob-teal   w-[500px] h-[400px] top-0   -right-20 opacity-20"/>
        <div className="aurora-blob blob-purple w-[400px] h-[300px] bottom-0 left-0    opacity-15"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        <div className="sb-heading text-center mb-14">
          <div className="eyebrow mx-auto mb-5">Our Services</div>
          <h2 className="font-display font-700 text-ink mb-4" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)' }}>
            Comprehensive Care,<br/>
            <span className="gradient-text">Measurable Results</span>
          </h2>
          <p className="font-body text-ink-3 max-w-xl mx-auto text-sm leading-relaxed">
            Four specialized clinical disciplines under one roof — each selected for its proven
            outcomes and integrated into a unified care philosophy.
          </p>
        </div>

        <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5
          auto-rows-auto lg:grid-rows-2">
          {SERVICES.map(svc => (
            <div key={svc.id}
              className={`bento-card glass-card rounded-2xl p-7 flex flex-col group cursor-default ${svc.span}`}>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5
                transition-transform duration-300 group-hover:scale-110"
                style={{ background: svc.bg, border: `1px solid ${svc.border}`, color: svc.accent,
                  boxShadow: `0 0 20px ${svc.bg}` }}>
                {svc.icon}
              </div>

              {/* Text */}
              <h3 className="font-display font-700 text-ink text-lg mb-1">{svc.title}</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: svc.accent }}>
                {svc.sub}
              </p>
              <p className="font-body text-ink-3 text-sm leading-relaxed flex-1 mb-5">{svc.body}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: svc.border }}>
                {svc.tags.map(t => (
                  <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                    style={{ background: svc.bg, color: svc.accent, border: `1px solid ${svc.border}` }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${svc.bg} 0%, transparent 60%)` }}/>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button onClick={() => document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-aurora px-8 py-3.5 rounded-xl font-display font-600 shadow-teal-sm">
            Request Appointment
          </button>
        </div>
      </div>
    </section>
  )
}

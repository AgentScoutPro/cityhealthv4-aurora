'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const LOCATIONS = [
  {
    name: 'Longmore Road',
    address: '1440 S Longmore Rd #8',
    city: 'Mesa, AZ 85202',
    phone: '(480) 900-5520',
    hours: [
      { day: 'Mon – Fri', time: '8:00 AM – 6:00 PM' },
      { day: 'Saturday',  time: '9:00 AM – 1:00 PM' },
      { day: 'Sunday',    time: 'Closed' },
    ],
    mapEmbed: 'https://maps.google.com/?q=1440+S+Longmore+Rd,+Mesa,+AZ+85202',
    accent: '#00D4AA',
  },
  {
    name: 'Power Road',
    address: '2919 S Ellsworth Rd, Suite 202',
    city: 'Mesa, AZ 85206',
    phone: '(480) 900-5520',
    hours: [
      { day: 'Mon – Fri', time: '9:00 AM – 6:00 PM' },
      { day: 'Saturday',  time: '9:00 AM – 2:00 PM' },
      { day: 'Sunday',    time: 'Closed' },
    ],
    mapEmbed: 'https://maps.google.com/?q=2919+S+Ellsworth+Rd,+Mesa,+AZ+85206',
    accent: '#818CF8',
  },
]

const INSURANCES = [
  'UnitedHealthcare', 'Medicare', 'Aetna', 'Blue Cross Blue Shield',
  'Cigna', 'Humana', 'Tricare', "Worker's Compensation", 'Medicaid',
  'Banner Health Plans', 'AHCCCS', 'Health Net', 'Molina Healthcare',
]

const SERVICE_AREAS = [
  'Mesa', 'Gilbert', 'Chandler', 'Tempe', 'Scottsdale',
  'Ahwatukee', 'Queen Creek', 'Peoria', 'Glendale', 'Phoenix',
]

export default function LocationsHub() {
  const sectionRef = useRef(null)
  const track1Ref  = useRef(null)
  const track2Ref  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lh-heading', {
        y: 35, opacity: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.location-card', {
        y: 50, opacity: 0, scale: 0.95, stagger: 0.15, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.locations-grid', start: 'top 78%' },
      })

      // Insurance marquee
      const w1 = track1Ref.current?.scrollWidth / 2 || 0
      const w2 = track2Ref.current?.scrollWidth / 2 || 0
      gsap.to(track1Ref.current, { x: -w1, duration: 25, ease: 'none', repeat: -1,
        modifiers: { x: (x) => `${parseFloat(x) % w1}px` } })
      gsap.to(track2Ref.current, { x: w2, duration: 30, ease: 'none', repeat: -1,
        modifiers: { x: (x) => `${parseFloat(x) % w2}px` } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const insDoubled = [...INSURANCES, ...INSURANCES]
  const areaDoubled = [...SERVICE_AREAS, ...SERVICE_AREAS]

  return (
    <section ref={sectionRef} id="locations" className="section-pad relative overflow-hidden bg-white">

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="aurora-blob blob-cyan    w-[500px] h-[400px] top-0   right-0    opacity-20"/>
        <div className="aurora-blob blob-emerald w-[400px] h-[300px] bottom-0 left-1/4 opacity-15"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <div className="lh-heading text-center mb-14">
          <div className="eyebrow mx-auto mb-5">Two Locations</div>
          <h2 className="font-display font-700 text-ink mb-4" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)' }}>
            More Locations Means You're<br/>
            <span className="gradient-text">Closer to Care</span>
          </h2>
          <p className="font-body text-ink-3 max-w-xl mx-auto text-sm leading-relaxed">
            Two convenient East Valley locations serving Mesa, Gilbert, Chandler, and surrounding communities.
            Same-week appointments available at both clinics.
          </p>
        </div>

        {/* Location cards */}
        <div className="locations-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {LOCATIONS.map(loc => (
            <div key={loc.name} className="location-card glass-card rounded-2xl overflow-hidden">

              {/* Map placeholder with gradient */}
              <div className="h-36 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${loc.accent}15 0%, ${loc.accent}08 100%)`,
                  borderBottom: `1px solid ${loc.accent}20`,
                }}>
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(${loc.accent} 1px, transparent 1px), linear-gradient(90deg, ${loc.accent} 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}/>
                {/* Location pin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse-glow"
                      style={{ background: loc.accent, boxShadow: `0 0 30px ${loc.accent}60` }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                        <path d="M10 2C7.2 2 5 4.2 5 7C5 11 10 17 10 17S15 11 15 7C15 4.2 12.8 2 10 2Z"/>
                        <circle cx="10" cy="7" r="2.5" fill="white" opacity="0.5"/>
                      </svg>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap
                      font-mono text-[10px] font-600 tracking-wider uppercase"
                      style={{ color: loc.accent }}>{loc.name}</div>
                  </div>
                </div>
                <a href={loc.mapEmbed} target="_blank" rel="noopener noreferrer"
                  className="absolute top-3 right-3 font-mono text-[9px] px-2 py-1 rounded-full
                    glass-card hover:shadow-teal-sm transition-all"
                  style={{ color: loc.accent, borderColor: `${loc.accent}30` }}>
                  Open Maps →
                </a>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="font-display font-700 text-ink text-lg mb-4">{loc.name}</h3>

                <div className="space-y-3 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center rounded"
                      style={{ background: `${loc.accent}15`, color: loc.accent }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
                        <path d="M5.5 1C4 1 2.5 2.2 2.5 3.8 2.5 6.3 5.5 9.5 5.5 9.5S8.5 6.3 8.5 3.8C8.5 2.2 7 1 5.5 1Z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-body text-sm text-ink">{loc.address}</div>
                      <div className="font-body text-sm text-ink-3">{loc.city}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded"
                      style={{ background: `${loc.accent}15`, color: loc.accent }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
                        <path d="M2 1.2A.7.7 0 011.2 1.8v.7A5.7 5.7 0 007.5 9.2h.7a.7.7 0 00.7-.7V7.3a.7.7 0 00-.7-.7l-1.5-.4a.7.7 0 00-.7.2L5.5 7C4.8 6.6 4.4 6.2 4 5.5L4.6 5a.7.7 0 00.2-.7L4.4 2.8a.7.7 0 00-.7-.7H2.7A.7.7 0 002 1.2Z"/>
                      </svg>
                    </div>
                    <a href={`tel:${loc.phone.replace(/\D/g,'')}`}
                      className="font-mono text-sm transition-colors hover:opacity-80"
                      style={{ color: loc.accent }}>{loc.phone}</a>
                  </div>
                </div>

                <div className="space-y-1.5 pt-4 border-t" style={{ borderColor: `${loc.accent}20` }}>
                  {loc.hours.map(h => (
                    <div key={h.day} className="flex justify-between">
                      <span className="font-mono text-xs text-ink-3">{h.day}</span>
                      <span className="font-mono text-xs font-600"
                        style={{ color: h.time === 'Closed' ? '#94A3B8' : loc.accent }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance marquee */}
        <div className="mb-6">
          <p className="font-mono text-xs text-ink-3 uppercase tracking-widest text-center mb-4">
            Accepted Insurance Plans
          </p>
          <div className="overflow-hidden">
            <div ref={track1Ref} className="flex gap-5 whitespace-nowrap will-change-transform"
              style={{ width: 'max-content' }}>
              {insDoubled.map((ins, i) => (
                <div key={`ins-${i}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-aurora-teal"/>
                  <span className="font-display font-500 text-ink-2 text-sm">{ins}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service areas marquee */}
        <div>
          <p className="font-mono text-xs text-ink-3 uppercase tracking-widest text-center mb-4">
            Serving the East Valley
          </p>
          <div className="overflow-hidden">
            <div ref={track2Ref} className="flex gap-4 whitespace-nowrap will-change-transform"
              style={{ width: 'max-content', transform: 'translateX(-30%)' }}>
              {areaDoubled.map((area, i) => (
                <div key={`area-${i}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0"
                  style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.15)' }}>
                  <span className="font-display font-500 text-ink-2 text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

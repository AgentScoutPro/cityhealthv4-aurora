'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const LOCATIONS_QUICK = [
  { name: 'Longmore Road', address: '1440 S Longmore Rd #8, Mesa AZ 85202', phone: '(480) 900-5520', hours: 'Mon–Fri 8am–6pm · Sat 9am–1pm' },
  { name: 'Power Road',    address: '2919 S Ellsworth Rd #202, Mesa AZ 85206', phone: '(480) 900-5520', hours: 'Mon–Fri 9am–6pm · Sat 9am–2pm' },
]

function FloatingGem() {
  const gemRef = useRef(null)

  useEffect(() => {
    let t = 0
    const id = setInterval(() => {
      t += 0.025
      if (gemRef.current) {
        gemRef.current.style.transform =
          `translateY(${Math.sin(t) * 14}px) rotateZ(${Math.sin(t * 0.5) * 6}deg)`
      }
    }, 30)
    return () => clearInterval(id)
  }, [])

  return (
    <div ref={gemRef} className="relative w-28 h-28 mx-auto mb-10" style={{ transition: 'none' }}>
      <div className="absolute inset-0 rounded-full animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.35) 0%, transparent 70%)' }}/>
      <div className="absolute inset-4"
        style={{
          background: 'linear-gradient(135deg, rgba(0,212,170,0.9), rgba(6,182,212,0.7), rgba(129,140,248,0.8))',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          boxShadow: '0 0 60px rgba(0,212,170,0.5), inset 0 0 20px rgba(255,255,255,0.3)',
        }}>
        <div className="absolute top-2 left-3 w-5 h-5 rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)' }}/>
      </div>
      <div className="absolute inset-0 rounded-full animate-spin-slow"
        style={{ border: '1px solid rgba(0,212,170,0.2)' }}/>
    </div>
  )
}

export default function FooterCTA() {
  const [form, setForm] = useState({ name: '', phone: '', concern: '' })
  const [sent, setSent] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-cta-module', {
        y: 50, opacity: 0, scale: 0.96, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.footer-location', {
        y: 30, opacity: 0, stagger: 0.12, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-locations', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <footer ref={sectionRef} id="footer" className="relative overflow-hidden">
      <div className="relative bg-footer-dark py-24 px-6 md:px-10 overflow-hidden">

        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute w-[600px] h-[600px] rounded-full -top-40 left-1/2 -translate-x-1/2"
            style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 60%)', filter: 'blur(60px)' }}/>
          <div className="absolute w-[400px] h-[400px] rounded-full bottom-0 left-0"
            style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 60%)', filter: 'blur(60px)' }}/>
          <div className="aurora-blob blob-teal w-[300px] h-[300px] top-10 right-10 opacity-10"/>
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,212,170,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}/>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Central module */}
          <div className="footer-cta-module max-w-3xl mx-auto text-center mb-20">
            <FloatingGem/>

            <div className="eyebrow mx-auto mb-5" style={{ borderColor: 'rgba(0,212,170,0.3)' }}>
              Take Action Today
            </div>

            <h2 className="font-display font-700 mb-5"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#F8FAFC', lineHeight: 1.1 }}>
              Don't Wait Any Longer,<br/>
              <span style={{
                background: 'linear-gradient(135deg, #00D4AA, #06B6D4, #818CF8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Take Action Today.</span>
            </h2>

            <p className="font-body text-slate-400 max-w-lg mx-auto leading-relaxed mb-10"
              style={{ fontSize: '1.05rem' }}>
              Your recovery is one decision away. City Health Services — East Valley's premier pain
              management clinic — has same-week appointments available at both Mesa locations.
              Most insurance plans accepted.
            </p>

            {!sent ? (
              <form onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-6 md:p-8 text-left max-w-xl mx-auto"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { key: 'name',  label: 'Full Name',    type: 'text',  ph: 'Jane Smith' },
                    { key: 'phone', label: 'Phone Number', type: 'tel',   ph: '(480) 000-0000' },
                  ].map(({ key, label, type, ph }) => (
                    <div key={key}>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                        {label}
                      </label>
                      <input type={type} required placeholder={ph}
                        value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm font-body text-white
                          bg-white/5 border border-white/10 placeholder-slate-500
                          focus:outline-none focus:border-aurora-teal/50 transition-colors"/>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                    Primary Concern
                  </label>
                  <select value={form.concern}
                    onChange={e => setForm(p => ({ ...p, concern: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm font-body text-white
                      bg-white/5 border border-white/10 focus:outline-none focus:border-aurora-teal/50 transition-colors">
                    <option value="" style={{ background: '#0A0F1E' }}>Select a concern...</option>
                    <option value="back"      style={{ background: '#0A0F1E' }}>Back Pain / Herniated Disc</option>
                    <option value="neuro"     style={{ background: '#0A0F1E' }}>Neuropathy / Nerve Pain</option>
                    <option value="neck"      style={{ background: '#0A0F1E' }}>Neck Pain / Headaches</option>
                    <option value="sciatica"  style={{ background: '#0A0F1E' }}>Sciatica</option>
                    <option value="arthritis" style={{ background: '#0A0F1E' }}>Arthritis</option>
                    <option value="sports"    style={{ background: '#0A0F1E' }}>Sports Injury</option>
                    <option value="auto"      style={{ background: '#0A0F1E' }}>Auto Accident</option>
                    <option value="weight"    style={{ background: '#0A0F1E' }}>Weight Management / Anti-Aging</option>
                    <option value="general"   style={{ background: '#0A0F1E' }}>General Wellness</option>
                  </select>
                </div>

                <button type="submit"
                  className="btn-aurora w-full py-4 rounded-xl font-display font-700 shadow-teal-lg text-base tracking-wide">
                  INITIALIZE RECOVERY PROTOCOL
                </button>
                <p className="text-center font-mono text-[10px] text-slate-500 mt-4">
                  We'll call within 2 hours · No spam, ever
                </p>
              </form>
            ) : (
              <div className="glass-card rounded-2xl p-10 max-w-xl mx-auto text-center"
                style={{ background: 'rgba(0,212,170,0.08)', borderColor: 'rgba(0,212,170,0.2)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(0,212,170,0.15)', border: '1px solid rgba(0,212,170,0.3)' }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M5 12L10 17L19 7" stroke="#00D4AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display font-700 text-white text-xl mb-2">Protocol Initialized!</h3>
                <p className="font-body text-slate-400 text-sm">We'll call you within 2 hours to confirm your appointment.</p>
              </div>
            )}
          </div>

          {/* Locations */}
          <div className="footer-locations grid grid-cols-1 md:grid-cols-2 gap-5 mb-16 max-w-3xl mx-auto">
            {LOCATIONS_QUICK.map(loc => (
              <div key={loc.name} className="footer-location glass-card rounded-xl p-5"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="font-display font-600 text-white text-sm mb-3">{loc.name}</div>
                <div className="flex items-start gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
                    <path d="M7 1.5C5 1.5 3 3.1 3 5.2 3 8.3 7 12.5 7 12.5S11 8.3 11 5.2C11 3.1 9 1.5 7 1.5Z" stroke="#00D4AA" strokeWidth="1.2"/>
                    <circle cx="7" cy="5.2" r="1.2" stroke="#00D4AA" strokeWidth="1.2"/>
                  </svg>
                  <span className="font-body text-xs text-slate-400">{loc.address}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="#00D4AA">
                    <path d="M2.5 1.5A1 1 0 011.5 2.5v1A8 8 0 0010.5 12.5h1a1 1 0 001-1v-1.5a1 1 0 00-1-1l-2-.5a1 1 0 00-1 .3l-.7.7A6 6 0 014 5.7l.7-.7a1 1 0 00.3-1L4.5 2a1 1 0 00-1-1H2.5z"/>
                  </svg>
                  <a href={`tel:${loc.phone.replace(/\D/g,'')}`}
                    className="font-mono text-xs text-aurora-teal hover:text-aurora-cyan transition-colors">
                    {loc.phone}
                  </a>
                </div>
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-wide">{loc.hours}</div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-12">
            {[
              { value: '3,200+', label: 'Patients Treated' },
              { value: '98%',    label: 'Satisfaction'     },
              { value: '15+',    label: 'Years'            },
              { value: '2',      label: 'Locations'        },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="metric-value font-display font-700 text-2xl gradient-text">{s.value}</div>
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md btn-aurora flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L9 16M5 5.5L9 2L13 5.5M5 12.5L9 16L13 12.5M6 8.5L12 8.5M6 9.5L12 9.5"
                    stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-500 text-slate-400 text-sm">City Health Services</span>
            </div>
            <p className="font-mono text-[10px] text-slate-600">
              © 2025 City Health Services · Mesa, AZ · All rights reserved
            </p>
            <div className="flex gap-4">
              {['Privacy', 'Terms', 'HIPAA'].map(link => (
                <a key={link} href="#"
                  className="font-mono text-[10px] text-slate-500 hover:text-aurora-teal transition-colors uppercase tracking-wide">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

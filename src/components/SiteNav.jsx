'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

const NAV_LINKS = [
  { label: 'Services',   href: '#services' },
  { label: 'Conditions', href: '#problem' },
  { label: 'Locations',  href: '#locations' },
  { label: 'About',      href: '#footer' },
]

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    gsap.from(navRef.current, { y: -20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-glass' : 'nav-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg btn-aurora flex items-center justify-center flex-shrink-0 shadow-teal-sm">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L9 16M5 5.5L9 2L13 5.5M5 12.5L9 16L13 12.5M6 8.5L12 8.5M6 9.5L12 9.5"
                stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="leading-none">
            <div className="font-display font-700 text-sm text-ink tracking-tight">City Health</div>
            <div className="font-mono text-[10px] text-ink-3 tracking-widest uppercase">Services</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <button key={label} onClick={() => scrollTo(href)}
              className="px-4 py-2 text-sm font-body font-500 text-ink-2 rounded-lg
                hover:text-aurora-teal hover:bg-aurora-teal/5 transition-colors duration-200">
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:4809005520"
            className="hidden md:flex items-center gap-2 font-mono text-xs text-ink-3 hover:text-aurora-teal transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M2.5 1.5A1 1 0 011.5 2.5v1A8 8 0 0010.5 12.5h1a1 1 0 001-1v-1.5a1 1 0 00-1-1l-2-.5a1 1 0 00-1 .3l-.7.7A6 6 0 014 5.7l.7-.7a1 1 0 00.3-1L4.5 2a1 1 0 00-1-1H2.5z"/>
            </svg>
            (480) 900-5520
          </a>
          <button onClick={() => scrollTo('#footer')}
            className="btn-aurora px-5 py-2.5 rounded-xl text-sm font-display font-600 shadow-teal-sm">
            Request Appointment
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-black/5 transition-colors">
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="nav-glass border-t border-white/30 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <button key={label} onClick={() => scrollTo(href)}
              className="py-2.5 text-left text-sm font-body text-ink-2 hover:text-aurora-teal transition-colors border-b border-black/5 last:border-0">
              {label}
            </button>
          ))}
          <a href="tel:4809005520" className="mt-2 font-mono text-xs text-ink-3">(480) 900-5520</a>
        </div>
      </div>
    </header>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const STATS = [
  { value: 3200, suffix: '+', label: 'Patients Treated'    },
  { value: 98,   suffix: '%', label: 'Patient Satisfaction' },
  { value: 15,   suffix: '+', label: 'Years of Excellence'  },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        let val = 0
        const step = target / 80
        const id = setInterval(() => {
          val += step
          if (val >= target) { setCount(target); clearInterval(id) }
          else setCount(Math.floor(val))
        }, 20)
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function HeroAurora() {
  const heroRef     = useRef(null)
  const videoRef    = useRef(null)
  const textRef     = useRef(null)
  const recoveryRef = useRef(null)
  const alignRef    = useRef(null)

  /* ── Entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.3 })
        .from('.h-eyebrow',  { y: 16, opacity: 0, duration: 0.55, ease: 'power3.out' })
        .from('.h-headline', { y: 50, opacity: 0, duration: 0.85, ease: 'power3.out' }, '-=0.25')
        .from('.h-sub',      { y: 30, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.45')
        .from('.h-ctas',     { y: 20, opacity: 0, duration: 0.50, ease: 'power3.out' }, '-=0.35')
        .from('.h-stats',    { y: 18, opacity: 0, duration: 0.50, ease: 'power3.out' }, '-=0.30')
        .from('.h-badge',    {
          scale: 0.82,
          opacity: 0,
          duration: 0.65,
          ease: 'back.out(1.5)',
          stagger: 0.18,
        }, '-=0.55')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  /* ── Scroll-driven parallax — wired into the Lenis/GSAP ticker ── */
  useEffect(() => {
    const hero     = heroRef.current
    const video    = videoRef.current
    const textEl   = textRef.current
    const recovery = recoveryRef.current
    const align    = alignRef.current
    if (!hero || !video || !textEl || !recovery || !align) return

    const ctx = gsap.context(() => {

      // Video zooms subtly as the section scrolls out
      gsap.to(video, {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      })

      // Recovery badge drifts upper-left on an orbital arc
      gsap.to(recovery, {
        x: -32,
        y: -26,
        rotation: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 2.2,
        },
      })

      // Alignment badge drifts lower-right
      gsap.to(align, {
        x: 30,
        y: 34,
        rotation: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 2.2,
        },
      })

      // Left text lifts and fades as hero exits viewport
      gsap.to(textEl, {
        y: -72,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '55% top',
          scrub: 1.2,
        },
      })

    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >

      {/* ─────────────────────────────────────────
          Full-bleed background video
      ───────────────────────────────────────── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        src="/videos/A01B-CITYHEALTH-HERO.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────
          Aurora gradient overlay
          – Dark veil left → keeps copy readable
          – Teal / pink / lavender blooms for depth
      ───────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060C1A]/[0.92] via-[#0A0F1E]/[0.62] to-transparent" />
        <div className="absolute -top-28 -left-28 w-[620px] h-[620px] rounded-full bg-aurora-teal/[0.28] blur-[110px]" />
        <div className="absolute bottom-0 left-[18%] w-[480px] h-[360px] rounded-full bg-aurora-pink/[0.18] blur-[120px]" />
        <div className="absolute top-[12%] right-0 w-[440px] h-[540px] rounded-full bg-aurora-purple/[0.20] blur-[100px]" />
        <div className="grid-overlay" />
      </div>

      {/* ─────────────────────────────────────────
          Two-column content grid
      ───────────────────────────────────────── */}
      <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left column: typography & CTAs ── */}
        <div
          ref={textRef}
          className="flex flex-col justify-center px-8 md:px-14 lg:px-16 pt-24 pb-12 lg:pb-20"
        >

          <div className="h-eyebrow eyebrow mb-6 self-start">
            Mesa, AZ · Pain Management Specialists
          </div>

          <h1
            className="h-headline font-display font-bold text-white leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)' }}
          >
            Best Pain Management<br />
            <span className="gradient-text">Clinic Near Me</span><br />
            in Mesa
          </h1>

          <p
            className="h-sub font-body text-white/70 leading-relaxed mb-8 max-w-lg"
            style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.08rem)' }}
          >
            Discover expert pain relief with City Health Services. Embark on a
            journey toward comprehensive pain relief — where advanced diagnostics,
            precision adjustments, and evidence-based care converge to restore
            your quality of life.
          </p>

          <div className="h-ctas flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => document.querySelector('#footer')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-aurora px-7 py-3.5 rounded-xl text-base font-display font-semibold shadow-teal-md"
            >
              Request Appointment
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 rounded-xl text-base font-display font-medium cursor-pointer
                bg-white/[0.08] border border-white/[0.22] text-white/90 backdrop-blur-sm
                transition-all duration-200
                hover:bg-white/[0.15] hover:border-aurora-teal/50 hover:text-white hover:-translate-y-0.5"
            >
              View Services →
            </button>
          </div>

          <div className="h-stats flex flex-wrap gap-6">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="flex flex-col">
                <span
                  className="metric-value font-display font-bold text-white"
                  style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)' }}
                >
                  <Counter target={value} suffix={suffix} />
                </span>
                <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase mt-0.5">
                  {label}
                </span>
                <div className="mt-1.5 h-px w-full bg-gradient-to-r from-aurora-teal/50 to-transparent" />
              </div>
            ))}
          </div>

        </div>

        {/* ── Right column: video focal area + floating badges ── */}
        <div className="relative hidden lg:block">

          {/* Recovery +47% */}
          <div
            ref={recoveryRef}
            className="h-badge absolute top-[27%] left-[10%] z-20
              backdrop-blur-[16px]
              bg-white/[0.08] border border-white/[0.18]
              shadow-[0_8px_40px_rgba(0,212,170,0.20),0_2px_12px_rgba(0,0,0,0.40)]
              rounded-2xl px-5 py-4 min-w-[152px]"
          >
            <p className="font-mono text-[9px] text-white/55 uppercase tracking-[0.15em] mb-1.5">
              Recovery
            </p>
            <p
              className="font-display font-bold text-white leading-none tracking-tight mb-2.5"
              style={{ fontSize: '1.45rem' }}
            >
              +47%
            </p>
            <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[47%] rounded-full bg-gradient-to-r from-aurora-teal to-aurora-cyan" />
            </div>
          </div>

          {/* Alignment 98.2% */}
          <div
            ref={alignRef}
            className="h-badge absolute bottom-[30%] right-[8%] z-20
              backdrop-blur-[16px]
              bg-white/[0.08] border border-white/[0.18]
              shadow-[0_8px_40px_rgba(129,140,248,0.20),0_2px_12px_rgba(0,0,0,0.40)]
              rounded-2xl px-5 py-4 min-w-[158px]"
          >
            <p className="font-mono text-[9px] text-white/55 uppercase tracking-[0.15em] mb-1.5">
              Alignment
            </p>
            <p
              className="font-display font-bold text-white leading-none tracking-tight mb-2.5"
              style={{ fontSize: '1.45rem' }}
            >
              98.2%
            </p>
            <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-aurora-purple to-aurora-cyan" />
            </div>
          </div>

        </div>

      </div>

      {/* ── Scroll cue ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[9px] text-white/60 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-aurora-teal/70 to-transparent animate-float" />
      </div>

    </section>
  )
}

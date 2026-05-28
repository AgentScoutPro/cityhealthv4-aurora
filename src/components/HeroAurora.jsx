'use client'
import { useEffect, useRef, useState } from 'react'

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

  /* ── Scroll animation — rAF loop reads position every frame ─────────── */
  useEffect(() => {
    const video    = videoRef.current
    const section  = heroRef.current
    const text     = textRef.current
    const recovery = recoveryRef.current
    const align    = alignRef.current
    if (!section) return

    let rafId

    const update = () => {
      const { top, height } = section.getBoundingClientRect()
      const scrolled   = -top
      const scrollable = height - window.innerHeight

      if (scrollable > 0) {
        const progress = Math.min(Math.max(scrolled / scrollable, 0), 1)

        // Video scrub
        if (video && video.readyState >= 1) {
          video.currentTime = progress * video.duration
        }

        // Text fades out over first 60 % of scroll travel
        if (text) {
          const t = Math.min(progress / 0.6, 1)
          text.style.opacity   = 1 - t
          text.style.transform = `translateY(${-72 * t}px)`
        }

        // Badges drift
        if (recovery) {
          recovery.style.transform =
            `translate(${-32 * progress}px, ${-26 * progress}px) rotate(${-8 * progress}deg)`
        }
        if (align) {
          align.style.transform =
            `translate(${30 * progress}px, ${34 * progress}px) rotate(${7 * progress}deg)`
        }
      }

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section ref={heroRef} id="hero" className="relative w-full" style={{ height: '200vh' }}>

      {/* Sticky frame — locked at viewport top for the first 100 vh of scroll */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover
            scale-110 md:scale-[1.15] origin-center will-change-transform"
          src="/videos/video-hero-short-v2.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* Aurora gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-r from-[#060C1A]/[0.92] via-[#0A0F1E]/[0.62] to-transparent" />
          <div className="absolute -top-28 -left-28 w-[620px] h-[620px] rounded-full bg-aurora-teal/[0.28] blur-[110px]" />
          <div className="absolute bottom-0 left-[18%] w-[480px] h-[360px] rounded-full bg-aurora-pink/[0.18] blur-[120px]" />
          <div className="absolute top-[12%] right-0 w-[440px] h-[540px] rounded-full bg-aurora-purple/[0.20] blur-[100px]" />
          <div className="grid-overlay" />
        </div>

        {/* Two-column content grid */}
        <div className="relative z-10 w-full h-full grid grid-cols-1 lg:grid-cols-2">

          {/* Left — typography, CTAs, stats */}
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

          {/* Right — clear focal window + floating glassmorphic badges */}
          <div className="relative hidden lg:block">

            <div
              ref={recoveryRef}
              className="h-badge absolute top-[27%] left-[10%] z-20
                backdrop-blur-[16px] bg-white/[0.08] border border-white/[0.18]
                shadow-[0_8px_40px_rgba(0,212,170,0.20),0_2px_12px_rgba(0,0,0,0.40)]
                rounded-2xl px-5 py-4 min-w-[152px]"
            >
              <p className="font-mono text-[9px] text-white/55 uppercase tracking-[0.15em] mb-1.5">
                Recovery
              </p>
              <p className="font-display font-bold text-white leading-none tracking-tight mb-2.5"
                style={{ fontSize: '1.45rem' }}>
                +47%
              </p>
              <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[47%] rounded-full bg-gradient-to-r from-aurora-teal to-aurora-cyan" />
              </div>
            </div>

            <div
              ref={alignRef}
              className="h-badge absolute bottom-[30%] right-[8%] z-20
                backdrop-blur-[16px] bg-white/[0.08] border border-white/[0.18]
                shadow-[0_8px_40px_rgba(129,140,248,0.20),0_2px_12px_rgba(0,0,0,0.40)]
                rounded-2xl px-5 py-4 min-w-[158px]"
            >
              <p className="font-mono text-[9px] text-white/55 uppercase tracking-[0.15em] mb-1.5">
                Alignment
              </p>
              <p className="font-display font-bold text-white leading-none tracking-tight mb-2.5"
                style={{ fontSize: '1.45rem' }}>
                98.2%
              </p>
              <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-aurora-purple to-aurora-cyan" />
              </div>
            </div>

          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[9px] text-white/60 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-aurora-teal/70 to-transparent animate-float" />
        </div>

      </div>
    </section>
  )
}

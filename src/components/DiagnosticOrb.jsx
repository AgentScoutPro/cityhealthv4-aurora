'use client'
import { useEffect, useRef } from 'react'

export default function DiagnosticOrb() {
  const sceneRef = useRef(null)
  const target   = useRef({ x: 0, y: 0 })
  const current  = useRef({ x: 0, y: 0 })
  const rafId    = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window
      target.current.x = (e.clientX / W - 0.5) * 18
      target.current.y = (e.clientY / H - 0.5) * -14
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.06
      current.current.y += (target.current.y - current.current.y) * 0.06
      if (sceneRef.current) {
        sceneRef.current.style.transform =
          `perspective(1000px) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg)`
      }
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] flex items-center justify-center">

      {/* Ambient glow behind orb */}
      <div className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.18) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)' }}/>

      {/* 3D scene container */}
      <div ref={sceneRef} className="relative w-64 h-64 md:w-80 md:h-80" style={{ transformStyle: 'preserve-3d', transition: 'none' }}>

        {/* Outer ring — spins slowly */}
        <div className="absolute inset-0 rounded-full animate-ring-spin"
          style={{
            border: '1px solid rgba(0,212,170,0.25)',
            boxShadow: '0 0 20px rgba(0,212,170,0.15)',
            transform: 'rotateX(72deg)',
          }}/>

        {/* Mid ring — reverse spin */}
        <div className="absolute inset-6 rounded-full animate-ring-spin-r"
          style={{
            border: '1px solid rgba(6,182,212,0.3)',
            transform: 'rotateX(65deg) rotateZ(45deg)',
          }}/>

        {/* Inner ring */}
        <div className="absolute inset-12 rounded-full"
          style={{
            border: '1.5px solid rgba(129,140,248,0.35)',
            transform: 'rotateX(60deg) rotateZ(90deg)',
            animation: 'ringRotate 15s linear infinite reverse',
          }}/>

        {/* Core orb */}
        <div className="absolute inset-0 m-auto w-28 h-28 md:w-36 md:h-36 rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, rgba(0,212,170,0.4) 30%, rgba(6,182,212,0.2) 60%, rgba(129,140,248,0.1) 100%)',
            boxShadow: '0 0 40px rgba(0,212,170,0.35), 0 0 80px rgba(0,212,170,0.15), inset 0 0 30px rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.6)',
          }}
        >
          {/* Inner highlight */}
          <div className="absolute top-2 left-3 w-8 h-8 rounded-full opacity-60"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)' }}/>
        </div>

        {/* Vertebrae discs — stacked 3D spine segments */}
        {[
          { top: '14%', w: '52%', delay: '0s' },
          { top: '26%', w: '58%', delay: '0.15s' },
          { top: '38%', w: '62%', delay: '0.3s' },
          { top: '50%', w: '60%', delay: '0.45s' },
          { top: '62%', w: '54%', delay: '0.6s' },
        ].map(({ top, w, delay }, i) => (
          <div key={i}
            className="absolute left-1/2 -translate-x-1/2 h-3 rounded-full"
            style={{
              top, width: w,
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,170,0.25) 20%, rgba(6,182,212,0.3) 50%, rgba(0,212,170,0.25) 80%, transparent 100%)',
              border: '1px solid rgba(0,212,170,0.18)',
              boxShadow: '0 0 10px rgba(0,212,170,0.15)',
              transform: 'rotateX(70deg)',
              animationDelay: delay,
            }}
          />
        ))}

        {/* Data point dots */}
        {[
          { top: '8%',  right: '12%', color: '#00D4AA', size: 6 },
          { top: '72%', left:  '8%',  color: '#818CF8', size: 5 },
          { top: '50%', right: '5%',  color: '#06B6D4', size: 7 },
          { bottom: '10%', right: '20%', color: '#F472B6', size: 4 },
        ].map((pt, i) => (
          <div key={i} className="absolute rounded-full animate-data-pulse"
            style={{
              width: pt.size, height: pt.size,
              background: pt.color,
              boxShadow: `0 0 10px ${pt.color}`,
              top: pt.top, right: pt.right, left: pt.left, bottom: pt.bottom,
              animationDelay: `${i * 0.5}s`,
            }}/>
        ))}

        {/* Metric labels */}
        <div className="absolute -right-20 top-1/4 glass-card rounded-xl px-3 py-2 text-right">
          <div className="font-mono text-[10px] text-ink-3 mb-0.5">Alignment</div>
          <div className="font-mono text-sm font-600 gradient-text-teal">98.2%</div>
        </div>
        <div className="absolute -left-20 bottom-1/3 glass-card rounded-xl px-3 py-2">
          <div className="font-mono text-[10px] text-ink-3 mb-0.5">Recovery</div>
          <div className="font-mono text-sm font-600" style={{ color: '#818CF8' }}>+47%</div>
        </div>
      </div>
    </div>
  )
}

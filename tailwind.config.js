/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'aurora-teal':    '#00D4AA',
        'aurora-cyan':    '#06B6D4',
        'aurora-purple':  '#818CF8',
        'aurora-pink':    '#F472B6',
        'aurora-emerald': '#34D399',
        'surface':        '#F8FAFC',
        'surface-2':      '#F1F5F9',
        'ink':            '#0F172A',
        'ink-2':          '#334155',
        'ink-3':          '#64748B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #00D4AA 0%, #06B6D4 50%, #818CF8 100%)',
        'aurora-radial':   'radial-gradient(ellipse at center, rgba(0,212,170,0.15) 0%, transparent 70%)',
        'glass-sheen':     'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
        'hero-mesh':       'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,212,170,0.12) 0%, transparent 60%)',
        'footer-dark':     'linear-gradient(160deg, #060C1A 0%, #0A0F1E 50%, #0D1420 100%)',
        'cta-glow':        'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,212,170,0.25) 0%, transparent 70%)',
      },
      boxShadow: {
        'glass':       '0 8px 32px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
        'glass-hover': '0 20px 60px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
        'teal-sm':     '0 0 20px rgba(0,212,170,0.25)',
        'teal-md':     '0 0 40px rgba(0,212,170,0.35)',
        'teal-lg':     '0 0 80px rgba(0,212,170,0.45)',
        'card':        '0 4px 24px rgba(15,23,42,0.06)',
        'card-hover':  '0 16px 48px rgba(15,23,42,0.14)',
        'orb-ring':    '0 0 30px rgba(0,212,170,0.3), inset 0 0 20px rgba(0,212,170,0.1)',
      },
      animation: {
        'aurora-1':    'aurora1 16s ease-in-out infinite',
        'aurora-2':    'aurora2 22s ease-in-out infinite',
        'aurora-3':    'aurora3 26s ease-in-out infinite',
        'aurora-4':    'aurora4 14s ease-in-out infinite',
        'float':       'float 7s ease-in-out infinite',
        'float-slow':  'float 10s ease-in-out infinite',
        'spin-slow':   'spin 30s linear infinite',
        'pulse-glow':  'pulseGlow 3s ease-in-out infinite',
        'data-pulse':  'dataPulse 2s ease-in-out infinite',
        'ring-spin':   'ringRotate 20s linear infinite',
        'ring-spin-r': 'ringRotateR 28s linear infinite',
        'shimmer':     'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        aurora1: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '25%':     { transform: 'translate(60px,50px) scale(1.08)' },
          '50%':     { transform: 'translate(20px,100px) scale(0.94)' },
          '75%':     { transform: 'translate(-40px,40px) scale(1.04)' },
        },
        aurora2: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(-70px,60px) scale(1.1)' },
          '66%':     { transform: 'translate(40px,-50px) scale(0.92)' },
        },
        aurora3: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%':     { transform: 'translate(50px,-80px) scale(1.12)' },
        },
        aurora4: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '40%':     { transform: 'translate(-60px,40px) scale(1.06)' },
          '80%':     { transform: 'translate(30px,-30px) scale(0.96)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-22px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 30px rgba(0,212,170,0.3)' },
          '50%':     { boxShadow: '0 0 60px rgba(0,212,170,0.55)' },
        },
        dataPulse: {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%':     { opacity: '1',   transform: 'scale(1.4)' },
        },
        ringRotate:  { to: { transform: 'rotateZ(360deg) rotateX(70deg)' } },
        ringRotateR: { to: { transform: 'rotateZ(-360deg) rotateX(70deg)' } },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}

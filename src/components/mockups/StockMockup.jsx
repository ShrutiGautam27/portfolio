import { useEffect, useMemo, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

// deterministic pseudo-random so the chart is identical on every render
function seeded(seed) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

function makeCandles(n = 46) {
  const rnd = seeded(27)
  let price = 52
  const out = []
  for (let i = 0; i < n; i++) {
    const drift = Math.sin(i / 7) * 0.9 + 0.25
    const open = price
    const close = Math.max(12, open + (rnd() - 0.45) * 6 + drift)
    const high = Math.max(open, close) + rnd() * 3
    const low = Math.min(open, close) - rnd() * 3
    out.push({ open, close, high, low })
    price = close
  }
  return out
}

/** Illustrative dashboard concept for StockSphereS — not a product screenshot. */
export default function StockMockup() {
  const ref = useRef(null)
  const candles = useMemo(() => makeCandles(), [])

  const W = 640
  const H = 300
  const min = Math.min(...candles.map((c) => c.low)) - 4
  const max = Math.max(...candles.map((c) => c.high)) + 4
  const y = (v) => H - ((v - min) / (max - min)) * H
  const step = W / candles.length
  const ma = candles
    .map((_, i) => {
      const slice = candles.slice(Math.max(0, i - 6), i + 1)
      const avg = slice.reduce((a, c) => a + c.close, 0) / slice.length
      return `${i ? 'L' : 'M'}${(i * step + step / 2).toFixed(1)},${y(avg).toFixed(1)}`
    })
    .join(' ')

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
      tl.from('.sm-candle', { scaleY: 0, transformOrigin: '50% 50%', duration: 0.6, stagger: 0.018, ease: 'power3.out' })
        .from('.sm-ma', { strokeDashoffset: 1400, duration: 1.6, ease: 'power2.inOut' }, 0.3)
        .from('.sm-panel > *', { opacity: 0, x: 16, stagger: 0.08, duration: 0.6 }, 0.4)
        .from('.sm-bar i', { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'expo.out', stagger: 0.1 }, 0.8)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="mock mock--stock" ref={ref} aria-hidden="true">
      <div className="sm-top">
        <span className="sm-logo">
          <b>◆</b> StockSphereS
        </span>
        <span className="sm-tabs">
          <span>Learn</span>
          <span className="is-on">Simulate</span>
          <span>Review</span>
        </span>
        <span className="sm-chip">Virtual mode</span>
      </div>

      <div className="sm-main">
        <div className="sm-chart">
          <div className="sm-chart-head">
            <span className="sm-sym">DEMO · 1D</span>
            <span className="sm-legend">
              <i /> 7-period average
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="sm-svg">
            {[0.2, 0.4, 0.6, 0.8].map((g) => (
              <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} className="sm-grid" />
            ))}
            {candles.map((c, i) => {
              const up = c.close >= c.open
              const x = i * step + step / 2
              return (
                <g key={i} className={`sm-candle ${up ? 'up' : 'down'}`}>
                  <line x1={x} x2={x} y1={y(c.high)} y2={y(c.low)} />
                  <rect
                    x={x - step * 0.3}
                    width={step * 0.6}
                    y={y(Math.max(c.open, c.close))}
                    height={Math.max(2, Math.abs(y(c.open) - y(c.close)))}
                  />
                </g>
              )
            })}
            <path d={ma} className="sm-ma" strokeDasharray="1400" />
          </svg>
        </div>

        <div className="sm-panel">
          <p className="sm-ptitle">Practice trade</p>
          <div className="sm-ticket">
            <span className="sm-buy">Buy</span>
            <span className="sm-sell">Sell</span>
          </div>
          <div className="sm-bar">
            <span>Risk per trade</span>
            <i style={{ '--w': '28%' }} />
          </div>
          <div className="sm-bar">
            <span>Stop-loss set</span>
            <i style={{ '--w': '100%' }} />
          </div>
          <div className="sm-lesson">
            <span className="sm-lesson-k">Lesson</span>
            <span>Position sizing &amp; discipline</span>
          </div>
        </div>
      </div>
    </div>
  )
}

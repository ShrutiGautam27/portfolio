import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

/**
 * Illustrative concept for MIME.ai: three input channels converge into
 * ASL gloss. Example: English "Where is the library?" is commonly glossed
 * as "LIBRARY WHERE" with a wh-question facial marker over the sentence.
 */
const BARS = [6, 14, 22, 12, 30, 18, 40, 26, 34, 16, 24, 38, 20, 10, 28, 36, 14, 22, 8, 18, 30, 12]

export default function MimeMockup() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } })
      tl.from('.mm-in', { opacity: 0, x: -20, stagger: 0.12, duration: 0.7, ease: 'power3.out' })
        .from('.mm-wire path', { strokeDashoffset: 300, duration: 1, stagger: 0.1, ease: 'power2.inOut' }, 0.3)
        .from('.mm-core', { scale: 0.6, opacity: 0, duration: 0.7, ease: 'back.out(1.6)' }, 0.8)
        .from('.mm-wq', { scaleX: 0, transformOrigin: 'left', duration: 0.8, ease: 'expo.out' }, 1.1)
        .from('.mm-token', { yPercent: 100, opacity: 0, stagger: 0.18, duration: 0.8, ease: 'expo.out' }, 1.15)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="mock mock--mime" ref={ref} aria-hidden="true">
      <div className="mm-head">
        <span className="mm-brand">MIME.ai</span>
        <span className="mm-head-r">Input → ASL gloss</span>
      </div>

      <div className="mm-stage">
        <div className="mm-inputs">
          <div className="mm-in">
            <span className="mm-k">Text</span>
            <span className="mm-text">
              Where is the library?<i className="mm-caret" />
            </span>
          </div>
          <div className="mm-in">
            <span className="mm-k">Audio</span>
            <span className="mm-wave">
              {BARS.map((h, i) => (
                <i key={i} style={{ '--h': `${h}px`, '--d': `${(i % 7) * 0.12}s` }} />
              ))}
            </span>
          </div>
          <div className="mm-in">
            <span className="mm-k">Video</span>
            <span className="mm-video">
              <svg viewBox="0 0 80 48">
                <circle cx="40" cy="18" r="9" />
                <path d="M20 48c2-12 10-18 20-18s18 6 20 18" />
              </svg>
              <span className="mm-rec">● REC</span>
            </span>
          </div>
        </div>

        <div className="mm-wire">
          <svg viewBox="0 0 100 200" preserveAspectRatio="none">
          <path d="M0 33 C 50 33, 50 100, 100 100" strokeDasharray="300" />
          <path d="M0 100 L 100 100" strokeDasharray="300" />
          <path d="M0 167 C 50 167, 50 100, 100 100" strokeDasharray="300" />
        </svg>
        </div>

        <div className="mm-core">
          <span>NLP</span>
        </div>
      </div>

      <div className="mm-out">
        <span className="mm-k">ASL gloss</span>
        <div className="mm-gloss">
          <span className="mm-wq">
            <em>wh-q</em>
          </span>
          <span className="mm-tokens">
            <span className="mm-token">LIBRARY</span>
            <span className="mm-token">WHERE</span>
          </span>
        </div>
      </div>
    </div>
  )
}

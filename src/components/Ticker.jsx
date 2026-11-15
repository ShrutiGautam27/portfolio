import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import { interests } from '../data/site'

/** Interests marquee — drifts on its own, accelerates and reverses with scroll. */
export default function Ticker() {
  const ref = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const loop = gsap.to(trackRef.current, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 })
      let dir = 1
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          dir = self.direction
          const boost = Math.min(Math.abs(self.getVelocity()) / 180, 6)
          gsap.to(loop, { timeScale: dir * (1 + boost), duration: 0.3, overwrite: true })
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3, overwrite: false })
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const row = (hidden) => (
    <div className="ticker__row" aria-hidden={hidden || undefined}>
      {interests.map((item, i) => (
        <span className={`ticker__item ${i % 2 ? 'is-outline' : ''}`} key={item}>
          {item}
          <span className="ticker__star" aria-hidden="true">
            ✶
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <section className="ticker on-ink" ref={ref} aria-label="Areas of interest">
      <div className="ticker__track" ref={trackRef}>
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}

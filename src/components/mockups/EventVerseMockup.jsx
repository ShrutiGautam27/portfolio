import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/motion'

/**
 * Illustrative concept for EventVerse (event names, venues and prices come from
 * the project's own demo data). Discovery list on the left, seat picker + pass on the right.
 */
const EVENTS = [
  { m: 'SEP', d: '12', title: 'Neon Nights Festival', meta: 'City Open Air Arena · Music', price: '₹499', wx: '☀ 31°' },
  { m: 'SEP', d: '16', title: 'Comedy Under The Stars', meta: 'Sector 17 Plaza · Comedy', price: '₹399', wx: '⛅ 29°' },
  { m: 'SEP', d: '24', title: 'Chandigarh Food Festival', meta: 'Sector 35 Grounds · Food', price: '₹299', wx: '☀ 30°' },
]

const ROWS = 6
const COLS = 9
const RESERVED = new Set([2, 3, 11, 15, 16, 24, 31, 40, 41, 47])
const SELECTED = new Set([21, 22, 23])

export default function EventVerseMockup() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true } })
      tl.from('.ev-card', { opacity: 0, x: -24, stagger: 0.12, duration: 0.7, ease: 'power3.out' })
        .from('.ev-seat', { scale: 0, duration: 0.4, stagger: { each: 0.008, from: 'center' }, ease: 'back.out(2)' }, 0.2)
        .from('.ev-pass', { yPercent: 40, opacity: 0, duration: 0.8, ease: 'expo.out' }, 0.9)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="mock mock--ev" ref={ref} aria-hidden="true">
      <div className="ev-top">
        <span className="ev-logo">
          <b>✦</b> EventVerse
        </span>
        <span className="ev-nav">
          <span className="is-on">Discover</span>
          <span>Calendar</span>
          <span>Map</span>
        </span>
        <span className="ev-search">Search events, venues…</span>
      </div>

      <div className="ev-main">
        <div className="ev-list">
          <p className="ev-h">
            Trending this week <span>Tricity</span>
          </p>
          {EVENTS.map((e, i) => (
            <div className={`ev-card ${i === 0 ? 'is-on' : ''}`} key={e.title}>
              <span className="ev-date">
                <small>{e.m}</small>
                {e.d}
              </span>
              <span className="ev-info">
                <b>{e.title}</b>
                <small>{e.meta}</small>
              </span>
              <span className="ev-side">
                <span className="ev-wx">{e.wx}</span>
                <span className="ev-price">{e.price}</span>
              </span>
            </div>
          ))}
          <div className="ev-cats">
            {['Music', 'Comedy', 'Food', 'Tech', 'Workshops', 'Sports'].map((c, i) => (
              <span key={c} className={i === 0 ? 'is-on' : ''}>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="ev-seats">
          <p className="ev-h">Pick your seats</p>
          <span className="ev-stage">Stage</span>
          <div className="ev-grid" style={{ '--cols': COLS }}>
            {Array.from({ length: ROWS * COLS }, (_, i) => (
              <i
                key={i}
                className={`ev-seat ${RESERVED.has(i) ? 'is-taken' : ''} ${SELECTED.has(i) ? 'is-picked' : ''}`}
              />
            ))}
          </div>
          <div className="ev-pass">
            <span className="ev-pass-l">
              <small>Your pass</small>
              <b>Neon Nights Festival</b>
              <small>Row C · Seats 4–6</small>
            </span>
            <span className="ev-qr" />
          </div>
        </div>
      </div>
    </div>
  )
}

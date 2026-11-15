import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import { journey } from '../data/journey'
import Split from './Split'
import Note from './Note'

export default function Journey() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('.step').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => self.isActive && setActive(i),
          toggleClass: { targets: el, className: 'is-active' },
        })
      })
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          '.journey__fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.journey__steps', start: 'top 60%', end: 'bottom 60%', scrub: true },
          }
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section id="journey" className="journey on-ink" ref={ref} aria-labelledby="journey-title">
      <div className="wrap grid journey__grid">
        <div className="journey__aside">
          <p className="label">§ 04 — Journey</p>
          <Split
            as="h2"
            id="journey-title"
            className="journey__title display"
            parts={[{ t: 'Currently ' }, { t: 'building', className: 'serif accent' }, { t: ' my journey' }]}
          />
          <div className="journey__counter" aria-hidden="true">
            <span className="journey__now display">
              <span key={active} className="journey__digit">
                {pad(active + 1)}
              </span>
            </span>
            <span className="mono journey__total">/ {pad(journey.length)}</span>
          </div>
          <p className="journey__caption mono" aria-hidden="true">
            {journey[active]?.when}
          </p>
        </div>

        <ol className="journey__steps">
          <span className="journey__rail" aria-hidden="true">
            <span className="journey__fill" />
          </span>
          {journey.map((s, i) => (
            <li key={i} className={`step ${s.open ? 'step--open' : ''}`}>
              <span className="step__dot" aria-hidden="true" />
              <p className="step__when mono">
                {pad(i + 1)} — {s.when}
              </p>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__body">{s.body}</p>
              {s.tags && (
                <p className="step__tags mono">
                  {s.tags.map((t, k) => (
                    <span key={t}>
                      {t}
                      {k < s.tags.length - 1 && ' · '}
                    </span>
                  ))}
                </p>
              )}
              {s.link && (
                <a className="cert__verify mono step__link" href={s.link.href} target="_blank" rel="noreferrer">
                  {s.link.label} ↗
                </a>
              )}
              {s.certs && (
                <ul className="step__certs">
                  {s.certs.map((ct) => (
                    <li key={ct.code} className="cert">
                      <span className="cert__badge" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <rect x="2" y="2" width="9.5" height="9.5" fill="#f25022" />
                          <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7fba00" />
                          <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00a4ef" />
                          <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#ffb900" />
                        </svg>
                      </span>
                      <span className="cert__text">
                        <b>{ct.name}</b>
                        <span className="mono">Microsoft Certified · {ct.date}</span>
                      </span>
                      <a
                        className="cert__verify mono"
                        href="https://verify.certiport.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Verify ${ct.name} on Certiport with code ${ct.code} (opens in new tab)`}
                      >
                        Verify · {ct.code}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {s.open && (
                <div className="step__slot mono">
                  <Plus size={16} aria-hidden="true" /> Slot open — internships · hackathons · certifications
                </div>
              )}
              {s.open && (
                <Note className="step__note" rotate={-4} arrow="up-left">
                  your opportunity could go here :)
                </Note>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

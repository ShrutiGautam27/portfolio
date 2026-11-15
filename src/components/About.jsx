import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { highlights, site } from '../data/site'
import Split from './Split'
import Note from './Note'

const manifesto =
  'I’m a computer science student fascinated by how technology works — and how it could work better for people. I spend my time on software development, AI and machine learning, and building digital experiences that feel meaningful to use. I don’t have everything figured out yet. That’s the fun part.'

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // words brighten as you read down the paragraph
      gsap.fromTo(
        '.about__w',
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: '.about__manifesto', start: 'top 80%', end: 'bottom 50%', scrub: 0.6 },
        }
      )
      gsap.to('.about__dial', {
        rotate: 220,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about on-paper" ref={ref} aria-labelledby="about-title">
      <div className="wrap grid about__grid">
        <aside className="about__aside">
          <p className="label">§ 01 — About</p>
          <div data-reveal="up">
          <figure className="polaroid">
            <span className="polaroid__tape" aria-hidden="true" />
            <div className="polaroid__photo">
              {site.photo ? (
                <img src={site.photo} alt={`Portrait of ${site.name}`} loading="lazy" />
              ) : (
                <div className="polaroid__empty" role="img" aria-label="Photo coming soon">
                  <span className="polaroid__initials display">SG</span>
                  <span className="mono">Photo coming soon</span>
                </div>
              )}
            </div>
            <figcaption className="polaroid__caption">that’s me, {site.firstName} :)</figcaption>
          </figure>
          </div>

          <div className="about__now">
            <p className="mono about__now-title">
              <i aria-hidden="true" /> Right now
            </p>
            <dl className="about__spec" data-stagger>
              {site.now.map((n) => (
                <div key={n.label} data-reveal-child>
                  <dt className="mono">{n.label}</dt>
                  <dd>{n.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <div className="about__main">
          <div className="about__heading">
            <svg className="about__dial" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" />
              <circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M60 4v22M60 94v22M4 60h22M94 60h22" stroke="currentColor" strokeWidth="1" />
              <circle cx="60" cy="22" r="4" fill="var(--accent)" />
            </svg>
            <Split
              as="h2"
              id="about-title"
              className="about__title display"
              parts={[{ t: 'Curiosity', className: 'serif accent' }, { t: ' drives what I create.' }]}
            />
          </div>

          <p className="about__manifesto">
            {manifesto.split(' ').map((w, i) => (
              <span className="about__w" key={i}>
                {w}{' '}
              </span>
            ))}
          </p>

          <div className="about__how">
            <p className="mono about__how-title">How I like to work</p>
            <Note className="about__how-note" rotate={-4} arrow="down-left">
              the short version
            </Note>
          </div>
          <ol className="about__highlights" data-stagger>
            {highlights.map((h, i) => (
              <li key={h.title} data-reveal-child>
                <span className="about__hn mono">0{i + 1}</span>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

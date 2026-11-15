import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Plus, Minus } from 'lucide-react'
import { ScrollTrigger } from '../lib/motion'
import { projects, archive } from '../data/projects'
import Split from './Split'
import { GithubIcon } from './Icons'
import Note from './Note'
import StockMockup from './mockups/StockMockup'
import MimeMockup from './mockups/MimeMockup'
import PlaceholderMockup from './mockups/PlaceholderMockup'
import EventVerseMockup from './mockups/EventVerseMockup'

const mockups = { stock: StockMockup, mime: MimeMockup, eventverse: EventVerseMockup, placeholder: PlaceholderMockup }

export default function Projects() {
  const ref = useRef(null)
  const [theme, setTheme] = useState('ink')

  // The section's colour shifts as each project takes the stage.
  useEffect(() => {
    const triggers = [...ref.current.querySelectorAll('[data-theme]')].map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setTheme(el.dataset.theme),
      })
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section id="work" className={`work work--${theme}`} ref={ref} aria-labelledby="work-title">
      <header className="work__intro wrap grid" data-theme="ink">
        <p className="label work__label">§ 02 — Selected work</p>
        <h2 className="work__title display" id="work-title">
          <Split text="Things I’ve" />
          <span className="work__title-row">
            <Split text="built" />
            <sup className="mono work__count">({String(projects.length).padStart(2, '0')})</sup>
          </span>
        </h2>
        <p className="work__lede" data-reveal="up">
          Five projects, five very different problems — from coordinating care for elderly family members and learning
          to trade without risking real money, to making language more accessible, finding what’s on around town and
          tracking your carbon footprint. Each one taught me something new about building things people actually use.
        </p>
      </header>

      {projects.map((p, i) => (
        <ProjectShowcase key={p.id} project={p} flip={i % 2 === 1} />
      ))}

      <Archive />
    </section>
  )
}

function ProjectShowcase({ project: p, flip }) {
  const Mockup = mockups[p.mockup] || PlaceholderMockup
  const primary = p.links.live || p.links.github
  const Frame = primary ? 'a' : 'div'
  const frameProps = primary
    ? {
        href: primary,
        target: '_blank',
        rel: 'noreferrer',
        'data-cursor': p.links.live ? 'Live demo' : 'GitHub',
        'aria-label': `${p.name} — ${p.links.live ? 'open live demo' : 'view on GitHub'} (opens in new tab)`,
      }
    : {}
  const caption = p.shot
    ? `Real screenshot${p.shotNote ? ` · ${p.shotNote}` : ''}`
    : p.placeholder
      ? 'Preview coming soon'
      : 'Illustrative concept — not a screenshot'
  return (
    <article
      className={`project ${flip ? 'project--flip' : ''} ${p.placeholder ? 'project--placeholder' : ''}`}
      data-theme={p.theme}
      data-speed-scope
      aria-labelledby={`${p.id}-name`}
    >
      <div className="wrap">
        <header className="project__head">
          <span className="project__index display" aria-hidden="true" data-reveal="fade">
            {p.index}
          </span>
          <div className="project__titles">
            <p className="mono project__kicker" data-reveal="up">
              {p.kicker}
              {p.status && <span className="project__status">{p.status}</span>}
              {p.badge && <span className="project__status project__status--badge">{p.badge}</span>}
              {p.placeholder && <span className="project__status">Placeholder</span>}
            </p>
            <Split as="h3" id={`${p.id}-name`} className="project__name display" text={p.name} />
          </div>
        </header>

        <div className="project__body">
          <figure className="project__visual">
            {p.scribble && (
              <Note className="project__scribble" rotate={flip ? 4 : -4} arrow={flip ? 'down-left' : 'down-right'}>
                {p.scribble}
              </Note>
            )}
            <Frame className="project__frame" data-reveal="mask" {...frameProps}>
              {p.shot ? <BrowserShot src={p.shot} url={p.shotUrl} alt={`Screenshot of ${p.name}`} /> : <Mockup />}
            </Frame>
            <figcaption className="mono project__caption">{caption}</figcaption>
          </figure>

          <div className="project__info">
            <p className="project__desc" data-reveal="up">
              {p.description}
            </p>

            <dl className="project__spec">
              <div data-reveal="up">
                <dt className="mono">Problem</dt>
                <dd>{p.problem}</dd>
              </div>
              <div data-reveal="up">
                <dt className="mono">Key features</dt>
                <dd>
                  <ul className="project__features">
                    {p.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div data-reveal="up">
                <dt className="mono">Built with</dt>
                <dd className="project__stack">
                  {p.stack.map((s, i) => (
                    <span key={s}>
                      {s}
                      {i < p.stack.length - 1 && <i aria-hidden="true"> / </i>}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            {p.note && (
              <p className="project__note mono" data-reveal="up">
                ⚑ {p.note}
              </p>
            )}

            <div className="project__links" data-reveal="up">
              {p.links.live && (
                <a className="btn" data-magnetic href={p.links.live} target="_blank" rel="noreferrer">
                  Live demo <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </a>
              )}
              {p.links.github && (
                <a className="btn btn--ghost" href={p.links.github} target="_blank" rel="noreferrer">
                  <span className="btn__icon-text">
                    <GithubIcon size={16} /> Source
                  </span>
                  <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </a>
              )}
              {!p.links.live && !p.links.github && (
                <p className="mono project__soon">Code &amp; live demo coming to GitHub soon.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/** A real screenshot inside a minimal browser window. */
function BrowserShot({ src, url, alt }) {
  return (
    <div className="shot">
      <div className="shot__bar" aria-hidden="true">
        <span className="shot__dots">
          <i />
          <i />
          <i />
        </span>
        {url && <span className="shot__url">{url}</span>}
      </div>
      <img className="shot__img" src={src} alt={alt} loading="lazy" decoding="async" width="1440" height="900" />
    </div>
  )
}

function Archive() {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    // the page grows/shrinks — keep scroll-trigger positions honest
    const t = setTimeout(() => ScrollTrigger.refresh(), 650)
    return () => clearTimeout(t)
  }, [open])

  return (
    <div className="archive wrap">
      <button
        className="archive__toggle"
        aria-expanded={open}
        aria-controls="archive-list"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="display archive__title">More experiments</span>
        <span className="mono archive__meta">
          {open ? 'Close' : `Open archive (${String(archive.length).padStart(2, '0')})`}
          <span className="archive__icon" aria-hidden="true">
            {open ? <Minus size={18} /> : <Plus size={18} />}
          </span>
        </span>
      </button>
      <div
        id="archive-list"
        className={`archive__body ${open ? 'is-open' : ''}`}
        ref={bodyRef}
        inert={!open}
      >
        <div className="archive__inner">
          <ul className="archive__list">
            {archive.map((a) => (
              <li key={a.name}>
                <a href={a.link} target="_blank" rel="noreferrer" className="archive__row">
                  <span className="archive__name">{a.name}</span>
                  <span className="mono archive__type">{a.type}</span>
                  <span className="archive__desc">{a.description}</span>
                  <ArrowUpRight className="archive__arrow" size={22} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mono archive__hint">New projects land here first — follow along on GitHub.</p>
        </div>
      </div>
    </div>
  )
}

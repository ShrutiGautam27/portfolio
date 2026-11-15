import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { gsap, prefersReducedMotion, scrollToTarget } from '../lib/motion'
import { site } from '../data/site'
import HeroField from './HeroField'
import Split from './Split'
import { GithubIcon, LinkedinIcon } from './Icons'
import Note, { Scribble } from './Note'

const Letters = ({ word }) =>
  word.split('').map((ch, i) => (
    <span className="hero__char" key={i} aria-hidden="true">
      {ch}
    </span>
  ))

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero__char', { yPercent: 105, duration: 1.4, stagger: 0.045 }, 0.15)
        .from('.hero__canvas', { opacity: 0, scale: 0.92, duration: 2, ease: 'power2.out' }, 0)
        .from('.hero__meta > *', { opacity: 0, y: 12, duration: 0.9, stagger: 0.08 }, 0.5)
        .from('.hero__tag', { opacity: 0, x: -12, duration: 1 }, 1)
        .from('.hero__scribble path', { strokeDashoffset: 700, duration: 1.4, ease: 'power2.inOut' }, 1.3)

      // on scroll out: the name drifts apart, the sphere sinks away
      gsap.matchMedia().add('(min-width: 700px)', () => {
        const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.hero__line--1', { xPercent: -8, ease: 'none', scrollTrigger: st })
        gsap.to('.hero__line--2', { xPercent: 6, ease: 'none', scrollTrigger: st })
        gsap.to('.hero__field', { yPercent: 25, opacity: 0.2, ease: 'none', scrollTrigger: st })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const jump = (e, href) => {
    e.preventDefault()
    scrollToTarget(href)
  }

  return (
    <section id="top" className="hero on-ink" ref={ref} aria-labelledby="hero-name">
      <div className="hero__field">
        <HeroField />
      </div>
      <div className="hero__grid-lines" aria-hidden="true" />

      <div className="hero__inner wrap">
        <div className="hero__meta mono">
          <span>Hi there — thanks for stopping by</span>
          <span className="hero__meta-mid">{site.education}</span>
          <span className="hero__status">
            <i aria-hidden="true" /> Currently exploring AI / ML
          </span>
        </div>

        <h1 className="hero__name display" id="hero-name" aria-label={site.name}>
          <Note className="hero__hello" rotate={-7} arrow="down-right" delay={1.1}>
            hello, I’m
          </Note>
          <span className="hero__line hero__line--1">
            <Letters word="SHRUTI" />
          </span>
          <span className="hero__line hero__line--2">
            <span className="hero__tag mono" aria-hidden="true">
              (CS student exploring
              <br />
              AI/ML &amp; software)
            </span>
            <Letters word="GAUTAM" />
          </span>
        </h1>

        <div className="hero__body">
          <Split
            as="p"
            className="hero__headline"
            delay={0.6}
            parts={[{ t: 'Building ideas ' }, { br: true }, { t: 'into ' }, { t: 'experiences.', className: 'serif accent', deco: <Scribble className="hero__scribble" /> }]}
          />
          <div className="hero__side">
            <p className="hero__intro" data-reveal="up" data-delay="0.9">
              {site.intro}
            </p>
            <div className="hero__ctas" data-reveal="up" data-delay="1.05">
              <Note className="hero__start" rotate={-4} arrow="down-right" delay={1.8}>
                start here!
              </Note>
              <a className="btn" data-magnetic href="#work" onClick={(e) => jump(e, '#work')}>
                View projects <ArrowDown size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a className="btn btn--ghost" data-magnetic href="#contact" onClick={(e) => jump(e, '#contact')}>
                Get in touch <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
            <ul className="hero__social" data-reveal="up" data-delay="1.2">
              <li>
                <a className="tlink mono" href={site.links.github} target="_blank" rel="noreferrer">
                  <GithubIcon size={16} /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a className="tlink mono" href={site.links.linkedin} target="_blank" rel="noreferrer">
                  <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}

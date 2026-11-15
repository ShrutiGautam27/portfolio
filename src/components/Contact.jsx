import { useState } from 'react'
import { ArrowUpRight, ArrowUp, Copy, Check } from 'lucide-react'
import { site } from '../data/site'
import { scrollToTarget } from '../lib/motion'
import Split from './Split'
import Note from './Note'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const hasEmail = !site.emailIsPlaceholder

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  const primaryHref = hasEmail ? `mailto:${site.email}` : site.links.linkedin

  return (
    <footer id="contact" className="contact on-ink" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="label">§ 06 — Contact</p>

        <Split
          as="h2"
          id="contact-title"
          className="contact__title display"
          stagger={0.05}
          parts={[
            { t: 'Have an ' },
            { t: 'interesting', className: 'serif accent' },
            { t: ' idea? Let’s build something.' },
          ]}
        />

        <div className="contact__grid">
          <div className="contact__primary" data-reveal="up">
            <Note className="contact__note" rotate={-5} arrow="down-left">
              don’t be shy — say hi!
            </Note>
            <a
              className="contact__big"
              data-magnetic
              href={primaryHref}
              {...(hasEmail ? {} : { target: '_blank', rel: 'noreferrer' })}
              data-cursor="Say hello"
            >
              <span>{hasEmail ? site.email : 'Message me on LinkedIn'}</span>
              <ArrowUpRight className="contact__big-arrow" strokeWidth={1.25} aria-hidden="true" />
            </a>
            {hasEmail ? (
              <button className="tlink mono contact__copy" onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied to clipboard' : 'Copy email address'}
              </button>
            ) : (
              // Placeholder notice — set `email` and `emailIsPlaceholder: false` in src/data/site.js
              <p className="mono contact__hint">Email address coming soon — LinkedIn is the best way to reach me.</p>
            )}
          </div>

          <ul className="contact__channels" data-stagger>
            <li data-reveal-child>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer">
                <span className="mono">01</span>
                <LinkedinIcon size={20} />
                LinkedIn
                <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
            <li data-reveal-child>
              <a href={site.links.github} target="_blank" rel="noreferrer">
                <span className="mono">02</span>
                <GithubIcon size={20} />
                GitHub
                <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
            <li data-reveal-child>
              {hasEmail ? (
                <a href={`mailto:${site.email}`}>
                  <span className="mono">03</span>
                  <span className="contact__at" aria-hidden="true">@</span>
                  Email
                  <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
                </a>
              ) : (
                <span className="contact__pending">
                  <span className="mono">03</span>
                  <span className="contact__at" aria-hidden="true">@</span>
                  Email
                  <span className="mono contact__soon">Soon</span>
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="footer">
        <div className="wrap footer__row mono">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="footer__mid">
            <span className="footer__thanks">thanks for scrolling all the way down ♥</span>
          </span>
          <a
            className="tlink"
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('#top')
            }}
          >
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
        <p className="footer__word display" aria-hidden="true">
          Shruti Gautam
        </p>
      </div>
    </footer>
  )
}

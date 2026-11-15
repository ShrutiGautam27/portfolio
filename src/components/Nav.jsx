import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { getLenis, scrollToTarget } from '../lib/motion'
import { site } from '../data/site'

const links = [
  { href: '#about', label: 'About', n: '01' },
  { href: '#work', label: 'Work', n: '02' },
  { href: '#toolkit', label: 'Toolkit', n: '03' },
  { href: '#journey', label: 'Journey', n: '04' },
  { href: '#contact', label: 'Contact', n: '05' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const progressRef = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  const headerRef = useRef(null)

  useEffect(() => {
    let lastY = window.scrollY
    let lastBg = ''
    // Adopt the colour of whatever section sits under the bar, so it always reads clearly.
    const syncTheme = () => {
      const header = headerRef.current
      if (!header) return
      let el = document.elementFromPoint(4, 30)
      while (el && el !== document.documentElement) {
        if (header.contains(el)) return
        const bg = getComputedStyle(el).backgroundColor
        if (bg && bg !== 'transparent' && !bg.endsWith(', 0)')) {
          if (bg !== lastBg) {
            lastBg = bg
            const [r, g, b] = bg.match(/\d+(\.\d+)?/g).map(Number)
            const light = (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
            header.style.setProperty('--nav-bg', bg)
            header.dataset.tone = light ? 'light' : 'dark'
          }
          return
        }
        el = el.parentElement
      }
    }
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(syncTheme)
      const y = window.scrollY
      // tuck the bar away while reading downward, bring it back on any upward scroll
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400)
        lastY = y
      }
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 40)
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
    }
    onScroll()
    const iv = setInterval(syncTheme, 600) // catches colour changes that happen without scrolling
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearInterval(iv)
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // lock scroll, trap focus and close on Escape while the mobile menu is open
  useEffect(() => {
    const lenis = getLenis()
    if (!open) {
      lenis?.start()
      document.body.style.overflow = ''
      return
    }
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const focusables = [toggleRef.current, ...menuRef.current.querySelectorAll('a')]
    menuRef.current.querySelector('a')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const close = () => mq.matches && setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // wait a frame so the scroll lock is released before scrolling
    requestAnimationFrame(() => scrollToTarget(href))
    history.replaceState(null, '', href === '#top' ? ' ' : href)
  }

  return (
    <>
      <header
        ref={headerRef}
        data-tone="dark"
        className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}
        onFocus={() => setHidden(false)}>
        <div className="nav__bar wrap">
          <a href="#top" className="nav__brand" onClick={(e) => go(e, '#top')} aria-label="Shruti Gautam — back to top">
            <span className="nav__mark">SG</span>
            <span className="nav__name">Shruti Gautam</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
                <span className="nav__n">{l.n}</span>
                {l.label}
              </a>
            ))}
          </nav>

          <a className="nav__cta" href="#contact" onClick={(e) => go(e, '#contact')}>
            Let’s talk <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>

          <button
            ref={toggleRef}
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
        <div className="nav__progress" ref={progressRef} aria-hidden="true" />
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`menu ${open ? 'is-open' : ''}`}
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="menu__links" aria-label="Mobile">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} style={{ '--i': i }}>
              <span className="mono">{l.n}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a className="tlink mono" href={site.links.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a className="tlink mono" href={site.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  )
}

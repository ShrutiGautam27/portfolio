import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null
export const getLenis = () => lenis

/** Smooth scroll (desktop + touch keep native feel), synced to ScrollTrigger. */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(raf)
    lenis?.destroy()
    lenis = null
  }
}

/** Scroll to an element or hash, respecting smooth scroll + reduced motion. */
export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}

/**
 * Declarative scroll reveals driven by data attributes:
 *   data-split          → words rise out of a mask (see <Split/>)
 *   data-reveal="up"    → fade + rise
 *   data-reveal="fade"  → fade
 *   data-reveal="mask"  → clip-path wipe from bottom
 *   data-speed="0.8"    → parallax (1 = normal, <1 slower, >1 faster)
 *   data-stagger        → children with data-reveal-child rise in sequence
 * Returns a cleanup function.
 */
export function initReveals(root = document) {
  if (prefersReducedMotion()) return () => {}

  const ctx = gsap.context(() => {
    root.querySelectorAll('[data-split]').forEach((el) => {
      const inner = el.querySelectorAll('.split-inner')
      gsap.to(inner, {
        yPercent: 0,
        y: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: Number(el.dataset.splitStagger || 0.06),
        delay: Number(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    root.querySelectorAll('[data-reveal="up"], [data-reveal="fade"]').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: Number(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })

    root.querySelectorAll('[data-reveal="mask"]').forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      )
    })

    // handwritten notes: the ink appears, then the arrow is drawn
    root.querySelectorAll('[data-note]').forEach((el) => {
      const tl = gsap.timeline({
        delay: Number(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
      tl.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      const path = el.querySelector('.note__arrow path')
      if (path) tl.fromTo(path, { strokeDashoffset: 220 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.25)
    })

    root.querySelectorAll('[data-stagger]').forEach((group) => {
      const kids = group.querySelectorAll('[data-reveal-child]')
      gsap.fromTo(
        kids,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 85%', once: true },
        }
      )
    })

    // parallax only on larger screens — keeps mobile light and steady
    ScrollTrigger.matchMedia({
      '(min-width: 900px)': () => {
        root.querySelectorAll('[data-speed]').forEach((el) => {
          const speed = Number(el.dataset.speed)
          gsap.fromTo(
            el,
            { y: () => (1 - speed) * -180 },
            {
              y: () => (1 - speed) * 180,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('[data-speed-scope]') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          )
        })
      },
    })
  }, root)

  return () => ctx.revert()
}

export { gsap, ScrollTrigger }

/** Buttons marked data-magnetic lean gently toward the pointer (fine pointers only). */
export function initMagnetic() {
  if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {}
  const offs = []
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * 0.18)
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    offs.push(() => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    })
  })
  return () => offs.forEach((f) => f())
}

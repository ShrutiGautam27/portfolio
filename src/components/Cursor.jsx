import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * A quiet follower ring for fine pointers. The native cursor stays visible —
 * this only adds feedback: it grows over links and shows a label over
 * elements with data-cursor="Label".
 */
export default function Cursor() {
  const ref = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || prefersReducedMotion()) return
    const el = ref.current
    el.style.display = 'block'
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

    const move = (e) => {
      el.classList.remove('is-hidden')
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const over = (e) => {
      const target = e.target.closest('a, button, [data-cursor]')
      const label = target?.dataset?.cursor
      el.classList.toggle('is-link', !!target && !label)
      el.classList.toggle('is-label', !!label)
      labelRef.current.textContent = label || ''
    }
    const leave = () => el.classList.add('is-hidden')
    const enter = () => el.classList.remove('is-hidden')

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    document.documentElement.addEventListener('pointerenter', enter)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.removeEventListener('pointerenter', enter)
    }
  }, [])

  return (
    <div className="cursor is-hidden" ref={ref} aria-hidden="true">
      <div className="cursor__ring" />
      <span className="cursor__label" ref={labelRef} />
    </div>
  )
}

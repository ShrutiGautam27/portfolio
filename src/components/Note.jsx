/**
 * Handwritten margin notes — the "pen annotations" on the working draft.
 * They add a human voice next to the precise, typeset layout.
 *
 *   <Note arrow="down-right" rotate={-4} className="my-pos">start here!</Note>
 *
 * arrow: 'down-right' | 'down-left' | 'right' | 'left' | 'up-right' | 'up-left' | 'none'
 * Notes are decorative (aria-hidden) unless `speak` is set.
 */
const ARROWS = {
  'down-right': 'M4 6 C 22 8, 40 22, 44 46 M 34 38 L 44 47 L 50 35',
  'down-left': 'M50 6 C 32 8, 14 22, 10 46 M 4 35 L 10 47 L 20 38',
  right: 'M2 26 C 16 14, 34 14, 50 24 M 40 14 L 51 24 L 39 31',
  left: 'M52 26 C 38 14, 20 14, 4 24 M 15 31 L 3 24 L 14 14',
  'up-right': 'M4 46 C 22 44, 40 30, 44 8 M 34 15 L 44 6 L 50 18',
  'up-left': 'M50 46 C 32 44, 14 30, 10 8 M 4 18 L 10 6 L 20 15',
}

export default function Note({ children, arrow = 'none', rotate = -3, className = '', speak = false, arrowFirst, delay }) {
  const path = ARROWS[arrow]
  const svg = path && (
    <svg className="note__arrow" viewBox="0 0 54 52" fill="none" aria-hidden="true">
      <path d={path} />
    </svg>
  )
  const first = arrowFirst ?? (arrow.endsWith('left') || arrow.startsWith('up'))
  return (
    <span
      className={`note note--${arrow} ${className}`}
      style={{ '--r': `${rotate}deg` }}
      aria-hidden={speak ? undefined : 'true'}
      data-note=""
      data-delay={delay}
    >
      {first && svg}
      <span className="note__text">{children}</span>
      {!first && svg}
    </span>
  )
}

/** A hand-drawn underline that draws itself in. */
export function Scribble({ className = '' }) {
  return (
    <svg className={`scribble ${className}`} viewBox="0 0 300 24" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path d="M3 15 C 60 6, 130 5, 200 9 S 280 14, 297 8 M 30 20 C 90 14, 170 13, 250 17" />
    </svg>
  )
}

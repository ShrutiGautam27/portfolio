/**
 * Splits text into masked words so they can rise into place.
 * Usage:
 *   <Split as="h2" text="Curiosity drives what I create." />
 *   <Split as="h2" parts={[{ t: 'Building ideas into ' }, { t: 'experiences.', className: 'serif accent' }]} />
 * A segment may carry `deco` (a React node, e.g. a scribble) rendered outside the word masks.
 * Screen readers get the full sentence via aria-label.
 */
export default function Split({ as: Tag = 'span', text, parts, className = '', stagger, delay, ...rest }) {
  const segments = parts || [{ t: text }]
  const full = segments
    .map((s) => s.t || ' ')
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
  let i = 0

  const words = (seg, si) =>
    seg.t
      .split(/(\s+)/)
      .filter(Boolean)
      .map((word) => {
        if (/^\s+$/.test(word)) return ' '
        const key = `${si}-${i++}`
        return (
          <span className="split-word" aria-hidden="true" key={key}>
            <span className={`split-inner ${seg.className || ''}`}>{word}</span>
          </span>
        )
      })

  return (
    <Tag
      className={className}
      aria-label={full}
      data-split=""
      data-split-stagger={stagger}
      data-delay={delay}
      {...rest}
    >
      {segments.map((seg, si) => {
        if (seg.br) return <br key={`br-${si}`} />
        if (seg.deco)
          return (
            <span className="split-deco" key={`deco-${si}`}>
              {words(seg, si)}
              {seg.deco}
            </span>
          )
        return words(seg, si)
      })}
    </Tag>
  )
}

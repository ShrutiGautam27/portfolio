import { useState } from 'react'
import { skillGroups, statusLabels } from '../data/skills'
import Split from './Split'
import Note from './Note'

export default function Skills() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="toolkit" className="skills on-paper" aria-labelledby="skills-title">
      <div className="wrap">
        <header className="skills__head grid">
          <p className="label skills__label">§ 03 — Toolkit</p>
          <Split
            as="h2"
            id="skills-title"
            className="skills__title display"
            parts={[{ t: 'What I work ' }, { t: 'with', className: 'serif accent' }, { t: ' & where I’m headed.' }]}
          />
          <div className="skills__aside" data-reveal="up">
            <p>
              An honest map rather than a scoreboard — no percentages, no star ratings. Just what I build with today and
              what I’m actively learning.
            </p>
            <ul className="skills__legend mono" aria-label="Legend">
              {Object.entries(statusLabels).map(([k, v]) => (
                <li key={k}>
                  <span className={`mark mark--${k}`} aria-hidden="true" />
                  {v}
                </li>
              ))}
            </ul>
            <Note className="skills__note" rotate={-3} arrow="up-left">
              always adding more to this list
            </Note>
          </div>
        </header>

        <div className={`skills__table ${hovered ? 'has-hover' : ''}`}>
          {skillGroups.map((g) => (
            <div className="skills__row" key={g.id} data-reveal="up">
              <span className="skills__code display" aria-hidden="true">
                {g.code}
              </span>
              <div className="skills__group">
                <h3>{g.title}</h3>
                <p className="mono">{g.note}</p>
              </div>
              <ul className="skills__items">
                {g.items.map((it) => (
                  <li
                    key={it.name}
                    className={`skill ${hovered === it.name ? 'is-match' : ''}`}
                    onMouseEnter={() => setHovered(it.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span className={`mark mark--${it.status}`} aria-hidden="true" />
                    <span className="skill__name">{it.name}</span>
                    <span className="sr-only"> — {statusLabels[it.status]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

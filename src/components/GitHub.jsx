import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../data/site'
import Split from './Split'
import { GithubIcon, LinkedinIcon } from './Icons'

const LANG_COLORS = {
  JavaScript: '#e8c547',
  TypeScript: '#3a7bd5',
  Python: '#3572a5',
  Java: '#b07219',
  CSS: '#7a4fd1',
  HTML: '#e34c26',
  C: '#6b6b6b',
}

const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })

/** Live public repositories straight from the GitHub API — nothing invented. */
export default function GitHub() {
  const [repos, setRepos] = useState(null) // null = loading, [] = none/failed
  const [failed, setFailed] = useState(false)
  const [chartOk, setChartOk] = useState(true)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${site.githubUser}/repos?sort=updated&per_page=12`, {
      signal: ctrl.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const hidden = (site.hiddenRepos || []).map((n) => n.toLowerCase())
        setRepos(data.filter((r) => !r.fork && !hidden.includes(r.name.toLowerCase())).slice(0, 6))
      })
      .catch((e) => {
        if (e?.name === 'AbortError') return
        setFailed(true)
        setRepos([])
      })
    return () => ctrl.abort()
  }, [])

  return (
    <section id="code" className="code on-paper" aria-labelledby="code-title">
      <div className="wrap grid code__grid">
        <div className="code__aside">
          <p className="label">§ 05 — In public</p>
          <Split
            as="h2"
            id="code-title"
            className="code__title display"
            parts={[{ t: 'Code, ' }, { t: 'in the open.', className: 'serif accent' }]}
          />
          <p className="code__lede" data-reveal="up">
            Everything I build lives on GitHub — finished projects, works in progress and the experiments in between.
          </p>

          <div className="code__profiles" data-stagger>
            <a className="profile" href={site.links.github} target="_blank" rel="noreferrer" data-reveal-child>
              <GithubIcon size={26} />
              <span className="profile__text">
                <span className="mono">GitHub</span>
                <span className="profile__handle">@{site.githubUser}</span>
              </span>
              <ArrowUpRight className="profile__arrow" size={24} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a className="profile" href={site.links.linkedin} target="_blank" rel="noreferrer" data-reveal-child>
              <LinkedinIcon size={26} />
              <span className="profile__text">
                <span className="mono">LinkedIn</span>
                <span className="profile__handle">Connect with me</span>
              </span>
              <ArrowUpRight className="profile__arrow" size={24} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="code__main">
          <div className="code__bar mono">
            <span>Recent repositories</span>
            <span className="code__live">
              <i aria-hidden="true" /> Live from GitHub
            </span>
          </div>

          {repos === null && (
            <ul className="repos" aria-busy="true" aria-label="Loading repositories">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="repo repo--skeleton" />
              ))}
            </ul>
          )}

          {repos && repos.length > 0 && (
            <ul className="repos">
              {repos.map((r) => (
                <li key={r.id}>
                  <a className="repo" href={r.html_url} target="_blank" rel="noreferrer">
                    <span className="repo__name">{r.name}</span>
                    <span className="repo__desc">{r.description || 'No description yet.'}</span>
                    <span className="repo__meta mono">
                      {r.language && (
                        <span className="repo__lang">
                          <i style={{ background: LANG_COLORS[r.language] || '#888' }} aria-hidden="true" />
                          {r.language}
                        </span>
                      )}
                      <span>Updated {fmtDate(r.pushed_at || r.updated_at)}</span>
                    </span>
                    <ArrowUpRight className="repo__arrow" size={20} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          {repos && repos.length === 0 && (
            <div className="repos__empty">
              <p>
                {failed
                  ? 'Couldn’t load repositories right now (GitHub may be rate-limiting).'
                  : 'No public repositories yet.'}
              </p>
              <a className="tlink mono" href={site.links.github} target="_blank" rel="noreferrer">
                Browse them on GitHub <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          )}

          {chartOk && (
            <figure className="code__chart">
              <figcaption className="mono">Contribution activity — past year</figcaption>
              <div className="code__chart-scroll">
                <img
                  src={`https://ghchart.rshah.org/a3202f/${site.githubUser}`}
                  alt={`GitHub contribution graph for ${site.githubUser}`}
                  loading="lazy"
                  width="663"
                  height="104"
                  onError={() => setChartOk(false)}
                />
              </div>
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}

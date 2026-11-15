import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

/**
 * "Signal sphere" — a geodesic point lattice drawn on a 2D canvas.
 * A marigold scan-band sweeps through it, a few nodes are annotated with
 * areas of interest, and the whole structure tilts toward the cursor.
 * No WebGL / Three.js needed, so it stays light on every device.
 */
const LABELS = ['AI / ML', 'SOFTWARE', 'WEB', 'DSA']

export default function HeroField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = prefersReducedMotion()
    const small = window.matchMedia('(max-width: 700px)').matches
    const N = small ? 170 : 280

    // fibonacci sphere
    const golden = Math.PI * (3 - Math.sqrt(5))
    const pts = []
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const t = golden * i
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r])
    }
    // connect each point to its 3 nearest neighbours → geodesic mesh
    const edgeSet = new Set()
    const edges = []
    for (let i = 0; i < N; i++) {
      const d = []
      for (let j = 0; j < N; j++) {
        if (i === j) continue
        const dx = pts[i][0] - pts[j][0]
        const dy = pts[i][1] - pts[j][1]
        const dz = pts[i][2] - pts[j][2]
        d.push([dx * dx + dy * dy + dz * dz, j])
      }
      d.sort((a, b) => a[0] - b[0])
      for (let k = 0; k < 3; k++) {
        const j = d[k][1]
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!edgeSet.has(key)) {
          edgeSet.add(key)
          edges.push([i, j])
        }
      }
    }
    const tagged = [Math.floor(N * 0.22), Math.floor(N * 0.43), Math.floor(N * 0.61), Math.floor(N * 0.8)]

    let w = 0
    let h = 0
    let dpr = 1
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      if (reduced) draw(0)
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1
    }

    const proj = new Array(N)
    let rotY = 0.6

    function draw(time) {
      const t = time * 0.001
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const R = Math.min(w, h) * (small ? 0.36 : 0.31)
      const cx = small ? w * 0.6 : w * 0.7
      const cy = h * (small ? 0.3 : 0.36)

      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04
      const ay = rotY + mouse.x * 0.5
      const ax = -0.35 + mouse.y * 0.3
      const cosY = Math.cos(ay)
      const sinY = Math.sin(ay)
      const cosX = Math.cos(ax)
      const sinX = Math.sin(ax)
      const persp = 2.8

      for (let i = 0; i < N; i++) {
        const [x0, y0, z0] = pts[i]
        const x1 = x0 * cosY - z0 * sinY
        const z1 = x0 * sinY + z0 * cosY
        const y2 = y0 * cosX - z1 * sinX
        const z2 = y0 * sinX + z1 * cosX
        const s = persp / (persp - z2)
        proj[i] = [cx + x1 * R * s, cy + y2 * R * s, z2, y0]
      }

      // outer orbit
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-0.38 + mouse.x * 0.05)
      ctx.strokeStyle = 'rgba(245,238,227,0.16)'
      ctx.setLineDash([2, 6])
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(0, 0, R * 1.42, R * 0.36, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])
      const sa = t * 0.35
      ctx.fillStyle = '#f1ede4'
      ctx.beginPath()
      ctx.arc(Math.cos(sa) * R * 1.42, Math.sin(sa) * R * 0.36, 2.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // mesh
      ctx.lineWidth = 0.6
      for (let k = 0; k < edges.length; k++) {
        const a = proj[edges[k][0]]
        const b = proj[edges[k][1]]
        const z = (a[2] + b[2]) * 0.5
        ctx.strokeStyle = `rgba(245,238,227,${0.03 + ((z + 1) / 2) * 0.22})`
        ctx.beginPath()
        ctx.moveTo(a[0], a[1])
        ctx.lineTo(b[0], b[1])
        ctx.stroke()
      }

      // scanning band: points near a moving latitude light up in marigold
      const band = Math.sin(t * 0.45) * 0.85
      for (let i = 0; i < N; i++) {
        const p = proj[i]
        const depth = (p[2] + 1) / 2
        const near = Math.max(0, 1 - Math.abs(p[3] - band) / 0.12)
        const size = 0.7 + depth * 1.5 + near * 1.2
        if (near > 0.05) {
          ctx.fillStyle = `rgba(244,165,28,${0.35 + near * 0.65 * (0.4 + depth * 0.6)})`
        } else {
          ctx.fillStyle = `rgba(245,238,227,${0.18 + depth * 0.7})`
        }
        ctx.fillRect(p[0] - size / 2, p[1] - size / 2, size, size)
      }

      // annotated nodes
      ctx.font = `500 11px "Geist Mono", ui-monospace, monospace`
      ctx.textBaseline = 'middle'
      tagged.forEach((idx, n) => {
        const p = proj[idx]
        const vis = Math.max(0, Math.min(1, (p[2] + 0.1) * 2.2))
        if (vis <= 0) return
        const lx = p[0] + (n % 2 ? -1 : 1) * 46
        const ly = p[1] - 26
        ctx.strokeStyle = `rgba(245,238,227,${0.45 * vis})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p[0], p[1])
        ctx.lineTo(lx, ly)
        ctx.lineTo(lx + (n % 2 ? -14 : 14), ly)
        ctx.stroke()
        ctx.fillStyle = `rgba(244,165,28,${vis})`
        ctx.beginPath()
        ctx.arc(p[0], p[1], 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = `rgba(243,182,194,${0.6 * vis})`
        ctx.beginPath()
        ctx.arc(p[0], p[1], 8 + Math.sin(t * 2 + n) * 1.5, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = `rgba(245,238,227,${0.85 * vis})`
        ctx.textAlign = n % 2 ? 'right' : 'left'
        ctx.fillText(LABELS[n], lx + (n % 2 ? -20 : 20), ly)
      })
    }

    let raf = 0
    let running = false
    let last = 0
    const loop = (time) => {
      const dt = Math.min(time - (last || time), 50)
      last = time
      rotY += dt * 0.00012
      draw(time)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduced) return
      running = true
      last = 0
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)
    resize()

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    if (!reduced) window.addEventListener('pointermove', onMove, { passive: true })
    // fonts may arrive after the first static frame
    document.fonts?.ready.then(() => reduced && draw(0))

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
}

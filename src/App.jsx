import { useEffect, useRef } from 'react'
import { initMagnetic, initReveals, initSmoothScroll, ScrollTrigger } from './lib/motion'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import About from './components/About'
import Ticker from './components/Ticker'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Journey from './components/Journey'
import GitHub from './components/GitHub'
import Contact from './components/Contact'

export default function App() {
  const mainRef = useRef(null)

  useEffect(() => {
    const stopScroll = initSmoothScroll()
    const stopReveals = initReveals(document.body)
    const stopMagnetic = initMagnetic()
    // fonts change text metrics → recompute trigger positions once loaded
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => {
      stopReveals()
      stopMagnetic()
      stopScroll()
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <Cursor />
      <main id="main" ref={mainRef}>
        <Hero />
        <About />
        <Ticker />
        <Projects />
        <Skills />
        <Journey />
        <GitHub />
      </main>
      <Contact />
    </>
  )
}

import { useState, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import StarField from './components/StarField'
import Prelude from './components/Prelude'
import LyricStage from './components/LyricStage'
import ProposalScene from './components/ProposalScene'
import Song from '../public/assets/finding-her.mp3'

const STAGES = { PRELUDE: 'prelude', LYRICS: 'lyrics', PROPOSAL: 'proposal' }

function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 12 + 10,
    size: Math.random() * 3 + 1,
    color: i % 3 === 0 ? 'rgba(201,114,138,0.6)' : i % 3 === 1 ? 'rgba(212,168,90,0.4)' : 'rgba(200,200,216,0.3)',
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2, overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: `${p.x}%`, width: p.size, height: p.size, background: p.color,
          animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`,
          boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
        }} />
      ))}
    </div>
  )
}

export default function App() {
  const [stage, setStage] = useState(STAGES.PRELUDE)
  const audioRef = useRef(null)

  const handleBegin = useCallback(() => {
    // Start lyrics stage immediately
    setStage(STAGES.LYRICS)

    // Start music after 500ms delay
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.85
        audioRef.current.play().catch(err => console.warn('Audio blocked:', err))
      }
    }, 500)
  }, [])

  const handleLyricsComplete = useCallback(() => {
    setStage(STAGES.PROPOSAL)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <StarField />
      <audio ref={audioRef} src={Song} preload="auto" />
      <Particles />
      <AnimatePresence mode="wait">
        {stage === STAGES.PRELUDE && <Prelude key="prelude" onBegin={handleBegin} />}
        {stage === STAGES.LYRICS && <LyricStage key="lyrics" audioRef={audioRef} onComplete={handleLyricsComplete} />}
        {stage === STAGES.PROPOSAL && <ProposalScene key="proposal" />}
      </AnimatePresence>
    </div>
  )
}

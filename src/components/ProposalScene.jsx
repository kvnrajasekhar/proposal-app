import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useConfetti } from '../hooks/useConfetti'

function RingIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="ring-float" style={{ width: 72, height: 72 }}>
      {/* Band */}
      <ellipse cx="40" cy="52" rx="22" ry="7" stroke="rgba(212,168,90,0.7)" strokeWidth="1.5" fill="none" />
      <rect x="18" y="45" width="44" height="14" rx="7" fill="none" stroke="rgba(212,168,90,0.4)" strokeWidth="1" />
      {/* Stone */}
      <polygon points="40,12 52,26 40,34 28,26" fill="rgba(201,114,138,0.3)" stroke="rgba(201,114,138,0.8)" strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points="40,12 52,26 40,20" fill="rgba(201,114,138,0.5)" />
      <polygon points="40,12 28,26 40,20" fill="rgba(212,168,90,0.3)" />
      {/* Sparkles */}
      <circle cx="58" cy="18" r="1.5" fill="rgba(212,168,90,0.8)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="22" r="1" fill="rgba(201,114,138,0.8)">
        <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="62" cy="38" r="1" fill="rgba(240,234,245,0.6)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18, display: 'inline-block', marginRight: 6, verticalAlign: 'middle' }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="rgba(201,114,138,0.8)" />
    </svg>
  )
}

export default function ProposalScene() {
  const [phase, setPhase] = useState('entering') // entering | question | answered
  const [answer, setAnswer] = useState(null)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const fireConfetti = useConfetti()

  useEffect(() => {
    const t = setTimeout(() => setPhase('question'), 1200)
    return () => clearTimeout(t)
  }, [])

  const handleYes = () => {
    setAnswer('yes')
    setPhase('answered')
    setTimeout(() => fireConfetti(), 300)
  }

  const handleNoHover = () => {
    const x = (Math.random() - 0.5) * 200
    const y = (Math.random() - 0.5) * 150
    setNoPosition({ x, y })
  }

  return (
    <motion.div
      className="relative z-10 flex items-center justify-center w-full h-full px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <AnimatePresence mode="wait">
        {phase !== 'answered' ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card proposal-glow rounded-2xl text-center w-full max-w-md mx-auto relative overflow-hidden"
            style={{ padding: 'clamp(2rem, 6vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)' }}
          >
            {/* Inner glow border */}
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: 'inherit',
              background: 'linear-gradient(135deg, rgba(201,114,138,0.08) 0%, transparent 50%, rgba(83,49,124,0.06) 100%)',
              pointerEvents: 'none',
            }} />

            {/* Ring */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
              className="flex justify-center mb-6"
            >
              <RingIcon />
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(212,168,90,0.4), transparent)',
                marginBottom: '1.75rem',
              }}
            />

            {/* Question */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === 'question' ? 1 : 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9 }}
            >
              <p style={{
                fontFamily: 'var(--font-light)',
                fontSize: 'clamp(9px, 2vw, 11px)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(201,114,138,0.65)',
                marginBottom: '1.2rem',
              }}>
                With every lyric, every pause, every note
              </p>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                fontWeight: 400,
                letterSpacing: '0.06em',
                lineHeight: 1.4,
                marginBottom: '0.5rem',
              }}
                className="shimmer-text"
              >
                Will you be mine,
              </h2>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                fontWeight: 400,
                letterSpacing: '0.06em',
                lineHeight: 1.4,
                marginBottom: '2rem',
                color: 'rgba(240,234,245,0.9)',
              }}>
                "my love"?
              </h2>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                color: 'rgba(240,234,245,0.4)',
                marginBottom: '2.5rem',
                lineHeight: 1.7,
              }}>
                Every song I hear reminds me of you.<br />
                Every silence feels like a space you were meant to fill.
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: phase === 'question' ? 1 : 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex items-center justify-center gap-4"
              style={{ position: 'relative' }}
            >
              {/* Yes button */}
              <motion.button
                className="yes-btn"
                onClick={handleYes}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontFamily: 'var(--font-light)',
                  fontSize: '11px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,234,245,0.95)',
                  padding: '14px 36px',
                  borderRadius: '2px',
                }}
              >
                <HeartIcon /> Yes
              </motion.button>

              {/* No button — runs away */}
              <motion.button
                className="no-btn"
                onMouseEnter={handleNoHover}
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  fontFamily: 'var(--font-light)',
                  fontSize: '11px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  padding: '14px 32px',
                  borderRadius: '2px',
                  position: 'relative',
                }}
              >
                No
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          /* YES Response */
          <motion.div
            key="yes-response"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring', stiffness: 120, damping: 18 }}
            className="text-center w-full max-w-lg mx-auto"
            style={{ padding: '2rem 1rem' }}
          >
            {/* Big heart */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.8, times: [0, 0.6, 1] }}
              className="flex justify-center mb-8"
            >
              <svg viewBox="0 0 100 90" fill="none" style={{ width: 80, height: 72 }}>
                <path d="M50 85L10 45C5 38 5 25 15 18 22 13 32 14 40 20L50 30 60 20C68 14 78 13 85 18 95 25 95 38 90 45Z"
                  fill="url(#heartGrad)"
                  stroke="rgba(201,114,138,0.6)" strokeWidth="1" />
                <defs>
                  <linearGradient id="heartGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#c9728a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#9b72cf" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="shimmer-text"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 7vw, 3.2rem)',
                fontWeight: 400,
                letterSpacing: '0.1em',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}
            >
              Forever begins now
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(201,114,138,0.5), rgba(212,168,90,0.5), transparent)',
                margin: '0 auto 1.8rem',
                width: '70%',
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.05rem, 3vw, 1.35rem)',
                fontWeight: 300,
                color: 'rgba(240,234,245,0.7)',
                lineHeight: 1.9,
                letterSpacing: '0.03em',
                marginBottom: '2rem',
              }}
            >
              You said yes to being my person.<br />
              To late nights and early mornings,<br />
              to every song that was always about you,<br />
              <span style={{ color: 'rgba(201,114,138,0.85)' }}>to a lifetime of moments like this one.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-light)',
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(212,168,90,0.5)',
              }}
            >
              ✦ &nbsp; with love &nbsp; ✦
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

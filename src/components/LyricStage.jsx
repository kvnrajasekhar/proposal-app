import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LYRICS, PROPOSAL_START_TIME } from '../data/lyrics'

export default function LyricStage({ audioRef, onComplete }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1)
  const [typedChars, setTypedChars] = useState(0)
  const [completedLines, setCompletedLines] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [lineStates, setLineStates] = useState({}) // Track state of each line: 'typing', 'completed', 'pending'
  const containerRef = useRef(null)
  const typeIntervalRef = useRef(null)
  const scheduleTimeoutsRef = useRef([])

  const delays = [0.8, 0.5, 0.2, 0.1, 0.4, 0.4, 0.5, 0.3];

  const clearAllTimers = useCallback(() => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current)
    scheduleTimeoutsRef.current.forEach(t => clearTimeout(t))
    scheduleTimeoutsRef.current = []
  }, [])

  const typeLine = useCallback((lineIndex) => {
    const line = LYRICS[lineIndex]
    if (!line) return

    setCurrentLineIndex(lineIndex)
    setTypedChars(0)
    setIsTyping(true)
    setLineStates(prev => ({ ...prev, [lineIndex]: 'typing' }))

    let charCount = 0
    typeIntervalRef.current = setInterval(() => {
      charCount++
      setTypedChars(charCount)
      if (charCount >= line.text.length) {
        clearInterval(typeIntervalRef.current)
        setIsTyping(false)
        // Mark line as completed with smooth transition
        setTimeout(() => {
          setLineStates(prev => ({ ...prev, [lineIndex]: 'completed' }))
          setIsTyping(false)
          // Start next line after delay or trigger completion
          setTimeout(() => {
            if (lineIndex < LYRICS.length - 1) {
              typeLine(lineIndex + 1)
            } else {
              // Last line completed, trigger proposal after delay
              setTimeout(() => {
                onComplete()
              }, 2000)
            }
          }, delays[lineIndex] * 1000)
        }, 800)
      }
    }, line.charDelay)
  }, [])

  useEffect(() => {
    // Start first line
    const firstLineTimer = setTimeout(() => {
      typeLine(0)
    }, LYRICS[0].startTime)
    scheduleTimeoutsRef.current.push(firstLineTimer)

    // Fallback proposal transition (in case sequential logic fails)
    const proposalT = setTimeout(() => {
      clearAllTimers()
      onComplete()
    }, PROPOSAL_START_TIME)
    scheduleTimeoutsRef.current.push(proposalT)

    return () => clearAllTimers()
  }, [typeLine, onComplete, clearAllTimers])

  // Auto-scroll to keep active line visible
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [completedLines, typedChars])

  const currentLine = currentLineIndex >= 0 ? LYRICS[currentLineIndex] : null
  const displayText = currentLine ? currentLine.text.slice(0, typedChars) : ''

  return (
    <motion.div
      className="relative z-10 flex items-center justify-center w-full h-full px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="w-full max-w-2xl">
        {/* Song label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div style={{ width: 30, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,114,138,0.5))' }} />
            {/* Music note */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 11V3l7-1.5V9.5M5 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm7-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" stroke="rgba(201,114,138,0.6)" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <p style={{
              fontFamily: 'var(--font-light)',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: 'rgba(201,114,138,0.6)',
              textTransform: 'uppercase',
            }}>Finding Her</p>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 11V3l7-1.5V9.5M5 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm7-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" stroke="rgba(201,114,138,0.6)" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <div style={{ width: 30, height: 1, background: 'linear-gradient(90deg, rgba(201,114,138,0.5), transparent)' }} />
          </div>
        </motion.div>

        {/* Lyrics container - Instagram style */}
        <div
          ref={containerRef}
          className="lyrics-scroll"
          style={{
            maxHeight: 'calc(100vh - 200px)',
            paddingBottom: '1rem',
          }}
        >
          <div className="flex flex-col gap-1 sm:gap-1">
            {LYRICS.map((line, idx) => {
              const lineState = lineStates[idx] || 'pending';
              const isCurrentLine = idx === currentLineIndex;
              const shouldShow = lineState !== 'pending';
              const displayText = isCurrentLine && lineState === 'typing' ? line.text.slice(0, typedChars) : line.text;

              if (!shouldShow && !isCurrentLine) return null;

              return (
                <motion.div
                  key={line.id}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: shouldShow ? 1 : 0,
                    y: 0,
                    scale: lineState === 'completed' ? 0.95 : 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                    scale: { duration: 0.3 }
                  }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontStyle: 'italic',
                    fontSize: lineState === 'completed'
                      ? 'clamp(1.15rem, 3.5vw, 1.55rem)'
                      : 'clamp(1.3rem, 4vw, 1.85rem)',
                    fontWeight: lineState === 'completed' ? 300 : 400,
                    letterSpacing: lineState === 'completed' ? '0.03em' : '0.04em',
                    lineHeight: 1.3,
                    minHeight: '2.5em',
                    opacity: lineState === 'completed'
                      ? Math.max(0.3, 0.8 - (currentLineIndex - idx) * 0.1)
                      : 1,
                    color: lineState === 'completed'
                      ? 'rgba(240,234,245,0.6)'
                      : 'rgba(240,234,245,0.95)',
                    transition: 'all 0.4s ease',
                  }}
                >
                  {displayText}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-2 mt-6"
        >
          {LYRICS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i < completedLines.length ? 16 : 5,
                height: 5,
                borderRadius: 3,
                background: i < completedLines.length
                  ? 'rgba(201,114,138,0.6)'
                  : i === currentLineIndex
                    ? 'rgba(201,114,138,0.9)'
                    : 'rgba(255,255,255,0.1)',
                transition: 'all 0.5s ease',
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

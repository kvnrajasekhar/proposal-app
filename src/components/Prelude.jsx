import { motion } from 'framer-motion'

export default function Prelude({ onBegin }) {
  return (
    <motion.div
      className="relative z-10 flex items-center justify-center w-full h-full px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 1.2 }}
    >
      <div className="glass-card rounded-2xl px-8 py-12 sm:px-14 sm:py-16 max-w-lg w-full text-center relative">
        {/* Corner ornaments */}
        <svg className="absolute top-4 left-4 w-8 h-8 opacity-30" viewBox="0 0 32 32" fill="none">
          <path d="M2 30 L2 2 L30 2" stroke="#c9728a" strokeWidth="1" />
          <circle cx="2" cy="2" r="1.5" fill="#c9728a" />
        </svg>
        <svg className="absolute top-4 right-4 w-8 h-8 opacity-30" viewBox="0 0 32 32" fill="none">
          <path d="M30 30 L30 2 L2 2" stroke="#c9728a" strokeWidth="1" />
          <circle cx="30" cy="2" r="1.5" fill="#c9728a" />
        </svg>
        <svg className="absolute bottom-4 left-4 w-8 h-8 opacity-30" viewBox="0 0 32 32" fill="none">
          <path d="M2 2 L2 30 L30 30" stroke="#c9728a" strokeWidth="1" />
          <circle cx="2" cy="30" r="1.5" fill="#c9728a" />
        </svg>
        <svg className="absolute bottom-4 right-4 w-8 h-8 opacity-30" viewBox="0 0 32 32" fill="none">
          <path d="M30 2 L30 30 L2 30" stroke="#c9728a" strokeWidth="1" />
          <circle cx="30" cy="30" r="1.5" fill="#c9728a" />
        </svg>

        {/* Decorative top line */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,114,138,0.6))' }} />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="rgba(201,114,138,0.7)" />
          </svg>
          <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, rgba(201,114,138,0.6), transparent)' }} />
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-light)',
            fontSize: '10px',
            letterSpacing: '0.35em',
            color: 'rgba(201,114,138,0.7)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          A message for you
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
            fontWeight: 400,
            letterSpacing: '0.08em',
            lineHeight: 1.3,
            marginBottom: '1.25rem',
          }}
          className="shimmer-text"
        >
          Finding Her
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,114,138,0.35), transparent)',
            margin: '1.5rem auto',
            width: '60%',
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            fontWeight: 300,
            color: 'rgba(240,234,245,0.55)',
            letterSpacing: '0.04em',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}
        >
          Some feelings are best heard<br />
          <span style={{ color: 'rgba(201,114,138,0.7)' }}>in the language of music</span>
        </motion.p>

        {/* Begin button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBegin}
          style={{
            fontFamily: 'var(--font-light)',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,234,245,0.9)',
            padding: '14px 40px',
            borderRadius: '2px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(201,114,138,0.12), rgba(83,49,124,0.12))',
            border: '1px solid rgba(201,114,138,0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(201,114,138,0.6)'
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,114,138,0.22), rgba(83,49,124,0.2))'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(201,114,138,0.2)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(201,114,138,0.3)'
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,114,138,0.12), rgba(83,49,124,0.12))'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Begin
        </motion.button>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          style={{
            marginTop: '1.5rem',
            fontFamily: 'var(--font-light)',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.15em',
          }}
        >
          🎵 sound on for the full experience
        </motion.p>
      </div>
    </motion.div>
  )
}

import { useCallback } from 'react'
import confetti from 'canvas-confetti'

export function useConfetti() {
  const fire = useCallback(() => {
    const duration = 5000
    const end = Date.now() + duration

    const colors = ['#c9728a', '#d4a85a', '#e8a0b0', '#9b72cf', '#f0eaf5', '#ffffff']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        shapes: ['circle', 'square'],
        scalar: 0.8,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        shapes: ['circle', 'square'],
        scalar: 0.8,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    // Initial burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors,
      scalar: 1,
    })

    setTimeout(frame, 200)
  }, [])

  return fire
}

import { useMemo } from 'react'

export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2,
    }))
  }, [])

  const nebulaClouds = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 300 + 150,
      hue: i % 2 === 0 ? '201, 114, 138' : '83, 49, 124',
      opacity: Math.random() * 0.06 + 0.02,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }))
  }, [])

  return (
    <div className="nebula-bg">
      <svg
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {nebulaClouds.map(c => (
            <radialGradient key={`ng-${c.id}`} id={`nebula-${c.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={`rgb(${c.hue})`} stopOpacity={c.opacity * 3} />
              <stop offset="100%" stopColor={`rgb(${c.hue})`} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {nebulaClouds.map(c => (
          <ellipse
            key={c.id}
            cx={`${c.x}%`}
            cy={`${c.y}%`}
            rx={c.size}
            ry={c.size * 0.6}
            fill={`url(#nebula-${c.id})`}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0,0; ${Math.random() * 30 - 15},${Math.random() * 20 - 10}; 0,0`}
              dur={`${c.duration}s`}
              begin={`${c.delay}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        ))}

        {stars.map(star => (
          <circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size}
            fill="white"
            opacity={star.opacity}
          >
            <animate
              attributeName="opacity"
              values={`${star.opacity};${Math.min(star.opacity + 0.5, 1)};${star.opacity}`}
              dur={`${star.duration}s`}
              begin={`${star.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}

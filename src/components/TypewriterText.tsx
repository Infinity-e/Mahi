import { useTypewriter } from '../hooks/useTypewriter'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { sounds } from '../audio/soundEngine'
import { Eraser } from 'lucide-react'

interface TypewriterTextProps {
  text: string
  className?: string
  baseDelay?: number
  sound?: boolean
  onDone?: () => void
  ariaLabel?: string
}

export function TypewriterText({
  text,
  className,
  baseDelay = 26,
  sound = false,
  onDone,
  ariaLabel,
}: TypewriterTextProps) {
  const reducedMotion = useReducedMotion()
  const { displayed, phase, showAll } = useTypewriter({
    text,
    baseDelay,
    reducedMotion,
    onDone,
  })

  return (
    <div>
      <span
        className={`typewriter ${className ?? ''}`}
        aria-hidden={phase !== 'done'}
        style={{ display: 'block' }}
      >
        {displayed}
        {phase !== 'done' && (
          <span className="typewriter-caret" aria-hidden="true" />
        )}
      </span>
      <span className="visually-hidden">{ariaLabel ?? text}</span>
      {phase !== 'done' && (
        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn btn-soft"
            onClick={() => {
              showAll()
              if (sound) sounds.pluck()
            }}
          >
            <Eraser size={16} /> Show all text
          </button>
        </div>
      )}
    </div>
  )
}

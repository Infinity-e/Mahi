import { ArrowLeft, ArrowRight } from 'lucide-react'

interface SceneNavProps {
  onBack?: () => void
  onSkip?: () => void
  onContinue?: () => void
  continueLabel?: string
  isFirst?: boolean
  isLast?: boolean
}

export function SceneNav({ onBack, onSkip, onContinue, continueLabel = 'Continue', isFirst, isLast }: SceneNavProps) {
  if (isLast) return null
  return (
    <nav className="scene-nav" aria-label="Scene navigation">
      {onBack ? (
        <button type="button" className="btn btn-ghost" onClick={onBack} disabled={isFirst}>
          <ArrowLeft size={17} /> Back
        </button>
      ) : (
        <span />
      )}
      <span className="spacer" />
      {onSkip && (
        <button type="button" className="btn-skip" onClick={onSkip}>
          Skip for now
        </button>
      )}
      {onContinue && (
        <button type="button" className="btn btn-primary" onClick={onContinue}>
          {continueLabel} <ArrowRight size={17} />
        </button>
      )}
    </nav>
  )
}

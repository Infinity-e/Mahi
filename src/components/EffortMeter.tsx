import { HeartShape } from './HeartShape'

interface EffortMeterProps {
  progress: number
  sceneLabel: string
  milestoneLabel: string
}

export function EffortMeter({ progress, sceneLabel, milestoneLabel }: EffortMeterProps) {
  const clamped = Math.max(0, Math.min(100, progress))
  const dots = [15, 30, 45, 60, 75, 90]

  return (
    <div
      className="meter"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress through the experience. ${sceneLabel}. ${milestoneLabel}. This measures how much of the letter has been explored — it is not a measure of anything you owe.`}
      title={`Little Things, Real Effort — ${milestoneLabel}`}
    >
      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${clamped}%` }} />
        <div className="meter-dots" aria-hidden="true">
          {dots.map((d) => (
            <span key={d} className="meter-dot" style={{ left: `${d}%` }} />
          ))}
        </div>
        <div className="meter-heart" style={{ left: `${clamped}%` }} aria-hidden="true">
          <HeartShape size={20} />
        </div>
      </div>
      <div className="meter-caption">
        <span className="meter-label">Little Things, Real Effort</span>
        <span aria-hidden="true">{sceneLabel}</span>
      </div>
    </div>
  )
}

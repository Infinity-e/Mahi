import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, RotateCcw } from 'lucide-react'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { useExperience } from '../state/ExperienceContext'
import { sounds } from '../audio/soundEngine'

const heartSpots = [
  { top: '18%', left: '12%' },
  { top: '52%', left: '68%' },
  { top: '30%', left: '48%' },
]

export function SmileMissionScene() {
  const { config, markComplete, next, back, soundOn } = useExperience()
  const [found, setFound] = useState<number[]>([])
  const [note, setNote] = useState<number | null>(null)
  const complete = found.length === 3

  const tapHeart = (i: number) => {
    if (found.includes(i)) return
    const nextFound = [...found, i]
    setFound(nextFound)
    setNote(i)
    markComplete('mission')
    if (soundOn) sounds.sparkle()
    if (nextFound.length === 3 && soundOn) sounds.warm()
  }

  return (
    <section aria-label="One tiny mission">
      <SceneHeader
        kicker={config.scenes[10].kicker}
        title={config.scenes[10].title}
        subtitle={config.mission.intro}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mission-field"
        style={{ marginTop: 24 }}
      >
        {heartSpots.map((spot, i) => (
          <motion.button
            key={i}
            type="button"
            className={`mission-heart ${found.includes(i) ? 'found' : ''}`}
            style={{ top: spot.top, left: spot.left }}
            onClick={() => tapHeart(i)}
            aria-label={found.includes(i) ? `Heart ${i + 1} already found` : `Find heart ${i + 1}`}
            whileTap={{ scale: 0.85 }}
            animate={found.includes(i) ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Heart size={34} fill="currentColor" />
          </motion.button>
        ))}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            className="handwriting"
            style={{
              color: 'rgba(110,52,78,0.35)',
              fontSize: '1.4rem',
              textAlign: 'center',
              padding: '0 24px',
            }}
          >
            {complete ? 'three little hearts, three little truths' : `${3 - found.length} heart${3 - found.length === 1 ? '' : 's'} still hiding…`}
          </span>
        </div>
      </motion.div>

      <AnimatePresence>
        {note !== null && (
          <motion.div
            key={`note-${note}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="paper paper-stitched"
            style={{ marginTop: 22 }}
          >
            <p className="handwriting" style={{ fontSize: '1.35rem', lineHeight: 1.55, color: 'var(--ink)' }}>
              {config.mission.notes[note]}
            </p>
            <div style={{ marginTop: 12 }}>
              <button type="button" className="btn btn-ghost" onClick={() => setNote(null)}>
                Keep looking
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {complete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="paper paper-stitched completion-card"
          style={{ marginTop: 22 }}
        >
          <span style={{ color: 'var(--gold)', display: 'inline-block', marginBottom: 10 }}>
            <Heart size={30} fill="currentColor" />
          </span>
          <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: 10 }}>
            {config.mission.completeTitle}
          </h3>
          <p className="handwriting" style={{ fontSize: '1.25rem', color: 'var(--ink-soft)', maxWidth: 420, margin: '0 auto 18px' }}>
            {config.mission.completeText}
          </p>
          <button
            type="button"
            className="btn btn-soft"
            onClick={() => {
              setFound([])
              setNote(null)
            }}
          >
            <RotateCcw size={15} /> Hide the hearts again
          </button>
        </motion.div>
      )}

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('mission')
          next()
        }}
        onContinue={() => {
          markComplete('mission')
          next()
        }}
      />
    </section>
  )
}

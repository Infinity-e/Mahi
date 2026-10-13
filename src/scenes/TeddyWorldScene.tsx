import { useState } from 'react'
import { motion } from 'framer-motion'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { TeddySticker } from '../components/TeddySticker'
import { PaperNote } from '../components/PaperNote'
import { Starfield } from '../components/Starfield'
import { useExperience } from '../state/ExperienceContext'
import { sounds } from '../audio/soundEngine'
import type { TeddyConfig } from '../data/experience'

export function TeddyWorldScene() {
  const { config, markComplete, next, back, soundOn } = useExperience()
  const [active, setActive] = useState<TeddyConfig | null>(null)

  const tap = (t: TeddyConfig) => {
    setActive(t)
    markComplete('teddies')
    if (soundOn) sounds.sparkle()
  }

  return (
    <section aria-label="A tiny teddy-bear corner">
      <SceneHeader
        kicker={config.scenes[4].kicker}
        title={config.scenes[4].title}
        subtitle="A miniature world, tucked inside this one. Tap any little thing — each one has something to say."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="teddy-world"
      >
        <Starfield density={40} />
        <div
          style={{
            position: 'absolute',
            top: 18,
            right: 22,
            color: 'rgba(255,247,238,0.75)',
            fontFamily: 'var(--font-hand)',
            fontSize: '1.1rem',
          }}
          aria-hidden="true"
        >
          a cozy little night garden
        </div>
        <div className="teddy-shelf">
          {config.teddies.map((t, i) => (
            <motion.button
              key={t.id}
              type="button"
              className="teddy-item"
              onClick={() => tap(t)}
              aria-label={`${t.label}. Tap to read a note.`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.45 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="teddy-stage">
                <TeddySticker pose={t.pose} size={100} />
              </span>
              <span className="teddy-label">{t.label}</span>
            </motion.button>
          ))}
        </div>
        <p className="teddy-hint">
          scroll sideways · tap a little one · they each wrote you a note
        </p>
      </motion.div>

      <PaperNote
        open={active !== null}
        onClose={() => setActive(null)}
        title={active?.label}
        tapeColor="#DCD4F7"
      >
        {active?.message}
        <div style={{ marginTop: 14, fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
          — {config.sender}
        </div>
      </PaperNote>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('teddies')
          next()
        }}
        onContinue={() => {
          markComplete('teddies')
          next()
        }}
      />
    </section>
  )
}

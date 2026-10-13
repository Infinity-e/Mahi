import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { PaperNote } from '../components/PaperNote'
import { useExperience } from '../state/ExperienceContext'
import { sounds } from '../audio/soundEngine'
import type { NoteConfig } from '../data/experience'

const tapeColors = ['#F5C7D2', '#DCD4F7', '#E7C58A', '#E88FA7']

export function HiddenNotesScene() {
  const { config, markComplete, next, back, soundOn } = useExperience()
  const [active, setActive] = useState<NoteConfig | null>(null)

  const open = (n: NoteConfig) => {
    setActive(n)
    markComplete('notes')
    if (soundOn) sounds.unfold()
  }

  return (
    <section aria-label="Little things I wanted you to know">
      <SceneHeader
        kicker={config.scenes[5].kicker}
        title={config.scenes[5].title}
        subtitle="Small envelopes, folded slips, and taped paper. Each one opens gently — none of them require anything."
      />

      <div className="card-grid cols-2" style={{ marginTop: 24 }}>
        {config.hiddenNotes.map((n, i) => (
          <motion.button
            key={n.id}
            type="button"
            onClick={() => open(n)}
            className="note-slip"
            aria-label={`Open note: ${n.title}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={{ y: -4, rotate: i % 2 ? 0.6 : -0.6 }}
            whileTap={{ scale: 0.97 }}
            style={{
              textAlign: 'left',
              fontFamily: 'inherit',
              cursor: 'pointer',
              transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)`,
            }}
          >
            <span
              className="washi"
              aria-hidden="true"
              style={
                {
                  '--washi-color': tapeColors[i % tapeColors.length],
                  top: -9,
                  left: i % 2 === 0 ? -22 : undefined,
                  right: i % 2 === 0 ? undefined : -22,
                  transform: `rotate(${i % 2 === 0 ? -42 : 42}deg)`,
                  width: 64,
                  zIndex: 2,
                } as React.CSSProperties
              }
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--rose)' }}>
              <Mail size={16} />
              <span className="handwriting" style={{ fontSize: '1.3rem', color: 'var(--berry)' }}>
                {n.title}
              </span>
            </span>
            <span style={{ display: 'block', marginTop: 8, fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
              tap to unfold
            </span>
          </motion.button>
        ))}
      </div>

      <PaperNote open={active !== null} onClose={() => setActive(null)} title={active?.title}>
        {active?.message}
        <div style={{ marginTop: 14, fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
          — {config.sender}
        </div>
      </PaperNote>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('notes')
          next()
        }}
        onContinue={() => {
          markComplete('notes')
          next()
        }}
      />
    </section>
  )
}

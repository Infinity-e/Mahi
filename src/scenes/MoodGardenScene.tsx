import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { MoodArt } from '../components/MoodArt'
import { useExperience } from '../state/ExperienceContext'
import { sounds } from '../audio/soundEngine'
import type { MoodId } from '../data/experience'

export function MoodGardenScene() {
  const { config, mood, selectMood, markComplete, navigate, back, next, soundOn } =
    useExperience()

  const selected = config.moods.find((m) => m.id === mood)

  const choose = (id: MoodId) => {
    selectMood(id)
    markComplete('moods')
    if (soundOn) sounds.pluck()
  }

  return (
    <section aria-label="The mood garden">
      <SceneHeader
        kicker={config.scenes[2].kicker}
        title={config.scenes[2].title}
        subtitle="Before I say anything more, how are you feeling right now? You don't have to make it easier for me. Just choose whatever feels closest."
      />

      <div className="mood-grid" style={{ marginTop: 24 }} role="group" aria-label="Choose how you feel">
        {config.moods.map((m, i) => (
          <motion.button
            key={m.id}
            type="button"
            className={`mood-card ${mood === m.id ? 'selected' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => choose(m.id)}
            aria-pressed={mood === m.id}
            aria-label={m.label}
          >
            <span className="mood-visual">
              <MoodArt visual={m.visual} />
            </span>
            <span className="mood-label">{m.label}</span>
            {mood === m.id && (
              <span className="chip" style={{ fontSize: '0.68rem' }}>
                feeling chosen
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="paper paper-stitched"
            style={{ marginTop: 26 }}
          >
            <p className="handwriting" style={{ fontSize: '1.35rem', lineHeight: 1.55, color: 'var(--ink)' }}>
              {selected.message}
            </p>
            <div className="row" style={{ marginTop: 22, flexWrap: 'wrap', gap: 10 }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate(selected.target)}
              >
                {selected.buttonLabel} <ArrowRight size={17} />
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => selectMood(null)}
              >
                <RefreshCw size={15} /> Change my feeling
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('moods')
          next()
        }}
        onContinue={() => {
          markComplete('moods')
          next()
        }}
      />
    </section>
  )
}

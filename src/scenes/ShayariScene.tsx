import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Languages } from 'lucide-react'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { WashiTape } from '../components/WashiTape'
import { useExperience } from '../state/ExperienceContext'
import { sounds } from '../audio/soundEngine'

export function ShayariScene() {
  const { config, markComplete, next, back, soundOn } = useExperience()
  const [index, setIndex] = useState(0)
  const [showEnglish, setShowEnglish] = useState(false)
  const verse = config.shayari[index]

  useEffect(() => {
    markComplete('shayari')
  }, [markComplete])

  const go = (dir: number) => {
    if (soundOn) sounds.pluck()
    setIndex((i) => Math.min(config.shayari.length - 1, Math.max(0, i + dir)))
  }

  const lines = showEnglish ? verse.english : verse.lines

  return (
    <section aria-label="Kuch Baatein Dil Se">
      <SceneHeader
        kicker={config.scenes[7].kicker}
        title={config.scenes[7].title}
        subtitle="A few original verses, written for you. One at a time, the way they were meant to arrive."
      />

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="paper paper-stitched shayari-card"
        style={{ marginTop: 24, transform: 'rotate(-0.5deg)' }}
      >
        <WashiTape color="#E7C58A" style={{ top: -12, left: 36, transform: 'rotate(-5deg)' }} />
        <div className="shayari-lines" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${showEnglish}`}
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.6 }}
            >
              {lines.map((line, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'block' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.25, duration: 0.5 }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="shayari-nav">
          <button
            type="button"
            className="icon-btn"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Previous verse"
            style={{ opacity: index === 0 ? 0.35 : 1 }}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="shayari-dots" role="tablist" aria-label="Verses">
            {config.shayari.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Verse ${i + 1}`}
                className={`shayari-dot ${i === index ? 'active' : ''}`}
                onClick={() => {
                  setIndex(i)
                  if (soundOn) sounds.pluck()
                }}
              />
            ))}
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={() => go(1)}
            disabled={index === config.shayari.length - 1}
            aria-label="Next verse"
            style={{ opacity: index === config.shayari.length - 1 ? 0.35 : 1 }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div style={{ marginTop: 18 }}>
          <button
            type="button"
            className="btn btn-soft"
            onClick={() => {
              setShowEnglish((v) => !v)
              if (soundOn) sounds.unfold()
            }}
            aria-pressed={showEnglish}
          >
            <Languages size={16} /> {showEnglish ? 'मूल शेर में पढ़ें' : 'Read the English meaning'}
          </button>
        </div>
      </motion.div>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('shayari')
          next()
        }}
        onContinue={() => {
          markComplete('shayari')
          next()
        }}
      />
    </section>
  )
}

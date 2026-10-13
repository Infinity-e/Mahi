import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { useExperience } from '../state/ExperienceContext'
import { sounds } from '../audio/soundEngine'
import type { WallMessage } from '../data/experience'

const rotations = [-2.2, 1.4, -1.1, 2.4, -1.8, 0.9, -2.6, 1.8]
const tints = ['#fffdf8', '#fff5ee', '#fdf3f6', '#f5f1ff']

export function MessageWallScene() {
  const { config, markComplete, next, back, soundOn } = useExperience()
  const [expanded, setExpanded] = useState<number | null>(null)

  const open = (m: WallMessage) => {
    setExpanded(m.id)
    markComplete('wall')
    if (soundOn) sounds.pluck()
  }

  return (
    <section aria-label="Words from the heart">
      <SceneHeader
        kicker={config.scenes[6].kicker}
        title={config.scenes[6].title}
        subtitle="A wall of small truths, pinned like a scrapbook. Tap any card to bring it forward — or leave them all pinned."
      />

      <div className="wall-grid" style={{ marginTop: 24 }}>
        {config.wall.map((m, i) => (
          <motion.button
            key={m.id}
            type="button"
            className={`wall-card ${expanded === m.id ? 'expanded' : ''}`}
            onClick={() => (expanded === m.id ? setExpanded(null) : open(m))}
            aria-expanded={expanded === m.id}
            initial={{ opacity: 0, y: 16, rotate: rotations[i % rotations.length] }}
            animate={{ opacity: 1, y: 0, rotate: expanded === m.id ? 0 : rotations[i % rotations.length] }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            style={{
              background: `linear-gradient(160deg, ${tints[i % tints.length]}, #fff1e2)`,
              zIndex: expanded === m.id ? 3 : 1,
            }}
          >
            <span className="pin" aria-hidden="true" />
            <span style={{ lineHeight: 1.55, fontSize: expanded === m.id ? '1.05rem' : '0.92rem' }}>
              {m.text}
            </span>
            <AnimatePresence>
              {expanded === m.id && m.secondary && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-hand)',
                    fontSize: '1.15rem',
                    color: 'var(--rose)',
                    overflow: 'hidden',
                  }}
                >
                  {m.secondary}
                </motion.span>
              )}
            </AnimatePresence>
            <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {expanded === m.id ? (
                <span className="icon-btn" style={{ width: 30, height: 30 }} aria-hidden="true">
                  <X size={14} />
                </span>
              ) : (
                <span style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', alignSelf: 'flex-end' }}>
                  tap to open
                </span>
              )}
            </span>
          </motion.button>
        ))}
      </div>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('wall')
          next()
        }}
        onContinue={() => {
          markComplete('wall')
          next()
        }}
      />
    </section>
  )
}

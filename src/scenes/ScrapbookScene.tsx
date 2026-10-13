import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { ImageIcon } from 'lucide-react'
import { useExperience } from '../state/ExperienceContext'
import { motion } from 'framer-motion'

export function ScrapbookScene() {
  const { config, markComplete, next, back } = useExperience()
  const { scrapbook } = config

  return (
    <section aria-label="A few little pieces of us">
      <SceneHeader
        kicker={config.scenes[8].kicker}
        title={scrapbook.emptyStateTitle}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="paper paper-stitched"
        style={{
          marginTop: 24,
          textAlign: 'center',
          padding: '48px 28px',
        }}
      >
        <span
          style={{
            display: 'inline-grid',
            placeItems: 'center',
            width: 64,
            height: 64,
            borderRadius: 20,
            background: 'rgba(232,143,167,0.16)',
            color: 'var(--rose)',
            marginBottom: 18,
          }}
        >
          <ImageIcon size={28} />
        </span>
        <p className="handwriting" style={{ fontSize: '1.35rem', lineHeight: 1.6, color: 'var(--ink)', maxWidth: 460, margin: '0 auto' }}>
          {scrapbook.emptyStateText}
        </p>
        <p style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
          This corner stays empty until real memories are added — no placeholders, no made-up moments.
        </p>
      </motion.div>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('scrapbook')
          next()
        }}
        onContinue={() => {
          markComplete('scrapbook')
          next()
        }}
      />
    </section>
  )
}

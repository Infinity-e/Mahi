import { useState } from 'react'
import { motion } from 'framer-motion'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { AccessibleDialog } from '../components/AccessibleDialog'
import { useExperience } from '../state/ExperienceContext'
import { sounds } from '../audio/soundEngine'
import type { OpenWhenConfig } from '../data/experience'

export function OpenWhenScene() {
  const { config, markComplete, next, back, soundOn } = useExperience()
  const [active, setActive] = useState<OpenWhenConfig | null>(null)

  const open = (e: OpenWhenConfig) => {
    setActive(e)
    markComplete('openWhen')
    if (soundOn) sounds.unfold()
  }

  return (
    <section aria-label="Open when envelopes">
      <SceneHeader
        kicker={config.scenes[9].kicker}
        title={config.scenes[9].title}
        subtitle="Six envelopes for six moments. They open only when you choose — never on their own, and never to pull you back."
      />

      <div className="card-grid cols-2" style={{ marginTop: 24 }}>
        {config.openWhen.map((e, i) => (
          <motion.button
            key={e.id}
            type="button"
            onClick={() => open(e)}
            aria-label={`Open envelope: ${e.title}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="envelope"
            style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', maxWidth: '100%' }}
          >
            <span className="envelope-flap" aria-hidden="true" />
            <span className="envelope-body" style={{ display: 'grid' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <span className="handwriting" style={{ fontSize: '1.25rem', color: 'var(--berry)', lineHeight: 1.25 }}>
                  {e.title}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--ink-soft)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  tap to open
                </span>
              </span>
            </span>
            <svg
              width="26"
              height="26"
              viewBox="0 0 64 64"
              aria-hidden="true"
              style={{ position: 'absolute', bottom: 10, right: 12, color: 'var(--rose)', zIndex: 3 }}
            >
              <path d="M32 52C16 41 6 31 6 21.5 6 14.5 11.5 9 19 9c4.5 0 9.3 2.6 13 7 3.7-4.4 8.5-7 13-7 7.5 0 13 5.5 13 12.5C58 31 48 41 32 52z" fill="currentColor" />
              <circle cx="32" cy="30" r="6" fill="#E7C58A" />
            </svg>
          </motion.button>
        ))}
      </div>

      <AccessibleDialog
        open={active !== null}
        onClose={() => setActive(null)}
        label={active?.title ?? 'Envelope'}
      >
        <div className="paper paper-stitched" style={{ boxShadow: 'none', border: 'none', padding: '12px 8px 4px' }}>
          <h3 className="handwriting" style={{ fontSize: '1.6rem', color: 'var(--berry)', marginBottom: 12 }}>
            {active?.title}
          </h3>
          <p className="handwriting" style={{ fontSize: '1.3rem', lineHeight: 1.55, color: 'var(--ink)' }}>
            {active?.message}
          </p>
          <p style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--ink-soft)' }}>
            This envelope stays in your hands. There is no reminder behind it.
          </p>
        </div>
      </AccessibleDialog>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('openWhen')
          next()
        }}
        onContinue={() => {
          markComplete('openWhen')
          next()
        }}
      />
    </section>
  )
}

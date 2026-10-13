import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { useExperience } from '../state/ExperienceContext'
import { sounds } from '../audio/soundEngine'
import type { CouponConfig } from '../data/experience'

export function CouponsScene() {
  const { config, markComplete, next, back, soundOn } = useExperience()
  const [open, setOpen] = useState<string | null>(null)

  const tap = (c: CouponConfig) => {
    setOpen(open === c.id ? null : c.id)
    markComplete('coupons')
    if (soundOn) sounds.pluck()
  }

  return (
    <section aria-label="Little things I can do">
      <SceneHeader
        kicker={config.scenes[12].kicker}
        title={config.scenes[12].title}
        subtitle={config.couponsNote}
      />

      <div className="coupon-grid" style={{ marginTop: 24 }}>
        {config.coupons.map((c, i) => (
          <motion.button
            key={c.id}
            type="button"
            className="coupon"
            onClick={() => tap(c)}
            aria-expanded={open === c.id}
            initial={{ opacity: 0, y: 16, rotate: i % 2 ? 0.7 : -0.7 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            style={{ textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            <span className="coupon-stub" aria-hidden="true">
              for {config.recipient}
            </span>
            <span className="coupon-title">{c.title}</span>
            <AnimatePresence initial={false}>
              {open === c.id && (
                <motion.span
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ display: 'block', overflow: 'hidden' }}
                >
                  <span className="coupon-detail">{c.detail}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: '0.78rem', color: 'var(--rose)' }}>
                    <Heart size={12} fill="currentColor" /> yours if you ever want it
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
            {!open || open !== c.id ? (
              <span style={{ display: 'block', marginTop: 6, fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
                tap to open
              </span>
            ) : null}
          </motion.button>
        ))}
      </div>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('coupons')
          next()
        }}
        onContinue={() => {
          markComplete('coupons')
          next()
        }}
      />
    </section>
  )
}

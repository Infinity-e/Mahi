import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Gift, RotateCcw } from 'lucide-react'
import { GiftBox } from '../components/GiftBox'
import { useExperience } from '../state/ExperienceContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { sounds } from '../audio/soundEngine'
import { nextUnvisited } from '../utils/progress'

type BoxState = 'closed' | 'opening' | 'opened'

export function OpeningScene() {
  const { config, scenes, navigate, markComplete, completed, replay, soundOn } =
    useExperience()
  const reducedMotion = useReducedMotion()
  const [boxState, setBoxState] = useState<BoxState>('closed')
  const hasProgress = completed.length > 0

  const openGift = () => {
    setBoxState('opening')
    if (soundOn) sounds.chime()
    window.setTimeout(() => {
      setBoxState('opened')
      markComplete('opening')
      window.setTimeout(() => {
        const target = nextUnvisited(scenes, [...completed, 'opening'])
        navigate(target ?? 'handwriting')
      }, reducedMotion ? 100 : 1400)
    }, reducedMotion ? 100 : 1200)
  }

  const skip = () => {
    markComplete('opening')
    navigate('handwriting')
  }

  const hearts = [0, 1, 2, 3, 4, 5, 6, 7]

  return (
    <section
      aria-label="Opening"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 20px 60px',
        background:
          'radial-gradient(900px 600px at 75% 15%, rgba(220,212,247,0.5), transparent 60%), radial-gradient(700px 500px at 10% 80%, rgba(245,199,210,0.4), transparent 55%), linear-gradient(180deg, #FFF7EE 0%, #FBE9EF 55%, #F3DFF0 100%)',
      }}
    >
      {hearts.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className="float-anim"
          style={{
            position: 'absolute',
            left: `${8 + i * 11}%`,
            top: `${12 + (i % 4) * 22}%`,
            color: i % 3 === 0 ? 'var(--gold)' : 'var(--rose)',
            opacity: 0.5,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${5 + (i % 3) * 1.6}s`,
          }}
        >
          <Heart size={12 + (i % 4) * 5} fill="currentColor" />
        </span>
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <span
          key={`star-${i}`}
          aria-hidden="true"
          className="twinkle-anim"
          style={{
            position: 'absolute',
            left: `${12 + i * 8.5}%`,
            top: `${8 + (i % 5) * 20}%`,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'var(--gold)',
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 620, margin: '0 auto' }}
      >
        <p className="scene-kicker handwriting" style={{ fontSize: '1.5rem' }}>
          Hey, you.
        </p>
        <h1
          className="serif"
          style={{
            fontSize: 'clamp(2.4rem, 9vw, 4.2rem)',
            lineHeight: 1.1,
            marginBottom: 6,
          }}
        >
          A Little World
          <br />
          Made for You
        </h1>
        <p
          className="handwriting"
          style={{
            fontSize: 'clamp(1.15rem, 4vw, 1.45rem)',
            color: 'var(--ink-soft)',
            maxWidth: 460,
            margin: '10px auto 0',
            lineHeight: 1.5,
          }}
        >
          {config.openingNote}
        </p>

        <div style={{ margin: '34px 0 8px' }}>
          <GiftBox state={boxState} recipient={config.recipient} reducedMotion={reducedMotion} />
        </div>

        {boxState === 'closed' && !hasProgress && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="handwriting" style={{ fontSize: '1.2rem', color: 'var(--ink)', maxWidth: 480, margin: '0 auto 20px', lineHeight: 1.5 }}>
              {config.openingLine}
            </p>
            <div className="row" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary" onClick={openGift}>
                <Gift size={18} /> {config.openingButton}
              </button>
              <button type="button" className="btn-skip" onClick={skip}>
                {config.openingSecondary}
              </button>
            </div>
          </motion.div>
        )}

        {boxState === 'closed' && hasProgress && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="stack"
            style={{ alignItems: 'center' }}
          >
            <p className="handwriting" style={{ fontSize: '1.2rem', color: 'var(--ink-soft)', maxWidth: 440 }}>
              Welcome back. Your place in this little world is still saved.
            </p>
            <div className="row" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary" onClick={openGift}>
                <Gift size={18} /> {config.continueButton}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  replay()
                  setBoxState('closed')
                }}
              >
                <RotateCcw size={16} /> {config.startOverButton}
              </button>
            </div>
            <button type="button" className="btn-skip" onClick={openGift}>
              Watch the opening again
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { TypewriterText } from '../components/TypewriterText'
import { WashiTape } from '../components/WashiTape'
import { useExperience } from '../state/ExperienceContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { sounds } from '../audio/soundEngine'

export function HandwritingScene() {
  const { config, markComplete, next, back, sceneIndex, scenes, soundOn } = useExperience()
  const reducedMotion = useReducedMotion()

  return (
    <section aria-label="Finding the right words">
      <SceneHeader
        kicker={config.scenes[1].kicker}
        title={config.scenes[1].title}
        subtitle="One sheet of paper. One honest beginning."
      />

      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="paper paper-stitched"
        style={{ marginTop: 24, transform: 'rotate(-0.4deg)' }}
      >
        <WashiTape color="#DCD4F7" style={{ top: -12, left: 40, transform: 'rotate(-6deg)' }} />
        <WashiTape color="#F5C7D2" style={{ top: -12, right: 40, transform: 'rotate(5deg)' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <p
              className="handwriting ink-line"
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                color: 'var(--berry)',
                lineHeight: 1.3,
                display: 'inline-block',
                marginBottom: 18,
              }}
            >
              {config.introTitle}
            </p>
          </div>
          <svg
            width="54"
            height="70"
            viewBox="0 0 54 70"
            aria-hidden="true"
            className={reducedMotion ? undefined : 'sway-anim'}
            style={{ flex: 'none', marginTop: 4 }}
          >
            <g transform="rotate(24 27 35)">
              <path d="M27 2 L33 26 L27 68 L21 26 Z" fill="#6E344E" />
              <path d="M27 2 L33 26 L27 30 L21 26 Z" fill="#E88FA7" />
              <ellipse cx="27" cy="6" rx="3.4" ry="4.6" fill="#E7C58A" />
              <path d="M21 26 L33 26 L32.2 30 L21.8 30 Z" fill="#E7C58A" />
            </g>
            <path d="M6 62 q10 4 20 0 t20 0" stroke="#E88FA7" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        <TypewriterText
          text={config.introText}
          baseDelay={reducedMotion ? 0 : 26}
          sound={soundOn}
          onDone={() => {
            if (soundOn) sounds.softTick()
          }}
        />
      </motion.div>

      <SceneNav
        isFirst
        onBack={back}
        onSkip={() => {
          markComplete('handwriting')
          next()
        }}
        onContinue={() => {
          markComplete('handwriting')
          next()
        }}
      />
      <span className="visually-hidden" aria-live="polite">
        Scene {sceneIndex + 1} of {scenes.length}
      </span>
    </section>
  )
}

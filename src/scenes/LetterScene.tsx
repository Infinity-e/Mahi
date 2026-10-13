import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { TypewriterText } from '../components/TypewriterText'
import { WashiTape } from '../components/WashiTape'
import { useExperience } from '../state/ExperienceContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { sounds } from '../audio/soundEngine'

export function LetterScene() {
  const { config, markComplete, next, back, soundOn } = useExperience()
  const reducedMotion = useReducedMotion()
  const [sealed, setSealed] = useState(true)
  const [openCard, setOpenCard] = useState<'responsibilities' | 'commitments' | null>(null)

  const openSeal = () => {
    if (!sealed) return
    setSealed(false)
    markComplete('letter')
    if (soundOn) sounds.unfold()
  }

  const fullLetter = [
    config.letter.salutation,
    '',
    ...config.letter.paragraphs,
    '',
    config.letter.signature,
  ].join('\n')

  return (
    <section aria-label="The apology letter">
      <SceneHeader
        kicker={config.scenes[3].kicker}
        title={config.scenes[3].title}
        subtitle="A letter, on real paper, with a seal that only you can open."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="paper paper-stitched"
        style={{ marginTop: 24, transform: 'rotate(0.4deg)' }}
      >
        <WashiTape color="#F5C7D2" style={{ top: -12, left: '50%', transform: 'translateX(-50%) rotate(-3deg)' }} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
          <svg width="46" height="58" viewBox="0 0 46 58" aria-hidden="true" className="float-anim" style={{ animationDuration: '6s' }}>
            <path d="M23 50 C10 40 4 31 4 22 C4 14 10 9 16 9 C19.5 9 22 11 23 13 C24 11 26.5 9 30 9 C36 9 42 14 42 22 C42 31 36 40 23 50z" fill={sealed ? '#E88FA7' : '#F5C7D2'} stroke="rgba(110,52,78,0.2)" strokeWidth="1" />
            {sealed && (
              <circle cx="23" cy="26" r="5" fill="#E7C58A" />
            )}
          </svg>
        </div>

        {sealed ? (
          <div className="center" style={{ padding: '30px 10px' }}>
            <p className="handwriting" style={{ fontSize: '1.3rem', color: 'var(--ink-soft)', maxWidth: 380, margin: '0 auto 20px' }}>
              Sealed with a heart. Tap the seal when you're ready to read it — or skip ahead, it will keep.
            </p>
            <motion.button
              type="button"
              className="btn btn-primary"
              onClick={openSeal}
              whileTap={{ scale: 0.95 }}
              aria-label="Open the heart seal and read the letter"
            >
              Open the seal
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <TypewriterText
              text={fullLetter}
              baseDelay={reducedMotion ? 0 : 14}
              sound={soundOn}
              ariaLabel={fullLetter}
            />
          </motion.div>
        )}
      </motion.div>

      <div className="card-grid cols-2" style={{ marginTop: 22 }}>
        <ExpandableCard
          title="A few things I should have handled better"
          items={config.letter.responsibilities}
          open={openCard === 'responsibilities'}
          onToggle={() => {
            setOpenCard(openCard === 'responsibilities' ? null : 'responsibilities')
            if (soundOn) sounds.pluck()
          }}
        />
        <ExpandableCard
          title="What I will try to do differently"
          items={config.letter.commitments}
          open={openCard === 'commitments'}
          onToggle={() => {
            setOpenCard(openCard === 'commitments' ? null : 'commitments')
            if (soundOn) sounds.pluck()
          }}
        />
      </div>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('letter')
          next()
        }}
        onContinue={() => {
          markComplete('letter')
          next()
        }}
      />
    </section>
  )
}

function ExpandableCard({
  title,
  items,
  open,
  onToggle,
}: {
  title: string
  items: string[]
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="paper" style={{ padding: '20px' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          width: '100%',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          padding: 0,
        }}
      >
        <h3 className="handwriting" style={{ fontSize: '1.35rem', color: 'var(--berry)' }}>
          {title}
        </h3>
        <ChevronDown
          size={18}
          style={{
            flex: 'none',
            transition: 'transform 0.3s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--rose)',
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden', margin: 0, padding: 0, listStyle: 'none' }}
          >
            {items.map((item, i) => (
              <li
                key={i}
                className="handwriting"
                style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.5,
                  color: 'var(--ink)',
                  padding: '10px 0 0 20px',
                  position: 'relative',
                }}
              >
                <span aria-hidden="true" style={{ position: 'absolute', left: 0, color: 'var(--rose)' }}>
                  ·
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

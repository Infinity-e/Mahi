import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Heart, Mail, RotateCcw } from 'lucide-react'
import { SceneHeader } from '../components/SceneHeader'
import { useExperience } from '../state/ExperienceContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { sounds } from '../audio/soundEngine'
import type { ResponseId } from '../data/experience'

const choiceIcons: Record<ResponseId, typeof Heart> = {
  talk: Mail,
  time: Heart,
  forgive: Check,
  understand: Copy,
}

export function FinalScene() {
  const {
    config,
    response,
    selectResponse,
    markComplete,
    completed,
    scenes,
    replay,
    soundOn,
  } = useExperience()
  const reducedMotion = useReducedMotion()
  const [written, setWritten] = useState('')
  const [copied, setCopied] = useState(false)
  const [actionResult, setActionResult] = useState(false)

  useEffect(() => {
    markComplete('final')
  }, [markComplete])

  const allDone = scenes.every((s) => completed.includes(s.id))
  const selected = config.finalResponse.choices.find((c) => c.id === response)
  const completionBranch = response ?? 'none'
  const completionText = config.completion.branches[completionBranch]

  const choose = (id: ResponseId) => {
    selectResponse(id)
    markComplete('final')
    setActionResult(false)
    if (soundOn) sounds.warm()
  }

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(written)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section aria-label="Your words">
      <SceneHeader
        kicker={config.scenes[scenes.length - 1].kicker}
        title={config.finalResponse.heading}
        subtitle={config.finalResponse.subheading}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginTop: 24 }}
        className="center"
      >
        <svg
          width="120"
          height="82"
          viewBox="0 0 120 82"
          role="img"
          aria-label="A sealed envelope"
          style={{ marginBottom: 10 }}
        >
          <rect x="10" y="24" width="100" height="52" rx="6" fill="#FFFDF6" stroke="rgba(110,52,78,0.2)" strokeWidth="1.4" />
          <path d="M10 24 L60 52 L110 24" fill="#FFE9D6" stroke="rgba(110,52,78,0.2)" strokeWidth="1.4" />
          <circle cx="60" cy="50" r="7" fill="#E88FA7" />
          <path d="M60 45 C57 42 55 41 55 38.5 C55 36 57 34.5 59 34.5 C59.8 34.5 60 35 60 35.5 C60 35 60.2 34.5 61 34.5 C63 34.5 65 36 65 38.5 C65 41 63 42 60 45z" fill="#E7C58A" />
        </svg>
      </motion.div>

      <div className="choice-grid" style={{ marginTop: 22 }} role="group" aria-label="How are you feeling?">
        {config.finalResponse.choices.map((c, i) => {
          const Icon = choiceIcons[c.id]
          return (
            <motion.button
              key={c.id}
              type="button"
              className={`choice-btn ${response === c.id ? 'selected' : ''}`}
              onClick={() => choose(c.id)}
              aria-pressed={response === c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="choice-heart" aria-hidden="true">
                <Icon size={17} />
              </span>
              {c.label}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            className="response-panel paper paper-stitched"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="handwriting" style={{ fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>
              {selected.message}
            </p>

            {selected.id === 'understand' && (
              <div style={{ marginTop: 20 }}>
                <label
                  htmlFor="her-message"
                  className="handwriting"
                  style={{ display: 'block', fontSize: '1.2rem', color: 'var(--berry)', marginBottom: 8 }}
                >
                  {config.finalResponse.writeLabel}
                </label>
                <textarea
                  id="her-message"
                  value={written}
                  onChange={(e) => setWritten(e.target.value)}
                  placeholder="Write as much or as little as you want…"
                />
                <div className="privacy-notice" role="note">
                  <Heart size={15} style={{ flex: 'none', marginTop: 2 }} fill="currentColor" />
                  <span>{config.finalResponse.privacyNotice}</span>
                </div>
                <div className="row" style={{ marginTop: 14, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-soft"
                    onClick={copyMessage}
                    disabled={written.trim().length === 0}
                    style={{ opacity: written.trim().length === 0 ? 0.5 : 1 }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? config.finalResponse.copiedButton : config.finalResponse.copyButton}
                  </button>
                </div>
              </div>
            )}

            {selected.actionLabel && (
              <div style={{ marginTop: 22 }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setActionResult(true)
                    if (soundOn) sounds.chime()
                  }}
                >
                  {selected.actionLabel}
                </button>
                <AnimatePresence>
                  {actionResult && selected.actionResult && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0 }}
                      className="handwriting"
                      style={{
                        fontSize: '1.3rem',
                        lineHeight: 1.55,
                        color: 'var(--ink-soft)',
                        marginTop: 14,
                        overflow: 'hidden',
                      }}
                    >
                      {selected.actionResult}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {allDone && (
          <motion.div
            key="completion"
            className="paper paper-stitched completion-card"
            style={{ marginTop: 28 }}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <motion.span
              style={{ display: 'inline-block', color: 'var(--rose)', marginBottom: 12 }}
              animate={reducedMotion ? {} : { scale: [1, 1.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4 }}
              aria-hidden="true"
            >
              <Heart size={34} fill="currentColor" />
            </motion.span>
            <h2 className="serif" style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginBottom: 16 }}>
              {config.completion.title}
            </h2>
            <div className="stack" style={{ maxWidth: 520, margin: '0 auto' }}>
              {completionText.map((para, i) => (
                <p
                  key={i}
                  className="handwriting"
                  style={{ fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--ink)' }}
                >
                  {para}
                </p>
              ))}
            </div>
            <div style={{ marginTop: 26 }}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  replay()
                  if (soundOn) sounds.unfold()
                }}
              >
                <RotateCcw size={16} /> Replay this little world
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p
        className="visually-hidden"
        aria-live="polite"
        style={{ marginTop: 20 }}
      >
        {allDone
          ? 'You have reached the end of the letter. You do not have to choose an answer.'
          : `Scene ${scenes.length} of ${scenes.length}`}
      </p>
    </section>
  )
}

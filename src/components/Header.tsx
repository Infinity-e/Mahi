import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, X, RotateCcw } from 'lucide-react'
import { EffortMeter } from './EffortMeter'
import { SoundToggle } from './SoundToggle'
import type { SceneId } from '../data/experience'

interface HeaderProps {
  scenes: { id: SceneId; title: string }[]
  currentScene: SceneId
  completed: SceneId[]
  progress: number
  milestoneLabel: string
  soundOn: boolean
  onToggleSound: () => void
  onNavigate: (id: SceneId) => void
  onReplay: () => void
}

export function Header({
  scenes,
  currentScene,
  completed,
  progress,
  milestoneLabel,
  soundOn,
  onToggleSound,
  onNavigate,
  onReplay,
}: HeaderProps) {
  const [open, setOpen] = useState(false)
  const currentIndex = scenes.findIndex((s) => s.id === currentScene)
  const sceneLabel = `Scene ${currentIndex + 1} of ${scenes.length}`

  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              <Heart size={17} fill="currentColor" />
            </span>
            <span className="brand-text">
              <span className="brand-title">A Little World Made for You</span>
              <span className="brand-title-short">A Little World</span>
              <span className="brand-sub">from Vipin</span>
            </span>
          </div>
          <div className="header-spacer" />
          <EffortMeter
            progress={progress}
            sceneLabel={sceneLabel}
            milestoneLabel={milestoneLabel}
          />
          <SoundToggle on={soundOn} onToggle={onToggleSound} />
          <button
            type="button"
            className="icon-btn"
            onClick={() => setOpen(true)}
            aria-label="Open scene menu"
            aria-expanded={open}
          >
            <Menu size={19} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <div className="menu-panel">
            <div className="menu-backdrop" onClick={() => setOpen(false)} />
            <motion.nav
              className="menu-card"
              role="dialog"
              aria-modal="true"
              aria-label="Scene menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="menu-close-row">
                <div>
                  <h2 className="serif">Little map</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                    Every scene is optional. Jump anywhere you like.
                  </p>
                </div>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <ul className="menu-list">
                {scenes.map((s, i) => {
                  const visited = completed.includes(s.id)
                  const current = s.id === currentScene
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        className={`menu-item ${visited ? 'visited' : ''} ${current ? 'current' : ''}`}
                        onClick={() => {
                          setOpen(false)
                          onNavigate(s.id)
                        }}
                        aria-current={current ? 'true' : undefined}
                      >
                        <span className="menu-check" aria-hidden="true">
                          <Heart size={11} fill="currentColor" />
                        </span>
                        <span style={{ flex: 1 }}>
                          <span style={{ display: 'block' }}>{s.title}</span>
                          <span
                            style={{
                              display: 'block',
                              fontSize: '0.72rem',
                              color: 'var(--ink-soft)',
                            }}
                          >
                            {i + 1} of {scenes.length}
                            {visited ? ' · visited' : ''}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div style={{ marginTop: 18 }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setOpen(false)
                    onReplay()
                  }}
                >
                  <RotateCcw size={16} /> Replay the whole experience
                </button>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

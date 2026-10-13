import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { Mic } from 'lucide-react'
import { useExperience } from '../state/ExperienceContext'

export function VoiceNoteScene() {
  const { config, markComplete, next, back } = useExperience()
  const { voiceNote } = config

  return (
    <section aria-label="From my voice">
      <SceneHeader
        kicker={config.scenes[11].kicker}
        title={config.scenes[11].title}
        subtitle={voiceNote.caption}
      />

      <div className="paper paper-stitched" style={{ marginTop: 24, textAlign: 'center', padding: '40px 28px' }}>
        <span
          style={{
            display: 'inline-grid',
            placeItems: 'center',
            width: 60,
            height: 60,
            borderRadius: 20,
            background: 'rgba(232,143,167,0.16)',
            color: 'var(--rose)',
            marginBottom: 16,
          }}
        >
          <Mic size={26} />
        </span>
        <h3 className="handwriting" style={{ fontSize: '1.5rem', color: 'var(--berry)', marginBottom: 8 }}>
          {voiceNote.fallbackTitle}
        </h3>
        <p style={{ color: 'var(--ink-soft)', maxWidth: 440, margin: '0 auto 18px', lineHeight: 1.6 }}>
          {voiceNote.fallbackText}
        </p>
        <div className="waveform" aria-hidden="true" style={{ justifyContent: 'center', opacity: 0.4 }}>
          {[0.5, 0.9, 0.6, 1, 0.7, 0.9, 0.5, 0.8, 0.6, 1, 0.7, 0.5].map((h, i) => (
            <span key={i} className="wave-bar paused" style={{ height: `${h * 100}%` }} />
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
          To add a real recording, drop a file at <code>public/assets/audio/voice-note.mp3</code> and set <code>voiceNote.enabled = true</code> in <code>src/data/experience.ts</code>.
        </p>
      </div>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('voiceNote')
          next()
        }}
        onContinue={() => {
          markComplete('voiceNote')
          next()
        }}
      />
      <span className="visually-hidden">
        Play, pause, and replay controls are unavailable until a recording is added.
      </span>
    </section>
  )
}

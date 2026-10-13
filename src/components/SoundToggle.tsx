import { Volume2, VolumeX } from 'lucide-react'

interface SoundToggleProps {
  on: boolean
  onToggle: () => void
}

export function SoundToggle({ on, onToggle }: SoundToggleProps) {
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={onToggle}
      aria-pressed={on}
      aria-label={on ? 'Mute music and sound effects' : 'Turn on gentle music and sound effects'}
      title={on ? 'Music and sound on' : 'Music and sound off'}
    >
      {on ? <Volume2 size={19} /> : <VolumeX size={19} />}
    </button>
  )
}

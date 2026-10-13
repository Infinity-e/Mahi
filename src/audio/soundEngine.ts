let ctx: AudioContext | null = null
let enabled = false

export function setSoundEnabled(value: boolean): void {
  enabled = value
}

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext
      if (!AC) return null
      ctx = new AC()
    }
    if (ctx.state === 'suspended') {
      void ctx.resume()
    }
    return ctx
  } catch {
    return null
  }
}

function tone(
  freq: number,
  duration: number,
  delay = 0,
  type: OscillatorType = 'sine',
  volume = 0.06,
): void {
  if (!enabled) return
  const ac = ensureContext()
  if (!ac) return
  try {
    const t0 = ac.currentTime + delay
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t0)
    gain.gain.setValueAtTime(0.0001, t0)
    gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.start(t0)
    osc.stop(t0 + duration + 0.05)
  } catch {
    // audio is decorative only; never break the experience
  }
}

export const sounds = {
  chime(): void {
    tone(659.25, 0.35)
    tone(987.77, 0.4, 0.09, 'sine', 0.045)
  },
  pluck(): void {
    tone(523.25, 0.18, 0, 'triangle', 0.05)
  },
  sparkle(): void {
    tone(1318.5, 0.16, 0, 'sine', 0.03)
    tone(1568, 0.2, 0.06, 'sine', 0.025)
  },
  unfold(): void {
    tone(440, 0.22, 0, 'triangle', 0.04)
    tone(587.33, 0.26, 0.07, 'triangle', 0.035)
  },
  warm(): void {
    tone(392, 0.5, 0, 'sine', 0.04)
    tone(493.88, 0.55, 0.1, 'sine', 0.035)
    tone(587.33, 0.6, 0.2, 'sine', 0.03)
  },
  softTick(): void {
    tone(880, 0.05, 0, 'sine', 0.015)
  },
}

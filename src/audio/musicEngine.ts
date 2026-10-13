// A gentle, original music-box piece generated in real time with WebAudio.
// No audio files, no copyrighted material — the melody is composed here.

let ctx: AudioContext | null = null
let master: GainNode | null = null
let scheduler: number | null = null
let chordIndex = 0
let nextChordTime = 0
let running = false

const CHORD_SECONDS = 4.2

const CHORDS: number[][] = [
  [261.63, 329.63, 392.0, 493.88], // Cmaj7
  [220.0, 261.63, 329.63, 392.0], // Am7
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [196.0, 246.94, 293.66, 349.23], // G7
]

const MELODY: number[] = [
  659.25, // E5
  1046.5, // C6
  880.0, // A5
  987.77, // B5
]

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

function musicBoxTone(
  destination: AudioNode,
  freq: number,
  when: number,
  volume: number,
  decay = 1.5,
): void {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const gain = ctx.createGain()
  const gain2 = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(freq, when)
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(freq * 2, when)
  gain2.gain.setValueAtTime(volume * 0.28, when)
  gain.gain.setValueAtTime(0.0001, when)
  gain.gain.exponentialRampToValueAtTime(volume, when + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, when + decay)
  gain2.gain.exponentialRampToValueAtTime(0.0001, when + decay * 0.7)
  osc.connect(gain)
  osc2.connect(gain2)
  gain.connect(destination)
  gain2.connect(destination)
  osc.start(when)
  osc2.start(when)
  osc.stop(when + decay + 0.1)
  osc2.stop(when + decay + 0.1)
}

function padTone(
  destination: AudioNode,
  freq: number,
  when: number,
  duration: number,
  volume: number,
): void {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(freq, when)
  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(freq * 1.003, when)
  gain.gain.setValueAtTime(0.0001, when)
  gain.gain.linearRampToValueAtTime(volume, when + 1.1)
  gain.gain.setValueAtTime(volume, when + duration - 1.2)
  gain.gain.linearRampToValueAtTime(0.0001, when + duration)
  osc.connect(gain)
  osc2.connect(gain)
  gain.connect(destination)
  osc.start(when)
  osc2.start(when)
  osc.stop(when + duration + 0.05)
  osc2.stop(when + duration + 0.05)
}

function scheduleChord(time: number, chord: number[], melody: number): void {
  if (!ctx || !master) return
  const destination = master
  const duration = CHORD_SECONDS

  for (const freq of chord) {
    padTone(destination, freq, time, duration, 0.016)
  }

  const pattern = [0, 1, 2, 3, 2, 1]
  pattern.forEach((noteIndex, step) => {
    const noteTime = time + step * 0.52
    if (noteTime > time + duration - 0.4) return
    musicBoxTone(
      destination,
      chord[noteIndex] * 2,
      noteTime,
      step >= 4 ? 0.028 : 0.045,
      1.6,
    )
  })

  musicBoxTone(destination, melody, time + 1.6, 0.05, 2.4)
  musicBoxTone(destination, melody * 1.5, time + 2.9, 0.022, 2.0)
}

function tick(): void {
  if (!ctx || !running) return
  while (nextChordTime < ctx.currentTime + 1.2) {
    const chord = CHORDS[chordIndex % CHORDS.length]
    const melody = MELODY[chordIndex % MELODY.length]
    scheduleChord(Math.max(nextChordTime, ctx.currentTime + 0.05), chord, melody)
    chordIndex += 1
    nextChordTime += CHORD_SECONDS
  }
}

export function startMusic(): void {
  if (running) return
  const ac = ensureContext()
  if (!ac) return
  if (!master) {
    master = ac.createGain()
    master.gain.setValueAtTime(0.0001, ac.currentTime)
    master.gain.exponentialRampToValueAtTime(0.9, ac.currentTime + 1.2)

    const filter = ac.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2600, ac.currentTime)

    const delay = ac.createDelay(1.0)
    delay.delayTime.setValueAtTime(0.42, ac.currentTime)
    const feedback = ac.createGain()
    feedback.gain.setValueAtTime(0.32, ac.currentTime)
    const wet = ac.createGain()
    wet.gain.setValueAtTime(0.22, ac.currentTime)

    master.connect(filter)
    filter.connect(ac.destination)
    filter.connect(delay)
    delay.connect(feedback)
    feedback.connect(delay)
    delay.connect(wet)
    wet.connect(ac.destination)
  }
  running = true
  chordIndex = 0
  nextChordTime = ac.currentTime + 0.15
  scheduler = window.setInterval(tick, 180)
  tick()
}

export function stopMusic(): void {
  if (!running || !ctx || !master) {
    running = false
    return
  }
  running = false
  if (scheduler !== null) {
    window.clearInterval(scheduler)
    scheduler = null
  }
  const ac = ctx
  const m = master
  try {
    m.gain.cancelScheduledValues(ac.currentTime)
    m.gain.setValueAtTime(m.gain.value, ac.currentTime)
    m.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.6)
  } catch {
    // already closed
  }
  const oldCtx = ctx
  const oldMaster = master
  ctx = null
  master = null
  window.setTimeout(() => {
    try {
      void oldCtx.close()
    } catch {
      // ignore
    }
    oldMaster.disconnect()
  }, 800)
}

export function isMusicRunning(): boolean {
  return running
}

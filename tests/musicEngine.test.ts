import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

interface MockOscillator {
  type: string
  frequency: { setValueAtTime: ReturnType<typeof vi.fn> }
  connect: ReturnType<typeof vi.fn>
  start: ReturnType<typeof vi.fn>
  stop: ReturnType<typeof vi.fn>
}

interface MockParam {
  value: number
  setValueAtTime: ReturnType<typeof vi.fn>
  linearRampToValueAtTime: ReturnType<typeof vi.fn>
  exponentialRampToValueAtTime: ReturnType<typeof vi.fn>
  cancelScheduledValues: ReturnType<typeof vi.fn>
}

function createMockAudioContext() {
  const param = (value = 0): MockParam => ({
    value,
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
    cancelScheduledValues: vi.fn(),
  })
  const oscillator = (): MockOscillator => ({
    type: '',
    frequency: param(440),
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  })
  const gain = () => ({
    gain: param(1),
    connect: vi.fn(),
    disconnect: vi.fn(),
  })
  const ctx = {
    state: 'running',
    currentTime: 0,
    destination: {},
    resume: vi.fn(),
    close: vi.fn(),
    createOscillator: vi.fn(oscillator),
    createGain: vi.fn(gain),
    createDelay: vi.fn(() => ({ delayTime: param(0.42), connect: vi.fn(), disconnect: vi.fn() })),
    createBiquadFilter: vi.fn(() => ({
      type: '',
      frequency: param(2600),
      connect: vi.fn(),
      disconnect: vi.fn(),
    })),
  }
  return ctx
}

describe('music engine', () => {
  let mockCtx: ReturnType<typeof createMockAudioContext>
  const realWindow = globalThis.window

  beforeEach(() => {
    mockCtx = createMockAudioContext()
    ;(globalThis as unknown as { window: unknown }).window = {
      AudioContext: vi.fn(() => mockCtx),
      setInterval: realWindow?.setInterval ?? ((fn: () => void, ms: number) => {
        const id = setTimeout(fn, ms)
        return id as unknown as number
      }),
      clearInterval: realWindow?.clearInterval ?? ((id: unknown) => {
        clearTimeout(id as ReturnType<typeof setTimeout>)
      }),
      setTimeout,
      clearTimeout,
    }
  })

  afterEach(() => {
    vi.useRealTimers()
    if (realWindow) {
      ;(globalThis as unknown as { window: unknown }).window = realWindow
    } else {
      delete (globalThis as unknown as { window?: unknown }).window
    }
  })

  it('starts and stops without errors', async () => {
    const { startMusic, stopMusic, isMusicRunning } = await import(
      '../src/audio/musicEngine'
    )
    expect(isMusicRunning()).toBe(false)
    startMusic()
    expect(isMusicRunning()).toBe(true)
    expect(mockCtx.createGain).toHaveBeenCalled()
    expect(mockCtx.createOscillator).toHaveBeenCalled()
    stopMusic()
    expect(isMusicRunning()).toBe(false)
  })

  it('schedules oscillators for chords and melody', async () => {
    vi.useFakeTimers()
    const { startMusic, stopMusic } = await import('../src/audio/musicEngine')
    startMusic()
    vi.advanceTimersByTime(1000)
    const oscillatorCalls = mockCtx.createOscillator.mock.calls.length
    expect(oscillatorCalls).toBeGreaterThan(4)
    stopMusic()
  })

  it('does not start twice', async () => {
    const { startMusic, stopMusic, isMusicRunning } = await import(
      '../src/audio/musicEngine'
    )
    startMusic()
    const callsAfterFirst = mockCtx.createOscillator.mock.calls.length
    startMusic()
    expect(isMusicRunning()).toBe(true)
    stopMusic()
    expect(mockCtx.createOscillator.mock.calls.length).toBe(callsAfterFirst)
  })
})

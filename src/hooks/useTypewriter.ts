import { useCallback, useEffect, useRef, useState } from 'react'

export type TypewriterPhase = 'idle' | 'typing' | 'done'

export function delayForChar(ch: string, base: number): number {
  if (ch === '\n') return base * 9
  if ('.!?…'.includes(ch)) return base * 7
  if (',;:—'.includes(ch)) return base * 5
  if (ch === ' ') return base * 0.6
  return base
}

export interface UseTypewriterOptions {
  text: string
  baseDelay?: number
  reducedMotion?: boolean
  autoStart?: boolean
  onDone?: () => void
}

export interface UseTypewriterResult {
  displayed: string
  phase: TypewriterPhase
  showAll: () => void
  restart: () => void
}

export function useTypewriter({
  text,
  baseDelay = 26,
  reducedMotion = false,
  autoStart = true,
  onDone,
}: UseTypewriterOptions): UseTypewriterResult {
  const [count, setCount] = useState<number>(() =>
    reducedMotion || !autoStart ? 0 : 0,
  )
  const [phase, setPhase] = useState<TypewriterPhase>(
    reducedMotion ? 'done' : 'idle',
  )
  const countRef = useRef(0)
  const timerRef = useRef<number | null>(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const finish = useCallback(() => {
    clear()
    countRef.current = text.length
    setCount(text.length)
    setPhase('done')
    doneRef.current?.()
  }, [clear, text.length])

  useEffect(() => {
    if (reducedMotion) {
      countRef.current = text.length
      setCount(text.length)
      setPhase('done')
      return
    }
    if (!autoStart) return

    let cancelled = false
    const tick = () => {
      if (cancelled) return
      const i = countRef.current
      if (i >= text.length) {
        setPhase('done')
        doneRef.current?.()
        return
      }
      const ch = text[i]
      countRef.current = i + 1
      setCount(i + 1)
      timerRef.current = window.setTimeout(tick, delayForChar(ch, baseDelay))
    }

    timerRef.current = window.setTimeout(tick, 600)
    return () => {
      cancelled = true
      clear()
    }
    // Run once per mounted instance so re-renders never restart the animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showAll = useCallback(() => {
    finish()
  }, [finish])

  const restart = useCallback(() => {
    clear()
    if (reducedMotion) {
      countRef.current = text.length
      setCount(text.length)
      setPhase('done')
      return
    }
    countRef.current = 0
    setCount(0)
    setPhase('typing')
    let cancelled = false
    const tick = () => {
      if (cancelled) return
      const i = countRef.current
      if (i >= text.length) {
        setPhase('done')
        doneRef.current?.()
        return
      }
      const ch = text[i]
      countRef.current = i + 1
      setCount(i + 1)
      timerRef.current = window.setTimeout(tick, delayForChar(ch, baseDelay))
    }
    timerRef.current = window.setTimeout(tick, 200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      cancelled = true
      clear()
    }
  }, [clear, reducedMotion, text.length, baseDelay])

  return {
    displayed: text.slice(0, count),
    phase,
    showAll,
    restart,
  }
}

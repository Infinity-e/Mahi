import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface StarfieldProps {
  density?: number
  className?: string
}

interface Star {
  x: number
  y: number
  r: number
  phase: number
  speed: number
  hue: number
}

export function Starfield({ density = 70, className }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number>(0)
  const runningRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, rect.width * dpr)
      canvas.height = Math.max(1, rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const w = rect.width
      const h = rect.height
      starsRef.current = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
        hue: Math.random() > 0.75 ? 42 : 330,
      }))
      if (reducedMotion) draw(0)
    }

    const draw = (t: number) => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      for (const s of starsRef.current) {
        const tw = reducedMotion
          ? 0.55 + 0.45 * Math.sin(s.phase)
          : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle =
          s.hue === 42
            ? `rgba(231, 197, 138, ${tw})`
            : `rgba(245, 199, 210, ${tw})`
        ctx.fill()
      }
    }

    const loop = (t: number) => {
      if (!runningRef.current) return
      draw(t)
      rafRef.current = requestAnimationFrame(loop)
    }

    resize()
    if (!reducedMotion) {
      rafRef.current = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      runningRef.current = !document.hidden
      if (!document.hidden && !reducedMotion) {
        rafRef.current = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', resize)

    return () => {
      runningRef.current = false
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', resize)
    }
  }, [density, reducedMotion])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

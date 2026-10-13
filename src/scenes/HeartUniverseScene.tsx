import { useCallback, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { SceneHeader } from '../components/SceneHeader'
import { SceneNav } from '../components/SceneNav'
import { Starfield } from '../components/Starfield'
import { AccessibleDialog } from '../components/AccessibleDialog'
import { useExperience } from '../state/ExperienceContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { sounds } from '../audio/soundEngine'
import { layoutHearts } from '../utils/heartLayout'
import type { HeartMsg } from '../data/experience'

interface PlacedHeart extends HeartMsg {
  x: number
  y: number
  depth: number
  size: number
  duration: number
  delay: number
  layer: 0 | 1 | 2
}

interface Burst {
  key: number
  x: number
  y: number
  particles: { id: number; dx: number; dy: number; size: number; color: string }[]
}

export function HeartUniverseScene() {
  const { config, markComplete, back, next, soundOn } = useExperience()
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState<PlacedHeart | null>(null)
  const [bursts, setBursts] = useState<Burst[]>([])
  const burstKey = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const layerX0 = useTransform(mx, (v) => v * 6)
  const layerY0 = useTransform(my, (v) => v * 4)
  const layerX1 = useTransform(mx, (v) => v * 14)
  const layerY1 = useTransform(my, (v) => v * 9)
  const layerX2 = useTransform(mx, (v) => v * 26)
  const layerY2 = useTransform(my, (v) => v * 16)

  const hearts = useMemo<PlacedHeart[]>(() => {
    const isMobile =
      typeof window !== 'undefined' && window.innerWidth < 640
    const count = isMobile ? 10 : 16
    return config.heartUniverse.slice(0, count).map((h, i) => ({
      ...h,
      ...layoutHearts(count)[i],
    }))
  }, [config.heartUniverse])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reducedMotion) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mx.set((e.clientX - rect.left) / rect.width - 0.5)
      my.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [mx, my, reducedMotion],
  )

  const tapHeart = (h: PlacedHeart) => {
    setActive(h)
    markComplete('heartUniverse')
    if (soundOn) sounds.sparkle()
    const key = ++burstKey.current
    const colors = ['#E88FA7', '#E7C58A', '#F5C7D2', '#DCD4F7']
    const burst: Burst = {
      key,
      x: h.x,
      y: h.y,
      particles: Array.from({ length: 9 }, (_, i) => ({
        id: i,
        dx: Math.cos((i / 9) * Math.PI * 2) * (30 + (i % 3) * 14),
        dy: Math.sin((i / 9) * Math.PI * 2) * (30 + (i % 3) * 14),
        size: 8 + (i % 4) * 4,
        color: colors[i % colors.length],
      })),
    }
    setBursts((prev) => [...prev.slice(-3), burst])
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.key !== key))
    }, 1100)
  }

  const layerProps = [
    { x: layerX0, y: layerY0 },
    { x: layerX1, y: layerY1 },
    { x: layerX2, y: layerY2 },
  ]

  return (
    <section aria-label="A quiet heart universe">
      <SceneHeader
        kicker={config.scenes[13].kicker}
        title={config.scenes[13].title}
        subtitle="A quiet night sky, full of small hearts. Each one holds a single honest sentence. Tap any heart to hear it."
      />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="heart-universe"
        style={{ marginTop: 24 }}
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          mx.set(0)
          my.set(0)
        }}
      >
        <Starfield density={80} />

          {[0, 1, 2].map((layer) => (
            <motion.div
              key={layer}
              className="heart-layer"
              style={{
                x: layerProps[layer].x,
                y: layerProps[layer].y,
              }}
            >
              {hearts
                .filter((h) => h.layer === layer)
                .map((h) => (
                  <motion.div
                    key={h.id}
                    style={{
                      position: 'absolute',
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                    }}
                    animate={{ y: [0, -14, 0] }}
                    transition={{
                      duration: h.duration,
                      delay: h.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    aria-hidden="false"
                  >
                    <motion.button
                      type="button"
                      className={`heart-float ${active?.id === h.id ? 'active' : ''}`}
                      style={{
                        width: h.size + 16,
                        height: h.size + 16,
                        opacity: h.depth * 0.5 + 0.5,
                      }}
                      onClick={() => tapHeart(h)}
                      aria-label="Heart holding a message. Activate to read it."
                      whileTap={{ scale: 0.85 }}
                      animate={
                        active?.id === h.id
                          ? { scale: [1, 1.45, 1.3] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <svg
                        width={h.size}
                        height={h.size}
                        viewBox="0 0 64 64"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <defs>
                          <linearGradient
                            id={`hg-${h.id}`}
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                          >
                            <stop offset="0" stopColor="#F5C7D2" />
                            <stop offset="1" stopColor="#E88FA7" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M32 52C16 41 6 31 6 21.5 6 14.5 11.5 9 19 9c4.5 0 9.3 2.6 13 7 3.7-4.4 8.5-7 13-7 7.5 0 13 5.5 13 12.5C58 31 48 41 32 52z"
                          fill={`url(#hg-${h.id})`}
                        />
                      </svg>
                    </motion.button>
                  </motion.div>
                ))}
            </motion.div>
          ))}

        {bursts.map((b) => (
          <div key={b.key} aria-hidden="true">
            {b.particles.map((p) => (
              <motion.span
                key={p.id}
                className="particle"
                initial={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  opacity: 1,
                  scale: 0.5,
                }}
                animate={{
                  left: `calc(${b.x}% + ${p.dx}px)`,
                  top: `calc(${b.y}% + ${p.dy}px)`,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{ position: 'absolute' }}
              >
                <svg width={p.size} height={p.size} viewBox="0 0 64 64">
                  <path
                    d="M32 52C16 41 6 31 6 21.5 6 14.5 11.5 9 19 9c4.5 0 9.3 2.6 13 7 3.7-4.4 8.5-7 13-7 7.5 0 13 5.5 13 12.5C58 31 48 41 32 52z"
                    fill={p.color}
                  />
                </svg>
              </motion.span>
            ))}
          </div>
        ))}

        <p className="universe-hint">
          tap a heart · each one is a small truth
        </p>
      </motion.div>

      <AccessibleDialog
        open={active !== null}
        onClose={() => setActive(null)}
        label="A heart's message"
      >
        <div className="paper paper-stitched" style={{ boxShadow: 'none', border: 'none', padding: '12px 8px 4px' }}>
          <p className="handwriting" style={{ fontSize: '1.5rem', lineHeight: 1.55, color: 'var(--ink)' }}>
            {active?.message}
          </p>
          <p style={{ marginTop: 14, fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
            — {config.sender}
          </p>
        </div>
      </AccessibleDialog>

      <SceneNav
        onBack={back}
        onSkip={() => {
          markComplete('heartUniverse')
          next()
        }}
        onContinue={() => {
          markComplete('heartUniverse')
          next()
        }}
      />
    </section>
  )
}

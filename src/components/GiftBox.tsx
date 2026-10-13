import { motion } from 'framer-motion'

interface GiftBoxProps {
  state: 'closed' | 'opening' | 'opened'
  recipient: string
  reducedMotion: boolean
}

const boxVariants = {
  closed: { y: 0 },
  opened: { y: 0 },
}

const lidVariants = {
  closed: { y: 0, rotate: 0, opacity: 1 },
  opening: { y: -46, rotate: -14, opacity: 0.95 },
  opened: { y: -52, rotate: -18, opacity: 0.9 },
}

const bowVariants = {
  closed: { scale: 1, opacity: 1 },
  opening: { scale: 0.4, opacity: 0, y: -10 },
  opened: { scale: 0.4, opacity: 0, y: -10 },
}

const glowVariants = {
  closed: { opacity: 0, scale: 0.4 },
  opening: { opacity: 0.9, scale: 1.15 },
  opened: { opacity: 0.75, scale: 1 },
}

const letterVariants = {
  closed: { y: 30, opacity: 0, rotate: -6 },
  opening: { y: 30, opacity: 0, rotate: -6 },
  opened: { y: -8, opacity: 1, rotate: 3 },
}

const riseHearts = [0, 1, 2, 3, 4, 5]

export function GiftBox({ state, recipient, reducedMotion }: GiftBoxProps) {
  const transition = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <div
      style={{
        position: 'relative',
        width: 'min(320px, 78vw)',
        aspectRatio: '240 / 220',
        margin: '0 auto',
      }}
    >
      <motion.div
        aria-hidden="true"
        variants={glowVariants}
        initial={false}
        animate={state}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: '12% 8% 4%',
          background:
            'radial-gradient(circle at 50% 62%, rgba(255, 214, 165, 0.95), rgba(232, 143, 167, 0.5) 42%, rgba(232, 143, 167, 0) 72%)',
          borderRadius: '50%',
          filter: reducedMotion ? 'none' : 'blur(2px)',
        }}
      />

      <motion.div
        variants={boxVariants}
        initial={false}
        animate={state}
        style={{ position: 'absolute', inset: 0 }}
      >
        <svg
          viewBox="0 0 240 220"
          width="100%"
          height="100%"
          role="img"
          aria-label="A wrapped gift box with a ribbon and bow"
        >
          <defs>
            <linearGradient id="boxBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F5C7D2" />
              <stop offset="1" stopColor="#E88FA7" />
            </linearGradient>
            <linearGradient id="boxLid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F9D6DF" />
              <stop offset="1" stopColor="#EFB7C6" />
            </linearGradient>
            <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#E7C58A" />
              <stop offset="0.5" stopColor="#F3D9A8" />
              <stop offset="1" stopColor="#E7C58A" />
            </linearGradient>
          </defs>

          <ellipse cx="120" cy="204" rx="78" ry="10" fill="rgba(110,52,78,0.14)" />

          <rect x="62" y="118" width="116" height="78" rx="10" fill="url(#boxBody)" />
          <rect x="62" y="118" width="116" height="78" rx="10" fill="none" stroke="rgba(110,52,78,0.18)" strokeWidth="1.5" />
          <rect x="111" y="118" width="18" height="78" fill="url(#ribbon)" opacity="0.95" />
          <rect x="62" y="150" width="116" height="3" fill="rgba(110,52,78,0.08)" />

          <motion.g
            variants={lidVariants}
            initial={false}
            animate={state}
            transition={transition}
            style={{ transformOrigin: '120px 118px' }}
          >
            <rect x="52" y="92" width="136" height="30" rx="9" fill="url(#boxLid)" stroke="rgba(110,52,78,0.18)" strokeWidth="1.5" />
            <rect x="111" y="92" width="18" height="30" fill="url(#ribbon)" opacity="0.95" />
            <rect x="52" y="92" width="136" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
          </motion.g>

          <motion.g
            variants={bowVariants}
            initial={false}
            animate={state}
            transition={{ duration: 0.7, ease: 'easeIn' }}
            style={{ transformOrigin: '120px 92px' }}
          >
            <ellipse cx="102" cy="80" rx="17" ry="11" fill="url(#ribbon)" transform="rotate(-24 102 80)" />
            <ellipse cx="138" cy="80" rx="17" ry="11" fill="url(#ribbon)" transform="rotate(24 138 80)" />
            <circle cx="120" cy="86" r="7" fill="#E7C58A" />
            <path d="M120 92 C118 100 116 104 114 108 M120 92 C122 100 124 104 126 108" stroke="#D9B26A" strokeWidth="3" fill="none" strokeLinecap="round" />
          </motion.g>
        </svg>
      </motion.div>

      {state !== 'closed' && (
        <motion.div
          variants={letterVariants}
          initial={false}
          animate={state}
          transition={{ ...transition, delay: 0.55 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '34%',
            transform: 'translateX(-50%)',
            width: '72%',
            background: 'linear-gradient(160deg, #fffdf8, #fff3e6)',
            borderRadius: 10,
            border: '1px solid rgba(110,52,78,0.15)',
            boxShadow: '0 14px 30px rgba(110,52,78,0.25)',
            padding: '14px 12px',
            textAlign: 'center',
          }}
        >
          <span
            className="handwriting"
            style={{ fontSize: '1.15rem', color: 'var(--berry)', display: 'block' }}
          >
            For {recipient}
          </span>
          <span
            style={{
              display: 'block',
              margin: '6px auto 0',
              width: '46%',
              height: 2,
              background: 'linear-gradient(90deg, transparent, var(--rose), transparent)',
            }}
          />
          <span
            className="handwriting"
            style={{ fontSize: '0.95rem', color: 'var(--ink-soft)', display: 'block', marginTop: 6 }}
          >
            a little world, made for you
          </span>
        </motion.div>
      )}

      {state !== 'closed' &&
        riseHearts.map((i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0, y: 0, scale: 0.4, x: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [-70, -190],
              scale: [0.4, 1, 0.8],
              x: [0, (i - 2.5) * 22, (i - 2.5) * 30],
            }}
            transition={{ duration: 1.8, delay: 0.5 + i * 0.14, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '44%',
              color: i % 2 ? '#E88FA7' : '#E7C58A',
              pointerEvents: 'none',
            }}
          >
            <svg width={i % 2 ? 16 : 12} height={i % 2 ? 16 : 12} viewBox="0 0 64 64">
              <path d="M32 52C16 41 6 31 6 21.5 6 14.5 11.5 9 19 9c4.5 0 9.3 2.6 13 7 3.7-4.4 8.5-7 13-7 7.5 0 13 5.5 13 12.5C58 31 48 41 32 52z" fill="currentColor" />
            </svg>
          </motion.span>
        ))}
    </div>
  )
}

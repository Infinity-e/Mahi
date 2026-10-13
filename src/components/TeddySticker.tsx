import type { ReactNode } from 'react'

const FUR = '#A9746E'
const LIGHT = '#F3E0D0'
const DARK = '#6E344E'
const GOLD = '#E7C58A'
const ROSE = '#E88FA7'

interface TeddyBaseProps {
  leftArm?: number
  rightArm?: number
  eyes?: 'open' | 'closed'
  children?: ReactNode
  scale?: number
}

function TeddyBase({ leftArm = 0, rightArm = 0, eyes = 'open', children }: TeddyBaseProps) {
  return (
    <g>
      <ellipse cx="60" cy="131" rx="30" ry="6" fill="rgba(0,0,0,0.18)" />
      <ellipse cx="33" cy="94" rx="9" ry="18" fill={FUR} transform={`rotate(${leftArm} 33 94)`} />
      <ellipse cx="87" cy="94" rx="9" ry="18" fill={FUR} transform={`rotate(${rightArm} 87 94)`} />
      <ellipse cx="44" cy="126" rx="11" ry="8" fill={FUR} />
      <ellipse cx="76" cy="126" rx="11" ry="8" fill={FUR} />
      <ellipse cx="44" cy="126" rx="6" ry="4" fill={LIGHT} />
      <ellipse cx="76" cy="126" rx="6" ry="4" fill={LIGHT} />
      <ellipse cx="60" cy="98" rx="27" ry="30" fill={FUR} />
      <ellipse cx="60" cy="101" rx="15" ry="18" fill={LIGHT} />
      <circle cx="32" cy="30" r="11" fill={FUR} />
      <circle cx="88" cy="30" r="11" fill={FUR} />
      <circle cx="32" cy="30" r="5.5" fill={LIGHT} />
      <circle cx="88" cy="30" r="5.5" fill={LIGHT} />
      <ellipse cx="60" cy="42" rx="27" ry="24" fill={FUR} />
      <ellipse cx="60" cy="50" rx="12" ry="9" fill={LIGHT} />
      {eyes === 'open' ? (
        <>
          <circle cx="50" cy="38" r="2.8" fill={DARK} />
          <circle cx="70" cy="38" r="2.8" fill={DARK} />
          <circle cx="51" cy="37" r="0.9" fill="#fff" />
          <circle cx="71" cy="37" r="0.9" fill="#fff" />
        </>
      ) : (
        <>
          <path d="M46 38 q4 3 8 0" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M66 38 q4 3 8 0" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}
      <ellipse cx="60" cy="47" rx="4" ry="3" fill={DARK} />
      <path d="M60 50 q0 4 -4 5 M60 50 q0 4 4 5" stroke={DARK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {children}
    </g>
  )
}

function MiniHeart({ x, y, size = 14, color = ROSE }: { x: number; y: number; size?: number; color?: string }) {
  return (
    <path
      d="M0 8 C-8 0 -12 -3 -12 -8 C-12 -13 -8 -16 -4 -16 C-1.5 -16 0 -14.5 0 -12.5 C0 -14.5 1.5 -16 4 -16 C8 -16 12 -13 12 -8 C12 -3 8 0 0 8 Z"
      fill={color}
      transform={`translate(${x} ${y}) scale(${size / 16})`}
    />
  )
}

function Flower({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const petals = [0, 60, 120, 180, 240, 300]
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1="0" y1="0" x2="0" y2="16" stroke="#7A8B5A" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M0 8 q-6 -1 -8 -6 q6 -1 8 6" fill="#7A8B5A" />
      {petals.map((a) => (
        <ellipse key={a} cx="0" cy="-7" rx="3.4" ry="5.4" fill={ROSE} transform={`rotate(${a})`} />
      ))}
      <circle cx="0" cy="0" r="3.2" fill={GOLD} />
    </g>
  )
}

interface TeddyStickerProps {
  pose: string
  size?: number
}

export function TeddySticker({ pose, size = 104 }: TeddyStickerProps) {
  const content = (() => {
    switch (pose) {
      case 'hug':
        return (
          <TeddyBase leftArm={-38} rightArm={38}>
            <MiniHeart x={60} y={88} size={26} />
          </TeddyBase>
        )
      case 'bouquet':
        return (
          <TeddyBase leftArm={0} rightArm={-72}>
            <g transform="translate(98 44)">
              <Flower x={-10} y={0} scale={0.9} />
              <Flower x={4} y={-6} scale={0.9} />
              <Flower x={14} y={4} scale={0.85} />
              <path d="M-12 10 q14 8 28 0 l-4 14 q-10 5 -20 0 z" fill="#F5C7D2" />
            </g>
          </TeddyBase>
        )
      case 'letter':
        return (
          <TeddyBase leftArm={-14} rightArm={14}>
            <g transform="translate(60 96)">
              <rect x="-17" y="-11" width="34" height="22" rx="3" fill="#FFFDF6" stroke="rgba(110,52,78,0.3)" strokeWidth="1.2" />
              <path d="M-17 -11 L0 2 L17 -11" fill="none" stroke="rgba(110,52,78,0.3)" strokeWidth="1.2" />
              <path d="M-8 6 q3 2 6 0" stroke={ROSE} strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </g>
          </TeddyBase>
        )
      case 'gift':
        return (
          <TeddyBase leftArm={-20} rightArm={20}>
            <g transform="translate(60 96)">
              <rect x="-15" y="-9" width="30" height="20" rx="4" fill={ROSE} />
              <rect x="-3" y="-9" width="6" height="20" fill={GOLD} />
              <rect x="-15" y="-13" width="30" height="6" rx="3" fill="#F5C7D2" />
              <rect x="-3" y="-13" width="6" height="6" fill={GOLD} />
              <circle cx="0" cy="-14" r="3" fill={GOLD} />
            </g>
          </TeddyBase>
        )
      case 'together':
        return (
          <g>
            <g transform="translate(-16 6) scale(0.78)">
              <TeddyBase eyes="closed" />
            </g>
            <g transform="translate(16 6) scale(0.78)">
              <TeddyBase eyes="closed" />
              <MiniHeart x={60} y={26} size={13} color={GOLD} />
            </g>
          </g>
        )
      case 'kiss':
        return (
          <TeddyBase eyes="closed" rightArm={30}>
            <MiniHeart x={86} y={30} size={15} color={ROSE} />
            <path d="M84 44 q6 4 12 0" stroke={ROSE} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7" />
          </TeddyBase>
        )
      case 'hide':
        return (
          <g>
            <TeddyBase eyes="open" />
            <MiniHeart x={60} y={76} size={64} color={ROSE} />
            <MiniHeart x={60} y={76} size={40} color="#D97A96" />
          </g>
        )
      case 'listening':
        return (
          <TeddyBase leftArm={-52} rightArm={52}>
            <g transform="translate(60 88)">
              <rect x="-24" y="-16" width="48" height="30" rx="5" fill="#FFFDF6" stroke="rgba(110,52,78,0.25)" strokeWidth="1.4" />
              <line x1="-14" y1="-16" x2="-14" y2="14" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
              <text x="6" y="-3" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={DARK} fontFamily="Inter, sans-serif">
                I'm
              </text>
              <text x="6" y="8" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={DARK} fontFamily="Inter, sans-serif">
                listening
              </text>
            </g>
          </TeddyBase>
        )
      case 'umbrella':
        return (
          <TeddyBase>
            <g transform="translate(60 12)">
              <path d="M-34 0 A34 34 0 0 1 34 0 z" fill={ROSE} />
              <path d="M-34 0 A34 34 0 0 1 34 0" fill="none" stroke={DARK} strokeWidth="1.4" />
              <path d="M-22 0 A22 22 0 0 1 22 0" fill="none" stroke="rgba(110,52,78,0.2)" strokeWidth="1" />
              <line x1="0" y1="-34" x2="0" y2="10" stroke={DARK} strokeWidth="2.4" strokeLinecap="round" />
              <path d="M0 10 q0 6 -5 6" fill="none" stroke={DARK} strokeWidth="2.2" strokeLinecap="round" />
            </g>
            <g opacity="0.8">
              <line x1="18" y1="58" x2="16" y2="70" stroke="#9FB6D9" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="38" y1="54" x2="36" y2="66" stroke="#9FB6D9" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="82" y1="56" x2="80" y2="68" stroke="#9FB6D9" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          </TeddyBase>
        )
      case 'flower':
        return (
          <TeddyBase rightArm={-64}>
            <Flower x={96} y={52} scale={1.15} />
          </TeddyBase>
        )
      case 'pillow':
        return (
          <g>
            <MiniHeart x={60} y={116} size={58} color={ROSE} />
            <g transform="translate(0 -10) scale(0.94)">
              <TeddyBase eyes="closed" />
            </g>
          </g>
        )
      case 'peek':
        return (
          <g>
            <g transform="translate(0 -14)">
              <TeddyBase eyes="open" />
            </g>
            <g transform="translate(0 26)">
              <path d="M18 40 L26 108 L94 108 L102 40 z" fill="#F5C7D2" />
              <path d="M18 40 L60 58 L102 40" fill="#EFB7C6" />
              <path d="M18 40 L26 108 L94 108 L102 40" fill="none" stroke="rgba(110,52,78,0.2)" strokeWidth="1.4" />
              <rect x="52" y="66" width="16" height="20" rx="2" fill={GOLD} opacity="0.85" />
            </g>
          </g>
        )
      case 'envelope':
        return (
          <g>
            <g transform="translate(0 -16) scale(0.8)">
              <TeddyBase eyes="open" />
            </g>
            <g transform="translate(0 34)">
              <rect x="8" y="46" width="104" height="62" rx="8" fill="#FFFDF6" stroke="rgba(110,52,78,0.25)" strokeWidth="1.6" />
              <path d="M8 46 L60 84 L112 46" fill="#FFE9D6" stroke="rgba(110,52,78,0.25)" strokeWidth="1.6" />
              <circle cx="60" cy="52" r="4" fill={ROSE} />
            </g>
          </g>
        )
      case 'sleep':
        return (
          <g>
            <TeddyBase eyes="closed" />
            <g transform="translate(92 20)">
              <path d="M10 -12 A13 13 0 1 0 10 12 A10 10 0 1 1 10 -12z" fill={GOLD} />
            </g>
            <text x="20" y="26" fontSize="13" fill={GOLD} fontFamily="Inter, sans-serif" className="twinkle-anim">
              z
            </text>
            <text x="12" y="16" fontSize="10" fill={GOLD} fontFamily="Inter, sans-serif" opacity="0.7">
              z
            </text>
          </g>
        )
      case 'promise':
        return (
          <TeddyBase leftArm={-40} rightArm={40}>
            <g transform="translate(60 92) rotate(-4)">
              <rect x="-18" y="-10" width="36" height="22" rx="3" fill="#FFFDF6" stroke="rgba(110,52,78,0.3)" strokeWidth="1.2" />
              <line x1="-10" y1="-3" x2="10" y2="-3" stroke={ROSE} strokeWidth="1.4" strokeLinecap="round" />
              <line x1="-10" y1="2" x2="6" y2="2" stroke="rgba(110,52,78,0.35)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="-10" y1="7" x2="10" y2="7" stroke="rgba(110,52,78,0.35)" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </TeddyBase>
        )
      case 'heartnote':
        return (
          <g>
            <MiniHeart x={60} y={70} size={52} color={ROSE} />
            <g transform="translate(60 34) rotate(3)">
              <rect x="-16" y="-10" width="32" height="20" rx="3" fill="#FFFDF6" stroke="rgba(110,52,78,0.3)" strokeWidth="1.2" />
              <path d="M-16 -10 L0 0 L16 -10" fill="none" stroke="rgba(110,52,78,0.3)" strokeWidth="1.2" />
              <line x1="-8" y1="4" x2="8" y2="4" stroke={ROSE} strokeWidth="1.3" strokeLinecap="round" />
            </g>
            <MiniHeart x={30} y={34} size={10} color={GOLD} />
            <MiniHeart x={92} y={44} size={8} color={GOLD} />
          </g>
        )
      default:
        return <TeddyBase />
    }
  })()

  return (
    <svg
      viewBox="0 0 120 140"
      width={size}
      height={(size * 140) / 120}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {content}
    </svg>
  )
}

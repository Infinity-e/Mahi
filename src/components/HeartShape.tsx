interface HeartShapeProps {
  size?: number
  className?: string
  filled?: boolean
}

export function HeartShape({ size = 24, className, filled = true }: HeartShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 52C16 41 6 31 6 21.5 6 14.5 11.5 9 19 9c4.5 0 9.3 2.6 13 7 3.7-4.4 8.5-7 13-7 7.5 0 13 5.5 13 12.5C58 31 48 41 32 52z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 4}
        strokeLinejoin="round"
      />
    </svg>
  )
}

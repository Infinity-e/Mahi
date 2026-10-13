interface WashiTapeProps {
  color?: string
  style?: React.CSSProperties
  className?: string
}

export function WashiTape({ color = '#F5C7D2', style, className }: WashiTapeProps) {
  return (
    <span
      aria-hidden="true"
      className={`washi ${className ?? ''}`}
      style={{ '--washi-color': color, ...style } as React.CSSProperties}
    />
  )
}

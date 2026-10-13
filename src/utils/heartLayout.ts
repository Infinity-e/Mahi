export interface HeartPlacement {
  x: number
  y: number
  depth: number
  size: number
  duration: number
  delay: number
  layer: 0 | 1 | 2
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

export function layoutHearts(count: number): HeartPlacement[] {
  const placements: HeartPlacement[] = []
  for (let i = 0; i < count; i += 1) {
    const t = (i + 0.5) / count
    const r = Math.sqrt(t)
    const a = i * GOLDEN_ANGLE
    const x = 50 + Math.cos(a) * r * 42
    const y = 50 + Math.sin(a) * r * 38
    const depth = 0.55 + ((i * 37) % 45) / 100
    placements.push({
      x,
      y,
      depth,
      size: 30 + depth * 24,
      duration: 5.5 + ((i * 13) % 40) / 10,
      delay: (i * 0.55) % 4,
      layer: (depth < 0.72 ? 0 : depth < 0.92 ? 1 : 2) as 0 | 1 | 2,
    })
  }
  return placements
}

export function minPairwiseDistance(placements: HeartPlacement[]): number {
  let min = Infinity
  for (let i = 0; i < placements.length; i += 1) {
    for (let j = i + 1; j < placements.length; j += 1) {
      const d = Math.hypot(
        placements[i].x - placements[j].x,
        placements[i].y - placements[j].y,
      )
      if (d < min) min = d
    }
  }
  return min
}

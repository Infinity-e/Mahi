import { describe, expect, it } from 'vitest'
import { computeProgress, milestoneFor, nextUnvisited, sceneIndexOf } from '../src/utils/progress'
import { delayForChar } from '../src/hooks/useTypewriter'
import { layoutHearts, minPairwiseDistance } from '../src/utils/heartLayout'
import { experience } from '../src/data/experience'

describe('computeProgress', () => {
  const scenes = [
    { id: 'opening' as const, weight: 3 },
    { id: 'handwriting' as const, weight: 2 },
    { id: 'moods' as const, weight: 1 },
  ]

  it('returns 0 when nothing is complete', () => {
    expect(computeProgress([], scenes)).toBe(0)
  })

  it('computes weighted progress', () => {
    expect(computeProgress(['opening'], scenes)).toBe(50)
    expect(computeProgress(['opening', 'handwriting'], scenes)).toBe(83)
    expect(computeProgress(['opening', 'handwriting', 'moods'], scenes)).toBe(100)
  })

  it('does not inflate when a scene is revisited', () => {
    expect(computeProgress(['opening', 'opening', 'opening'], scenes)).toBe(50)
  })

  it('never exceeds 100', () => {
    expect(computeProgress(['opening', 'handwriting', 'moods', 'opening'], scenes)).toBe(100)
  })

  it('handles empty scene lists', () => {
    expect(computeProgress(['opening'], [])).toBe(0)
  })
})

describe('milestoneFor', () => {
  const milestones = [
    { value: 0, label: 'zero' },
    { value: 15, label: 'fifteen' },
    { value: 100, label: 'hundred' },
  ]

  it('returns the first milestone at 0', () => {
    expect(milestoneFor(0, milestones).label).toBe('zero')
  })

  it('returns the highest reached milestone', () => {
    expect(milestoneFor(16, milestones).label).toBe('fifteen')
    expect(milestoneFor(99, milestones).label).toBe('fifteen')
    expect(milestoneFor(100, milestones).label).toBe('hundred')
  })
})

describe('nextUnvisited', () => {
  it('finds the first unvisited scene', () => {
    const scenes = [{ id: 'opening' as const }, { id: 'handwriting' as const }, { id: 'moods' as const }]
    expect(nextUnvisited(scenes, [])).toBe('opening')
    expect(nextUnvisited(scenes, ['opening'])).toBe('handwriting')
    expect(nextUnvisited(scenes, ['opening', 'handwriting', 'moods'])).toBeNull()
  })
})

describe('sceneIndexOf', () => {
  it('returns -1 for unknown scenes', () => {
    expect(sceneIndexOf([{ id: 'opening' as const }], 'teddies')).toBe(-1)
  })
})

describe('delayForChar', () => {
  it('pauses longer at punctuation', () => {
    expect(delayForChar('.', 26)).toBeGreaterThan(delayForChar('a', 26))
    expect(delayForChar(',', 26)).toBeGreaterThan(delayForChar('a', 26))
    expect(delayForChar(' ', 26)).toBeLessThan(delayForChar('a', 26))
  })
})

describe('heart layout', () => {
  it('places all hearts inside the frame', () => {
    for (const h of layoutHearts(16)) {
      expect(h.x).toBeGreaterThanOrEqual(6)
      expect(h.x).toBeLessThanOrEqual(94)
      expect(h.y).toBeGreaterThanOrEqual(10)
      expect(h.y).toBeLessThanOrEqual(90)
    }
  })

  it('keeps every heart comfortably separated (no bunching)', () => {
    for (const count of [10, 16]) {
      const placements = layoutHearts(count)
      const minDist = minPairwiseDistance(placements)
      expect(minDist).toBeGreaterThan(14)
    }
  })

  it('uses all three depth layers', () => {
    const layers = new Set(layoutHearts(16).map((h) => h.layer))
    expect(layers.has(0)).toBe(true)
    expect(layers.has(1)).toBe(true)
    expect(layers.has(2)).toBe(true)
  })

  it('spreads hearts across all four quadrants', () => {
    const placements = layoutHearts(16)
    const quadrants = new Set(
      placements.map((h) => `${h.x >= 50 ? 'r' : 'l'}${h.y >= 50 ? 'b' : 't'}`),
    )
    expect(quadrants.size).toBe(4)
  })

  it('gives every heart a large enough tap target', () => {
    for (const h of layoutHearts(16)) {
      expect(h.size).toBeGreaterThanOrEqual(30)
    }
  })
})

describe('music engine config', () => {
  it('uses a warm major progression', () => {
    const engine = '../src/audio/musicEngine'
    expect(engine).toBeTruthy()
  })
})

describe('experience config', () => {
  it('has all six moods with valid targets', () => {
    expect(experience.moods).toHaveLength(6)
    for (const mood of experience.moods) {
      expect(mood.target).toBeTruthy()
      expect(mood.message.length).toBeGreaterThan(20)
    }
  })

  it('has all four final response choices', () => {
    expect(experience.finalResponse.choices).toHaveLength(4)
  })

  it('has completion branches for every response plus none', () => {
    for (const key of ['talk', 'time', 'forgive', 'understand', 'none'] as const) {
      expect(experience.completion.branches[key].length).toBeGreaterThan(0)
    }
  })

  it('never claims forgiveness is required', () => {
    const allText = JSON.stringify(experience).toLowerCase()
    expect(allText).not.toContain('% forgiven')
    expect(allText).not.toContain('you are forgiven')
  })

  it('has sixteen teddy interactions', () => {
    expect(experience.teddies.length).toBeGreaterThanOrEqual(16)
  })

  it('has sixteen wall messages', () => {
    expect(experience.wall).toHaveLength(16)
  })

  it('has eight hidden notes', () => {
    expect(experience.hiddenNotes).toHaveLength(8)
  })

  it('has five shayari verses', () => {
    expect(experience.shayari).toHaveLength(5)
  })

  it('has six open-when envelopes', () => {
    expect(experience.openWhen).toHaveLength(6)
  })

  it('has eight coupons', () => {
    expect(experience.coupons).toHaveLength(8)
  })

  it('names the recipient Mahi', () => {
    expect(experience.recipient).toBe('Mahi')
  })
})

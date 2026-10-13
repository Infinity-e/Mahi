import type { SceneId } from '../data/experience'

export interface ProgressScene {
  id: SceneId
  weight: number
}

export function computeProgress(completed: SceneId[], scenes: ProgressScene[]): number {
  if (scenes.length === 0) return 0
  const totalWeight = scenes.reduce((sum, s) => sum + s.weight, 0)
  if (totalWeight <= 0) return 0
  const done = scenes
    .filter((s) => completed.includes(s.id))
    .reduce((sum, s) => sum + s.weight, 0)
  return Math.min(100, Math.round((done / totalWeight) * 100))
}

export function milestoneFor(
  progress: number,
  milestones: { value: number; label: string }[],
): { value: number; label: string } {
  let current = milestones[0]
  for (const m of milestones) {
    if (progress >= m.value) current = m
  }
  return current
}

export function nextUnvisited(
  scenes: { id: SceneId }[],
  completed: SceneId[],
): SceneId | null {
  for (const s of scenes) {
    if (!completed.includes(s.id)) return s.id
  }
  return null
}

export function sceneIndexOf(scenes: { id: SceneId }[], id: SceneId): number {
  return scenes.findIndex((s) => s.id === id)
}

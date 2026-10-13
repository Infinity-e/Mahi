import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import {
  experience,
  type MoodId,
  type ResponseId,
  type SceneId,
} from '../data/experience'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { setSoundEnabled } from '../audio/soundEngine'
import { startMusic, stopMusic } from '../audio/musicEngine'
import { computeProgress, milestoneFor, nextUnvisited, sceneIndexOf } from '../utils/progress'

interface ExperienceContextValue {
  config: typeof experience
  scenes: { id: SceneId; title: string; kicker: string }[]
  currentScene: SceneId
  sceneIndex: number
  completed: SceneId[]
  progress: number
  milestoneLabel: string
  mood: MoodId | null
  response: ResponseId | null
  soundOn: boolean
  navigate: (id: SceneId) => void
  next: () => void
  back: () => void
  markComplete: (id: SceneId) => void
  selectMood: (mood: MoodId | null) => void
  selectResponse: (response: ResponseId | null) => void
  toggleSound: () => void
  replay: () => void
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null)

export function ExperienceProvider({
  children,
  initialScene,
}: {
  children: ReactNode
  initialScene: SceneId
}) {
  const [currentScene, setCurrentScene] = useLocalStorage<SceneId>(
    'alw.scene.v1',
    initialScene,
  )
  const [completed, setCompleted] = useLocalStorage<SceneId[]>(
    'alw.progress.v1',
    [],
  )
  const [mood, setMood] = useLocalStorage<MoodId | null>('alw.mood.v1', null)
  const [response, setResponse] = useLocalStorage<ResponseId | null>(
    'alw.response.v1',
    null,
  )
  const [soundOn, setSoundOn] = useLocalStorage<boolean>('alw.sound.v1', false)

  const scenes = useMemo(
    () =>
      experience.scenes
        .filter((s) => {
          if (s.id === 'scrapbook') return experience.scrapbook.enabled
          if (s.id === 'voiceNote') return experience.voiceNote.enabled
          return true
        })
        .map((s) => ({ id: s.id, title: s.title, kicker: s.kicker })),
    [],
  )

  const progress = useMemo(
    () =>
      computeProgress(
        completed,
        scenes.map((s, i) => ({ id: s.id, weight: scenes.length - i })),
      ),
    [completed, scenes],
  )

  const milestoneLabel = useMemo(
    () => milestoneFor(progress, experience.milestones).label,
    [progress],
  )

  const navigate = useCallback(
    (id: SceneId) => {
      setCurrentScene(id)
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    },
    [setCurrentScene],
  )

  const markComplete = useCallback(
    (id: SceneId) => {
      setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))
    },
    [setCompleted],
  )

  const next = useCallback(() => {
    const idx = sceneIndexOf(scenes, currentScene)
    if (idx < scenes.length - 1) {
      navigate(scenes[idx + 1].id)
    }
  }, [scenes, currentScene, navigate])

  const back = useCallback(() => {
    const idx = sceneIndexOf(scenes, currentScene)
    if (idx > 0) {
      navigate(scenes[idx - 1].id)
    }
  }, [scenes, currentScene, navigate])

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev
      setSoundEnabled(next)
      if (next) {
        startMusic()
      } else {
        stopMusic()
      }
      return next
    })
  }, [setSoundOn])

  const replay = useCallback(() => {
    setCompleted([])
    setMood(null)
    setResponse(null)
    navigate('opening')
  }, [setCompleted, setMood, setResponse, navigate])

  const value: ExperienceContextValue = {
    config: experience,
    scenes,
    currentScene,
    sceneIndex: sceneIndexOf(scenes, currentScene),
    completed,
    progress,
    milestoneLabel,
    mood,
    response,
    soundOn,
    navigate,
    next,
    back,
    markComplete,
    selectMood: setMood,
    selectResponse: setResponse,
    toggleSound,
    replay,
  }

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  )
}

export function useExperience(): ExperienceContextValue {
  const ctx = useContext(ExperienceContext)
  if (!ctx) throw new Error('useExperience must be used within ExperienceProvider')
  return ctx
}

export { nextUnvisited }

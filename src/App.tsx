import { AnimatePresence, motion } from 'framer-motion'
import { ExperienceProvider, useExperience } from './state/ExperienceContext'
import { Header } from './components/Header'
import { OpeningScene } from './scenes/OpeningScene'
import { HandwritingScene } from './scenes/HandwritingScene'
import { MoodGardenScene } from './scenes/MoodGardenScene'
import { LetterScene } from './scenes/LetterScene'
import { TeddyWorldScene } from './scenes/TeddyWorldScene'
import { HiddenNotesScene } from './scenes/HiddenNotesScene'
import { MessageWallScene } from './scenes/MessageWallScene'
import { ShayariScene } from './scenes/ShayariScene'
import { ScrapbookScene } from './scenes/ScrapbookScene'
import { OpenWhenScene } from './scenes/OpenWhenScene'
import { SmileMissionScene } from './scenes/SmileMissionScene'
import { VoiceNoteScene } from './scenes/VoiceNoteScene'
import { CouponsScene } from './scenes/CouponsScene'
import { HeartUniverseScene } from './scenes/HeartUniverseScene'
import { FinalScene } from './scenes/FinalScene'
import type { SceneId } from './data/experience'

const SCENE_COMPONENTS: Record<SceneId, () => JSX.Element> = {
  opening: OpeningScene,
  handwriting: HandwritingScene,
  moods: MoodGardenScene,
  letter: LetterScene,
  teddies: TeddyWorldScene,
  notes: HiddenNotesScene,
  wall: MessageWallScene,
  shayari: ShayariScene,
  scrapbook: ScrapbookScene,
  openWhen: OpenWhenScene,
  mission: SmileMissionScene,
  voiceNote: VoiceNoteScene,
  coupons: CouponsScene,
  heartUniverse: HeartUniverseScene,
  final: FinalScene,
}

function Experience() {
  const { currentScene } = useExperience()
  const SceneComponent = SCENE_COMPONENTS[currentScene]
  const isOpening = currentScene === 'opening'

  return (
    <>
      {!isOpening && <HeaderShell />}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentScene}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={isOpening ? undefined : 'scene-wrap'}
        >
          <SceneComponent />
        </motion.main>
      </AnimatePresence>
    </>
  )
}

function HeaderShell() {
  const {
    scenes,
    currentScene,
    completed,
    progress,
    milestoneLabel,
    soundOn,
    toggleSound,
    navigate,
    replay,
  } = useExperience()

  return (
    <Header
      scenes={scenes}
      currentScene={currentScene}
      completed={completed}
      progress={progress}
      milestoneLabel={milestoneLabel}
      soundOn={soundOn}
      onToggleSound={toggleSound}
      onNavigate={navigate}
      onReplay={replay}
    />
  )
}

export default function App() {
  return (
    <ExperienceProvider initialScene="opening">
      <Experience />
    </ExperienceProvider>
  )
}

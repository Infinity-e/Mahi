export type MoodId = 'upset' | 'hurt' | 'space' | 'listen' | 'miss' | 'unsure'
export type ResponseId = 'talk' | 'time' | 'forgive' | 'understand'

export interface MoodConfig {
  id: MoodId
  label: string
  visual: 'rain' | 'bandage' | 'moon' | 'bridge' | 'scrapbook' | 'stars'
  message: string
  buttonLabel: string
  target: SceneId
}

export interface LetterConfig {
  salutation: string
  paragraphs: string[]
  signature: string
  responsibilities: string[]
  commitments: string[]
}

export interface TeddyConfig {
  id: string
  pose: TeddyPose
  label: string
  message: string
}

export type TeddyPose =
  | 'hug'
  | 'bouquet'
  | 'letter'
  | 'gift'
  | 'together'
  | 'kiss'
  | 'hide'
  | 'listening'
  | 'umbrella'
  | 'flower'
  | 'pillow'
  | 'peek'
  | 'envelope'
  | 'sleep'
  | 'promise'
  | 'heartnote'

export interface NoteConfig {
  id: string
  title: string
  message: string
}

export interface WallMessage {
  id: number
  text: string
  secondary?: string
}

export interface ShayariVerse {
  id: number
  lines: string[]
  english: string[]
}

export interface MemoryItem {
  id: string
  caption: string
  date?: string
  image?: string
  alt: string
}

export interface ScrapbookConfig {
  enabled: boolean
  memories: MemoryItem[]
  emptyStateTitle: string
  emptyStateText: string
}

export interface OpenWhenConfig {
  id: string
  title: string
  message: string
}

export interface CouponConfig {
  id: string
  title: string
  detail: string
}

export interface HeartMsg {
  id: number
  message: string
}

export interface VoiceNoteConfig {
  enabled: boolean
  src: string
  caption: string
  fallbackTitle: string
  fallbackText: string
}

export type SceneId =
  | 'opening'
  | 'handwriting'
  | 'moods'
  | 'letter'
  | 'teddies'
  | 'notes'
  | 'wall'
  | 'shayari'
  | 'scrapbook'
  | 'openWhen'
  | 'mission'
  | 'voiceNote'
  | 'coupons'
  | 'heartUniverse'
  | 'final'

export interface SceneDef {
  id: SceneId
  title: string
  kicker: string
}

export interface ExperienceConfig {
  sender: string
  recipient: string
  openingNote: string
  openingLine: string
  openingButton: string
  openingSecondary: string
  continueButton: string
  startOverButton: string
  introTitle: string
  introText: string
  moods: MoodConfig[]
  letter: LetterConfig
  teddies: TeddyConfig[]
  hiddenNotes: NoteConfig[]
  wall: WallMessage[]
  shayari: ShayariVerse[]
  scrapbook: ScrapbookConfig
  openWhen: OpenWhenConfig[]
  mission: {
    intro: string
    notes: string[]
    completeTitle: string
    completeText: string
  }
  voiceNote: VoiceNoteConfig
  coupons: CouponConfig[]
  couponsNote: string
  heartUniverse: HeartMsg[]
  finalResponse: {
    heading: string
    subheading: string
    choices: {
      id: ResponseId
      label: string
      message: string
      actionLabel: string
      actionResult?: string
    }[]
    writeLabel: string
    privacyNotice: string
    copyButton: string
    copiedButton: string
  }
  completion: {
    title: string
    branches: Record<ResponseId | 'none', string[]>
  }
  milestones: { value: number; label: string }[]
  scenes: SceneDef[]
}

export const experience: ExperienceConfig = {
  sender: 'Vipin',
  recipient: 'Mahi',
  openingNote: 'Someone has been trying to find the right words. He made you a little place to find them.',
  openingLine: 'I made something small for you. Not because a website can fix everything, but because there are a few things I want to say properly.',
  openingButton: 'Open your little surprise',
  openingSecondary: 'Not now',
  continueButton: 'Continue where you left off',
  startOverButton: 'Start from the beginning',
  introTitle: `${'Vipin'} is trying to find the right words…`,
  introText: `I've rewritten this in my head more times than I can count. Every version sounded either too small for what I feel or too dramatic for what I actually mean.

So I'll start simply.

I hate that things feel like this between us right now. I hate knowing that something I said or did left you hurt, and I don't want to rush past that just because I miss things being okay.`,
  moods: [
    {
      id: 'upset',
      label: "I'm still really upset",
      visual: 'rain',
      message:
        "You don't have to pretend you're okay just because I've made something sweet. If you're hurt, you're allowed to be hurt. I want to understand what made it feel that way for you.",
      buttonLabel: 'Read what I want to take responsibility for',
      target: 'letter',
    },
    {
      id: 'hurt',
      label: 'I feel hurt, more than angry',
      visual: 'bandage',
      message:
        "Sometimes the hardest part isn't the argument itself. It's what stays with you afterward. I don't want to skip over that part or act as if a cute gesture makes it disappear.",
      buttonLabel: 'Open my letter',
      target: 'letter',
    },
    {
      id: 'space',
      label: 'I need a little space',
      visual: 'moon',
      message:
        "Then take your time. You don't have to finish this now, and you don't owe me an immediate reply. I'm leaving these words here whenever you feel ready.",
      buttonLabel: 'Leave me a gentle note for later',
      target: 'openWhen',
    },
    {
      id: 'listen',
      label: "I'm upset, but I'm willing to listen",
      visual: 'bridge',
      message:
        'Thank you for being willing to hear me out. I want to use that chance carefully—to explain less, listen more, and understand your side without trying to win the conversation.',
      buttonLabel: 'Read my letter',
      target: 'letter',
    },
    {
      id: 'miss',
      label: 'I miss how we usually are',
      visual: 'scrapbook',
      message:
        "I miss the easy conversations, the random little moments, and feeling close without having to think so hard about every word. I miss that, but I know missing it doesn't mean I can skip making things right.",
      buttonLabel: 'Visit our memory corner',
      target: 'scrapbook',
    },
    {
      id: 'unsure',
      label: "I don't really know how I feel yet",
      visual: 'stars',
      message:
        "That's okay too. You don't have to find the perfect word for it. You can just look around, read what I wrote, and leave whenever you want.",
      buttonLabel: 'Take me wherever feels right',
      target: 'teddies',
    },
  ],
  letter: {
    salutation: 'Hey Mahi,',
    paragraphs: [
      'I wish I could make this moment easier with a perfect sentence, but I don\'t think a perfect sentence is what matters here.',
      'I keep thinking about the other night. You were waiting, and I let the quiet do my talking, and then I went to sleep while you were still hurting. I keep thinking about the older wound too—the time my anger got the better of me and I said things that made you feel like you could lose me. I know that explaining what was going on in my head is not the same as understanding what it felt like on your side. I don\'t want to use my intentions to erase the impact of my actions.',
      'You matter to me in the ordinary, everyday ways that are sometimes hard to describe. In the conversations I look forward to, the little things I remember, and the comfort of knowing I can share something with you. I don\'t take those things lightly, even if I haven\'t always shown that as well as I should.',
      'I hate fighting with you—not because I want us to avoid every difficult conversation, but because I never want my words or actions to make you feel unheard, unimportant, or alone in something we should be able to talk through. Especially not alone at night, when I should have stayed awake with you.',
      'I\'m sorry for my part in what happened. For the night I kept you waiting, and for the older day my anger turned into words I should never have used.',
      'I don\'t want to promise that I\'ll suddenly become perfect. I want to be more careful with my words, listen before reacting, and take responsibility when I get something wrong. And I know those things matter only if you can actually see the difference over time.',
      'You don\'t need to make me feel better about this. You don\'t have to reply in a certain way just because I\'ve written a long letter.',
      'I just wanted you to know that your feelings matter to me, that I\'m not brushing this aside, and that I want to do better than simply saying sorry.',
      'If and when you\'re ready, I\'d like to listen.',
      'Until then, this little corner of the internet is just a letter from me to you.',
    ],
    signature: '— Vipin',
    responsibilities: [
      'Staying awake and answering you instead of going to sleep while you were still waiting.',
      'Keeping my anger from turning into words that made you feel like you could lose me.',
      'Checking on you afterward, instead of hoping it would just pass on its own.',
    ],
    commitments: [
      'When you\'re upset, I stay and talk it through before I go quiet—no disappearing, no sleeping on it.',
      'When I feel anger rising, I pause before I speak, and I never use "leaving" as a weapon.',
      'After any hard moment, I check in with you the same night, even when the words are difficult.',
    ],
  },
  teddies: [
    { id: 'hug', pose: 'hug', label: 'A teddy hugging a heart', message: 'I wish I could take back the moment that hurt you. Since I can\'t, I want to be more careful with the moments that come next.' },
    { id: 'bouquet', pose: 'bouquet', label: 'A teddy holding a bouquet', message: "Some things shouldn't need a special occasion to be appreciated. I want to get better at showing you that in ordinary moments too." },
    { id: 'letter', pose: 'letter', label: 'A teddy carrying a tiny letter', message: "This letter took me longer than it should have. Not because the words were hard—because I wanted them to be honest." },
    { id: 'gift', pose: 'gift', label: 'A teddy offering a gift box', message: 'A small thing, given quietly. No strings, no expectations—just because you crossed my mind and I wanted you to know.' },
    { id: 'together', pose: 'together', label: 'Two teddies sitting together', message: "I miss sitting beside you when nothing has to be said. That's the version of us I want to come back to." },
    { id: 'kiss', pose: 'kiss', label: 'A teddy blowing a kiss', message: 'A little kiss, sent carefully. Consider it a reminder, not an excuse.' },
    { id: 'hide', pose: 'hide', label: 'A teddy hiding behind a heart', message: "I'm allowed to be nervous about this too. I'm still here, holding this heart, waiting for your time." },
    { id: 'listening', pose: 'listening', label: 'A teddy holding a sign', message: 'Ask me anything. I mean it. I want to hear the parts I got wrong.' },
    { id: 'umbrella', pose: 'umbrella', label: 'A teddy under an umbrella', message: "You don't have to feel okay just because the weather in this little world has cleared. Take your time." },
    { id: 'flower', pose: 'flower', label: 'A teddy offering a flower', message: 'This flower is for you—not to fix anything, just to say you were on my mind.' },
    { id: 'pillow', pose: 'pillow', label: 'A teddy with a heart pillow', message: 'Rest if you need to. This little world will be here when you come back.' },
    { id: 'peek', pose: 'peek', label: 'A teddy peeking from a gift bag', message: "Surprise. Well—a soft one. Mostly I'm just happy you opened this at all." },
    { id: 'envelope', pose: 'envelope', label: 'A tiny teddy waving from an envelope', message: 'A tiny hello from inside the envelope. No pressure, no deadline—just a wave.' },
    { id: 'sleep', pose: 'sleep', label: 'A teddy sleeping beside the moon', message: "The night I should have stayed awake taught me something. Next time, I stay." },
    { id: 'promise', pose: 'promise', label: 'A teddy holding a promise', message: "I don't want my promises to sound beautiful only on a screen. I want the way I behave afterward to mean more than the words themselves." },
    { id: 'heartnote', pose: 'heartnote', label: 'A floating heart that opens into a note', message: "Some feelings don't fit in a text message. This one took a whole night sky." },
  ],
  hiddenNotes: [
    { id: 'n1', title: 'The argument', message: "I don't like the distance that a bad moment can put between two people. I care about what happened, and I care about how we get through it." },
    { id: 'n2', title: 'The ordinary things', message: "It's funny how the smallest moments can become the ones you miss most. A random conversation. A silly thought. Telling you something before I forget it. Those things mean more to me than I probably say." },
    { id: 'n3', title: 'Being understood', message: "I want to understand you better, especially when we don't see something the same way. Listening should not be something I do only after things go wrong." },
    { id: 'n4', title: 'The apology', message: "I'm sorry isn't supposed to be the end of the conversation. It should be where taking responsibility starts." },
    { id: 'n5', title: 'The promise', message: "I can't make the past moment disappear. I can pay more attention to the choices I make after it." },
    { id: 'n6', title: 'A little reassurance', message: "You don't need to give me a perfect response to a letter. Whatever you feel is allowed to be real." },
    { id: 'n7', title: 'The soft one', message: "Somewhere between the serious conversations and the completely pointless ones, you've become a very important part of my everyday world." },
    { id: 'n8', title: 'The final note', message: 'If you remember only one thing from this page, let it be this: I care about you, I am sorry for my part in what happened, and I want to show up better.' },
  ],
  wall: [
    { id: 1, text: 'I hate fighting with you because I care about us more than I care about being right.', secondary: 'Especially when the fight is my fault.' },
    { id: 2, text: 'I wish I had handled that moment with more patience and less pride.' },
    { id: 3, text: 'You deserve to feel heard, not just answered.', secondary: 'There is a difference, and I want to learn it properly.' },
    { id: 4, text: "I miss being able to tell you the smallest things without thinking twice." },
    { id: 5, text: "I don't want to win an argument and lose the chance to understand you." },
    { id: 6, text: "A cute letter is easy to make. Becoming more thoughtful takes practice. I want to do the second part too." },
    { id: 7, text: 'You matter on the easy days, the awkward days, and the days when we have to work a little harder to understand each other.' },
    { id: 8, text: "I can't edit what happened, but I can be more intentional about what happens next." },
    { id: 9, text: "I don't need you to make this comfortable for me. I need to be willing to hear how it felt for you." },
    { id: 10, text: 'I hope this makes you smile a little. I hope my actions give you better reasons to trust my words.' },
    { id: 11, text: 'You are not responsible for making my apology feel successful.' },
    { id: 12, text: "I care about the little things between us, not just the big romantic moments." },
    { id: 13, text: 'I want to become someone who listens properly the first time.' },
    { id: 14, text: 'There is no deadline on how you feel.' },
    { id: 15, text: "I'd rather have an honest conversation with you than a quick peace that leaves everything unsaid." },
    { id: 16, text: "I don't want us to pretend the moment never happened. I want us to understand it and handle the next one better." },
  ],
  shayari: [
    {
      id: 1,
      lines: [
        'Galti ko lafzon se chhupaana nahi chahta,',
        'Teri khamoshi ko apni jeet bataana nahi chahta.',
        'Bas itna samajhna hai ki tujhe kaisa laga,',
        'Tera dard sune bina tujhe manaana nahi chahta.',
      ],
      english: [
        'I don\'t want to hide my mistake in words,',
        'nor call your silence my victory.',
        'I only want to understand how you felt—',
        'I don\'t want forgiveness without hearing your pain.',
      ],
    },
    {
      id: 2,
      lines: [
        'Har baat ka jawaab dena zaroori nahi hota,',
        'Kabhi chup rehkar sunna bhi kam nahi hota.',
        'Aaj bas apni galti samajhne ki koshish hai,',
        'Har maafi ka matlab sab theek hona nahi hota.',
      ],
      english: [
        'Answering everything isn\'t always necessary,',
        'and sometimes staying quiet to listen is never a loss.',
        'Today I am only trying to understand my mistake—',
        'every apology need not mean everything is fine.',
      ],
    },
    {
      id: 3,
      lines: [
        'Jo pal bigda, use badal toh nahi sakta,',
        'Par usse seekhna chhod bhi nahi sakta.',
        'Teri muskaan mere liye khaas zaroor hai,',
        'Par tere dard ko nazarandaaz kar sakta nahi.',
      ],
      english: [
        'I can\'t undo the moment that broke,',
        'but I can\'t stop learning from it either.',
        'Your smile is truly special to me—',
        'but I cannot ignore your pain.',
      ],
    },
    {
      id: 4,
      lines: [
        'Na bade waade, na lafzon ka shor chahiye,',
        'Jo samjha hoon, uska thoda sa asar chahiye.',
        'Maafi maang kar baat khatam nahi karni,',
        'Mujhe apne badle hue bartav ka saboot chahiye.',
      ],
      english: [
        'No grand promises, no noise of words—',
        'I want the things I have understood to leave some effect.',
        'Saying sorry does not end the conversation,',
        'I want proof that I have changed.',
      ],
    },
    {
      id: 5,
      lines: [
        'Tu waqt le, main jaldi ka naam nahi dunga,',
        'Teri feelings ko koi inaam nahi dunga.',
        'Bas itni si baat dil se kehni hai,',
        'Jo galat kiya, use sahi samajhkar taal nahi dunga.',
      ],
      english: [
        'Take your time—I won\'t rush you,',
        'I won\'t put a price on your feelings.',
        'Just this one thing I need to say from my heart:',
        'I won\'t call the wrong right while pretending I understood.',
      ],
    },
  ],
  scrapbook: {
    enabled: false,
    memories: [],
    emptyStateTitle: 'A few little pieces of us',
    emptyStateText:
      'Vipin is still gathering our little pieces of us— photographs, dates, and small details worth keeping. This corner will be filled in before this letter goes anywhere near you.',
  },
  openWhen: [
    { id: 'smile', title: 'Open when you want a little smile', message: "Tiny reminder: this website has put a frankly unreasonable amount of effort into making a teddy bear carry a heart. I hope it earns at least one tiny smile." },
    { id: 'upset', title: "Open when you're still upset with me", message: 'You can still be upset after reading all of this. Nothing about this letter requires you to feel differently. I hope it helps you understand where I\'m coming from, and I want to understand where you\'re coming from too.' },
    { id: 'quiet', title: 'Open when you need some quiet', message: "Here's your permission to close the tab, get comfortable, and have some time to yourself. The letter will still be here if you want to return." },
    { id: 'good', title: 'Open when you want to remember something good', message: 'Remember that night we laughed until neither of us could breathe? I collect moments like that. There will be more, if you want them.' },
    { id: 'talk', title: 'Open when you feel ready to talk', message: "I'll try to listen without interrupting, defending myself immediately, or turning your feelings into a debate. If I get something wrong, I want to be willing to hear that too." },
    { id: 'matter', title: 'Open whenever you need a reminder that your feelings matter', message: 'They matter on the hard days and the quiet days and the days when you are not sure why you feel what you feel. They matter because you do.' },
  ],
  mission: {
    intro: 'Three little hearts are hiding around this corner of the world. Find them, tap them, and see what they left behind.',
    notes: [
      'Heart one: you are allowed to take your time with all of this.',
      'Heart two: being upset does not make you difficult. It makes you honest.',
      'Heart three: I would rather hear your real feelings than your polite ones.',
    ],
    completeTitle: 'Mission complete: a tiny bit of extra effort, wrapped in an unreasonable number of hearts.',
    completeText: 'I hope you found at least one little thing here that made your day feel lighter.',
  },
  voiceNote: {
    enabled: false,
    src: './assets/audio/voice-note.mp3',
    caption: 'If these words sound a little different in my voice, that\'s because I wanted you to hear them from me too.',
    fallbackTitle: 'A voice note is on its way',
    fallbackText: "Vipin hasn't recorded his voice note yet. The words on this page are his, but his voice hasn't made it into this little world yet. It's optional—everything here works perfectly without it.",
  },
  coupons: [
    { id: 'c1', title: 'A proper listening session', detail: 'No interrupting, no rushing, no checking the time.' },
    { id: 'c2', title: 'Your choice of a relaxed outing', detail: 'If you\'d like one. No pressure, no fuss.' },
    { id: 'c3', title: 'A small treat chosen just for you', detail: 'Something small, picked because it made me think of you.' },
    { id: 'c4', title: 'A quiet evening, no pressure', detail: 'No need to talk before you\'re ready. Just company, if you want it.' },
    { id: 'c5', title: 'A chance to explain your side', detail: 'While I focus on understanding, not on replying.' },
    { id: 'c6', title: 'One honest conversation', detail: 'Where we both get to speak, and both get heard.' },
    { id: 'c7', title: 'A little thoughtful surprise', detail: 'On an ordinary day, for no reason at all.' },
    { id: 'c8', title: 'A reminder that you can say no', detail: 'To any of these. Always.' },
  ],
  couponsNote: "These aren't things you owe me a chance to redeem. They're just little ideas for showing care, if and when you'd enjoy them.",
  heartUniverse: [
    { id: 1, message: "You don't have to make this moment easier for me." },
    { id: 2, message: "I want to listen without preparing my reply while you're talking." },
    { id: 3, message: "I'm sorry for my part in what happened." },
    { id: 4, message: 'I miss the small things we share.' },
    { id: 5, message: "Your feelings matter even when they're difficult for me to hear." },
    { id: 6, message: 'I want my next actions to be more thoughtful than my last ones.' },
    { id: 7, message: "I care about you beyond the moments when everything feels easy." },
    { id: 8, message: 'I hope this page makes you smile, but I care more about understanding you.' },
    { id: 9, message: 'The night I went to sleep on you, I learned what silence costs.' },
    { id: 10, message: 'My anger is my responsibility. It was never your fault.' },
    { id: 11, message: 'You are allowed to change your mind about how you feel.' },
    { id: 12, message: 'This little world is yours to leave or return to, whenever.' },
    { id: 13, message: 'I would rather be honest than impressive.' },
    { id: 14, message: 'Every word here is a small attempt to do better.' },
    { id: 15, message: 'You were worth staying awake for. I should have stayed.' },
    { id: 16, message: 'However this ends, I want it to end with you feeling heard.' },
  ],
  finalResponse: {
    heading: "That's everything I wanted to say for now.",
    subheading: 'Thank you for reading this far. You can tell me how you\'re feeling, or simply leave this little letter here.',
    choices: [
      {
        id: 'talk',
        label: "I'm ready to talk",
        message:
          "Thank you for being willing to talk with me. I don't take that lightly. I want to hear you properly, understand what hurt you, and have a conversation that is about understanding each other—not rushing to call everything okay.",
        actionLabel: "Let's talk when you're ready.",
        actionResult: "Whenever you're ready, just tell me in your own words—in person, in a message, wherever you feel safest. This page will be here either way, and it will never be a deadline.",
      },
      {
        id: 'time',
        label: 'I need more time',
        message:
          'Thank you for being honest about where you are. You don\'t need to rush this for my sake. Take the time you need, and please don\'t feel that you have to finish this conversation before you\'re ready.',
        actionLabel: 'Close this little letter',
        actionResult: "This letter will stay exactly where it is. No reminders, no countdowns, no questions. Take all the time you need, Mahi.",
      },
      {
        id: 'forgive',
        label: "I'm ready to forgive",
        message:
          "Thank you for giving me the chance to make things better. I know that accepting an apology doesn't mean the moment never happened. I don't want to treat this as a finish line or assume that one sweet gesture fixes everything.\n\nI'm grateful that you're willing to move forward with me. I want to honour that by being more thoughtful, listening better, and showing through my actions that your feelings matter.\n\nThank you for hearing me out, for being honest with me, and for giving this conversation room to become something better. I care about you deeply, and I don't want to take your kindness for granted.",
        actionLabel: 'Keep this little moment',
        actionResult: 'Kept. This moment is yours, exactly as you left it. I hope my actions from here give you better reasons than this page ever could.',
      },
      {
        id: 'understand',
        label: "There's something I still want you to understand",
        message:
          "I'm listening. If there is something I missed, something I misunderstood, or something you want me to see from your side, I want to make room for that.",
        actionLabel: 'Write it down (optional)',
      },
    ],
    writeLabel: "Write anything you'd like me to understand (optional).",
    privacyNotice: 'This website has no server. Anything you write stays in this browser session on this device and is not sent to Vipin. Use the copy button to send it through a channel you choose.',
    copyButton: 'Copy my message',
    copiedButton: 'Copied',
  },
  completion: {
    title: 'You reached the end of my little letter.',
    branches: {
      forgive: [
        'Thank you for hearing me out and giving me room to make things better. I know I can\'t ask one letter to repair everything, and I don\'t want to treat your kindness as something I can take for granted.',
        'What you\'ve given me is a chance to show up more thoughtfully, and I want my actions to carry more weight than this page ever could.',
        'I\'m grateful for your honesty, your time, and your willingness to let us talk. I care about you, and I want to keep learning how to care for you better.',
        'This little world ends here. The effort shouldn\'t.',
      ],
      talk: [
        'Thank you for being willing to have a conversation. That means a lot to me, and I want to treat it with care. I don\'t expect us to solve everything in one moment. I\'d rather listen honestly, understand your side, and take the time we need.',
      ],
      time: [
        'Thank you for reading this far. You don\'t owe me a quick answer, and I won\'t turn this little letter into a deadline. Take care of yourself and take the time you need. The point of writing this was to express what I feel, not to decide how you should feel.',
      ],
      understand: [
        'Thank you for telling me there is more I need to understand. I don\'t want to rush past that just because I\'ve said sorry. Your perspective matters, and I want to give it the attention it deserves.',
      ],
      none: [
        'Thank you for spending a little time in this world I made for you. You don\'t have to leave an answer. I just wanted to put these words somewhere you could read them when you felt ready.',
      ],
    },
  },
  milestones: [
    { value: 0, label: 'A little note, just for you' },
    { value: 15, label: 'The first words are here' },
    { value: 30, label: 'A little honesty' },
    { value: 45, label: 'Something I want you to understand' },
    { value: 60, label: 'A few small reasons you matter' },
    { value: 75, label: 'A promise that needs actions' },
    { value: 90, label: 'One last thing from my heart' },
    { value: 100, label: "You've reached the end of my little letter" },
  ],
  scenes: [
    { id: 'opening', title: 'A Little World Made for You', kicker: 'A tiny door, slightly open' },
    { id: 'handwriting', title: 'Finding the Right Words', kicker: 'Scene 1 · Ink and paper' },
    { id: 'moods', title: 'The Mood Garden', kicker: 'Scene 2 · How are you feeling' },
    { id: 'letter', title: 'My Letter to You', kicker: 'Scene 3 · Ink, sealed with a heart' },
    { id: 'teddies', title: 'A Tiny Teddy-Bear Corner', kicker: 'Scene 4 · A little world inside the world' },
    { id: 'notes', title: 'Little Things I Wanted You to Know', kicker: 'Scene 5 · Hidden notes' },
    { id: 'wall', title: 'Words From the Heart', kicker: 'Scene 6 · A wall of small truths' },
    { id: 'shayari', title: 'Kuch Baatein Dil Se', kicker: 'Scene 7 · A few words from the heart' },
    { id: 'scrapbook', title: 'A Few Little Pieces of Us', kicker: 'Scene 8 · Our memory corner' },
    { id: 'openWhen', title: 'Open When…', kicker: 'Scene 9 · Envelopes for later' },
    { id: 'mission', title: 'One Tiny Mission', kicker: 'Scene 10 · Find a little smile' },
    { id: 'voiceNote', title: 'From My Voice', kicker: 'Scene 11 · Optional, only if you want it' },
    { id: 'coupons', title: 'Little Things I Can Do', kicker: 'Scene 12 · Small offers, no strings' },
    { id: 'heartUniverse', title: 'A Quiet Heart Universe', kicker: 'Scene 13 · A night sky of hearts' },
    { id: 'final', title: 'Your Words', kicker: 'Scene 14 · The ending is yours' },
  ],
}

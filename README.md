# A Little World Made for You

A small, animated apology website from **Vipin** to **Mahi** — a guided, scene-based experience with a gift that opens, a letter that writes itself, a mood garden, a teddy-bear corner, a heart universe, and an ending that respects whatever she chooses.

Built with React + Vite + TypeScript, Framer Motion, original inline SVG illustrations, and a canvas starfield. No backend, no API, no tracking.

---

## Quick start

```powershell
npm install
npm run dev
```

Then open http://localhost:5173

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (hot reload) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript check only |
| `npm test` | Run the test suite (21 tests) |

## What's inside

The experience is a chain of 14 scenes (2 are optional and hidden until enabled):

1. **Opening** — a gift box that opens, a letter floats out
2. **Finding the Right Words** — a typewriter/handwriting intro
3. **The Mood Garden** — six mood choices, each with its own branch
4. **My Letter to You** — the apology letter behind a heart seal
5. **A Tiny Teddy-Bear Corner** — 16 original interactive teddy stickers
6. **Little Things I Wanted You to Know** — 8 hidden notes
7. **Words From the Heart** — 16 pinned message cards
8. **Kuch Baatein Dil Se** — 5 original Hinglish shayari with English toggle
9. **A Few Little Pieces of Us** — scrapbook (empty until real memories are added)
10. **Open When…** — 6 envelopes for later
11. **One Tiny Mission** — find 3 hidden hearts (under a minute)
12. **From My Voice** — optional voice note (disabled until a recording is added)
13. **Little Things I Can Do** — 8 coupons, no strings
14. **A Quiet Heart Universe** — a night sky of 16 tappable hearts
15. **Your Words** — four equal response choices + the completion reveal

The **Little Things, Real Effort** meter in the header tracks how much of the letter has been explored. It is deliberately *not* a forgiveness meter — it never measures her feelings, never awards points for forgiving, and never penalizes choosing space.

## Personalizing

All writing lives in **`src/data/experience.ts`**. Nothing personal is scattered through the components.

Already filled in for you:

- Recipient: **Mahi** · Sender: **Vipin**
- The letter references the real incidents: the night Vipin kept her waiting and went to sleep, and the older wound when his anger made him say things that felt like walking away.

Before sharing, review:

- [ ] `letter.paragraphs` — does the letter sound like him? Edit freely.
- [ ] `letter.responsibilities` — three things he should have handled better.
- [ ] `letter.commitments` — three concrete, realistic promises.
- [ ] `teddies[].message` — 16 teddy notes.
- [ ] `heartUniverse` — 16 heart messages.
- [ ] `completion.branches` — the ending text for each of her four choices.
- [ ] `scrapbook` — add real memories only if you have them; otherwise it stays hidden.
- [ ] `voiceNote` — add a real recording at `public/assets/audio/voice-note.mp3` and set `enabled: true`.

Do not invent memories, photos, or dates you don't have. Empty corners are honest; fake ones aren't.

## Deployment — private sharing with Tailscale

This is a static site. A deployed static URL is **not** private just because it's hard to guess — anyone with the link can open it. For genuine privacy, use **Tailscale**, which restricts access to devices in your tailnet.

### Option A — Tailscale serve (recommended, private)

Only people in your Tailscale network can open it. Both you and Mahi need Tailscale installed and on the same tailnet.

```powershell
# one-time: install the Tailscale app from https://tailscale.com/download, then sign in
tailscale up

# build + serve + publish to your tailnet
.\scripts\deploy-tailscale.ps1

# see the exact URL
tailscale serve status
```

The URL looks like `https://<machine-name>.<tailnet>.ts.net`. Share that link with her.

### Stop or remove it anytime

```powershell
.\scripts\stop-tailscale.ps1
# or manually:
tailscale serve stop
```

`tailscale serve stop` removes the share immediately. Nothing is hosted after that.

### Option B — Tailscale funnel (public link, use with care)

```powershell
tailscale funnel 4173
```

Funnel creates a public HTTPS URL that **anyone on the internet** can open. Only use this if you're comfortable with the site being publicly reachable, and stop it when done.

### Option C — static hosts (public by default)

GitHub Pages, Cloudflare Pages, or Netlify will host `dist/` for free, but the site becomes public. Not recommended for this content unless you accept that.

### Important honesty notes

- The site has **no backend**. Anything she writes in the "something I still want you to understand" box stays in her browser session — it is **not** sent to Vipin. The on-page privacy notice says so, and there's a copy button so she can send it through a channel she chooses.
- The site never claims her responses are delivered, never claims she forgave, and never sends notifications or reminders.
- If you add photos or a voice note to `public/assets/`, remember anyone who can open the site can also fetch those asset URLs directly.

## Music and sound

The speaker icon in the header turns on a gentle, original music-box piece — generated live with the WebAudio API (soft piano-like arpeggios over warm major-seventh chords with a dreamy delay). It is composed in code (`src/audio/musicEngine.ts`), so there are no audio files, nothing copyrighted, and nothing to load. It never autoplays — it starts only when she taps the speaker, and stops the moment she taps it again. Sound effects (gift chime, note unfolds, heart sparkles) use the same engine.

If you'd rather use a real recording, add a file at `public/assets/audio/music.mp3` and wire it into `musicEngine.ts` — but the built-in piece works with zero assets.

## Accessibility

- Semantic HTML, keyboard-focusable everything, visible focus rings
- Dialogs trap focus, close on Escape, and restore focus
- `prefers-reduced-motion` disables drift, twinkle, and the typewriter (full text shows instantly)
- All text is screen-reader accessible and selectable after reveal
- No autoplaying audio; sound effects are WebAudio-generated and off by default
- Canvas starfield pauses when the tab is hidden
- Scene progress is announced via `aria-live` and a `role="progressbar"` with a textual scene counter

## Performance choices

- The heart universe uses DOM hearts over a canvas starfield with 3 parallax layers — GPU-friendly, no physics, no WebGL. Three.js was deliberately skipped to keep the page silky on phones.
- All art is original inline SVG/CSS — zero image downloads, zero external GIFs.
- Framer Motion animations are cleaned up on unmount; the starfield cancels its animation frame on tab hide.

## Test report

Verified during development:

- `npx tsc --noEmit` — **pass** (0 errors)
- `npm test` — **30/30 pass** (progress math, milestones, typewriter timing, heart layout spacing, music engine scheduling, config integrity, no-forgiveness-claims guard)
- `npm run build` — **pass** (366 KB JS / 115 KB gzip, 21.9 KB CSS / 5.65 KB gzip)
- `npm run preview` smoke test — index, favicon, and JS bundle all return 200
- Browser verification (Playwright) — header overlap, heart tap-blocking layer divs, heart bunching (12 overlapping pairs → 0), envelope flap covering letter text, all confirmed fixed in the built bundle

Manual checklist still worth doing on your phone before sending:

- [ ] Open the deployed link on iOS/Android (Instagram and WhatsApp in-app browsers)
- [ ] Confirm no horizontal scroll at 320px, 360px, 390px, 430px
- [ ] Test the gift opens, every teddy opens a note, every heart opens a message
- [ ] Test with sound off, with reduced motion on, and after a refresh mid-visit
- [ ] Confirm `tailscale serve stop` makes the site unreachable

## Project structure

```
Mahi/
├── public/
│   ├── assets/{teddy,gifts,paper,memories,audio}/   # optional local assets
│   └── favicon.svg
├── src/
│   ├── audio/soundEngine.ts      # WebAudio sound effects (no audio files needed)
│   ├── audio/musicEngine.ts      # WebAudio music-box melody (no audio files needed)
│   ├── components/               # GiftBox, TeddySticker, EffortMeter, …
│   ├── data/experience.ts        # ALL content — edit this to personalize
│   ├── hooks/                    # useTypewriter, useReducedMotion, useLocalStorage
│   ├── scenes/                   # one file per scene
│   ├── state/ExperienceContext.tsx
│   ├── styles/global.css         # the whole design system
│   ├── utils/{progress,heartLayout}.ts
│   ├── App.tsx
│   └── main.tsx
├── tests/{experience,musicEngine}.test.ts
├── scripts/deploy-tailscale.ps1
└── scripts/stop-tailscale.ps1
```

## Tech

React 18 · TypeScript · Vite 6 · Framer Motion · Lucide icons · Google Fonts (Caveat, DM Serif Display, Inter) — the site works fine if fonts fail to load.

---

*I made this because you matter to me. I'm sorry for my part in what happened. I hope this makes you feel cared for, and I want the effort I make afterward to matter even more than this page.*

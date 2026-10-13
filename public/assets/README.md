# Local assets

All illustrations in this project are original inline SVG and CSS — no external GIFs, no hotlinked images, no third-party artwork.

## Optional folders

- `audio/` — drop a personally recorded voice note as `voice-note.mp3`, then set `voiceNote.enabled = true` in `src/data/experience.ts`.
- `memories/` — drop photos (e.g. `memory-1.jpg`) and list them in `src/data/experience.ts` under `scrapbook.memories`, then set `scrapbook.enabled = true`.
- `teddy/`, `gifts/`, `paper/` — reserved; the teddy bears, gifts, and paper textures are all generated in code.

## Privacy note

Anything placed in `public/` becomes a static asset of the site. Anyone who can open the site can also fetch its asset URLs directly. Do not place anything in these folders that you would not share with the person who has the link.

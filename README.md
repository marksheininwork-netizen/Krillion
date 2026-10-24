# Krillion-inspired Diving Word Game

An original browser word game inspired by the category-diving concept of krillion.io. Not affiliated with the original game.

## Gameplay
- Exactly seven distinct category prompts per dive, with 20 seconds for each.
- One valid answer advances each prompt. Incorrect answers shake the input without advancing or deducting points.
- Rarity tiers: Plankton (10 pts), Schooler (30 pts), Deep Cut (60 pts), One in a Krillion (100 pts).
- 10 meters per point, up to 700 points and 7,000 meters.
- Daily Dive and randomized Unlimited rounds; local saved daily progress.
- Animated score/depth, progressively darkening ocean, drifting sea creatures, bubble effects, rarity reveal, pause/resume, optional synthesized audio feedback.
- Sound is off by default. Use Pause to freeze the 20-second timer; Resume continues where you left off.

## Technical architecture
- `index.html`: self-contained responsive frontend, state, animations, synthesized Web Audio.
- `src/worker.js`: Cloudflare Worker routing and answer validation API.
- `prompts.json`: curated category and answer data.
- `wrangler.jsonc`: Cloudflare Worker with static asset binding.
- Deploy with `npx wrangler deploy`.

## Important limitations
The curated database is not exhaustive; valid answers not in it may be rejected. Rarity scores are manually assigned, **not** sourced from historical Krillion responses. The browser currently owns its timer and score state, so competitive anti-cheat is not yet implemented. Multiplayer, accounts, friends, archive, themed packs, and original game's precise presentation and private scoring are not replicated. Daily mode saves locally, not to a server. This is not an exact clone.

## Development checklist
- [x] Seven prompts and 20-second countdown
- [x] Retry invalid answers
- [x] Depth tiers and score animations
- [x] Pause/resume, optional sound
- [x] Underwater animated scene and rarity reveal
- [ ] Authoritative server-side round session and timer
- [ ] Broad verified answer knowledge base with aliases
- [ ] Analytics-derived rarity scoring
- [ ] Complete feature parity for game modes and social features
- [ ] Automated tests and live browser verification

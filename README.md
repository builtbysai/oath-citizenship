# Oath — Study for U.S. Citizenship (Redesign)

A redesign of [builtbysai/oath-citizenship](https://github.com/builtbysai/oath-citizenship) — the free, bilingual (English / Español) study app for the U.S. naturalization civics test, built from official USCIS materials.

**Live:** https://builtbysai.com/oath-citizenship-redesign/

## What changed

The engine is untouched: all 128 questions (2025 test), the 100-question 2008 bank, 65/20 special set, English reading/writing vocabulary, dictation, N-400 interview questions, spaced repetition, streaks, interview countdown, read-aloud, and offline support all work exactly as before. What changed is the design:

- **"The certificate" aesthetic** — warm paper, ink navy, and gold; a civic-document feel instead of a generic quiz template.
- **Fraunces + Public Sans** — a distinctive display serif paired with the actual typeface of the U.S. Web Design System, both self-hosted.
- **A home dashboard** — readiness ring, today's session (due review, weak spots, new questions), interview countdown, and the full mock interview front and center.
- **Study by category** — category cards with per-category progress instead of a 128-card wall.
- **Hand-drawn icon set** — every icon is a custom SVG; no icon library, no emoji icons.
- **Human copy** — no em-dash-stuffed greetings, no bold-everything headlines; typographic hierarchy through size, space, and contrast.

## Build

Single-file app. Sources live in `src/` (`template.html`, `app.js`, `data.js`, `data2008.js`, `vocab.js`, `n400.js`, `build.py`, `fonts/`); run `python3 src/build.py` to regenerate `index.html` at the repo root. Fonts are self-hosted in `fonts/`.

## Original

This is a design study. The original app lives at [builtbysai/oath-citizenship](https://github.com/builtbysai/oath-citizenship) and is untouched by this repo.

Study aid only — not legal advice. Spanish is a study translation; the official 2025 materials are published in English. Officeholder/local answers change — always check [uscis.gov/citizenship/testupdates](https://www.uscis.gov/citizenship/testupdates) before your interview.

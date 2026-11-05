# Oath

A free, bilingual (English / Español) study app for the U.S. naturalization civics test, built from official USCIS materials. It works offline and installs as a PWA.

- 128 questions (2025 test) and the 100-question 2008 bank
- 65/20 special set
- English reading and writing vocabulary, dictation
- N-400 interview questions (Part 9)
- Full mock interview
- Spaced repetition, streaks, interview countdown, read-aloud
- First-launch setup (language, test version, interview date) that lands in a study session
- Responsive: bottom bar on phones, sidebar and side-by-side panes on desktop

## Build

```
python3 src/build.py
```

Writes `index.html`, a single file with all scripts and styles inlined. `src/template.html` lists the inputs as `<script src>` and `<link rel="stylesheet">` tags (and holds the SVG icon sprite); add a file by adding a tag. Fonts referenced by `url(fonts/...)` in the CSS are base64-inlined. Open `index.html` directly or serve the repo root.

## Source layout

| File | Contents |
| --- | --- |
| `src/data.js`, `src/data2008.js` | Question banks (2025, 2008) |
| `src/vocab.js` | Reading and writing vocabulary, practice sentences |
| `src/n400.js` | N-400 Part 9 questions |
| `src/strings.js` | All UI text in English and Spanish, plus the checklist |
| `src/state.js` | localStorage state, spaced repetition, streak, countdown, speech, resume snapshots |
| `src/views.js` | One render function per screen, plus the icon-first controls |
| `src/app.js` | Router, event handling, startup |
| `src/style.css` | All styles (mobile first; 760px and 900px breakpoints) |
| `src/fonts/` | Public Sans and Fraunces (variable woff2), inlined into the build |
| `sw.js`, `manifest.json` | Offline cache and install manifest |

State is stored in localStorage under keys prefixed `oath_`. Every screen renders from state; there is no framework and no dependency.

## Disclaimer

Study aid only, not legal advice. Spanish is a study translation; the official 2025 materials are published in English. Officeholder and local answers change, so check [uscis.gov/citizenship/testupdates](https://www.uscis.gov/citizenship/testupdates) before your interview.

# Oath — Study for U.S. Citizenship

A free, bilingual (English / Español) study app for the U.S. naturalization civics test, built from official USCIS materials.

**Live:** https://builtbysai.com/oath-citizenship/

## What's inside

- **128-question 2025 civics test bank** with every accepted answer, parsed from the official USCIS document M-1778 (09/25) — verified Sept 2026
- **2008 test support** — filing-date picker routes pre-Oct-20-2025 filers to the official 2008 materials
- **65/20 special test** filter and dedicated practice mode
- **Interview-style practice tests** (2025: 20 questions, 12 to pass · 65/20: 10 questions, 6 to pass)
- **English test prep** — official USCIS reading & writing vocabulary with tap-to-hear audio
- **Process guide** — eligibility, the 8 steps, fees, age/disability exceptions
- **Official resource links** (uscis.gov) throughout
- **Read-aloud** via Web Speech API in both languages; progress saved on-device

⚠️ Study aid only — not legal advice. Spanish is a study translation; the official 2025 materials are published in English. Officeholder/local answers change — always check [uscis.gov/citizenship/testupdates](https://www.uscis.gov/citizenship/testupdates) before your interview.

## Build

Single-file app. Sources live in `src/` (`template.html`, `data.js`, `vocab.js`, `app.js`); run `python3 build.py` to regenerate `index.html`.

#!/usr/bin/env python3
"""QA v22: assert the Interview-tab checklist and Process-tab packing list
now match official USCIS sources (N-400 instructions 01/20/25,
my.uscis.gov/citizenship/what_to_expect, USCIS Policy Manual Vol 12 Pt B
Ch 3). Old unsupported claims must be fully gone; new official items must
render in EN and ES. Zero console errors."""
import argparse, sys, time
sys.path.insert(0, ".")
from cdp_base import CDP

passed = failed = 0
def check(name, cond, detail=""):
    global passed, failed
    if cond: passed += 1; print("PASS", name)
    else: failed += 1; print("FAIL", name, detail)

ap = argparse.ArgumentParser()
ap.add_argument("--port", type=int, default=9223)
ap.add_argument("--base", default="http://127.0.0.1:8901")
ap.add_argument("--shots", default="/tmp/oath_shots_v22")
a = ap.parse_args()

cdp = CDP(a.port, a.base, a.shots)
cdp.goto()
time.sleep(1.5)

html = cdp.ev("document.documentElement.outerHTML") or ""
gone = ["Copy of your filed N-400 and everything you submitted",
        "Copia de su N-400 presentado",
        "Birth certificate (+ certified English translation if not in English)",
        "Federal tax returns (last 3",
        "Declaraciones de impuestos federales (\u00faltimos 3 a 5",
        "Arrive 15\u201330 minutes early",
        "Llegue 15\u201330 minutos temprano",
        "Llega 15\u201330 minutos antes",
        "Children\u2019s birth certificates (if applicable)",
        "Court / arrest records (if applicable)",
        "Tax returns (last 3"]
check("old unsupported claims fully gone", all(g not in html for g in gone),
      [g for g in gone if g in html])

check("checklist is 13 docs + 4 day items",
      cdp.ev("CHECKLIST.length") == 17 and
      cdp.ev("CHECKLIST.filter(c=>c.sec==='docs').length") == 13 and
      cdp.ev("CHECKLIST.filter(c=>c.sec==='day').length") == 4)

# Interview tab, EN
cdp.click('.tab[data-v="interview"]'); time.sleep(1.0)
en = cdp.ev("document.body.innerText") or ""
check("EN passport (official wording)",
      "All valid and expired passports and travel documents issued since you became a permanent resident" in en)
check("EN IRS tax transcripts 5/3 years", "IRS tax transcripts (last 5 years; 3 years if filing through marriage" in en)
check("EN selective service item", "Selective Service status letter" in en)
check("EN children birth certs (marriage basis)",
      "Children's birth certificates or adoption decrees (if filing through marriage" in en)
check("EN home evidence (6+ month trips)", "Evidence you kept your U.S. home" in en)
check("EN court-certified originals", "Originals or court-certified copies of arrest and court records" in en)
check("EN arrival (no fabricated 15-30)", "Arrive at the date and time on your appointment notice" in en)
check("EN translation cert note", "full English translation with a signed certification" in en)

# Interview tab, ES
cdp.click('#langEs'); time.sleep(1.2)
cdp.click('.tab[data-v="interview"]'); time.sleep(1.0)
es = cdp.ev("document.body.innerText") or ""
check("ES IRS tax transcripts", "Transcripciones de impuestos del IRS" in es)
check("ES selective service item", "Carta de estado del Servicio Selectivo" in es)
check("ES arrival", "Llega en la fecha y hora de tu aviso de cita" in es)
check("ES translation cert note", "traducci\u00f3n completa al ingl\u00e9s con certificaci\u00f3n firmada" in es)
check("ES court-certified originals", "copias certificadas por el tribunal" in es)
cdp.shot("v22-interview-es.png")

# Process tab, EN
cdp.click('#langEn'); time.sleep(1.2)
cdp.click('.tab[data-v="process"]'); time.sleep(1.0)
pen = cdp.ev("document.body.innerText") or ""
check("EN pack: spouse citizenship proof", "Spouse\u2019s proof of U.S. citizenship (if filing through marriage)" in pen)
check("EN pack: selective service", "Selective Service status letter" in pen)
check("EN pack: home evidence", "Evidence you kept your U.S. home" in pen)
check("EN pack: IRS tax transcripts", "IRS tax transcripts (last 5 years" in pen)
check("EN pack: day tip arrival", "Arrive at the date and time on your appointment notice" in pen)
cdp.click('#langEn'); time.sleep(1.2)
cdp.click('.tab[data-v="resources"]'); time.sleep(1.0)
ren = cdp.ev("document.body.innerText") or ""
check("EN resources: what-to-expect link",
      "What to Expect at the Interview" in ren and
      "my.uscis.gov/citizenship/what_to_expect" in (cdp.ev("document.documentElement.outerHTML") or ""))

cdp.click('#langEs'); time.sleep(1.2)
cdp.click('.tab[data-v="resources"]'); time.sleep(1.0)
res2 = cdp.ev("document.body.innerText") or ""
check("ES resources: what-to-expect link", "Qu\u00e9 esperar en la entrevista" in res2)

# 390px mobile viewport: interview checklist, no horizontal overflow
cdp.viewport(390, 844, mobile=True)
cdp.click('#langEn'); time.sleep(1.2)
cdp.click('.tab[data-v="interview"]'); time.sleep(1.0)
check("390px: no horizontal overflow",
      cdp.ev("document.documentElement.scrollWidth") <= 390)
cdp.shot("v22-interview-390.png")

cdp.drain()
check("zero console/page errors", not cdp.errors, "; ".join(cdp.errors[:3]))

print(f"\n{passed} passed, {failed} failed")
sys.exit(1 if failed else 0)

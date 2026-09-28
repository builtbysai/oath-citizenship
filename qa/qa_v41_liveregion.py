#!/usr/bin/env python3
"""qa_v41_liveregion.py - verify the screen-reader live-region announcements (v41).

New ground (v41): every result verdict (practice done pass/fail, review
graduation, mock summary, dictation/interview feedback, reading/dictation
done) must ALSO be posted as plain text to the persistent #sr-live region
(role="status", aria-live="polite"), because innerHTML swaps are silent to
assistive tech. Before v41 there were zero live regions in the app.

Usage: qa_v41_liveregion.py [--port 9222] [--base http://127.0.0.1:8899]
Exit 0 only if all checks pass and there are zero console/page errors.
"""
import sys, os, time, argparse, json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import cdp_base

PORT, BASE = 9222, "http://127.0.0.1:8899"
ap = argparse.ArgumentParser()
ap.add_argument("--port", type=int, default=PORT)
ap.add_argument("--base", default=BASE)
ap.add_argument("--shots", default="")
args = ap.parse_args()

SHOTS = args.shots or os.path.expanduser(
    "~/workspace/goals/oath-citizenship-study-app/hidden_files/audit/shots")
FAILS = []

def check(name, cond, detail=""):
    print(("PASS " if cond else "FAIL ") + name + ((" | " + str(detail)) if detail else ""), flush=True)
    if not cond:
        FAILS.append(name + " | " + str(detail))

cdp = cdp_base.CDP(args.port, args.base, SHOTS)
cdp.drain()

def tgoto(tag, query=""):
    # cache-busting query + content marker: never trust a green run on stale bytes
    cdp.goto("/index.html?%s=%d" % (query or "v41", int(time.time() * 1000)) + ("&" + tag if tag else ""), wait=3.0)

def live_text():
    time.sleep(0.35)  # announce() re-arms via a 30ms delayed write
    return cdp.ev("document.getElementById('sr-live').textContent")

def wait_for(sel, tries=25):
    for _ in range(tries):
        if cdp.ev("!!document.querySelector(%s)" % json.dumps(sel)):
            return True
        time.sleep(0.3)
    return False

def tab(v):
    assert cdp.click('.tab[data-v="%s"]' % v) == "ok", "tab " + v
    time.sleep(0.4)

def answer(right):
    assert wait_for("#showA")
    assert cdp.click("#showA") == "ok"
    assert cdp.click('[data-r="y"]' if right else '[data-r="n"]') == "ok"

def answer_until_retry(seq):
    for a in seq:
        if cdp.ev("!!document.querySelector('#retry')"):
            break
        answer(a)

# ---------- static: the region exists and is AT-visible but visually hidden ----------
tgoto("static")
check("sr-live in served bytes (no stale cache)", cdp.ev("!!document.getElementById('sr-live')"))
check("role=status", cdp.ev("document.getElementById('sr-live').getAttribute('role')") == "status")
check("aria-live=polite", cdp.ev("document.getElementById('sr-live').getAttribute('aria-live')") == "polite")
cs = cdp.ev("(()=>{const s=getComputedStyle(document.getElementById('sr-live'));"
             "return {pos:s.position,w:s.width,disp:s.display,vis:s.visibility,ov:s.overflow}})()")
check("visually hidden, not display:none/visibility:hidden",
      cs["pos"] == "absolute" and cs["w"] == "1px" and cs["disp"] != "none" and cs["vis"] != "hidden",
      cs)
check("sr-live persists across tab renders", (tab("practice"), tab("study"),
      cdp.ev("!!document.getElementById('sr-live')"))[2])
check("initially empty", cdp.ev("document.getElementById('sr-live').textContent") == "")
check("sr-only CSS in served bytes", cdp.ev(
    "Array.from(document.styleSheets).some(s=>{try{return Array.from(s.cssRules).some(r=>r.selectorText==='.sr-only')}catch(e){return false}})"))

# ---------- practice done: pass + fail ----------
tgoto("clean"); cdp.ev("localStorage.clear()"); tgoto("clean")
tab("practice")
assert cdp.click('[data-p="std"]') == "ok"
answer_until_retry([True] * 20)
assert wait_for("#retry")
check("std pass announced", live_text() == cdp.ev("T().passMsg"), live_text())

cdp.click("#newtest"); time.sleep(0.4)
assert cdp.click('[data-p="std"]') == "ok"
answer_until_retry([False] * 20)
assert wait_for("#retry")
check("std fail announced", live_text() == cdp.ev("T().failMsg"), live_text())

# ---------- review deck: stillLeft then graduation (clearedAll) ----------
cdp.ev("localStorage.clear()"); tgoto("clean2")
tab("practice")
assert cdp.click('[data-p="std"]') == "ok"
answer(False)                       # one mistake at ivl 1
answer_until_retry([True] * 20)
assert wait_for("#retry")
cdp.click("#newtest"); time.sleep(0.4)
assert cdp.click('[data-p="review"]') == "ok"
answer_until_retry([True] * 25)
assert wait_for("#retry")
check("review stillLeft announced",
      live_text() == cdp.ev("T().stillLeft(1)"), live_text())
# force the mistake to the graduation rung and run the due drill
cdp.ev("""(()=>{const k=[...mistakes][0];
  srs[k]={ivl:30,next:Date.now()-1000}; saveSrs(); saveMistakes();})()""")
cdp.click("#newtest"); time.sleep(0.4)
assert cdp.click('[data-p="due"]') == "ok"
answer_until_retry([True] * 25)
assert wait_for("#retry")
check("graduation clearedAll announced",
      live_text() == cdp.ev("T().clearedAll"), live_text())
check("mistake actually graduated", cdp.ev("mistakes.size") == 0)

# ---------- dictation feedback + done ----------
cdp.ev("localStorage.clear()"); tgoto("clean3")
tab("english")
assert cdp.click("#dictStart") == "ok"
assert wait_for("#dzIn")
s = cdp.ev("dz.order[dz.idx]")
cdp.ev("document.querySelector('#dzIn').value=" + json.dumps(s))
assert cdp.click("#dzCheck") == "ok"
assert wait_for("#dzNext")
check("dictation correct announced", live_text() == cdp.ev("T().dictCorrect"), live_text())
assert cdp.click("#dzNext") == "ok"
assert wait_for("#dzIn")
cdp.ev("document.querySelector('#dzIn').value='totally wrong words here'")
assert cdp.click("#dzCheck") == "ok"
assert wait_for("#dzNext")
check("dictation wrong announced", live_text() == cdp.ev("T().dictWrong"), live_text())
assert cdp.click("#dzNext") == "ok"
assert wait_for("#dzIn")
s = cdp.ev("dz.order[dz.idx]")
cdp.ev("document.querySelector('#dzIn').value=" + json.dumps(s))
assert cdp.click("#dzCheck") == "ok"
assert wait_for("#dzNext")
assert cdp.click("#dzNext") == "ok"
assert wait_for("#dzAgain")
check("dictation done pass announced", live_text() == cdp.ev("T().passMsg"), live_text())

# ---------- interview feedback + done ----------
tab("interview")
assert wait_for("#intStart")
assert cdp.click("#intStart") == "ok"
assert wait_for("[data-yn]")
exp = cdp.ev("ipz.order[ipz.idx].expected")
yn = "y" if exp == "yes" else "n"
assert cdp.click('[data-yn="%s"]' % yn) == "ok"
assert wait_for("#intNext")
fb_ok = cdp.ev("!!document.querySelector('.fb-ok')")
want = cdp.ev("T().intCorrect" if fb_ok else "T().intWrong")
check("interview feedback announced", live_text() == want, live_text())
# finish the round (10 questions) with correct answers
for _ in range(30):
    if cdp.ev("!!document.querySelector('#intAgain')"):
        break
    if cdp.ev("!!document.querySelector('#intNext')"):
        assert cdp.click("#intNext") == "ok"
        continue
    assert wait_for("[data-yn]")
    exp = cdp.ev("ipz.order[ipz.idx].expected")
    assert cdp.click('[data-yn="%s"]' % ("y" if exp == "yes" else "n")) == "ok"
assert wait_for("#intAgain")
check("interview done score announced",
      live_text() == cdp.ev("T().intScore(ipz.ok)"), live_text())

# ---------- reading done ----------
tab("english")
assert cdp.click("#readStart") == "ok"
for _ in range(3):
    assert wait_for("#rpOk")
    assert cdp.click("#rpOk") == "ok"
assert wait_for("#rpAgain")
check("reading done pass announced", live_text() == cdp.ev("T().passMsg"), live_text())

# ---------- full mock: summary verdict announced ----------
cdp.ev("localStorage.clear()"); tgoto("clean4")
tab("study")
assert cdp.ev("!!document.querySelector('#mockStart')"), "mockStart on study tab"
assert cdp.click("#mockStart") == "ok"
# stage 1: reading 3/3
for _ in range(3):
    assert wait_for("#rpOk"); assert cdp.click("#rpOk") == "ok"
# stage 2: dictation 3/3 exact
for _ in range(3):
    assert wait_for("#dzIn")
    s = cdp.ev("dz.order[dz.idx]")
    cdp.ev("document.querySelector('#dzIn').value=" + json.dumps(s))
    assert cdp.click("#dzCheck") == "ok"
    assert wait_for("#dzNext"); assert cdp.click("#dzNext") == "ok"
# stage 3: civics 12/12 via self-mark
for _ in range(80):
    if cdp.ev("!!document.querySelector('.mockrow')"):
        break
    if cdp.ev("!!document.querySelector('#intNext')"):
        assert cdp.click("#intNext") == "ok"; continue
    if cdp.ev("!!document.querySelector('[data-yn]')"):
        exp = cdp.ev("ipz.order[ipz.idx].expected")
        assert cdp.click('[data-yn="%s"]' % ("y" if exp == "yes" else "n")) == "ok"
        continue
    if cdp.ev("!!document.querySelector('#showA')"):
        answer(True); continue
    time.sleep(0.3)
assert wait_for(".mockrow"), "mock summary rendered"
check("mock pass verdict announced", live_text() == cdp.ev("T().mockPassAll"), live_text())

cdp.drain()
nerr = len(cdp.errors)
print("console/page errors: %d" % nerr, flush=True)
for e in cdp.errors[:10]:
    print("  ERR:", e, flush=True)
check("zero console/page errors", nerr == 0, cdp.errors[:3])

print("FAILURES: %d" % len(FAILS), flush=True)
sys.exit(1 if FAILS else 0)

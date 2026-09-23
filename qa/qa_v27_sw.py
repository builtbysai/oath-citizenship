#!/usr/bin/env python3
"""qa_v27_sw.py: verify the SW document-branch no-store change.
1. Fresh SW install (post origin_reset), SW controls the page.
2. Freshness: mutate local index.html, reload, new content MUST appear
   (with the old default-cache fetch it could stay stale).
3. Offline: with network killed, reload still serves the cached app
   (128 study cards), proving the no-store fallback path works.
Restores index.html byte-identical afterwards.
"""
import sys, time, shutil, hashlib, os
sys.path.insert(0, "/home/hatch/workspace/citizenship-app/qa")
import cdp_base, argparse

ap = argparse.ArgumentParser()
ap.add_argument("--port", type=int, default=9222)
ap.add_argument("--base", default="http://127.0.0.1:8899")
args = ap.parse_args()

APP = "/home/hatch/workspace/citizenship-app"
IDX = os.path.join(APP, "index.html")
BAK = "/tmp/index_backup_v27.html"
MARK = "<!-- SWFRESH27 -->"

PASS, FAIL = [], []
def check(name, cond, detail=""):
    (PASS if cond else FAIL).append(name)
    print(("PASS " if cond else "FAIL ") + name + (f" — {detail}" if detail and not cond else ""), flush=True)

orig = open(IDX, "rb").read()
orig_sha = hashlib.sha256(orig).hexdigest()
shutil.copyfile(IDX, BAK)

cdp = cdp_base.CDP(args.port, args.base, "/tmp/shots_qa_v27")
for m in ("Page.enable", "Runtime.enable", "Log.enable", "Network.enable"):
    cdp.send(m, {})
cdp.viewport(1440, 900)
cdp.goto("/index.html?v27sw=" + str(int(time.time())))
cdp.ev("localStorage.clear(); sessionStorage.clear();")
cdp.goto("/index.html?v27sw=" + str(int(time.time())))

# wait for SW control
ctl = None
for _ in range(40):
    ctl = cdp.ev("!!navigator.serviceWorker.controller")
    if ctl: break
    time.sleep(0.5)
check("SW controls page", ctl is True)

# mutate the served document, reload: new bytes must show up
html = open(IDX, "rb").read()
assert b"</body>" in html
open(IDX, "wb").write(html.replace(b"</body>", ("\n" + MARK + "\n</body>").encode(), 1))
cdp.ev("location.reload()"); time.sleep(3); cdp.drain()
seen = cdp.ev(f"document.documentElement.outerHTML.includes({MARK!r})")
check("fresh doc served after change (no-store)", seen is True,
      "page still showed stale HTML" if not seen else "")

# restore byte-identical, reload: marker must be gone
shutil.copyfile(BAK, IDX)
now = hashlib.sha256(open(IDX, "rb").read()).hexdigest()
check("index.html restored byte-identical", now == orig_sha)
cdp.ev("location.reload()"); time.sleep(3); cdp.drain()
gone = cdp.ev(f"!document.documentElement.outerHTML.includes({MARK!r})")
check("restored doc served after change (no-store)", gone is True)

# offline: kill network, reload, app must render from SW cache
cdp.send("Network.emulateNetworkConditions", {"offline": True, "latency": 0,
    "downloadThroughput": 0, "uploadThroughput": 0})
cdp.ev("location.reload()"); time.sleep(3); cdp.drain()
cards = cdp.ev("document.querySelectorAll('.qcard').length")
check("app works offline via SW (no-store fallback)", cards == 128, f"qcards={cards}")
cdp.send("Network.emulateNetworkConditions", {"offline": False, "latency": 0,
    "downloadThroughput": -1, "uploadThroughput": -1})

cdp.drain()
errs = [e for e in cdp.errors]
check("zero console/page errors", not errs, "; ".join(errs[:3]))
print(f"\nqa_v27: {len(PASS)} passed, {len(FAIL)} failed", flush=True)
sys.exit(1 if FAIL else 0)

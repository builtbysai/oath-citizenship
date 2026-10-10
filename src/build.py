import os
here = os.path.dirname(os.path.abspath(__file__))
def rd(p): return open(os.path.join(here, p), encoding="utf-8").read()
tpl = rd("template.html")
data = rd("data.js")
data2008 = rd("data2008.js")
vocab = rd("vocab.js")
n400 = rd("n400.js")
app = rd("app.js")
out = tpl.replace("/*__DATA_JS__*/", data).replace("/*__DATA2008_JS__*/", data2008).replace("/*__VOCAB_JS__*/", vocab).replace("/*__N400_JS__*/", n400).replace("/*__APP_JS__*/", app)
assert "__DATA_JS__" not in out and "__DATA2008_JS__" not in out and "__VOCAB_JS__" not in out and "__N400_JS__" not in out and "__APP_JS__" not in out
open(os.path.join(here, "..", "index.html"), "w", encoding="utf-8").write(out)
print("built index.html:", len(out), "bytes")

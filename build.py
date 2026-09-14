tpl = open('/home/hatch/workspace/citizenship-app/template.html').read()
data = open('/home/hatch/workspace/citizenship-app/data.js').read()
data2008 = open('/home/hatch/workspace/citizenship-app/data2008.js').read()
vocab = open('/home/hatch/workspace/citizenship-app/vocab.js').read()
app = open('/home/hatch/workspace/citizenship-app/app.js').read()
out = tpl.replace('/*__DATA_JS__*/', data).replace('/*__DATA2008_JS__*/', data2008).replace('/*__VOCAB_JS__*/', vocab).replace('/*__APP_JS__*/', app)
assert '__DATA_JS__' not in out and '__DATA2008_JS__' not in out and '__VOCAB_JS__' not in out and '__APP_JS__' not in out
open('/home/hatch/workspace/citizenship-app/oath_v2.html','w').write(out)
print('built oath_v2.html:', len(out), 'bytes')

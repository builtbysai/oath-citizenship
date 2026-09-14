tpl = open('/home/hatch/workspace/citizenship-app/template.html').read()
data = open('/home/hatch/workspace/citizenship-app/data.js').read()
vocab = open('/home/hatch/workspace/citizenship-app/vocab.js').read()
app = open('/home/hatch/workspace/citizenship-app/app.js').read()
out = tpl.replace('/*__DATA_JS__*/', data).replace('/*__VOCAB_JS__*/', vocab).replace('/*__APP_JS__*/', app)
assert '__DATA_JS__' not in out and '__APP_JS__' not in out and '__VOCAB_JS__' not in out
open('/home/hatch/workspace/citizenship-app/oath_v1.html','w').write(out)
print('built oath_v1.html:', len(out), 'bytes')

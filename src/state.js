/* State: persistence, spaced repetition, streak, countdown, speech, resume snapshots.
   Everything here is UI-free. Keys in localStorage are prefixed oath_. */
/* ---------- state ---------- */
const isPlainObj = v => v !== null && typeof v === "object" && !Array.isArray(v);
function readArray(key, itemTest){
  try{
    const v = JSON.parse(localStorage.getItem(key));
    if(!Array.isArray(v)) return [];
    return itemTest ? v.filter(itemTest) : v;
  }catch(e){ return []; }
}
function readObject(key){
  try{
    const v = JSON.parse(localStorage.getItem(key));
    return isPlainObj(v) ? v : {};
  }catch(e){ return {}; }
}
const isStr = v => typeof v === "string";
let lang = localStorage.getItem("oath_lang") === "es" ? "es" : "en";
let filed = localStorage.getItem("oath_filed") === "before" ? "before" : "after";
let known = new Set(readArray("oath_known", isStr));
let histLog = readArray("oath_history", isPlainObj);
let mistakes = new Set(readArray("oath_mistakes", isStr));
const saveKnown = () => localStorage.setItem("oath_known", JSON.stringify([...known]));
const saveHistory = () => localStorage.setItem("oath_history", JSON.stringify(histLog.slice(-20)));
const saveMistakes = () => localStorage.setItem("oath_mistakes", JSON.stringify([...mistakes].slice(0,500)));
function readSrs(key){
  const out = {}, v = readObject(key);
  for(const k of Object.keys(v)){
    const e = v[k];
    if(isPlainObj(e) && typeof e.ivl === "number" && typeof e.next === "number") out[k] = e;
  }
  return out;
}
let srs = readSrs("oath_srs");
const saveSrs = () => localStorage.setItem("oath_srs", JSON.stringify(srs));
const SRS_IVLS = [1,3,7,14,30];
const srsGet = k => srs[k] || {ivl:1, next:0};
const srsDue = k => srsGet(k).next <= Date.now();
function srsOnMiss(k){ srs[k] = {ivl:1, next:Date.now()}; saveSrs(); }
function srsOnRight(k){
  const i = SRS_IVLS.indexOf(srsGet(k).ivl);
  if(i >= SRS_IVLS.length-1){ mistakes.delete(k); delete srs[k]; }
  else { const ivl = SRS_IVLS[i+1]; srs[k] = {ivl, next:Date.now()+ivl*864e5}; }
  saveMistakes(); saveSrs();
}
let intMistakes = new Set(readArray("oath_int_mistakes", isStr));
const saveIntMistakes = () => localStorage.setItem("oath_int_mistakes", JSON.stringify([...intMistakes].slice(0,40)));
const Q = () => filed==="before" ? QUESTIONS2008 : QUESTIONS;
const qkey = n => (filed==="before"?"08":"25") + ":" + n;
(function migrateKeys(){
  const mig = s => new Set([...s].map(k => String(k).includes(":") ? k : "25:"+k));
  const k2 = mig(known), m2 = mig(mistakes);
  const same = (a,b) => a.size===b.size && [...a].every(k=>b.has(k));
  if(!same(k2,known) || !same(m2,mistakes)){ known=k2; mistakes=m2; saveKnown(); saveMistakes(); }
  let srsTouch = false;
  mistakes.forEach(k=>{ if(!srs[k]){ srs[k]={ivl:1,next:0}; srsTouch=true; } });
  if(srsTouch) saveSrs();
})();


let voices = [];
function loadVoices(){ try{ voices = speechSynthesis.getVoices(); }catch(e){} }
if("speechSynthesis" in window){ loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function speak(text, rate, en){
  if(!("speechSynthesis" in window)) return;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const useEn = en || lang === "en";
    u.lang = useEn ? "en-US" : "es-US";
    u.rate = rate || 0.88; u.pitch = 1;
    const v = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(useEn ? "en" : "es"));
    if(v) u.voice = v;
    speechSynthesis.speak(u);
  }catch(e){}
}


/* ---------- progress queries ---------- */
function catProgress(cat){
  const qs = Q().filter(q=>q.cat===cat);
  const k = qs.filter(q=>known.has(qkey(q.n))).length;
  return {total:qs.length, known:k, pct:qs.length?Math.round(k/qs.length*100):0};
}
function dueCount(){
  const bank = filed==="before" ? "08:" : "25:";
  return [...mistakes].filter(k=>k.startsWith(bank)&&srsDue(k)).length;
}
function unseenCount(){
  return Q().filter(q=>!known.has(qkey(q.n))).length;
}
function cats(){ const seen=[]; Q().forEach(q=>{ const c=q.cat; if(!seen.includes(c)) seen.push(c); }); return seen; }
function catLabel(enCat){
  const q = Q().find(x=>x.cat===enCat);
  return q ? (lang==="es" ? q.cat_es : q.cat) : enCat;
}

/* ---------- daily streak ---------- */
function dayStr(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function getStreak(){
  const st = readObject("oath_streak");
  if(!Number.isFinite(st.count) || typeof st.last !== "string") return 0;
  const y = new Date(); y.setDate(y.getDate()-1);
  return (st.last===dayStr(new Date()) || st.last===dayStr(y)) ? st.count : 0;
}
const streakToday = () => readObject("oath_streak").last === dayStr(new Date());
function bumpStreak(){
  const st = readObject("oath_streak");
  if(!Number.isFinite(st.count)) st.count = 0;
  if(typeof st.last !== "string") st.last = "";
  const t = dayStr(new Date());
  if(st.last!==t){
    const y = new Date(); y.setDate(y.getDate()-1);
    st.count = (st.last===dayStr(y)) ? st.count+1 : 1;
    st.last = t;
    localStorage.setItem("oath_streak", JSON.stringify(st));
  }
  return st.count;
}
/* ---------- first launch ---------- */
const isOnboarded = () => localStorage.getItem("oath_onboarded") === "1" ||
  known.size > 0 || histLog.length > 0 || mistakes.size > 0 || localStorage.getItem("oath_streak") !== null;
const setOnboarded = () => localStorage.setItem("oath_onboarded", "1");
function setFiled(f){ filed = f === "before" ? "before" : "after"; localStorage.setItem("oath_filed", filed); }
function setIDate(v){ /^\d{4}-\d{2}-\d{2}$/.test(v) ? localStorage.setItem("oath_idate", v) : localStorage.removeItem("oath_idate"); }
/* ---------- interview countdown ---------- */
function getIDate(){
  const v = localStorage.getItem("oath_idate") || "";
  if(!/^\d{4}-\d{2}-\d{2}$/.test(v)) return "";
  const p = v.split("-"), d = new Date(+p[0], +p[1]-1, +p[2]);
  if(isNaN(d.getTime()) || d.getFullYear()!==+p[0] || d.getMonth()!==+p[1]-1 || d.getDate()!==+p[2]) return "";
  return v;
}
function daysLeft(){
  const v = getIDate(); if(!v) return null;
  const p = v.split("-"); if(p.length!==3) return null;
  const d = new Date(+p[0], +p[1]-1, +p[2]);
  const now = new Date(); now.setHours(0,0,0,0);
  return Math.round((d - now) / 86400000);
}

/* ---------- checklist ---------- */
function loadCheck(){ return new Set(readArray("oath_checklist", isStr)); }
function saveCheck(set){ localStorage.setItem("oath_checklist", JSON.stringify([...set])); }
function weakestCats(){
  const bank = filed==="before"?"08":"25";
  const agg = {};
  histLog.filter(h=>h.bank===bank && h.cats).forEach(h=>{
    Object.entries(h.cats).forEach(([c,v])=>{
      agg[c] = agg[c] || {r:0,w:0}; agg[c].r += v.r||0; agg[c].w += v.w||0;
    });
  });
  return Object.entries(agg)
    .map(([c,v])=>({c, n:v.r+v.w, acc:v.r/(v.r+v.w)}))
    .filter(r=>r.n>=3).sort((a,b)=>a.acc-b.acc).slice(0,5);
}

/* ---------- session state (one active round per kind; null when idle) ---------- */
let pz = null;   // civics practice
let rp = null;   // reading practice
let dz = null;   // dictation
let ipz = null;  // N-400 interview practice
let mock = null; // full mock interview results so far
let dzMistakes = new Set(readArray("oath_dz_mistakes", isStr));
const saveDzMistakes = () => localStorage.setItem("oath_dz_mistakes", JSON.stringify([...dzMistakes].slice(0,30)));

/* ---------- round snapshots: resume after reload ---------- */
const ROUNDS_KEY = "oath_rounds";
function saveRounds(){
  const snap = {};
  if(pz && !pz.done && pz.idx < pz.order.length){
    snap.practice = {bank: pz.bank, ns: pz.order.map(q=>q.n), idx: pz.idx,
      right: pz.right, wrong: pz.wrong, need: pz.need, maxWrong: pz.maxWrong,
      missed: pz.missed.map(q=>q.n), catRes: pz.catRes,
      senior: !!pz.senior, review: !!pz.review, due: !!pz.due, weak: !!pz.weak, mock: !!pz.mock};
  }
  if(rp && rp.idx < rp.order.length){
    snap.reading = {ss: rp.order.slice(), idx: rp.idx, ok: rp.ok, mock: !!rp.mock};
  }
  if(dz && dz.idx < dz.order.length){
    snap.dict = {ss: dz.order.slice(), idx: dz.idx, ok: dz.ok, mock: !!dz.mock, review: !!dz.review};
  }
  if(ipz && ipz.idx < ipz.order.length){
    snap.interview = {items: ipz.order.map(q=>q.item), idx: ipz.idx, ok: ipz.ok,
      mock: !!ipz.mock, review: !!ipz.review};
  }
  if(mock){
    snap.mock = {read: mock.read|0, dict: mock.dict|0, n400: mock.n400|0,
      civics: mock.civics ? {right: mock.civics.right|0, total: mock.civics.total|0, pass: !!mock.civics.pass} : null};
  }
  try{ localStorage.setItem(ROUNDS_KEY, JSON.stringify(snap)); }catch(e){}
}
function validCatRes(v){
  if(!v || typeof v !== "object" || Array.isArray(v)) return {};
  const out = {};
  for(const k of Object.keys(v)){
    const r = v[k];
    if(r && typeof r === "object" && Number.isInteger(r.r) && r.r >= 0 && Number.isInteger(r.w) && r.w >= 0) out[k] = {r: r.r, w: r.w};
  }
  return out;
}
function restoreRounds(){
  let s; try{ s = JSON.parse(localStorage.getItem(ROUNDS_KEY)); }catch(e){ return; }
  if(!s || typeof s !== "object" || Array.isArray(s)) return;
  const isInt = v => Number.isInteger(v) && v >= 0;
  const p = s.practice;
  if(p && typeof p === "object" && (p.bank === "08" || p.bank === "25") && Array.isArray(p.ns) && p.ns.length){
    const bankQ = p.bank === "08" ? QUESTIONS2008 : QUESTIONS;
    const order = p.ns.filter(Number.isInteger).map(n=>bankQ.find(q=>q.n===n)).filter(Boolean);
    if(order.length && isInt(p.idx) && p.idx < order.length){
      pz = {order, idx: p.idx, right: isInt(p.right)?p.right:0, wrong: isInt(p.wrong)?p.wrong:0,
        need: isInt(p.need)&&p.need>0?p.need:order.length,
        maxWrong: isInt(p.maxWrong)?p.maxWrong:order.length+1,
        missed: (Array.isArray(p.missed)?p.missed:[]).filter(Number.isInteger).map(n=>bankQ.find(q=>q.n===n)).filter(Boolean),
        catRes: validCatRes(p.catRes), done: false, recorded: false,
        senior: !!p.senior, review: !!p.review, due: !!p.due, weak: !!p.weak, mock: !!p.mock, bank: p.bank};
    }
  }
  const r = s.reading;
  if(r && typeof r === "object" && Array.isArray(r.ss) && r.ss.length && r.ss.every(x=>typeof x === "string" && READ_SENTENCES.includes(x))
     && isInt(r.idx) && r.idx < r.ss.length){
    rp = {order: r.ss.slice(), idx: r.idx, ok: isInt(r.ok)?r.ok:0, mock: !!r.mock};
  }
  const z = s.dict;
  if(z && typeof z === "object" && Array.isArray(z.ss) && z.ss.length && z.ss.every(x=>typeof x === "string" && DICT_SENTENCES.includes(x))
     && isInt(z.idx) && z.idx < z.ss.length){
    dz = {order: z.ss.slice(), idx: z.idx, ok: isInt(z.ok)?z.ok:0, mock: !!z.mock, review: !!z.review};
  }
  const iv = s.interview;
  if(iv && typeof iv === "object" && Array.isArray(iv.items) && iv.items.length
     && iv.items.every(x=>typeof x === "string" && N400.questions.some(q=>q.item===x))
     && isInt(iv.idx) && iv.idx < iv.items.length){
    ipz = {order: iv.items.map(it=>N400.questions.find(q=>q.item===it)), idx: iv.idx,
      ok: isInt(iv.ok)?iv.ok:0, mock: !!iv.mock, review: !!iv.review};
  }
  const m = s.mock;
  if(m && typeof m === "object"){
    mock = {read: isInt(m.read)?m.read:0, dict: isInt(m.dict)?m.dict:0, n400: isInt(m.n400)?m.n400:0,
      civics: (m.civics && typeof m.civics === "object") ? {right: isInt(m.civics.right)?m.civics.right:0,
        total: isInt(m.civics.total)?m.civics.total:0, pass: !!m.civics.pass} : undefined};
  }
}


/* ---------- util ---------- */
function shuffled(arr){
  const a = [...arr];
  for(let i = a.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

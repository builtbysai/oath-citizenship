/* Views: one render function per screen. Each builds an HTML string into #v-<name>.
   Controls carry data-do="action"; app.js maps actions to functions.
   State lives in state.js; text lives in strings.js. */

const T = () => STR[lang];
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const view = id => document.getElementById("v-"+id);
const tabLabel = id => T().tabs.find(x => x[0]===id)[1];
function announce(msg){
  const r = document.getElementById("sr-live");
  if(!r || !msg) return;
  r.textContent = "";
  setTimeout(()=>{ r.textContent = msg; }, 30);
}

/* ---------- builders ---------- */
const ic = (name, cls) => `<svg class="i${cls?" "+cls:""}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const iconBtn = (icon, label, attrs, cls) =>
  `<button class="ib${cls?" "+cls:""}" ${attrs||""} aria-label="${esc(label)}" title="${esc(label)}">${ic(icon)}</button>`;
const bar = pct => `<div class="bar" aria-hidden="true"><i style="width:${Math.max(0,Math.min(100,pct))}%"></i></div>`;
const sayBtn = (text, en, rate) =>
  iconBtn("speaker", T().listen, `data-do="say" data-say="${esc(text)}"${en?' data-en="1"':""}${rate?` data-rate="${rate}"`:""}`, "say");
/* A large tappable option: icon bubble, title, optional subtitle, optional badge. */
const opt = (icon, label, sub, attrs, badge) =>
  `<button class="opt" ${attrs}><span class="opt-i">${ic(icon)}</span><span class="grow"><b>${esc(label)}</b>${sub?`<small>${esc(sub)}</small>`:""}</span>${badge!==undefined&&badge!==""?`<span class="badge">${esc(badge)}</span>`:ic("right","chev")}</button>`;
const seg = (items, attr, isOn) =>
  `<div class="seg" role="group">${items.map(([v,lb])=>`<button data-do="${attr}" data-v="${esc(v)}" aria-pressed="${isOn(v)}">${esc(lb)}</button>`).join("")}</div>`;
const pageTitle = id => `<h1 class="page-title">${esc(tabLabel(id))}</h1>`;
const knownIn = list => list.filter(q=>known.has(qkey(q.n))).length;

/* Session scaffold: top row (exit, progress, count), body, pinned footer. */
const sess = (pct, count, body, foot, cls) => `<div class="sess ${cls||""}">
  <div class="sess-top">${iconBtn("x", T().exit, 'data-do="exit"')}${bar(pct)}<span class="count">${esc(count)}</span></div>
  <div class="sess-body">${body}</div>
  <div class="sess-foot">${foot||""}</div></div>`;
const mockSteps = n => `<div class="steps" role="img" aria-label="${esc(T().mockPhase(n))}">${[1,2,3,4].map(i=>`<i${i<=n?' class="on"':""}></i>`).join("")}</div>`;
const roundBtns = (attr, yesLabel, noLabel) => `<div class="pair">
  <button class="round no" data-do="${attr}" data-v="n" aria-label="${esc(noLabel)}" title="${esc(noLabel)}">${ic("x")}</button>
  <button class="round yes" data-do="${attr}" data-v="y" aria-label="${esc(yesLabel)}" title="${esc(yesLabel)}">${ic("check")}</button></div>`;
const primary = (attrs, label, icon) => `<button class="btn" ${attrs}>${esc(label)}${icon?ic(icon):""}</button>`;
const quiet = (attrs, label, icon) => `<button class="btn quiet" ${attrs}>${icon?ic(icon):""}${esc(label)}</button>`;
/* End-of-round panel: score ring, headline, optional extra, actions. */
function doneHTML(good, headline, right, total, extra, foot){
  const C = 276.5, off = total ? C*(1-right/total) : C;
  return `<div class="sess done"><div class="sess-body">
    <div class="ring big ${good?"good":"warn"}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="trk" cx="50" cy="50" r="44"/><circle class="val" cx="50" cy="50" r="44" style="--to:${off.toFixed(1)}"/></svg>
      <div class="ring-n"><b>${right}</b><small>/ ${total}</small></div></div>
    <h1 class="verdict ${good?"pass":"fail"}">${good?ic("check","tick"):""}${esc(headline)}</h1>${extra||""}
  </div><div class="sess-foot">${foot}</div></div>`;
}

/* ---------- chrome ---------- */
let curView = "home";
const TAB_ICON = {home:"home", study:"cards", practice:"test", english:"abc", interview:"talk", guide:"guide", settings:"sliders"};
const BAR_TABS = ["home","study","practice","english","interview"];
function sessionActive(){
  if(curView==="practice") return !!pz;
  if(curView==="english") return !!((rp && rp.idx<rp.order.length) || (dz && dz.idx<dz.order.length));
  if(curView==="interview") return !!((ipz && ipz.idx<ipz.order.length) || (mock && mock.done));
  return false;
}
function langToggle(){
  return `<button data-do="lang" data-v="en" aria-pressed="${lang==="en"}">EN</button><button data-do="lang" data-v="es" aria-pressed="${lang==="es"}">ES</button>`;
}
function renderChrome(){
  const t = T();
  document.documentElement.lang = lang;
  const tab = (id, label, cls) => `<button class="${cls}" data-do="goto" data-v="${id}"${curView===id?' aria-current="page"':""}>${ic(TAB_ICON[id])}<span>${esc(label)}</span></button>`;
  document.getElementById("tabs").innerHTML =
    t.tabs.map(([id,lb])=>tab(id,lb,"tab")).join("") + tab("settings", t.settingsH, "tab");
  document.getElementById("bar").innerHTML = BAR_TABS.map(id=>tab(id,tabLabel(id),"tab")).join("");
  document.getElementById("top").innerHTML = `<h1 class="top-title">${esc(curView==="home"?"Oath":curView==="settings"?t.settingsH:tabLabel(curView))}</h1>
    <div class="lang" role="group" aria-label="Language / Idioma">${langToggle()}</div>
    ${iconBtn("guide", tabLabel("guide"), 'data-do="goto" data-v="guide"'+(curView==="guide"?' aria-current="page"':""))}
    ${iconBtn("sliders", t.settingsH, 'data-do="goto" data-v="settings"'+(curView==="settings"?' aria-current="page"':""))}`;
  document.getElementById("langSide").innerHTML = langToggle();
  document.getElementById("disclaimer").textContent = t.disc;
  document.getElementById("app").classList.toggle("focus", sessionActive());
}

/* ---------- home ---------- */
function nextStep(){
  const t = T(), due = dueCount(), unseen = unseenCount();
  if(due>0) return {act:"due", label:t.heroDue(due), icon:"redo"};
  if(unseen>0) return {act:"study", label:t.heroStudy, sub:t.leftCount(unseen), icon:"play"};
  return {act:"practice", label:t.heroTest, icon:"test"};
}
function renderHome(){
  const t = T(), el = view("home");
  const total = Q().length, knownN = knownIn(Q());
  const streak = getStreak(), n = daysLeft(), hasDate = getIDate() !== "" && n !== null;
  const cd = !hasDate ? t.cdAdd : n < 0 ? t.cdPast : n === 0 ? t.cdToday : t.interviewIn(n);
  const next = nextStep();
  const off = total ? 276.5*(1-knownN/total) : 276.5;
  const mcount = [...mistakes].filter(k=>k.startsWith(filed==="before"?"08:":"25:")).length;
  const tile = (icon, label, act) => `<button class="tile" data-do="${act}">${ic(icon)}<span>${esc(label)}</span></button>`;
  el.innerHTML = `<div class="wrap home">
    <section class="hero">
      <div class="ring ${knownN===total&&total?"good":""}"><svg viewBox="0 0 100 100" role="img" aria-label="${esc(t.knownCount(knownN,total))}"><circle class="trk" cx="50" cy="50" r="44"/><circle class="val" cx="50" cy="50" r="44" style="--to:${off.toFixed(1)}"/></svg>
        <div class="ring-n"><b>${knownN}</b><small>${esc(t.ofTotal(total))}</small></div></div>
      <div class="hero-side">
        <div class="chip streak${streakToday()?" lit":""}" ${streak?"":"hidden"}>${ic("flame")}<span>${esc(t.streakLine(streak))}</span></div>
        <button class="chip" data-do="goto" data-v="settings">${ic("cal")}<span>${esc(cd)}</span></button>
      </div>
      <button class="cta" data-do="${next.act}">${ic(next.icon)}<span class="grow"><b>${esc(next.label)}</b>${next.sub?`<small>${esc(next.sub)}</small>`:""}</span>${ic("right","chev")}</button>
    </section>
    <section class="tiles">
      ${tile("test", t.tilePractice, "practice")}
      ${tile("award", t.tileMock, "mock")}
      ${weakestCats().length?tile("target", t.weakLine, "weak"):""}
      ${mcount?tile("redo", t.reviewLabel, "review"):""}
    </section>
    <section class="topics wide-only">
      <h2>${esc(t.topicsH)}</h2>
      <ul>${cats().map(c=>{
        const p = catProgress(c), full = p.total && p.known===p.total;
        return `<li><button class="topic" data-do="topic" data-c="${esc(c)}"><span class="grow">${esc(catLabel(c))}</span>${full?ic("check","tick"):`<span class="detail">${p.known}/${p.total}</span>`}${bar(p.pct)}</button></li>`;
      }).join("")}</ul>
    </section></div>`;
}

/* ---------- study: flashcards + list ---------- */
let studyCat = "all", studyStar = false, studyQ = "", studyIdx = 0, studyShown = false, studyEnd = false,
    studyPane = "card", studyFresh = true;
function filteredQuestions(){
  let list = Q().filter(q=>{
    if(studyStar && !q.star) return false;
    if(studyCat!=="all" && q.cat!==studyCat) return false;
    return true;
  });
  const sq = studyQ.trim().toLowerCase();
  if(sq) list = list.filter(q =>
    String(q.n)===sq ||
    q.q.en.toLowerCase().includes(sq) || q.q.es.toLowerCase().includes(sq) ||
    q.a.en.join(" ").toLowerCase().includes(sq) || q.a.es.join(" ").toLowerCase().includes(sq));
  return list;
}
function studyReset(){
  const list = filteredQuestions(), i = list.findIndex(q=>!known.has(qkey(q.n)));
  studyIdx = i < 0 ? 0 : i; studyShown = false; studyEnd = false;
}
function answerHTML(q){
  const t = T();
  if(q.varies){
    const key = q.varies;
    const linkKey = (key==="speaker"||key==="president"||key==="vice president"||key==="chief justice") ? "office" : key;
    const rawAns = q.a[lang].join("; ");
    const m = rawAns.match(/^(VARIES|VARÍA)\s*:\s*([^()]+?)\s*\(([^)]*(?:verificado|verified)[^)]*)\)\s*$/i);
    const current = m ? `<p class="answer">${esc(m[2].trim())}</p><p class="muted">${esc(m[3][0].toUpperCase()+m[3].slice(1))}</p>`
      : `<p class="muted">${esc(rawAns.replace(/^(VARIES|VARÍA)\s*/i,""))}</p>`;
    return `<div class="varies"><p><strong>${esc(t.variesTitle)}</strong></p>${current}
      <a href="${VARIES_LINK[key]}" target="_blank" rel="noopener">${esc(t.variesLinkLabel[linkKey]||t.variesLinkLabel.office)}</a></div>`;
  }
  return `<ul class="answers" aria-label="${esc(t.answersLabel)}">${q.a[lang].map(a=>`<li>${esc(a)}</li>`).join("")}</ul>`;
}
function renderStudy(){
  const t = T(), el = view("study");
  if(studyFresh){ studyReset(); studyFresh = false; }
  el.innerHTML = `<div class="wrap fill study" data-pane="${studyPane}">
    <div class="tools">
      <label class="select"><select id="studyCat" aria-label="${esc(t.topicsH)}">
        <option value="all"${studyCat==="all"?" selected":""}>${esc(t.allTopics)}</option>
        ${cats().map(c=>{ const p = catProgress(c); return `<option value="${esc(c)}"${studyCat===c?" selected":""}>${esc(catLabel(c))} (${p.known}/${p.total})</option>`; }).join("")}
      </select>${ic("down")}</label>
      <button class="chip toggle" data-do="star" aria-pressed="${studyStar}">${ic("star")}<span>65/20</span></button>
      <div class="views" role="group">
        ${iconBtn("cards", t.viewCards, `data-do="pane" data-v="card" aria-pressed="${studyPane==="card"}"`)}
        ${iconBtn("list", t.viewList, `data-do="pane" data-v="list" aria-pressed="${studyPane==="list"}"`)}
      </div>
    </div>
    <div class="pane pane-list">
      <label class="search">${ic("search")}<input id="qsearch" type="search" placeholder="${esc(t.searchPh)}" value="${esc(studyQ)}" aria-label="${esc(t.searchPh)}" autocomplete="off"></label>
      <ul class="qlist" id="qlist"></ul>
    </div>
    <div class="pane pane-card" id="studyCard"></div></div>`;
  fillStudyList(); fillStudyCard();
}
function fillStudyList(){
  const t = T(), list = filteredQuestions(), ul = document.getElementById("qlist");
  if(!ul) return;
  ul.innerHTML = list.length ? list.map((q,i)=>{
    const k = known.has(qkey(q.n));
    return `<li><button class="qrow${i===studyIdx&&!studyEnd?" cur":""}${k?" known":""}" data-do="pick" data-i="${i}">
      <span class="qn">${q.n}</span><span class="grow">${esc(q.q[lang])}</span>${k?ic("check","tick"):""}</button></li>`;
  }).join("") : `<li class="empty">${esc(t.noResults)}</li>`;
  const cur = ul.querySelector(".cur"); if(cur && cur.scrollIntoView) cur.scrollIntoView({block:"nearest"});
}
function fillStudyCard(){
  const t = T(), list = filteredQuestions(), el = document.getElementById("studyCard");
  if(!el) return;
  if(!list.length){ el.innerHTML = `<p class="empty">${esc(t.noResults)}</p>`; return; }
  const kn = knownIn(list);
  if(studyEnd){
    const all = kn===list.length;
    el.innerHTML = `<div class="fc end"><div class="ring big ${all?"good":"warn"}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="trk" cx="50" cy="50" r="44"/><circle class="val" cx="50" cy="50" r="44" style="--to:${(276.5*(1-kn/list.length)).toFixed(1)}"/></svg>
        <div class="ring-n"><b>${kn}</b><small>/ ${list.length}</small></div></div>
      <h2 class="verdict ${all?"pass":""}">${all?ic("check","tick"):""}${esc(all?t.deckAll:t.deckEnd)}</h2>
      <div class="end-actions">${primary('data-do="restart"', t.startOver, "redo")}${quiet('data-do="practice"', t.tilePractice, "test")}</div></div>`;
    return;
  }
  if(studyIdx >= list.length) studyIdx = list.length-1;
  const q = list[studyIdx], k = known.has(qkey(q.n));
  const say = q.q[lang] + ". " + q.a[lang].join(", ");
  el.innerHTML = `<div class="fc">
    <div class="fc-head"><span class="pos">${studyIdx+1} / ${list.length}</span>${bar(kn/list.length*100)}</div>
    <div class="fc-card">
      <div class="fc-meta"><span>${esc(lang==="es"?q.cat_es:q.cat)}${q.star?" · 65/20":""}</span>${sayBtn(say)}</div>
      <p class="fc-q"><span class="qn">${q.n}</span>${esc(q.q[lang])}</p>
      <div class="fc-a">${studyShown ? answerHTML(q) : `<button class="btn quiet" data-do="reveal">${esc(t.showAnswer)}</button>`}</div>
    </div>
    <div class="fc-foot">
      ${iconBtn("left", t.prev, `data-do="prev"${studyIdx===0?" disabled":""}`, "lg")}
      <button class="checkbtn${k?" on":""}" data-do="known" aria-pressed="${k}" aria-label="${esc(t.knowIt)}" title="${esc(t.knowIt)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></button>
      ${iconBtn("right", t.next, 'data-do="next"', "lg")}
    </div></div>`;
}
function studyStep(d){
  const len = filteredQuestions().length;
  studyShown = false;
  if(d>0 && studyIdx >= len-1) studyEnd = true;
  else if(d>0) studyIdx++;
  else if(studyEnd) studyEnd = false;
  else studyIdx = Math.max(0, studyIdx-1);
  fillStudyList(); fillStudyCard();
}
function studyToggleKnown(btn){
  const list = filteredQuestions(), q = list[studyIdx];
  if(!q || studyEnd) return;
  const k = qkey(q.n), now = !known.has(k);
  now ? known.add(k) : known.delete(k);
  saveKnown();
  if(now) bumpStreak();
  btn.classList.toggle("on", now); btn.setAttribute("aria-pressed", now);
  if(!now){ fillStudyList(); return; }
  btn.classList.add("pop");
  btn.disabled = true;
  setTimeout(()=>{ if(curView==="study"){ studyStep(1); renderChrome(); } }, 480);
}

/* ---------- practice (civics) ---------- */
function renderPractice(){
  const el = view("practice");
  if(!pz) renderPracticeSetup(el);
  else if(pz.done) renderPracticeDone(el);
  else renderPracticeQuestion(el);
  renderChrome();
}
function renderPracticeSetup(el){
  const t = T(), before = filed==="before";
  const bank = before ? "08:" : "25:";
  const mcount = [...mistakes].filter(k=>k.startsWith(bank)).length, d = dueCount();
  const focus = weakestCats(), hist = histLog.slice(-6).reverse();
  el.innerHTML = `<div class="wrap two">${pageTitle("practice")}
    <div class="col"><div class="opts">
      ${opt("test", before?t.testStd08:t.testStd, before?t.testStdDesc08:t.testStdDesc, 'data-do="start" data-p="std"')}
      ${opt("star", t.testSenior, t.testSeniorDesc, 'data-do="start" data-p="senior"')}
      ${opt("award", t.mockH, t.mockSub, 'data-do="mock"')}
      ${d?opt("cal", t.dueLabel, "", 'data-do="start" data-p="due"', d):""}
      ${mcount?opt("redo", t.reviewLabel, "", 'data-do="start" data-p="review"', mcount):""}
      ${focus.length?opt("target", t.weakLine, "", 'data-do="weak"'):""}
    </div></div>
    <div class="col">
      ${hist.length?`<section><h2>${esc(t.historyH)}</h2><ul class="hist">${hist.map(h=>
        `<li class="${h.pass?"pass":"fail"}"><b>${h.right}/${h.total}</b>${h.pass?ic("check"):ic("redo")}<small>${esc(h.d.slice(5))}</small></li>`).join("")}</ul></section>`:""}
      ${focus.length?`<section><h2>${esc(t.focusH)}</h2><ul class="focus">${focus.map(r=>
        `<li><span class="grow">${esc(catLabel(r.c))}</span><span class="detail">${Math.round(r.acc*100)}%</span>${bar(r.acc*100)}</li>`).join("")}</ul></section>`:""}
    </div></div>`;
}
function renderPracticeQuestion(el){
  const t = T(), q = pz.order[pz.idx], shown = !!pz.shown;
  const body = `${pz.mock?mockSteps(3):""}
    <div class="tally" aria-label="${esc(t.correctToPass(pz.need)+", "+t.wrongs(pz.wrong))}"><span class="ok">${ic("check")}${pz.right}/${pz.need}</span><span class="no">${ic("x")}${pz.wrong}</span></div>
    ${q.cat?`<p class="eyebrow">${esc(catLabel(q.cat))}</p>`:""}
    <div class="prompt-row"><h2 class="prompt">${esc(q.q[lang])}</h2>${sayBtn(q.q[lang])}</div>
    ${shown?`<div class="reveal">${answerHTML(q)}</div>`:""}`;
  const foot = shown ? roundBtns("grade", t.iKnew, t.iMissed) : primary('data-do="pshow"', t.showAnswer);
  el.innerHTML = sess(pz.idx/pz.order.length*100, (pz.idx+1)+" / "+pz.order.length, body, foot);
}
function startPractice(mode, isMock){
  const review = mode==="review"||mode==="due", due = mode==="due", senior = mode==="senior", before = filed==="before";
  let pool;
  if(review) pool = Q().filter(q=>mistakes.has(qkey(q.n)) && (!due || srsDue(qkey(q.n))));
  else pool = senior ? Q().filter(q=>q.star) : Q();
  pool = shuffled(pool);
  const total = review ? Math.min(pool.length,20) : (senior?10:(before?10:20));
  const need = review ? Math.ceil(total*0.7) : (senior?6:(before?6:12));
  const maxWrong = review ? total+1 : (senior?5:(before?5:9));
  pz = {order:pool.slice(0,total), idx:0, right:0, wrong:0, need, maxWrong, missed:[], catRes:{}, done:false, senior, review, due, recorded:false, mock:!!isMock,
    bank: before?"08":"25"};
  saveRounds();
  renderPractice();
}
function drillCats(){
  const rows = weakestCats();
  const miss = rows.filter(r=>r.acc<1);
  return (miss.length?miss:rows).map(r=>r.c);
}
function startWeakPractice(){
  const weak = drillCats();
  if(!weak.length) return;
  const before = filed==="before";
  const pool = shuffled(Q().filter(q=>weak.includes(q.cat)));
  const total = Math.min(pool.length, before?10:20);
  if(total<3) return;
  const need = Math.min(before?6:12, Math.ceil(total*0.6));
  pz = {order:pool.slice(0,total), idx:0, right:0, wrong:0, need, maxWrong:total+1, missed:[], catRes:{}, done:false, senior:false, review:false, weak:true, recorded:false, mock:false,
    bank: before?"08":"25"};
  saveRounds();
  show("practice");
}
function practiceAnswer(ok){
  const q = pz.order[pz.idx], k = pz.bank+":"+q.n;
  const wasDue = srsDue(k);
  const cr = (pz.catRes[q.cat] = pz.catRes[q.cat] || {r:0,w:0});
  if(ok){ pz.right++; cr.r++; if(pz.review && wasDue) srsOnRight(k); }
  else {
    pz.wrong++; cr.w++; pz.missed.push(q);
    if(pz.review) srsOnMiss(k);
    else { mistakes.add(k); srsOnMiss(k); saveMistakes(); }
  }
  pz.idx++; pz.shown = false;
  const finished = pz.review ? pz.idx>=pz.order.length
    : (pz.right>=pz.need || pz.wrong>=pz.maxWrong || pz.idx>=pz.order.length);
  if(finished) pz.done = true;
  saveRounds();
  renderPractice();
}
function renderPracticeDone(el){
  const t = T(), pass = pz.right>=pz.need;
  if(!pz.recorded){
    pz.recorded = true;
    bumpStreak();
    histLog.push({d:dayStr(new Date()),
      mode: pz.review?(pz.due?"due":"review"):(pz.senior?"senior":(pz.weak?"weak":"std")),
      right:pz.right, total:pz.idx, pass, bank: pz.bank, cats:pz.catRes});
    saveHistory();
    pz.missed.forEach(q=>{ const k=pz.bank+":"+q.n; mistakes.add(k); srsOnMiss(k); }); saveMistakes();
  }
  if(pz.mock){ if(!mock) mock = {}; mock.civics = {right:pz.right, total:pz.idx, pass}; pz = null; startMockN400(); saveRounds(); return; }
  const bankLeft = [...mistakes].filter(k=>k.startsWith(pz.bank+":")).length;
  const good = pz.review ? bankLeft===0 : pass;
  const headMsg = pz.review ? (bankLeft===0 ? t.clearedAll : t.stillLeft(bankLeft)) : (pass ? t.passMsg : t.failMsg);
  const missed = pz.missed.length ? `<div class="missed"><h2>${esc(t.reviewMissed)}</h2><ul>${pz.missed.map(q=>
      `<li><span class="qn">${q.n}</span><span class="grow">${esc(q.q[lang])}<small>${esc(q.a[lang].join(", "))}</small></span></li>`).join("")}</ul></div>` : "";
  el.innerHTML = doneHTML(good, headMsg, pz.right, pz.idx, missed,
    primary('data-do="retry"', t.tryAgain, "redo") + quiet('data-do="exit"', t.backToSetup));
  announce(headMsg);
  saveRounds();
}

/* ---------- english: reading, dictation ---------- */
let engVocab = null;
function renderEnglish(){
  if(rp && rp.idx < rp.order.length){ renderReadQ(); return; }
  if(dz && dz.idx < dz.order.length){ renderDictQ(); return; }
  if(rp && rp.done){ renderReadDone(); return; }
  if(dz && dz.done){ renderDictDone(); return; }
  const t = T(), el = view("english");
  if(engVocab){
    const words = engVocab==="read" ? READING_VOCAB : WRITING_VOCAB;
    el.innerHTML = `<div class="wrap"><div class="subhead">${iconBtn("left", t.back, 'data-do="vocab" data-v=""')}<h1>${esc(engVocab==="read"?t.readVocab:t.writeVocab)}</h1></div>
      <p class="words">${words.map(w=>`<button class="word" data-do="say" data-en="1" data-say="${esc(w)}">${esc(w)}</button>`).join("")}</p></div>`;
    renderChrome(); return;
  }
  const panel = (icon, title, rule, start, extra) => `<section class="panel">
    <div class="panel-h"><span class="opt-i">${ic(icon)}</span><h2>${esc(title)}</h2></div><p>${esc(rule)}</p>
    <div class="panel-a">${start}${extra}</div></section>`;
  el.innerHTML = `<div class="wrap two">${pageTitle("english")}
    <div class="col">${panel("book", t.readH, t.readRule,
        primary('data-do="readStart"', t.start, "play"),
        quiet('data-do="vocab" data-v="read"', t.vocab, "list"))}
      <section class="panel plain"><div class="panel-h"><span class="opt-i">${ic("mic")}</span><h2>${esc(t.speakH)}</h2></div><p>${esc(t.speakP)}</p></section></div>
    <div class="col">${panel("pen", t.dictH, t.dictRule,
        primary('data-do="dictStart"', t.start, "play"),
        quiet('data-do="vocab" data-v="write"', t.vocab, "list") +
        (dzMistakes.size?quiet('data-do="dzReview"', t.reviewLabel+" ("+dzMistakes.size+")", "redo"):""))}</div></div>`;
  renderChrome();
}
function startReadPractice(){
  rp = { order:shuffled(READ_SENTENCES).slice(0,3), idx:0, ok:0 };
  dz = null;
  saveRounds();
  renderEnglish();
}
function renderReadQ(){
  const t = T(), el = view("english"), s = rp.order[rp.idx];
  const body = `${rp.mock?mockSteps(1):""}<div class="prompt-row"><h2 class="prompt">${esc(s)}</h2>${sayBtn(s, true)}</div>`;
  el.innerHTML = sess(rp.idx/3*100, t.readQ(rp.idx+1,3), body, roundBtns("rpGrade", t.readOk, t.readNo));
  renderChrome();
}
function rpNext(ok){
  if(ok) rp.ok++;
  rp.idx++;
  saveRounds();
  if(rp.idx>=3) renderReadDone(); else renderReadQ();
}
function renderReadDone(){
  if(!rp.done){ rp.done = true; bumpStreak(); }
  if(rp.mock){ if(!mock) mock = {}; mock.read = rp.ok; rp = null; startMockDict(); saveRounds(); return; }
  saveRounds();
  const t = T(), el = view("english"), pass = rp.ok>=1, msg = pass?t.passMsg:t.failMsg;
  el.innerHTML = doneHTML(pass, msg, rp.ok, 3, "",
    primary('data-do="readStart"', t.intAgain, "redo") + quiet('data-do="exit"', tabLabel("english")));
  announce(msg);
  renderChrome();
}
function startDictation(){
  dz = { order:shuffled(DICT_SENTENCES).slice(0,3), idx:0, ok:0, review:false };
  rp = null;
  saveRounds();
  renderEnglish();
}
function startDzReview(){
  const ss = DICT_SENTENCES.filter(s=>dzMistakes.has(s));
  if(!ss.length){ renderEnglish(); return; }
  dz = { order:shuffled(ss), idx:0, ok:0, review:true };
  rp = null;
  saveRounds();
  renderEnglish();
}
function normWords(s){ return s.toLowerCase().replace(/[.,!?;:'"]/g,"").split(/\s+/).filter(Boolean); }
function renderDictQ(){
  if(dz.res){ renderDictResult(); return; }
  const t = T(), el = view("english"), s = dz.order[dz.idx];
  const body = `${dz.mock?mockSteps(2):""}
    <button class="play" data-do="say" data-en="1" data-rate=".7" data-say="${esc(s)}" aria-label="${esc(t.dictPlay)}" title="${esc(t.dictPlay)}">${ic("speaker")}</button>
    <textarea id="dzIn" class="input" rows="3" placeholder="${esc(t.dictPh)}" aria-label="${esc(t.dictPh)}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></textarea>`;
  el.innerHTML = sess(dz.idx/dz.order.length*100, t.dictQ(dz.idx+1, dz.order.length), body, primary('data-do="dzCheck"', t.dictCheck, "check"));
  const ta = el.querySelector("#dzIn");
  ta.value = dz.draft || "";
  ta.oninput = ()=>{ dz.draft = ta.value; };
  renderChrome();
}
function checkDictation(){
  if(dz.res) return;
  const s = dz.order[dz.idx];
  const rawIn = view("english").querySelector("#dzIn").value;
  const tw = normWords(s), iw = normWords(rawIn);
  const right = tw.length===iw.length && tw.every((w,i)=>w===iw[i]);
  if(right) dz.ok++;
  else { dzMistakes.add(s); saveDzMistakes(); }
  if(dz.review && right){ dzMistakes.delete(s); saveDzMistakes(); }
  dz.res = {right, rawIn};
  dz.draft = "";
  renderDictResult();
}
function renderDictResult(){
  const t = T(), el = view("english"), s = dz.order[dz.idx], {right, rawIn} = dz.res;
  const tw = normWords(s), iw = normWords(rawIn);
  const words = tw.map((w,i)=>`<span class="dw ${iw[i]===w?"ok":"bad"}">${esc(w)}</span>`).join(" ");
  const body = `<p class="verdict ${right?"pass":"fail"}">${ic(right?"check":"x","tick")}${esc(right?t.dictCorrect:t.dictWrong)}</p>
    <div class="prompt-row"><p class="prompt">${words}</p>${sayBtn(s, true)}</div>
    ${rawIn.trim()?`<p class="muted">${esc(t.dictYour)} ${esc(rawIn.trim())}</p>`:""}`;
  el.innerHTML = sess(dz.idx/dz.order.length*100, t.dictQ(dz.idx+1, dz.order.length), body, primary('data-do="dzNext"', t.dictNext, "arrow"));
  announce(right?t.dictCorrect:t.dictWrong);
  renderChrome();
}
function dzNext(){
  dz.res = null; dz.idx++; saveRounds();
  if(dz.idx>=dz.order.length) renderDictDone(); else renderDictQ();
}
function renderDictDone(){
  if(!dz.done){ dz.done = true; bumpStreak(); }
  if(dz.mock){ if(!mock) mock = {}; mock.dict = dz.ok; dz = null; startMockCivics(); saveRounds(); return; }
  saveRounds();
  const t = T(), el = view("english");
  const left = dzMistakes.size;
  const pass = dz.review ? left===0 : dz.ok>=1;
  const msg = dz.review ? (left===0 ? t.clearedAll : t.stillLeft(left)) : (pass ? t.passMsg : t.failMsg);
  el.innerHTML = doneHTML(pass, msg, dz.ok, dz.order.length, "",
    (dz.review&&left ? primary('data-do="dzReview"', t.reviewLabel+" ("+left+")", "redo") : primary('data-do="dictStart"', t.intAgain, "redo")) +
    quiet('data-do="exit"', tabLabel("english")));
  announce(msg);
  renderChrome();
}

/* ---------- mock interview: reading, dictation, civics, N-400 ---------- */
function startMock(){
  mock = {};
  rp = { order:shuffled(READ_SENTENCES).slice(0,3), idx:0, ok:0, mock:true };
  saveRounds();
  show("english");
}
function startMockDict(){
  dz = { order:shuffled(DICT_SENTENCES).slice(0,3), idx:0, ok:0, mock:true };
  renderEnglish();
}
function startMockCivics(){ show("practice"); startPractice("std", true); }
function startMockN400(){
  ipz = { order:shuffled(N400.questions).slice(0,8), idx:0, ok:0, mock:true };
  show("interview");
}
function renderMockSummary(){
  const t = T(), el = view("interview");
  const rows = [
    [t.mockRead, mock.read, 3, mock.read>=1],
    [t.mockDict, mock.dict, 3, mock.dict>=1],
    [t.mockCiv, mock.civics.right, mock.civics.total, mock.civics.pass],
    [t.mockN400, mock.n400, 8, mock.n400>=8],
  ];
  const allPass = rows.every(r=>r[3]);
  const msg = allPass ? t.mockPassAll : t.failMsg;
  const total = rows.filter(r=>r[3]).length;
  el.innerHTML = doneHTML(allPass, msg, total, rows.length,
    `<ul class="summary">${rows.map(r=>`<li class="${r[3]?"pass":"fail"}">${ic(r[3]?"check":"redo")}<span class="grow">${esc(r[0])}</span><b>${r[1]}/${r[2]}</b></li>`).join("")}</ul>`,
    primary('data-do="mock"', t.mockStart, "redo") + quiet('data-do="exit"', tabLabel("interview")));
  announce(msg);
  renderChrome();
}

/* ---------- interview: N-400 Part 9 questions ---------- */
let intFilter = "all";
const expLabel = q => { const t = T(); return q.expected==="no" ? t.expNo : q.expected==="yes" ? t.expYes : t.expVaries; };
function nqRowHTML(q){
  const t = T(), other = lang==="es" ? q.en : q.es;
  return `<li class="q" data-item="${esc(q.item)}">
    <button class="qrow" data-do="toggle" aria-expanded="false"><span class="qn">${esc(q.item)}</span>
      <span class="grow">${esc(q[lang])}<small>${esc(expLabel(q))}</small></span>${ic("down","chev")}</button>
    <div class="qbody"><p class="muted">${esc(other)}</p>
      <p><b>${esc(t.intMeaning)}.</b> ${esc(q[lang==="es"?"meaning_es":"meaning_en"])}</p>
      <div class="qbody-a">${sayBtn(q.en, true)}</div></div></li>`;
}
function renderInterview(){
  if(mock && mock.done){ renderMockSummary(); return; }
  if(ipz && ipz.idx < ipz.order.length){ renderInterviewQ(); return; }
  if(ipz && ipz.done){ renderInterviewDone(); return; }
  const t = T(), el = view("interview");
  const list = N400.questions.filter(q=>intFilter==="all"||q.expected===intFilter);
  el.innerHTML = `<div class="wrap fill ivw">
    <div class="side-tools">${pageTitle("interview")}
      ${primary('data-do="intStart"', t.intPracticeH, "play")}
      ${intMistakes.size?quiet('data-do="intReview"', t.reviewLabel+" ("+intMistakes.size+")", "redo"):""}
      ${seg([["all",t.all],["no",t.fNo],["yes",t.fYes],["varies",t.fDep]], "ifilter", v=>intFilter===v)}</div>
    <ul class="qlist">${list.map(nqRowHTML).join("")}</ul></div>`;
  renderChrome();
}
function startInterviewPractice(){
  ipz = { order:shuffled(N400.questions).slice(0,10), idx:0, ok:0, review:false };
  saveRounds();
  renderInterview();
}
function startInterviewReview(){
  const qs = N400.questions.filter(q=>intMistakes.has(q.item));
  if(!qs.length){ renderInterview(); return; }
  ipz = { order:shuffled(qs), idx:0, ok:0, review:true };
  saveRounds();
  renderInterview();
}
function renderInterviewQ(){
  if(ipz.res){ renderInterviewResult(); return; }
  const t = T(), el = view("interview"), q = ipz.order[ipz.idx];
  const body = `${ipz.mock?mockSteps(4):""}<div class="prompt-row"><h2 class="prompt">${esc(q.en)}</h2>${sayBtn(q.en, true)}</div>`;
  const foot = `<div class="pair"><button class="btn quiet" data-do="yn" data-v="n">${esc(t.intNo)}</button><button class="btn quiet" data-do="yn" data-v="y">${esc(t.intYes)}</button></div>`;
  el.innerHTML = sess(ipz.idx/ipz.order.length*100, t.intQ(ipz.idx+1, ipz.order.length), body, foot);
  renderChrome();
}
function interviewAnswer(yes){
  if(ipz.res) return;
  const q = ipz.order[ipz.idx];
  const right = q.expected==="varies" || (yes === (q.expected==="yes"));
  if(right) ipz.ok++;
  if(!right){ intMistakes.add(q.item); saveIntMistakes(); }
  if(ipz.review && right){ intMistakes.delete(q.item); saveIntMistakes(); }
  ipz.res = {right};
  renderInterviewResult();
}
function renderInterviewResult(){
  const t = T(), el = view("interview"), q = ipz.order[ipz.idx], right = ipz.res.right;
  const varies = q.expected==="varies";
  const body = `<p class="verdict ${right?"pass":"fail"}">${ic(right?"check":"x","tick")}${esc(right?t.intCorrect:t.intWrong)}</p>
    <div class="prompt-row"><p class="prompt sm">${esc(q.en)}</p>${sayBtn(q.en, true)}</div>
    ${varies?"":`<p>${esc(q[lang==="es"?"meaning_es":"meaning_en"])}</p><p class="muted">${esc(lang==="es"?q.en:q.es)}</p>`}`;
  el.innerHTML = sess(ipz.idx/ipz.order.length*100, t.intQ(ipz.idx+1, ipz.order.length), body, primary('data-do="intNext"', t.intNext, "arrow"));
  announce(right?t.intCorrect:t.intWrong);
  renderChrome();
}
function intNext(){
  ipz.res = null; ipz.idx++; saveRounds();
  if(ipz.idx>=ipz.order.length) renderInterviewDone(); else renderInterviewQ();
}
function renderInterviewDone(){
  if(!ipz.done){ ipz.done = true; bumpStreak(); }
  if(ipz.mock){ if(!mock) mock = {}; mock.n400 = ipz.ok; mock.done = true; ipz = null; saveRounds(); renderMockSummary(); return; }
  saveRounds();
  const t = T(), el = view("interview");
  const left = intMistakes.size;
  const msg = ipz.review ? (left===0 ? t.clearedAll : t.stillLeft(left)) : t.intDone;
  el.innerHTML = doneHTML(true, msg, ipz.ok, ipz.order.length, "",
    (ipz.review&&left ? primary('data-do="intReview"', t.reviewLabel+" ("+left+")", "redo") : primary('data-do="intStart"', t.intAgain, "redo")) +
    quiet('data-do="exit"', tabLabel("interview")));
  announce(msg);
  renderChrome();
}

/* ---------- guide ---------- */
let guideSec = "elig", guideOpen = false;
function guideSections(){
  const t = T(), done = loadCheck();
  const n = CHECKLIST.filter(c=>done.has(c.id)).length;
  const item = c => `<label class="check"><input type="checkbox" data-chk="${c.id}"${done.has(c.id)?" checked":""}><span class="box">${ic("check")}</span><span>${esc(c[lang])}${c.cond?` (${esc(t.checkCond)})`:""}</span></label>`;
  return [
    ["elig", t.eligH, "check", `<ul class="plain">${t.elig.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`],
    ["steps", t.stepsH, "arrow", `<ol class="plain">${t.steps.map(s=>`<li><strong>${esc(s[0])}</strong> ${esc(s[1])}</li>`).join("")}</ol>`],
    ["fees", t.feesH, "test", `<ul class="rows">${t.feeRows.map(r=>`<li><span class="grow">${esc(r[0])}</span><b>${esc(r[1])}</b></li>`).join("")}</ul>`],
    ["exc", t.excH, "star", `<ul class="plain">${t.excs.map(e=>`<li><strong>${esc(e[0])}</strong> ${esc(e[1])}</li>`).join("")}</ul>`],
    ["check", t.checkTitle, "test", `<p class="muted" id="chkCount">${esc(t.checkProgress(n, CHECKLIST.length))}</p>${CHECKLIST.map(item).join("")}
      <p class="muted">${esc(t.checkNote)}</p><button class="btn quiet" data-do="chkReset">${ic("redo")}${esc(t.checkReset)}</button>`],
    ["day", t.dayH, "cal", `<ul class="plain">${t.dayTips.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`],
    ["res", t.resTitle, "book", `<ul class="rows">${t.res.map(r=>`<li><span class="grow"><a href="${r[2]}" target="_blank" rel="noopener">${esc(r[0])}</a><small>${esc(r[1])}</small></span></li>`).join("")}</ul>`],
  ];
}
function renderGuide(){
  const t = T(), el = view("guide"), secs = guideSections();
  const cur = secs.find(s=>s[0]===guideSec) || secs[0];
  el.innerHTML = `<div class="wrap fill guide" data-pane="${guideOpen?"detail":"list"}">
    <div class="pane gl">${pageTitle("guide")}<ul class="opts">${secs.map(s=>
      `<li><button class="opt${s[0]===cur[0]?" cur":""}" data-do="gsec" data-v="${s[0]}"><span class="opt-i">${ic(s[2])}</span><span class="grow"><b>${esc(s[1])}</b></span>${ic("right","chev")}</button></li>`).join("")}</ul></div>
    <div class="pane gd"><div class="subhead">${iconBtn("left", t.back, 'data-do="gback"')}<h1>${esc(cur[1])}</h1></div><div class="gd-body">${cur[3]}</div></div></div>`;
}
function updateChecklistCount(){
  const el = document.getElementById("chkCount");
  if(el) el.textContent = T().checkProgress(CHECKLIST.filter(c=>loadCheck().has(c.id)).length, CHECKLIST.length);
}

/* ---------- settings ---------- */
function renderSettings(){
  const t = T(), el = view("settings"), date = getIDate();
  const bankOpt = (v, label, count, yr) => `<button class="opt radio" data-do="filed" data-v="${v}" aria-pressed="${filed===v}"><span class="dot"></span><span class="grow"><b>${esc(label)}</b><small>${esc(t.bankSub(yr, count))}</small></span></button>`;
  el.innerHTML = `<div class="wrap narrow"><h1 class="page-title">${esc(t.settingsH)}</h1>
    <section><h2>Language / Idioma</h2><div class="seg big">
      <button data-do="lang" data-v="en" aria-pressed="${lang==="en"}">English</button><button data-do="lang" data-v="es" aria-pressed="${lang==="es"}">Español</button></div></section>
    <section><h2>${esc(t.filingTitle)}</h2><div class="opts">
      ${bankOpt("after", t.filedAfter, QUESTIONS.length, 2025)}${bankOpt("before", t.filedBefore, QUESTIONS2008.length, 2008)}</div></section>
    <section><h2>${esc(t.cdDate)}</h2><div class="field"><input type="date" id="cdDate" value="${esc(date)}" aria-label="${esc(t.cdDate)}">
      ${date?iconBtn("x", t.cdClear, 'data-do="cdClear"'):""}</div></section>
    <p class="disc">${esc(t.disc)}</p></div>`;
  renderChrome();
}

/* ---------- onboarding ---------- */
let obStep = 0, obFiled = "after", obDate = "";
function renderOnboard(){
  const t = T(), el = document.getElementById("onboard");
  el.hidden = false;
  document.documentElement.lang = lang;
  if(obStep === 0){
    el.innerHTML = `<div class="ob"><div class="ob-brand">${ic("check")}<span>Oath</span></div>
      <div class="ob-main"><h1>Study for the U.S. citizenship interview.</h1>
        <p class="muted">Estudia para la entrevista de ciudadanía de EE. UU.</p>
        <div class="ob-lang"><button data-do="obLang" data-v="en">English<small>Study in English</small></button>
          <button data-do="obLang" data-v="es">Español<small>Estudiar en español</small></button></div></div></div>`;
    return;
  }
  const bankOpt = (v, label, count, yr) => `<button class="opt radio" data-do="obFiled" data-v="${v}" aria-pressed="${obFiled===v}"><span class="dot"></span><span class="grow"><b>${esc(label)}</b><small>${esc(t.bankSub(yr, count))}</small></span></button>`;
  el.innerHTML = `<div class="ob"><div class="ob-top">${iconBtn("left", t.back, 'data-do="obBack"')}<div class="steps"><i class="on"></i><i class="on"></i></div></div>
    <div class="ob-main"><h1>${esc(t.filingTitle)}</h1>
      <div class="opts">${bankOpt("after", t.filedAfter, QUESTIONS.length, 2025)}${bankOpt("before", t.filedBefore, QUESTIONS2008.length, 2008)}</div>
      <label class="datefield"><span>${ic("cal")}${esc(t.cdDate)} <small>${esc(t.optional)}</small></span><input type="date" id="obDate" value="${esc(obDate)}"></label></div>
    <div class="ob-foot">${primary('data-do="obDone"', t.obStart, "arrow")}</div></div>`;
}

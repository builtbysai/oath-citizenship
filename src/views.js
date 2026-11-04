/* Views: one render function per screen. Each builds an HTML string into #v-<name>
   and wires its own controls. State lives in state.js; text lives in strings.js. */

const T = () => STR[lang];
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const view = id => document.getElementById("v-"+id);
const tabLabel = id => T().tabs.find(x => x[0]===id)[1];
function announce(msg){
  const r = document.getElementById("sr-live");
  if(!r || !msg) return;
  r.textContent = "";
  setTimeout(()=>{ r.textContent = msg; }, 30);
}

/* Small HTML builders shared by several screens. */
const title = id => `<h1 class="title">${esc(tabLabel(id))}</h1>`;
const heading = text => `<h2>${esc(text)}</h2>`;
/* A tappable list row. attrs is a raw attribute string such as 'data-p="std"'. */
const rowBtn = (attrs, label, detail, sub) =>
  `<li><button class="row" ${attrs}><span class="grow">${esc(label)}${sub?`<span class="sub">${esc(sub)}</span>`:""}</span>${detail!==undefined&&detail!==""?`<span class="detail">${esc(detail)}</span>`:""}</button></li>`;
const rowInfo = (label, detail) =>
  `<li class="row"><span class="grow">${esc(label)}</span><span class="detail">${esc(detail)}</span></li>`;
const seg = (items, attr, isOn) =>
  `<div class="seg" role="group">${items.map(([v,lb])=>`<button ${attr}="${esc(v)}" aria-pressed="${isOn(v)}">${esc(lb)}</button>`).join("")}</div>`;
const bar = pct => `<div class="bar" aria-hidden="true"><div style="width:${pct}%"></div></div>`;
const mockBanner = n => `<p class="muted">${esc(T().mockPhase(n))}</p>`;

/* ---------- chrome ---------- */
let curView = "home";
function renderChrome(){
  document.documentElement.lang = lang;
  document.getElementById("langEn").setAttribute("aria-pressed", lang==="en");
  document.getElementById("langEs").setAttribute("aria-pressed", lang==="es");
  document.getElementById("tabs").innerHTML = T().tabs.map(([id,lb]) =>
    `<button class="tab" data-v="${id}"${curView===id?' aria-current="page"':""}>${esc(lb)}</button>`).join("");
  document.getElementById("disclaimer").textContent = T().disc;
}

/* ---------- home ---------- */
function renderHome(){
  const t = T(), el = view("home");
  const total = Q().length, knownN = Q().filter(q=>known.has(qkey(q.n))).length;
  const due = dueCount(), unseen = unseenCount(), streak = getStreak();
  const date = getIDate(), n = daysLeft();
  const dated = date !== "" && n !== null;
  const headline = !dated ? "" : n < 0 ? t.cdPast : n === 0 ? t.cdToday : t.interviewIn(n);
  el.innerHTML = `
    ${headline?`<h1 class="title">${esc(headline)}</h1>`:""}
    <ul class="list">
      ${due>0?rowBtn('data-home="due"', t.dueLine(due), due):""}
      ${weakestCats().length?rowBtn('data-home="weak"', t.weakLine):""}
      ${unseen>0?rowBtn('data-home="new"', t.newLine, unseen):""}
      ${rowBtn('data-home="practice"', t.practiceLine)}
      ${rowBtn('id="mockStart"', t.mockH)}
    </ul>
    <p class="stat">${esc(t.knownCount(knownN, total))}</p>
    ${bar(total ? knownN/total*100 : 0)}
    ${streak?`<p class="muted">${esc(t.streakLine(streak))}</p>`:""}
    <h2>${esc(t.filingTitle)}</h2>
    ${seg([["before",t.filedBefore],["after",t.filedAfter]], "data-f", v=>filed===v)}
    <h2>${esc(t.cdDate)}</h2>
    <div class="field">
      <input type="date" id="cdDate" value="${esc(date)}" aria-label="${esc(t.cdDate)}">
      ${dated?`<button class="link" id="cdClear">${esc(t.cdClear)}</button>`:""}
    </div>`;
  el.querySelector("#mockStart").onclick = startMock;
}

/* ---------- study ---------- */
let studyCat = "all", studyStar = false, studyQ = "";
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
function qCardHTML(q){
  const t = T(), cat = lang==="es" ? q.cat_es : q.cat, isKnown = known.has(qkey(q.n));
  return `<li class="q${isKnown?" known":""}" data-n="${q.n}">
    <button class="qhead" data-act="toggle" aria-expanded="false">
      <span class="qn">${q.n}</span>
      <span class="grow"><span class="qt">${esc(q.q[lang])}</span>
      <span class="sub">${esc(cat)}${q.star?" · 65/20":""}</span></span>
    </button>
    <div class="qbody">
      ${answerHTML(q)}
      <div class="actions">
        <button class="link" data-act="speak">${esc(t.listen)}</button>
        <button class="link" data-act="known" aria-pressed="${isKnown}">${esc(t.knowIt)}</button>
      </div>
    </div>
  </li>`;
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
    return `<div class="varies"><p><strong>${esc(t.variesTitle)}.</strong></p>${current}
      <a href="${VARIES_LINK[key]}" target="_blank" rel="noopener">${esc(t.variesLinkLabel[linkKey]||t.variesLinkLabel.office)}</a></div>`;
  }
  return `<ul class="answers" aria-label="${esc(t.answersLabel)}">${q.a[lang].map(a=>`<li>${esc(a)}</li>`).join("")}</ul>`;
}
function renderStudy(){
  const t = T(), el = view("study");
  const knownN = Q().filter(q=>known.has(qkey(q.n))).length;
  const browsing = studyCat==="all" && !studyStar && !studyQ.trim();
  const body = browsing
    ? `<ul class="list">${cats().map(c=>{ const p = catProgress(c); return rowBtn(`data-c="${esc(c)}"`, catLabel(c), p.known+" / "+p.total); }).join("")}</ul>`
    : `${studyCat!=="all"?heading(catLabel(studyCat)):""}<ul class="list" id="qlist"></ul>`;
  el.innerHTML = `${title("study")}
    <p class="stat">${esc(t.knownCount(knownN, Q().length))}</p>
    ${bar(knownN/Q().length*100)}
    <input id="qsearch" class="search" type="search" placeholder="${esc(t.searchPh)}" value="${esc(studyQ)}" aria-label="${esc(t.searchPh)}">
    <div class="seg" role="group">
      <button data-c="all" aria-pressed="${!studyStar}">${esc(t.all)}</button>
      <button data-s="1" aria-pressed="${studyStar}">65/20</button>
    </div>
    ${body}`;
  const ql = el.querySelector("#qlist");
  if(ql){
    const list = filteredQuestions();
    ql.innerHTML = list.length ? list.map(qCardHTML).join("") : `<li class="muted">${esc(t.noResults)}</li>`;
  }
  const si = el.querySelector("#qsearch");
  si.addEventListener("input", ()=>{
    studyQ = si.value; renderStudy();
    const again = view("study").querySelector("#qsearch"); again.focus(); again.setSelectionRange(studyQ.length, studyQ.length);
  });
}

/* ---------- practice (civics) ---------- */
function focusHTML(){
  const t = T(), rows = weakestCats();
  if(!rows.length) return "";
  return `<ul class="list">${rows.map(r=>rowInfo(catLabel(r.c), Math.round(r.acc*100)+"%, "+t.focusTries(r.n))).join("")}</ul>
    <button class="link" id="weakBtn">${esc(t.weakBtn)}</button>`;
}
function historyHTML(){
  const t = T();
  if(!histLog.length) return `<p class="muted">${esc(t.historyEmpty)}</p>`;
  return `<ul class="list">${histLog.slice(-5).reverse().map(h=>{
    const bank = h.bank==="08" ? "2008" : h.bank==="25" ? "2025" : "";
    return rowInfo(h.right+"/"+h.total+" "+(h.pass?t.passMsg:t.failMsg), (bank?bank+", ":"")+h.d);
  }).join("")}</ul>`;
}
function renderPractice(){
  const el = view("practice");
  if(!pz) renderPracticeSetup(el);
  else if(pz.done) renderPracticeDone(el);
  else renderPracticeQuestion(el);
}
function renderPracticeSetup(el){
  const t = T(), before = filed==="before";
  const bank = before ? "08:" : "25:";
  const mcount = [...mistakes].filter(k=>k.startsWith(bank)).length, d = dueCount();
  el.innerHTML = `${title("practice")}
    <ul class="list">
      ${rowBtn('data-p="std"', before?t.testStd08:t.testStd, "", before?t.testStdDesc08:t.testStdDesc)}
      ${rowBtn('data-p="senior"', t.testSenior, "", t.testSeniorDesc)}
      ${mcount?rowBtn('data-p="review"', t.reviewBtn(mcount)):""}
      ${d?rowBtn('data-p="due"', t.dueBtn(d)):""}
    </ul>
    ${heading(t.focusH)}${focusHTML()}
    ${heading(t.historyH)}${historyHTML()}`;
  const wb = el.querySelector("#weakBtn");
  if(wb) wb.onclick = ()=>startWeakPractice();
}
function renderPracticeQuestion(el){
  const t = T(), q = pz.order[pz.idx];
  el.innerHTML = `${pz.mock?mockBanner(3):""}
    <p class="muted split"><span>${esc(t.qNum(pz.idx+1))}${q.cat?", "+esc(catLabel(q.cat)):""}</span>
      <span>${esc(t.correctToPass(pz.need))}, ${esc(t.wrongs(pz.wrong))}</span></p>
    ${bar(pz.idx/pz.order.length*100)}
    <p class="prompt">${esc(q.q[lang])}</p>
    <button class="link" id="hear">${esc(t.listen)}</button>
    <div id="pans"><button class="btn" id="showA">${esc(t.showAnswer)}</button></div>`;
  el.querySelector("#hear").onclick = ()=>speak(q.q[lang]);
  el.querySelector("#showA").onclick = ()=>{
    el.querySelector("#pans").innerHTML = answerHTML(q) + `<div class="pair">
      <button class="btn" data-r="y">${esc(t.iKnew)}</button>
      <button class="btn quiet" data-r="n">${esc(t.iMissed)}</button></div>`;
  };
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
  pz.idx++;
  const finished = pz.review ? pz.idx>=pz.order.length
    : (pz.right>=pz.need || pz.wrong>=pz.maxWrong || pz.idx>=pz.order.length);
  if(finished) pz.done = true;
  saveRounds();
  renderPractice();
  window.scrollTo({top:0, behavior:"smooth"});
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
  el.innerHTML = `<h1 class="title ${good?"pass":"fail"}">${esc(headMsg)}</h1>
    <p class="stat"><span class="num">${pz.right}/${pz.idx}</span></p>
    ${pz.missed.length?`${heading(t.reviewMissed)}<ul class="list">${pz.missed.map(q=>
      `<li class="row"><span class="grow">${q.n}. ${esc(q.q[lang])}<span class="sub">${esc(q.a[lang].join(", "))}</span></span></li>`).join("")}</ul>`:""}
    <button class="btn" id="retry">${esc(t.tryAgain)}</button>
    <button class="link" id="newtest">${esc(t.backToSetup)}</button>`;
  announce(headMsg);
  el.querySelector("#retry").onclick = ()=>{ pz.weak ? startWeakPractice() : startPractice(pz.review?(pz.due?"due":"review"):(pz.senior?"senior":"std")); };
  el.querySelector("#newtest").onclick = ()=>{ pz=null; saveRounds(); renderPractice(); };
  saveRounds();
}

/* ---------- english: reading, dictation ---------- */
function renderEnglish(){
  if(rp && rp.idx < rp.order.length){ renderReadQ(); return; }
  if(dz && dz.idx < dz.order.length){ renderDictQ(); return; }
  const t = T(), el = view("english");
  const words = arr => `<p class="words">${arr.map(w=>`<button class="word" data-w="${esc(w)}">${esc(w)}</button>`).join(" ")}</p>`;
  el.innerHTML = `${title("english")}
    ${heading(t.speakH)}<p>${esc(t.speakP)}</p>
    ${heading(t.readH)}<p>${esc(t.readRule)}</p>
    <ul class="list">${rowBtn('id="readStart"', t.readStart)}</ul>
    <details><summary>${esc(t.readVocab)}</summary>${words(READING_VOCAB)}</details>
    ${heading(t.dictH)}<p>${esc(t.dictRule)}</p>
    <ul class="list">
      ${rowBtn('id="dictStart"', t.dictStart)}
      ${dzMistakes.size?rowBtn('id="dzReview"', t.reviewBtn(dzMistakes.size)):""}
    </ul>
    <details><summary>${esc(t.writeVocab)}</summary>${words(WRITING_VOCAB)}</details>`;
  el.querySelector("#dictStart").onclick = startDictation;
  el.querySelector("#readStart").onclick = startReadPractice;
  const dzr = el.querySelector("#dzReview"); if(dzr) dzr.onclick = startDzReview;
  el.querySelectorAll("[data-w]").forEach(b=>b.onclick=()=>speak(b.dataset.w, 0, true));
}
function startReadPractice(){
  rp = { order:shuffled(READ_SENTENCES).slice(0,3), idx:0, ok:0 };
  saveRounds();
  renderReadQ();
}
function renderReadQ(){
  const t = T(), el = view("english"), s = rp.order[rp.idx];
  el.innerHTML = `${rp.mock?mockBanner(1):""}
    <p class="muted">${esc(t.readQ(rp.idx+1, 3))}</p>
    <p class="prompt">${esc(s)}</p>
    <button class="link" id="rpHear">${esc(t.readAloud)}</button>
    <div class="pair"><button class="btn" id="rpOk">${esc(t.readOk)}</button>
    <button class="btn quiet" id="rpNo">${esc(t.readNo)}</button></div>`;
  el.querySelector("#rpHear").onclick = ()=>speak(s, 0, true);
  el.querySelector("#rpOk").onclick = ()=>{ rp.ok++; rpNext(); };
  el.querySelector("#rpNo").onclick = rpNext;
}
function rpNext(){ rp.idx++; saveRounds(); rp.idx>=3?renderReadDone():renderReadQ(); }
function renderReadDone(){
  bumpStreak();
  if(rp.mock){ if(!mock) mock = {}; mock.read = rp.ok; startMockDict(); saveRounds(); return; }
  saveRounds();
  const t = T(), el = view("english"), pass = rp.ok>=1;
  el.innerHTML = `<h1 class="title ${pass?"pass":"fail"}">${esc(pass?t.passMsg:t.failMsg)}</h1>
    <p class="stat"><span class="num">${rp.ok}/3</span></p>
    <button class="btn" id="rpAgain">${esc(t.intAgain)}</button>
    <button class="link" id="rpBack">${esc(tabLabel("english"))}</button>`;
  announce(pass?t.passMsg:t.failMsg);
  el.querySelector("#rpAgain").onclick = startReadPractice;
  el.querySelector("#rpBack").onclick = ()=>{ rp=null; saveRounds(); renderEnglish(); };
}
function startDictation(){
  dz = { order:shuffled(DICT_SENTENCES).slice(0,3), idx:0, ok:0, review:false };
  saveRounds();
  renderDictQ();
}
function startDzReview(){
  const ss = DICT_SENTENCES.filter(s=>dzMistakes.has(s));
  if(!ss.length){ renderEnglish(); return; }
  dz = { order:shuffled(ss), idx:0, ok:0, review:true };
  saveRounds();
  renderDictQ();
}
function normWords(s){ return s.toLowerCase().replace(/[.,!?;:'"]/g,"").split(/\s+/).filter(Boolean); }
function renderDictQ(){
  if(dz.res){ renderDictResult(); return; }
  const t = T(), el = view("english"), s = dz.order[dz.idx];
  el.innerHTML = `${dz.mock?mockBanner(2):""}
    <p class="muted">${esc(t.dictQ(dz.idx+1, dz.order.length))}</p>
    <button class="btn quiet" id="dzPlay">${esc(t.dictPlay)}</button>
    <textarea id="dzIn" class="input" rows="2" aria-label="${esc(t.dictPh)}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></textarea>
    <button class="btn" id="dzCheck">${esc(t.dictCheck)}</button>`;
  const ta = el.querySelector("#dzIn");
  ta.value = dz.draft || "";
  ta.oninput = ()=>{ dz.draft = ta.value; };
  el.querySelector("#dzPlay").onclick = ()=>speak(s, 0.7, true);
  el.querySelector("#dzCheck").onclick = checkDictation;
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
  el.innerHTML = `<p class="muted">${esc(t.dictQ(dz.idx+1, dz.order.length))}</p>
    <p class="verdict ${right?"pass":"fail"}">${esc(right?t.dictCorrect:t.dictWrong)}</p>
    <p class="prompt">${words}</p>
    ${rawIn.trim()?`<p class="muted">${esc(t.dictYour)} ${esc(rawIn.trim())}</p>`:""}
    <button class="btn" id="dzNext">${esc(t.dictNext)}</button>`;
  announce(right?t.dictCorrect:t.dictWrong);
  el.querySelector("#dzNext").onclick = ()=>{ dz.res = null; dz.idx++; saveRounds(); dz.idx>=dz.order.length?renderDictDone():renderDictQ(); };
}
function renderDictDone(){
  bumpStreak();
  if(dz.mock){ if(!mock) mock = {}; mock.dict = dz.ok; startMockCivics(); saveRounds(); return; }
  saveRounds();
  const t = T(), el = view("english");
  const left = dzMistakes.size;
  const pass = dz.review ? left===0 : dz.ok>=1;
  const msg = dz.review ? (left===0 ? t.clearedAll : t.stillLeft(left)) : (pass ? t.passMsg : t.failMsg);
  el.innerHTML = `<h1 class="title ${pass?"pass":"fail"}">${esc(msg)}</h1>
    <p class="stat"><span class="num">${dz.ok}/${dz.order.length}</span></p>
    ${dz.review&&left?`<button class="btn" id="dzAgain2">${esc(t.reviewBtn(left))}</button>`:`<button class="btn" id="dzAgain">${esc(t.intAgain)}</button>`}
    <button class="link" id="dzBack">${esc(tabLabel("english"))}</button>`;
  announce(msg);
  const a = el.querySelector("#dzAgain"); if(a) a.onclick = startDictation;
  const a2 = el.querySelector("#dzAgain2"); if(a2) a2.onclick = startDzReview;
  el.querySelector("#dzBack").onclick = ()=>{ dz=null; saveRounds(); renderEnglish(); };
}

/* ---------- mock interview: reading, dictation, civics, N-400 ---------- */
function startMock(){
  mock = {};
  show("english");
  rp = { order:shuffled(READ_SENTENCES).slice(0,3), idx:0, ok:0, mock:true };
  saveRounds();
  renderReadQ();
}
function startMockDict(){
  dz = { order:shuffled(DICT_SENTENCES).slice(0,3), idx:0, ok:0, mock:true };
  renderDictQ();
}
function startMockCivics(){ show("practice"); startPractice("std", true); }
function startMockN400(){
  show("interview");
  ipz = { order:shuffled(N400.questions).slice(0,8), idx:0, ok:0, mock:true };
  renderInterviewQ();
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
  el.innerHTML = `<h1 class="title ${allPass?"pass":"fail"}">${esc(msg)}</h1>
    <ul class="list">${rows.map(r=>`<li class="row ${r[3]?"pass":"fail"}"><span class="grow">${esc(r[0])}</span><span class="detail">${r[1]}/${r[2]}</span></li>`).join("")}</ul>
    <button class="btn" id="mockAgain">${esc(t.mockStart)}</button>
    <button class="link" id="mockBack">${esc(tabLabel("interview"))}</button>`;
  announce(msg);
  el.querySelector("#mockAgain").onclick = startMock;
  el.querySelector("#mockBack").onclick = ()=>{ mock=null; saveRounds(); renderInterview(); };
  window.scrollTo({top:0});
}

/* ---------- interview: N-400 Part 9 questions ---------- */
let intFilter = "all";
const expLabel = q => { const t = T(); return q.expected==="no" ? t.expNo : q.expected==="yes" ? t.expYes : t.expVaries; };
function nqCardHTML(q){
  const t = T(), other = lang==="es" ? q.en : q.es;
  return `<li class="q" data-item="${esc(q.item)}">
    <button class="qhead" data-act="toggle" aria-expanded="false">
      <span class="qn">${esc(q.item)}</span>
      <span class="grow"><span class="qt">${esc(q[lang])}</span><span class="sub">${esc(expLabel(q))}</span></span>
    </button>
    <div class="qbody">
      <p>${esc(other)}</p>
      <p class="muted">${esc(t.intMeaning)}</p>
      <p>${esc(q[lang==="es"?"meaning_es":"meaning_en"])}</p>
      <div class="actions"><button class="link" data-act="speak">${esc(t.listen)}</button></div>
    </div>
  </li>`;
}
function renderInterview(){
  if(ipz && ipz.idx < ipz.order.length){ renderInterviewQ(); return; }
  const t = T(), el = view("interview");
  const list = N400.questions.filter(q=>intFilter==="all"||q.expected===intFilter);
  el.innerHTML = `${title("interview")}
    <ul class="list">
      ${rowBtn('id="intStart"', t.intPracticeH)}
      ${intMistakes.size?rowBtn('id="intReview"', t.reviewBtn(intMistakes.size)):""}
    </ul>
    ${seg([["all",t.all],["no",t.fNo],["yes",t.fYes],["varies",t.fDep]], "data-if", v=>intFilter===v)}
    <ul class="list">${list.map(nqCardHTML).join("")}</ul>`;
  el.querySelector("#intStart").onclick = startInterviewPractice;
  const ir = el.querySelector("#intReview"); if(ir) ir.onclick = startInterviewReview;
}
function startInterviewPractice(){
  ipz = { order:shuffled(N400.questions).slice(0,10), idx:0, ok:0, review:false };
  saveRounds();
  renderInterviewQ();
}
function startInterviewReview(){
  const qs = N400.questions.filter(q=>intMistakes.has(q.item));
  if(!qs.length){ renderInterview(); return; }
  ipz = { order:shuffled(qs), idx:0, ok:0, review:true };
  saveRounds();
  renderInterviewQ();
}
function renderInterviewQ(){
  if(ipz.res){ renderInterviewResult(); return; }
  const t = T(), el = view("interview"), q = ipz.order[ipz.idx];
  el.innerHTML = `${ipz.mock?mockBanner(4):""}
    <p class="muted">${esc(t.intQ(ipz.idx+1, ipz.order.length))}</p>
    <p class="prompt">${esc(q.en)}</p>
    <button class="link" id="intSpeak">${esc(t.listen)}</button>
    <div class="pair"><button class="btn quiet" data-yn="y">${esc(t.intYes)}</button>
    <button class="btn quiet" data-yn="n">${esc(t.intNo)}</button></div>`;
  el.querySelector("#intSpeak").onclick = ()=>speak(q.en, 0, true);
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
  el.innerHTML = `<p class="muted">${esc(t.intQ(ipz.idx+1, ipz.order.length))}</p>
    <p class="prompt">${esc(q.en)}</p>
    <p class="verdict ${right?"pass":"fail"}">${esc(right?t.intCorrect:t.intWrong)}</p>
    ${varies?""
      :`<p>${esc(q[lang==="es"?"meaning_es":"meaning_en"])}</p><p class="muted">${esc(lang==="es"?q.en:q.es)}</p>`}
    <button class="btn" id="intNext">${esc(t.intNext)}</button>`;
  announce(right?t.intCorrect:t.intWrong);
  el.querySelector("#intNext").onclick = ()=>{ ipz.res = null; ipz.idx++; saveRounds(); ipz.idx>=ipz.order.length?renderInterviewDone():renderInterviewQ(); };
}
function renderInterviewDone(){
  if(ipz.mock){ if(!mock) mock = {}; mock.n400 = ipz.ok; renderMockSummary(); saveRounds(); return; }
  saveRounds();
  const t = T(), el = view("interview");
  const left = intMistakes.size;
  const msg = ipz.review ? (left===0 ? t.clearedAll : t.stillLeft(left)) : t.intDone;
  el.innerHTML = `<h1 class="title">${esc(msg)}</h1>
    <p class="stat"><span class="num">${ipz.ok}/${ipz.order.length}</span></p>
    ${ipz.review&&left?`<button class="btn" id="intAgain2">${esc(t.reviewBtn(left))}</button>`:`<button class="btn" id="intAgain">${esc(t.intAgain)}</button>`}
    <button class="link" id="intBack">${esc(tabLabel("interview"))}</button>`;
  announce(msg);
  const a = el.querySelector("#intAgain"); if(a) a.onclick = startInterviewPractice;
  const a2 = el.querySelector("#intAgain2"); if(a2) a2.onclick = startInterviewReview;
  el.querySelector("#intBack").onclick = ()=>{ ipz=null; saveRounds(); renderInterview(); };
}

/* ---------- guide ---------- */
function renderGuide(){
  const t = T(), el = view("guide");
  const done = loadCheck();
  const n = CHECKLIST.filter(c=>done.has(c.id)).length;
  const item = c => `<label class="check"><input type="checkbox" data-chk="${c.id}"${done.has(c.id)?" checked":""}><span>${esc(c[lang])}${c.cond?` (${esc(t.checkCond)})`:""}</span></label>`;
  const section = (name, body) => `<details><summary>${esc(name)}</summary>${body}</details>`;
  el.innerHTML = `${title("guide")}
    ${section(t.eligH, `<ul>${t.elig.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`)}
    ${section(t.stepsH, `<ol>${t.steps.map(s=>`<li><strong>${esc(s[0])}</strong> ${esc(s[1])}</li>`).join("")}</ol>`)}
    ${section(t.feesH, `<ul class="list">${t.feeRows.map(r=>rowInfo(r[0], r[1])).join("")}</ul>`)}
    ${section(t.excH, `<ul>${t.excs.map(e=>`<li><strong>${esc(e[0])}</strong> ${esc(e[1])}</li>`).join("")}</ul>`)}
    ${section(t.checkTitle, `<p class="muted" id="chkCount">${esc(t.checkProgress(n, CHECKLIST.length))}</p>${CHECKLIST.map(item).join("")}
      <p class="muted">${esc(t.checkNote)}</p><button class="link" id="chkReset">${esc(t.checkReset)}</button>`)}
    ${section(t.dayH, `<ul>${t.dayTips.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`)}
    ${section(t.resTitle, `<ul class="list">${t.res.map(r=>`<li class="row"><span class="grow"><a href="${r[2]}" target="_blank" rel="noopener">${esc(r[0])}</a><span class="sub">${esc(r[1])}</span></span></li>`).join("")}</ul>`)}`;
}

/* Router, actions, global events, boot. Screens are in views.js, state in state.js. */

const RENDER = {home:renderHome, study:renderStudy, practice:renderPractice, interview:renderInterview,
  english:renderEnglish, guide:renderGuide, settings:renderSettings};

function show(v){
  curView = v;
  document.querySelectorAll(".view").forEach(s=>s.classList.toggle("on", s.id==="v-"+v));
  renderChrome();
  RENDER[v]();
  view(v).scrollTop = 0;
}
function rerender(){
  if(!document.getElementById("onboard").hidden) renderOnboard();
  else show(curView);
}
function setLang(l){ lang = l; localStorage.setItem("oath_lang", lang); rerender(); }

/* Leave whatever round is active on the current screen and return to its start screen. */
function exitRound(){
  if(mock || (pz && pz.mock) || (rp && rp.mock) || (dz && dz.mock) || (ipz && ipz.mock)) mock = null;
  if(curView==="practice") pz = null;
  else if(curView==="english") rp = dz = null;
  else if(curView==="interview") ipz = null;
  saveRounds();
  show(curView);
}
function openStudy(cat){
  studyCat = cat || "all"; studyStar = false; studyQ = ""; studyPane = "card";
  studyReset();
  show("study");
}

const ACT = {
  goto: el => show(el.dataset.v),
  lang: el => setLang(el.dataset.v),
  say: el => speak(el.dataset.say, el.dataset.rate ? +el.dataset.rate : 0, !!el.dataset.en),
  exit: exitRound,
  /* home */
  study: () => openStudy(),
  topic: el => openStudy(el.dataset.c),
  practice: () => show("practice"),
  due: () => { show("practice"); startPractice("due"); },
  review: () => { show("practice"); startPractice("review"); },
  weak: startWeakPractice,
  mock: startMock,
  /* study */
  star: () => { studyStar = !studyStar; studyReset(); renderStudy(); },
  pane: el => { studyPane = el.dataset.v; renderStudy(); },
  pick: el => { studyIdx = +el.dataset.i; studyShown = false; studyEnd = false; studyPane = "card"; renderStudy(); },
  reveal: () => { studyShown = true; fillStudyCard(); },
  prev: () => studyStep(-1),
  next: () => studyStep(1),
  known: el => studyToggleKnown(el),
  restart: () => { studyReset(); studyIdx = 0; renderStudy(); },
  /* practice */
  start: el => startPractice(el.dataset.p),
  pshow: () => { pz.shown = true; renderPractice(); },
  grade: el => practiceAnswer(el.dataset.v==="y"),
  retry: () => { pz.weak ? startWeakPractice() : startPractice(pz.review?(pz.due?"due":"review"):(pz.senior?"senior":"std")); },
  /* english */
  readStart: startReadPractice,
  rpGrade: el => rpNext(el.dataset.v==="y"),
  dictStart: startDictation,
  dzReview: startDzReview,
  dzCheck: checkDictation,
  dzNext: dzNext,
  vocab: el => { engVocab = el.dataset.v || null; renderEnglish(); },
  /* interview */
  intStart: startInterviewPractice,
  intReview: startInterviewReview,
  intNext: intNext,
  yn: el => { if(ipz && !ipz.res) interviewAnswer(el.dataset.v==="y"); },
  ifilter: el => { intFilter = el.dataset.v; renderInterview(); },
  toggle: el => {
    const row = el.closest(".q"), open = row.classList.toggle("open");
    el.setAttribute("aria-expanded", open);
  },
  /* guide */
  gsec: el => { guideSec = el.dataset.v; guideOpen = true; renderGuide(); },
  gback: () => { guideOpen = false; renderGuide(); },
  chkReset: () => {
    saveCheck(new Set());
    document.querySelectorAll("[data-chk]").forEach(c=>{ c.checked = false; });
    updateChecklistCount();
  },
  /* settings */
  filed: el => { setFiled(el.dataset.v); studyFresh = true; studyCat = "all"; renderSettings(); },
  cdClear: () => { setIDate(""); renderSettings(); },
  /* onboarding */
  obLang: el => { lang = el.dataset.v; localStorage.setItem("oath_lang", lang); obStep = 1; renderOnboard(); },
  obBack: () => { obStep = 0; renderOnboard(); },
  obFiled: el => { obFiled = el.dataset.v; renderOnboard(); },
  obDone: () => {
    const d = document.getElementById("obDate"); if(d) obDate = /^\d{4}-\d{2}-\d{2}$/.test(d.value) ? d.value : obDate;
    setFiled(obFiled); setIDate(obDate); setOnboarded();
    document.getElementById("onboard").hidden = true;
    studyFresh = true;
    openStudy();
  },
};

document.addEventListener("click", e=>{
  const el = e.target.closest("[data-do]");
  if(el && !el.disabled && ACT[el.dataset.do]) ACT[el.dataset.do](el);
});

document.addEventListener("change", e=>{
  const t = e.target;
  if(t.matches("[data-chk]")){
    const done = loadCheck(); t.checked ? done.add(t.dataset.chk) : done.delete(t.dataset.chk); saveCheck(done);
    updateChecklistCount();
  } else if(t.id==="cdDate"){ setIDate(t.value); renderSettings(); }
  else if(t.id==="obDate"){ obDate = /^\d{4}-\d{2}-\d{2}$/.test(t.value) ? t.value : ""; }
  else if(t.id==="studyCat"){ studyCat = t.value; studyReset(); renderStudy(); }
});

document.addEventListener("input", e=>{
  if(e.target.id==="qsearch"){ studyQ = e.target.value; studyIdx = 0; studyEnd = false; studyShown = false; fillStudyList(); fillStudyCard(); }
});

/* Keyboard for the flashcard deck, only when nothing else has focus. */
document.addEventListener("keydown", e=>{
  if(curView!=="study" || e.target !== document.body || e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  if(k==="ArrowRight") studyStep(1);
  else if(k==="ArrowLeft") studyStep(-1);
  else if(k===" " || k==="Enter"){ e.preventDefault(); if(!studyShown && !studyEnd){ studyShown = true; fillStudyCard(); } }
  else if(k==="k" || k==="K"){ const b = document.querySelector(".checkbtn"); if(b && !b.disabled) studyToggleKnown(b); }
  else return;
});

/* Focus survives re-renders: remember the focused control; if a render removes it,
   refocus the equivalent control, else the current view's first heading. */
let lastFocus = null;
function focusSel(el){
  if(el.id) return "#"+el.id;
  const parts = [...el.attributes].filter(a=>a.name.startsWith("data-")).map(a=>"["+a.name+"=\""+CSS.escape(a.value)+"\"]");
  return parts.length ? parts.join("") : null;
}
document.addEventListener("focusin", e=>{ lastFocus = {el:e.target, sel:focusSel(e.target)}; });
new MutationObserver(()=>{
  const f = lastFocus;
  if(!f || f.el.isConnected) return;
  if(document.activeElement && document.activeElement !== document.body) return;
  lastFocus = null;
  const root = document.getElementById("onboard").hidden ? document.querySelector(".view.on") : document.getElementById("onboard");
  let t = f.sel && root && root.querySelector(f.sel);
  if(!t){
    t = root && (root.querySelector(".prompt, h1, h2") || root);
    if(t && !t.matches("textarea, button, input, a")) t.setAttribute("tabindex", "-1");
  }
  if(t) t.focus({preventScroll:true});
}).observe(document.body, {childList:true, subtree:true});

restoreRounds();
if(!isOnboarded()) renderOnboard();
else if(pz) show("practice");
else if(rp || dz) show("english");
else if(ipz) show("interview");
else show("home");

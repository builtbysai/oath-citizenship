/* Router, global events, boot. Screens are in views.js, state in state.js. */

function show(v){
  curView = v;
  renderChrome();
  document.querySelectorAll(".view").forEach(s=>s.classList.toggle("on", s.id==="v-"+v));
  ({home:renderHome, study:renderStudy, practice:renderPractice, interview:renderInterview, english:renderEnglish, guide:renderGuide})[v]();
  window.scrollTo({top:0});
}
function setLang(l){ lang = l; localStorage.setItem("oath_lang", lang); show(curView); }
function homeAction(a){
  if(a==="due"){ show("practice"); startPractice("due"); }
  else if(a==="weak"){ startWeakPractice(); }
  else if(a==="new"){ studyCat="all"; studyStar=false; studyQ=""; show("study"); }
  else if(a==="practice"){ show("practice"); }
}
function updateChecklistCount(){
  const el = document.getElementById("chkCount");
  if(el) el.textContent = T().checkProgress(CHECKLIST.filter(c=>loadCheck().has(c.id)).length, CHECKLIST.length);
}

document.addEventListener("change", e=>{
  const c = e.target.closest("[data-chk]");
  if(c){
    const done = loadCheck(); c.checked ? done.add(c.dataset.chk) : done.delete(c.dataset.chk); saveCheck(done);
    updateChecklistCount();
    return;
  }
  if(e.target.id==="cdDate" && /^\d{4}-\d{2}-\d{2}$/.test(e.target.value)){
    localStorage.setItem("oath_idate", e.target.value); renderHome();
  }
});

document.addEventListener("click", e=>{
  const hit = sel => e.target.closest(sel);
  const id = e.target.id;
  if(id==="langEn"){ setLang("en"); return; }
  if(id==="langEs"){ setLang("es"); return; }
  if(id==="cdClear"){ localStorage.removeItem("oath_idate"); renderHome(); return; }
  if(id==="chkReset"){
    saveCheck(new Set());
    document.querySelectorAll("[data-chk]").forEach(c=>{ c.checked = false; });
    updateChecklistCount();
    return;
  }
  let el;
  if((el = hit(".tab"))){ show(el.dataset.v); return; }
  if((el = hit("[data-home]"))){ homeAction(el.dataset.home); return; }
  if((el = hit("[data-f]"))){ filed = el.dataset.f; localStorage.setItem("oath_filed", filed); show(curView); return; }
  if((el = hit("[data-c]"))){ studyCat = el.dataset.c; studyStar = false; renderStudy(); return; }
  if((el = hit("[data-s]"))){ studyStar = !studyStar; renderStudy(); return; }
  if((el = hit("[data-p]"))){ startPractice(el.dataset.p); return; }
  if((el = hit("[data-r]"))){ practiceAnswer(el.dataset.r==="y"); return; }
  if((el = hit("[data-if]"))){ intFilter = el.dataset.if; renderInterview(); return; }
  if((el = hit("[data-yn]")) && ipz){ interviewAnswer(el.dataset.yn==="y"); return; }
  /* expandable rows: study questions (data-n) and N-400 questions (data-item) */
  const row = hit(".q"), act = hit("[data-act]");
  if(row && act){
    const isStudy = row.dataset.n !== undefined;
    const q = isStudy ? Q().find(x=>x.n===+row.dataset.n) : N400.questions.find(x=>x.item===row.dataset.item);
    if(act.dataset.act==="toggle"){
      const open = row.classList.toggle("open");
      act.setAttribute("aria-expanded", open);
    } else if(act.dataset.act==="speak"){
      isStudy ? speak(q.q[lang]+". "+q.a[lang].join(", ")) : speak(q.en, 0, true);
    } else if(act.dataset.act==="known"){
      const k = qkey(q.n);
      known.has(k) ? known.delete(k) : known.add(k);
      saveKnown();
      row.classList.toggle("known", known.has(k));
      act.setAttribute("aria-pressed", known.has(k));
    }
  }
});

/* Focus survives re-renders: remember the focused control; if a render removes it,
   refocus the equivalent control, else the current view's textarea, prompt or heading. */
let lastFocus = null;
function focusSel(el){
  if(el.id) return "#"+el.id;
  for(const a of el.attributes) if(a.name.startsWith("data-")) return "["+a.name+"=\""+CSS.escape(a.value)+"\"]";
  return null;
}
document.addEventListener("focusin", e=>{ lastFocus = {el:e.target, sel:focusSel(e.target)}; });
new MutationObserver(()=>{
  const f = lastFocus;
  if(!f || f.el.isConnected) return;
  if(document.activeElement && document.activeElement !== document.body) return;
  lastFocus = null;
  let t = f.sel && (document.querySelector(".view.on "+f.sel) || document.querySelector("#tabs "+f.sel));
  if(!t){
    const v = document.querySelector(".view.on");
    t = v && (v.querySelector(".prompt, h1, h2") || v);
    if(t && !t.matches("textarea, button, input, a")) t.setAttribute("tabindex", "-1");
  }
  if(t) t.focus({preventScroll:true});
}).observe(document.body, {childList:true, subtree:true});

restoreRounds();
if(pz) show("practice");
else if(rp || dz) show("english");
else if(ipz) show("interview");
else show("home");

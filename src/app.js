/* Oath — US Citizenship Study app logic */
const STR = {
en:{
  appSub:"Study for U.S. Citizenship",
  tabs:[["study","📖","Study"],["practice","✍️","Practice"],["english","🗣️","English"],["process","📋","Process"],["resources","🔗","Resources"]],
  filingTitle:"When did you file Form N-400?",
  filedBefore:"Before Oct 20, 2025", filedAfter:"On / after Oct 20, 2025",
  testAfterHTML:"<b>You take the 2025 civics test:</b> 128 study questions. The officer asks up to 20 — you need <b>12 correct</b> to pass (it stops early at 9 wrong).",
  testBeforeHTML:"<b>You take the 2008 civics test:</b> all 100 questions are in this app below. The officer asks up to 10 — you need <b>6 correct</b> to pass.",
  testBeforeLink:"Official 2008 questions (USCIS text)",
  studyTitle:"Study the questions", all:"All", star65:"★ 65/20",
  tapReveal:"Tap a question to see the answer. Tap 🔊 to hear it read aloud.",
  answersLabel:"Accepted answers — any one is correct",
  knowIt:"✓ Know it", knownCount:(a,b)=>`${a} of ${b} marked known`,
  listen:"🔊 Listen",
  variesTitle:"⚠ This answer changes",
  variesText:"Officeholders and local answers change over time. Check the current answer before your interview:",
  variesVerified:"Last verified Sept 2026",
  variesLinkLabel:{senators:"Find your senators → senate.gov",representative:"Find your representative → house.gov",governor:"Find your governor → usa.gov","state capital":"State capitals → usa.gov",office:"Current officeholders → uscis.gov/testupdates"},
  practiceTitle:"Practice test", start:"Start",
  practiceIntro:"Like the real interview: questions are asked out loud. Read each question, say your answer out loud, then check yourself honestly.",
  testStd:"2025 test — standard", testStdDesc:"Up to 20 questions · 12 correct to pass · stops at 9 wrong",
  testStd08:"2008 test — standard", testStdDesc08:"Up to 10 questions · 6 correct to pass · stops at 5 wrong",
  practiceIntro08:"Like the real 2008 interview: the officer asks up to 10 questions — answer 6 correctly to pass. Read each question, say your answer out loud, then check yourself honestly.",
  testSenior:"65/20 special", testSeniorDesc:"10 questions from the ★ set · 6 correct to pass",
  oldTestNote:"Filed before Oct 20, 2025? You take the 2008 test — practice with the official materials:",
  showAnswer:"Show answer", iKnew:"✓ I knew it", iMissed:"✗ I missed it",
  qNum:(a)=>`Question ${a}`,
  correctToPass:(n)=>`${n} correct to pass`, wrongs:(n)=>`${n} wrong`,
  passMsg:"You passed! 🎉", failMsg:"Not yet — keep studying 💪",
  yourScore:"Your score", reviewMissed:"Review what you missed:", tryAgain:"Try again", backToSetup:"← Choose another test",
  searchPh:"🔍 Search questions or answers…",
  noResults:"No questions match your search.",
  historyH:"Your practice history", historyEmpty:"No practice tests yet — your results will appear here.",
  reviewBtn:(n)=>`🔁 Review mistakes (${n})`,
  reviewIntro:"Questions you missed before. Tap “I knew it” to clear one from this list.",
  clearedAll:"All clear — no mistakes left! 🎉",
  stillLeft:(n)=>`${n} still need${n===1?"s":""} work — keep reviewing.`,
  readingTitle:"Reading", writingTitle:"Speaking, reading & writing",
  speakH:"Speaking", speakP:"No separate test — the officer judges your spoken English during the interview. Understand the questions and answer in English.",
  readP:"Read <b>1 of 3</b> sentences aloud correctly. Study the official reading vocabulary — tap any word to hear it:",
  writeP:"Write <b>1 of 3</b> sentences correctly as the officer dictates it. Study the official writing vocabulary — tap any word to hear it:",
  readVocab:"Reading vocabulary", writeVocab:"Writing vocabulary",
  procTitle:"The road to citizenship", eligH:"Who can apply (5-year path)",
  elig:["Be 18 or older when you file","Be a lawful permanent resident (green card holder) for at least 5 years","Have continuous residence in the U.S. for 5 years before filing","Be physically present in the U.S. at least 30 of the last 60 months","Have lived at least 3 months in the state or USCIS district where you apply","Show good moral character for the 5 years before filing","Be attached to the principles of the U.S. Constitution","Be able to read, write, and speak basic English","Know U.S. history and government (the tests in this app)","Take the Oath of Allegiance"],
  stepsH:"The 8 steps",
  steps:[["Check if you qualify","Review the eligibility requirements for your situation (5-year, 3-year marriage, or military path)."],["Prepare Form N-400","Fill out the Application for Naturalization carefully. Gather your green card, travel records, tax records, and other documents."],["Submit your application","File online at uscis.gov ($710) or by mail ($760). Keep copies of everything you send."],["Biometrics appointment","If scheduled, visit an Application Support Center for fingerprints and a photo."],["The interview","A USCIS officer reviews your application and gives you the English and civics tests."],["Get the decision","Granted, continued (30–90 days to send missing documents), or denied."],["Oath ceremony notice","You receive Form N-445 with the date, time, and place of your ceremony."],["Take the Oath","At the ceremony you take the Oath of Allegiance and receive your Certificate of Naturalization. You are a U.S. citizen!"]],
  feesH:"Filing fees", feeRows:[["N-400 online","$710"],["N-400 by mail","$760"],["Reduced fee (paper only, income below 400% of poverty guidelines)","$380"]],
  feesNote:"Fees change over time. Always verify the current fee at uscis.gov before you file.",
  excH:"Exceptions",
  excs:[["50/20","Age 50+ with 20+ years as a permanent resident: no English test. Take the civics test in your language, with your own interpreter."],["55/15","Age 55+ with 15+ years as a permanent resident: no English test. Take the civics test in your language, with your own interpreter."],["65/20","Age 65+ with 20+ years as a permanent resident: simpler civics test — 10 questions from a special set of 20, 6 correct to pass. May use your language."],["N-648 disability","A licensed doctor can certify a medical condition (12+ months) that prevents the English or civics test. You may then be exempt."]],
  resTitle:"Official resources",
  resIntro:"Always trust uscis.gov first. These are the official pages behind everything in this app:",
  res:[["2025 Civics Test (official)","The official 2025 test page and the 128-question study bank (PDF).","https://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/2025-civics-test"],["Check for Test Updates","Answers that change (president, senators, governor…). Check before your interview.","https://www.uscis.gov/citizenship/testupdates"],["Study for the Test","All official USCIS study materials in one place.","https://www.uscis.gov/citizenship/find-study-materials-and-resources/study-for-the-test"],["10 Steps to Naturalization","The official step-by-step process.","https://www.uscis.gov/citizenship/learn-about-citizenship/10-steps-to-naturalization"],["Exceptions & Accommodations","Age, disability, and other exceptions explained.","https://www.uscis.gov/citizenship/exceptions-and-accommodations"],["Multilingual Resources","Official USCIS materials in Spanish, Arabic, Chinese, Korean, Tagalog, Vietnamese (for the 2008 test).","https://www.uscis.gov/citizenship/find-study-materials-and-resources/citizenship-multilingual-resources"],["2008 Test Questions (official text)","The 100-question bank for applications filed before Oct 20, 2025.","http://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/study-for-the-test/citizenship-resources-in-text-only-format"],["Reduced Fee Request","How to request the $380 reduced filing fee.","https://www.uscis.gov/forms/filing-fees/additional-information-on-filing-a-reduced-fee-request"]],
  disc:"<b>Study aid only — not legal advice.</b> Spanish translations are study help; the official 2025 test materials are published in English only. Some answers (president, senators, governor…) change over time — always check <b>uscis.gov/citizenship/testupdates</b> before your interview. Question content: USCIS M-1778 (09/25), verified Sept 2026."
},
es:{
  appSub:"Estudia para la ciudadanía estadounidense",
  tabs:[["study","📖","Estudiar"],["practice","✍️","Practicar"],["english","🗣️","Inglés"],["process","📋","Proceso"],["resources","🔗","Recursos"]],
  filingTitle:"¿Cuándo presentaste el Formulario N-400?",
  filedBefore:"Antes del 20 de oct. de 2025", filedAfter:"El 20 de oct. de 2025 o después",
  testAfterHTML:"<b>Tomas el examen de educación cívica 2025:</b> 128 preguntas de estudio. El oficial hace hasta 20 preguntas — necesitas <b>12 correctas</b> para aprobar (se detiene con 9 errores).",
  testBeforeHTML:"<b>Tomas el examen de educación cívica 2008:</b> las 100 preguntas están en esta aplicación abajo. El oficial hace hasta 10 — necesitas <b>6 correctas</b> para aprobar.",
  testBeforeLink:"Preguntas oficiales 2008 (texto de USCIS)",
  studyTitle:"Estudia las preguntas", all:"Todas", star65:"★ 65/20",
  tapReveal:"Toca una pregunta para ver la respuesta. Toca 🔊 para escucharla.",
  answersLabel:"Respuestas aceptadas — cualquiera es correcta",
  knowIt:"✓ La sé", knownCount:(a,b)=>`${a} de ${b} marcadas`,
  listen:"🔊 Escuchar",
  variesTitle:"⚠ Esta respuesta cambia",
  variesText:"Los funcionarios y las respuestas locales cambian con el tiempo. Verifica la respuesta actual antes de tu entrevista:",
  variesVerified:"Verificado en septiembre de 2026",
  variesLinkLabel:{senators:"Encuentra tus senadores → senate.gov",representative:"Encuentra tu representante → house.gov",governor:"Encuentra tu gobernador → usa.gov","state capital":"Capitales estatales → usa.gov",office:"Funcionarios actuales → uscis.gov/testupdates"},
  practiceTitle:"Examen de práctica", start:"Comenzar",
  practiceIntro:"Como en la entrevista real: las preguntas se hacen en voz alta. Lee cada pregunta, di tu respuesta en voz alta y evalúate con honestidad.",
  testStd:"Examen 2025 — estándar", testStdDesc:"Hasta 20 preguntas · 12 correctas para aprobar · se detiene con 9 errores",
  testStd08:"Examen 2008 — estándar", testStdDesc08:"Hasta 10 preguntas · 6 correctas para aprobar · se detiene con 5 errores",
  practiceIntro08:"Como en la entrevista real de 2008: el oficial hace hasta 10 preguntas — responde 6 correctamente para aprobar. Lee cada pregunta, di tu respuesta en voz alta y evalúate con honestidad.",
  testSenior:"Especial 65/20", testSeniorDesc:"10 preguntas del grupo ★ · 6 correctas para aprobar",
  oldTestNote:"¿Presentaste antes del 20 de oct. de 2025? Tomas el examen 2008 — practica con los materiales oficiales:",
  showAnswer:"Mostrar respuesta", iKnew:"✓ La sabía", iMissed:"✗ No la sabía",
  qNum:(a)=>`Pregunta ${a}`,
  correctToPass:(n)=>`${n} correctas para aprobar`, wrongs:(n)=>`${n} errores`,
  passMsg:"¡Aprobaste! 🎉", failMsg:"Todavía no — sigue estudiando 💪",
  yourScore:"Tu puntaje", reviewMissed:"Repasa lo que fallaste:", tryAgain:"Intentar de nuevo", backToSetup:"← Elige otro examen",
  searchPh:"🔍 Buscar preguntas o respuestas…",
  noResults:"Ninguna pregunta coincide con tu búsqueda.",
  historyH:"Tu historial de práctica", historyEmpty:"Sin exámenes de práctica todavía — tus resultados aparecerán aquí.",
  reviewBtn:(n)=>`🔁 Repasar errores (${n})`,
  reviewIntro:"Preguntas que fallaste antes. Toca «La sabía» para quitar una de esta lista.",
  clearedAll:"¡Todo claro — no quedan errores! 🎉",
  stillLeft:(n)=>`${n} aún necesita${n===1?"":"n"} trabajo — sigue repasando.`,
  readingTitle:"Lectura", writingTitle:"Hablar, leer y escribir",
  speakH:"Hablar", speakP:"Sin examen separado — el oficial evalúa tu inglés hablado durante la entrevista. Entiende las preguntas y responde en inglés.",
  readP:"Lee <b>1 de 3</b> oraciones en voz alta correctamente. Estudia el vocabulario oficial de lectura — toca cualquier palabra para escucharla:",
  writeP:"Escribe <b>1 de 3</b> oraciones correctamente mientras el oficial la dicta. Estudia el vocabulario oficial de escritura — toca cualquier palabra para escucharla:",
  readVocab:"Vocabulario de lectura", writeVocab:"Vocabulario de escritura",
  procTitle:"El camino a la ciudadanía", eligH:"Quién puede solicitar (vía de 5 años)",
  elig:["Tener 18 años o más al presentar la solicitud","Ser residente permanente legal (tener tarjeta verde) por al menos 5 años","Haber residido continuamente en EE. UU. durante 5 años antes de presentar","Haber estado físicamente presente en EE. UU. al menos 30 de los últimos 60 meses","Haber vivido al menos 3 meses en el estado o distrito de USCIS donde solicitas","Demostrar buena conducta moral durante los 5 años anteriores","Estar comprometido con los principios de la Constitución de EE. UU.","Poder leer, escribir y hablar inglés básico","Conocer la historia y el gobierno de EE. UU. (los exámenes de esta app)","Hacer el Juramento de Lealtad"],
  stepsH:"Los 8 pasos",
  steps:[["Verifica si calificas","Revisa los requisitos de elegibilidad para tu caso (5 años, 3 años por matrimonio, o vía militar)."],["Prepara el Formulario N-400","Completa la Solicitud de Naturalización con cuidado. Reúne tu tarjeta verde, registros de viajes, impuestos y otros documentos."],["Envía tu solicitud","Presenta en línea en uscis.gov ($710) o por correo ($760). Guarda copias de todo lo que envíes."],["Cita de datos biométricos","Si te citan, visita un Centro de Apoyo de Solicitudes para huellas y foto."],["La entrevista","Un oficial de USCIS revisa tu solicitud y te hace los exámenes de inglés y educación cívica."],["Recibe la decisión","Aprobada, continuada (30–90 días para enviar documentos faltantes) o denegada."],["Aviso de la ceremonia","Recibes el Formulario N-445 con la fecha, hora y lugar de tu ceremonia."],["Haz el juramento","En la ceremonia haces el Juramento de Lealtad y recibes tu Certificado de Naturalización. ¡Eres ciudadano de EE. UU.!"]],
  feesH:"Tarifas", feeRows:[["N-400 en línea","$710"],["N-400 por correo","$760"],["Tarifa reducida (solo por correo, ingresos bajo el 400% de la línea de pobreza)","$380"]],
  feesNote:"Las tarifas cambian con el tiempo. Verifica siempre la tarifa actual en uscis.gov antes de presentar.",
  excH:"Excepciones",
  excs:[["50/20","50 años o más con 20+ años como residente permanente: sin examen de inglés. Toma el examen de educación cívica en tu idioma, con tu propio intérprete."],["55/15","55 años o más con 15+ años como residente permanente: sin examen de inglés. Toma el examen de educación cívica en tu idioma, con tu propio intérprete."],["65/20","65 años o más con 20+ años como residente permanente: examen más simple — 10 preguntas de un grupo especial de 20, 6 correctas para aprobar. Puedes usar tu idioma."],["N-648 discapacidad","Un médico licenciado puede certificar una condición médica (12+ meses) que impide los exámenes de inglés o educación cívica. Puedes quedar exento."]],
  resTitle:"Recursos oficiales",
  resIntro:"Confía siempre primero en uscis.gov. Estas son las páginas oficiales detrás de todo lo que hay en esta app:",
  res:[["Examen de Educación Cívica 2025 (oficial)","La página oficial del examen 2025 y el banco de 128 preguntas (PDF).","https://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/2025-civics-test"],["Revisar actualizaciones del examen","Respuestas que cambian (presidente, senadores, gobernador…). Revisa antes de tu entrevista.","https://www.uscis.gov/citizenship/testupdates"],["Estudia para el examen","Todos los materiales oficiales de estudio de USCIS en un lugar.","https://www.uscis.gov/citizenship/find-study-materials-and-resources/study-for-the-test"],["10 pasos a la naturalización","El proceso oficial paso a paso.","https://www.uscis.gov/citizenship/learn-about-citizenship/10-steps-to-naturalization"],["Excepciones y adaptaciones","Excepciones por edad, discapacidad y otras, explicadas.","https://www.uscis.gov/citizenship/exceptions-and-accommodations"],["Recursos multilingües","Materiales oficiales de USCIS en español, árabe, chino, coreano, tagalo, vietnamita (para el examen 2008).","https://www.uscis.gov/citizenship/find-study-materials-and-resources/citizenship-multilingual-resources"],["Preguntas del examen 2008 (texto oficial)","El banco de 100 preguntas para solicitudes presentadas antes del 20 de oct. de 2025.","http://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/study-for-the-test/citizenship-resources-in-text-only-format"],["Solicitud de tarifa reducida","Cómo solicitar la tarifa reducida de $380.","https://www.uscis.gov/forms/filing-fees/additional-information-on-filing-a-reduced-fee-request"]],
  disc:"<b>Solo ayuda de estudio — no es asesoría legal.</b> Las traducciones al español son para ayudarte a estudiar; los materiales oficiales del examen 2025 se publican solo en inglés. Algunas respuestas (presidente, senadores, gobernador…) cambian con el tiempo — revisa siempre <b>uscis.gov/citizenship/testupdates</b> antes de tu entrevista. Contenido de preguntas: USCIS M-1778 (09/25), verificado en septiembre de 2026."
}};

const VARIES_LINK = {
  "senators":"https://www.senate.gov/senators/senators-contact.htm",
  "representative":"https://www.house.gov/representatives/find-your-representative",
  "governor":"https://www.usa.gov/state-governments",
  "state capital":"https://www.usa.gov/state-governments",
  "speaker":"https://www.uscis.gov/citizenship/testupdates",
  "president":"https://www.uscis.gov/citizenship/testupdates",
  "vice president":"https://www.uscis.gov/citizenship/testupdates",
  "chief justice":"https://www.uscis.gov/citizenship/testupdates"
};

/* ---------- state ---------- */
let lang = localStorage.getItem("oath_lang") || "en";
let filed = localStorage.getItem("oath_filed") || "after";
let known = new Set(JSON.parse(localStorage.getItem("oath_known") || "[]"));
let history = JSON.parse(localStorage.getItem("oath_history") || "[]");
let mistakes = new Set(JSON.parse(localStorage.getItem("oath_mistakes") || "[]"));
let studyCat = "all", studyStar = false, studyQ = "", curView = "study";
const T = () => STR[lang];
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const saveKnown = () => localStorage.setItem("oath_known", JSON.stringify([...known]));
const saveHistory = () => localStorage.setItem("oath_history", JSON.stringify(history.slice(-20)));
const saveMistakes = () => localStorage.setItem("oath_mistakes", JSON.stringify([...mistakes].slice(0,60)));
/* active question bank + namespaced per-bank progress keys ("08:"=2008 test, "25:"=2025 test) */
const Q = () => filed==="before" ? QUESTIONS2008 : QUESTIONS;
const qkey = n => (filed==="before"?"08":"25") + ":" + n;
(function migrateKeys(){
  const mig = s => new Set([...s].map(k => String(k).includes(":") ? k : "25:"+k));
  const k2 = mig(known), m2 = mig(mistakes);
  const same = (a,b) => a.size===b.size && [...a].every(k=>b.has(k));
  if(!same(k2,known) || !same(m2,mistakes)){ known=k2; mistakes=m2; saveKnown(); saveMistakes(); }
})();

/* ---------- speech ---------- */
let voices = [];
function loadVoices(){ try{ voices = speechSynthesis.getVoices(); }catch(e){} }
if("speechSynthesis" in window){ loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function speak(text){
  if(!("speechSynthesis" in window)) return;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "es" ? "es-US" : "en-US";
    u.rate = 0.88; u.pitch = 1;
    const v = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang === "es" ? "es" : "en"));
    if(v) u.voice = v;
    speechSynthesis.speak(u);
  }catch(e){}
}

/* ---------- chrome ---------- */
function renderChrome(){
  document.documentElement.lang = lang;
  document.getElementById("appSub").textContent = T().appSub;
  document.getElementById("langEn").classList.toggle("on", lang==="en");
  document.getElementById("langEs").classList.toggle("on", lang==="es");
  document.getElementById("tabs").innerHTML = T().tabs.map(([id,ic,lb]) =>
    `<button class="tab${curView===id?" on":""}" data-v="${id}"><span class="ti">${ic}</span>${esc(lb)}</button>`).join("");
  document.getElementById("disclaimer").innerHTML = T().disc;
}
function filingCard(){
  const t = T();
  return `<div class="card"><h2>${esc(t.filingTitle)}</h2>
    <div class="filing">
      <button data-f="before" class="${filed==="before"?"on":""}">${esc(t.filedBefore)}</button>
      <button data-f="after" class="${filed==="after"?"on":""}">${esc(t.filedAfter)}</button>
    </div>
    <div class="note" style="margin-top:10px">${filed==="after" ? t.testAfterHTML : t.testBeforeHTML}</div>
  </div>`;
}

/* ---------- study ---------- */
function cats(){ const seen=[]; Q().forEach(q=>{ const c=lang==="es"?q.cat_es:q.cat; if(!seen.includes(c)) seen.push(c); }); return seen; }
function filteredQuestions(){
  let list = Q().filter(q=>{
    if(studyStar && !q.star) return false;
    if(studyCat!=="all" && (lang==="es"?q.cat_es:q.cat)!==studyCat) return false;
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
  const t = T(), cat = lang==="es"?q.cat_es:q.cat;
  return `<div class="qcard" data-n="${q.n}">
    <div class="qhead" data-act="toggle">
      <div class="qnum${q.star?" star":""}">${q.n}</div>
      <div style="flex:1"><div class="qtext">${esc(q.q[lang])}</div>
      <div class="qmeta"><span class="tag cat">${esc(cat)}</span>
      ${q.star?`<span class="tag star65">★ 65/20</span>`:""}
      ${q.varies?`<span class="tag varies">⚠</span>`:""}</div></div>
    </div>
    <div class="qactions">
      <button class="iconbtn" data-act="speak" aria-label="${esc(t.listen)}">${esc(t.listen)}</button>
      <button class="iconbtn${known.has(qkey(q.n))?" known-on":""}" data-act="known">${esc(t.knowIt)}</button>
    </div>
    <div class="qbody">${answerHTML(q)}</div>
  </div>`;
}
function renderStudy(){
  const t = T(), el = document.getElementById("v-study");
  const chipAll = `<button class="chip${studyCat==="all"?" on":""}" data-c="all">${esc(t.all)}</button>`;
  const chipStar = filed==="before" ? "" : `<button class="chip${studyStar?" on":""}" data-s="1">${esc(t.star65)}</button>`;
  const chips = chipAll + cats().map(c=>`<button class="chip${studyCat===c?" on":""}" data-c="${esc(c)}">${esc(c)}</button>`).join("") + chipStar;
  const knownN = Q().filter(q=>known.has(qkey(q.n))).length;
  el.innerHTML = filingCard() + `<div class="card"><h2>${esc(t.studyTitle)}</h2>
    <div class="note">${esc(t.tapReveal)}</div>
    <div class="progress" aria-hidden="true"><div style="width:${(knownN/Q().length*100).toFixed(1)}%"></div></div>
    <div class="note">${esc(t.knownCount(knownN, Q().length))}</div></div>
    <input id="qsearch" class="search" type="search" placeholder="${esc(t.searchPh)}" value="${esc(studyQ)}" aria-label="${esc(t.searchPh)}">
    <div class="chips">${chips}</div><div id="qlist"></div>`;
  renderQList();
  const si = el.querySelector("#qsearch");
  si.addEventListener("input", ()=>{ studyQ = si.value; renderQList(); });
}
function renderQList(){
  const ql = document.getElementById("qlist");
  if(!ql) return;
  const list = filteredQuestions();
  ql.innerHTML = list.length ? list.map(qCardHTML).join("")
    : `<div class="card"><p class="note" style="text-align:center">${esc(t.noResults)}</p></div>`;
}
function answerHTML(q){
  const t = T();
  if(q.varies){
    const key = q.varies;
    const linkKey = (key==="speaker"||key==="president"||key==="vice president"||key==="chief justice") ? "office" : key;
    const rawAns = q.a[lang].join("; ");
    const m = rawAns.match(/^(VARIES|VARÍA)\s*[—–-]\s*([^()]+?)\s*\(([^)]*(?:verificado|verified)[^)]*)\)\s*$/i);
    let body = `<div class="warnbox"><b>${esc(t.variesTitle)}.</b> ${esc(t.variesText)}<br>
      <a href="${VARIES_LINK[key]}" target="_blank" rel="noopener">${esc(t.variesLinkLabel[linkKey]||t.variesLinkLabel.office)}</a>`;
    if(m) body += `<br><span class="note">${esc(m[3][0].toUpperCase()+m[3].slice(1))}: <b>${esc(m[2].trim())}</b></span>`;
    else body += `<br><span class="note">${esc(rawAns.replace(/^(VARIES|VARÍA)\s*/i,""))}</span>`;
    return body + `</div>`;
  }
  return `<div class="alabel">${esc(t.answersLabel)}</div><ul>` +
    q.a[lang].map(a=>`<li>${esc(a)}</li>`).join("") + `</ul>`;
}

/* ---------- practice ---------- */
let pz = null;
function historyHTML(){
  const t = T();
  if(!history.length) return `<p class="note">${esc(t.historyEmpty)}</p>`;
  return `<ul class="histlist">` + history.slice(-5).reverse().map(h=>{
    const dot = h.pass ? "🟢" : "🔴";
    const mode = h.mode==="senior" ? "★" : h.mode==="review" ? "🔁" : "▶";
    const bank = h.bank==="08" ? "2008" : h.bank==="25" ? "2025" : "";
    return `<li>${dot} ${mode} <b>${h.right}/${h.total}</b> <span class="note">${bank}${bank?" · ":""}${esc(h.d)}</span></li>`;
  }).join("") + `</ul>`;
}
function renderPractice(){
  const t = T(), el = document.getElementById("v-practice");
  if(!pz){
    const bank = filed==="before" ? "08:" : "25:";
    const mcount = [...mistakes].filter(k=>k.startsWith(bank)).length;
    el.innerHTML = filingCard() + `<div class="card"><h2>${esc(t.practiceTitle)}</h2>
      <p class="note">${esc(filed==="before" ? t.practiceIntro08 : t.practiceIntro)}</p>
      <div class="pill-row">
        <button class="btn big" data-p="std">▶ ${esc(filed==="before" ? t.testStd08 : t.testStd)}<br><span style="font-weight:400;font-size:13px">${esc(filed==="before" ? t.testStdDesc08 : t.testStdDesc)}</span></button>
        ${filed==="before" ? "" : `<button class="btn big ghost" data-p="senior">★ ${esc(t.testSenior)}<br><span style="font-weight:400;font-size:13px">${esc(t.testSeniorDesc)}</span></button>`}
      </div>
      ${mcount?`<button class="btn big gold" data-p="review" style="margin-top:10px">${esc(typeof t.reviewBtn==="function"?t.reviewBtn(mcount):t.reviewBtn)}</button>
      <p class="note">${esc(t.reviewIntro)}</p>`:""}
    </div>
    <div class="card"><h2>${esc(t.historyH)}</h2>${historyHTML()}</div>`;
    return;
  }
  if(pz.done){ renderPracticeDone(el); return; }
  const q = pz.order[pz.idx], t2 = T();
  el.innerHTML = `<div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <b>${esc(t2.qNum(pz.idx+1))}</b>
      <span class="note">${esc(t2.correctToPass(pz.need))} · <span style="color:${pz.wrong>0?"var(--red)":"inherit"}">${esc(t2.wrongs(pz.wrong))}</span></span>
    </div>
    <div class="progress"><div style="width:${(pz.right/pz.need*100).toFixed(0)}%"></div></div>
    <h2 style="font-size:21px;margin:10px 0">${esc(q.q[lang])}</h2>
    <button class="iconbtn" data-act="speak">${esc(t2.listen)}</button>
    <div id="pans"></div>
  </div>`;
  const box = el.querySelector("#pans");
  const showAns = ()=>{
    box.innerHTML = answerHTML(q) + `<div class="pill-row">
      <button class="btn" data-r="y" style="background:var(--green)">${esc(t2.iKnew)}</button>
      <button class="btn" data-r="n" style="background:var(--red)">${esc(t2.iMissed)}</button></div>`;
  };
  box.innerHTML = `<button class="btn big" id="showA">${esc(t2.showAnswer)}</button>`;
  box.querySelector("#showA").onclick = showAns;
  el.querySelector('[data-act="speak"]').onclick = ()=>speak(q.q[lang]);
}
function startPractice(mode){
  const review = mode==="review", senior = mode==="senior", before = filed==="before";
  let pool;
  if(review) pool = Q().filter(q=>mistakes.has(qkey(q.n)));
  else pool = senior ? Q().filter(q=>q.star) : [...Q()];
  for(let i=pool.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
  const total = review ? Math.min(pool.length,20) : (senior?10:(before?10:20));
  const need = review ? Math.ceil(total*0.7) : (senior?6:(before?6:12));
  const maxWrong = review ? total+1 : (senior?5:(before?5:9));
  pz = {order:pool.slice(0,total), idx:0, right:0, wrong:0, need, maxWrong, missed:[], done:false, senior, review, recorded:false};
  renderPractice();
}
function practiceAnswer(ok){
  const q = pz.order[pz.idx];
  if(ok){ pz.right++; if(pz.review){ mistakes.delete(qkey(q.n)); saveMistakes(); } }
  else { pz.wrong++; pz.missed.push(q); }
  pz.idx++;
  const finished = pz.review ? pz.idx>=pz.order.length
    : (pz.right>=pz.need || pz.wrong>=pz.maxWrong || pz.idx>=pz.order.length);
  if(finished) pz.done = true;
  renderPractice();
  window.scrollTo({top:0, behavior:"smooth"});
}
function renderPracticeDone(el){
  const t = T(), pass = pz.right>=pz.need;
  if(!pz.recorded){
    pz.recorded = true;
    history.push({d:new Date().toISOString().slice(0,10),
      mode: pz.review?"review":(pz.senior?"senior":"std"),
      right:pz.right, total:pz.idx, pass, bank: filed==="before"?"08":"25"});
    saveHistory();
    pz.missed.forEach(q=>mistakes.add(qkey(q.n))); saveMistakes();
  }
  const headMsg = pz.review
    ? (mistakes.size===0 ? t.clearedAll : t.stillLeft(mistakes.size))
    : (pass ? t.passMsg : t.failMsg);
  el.innerHTML = `<div class="card" style="text-align:center">
    <div class="result ${pz.review ? (mistakes.size===0?"pass":"fail") : (pass?"pass":"fail")}">${esc(headMsg)}</div>
    <div class="scorebar">
      <div class="scorepill ok"><b>${pz.right}</b><span>✓</span></div>
      <div class="scorepill bad"><b>${pz.wrong}</b><span>✗</span></div>
      <div class="scorepill"><b>${pz.right}/${pz.idx}</b><span>${esc(t.yourScore)}</span></div>
    </div>
    ${pz.missed.length?`<h3 style="text-align:left">${esc(t.reviewMissed)}</h3>`+pz.missed.map(q=>
      `<div class="missed"><div class="mq">${q.n}. ${esc(q.q[lang])}</div><div class="ma">${esc(q.a[lang].join(" · "))}</div></div>`).join(""):""}
    <button class="btn big gold" id="retry">${esc(t.tryAgain)}</button>
    <button class="btn big ghost" id="newtest">${esc(t.backToSetup)}</button>
  </div>`;
  el.querySelector("#retry").onclick = ()=>startPractice(pz.review?"review":(pz.senior?"senior":"std"));
  el.querySelector("#newtest").onclick = ()=>{ pz=null; renderPractice(); };
}

/* ---------- english ---------- */
function renderEnglish(){
  const t = T(), el = document.getElementById("v-english");
  const chips = arr => `<div class="vocabchips">`+arr.map(w=>`<button class="vchip" data-w="${esc(w)}">${esc(w)}</button>`).join("")+`</div>`;
  el.innerHTML = `<div class="card"><h2>${esc(t.writingTitle)}</h2>
    <h3>🗣️ ${esc(t.speakH)}</h3><p>${t.speakP}</p>
    <h3>📖 ${esc(t.readingTitle)}</h3><p>${t.readP}</p>${chips(READING_VOCAB)}
    <h3>✏️ ${esc(t.writingTitle)}</h3><p>${t.writeP}</p>${chips(WRITING_VOCAB)}
  </div>`;
}

/* ---------- process ---------- */
function renderProcess(){
  const t = T(), el = document.getElementById("v-process");
  el.innerHTML = `<div class="card"><h2>${esc(t.procTitle)}</h2>
    <h3>${esc(t.eligH)}</h3><ul>${t.elig.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h2>${esc(t.stepsH)}</h2><ol class="steps">${t.steps.map(s=>`<li><b>${esc(s[0])}</b>${esc(s[1])}</li>`).join("")}</ol></div>
  <div class="card"><h2>${esc(t.feesH)}</h2>
    <table class="fees">${t.feeRows.map(r=>`<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td></tr>`).join("")}</table>
    <p class="note">⚠ ${esc(t.feesNote)}</p></div>
  <div class="card"><h2>${esc(t.excH)}</h2><div class="exgrid">${t.excs.map(e=>`<div class="excard"><b>${esc(e[0])}</b><p>${esc(e[1])}</p></div>`).join("")}</div></div>`;
}

/* ---------- resources ---------- */
function renderResources(){
  const t = T(), el = document.getElementById("v-resources");
  el.innerHTML = `<div class="card"><h2>${esc(t.resTitle)}</h2><p class="note">${esc(t.resIntro)}</p>
    <ul class="reslist">${t.res.map(r=>`<li><a href="${r[2]}" target="_blank" rel="noopener">${esc(r[0])}</a><p>${esc(r[1])}</p></li>`).join("")}</ul></div>`;
}

/* ---------- router & events ---------- */
function show(v){ curView=v; renderChrome();
  document.querySelectorAll(".view").forEach(s=>s.classList.remove("on"));
  document.getElementById("v-"+v).classList.add("on");
  ({study:renderStudy,practice:renderPractice,english:renderEnglish,process:renderProcess,resources:renderResources})[v]();
  window.scrollTo({top:0});
}
document.addEventListener("click", e=>{
  const tab = e.target.closest(".tab"); if(tab){ show(tab.dataset.v); return; }
  if(e.target.id==="langEn"){ lang="en"; localStorage.setItem("oath_lang",lang); show(curView); return; }
  if(e.target.id==="langEs"){ lang="es"; localStorage.setItem("oath_lang",lang); show(curView); return; }
  const f = e.target.closest("[data-f]"); if(f){ filed=f.dataset.f; localStorage.setItem("oath_filed",filed); show(curView); return; }
  const c = e.target.closest("[data-c]"); if(c){ studyCat=c.dataset.c; renderStudy(); return; }
  const s = e.target.closest("[data-s]"); if(s){ studyStar=!studyStar; renderStudy(); return; }
  const p = e.target.closest("[data-p]"); if(p){ startPractice(p.dataset.p); return; }
  const r = e.target.closest("[data-r]"); if(r){ practiceAnswer(r.dataset.r==="y"); return; }
  const w = e.target.closest("[data-w]"); if(w){ speak(w.dataset.w); return; }
  const card = e.target.closest(".qcard");
  if(card){
    const actBtn = e.target.closest("[data-act]");
    const n = +card.dataset.n, q = Q().find(x=>x.n===n);
    if(actBtn){
      const act = actBtn.dataset.act, k = qkey(n);
      if(act==="toggle"){ card.classList.toggle("open"); }
      else if(act==="speak"){ e.stopPropagation(); speak(q.q[lang]+". "+q.a[lang].join(", ")); }
      else if(act==="known"){ e.stopPropagation(); known.has(k)?known.delete(k):known.add(k); saveKnown(); actBtn.classList.toggle("known-on"); }
      return;
    }
  }
  const head = e.target.closest(".qhead"); if(head){ head.closest(".qcard").classList.toggle("open"); }
});
document.getElementById("langEn").onclick = ()=>{ lang="en"; localStorage.setItem("oath_lang",lang); show(curView); };
document.getElementById("langEs").onclick = ()=>{ lang="es"; localStorage.setItem("oath_lang",lang); show(curView); };
show("study");

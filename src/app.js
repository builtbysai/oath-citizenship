/* Oath — US Citizenship Study app logic */
const STR = {
en:{
  appSub:"Study for U.S. Citizenship",
  tabs:[["study","📖","Study"],["practice","✍️","Practice"],["interview","🎤","Interview"],["english","🗣️","English"],["process","📋","Process"],["resources","🔗","Resources"]],
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
  variesLinkLabel:{senators:"Find your senators → senate.gov",representative:"Find your representative → house.gov",governor:"Find your governor → usa.gov","state capital":"State capitals → usa.gov",justices:"Number of justices → uscis.gov/testupdates",office:"Current officeholders → uscis.gov/testupdates"},
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
  focusH:"🎯 Focus areas",
  focusD:"Your weakest categories from recent practice \u2014 study these first.",
  focusEmpty:"Practice a few rounds and we\u2019ll spot your focus areas here.",
  focusTries:n=>n+" tries",
  weakBtn:"🎯 Practice my weak spots",
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
  dictH:"Dictation practice",
  dictD:"Like the real test: the officer reads a sentence and you write it. Write <b>1 of 3</b> correctly to pass. These practice sentences use only the official writing vocabulary — USCIS does not publish the real test sentences.",
  dictStart:"Start dictation", dictPlay:"🔊 Play sentence", dictPh:"Type what you hear…",
  dictCheck:"Check", dictNext:"Next →", dictQ:(a,b)=>`Sentence ${a} of ${b}`,
  dictCorrect:"Correct! ✓", dictWrong:"Not quite ✗",
  dictRight:"The sentence was:", dictYour:"You wrote:",
  dictDone:"Dictation complete!", dictScore:(s,n)=>`${s} of ${n} correct`,
  streakMsg:n=>n===1?"🔥 1 day streak":"🔥 "+n+" day streak",
  streakD:"Finish any practice, reading, or dictation once a day to keep it burning.",
  cdH:"Interview countdown",
  cdD:"Set your interview date and we\u2019ll count down with a study pace for the days left.",
  cdSet:"Set date", cdChange:"Change", cdClear:"Clear",
  cdDays:n=>n===1?"1 day left":n+" days left",
  cdToday:"Today\u2019s the day \u2014 good luck! \ud83c\udf40",
  cdPast:"How did it go? Clear the date to start fresh.",
  cdPace:n=>n>30?"Steady pace: one practice round a day keeps you sharp.":n>7?"Build momentum: one full practice plus mistake review every day.":"Final stretch: one mock interview every day this week.",
  mockH:"Full mock interview", mockD:"Simulate the real appointment, start to finish: reading, dictation, civics, then interview questions.",
  mockStart:"Start mock interview", mockPhase:(n)=>`🎭 Mock interview · part ${n} of 4`,
  mockRead:"Reading", mockDict:"Dictation", mockCiv:"Civics", mockN400:"Interview questions",
  mockSumH:"Mock interview results",
  mockPassAll:"You passed every scored part — you're ready! 🎉",
  mockFailSome:"Keep practicing the parts marked ✗, then run it again.",
  readH:"Reading practice",
  readD:"Like the real test: read <b>1 of 3</b> sentences aloud so the officer can understand every word. Read each sentence out loud, then tap honestly.",
  readStart:"Start reading practice", readAloud:"🔊 Hear it first",
  readQ:(a,b)=>`Sentence ${a} of ${b}`,
  readOk:"I read it correctly ✓", readNo:"I missed some words ✗",
  readDone:"Reading practice complete!", readScore:(s)=>`${s} of 3 read correctly`,
  readHonest:"Be honest with yourself — at the real interview, the officer decides.",
  intTitle:"Interview questions",
  intIntro:"At your interview, the officer asks these personal questions from <b>Part 9 of Form N-400</b> (edition 01/20/25). Most are answered “No” — the last ones, about the Oath, are answered “Yes”. Always answer truthfully.",
  intSource:"Source: official Form N-400, Part 9. Spanish is a study aid only.",
  intMeaning:"What it means",
  expNo:"Usually “No”", expYes:"Usually “Yes”", expVaries:"Depends on you",
  expVariesNote:"Answer truthfully — it depends on your situation.",
  fNo:"Usually No", fYes:"Usually Yes", fDep:"Depends",
  intPracticeH:"Practice the interview", intPracticeD:"10 random questions · tap Yes or No, like the officer asks.",
  intStart:"Start practice",
  intQ:(a,b)=>`Question ${a} of ${b}`,
  intCorrect:"Correct ✓", intWrong:"Not quite ✗",
  intVariesFb:"This one depends on your situation — at the real interview, answer truthfully.",
  intDone:"Interview practice complete!", intScore:(s)=>`${s} of 10 correct`,
  intAgain:"Practice again", intNext:"Next →",
  procTitle:"The road to citizenship", eligH:"Who can apply (5-year path)",
  elig:["Be 18 or older when you file","Be a lawful permanent resident (green card holder) for at least 5 years","Have continuous residence in the U.S. for 5 years before filing","Be physically present in the U.S. at least 30 of the last 60 months","Have lived at least 3 months in the state or USCIS district where you apply","Show good moral character for the 5 years before filing","Be attached to the principles of the U.S. Constitution","Be able to read, write, and speak basic English","Know U.S. history and government (the tests in this app)","Take the Oath of Allegiance"],
  stepsH:"The 8 steps",
  steps:[["Check if you qualify","Review the eligibility requirements for your situation (5-year, 3-year marriage, or military path)."],["Prepare Form N-400","Fill out the Application for Naturalization carefully. Gather your green card, travel records, tax records, and other documents."],["Submit your application","File online at uscis.gov ($710) or by mail ($760). Keep copies of everything you send."],["Biometrics appointment","If scheduled, visit an Application Support Center for fingerprints and a photo."],["The interview","A USCIS officer reviews your application and gives you the English and civics tests."],["Get the decision","Granted, continued (30–90 days to send missing documents), or denied."],["Oath ceremony notice","You receive Form N-445 with the date, time, and place of your ceremony."],["Take the Oath","At the ceremony you take the Oath of Allegiance and receive your Certificate of Naturalization. You are a U.S. citizen!"]],
  feesH:"Filing fees", feeRows:[["N-400 online","$710"],["N-400 by mail","$760"],["Reduced fee (paper only, income below 400% of poverty guidelines)","$380"]],
  feesNote:"Fees change over time. Always verify the current fee at uscis.gov before you file.",
  excH:"Exceptions",
  excs:[["50/20","Age 50+ with 20+ years as a permanent resident: no English test. Take the civics test in your language, with your own interpreter."],["55/15","Age 55+ with 15+ years as a permanent resident: no English test. Take the civics test in your language, with your own interpreter."],["65/20","Age 65+ with 20+ years as a permanent resident: simpler civics test — 10 questions from a special set of 20, 6 correct to pass. May use your language."],["N-648 disability","A licensed doctor can certify a medical condition (12+ months) that prevents the English or civics test. You may then be exempt."]],
  packH:"What to bring to your interview", packIntro:"USCIS says the Form N-400 instructions list the original documents to bring, depending on your case. Check off what applies to you \u2014 your list is saved on this device.",
  packItems:["Appointment notice (Form I-797C)","Green Card (permanent resident card)","Passport(s) \u2014 current and expired","State driver\u2019s license or ID","Tax returns (last 3\u20135 years)","Marriage certificate (if married)","Divorce or death certificates (if previously married)","Children\u2019s birth certificates (if applicable)","Court / arrest records (if applicable)","Name-change documents (if applicable)"],
  packReset:"Reset checklist",
  dayH:"On the day",
  dayTips:["Arrive 15\u201330 minutes early \u2014 you\u2019ll go through security screening.","You\u2019ll be under oath: answer truthfully.","The officer reviews your N-400 first, then gives the English and civics tests.","If a document is missing, you usually get 30\u201390 days to send it \u2014 you won\u2019t have to start over."],
  resTitle:"Official resources",
  resIntro:"Always trust uscis.gov first. These are the official pages behind everything in this app:",
  res:[["2025 Civics Test (official)","The official 2025 test page and the 128-question study bank (PDF).","https://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/2025-civics-test"],["Check for Test Updates","Answers that change (president, senators, governor…). Check before your interview.","https://www.uscis.gov/citizenship/testupdates"],["Study for the Test","All official USCIS study materials in one place.","https://www.uscis.gov/citizenship/find-study-materials-and-resources/study-for-the-test"],["10 Steps to Naturalization","The official step-by-step process.","https://www.uscis.gov/citizenship/learn-about-citizenship/10-steps-to-naturalization"],["Exceptions & Accommodations","Age, disability, and other exceptions explained.","https://www.uscis.gov/citizenship/exceptions-and-accommodations"],["Multilingual Resources","Official USCIS materials in Spanish, Arabic, Chinese, Korean, Tagalog, Vietnamese (for the 2008 test).","https://www.uscis.gov/citizenship/find-study-materials-and-resources/citizenship-multilingual-resources"],["2008 Test Questions (official text)","The 100-question bank for applications filed before Oct 20, 2025.","http://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/study-for-the-test/citizenship-resources-in-text-only-format"],["Reduced Fee Request","How to request the $380 reduced filing fee.","https://www.uscis.gov/forms/filing-fees/additional-information-on-filing-a-reduced-fee-request"]],
  disc:"<b>Study aid only — not legal advice.</b> Spanish translations are study help; the official 2025 test materials are published in English only. Some answers (president, senators, governor…) change over time — always check <b>uscis.gov/citizenship/testupdates</b> before your interview. Question content: USCIS M-1778 (09/25) and Form N-400 (01/20/25) Part 9, verified Sept 2026."
},
es:{
  appSub:"Estudia para la ciudadanía estadounidense",
  tabs:[["study","📖","Estudiar"],["practice","✍️","Practicar"],["interview","🎤","Entrevista"],["english","🗣️","Inglés"],["process","📋","Proceso"],["resources","🔗","Recursos"]],
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
  variesLinkLabel:{senators:"Encuentra tus senadores → senate.gov",representative:"Encuentra tu representante → house.gov",governor:"Encuentra tu gobernador → usa.gov","state capital":"Capitales estatales → usa.gov",justices:"Número de jueces → uscis.gov/testupdates",office:"Funcionarios actuales → uscis.gov/testupdates"},
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
  focusH:"🎯 Áreas de enfoque",
  focusD:"Tus categorías más débiles en la práctica reciente — estudia estas primero.",
  focusEmpty:"Practica unas rondas y aquí mostraremos tus áreas de enfoque.",
  focusTries:n=>n+" intentos",
  weakBtn:"🎯 Practicar mis áreas débiles",
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
  dictH:"Práctica de dictado",
  dictD:"Como en el examen real: el oficial lee una frase y tú la escribes. Escribe bien <b>1 de 3</b> para aprobar. Estas frases de práctica usan solo el vocabulario oficial de escritura — USCIS no publica las frases reales del examen.",
  dictStart:"Empezar el dictado", dictPlay:"🔊 Escuchar la frase", dictPh:"Escribe lo que escuches…",
  dictCheck:"Revisar", dictNext:"Siguiente →", dictQ:(a,b)=>`Frase ${a} de ${b}`,
  dictCorrect:"¡Correcto! ✓", dictWrong:"Casi ✗",
  dictRight:"La frase era:", dictYour:"Escribiste:",
  dictDone:"¡Dictado completado!", dictScore:(s,n)=>`${s} de ${n} correctas`,
  streakMsg:n=>n===1?"🔥 Racha de 1 d\u00eda":"🔥 Racha de "+n+" d\u00edas",
  streakD:"Completa cualquier pr\u00e1ctica, lectura o dictado una vez al d\u00eda para mantenerla.",
  cdH:"Cuenta regresiva",
  cdD:"Pon la fecha de tu entrevista y contaremos los d\u00edas con un ritmo de estudio.",
  cdSet:"Fijar fecha", cdChange:"Cambiar", cdClear:"Borrar",
  cdDays:n=>n===1?"Falta 1 d\u00eda":"Faltan "+n+" d\u00edas",
  cdToday:"\u00a1Hoy es el d\u00eda \u2014 buena suerte! \ud83c\udf40",
  cdPast:"\u00bfC\u00f3mo te fue? Borra la fecha para empezar de nuevo.",
  cdPace:n=>n>30?"Ritmo constante: una ronda de pr\u00e1ctica al d\u00eda te mantiene afilado.":n>7?"Toma impulso: una pr\u00e1ctica completa m\u00e1s repaso de errores cada d\u00eda.":"Recta final: un simulacro cada d\u00eda esta semana.",
  mockH:"Simulacro completo de entrevista", mockD:"Simula la cita real de principio a fin: lectura, dictado, cívica y preguntas de entrevista.",
  mockStart:"Empezar simulacro", mockPhase:(n)=>`🎭 Simulacro · parte ${n} de 4`,
  mockRead:"Lectura", mockDict:"Dictado", mockCiv:"Cívica", mockN400:"Preguntas de entrevista",
  mockSumH:"Resultados del simulacro",
  mockPassAll:"¡Aprobaste todas las partes puntuadas — estás listo/a! 🎉",
  mockFailSome:"Sigue practicando las partes marcadas ✗ y repite el simulacro.",
  readH:"Práctica de lectura",
  readD:"Como en el examen real: lee <b>1 de 3</b> oraciones en voz alta para que el oficial entienda cada palabra. Lee cada oración en voz alta y luego toca con honestidad.",
  readStart:"Empezar la práctica de lectura", readAloud:"🔊 Escucharla primero",
  readQ:(a,b)=>`Oración ${a} de ${b}`,
  readOk:"La leí bien ✓", readNo:"Me equivoqué en algunas palabras ✗",
  readDone:"¡Práctica de lectura completada!", readScore:(s)=>`${s} de 3 leídas bien`,
  readHonest:"Sé honesto contigo mismo — en la entrevista real, el oficial decide.",
  intTitle:"Preguntas de la entrevista",
  intIntro:"En tu entrevista, el oficial hace estas preguntas personales de la <b>Parte 9 del Formulario N-400</b> (edición 01/20/25). La mayoría se responden «No» — las últimas, sobre el juramento, se responden «Sí». Responde siempre con la verdad.",
  intSource:"Fuente: Formulario oficial N-400, Parte 9. El español es solo ayuda para estudiar.",
  intMeaning:"Qué significa",
  expNo:"Normalmente «No»", expYes:"Normalmente «Sí»", expVaries:"Depende de ti",
  expVariesNote:"Responde con la verdad — depende de tu situación.",
  fNo:"Normalmente No", fYes:"Normalmente Sí", fDep:"Depende",
  intPracticeH:"Practica la entrevista", intPracticeD:"10 preguntas al azar · toca Sí o No, como las hace el oficial.",
  intStart:"Empezar a practicar",
  intQ:(a,b)=>`Pregunta ${a} de ${b}`,
  intCorrect:"Correcto ✓", intWrong:"Casi ✗",
  intVariesFb:"Esta depende de tu situación — en la entrevista real, responde con la verdad.",
  intDone:"¡Práctica de entrevista completada!", intScore:(s)=>`${s} de 10 correctas`,
  intAgain:"Practicar de nuevo", intNext:"Siguiente →",
  procTitle:"El camino a la ciudadanía", eligH:"Quién puede solicitar (vía de 5 años)",
  elig:["Tener 18 años o más al presentar la solicitud","Ser residente permanente legal (tener tarjeta verde) por al menos 5 años","Haber residido continuamente en EE. UU. durante 5 años antes de presentar","Haber estado físicamente presente en EE. UU. al menos 30 de los últimos 60 meses","Haber vivido al menos 3 meses en el estado o distrito de USCIS donde solicitas","Demostrar buena conducta moral durante los 5 años anteriores","Estar comprometido con los principios de la Constitución de EE. UU.","Poder leer, escribir y hablar inglés básico","Conocer la historia y el gobierno de EE. UU. (los exámenes de esta app)","Hacer el Juramento de Lealtad"],
  stepsH:"Los 8 pasos",
  steps:[["Verifica si calificas","Revisa los requisitos de elegibilidad para tu caso (5 años, 3 años por matrimonio, o vía militar)."],["Prepara el Formulario N-400","Completa la Solicitud de Naturalización con cuidado. Reúne tu tarjeta verde, registros de viajes, impuestos y otros documentos."],["Envía tu solicitud","Presenta en línea en uscis.gov ($710) o por correo ($760). Guarda copias de todo lo que envíes."],["Cita de datos biométricos","Si te citan, visita un Centro de Apoyo de Solicitudes para huellas y foto."],["La entrevista","Un oficial de USCIS revisa tu solicitud y te hace los exámenes de inglés y educación cívica."],["Recibe la decisión","Aprobada, continuada (30–90 días para enviar documentos faltantes) o denegada."],["Aviso de la ceremonia","Recibes el Formulario N-445 con la fecha, hora y lugar de tu ceremonia."],["Haz el juramento","En la ceremonia haces el Juramento de Lealtad y recibes tu Certificado de Naturalización. ¡Eres ciudadano de EE. UU.!"]],
  feesH:"Tarifas", feeRows:[["N-400 en línea","$710"],["N-400 por correo","$760"],["Tarifa reducida (solo por correo, ingresos bajo el 400% de la línea de pobreza)","$380"]],
  feesNote:"Las tarifas cambian con el tiempo. Verifica siempre la tarifa actual en uscis.gov antes de presentar.",
  excH:"Excepciones",
  excs:[["50/20","50 años o más con 20+ años como residente permanente: sin examen de inglés. Toma el examen de educación cívica en tu idioma, con tu propio intérprete."],["55/15","55 años o más con 15+ años como residente permanente: sin examen de inglés. Toma el examen de educación cívica en tu idioma, con tu propio intérprete."],["65/20","65 años o más con 20+ años como residente permanente: examen más simple — 10 preguntas de un grupo especial de 20, 6 correctas para aprobar. Puedes usar tu idioma."],["N-648 discapacidad","Un médico licenciado puede certificar una condición médica (12+ meses) que impide los exámenes de inglés o educación cívica. Puedes quedar exento."]],
  packH:"Qu\u00e9 llevar a tu entrevista", packIntro:"USCIS dice que las instrucciones del Formulario N-400 indican los documentos originales que debes llevar, seg\u00fan tu caso. Marca los que apliquen a ti \u2014 tu lista se guarda en este dispositivo.",
  packItems:["Aviso de cita (Formulario I-797C)","Tarjeta verde (tarjeta de residente permanente)","Pasaporte(s) \u2014 vigente(s) y vencido(s)","Licencia de conducir o identificaci\u00f3n estatal","Declaraciones de impuestos (\u00faltimos 3 a 5 a\u00f1os)","Certificado de matrimonio (si est\u00e1s casado/a)","Certificados de divorcio o defunci\u00f3n (si hubo matrimonios anteriores)","Certificados de nacimiento de tus hijos (si aplica)","Documentos judiciales / de arrestos (si aplica)","Documentos de cambio de nombre (si aplica)"],
  packReset:"Reiniciar lista",
  dayH:"El d\u00eda de la cita",
  dayTips:["Llega 15\u201330 minutos antes \u2014 pasar\u00e1s por un control de seguridad.","Estar\u00e1s bajo juramento: responde con la verdad.","El oficial revisa tu N-400 primero, luego te hace los ex\u00e1menes de ingl\u00e9s y educaci\u00f3n c\u00edvica.","Si falta un documento, normalmente te dan 30\u201390 d\u00edas para enviarlo \u2014 no tendr\u00e1s que empezar de nuevo."],
  resTitle:"Recursos oficiales",
  resIntro:"Confía siempre primero en uscis.gov. Estas son las páginas oficiales detrás de todo lo que hay en esta app:",
  res:[["Examen de Educación Cívica 2025 (oficial)","La página oficial del examen 2025 y el banco de 128 preguntas (PDF).","https://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/2025-civics-test"],["Revisar actualizaciones del examen","Respuestas que cambian (presidente, senadores, gobernador…). Revisa antes de tu entrevista.","https://www.uscis.gov/citizenship/testupdates"],["Estudia para el examen","Todos los materiales oficiales de estudio de USCIS en un lugar.","https://www.uscis.gov/citizenship/find-study-materials-and-resources/study-for-the-test"],["10 pasos a la naturalización","El proceso oficial paso a paso.","https://www.uscis.gov/citizenship/learn-about-citizenship/10-steps-to-naturalization"],["Excepciones y adaptaciones","Excepciones por edad, discapacidad y otras, explicadas.","https://www.uscis.gov/citizenship/exceptions-and-accommodations"],["Recursos multilingües","Materiales oficiales de USCIS en español, árabe, chino, coreano, tagalo, vietnamita (para el examen 2008).","https://www.uscis.gov/citizenship/find-study-materials-and-resources/citizenship-multilingual-resources"],["Preguntas del examen 2008 (texto oficial)","El banco de 100 preguntas para solicitudes presentadas antes del 20 de oct. de 2025.","http://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/study-for-the-test/citizenship-resources-in-text-only-format"],["Solicitud de tarifa reducida","Cómo solicitar la tarifa reducida de $380.","https://www.uscis.gov/forms/filing-fees/additional-information-on-filing-a-reduced-fee-request"]],
  disc:"<b>Solo ayuda de estudio — no es asesoría legal.</b> Las traducciones al español son para ayudarte a estudiar; los materiales oficiales del examen 2025 se publican solo en inglés. Algunas respuestas (presidente, senadores, gobernador…) cambian con el tiempo — revisa siempre <b>uscis.gov/citizenship/testupdates</b> antes de tu entrevista. Contenido de preguntas: USCIS M-1778 (09/25) y Formulario N-400 (01/20/25) Parte 9, verificado en septiembre de 2026."
}};

const VARIES_LINK = {
  "senators":"https://www.senate.gov/senators/senators-contact.htm",
  "representative":"https://www.house.gov/representatives/find-your-representative",
  "governor":"https://www.usa.gov/state-governments",
  "state capital":"https://www.usa.gov/state-governments",
  "speaker":"https://www.uscis.gov/citizenship/testupdates",
  "president":"https://www.uscis.gov/citizenship/testupdates",
  "vice president":"https://www.uscis.gov/citizenship/testupdates",
  "chief justice":"https://www.uscis.gov/citizenship/testupdates",
  "justices":"https://www.uscis.gov/citizenship/testupdates"
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
let intMistakes = new Set(JSON.parse(localStorage.getItem("oath_int_mistakes") || "[]"));
const saveIntMistakes = () => localStorage.setItem("oath_int_mistakes", JSON.stringify([...intMistakes].slice(0,40)));
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
  const chipStar = `<button class="chip${studyStar?" on":""}" data-s="1">${esc(t.star65)}</button>`;
  const chips = chipAll + cats().map(c=>`<button class="chip${studyCat===c?" on":""}" data-c="${esc(c)}">${esc(c)}</button>`).join("") + chipStar;
  const knownN = Q().filter(q=>known.has(qkey(q.n))).length;
  el.innerHTML = filingCard() + countdownCard() + streakCard() + `<div class="card"><h2>🎭 ${esc(t.mockH)}</h2>
    <p>${esc(t.mockD)}</p>
    <div class="center"><button class="btn gold big" id="mockStart">${esc(t.mockStart)}</button></div></div>
    <div class="card"><h2>${esc(t.studyTitle)}</h2>
    <div class="note">${esc(t.tapReveal)}</div>
    <div class="progress" aria-hidden="true"><div style="width:${(knownN/Q().length*100).toFixed(1)}%"></div></div>
    <div class="note">${esc(t.knownCount(knownN, Q().length))}</div></div>
    <input id="qsearch" class="search" type="search" placeholder="${esc(t.searchPh)}" value="${esc(studyQ)}" aria-label="${esc(t.searchPh)}">
    <div class="chips">${chips}</div><div id="qlist"></div>`;
  renderQList();
  const si = el.querySelector("#qsearch");
  si.addEventListener("input", ()=>{ studyQ = si.value; renderQList(); });
  el.querySelector("#mockStart").onclick = startMock;
  wireCountdown();
}

/* ---------- daily streak ---------- */
function dayStr(d){ return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function getStreak(){ try{ return JSON.parse(localStorage.getItem("oath_streak")||'{"count":0}').count||0; }catch(e){ return 0; } }
function bumpStreak(){
  let st; try{ st = JSON.parse(localStorage.getItem("oath_streak")||'{"count":0,"last":""}'); }catch(e){ st = {count:0,last:""}; }
  const t = dayStr(new Date());
  if(st.last!==t){
    const y = new Date(); y.setDate(y.getDate()-1);
    st.count = (st.last===dayStr(y)) ? st.count+1 : 1;
    st.last = t;
    localStorage.setItem("oath_streak", JSON.stringify(st));
  }
  return st.count;
}
function streakCard(){
  const t = T(), n = getStreak();
  if(!n) return `<div class="card streakcard"><div class="streakline">🔥</div><p class="note" style="margin:0">${esc(t.streakD)}</p></div>`;
  return `<div class="card streakcard"><div class="streakline">${esc(t.streakMsg(n))}</div><p class="note" style="margin:0">${esc(t.streakD)}</p></div>`;
}

/* ---------- interview countdown ---------- */
function getIDate(){ return localStorage.getItem("oath_idate") || ""; }
function daysLeft(){
  const v = getIDate(); if(!v) return null;
  const p = v.split("-"); if(p.length!==3) return null;
  const d = new Date(+p[0], +p[1]-1, +p[2]);
  const now = new Date(); now.setHours(0,0,0,0);
  return Math.round((d - now) / 86400000);
}
function countdownCard(){
  const t = T(), v = getIDate(), n = daysLeft();
  let body;
  if(v === "" || n === null){
    body = `<p>${esc(t.cdD)}</p><div class="cdrow"><input type="date" id="cdDate" class="cdinput"><button class="btn coral" id="cdSet">${esc(t.cdSet)}</button></div>`;
  } else if(n < 0){
    body = `<p>${esc(t.cdPast)}</p><button class="btn ghost" id="cdClear">${esc(t.cdClear)}</button>`;
  } else if(n === 0){
    body = `<div class="cdnum">${esc(t.cdToday)}</div><button class="btn ghost" id="cdClear">${esc(t.cdClear)}</button>`;
  } else {
    body = `<div class="cdnum">${esc(t.cdDays(n))}</div><p>${esc(t.cdPace(n))}</p>
      <div class="cdrow"><input type="date" id="cdDate" class="cdinput" value="${esc(v)}"><button class="btn ghost" id="cdSet">${esc(t.cdChange)}</button><button class="btn ghost" id="cdClear">${esc(t.cdClear)}</button></div>`;
  }
  return `<div class="card"><h2>📅 ${esc(t.cdH)}</h2>${body}</div>`;
}
function wireCountdown(){
  const setBtn = document.getElementById("cdSet"), clrBtn = document.getElementById("cdClear");
  if(setBtn) setBtn.onclick = ()=>{
    const v = document.getElementById("cdDate").value;
    if(/^\d{4}-\d{2}-\d{2}$/.test(v)){ localStorage.setItem("oath_idate", v); renderStudy(); }
  };
  if(clrBtn) clrBtn.onclick = ()=>{ localStorage.removeItem("oath_idate"); renderStudy(); };
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
function catLabel(enCat){
  const q = Q().find(x=>x.cat===enCat);
  return q ? (lang==="es" ? q.cat_es : q.cat) : enCat;
}
function weakestCats(){
  const bank = filed==="before"?"08":"25";
  const agg = {};
  history.filter(h=>h.bank===bank && h.cats).forEach(h=>{
    Object.entries(h.cats).forEach(([c,v])=>{
      agg[c] = agg[c] || {r:0,w:0}; agg[c].r += v.r||0; agg[c].w += v.w||0;
    });
  });
  return Object.entries(agg)
    .map(([c,v])=>({c, n:v.r+v.w, acc:v.r/(v.r+v.w)}))
    .filter(r=>r.n>=3).sort((a,b)=>a.acc-b.acc).slice(0,5);
}
function focusHTML(){
  const t = T(), rows = weakestCats();
  if(!rows.length) return `<p class="note">${esc(t.focusEmpty)}</p>`;
  return `<p class="note">${esc(t.focusD)}</p><ul class="focuslist">` + rows.map(r=>{
    const pct = Math.round(r.acc*100);
    return `<li><div class="frow"><span>${esc(catLabel(r.c))}</span><span class="note">${pct}% · ${esc(t.focusTries(r.n))}</span></div>
      <div class="fbar" aria-hidden="true"><div style="width:${pct}%"></div></div></li>`;
  }).join("") + `</ul>
  <div class="center" style="margin-top:12px"><button class="btn coral" id="weakBtn">${esc(t.weakBtn)}</button></div>`;
}
function historyHTML(){
  const t = T();
  if(!history.length) return `<p class="note">${esc(t.historyEmpty)}</p>`;
  return `<ul class="histlist">` + history.slice(-5).reverse().map(h=>{
    const dot = h.pass ? "🟢" : "🔴";
    const mode = h.mode==="senior" ? "★" : h.mode==="review" ? "🔁" : h.mode==="weak" ? "🎯" : "▶";
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
        <button class="btn big ghost" data-p="senior">★ ${esc(t.testSenior)}<br><span style="font-weight:400;font-size:13px">${esc(t.testSeniorDesc)}</span></button>
      </div>
      ${mcount?`<button class="btn big gold" data-p="review" style="margin-top:10px">${esc(typeof t.reviewBtn==="function"?t.reviewBtn(mcount):t.reviewBtn)}</button>
      <p class="note">${esc(t.reviewIntro)}</p>`:""}
    </div>
    <div class="card"><h2>${esc(t.focusH)}</h2>${focusHTML()}</div>
    <div class="card"><h2>${esc(t.historyH)}</h2>${historyHTML()}</div>`;
  const wb = el.querySelector("#weakBtn"); if(wb) wb.onclick = startWeakPractice;
    return;
  }
  if(pz.done){ renderPracticeDone(el); return; }
  const q = pz.order[pz.idx], t2 = T();
  el.innerHTML = `<div class="card">${pz.mock?mockBanner(3):""}
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
function startPractice(mode, isMock){
  const review = mode==="review", senior = mode==="senior", before = filed==="before";
  let pool;
  if(review) pool = Q().filter(q=>mistakes.has(qkey(q.n)));
  else pool = senior ? Q().filter(q=>q.star) : [...Q()];
  for(let i=pool.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
  const total = review ? Math.min(pool.length,20) : (senior?10:(before?10:20));
  const need = review ? Math.ceil(total*0.7) : (senior?6:(before?6:12));
  const maxWrong = review ? total+1 : (senior?5:(before?5:9));
  pz = {order:pool.slice(0,total), idx:0, right:0, wrong:0, need, maxWrong, missed:[], catRes:{}, done:false, senior, review, recorded:false, mock:!!isMock};
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
  let pool = Q().filter(q=>weak.includes(q.cat));
  for(let i=pool.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
  const total = Math.min(pool.length, before?10:20);
  if(total<3) return;
  const need = Math.min(before?6:12, Math.ceil(total*0.6));
  pz = {order:pool.slice(0,total), idx:0, right:0, wrong:0, need, maxWrong:total+1, missed:[], catRes:{}, done:false, senior:false, review:false, weak:true, recorded:false, mock:false};
  renderPractice();
}
function practiceAnswer(ok){
  const q = pz.order[pz.idx];
  const cr = (pz.catRes[q.cat] = pz.catRes[q.cat] || {r:0,w:0});
  if(ok){ pz.right++; cr.r++; if(pz.review){ mistakes.delete(qkey(q.n)); saveMistakes(); } }
  else { pz.wrong++; cr.w++; pz.missed.push(q); }
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
    bumpStreak();
    history.push({d:new Date().toISOString().slice(0,10),
      mode: pz.review?"review":(pz.senior?"senior":(pz.weak?"weak":"std")),
      right:pz.right, total:pz.idx, pass, bank: filed==="before"?"08":"25", cats:pz.catRes});
    saveHistory();
    pz.missed.forEach(q=>mistakes.add(qkey(q.n))); saveMistakes();
  }
  if(pz.mock){ mock.civics = {right:pz.right, total:pz.idx, pass}; startMockN400(); return; }
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
  el.querySelector("#retry").onclick = ()=>{ pz.weak?startWeakPractice():startPractice(pz.review?"review":(pz.senior?"senior":"std")); };
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
  </div>
  <div class="card"><h2>🎧 ${esc(t.dictH)}</h2><p>${t.dictD}</p>
    <div class="center"><button class="btn coral" id="dictStart">${esc(t.dictStart)}</button></div>
    ${dzMistakes.size?`<div class="center" style="margin-top:10px"><button class="btn gold" id="dzReview">${esc(t.reviewBtn(dzMistakes.size))}</button></div>`:""}
  </div>
  <div class="card"><h2>📢 ${esc(t.readH)}</h2><p>${t.readD}</p>
    <div class="center"><button class="btn coral" id="readStart">${esc(t.readStart)}</button></div>
  </div>`;
  el.querySelector("#dictStart").onclick = startDictation;
  el.querySelector("#readStart").onclick = startReadPractice;
  const dzr = el.querySelector("#dzReview"); if(dzr) dzr.onclick = startDzReview;
}
/* ---------- reading practice ---------- */
let rp = null;
function startReadPractice(){
  rp = { order:[...READ_SENTENCES].sort(()=>Math.random()-.5).slice(0,3), idx:0, ok:0 };
  renderReadQ();
}
function renderReadQ(){
  const t = T(), el = document.getElementById("v-english"), s = rp.order[rp.idx];
  el.innerHTML = `<div class="card">${rp.mock?mockBanner(1):""}<div class="note">${esc(t.readQ(rp.idx+1, 3))}</div>
    <div class="bigq">“${esc(s)}”</div>
    <div class="center"><button class="iconbtn" id="rpHear">${esc(t.readAloud)}</button></div>
    <p class="note">${esc(t.readHonest)}</p>
    <div class="ynrow"><button class="btn big ghost" id="rpOk">${esc(t.readOk)}</button>
    <button class="btn big ghost" id="rpNo">${esc(t.readNo)}</button></div></div>`;
  el.querySelector("#rpHear").onclick = ()=>speak(s, 0, true);
  el.querySelector("#rpOk").onclick = ()=>{ rp.ok++; rpNext(); };
  el.querySelector("#rpNo").onclick = rpNext;
}
function rpNext(){ rp.idx++; rp.idx>=3?renderReadDone():renderReadQ(); }
function renderReadDone(){ bumpStreak();
  if(rp.mock){ mock.read = rp.ok; startMockDict(); return; }
  const t = T(), el = document.getElementById("v-english"), pass = rp.ok>=1;
  el.innerHTML = `<div class="card starscreen"><div class="big">${pass?"🎉":"💪"}</div>
    <h2>${esc(t.readDone)}</h2><p style="color:var(--muted)">${esc(t.readScore(rp.ok))}</p>
    <p class="${pass?"fb-ok":"fb-bad"}">${esc(pass?t.passMsg:t.failMsg)}</p>
    <button class="btn coral" id="rpAgain">${esc(t.intAgain)}</button>
    <div><button class="btn ghost" id="rpBack">← ${esc(t.writingTitle)}</button></div></div>`;
  el.querySelector("#rpAgain").onclick = startReadPractice;
  el.querySelector("#rpBack").onclick = ()=>{ rp=null; renderEnglish(); };
}
/* ---------- mock interview ---------- */
let mock = null;
const mockBanner = n => `<div class="mockbanner">${esc(T().mockPhase(n))}</div>`;
function startMock(){
  mock = {};
  show("english");
  rp = { order:[...READ_SENTENCES].sort(()=>Math.random()-.5).slice(0,3), idx:0, ok:0, mock:true };
  renderReadQ();
}
function startMockDict(){
  dz = { order:[...DICT_SENTENCES].sort(()=>Math.random()-.5).slice(0,3), idx:0, ok:0, mock:true };
  renderDictQ();
}
function startMockCivics(){ show("practice"); startPractice("std", true); }
function startMockN400(){
  show("interview");
  ipz = { order:[...N400.questions].sort(()=>Math.random()-.5).slice(0,8), idx:0, ok:0, mock:true };
  renderInterviewQ();
}
function renderMockSummary(){
  const t = T(), el = document.getElementById("v-interview");
  const rows = [
    [t.mockRead, mock.read, 3, mock.read>=1],
    [t.mockDict, mock.dict, 3, mock.dict>=1],
    [t.mockCiv, mock.civics.right, mock.civics.total, mock.civics.pass],
  ];
  const allPass = rows.every(r=>r[3]);
  el.innerHTML = `<div class="card starscreen"><div class="big">${allPass?"🎉":"💪"}</div>
    <h2>${esc(t.mockSumH)}</h2>
    <div class="mockrows">${rows.map(r=>`<div class="mockrow ${r[3]?"ok":"bad"}"><span>${r[3]?"✓":"✗"}</span><span>${esc(r[0])}</span><b>${r[1]}/${r[2]}</b></div>`).join("")}
    <div class="mockrow"><span>📝</span><span>${esc(t.mockN400)}</span><b>${mock.n400}/8</b></div></div>
    <p class="${allPass?"fb-ok":"fb-bad"}">${esc(allPass?t.mockPassAll:t.mockFailSome)}</p>
    <button class="btn coral" id="mockAgain">${esc(t.mockStart)}</button>
    <div><button class="btn ghost" id="mockBack">← ${esc(t.all)}</button></div></div>`;
  el.querySelector("#mockAgain").onclick = startMock;
  el.querySelector("#mockBack").onclick = ()=>{ mock=null; renderInterview(); };
  window.scrollTo({top:0});
}
/* ---------- dictation ---------- */
let dz = null;
let dzMistakes = new Set(JSON.parse(localStorage.getItem("oath_dz_mistakes") || "[]"));
const saveDzMistakes = () => localStorage.setItem("oath_dz_mistakes", JSON.stringify([...dzMistakes].slice(0,30)));
function normWords(s){ return s.toLowerCase().replace(/[.,!?;:'"]/g,"").split(/\s+/).filter(Boolean); }
function startDictation(){
  dz = { order:[...DICT_SENTENCES].sort(()=>Math.random()-.5).slice(0,3), idx:0, ok:0, review:false };
  renderDictQ();
}
function startDzReview(){
  const ss = DICT_SENTENCES.filter(s=>dzMistakes.has(s));
  if(!ss.length){ renderEnglish(); return; }
  dz = { order:[...ss].sort(()=>Math.random()-.5), idx:0, ok:0, review:true };
  renderDictQ();
}
function renderDictQ(){
  const t = T(), el = document.getElementById("v-english"), s = dz.order[dz.idx];
  const n = dz.order.length;
  el.innerHTML = `<div class="card">${dz.mock?mockBanner(2):""}<div class="note">${esc(t.dictQ(dz.idx+1, n))}</div>
    <div class="center"><button class="iconbtn bigbtn" id="dzPlay">${esc(t.dictPlay)}</button></div>
    <textarea id="dzIn" class="dictin" rows="2" placeholder="${esc(t.dictPh)}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></textarea>
    <div class="center"><button class="btn coral" id="dzCheck">${esc(t.dictCheck)}</button></div></div>`;
  el.querySelector("#dzPlay").onclick = ()=>speak(s, 0.7, true);
  el.querySelector("#dzCheck").onclick = checkDictation;
}
function checkDictation(){
  const t = T(), el = document.getElementById("v-english"), s = dz.order[dz.idx];
  const rawIn = el.querySelector("#dzIn").value;
  const tw = normWords(s), iw = normWords(rawIn);
  const right = tw.length===iw.length && tw.every((w,i)=>w===iw[i]);
  if(right) dz.ok++;
  if(!right){ dzMistakes.add(s); saveDzMistakes(); }
  if(dz.review && right){ dzMistakes.delete(s); saveDzMistakes(); }
  const words = tw.map((w,i)=>`<span class="dw${iw[i]===w?" ok":" bad"}">${esc(w)}</span>`).join(" ");
  el.innerHTML = `<div class="card"><div class="note">${esc(t.dictQ(dz.idx+1, dz.order.length))}</div>
    <div class="${right?"fb-ok":"fb-bad"}">${right?"✓":"✗"} ${esc(right?t.dictCorrect:t.dictWrong)}</div>
    <div class="alabel">${esc(t.dictRight)}</div><p class="dwords">${words}</p>
    ${rawIn.trim()?`<div class="alabel">${esc(t.dictYour)}</div><p class="note">“${esc(rawIn.trim())}”</p>`:""}
    <div class="center"><button class="btn coral" id="dzNext">${esc(t.dictNext)}</button></div></div>`;
  el.querySelector("#dzNext").onclick = ()=>{ dz.idx++; dz.idx>=dz.order.length?renderDictDone():renderDictQ(); };
}
function renderDictDone(){ bumpStreak();
  if(dz.mock){ mock.dict = dz.ok; startMockCivics(); return; }
  const t = T(), el = document.getElementById("v-english");
  const pass = dz.review ? dzMistakes.size===0 : dz.ok>=1;
  const reviewMsg = dz.review ? (dzMistakes.size===0 ? t.clearedAll : t.stillLeft(dzMistakes.size)) : null;
  el.innerHTML = `<div class="card starscreen"><div class="big">${pass?"🎉":"💪"}</div>
    <h2>${esc(t.dictDone)}</h2><p style="color:var(--muted)">${esc(t.dictScore(dz.ok, dz.order.length))}</p>
    ${reviewMsg?`<p class="${dzMistakes.size===0?"fb-ok":"fb-bad"}">${esc(reviewMsg)}</p>`
      :`<p class="${pass?"fb-ok":"fb-bad"}">${esc(pass?t.passMsg:t.failMsg)}</p>`}
    ${dz.review&&dzMistakes.size?`<button class="btn coral" id="dzAgain2">${esc(t.reviewBtn(dzMistakes.size))}</button>`:`<button class="btn coral" id="dzAgain">${esc(t.intAgain)}</button>`}
    <div><button class="btn ghost" id="dzBack">← ${esc(t.writingTitle)}</button></div></div>`;
  const dza = el.querySelector("#dzAgain"); if(dza) dza.onclick = startDictation;
  const dza2 = el.querySelector("#dzAgain2"); if(dza2) dza2.onclick = startDzReview;
  el.querySelector("#dzBack").onclick = ()=>{ dz=null; renderEnglish(); };
}

/* ---------- interview ---------- */
let intFilter = "all", ipz = null;
function expTag(q){
  const t = T();
  if(q.expected==="no") return `<span class="tag exp-no">${esc(t.expNo)}</span>`;
  if(q.expected==="yes") return `<span class="tag exp-yes">${esc(t.expYes)}</span>`;
  return `<span class="tag exp-varies">⚠ ${esc(t.expVaries)}</span>`;
}
function nqCardHTML(q){
  const t = T();
  return `<div class="qcard nqcard" data-item="${esc(q.item)}">
    <div class="qhead" data-act="toggle">
      <div class="qnum">${esc(q.item)}</div>
      <div style="flex:1"><div class="qtext">${esc(q[lang])}</div>
      <div class="qmeta">${expTag(q)}</div></div>
    </div>
    <div class="qactions">
      <button class="iconbtn" data-act="speak" aria-label="${esc(t.listen)}">🔊 ${esc(t.listen)}</button>
    </div>
    <div class="qbody">
      <div class="alabel">${lang==="es"?"English":"Español"}</div>
      <p>${esc(lang==="es"?q.en:q.es)}</p>
      <div class="alabel">${esc(t.intMeaning)}</div>
      <p>${esc(q[lang==="es"?"meaning_es":"meaning_en"])}</p>
      ${q.expected==="varies"?`<div class="warnbox">${esc(t.expVariesNote)}</div>`:""}
    </div>
  </div>`;
}
function renderInterview(){
  const t = T(), el = document.getElementById("v-interview");
  const chips = [["all",t.all],["no",t.fNo],["yes",t.fYes],["varies",t.fDep]].map(([v,lb])=>
    `<button class="chip${intFilter===v?" on":""}" data-if="${v}">${esc(lb)}</button>`).join("");
  const list = N400.questions.filter(q=>intFilter==="all"||q.expected===intFilter);
  el.innerHTML = `<div class="card"><h2>🎤 ${esc(t.intTitle)}</h2>
    <p>${t.intIntro}</p><p class="note">${esc(t.intSource)}</p></div>
    <div class="card"><h2>${esc(t.intPracticeH)}</h2><p class="note">${esc(t.intPracticeD)}</p>
    <div class="center"><button class="btn coral" id="intStart">${esc(t.intStart)}</button></div></div>
    ${intMistakes.size?`<div class="card"><div class="center"><button class="btn gold big" id="intReview">${esc(t.reviewBtn(intMistakes.size))}</button></div></div>`:""}
    <div class="chips">${chips}</div><div id="nqlist">${list.map(nqCardHTML).join("")}</div>`;
  el.querySelector("#intStart").onclick = startInterviewPractice;
  const ir = el.querySelector("#intReview"); if(ir) ir.onclick = startInterviewReview;
}
function startInterviewPractice(){
  ipz = { order:[...N400.questions].sort(()=>Math.random()-.5).slice(0,10), idx:0, ok:0, review:false };
  renderInterviewQ();
}
function startInterviewReview(){
  const qs = N400.questions.filter(q=>intMistakes.has(q.item));
  if(!qs.length){ renderInterview(); return; }
  ipz = { order:[...qs].sort(()=>Math.random()-.5), idx:0, ok:0, review:true };
  renderInterviewQ();
}
function renderInterviewQ(){
  const t = T(), el = document.getElementById("v-interview"), q = ipz.order[ipz.idx];
  el.innerHTML = `<div class="card">${ipz.mock?mockBanner(4):""}<div class="note">${esc(t.intQ(ipz.idx+1, ipz.order.length))}</div>
    <div class="bigq">“${esc(q.en)}”</div>
    <div class="center"><button class="iconbtn" id="intSpeak">🔊 ${esc(t.listen)}</button></div>
    <div class="ynrow"><button class="btn big ghost" data-yn="y">${esc(t.intYes)}</button>
    <button class="btn big ghost" data-yn="n">${esc(t.intNo)}</button></div></div>`;
  el.querySelector("#intSpeak").onclick = ()=>speak(q.en, 0, true);
}
function interviewAnswer(yes){
  const t = T(), el = document.getElementById("v-interview"), q = ipz.order[ipz.idx];
  const varies = q.expected==="varies";
  const right = varies || (yes === (q.expected==="yes"));
  if(right) ipz.ok++;
  if(!right && !varies){ intMistakes.add(q.item); saveIntMistakes(); }
  if(ipz.review && right){ intMistakes.delete(q.item); saveIntMistakes(); }
  el.innerHTML = `<div class="card"><div class="note">${esc(t.intQ(ipz.idx+1, ipz.order.length))}</div>
    <div class="bigq">“${esc(q.en)}”</div>
    <div class="${right?"fb-ok":"fb-bad"}">${right?"✓":"✗"} ${esc(right?t.intCorrect:t.intWrong)}</div>
    ${varies?`<div class="warnbox">${esc(t.intVariesFb)}</div>`
      :`<p><b>${esc(t.intMeaning)}:</b> ${esc(q[lang==="es"?"meaning_es":"meaning_en"])}</p>
        <p class="note">${esc(lang==="es"?q.en:q.es)}</p>`}
    <div class="center"><button class="btn coral" id="intNext">${esc(t.intNext)}</button></div></div>`;
  el.querySelector("#intNext").onclick = ()=>{ ipz.idx++; ipz.idx>=ipz.order.length?renderInterviewDone():renderInterviewQ(); };
}
function renderInterviewDone(){
  if(ipz.mock){ mock.n400 = ipz.ok; renderMockSummary(); return; }
  const t = T(), el = document.getElementById("v-interview");
  const reviewMsg = ipz.review ? (intMistakes.size===0 ? t.clearedAll : t.stillLeft(intMistakes.size)) : null;
  el.innerHTML = `<div class="card starscreen"><div class="big">${ipz.ok>=8||ipz.review?"🎉":"💪"}</div>
    <h2>${esc(t.intDone)}</h2><p style="color:var(--muted)">${esc(t.intScore(ipz.ok))}</p>
    ${reviewMsg?`<p class="${intMistakes.size===0?"fb-ok":"fb-bad"}">${esc(reviewMsg)}</p>`:""}
    ${ipz.review&&intMistakes.size?`<button class="btn coral" id="intAgain2">${esc(t.reviewBtn(intMistakes.size))}</button>`:`<button class="btn coral" id="intAgain">${esc(t.intAgain)}</button>`}
    <div><button class="btn ghost" id="intBack">← ${esc(t.all)}</button></div></div>`;
  const ag = el.querySelector("#intAgain"); if(ag) ag.onclick = startInterviewPractice;
  const ag2 = el.querySelector("#intAgain2"); if(ag2) ag2.onclick = startInterviewReview;
  el.querySelector("#intBack").onclick = ()=>{ ipz=null; renderInterview(); };
}

/* ---------- process ---------- */
function renderProcess(){
  const t = T(), el = document.getElementById("v-process"), pack = getPack();
  el.innerHTML = `<div class="card"><h2>${esc(t.procTitle)}</h2>
    <h3>${esc(t.eligH)}</h3><ul>${t.elig.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
  <div class="card"><h2>${esc(t.stepsH)}</h2><ol class="steps">${t.steps.map(s=>`<li><b>${esc(s[0])}</b>${esc(s[1])}</li>`).join("")}</ol></div>
  <div class="card"><h2>${esc(t.feesH)}</h2>
    <table class="fees">${t.feeRows.map(r=>`<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td></tr>`).join("")}</table>
    <p class="note">⚠ ${esc(t.feesNote)}</p></div>
  <div class="card"><h2>${esc(t.excH)}</h2><div class="exgrid">${t.excs.map(e=>`<div class="excard"><b>${esc(e[0])}</b><p>${esc(e[1])}</p></div>`).join("")}</div></div>
  <div class="card"><h2>\u{1F9F3} ${esc(t.packH)}</h2><p class="note">${esc(t.packIntro)}</p>
    <div class="packlist">${t.packItems.map((x,i)=>`<label class="packrow${pack.includes(i)?" done":""}"><input type="checkbox" class="packchk" data-i="${i}"${pack.includes(i)?" checked":""}><span>${esc(x)}</span></label>`).join("")}</div>
    <button class="btn ghost" id="packReset">${esc(t.packReset)}</button></div>
  <div class="card"><h2>\u{1F4C5} ${esc(t.dayH)}</h2><ul>${t.dayTips.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`;
  el.querySelectorAll(".packchk").forEach(c=>c.onchange=()=>{
    const i=+c.dataset.i, p=getPack();
    if(c.checked && !p.includes(i)) p.push(i);
    if(!c.checked) p.splice(p.indexOf(i),1);
    localStorage.setItem("oath_pack",JSON.stringify(p));
    c.closest(".packrow").classList.toggle("done",c.checked);
  });
  document.getElementById("packReset").onclick=()=>{ localStorage.removeItem("oath_pack"); renderProcess(); };
}

/* ---------- interview-day packing list ---------- */
function getPack(){ try{ return JSON.parse(localStorage.getItem("oath_pack")||"[]"); }catch(e){ return []; } }

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
  ({study:renderStudy,practice:renderPractice,interview:renderInterview,english:renderEnglish,process:renderProcess,resources:renderResources})[v]();
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
  const w = e.target.closest("[data-w]"); if(w){ speak(w.dataset.w, 0, true); return; }
  const ncard = e.target.closest(".nqcard");
  if(ncard){
    const actBtn = e.target.closest("[data-act]");
    if(actBtn){
      const q = N400.questions.find(x=>x.item===ncard.dataset.item);
      const act = actBtn.dataset.act;
      if(act==="toggle"){ ncard.classList.toggle("open"); }
      else if(act==="speak"){ e.stopPropagation(); speak(q.en, 0, true); }
      return;
    }
  }
  const iff = e.target.closest("[data-if]"); if(iff){ intFilter=iff.dataset.if; renderInterview(); return; }
  const yn = e.target.closest("[data-yn]"); if(yn && ipz){ interviewAnswer(yn.dataset.yn==="y"); return; }
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

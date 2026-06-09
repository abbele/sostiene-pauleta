'use strict';

const FRASI = [
  "Ho fame",
  "Ho mangiato troppo!",
  "Mare meva",
  "Mi fanno male le gambe",
  "Prendo un tarallo",
  "Sto malee",
  "Applausi di supporto!",
  "mhhhh",
  "Voglio andare in piscina",
  "Devo camminare",
  "Questa è una visione coloniale delle cose"
];

// ── REPERTORIO DEL CRONISTA SARCASTICO ───────────────
// Template con segnaposto: {oggi} {settimana} {totale} {ora}
// Battute specifiche per ogni frase (indice = posizione in FRASI)
const BATTUTE_FRASE = {
  0: [ // Ho fame
    "{oggi}ª volta che hai fame oggi. {settimana} in settimana. Non hai fame, hai un abbonamento.",
    "Ho fame x{settimana} in 7 giorni. Esiste anche il frigorifero, sai, non solo questo bottone.",
    "Di nuovo fame? Lo stomaco ti ha già mandato {oggi} solleciti oggi. Rispondi, almeno.",
    "Fame numero {oggi}. Il tuo stomaco e questo bottone hanno una relazione più seria della maggior parte delle coppie.",
    "{settimana} 'ho fame' in settimana. Heidi sulle Alpi mangiava meno e aveva pure le mucche da mungere.",
    "Hai fame di nuovo. Notizia dell'ultim'ora che però va in onda {oggi} volte al giorno.",
  ],
  1: [ // Ho mangiato troppo!
    "Prima 'ho fame', poi 'ho mangiato troppo'. Un ciclo biologico davvero affascinante.",
    "Ho mangiato troppo per la {oggi}ª volta oggi. La sorpresa, ogni volta, è intatta.",
    "{settimana} volte 'ho mangiato troppo' in una settimana. A questo punto è una strategia, non un incidente.",
    "Hai mangiato troppo. Chi l'avrebbe mai detto, a parte chiunque ti conosca da {totale} click.",
    "'Ho mangiato troppo' detto con lo stesso stupore di chi scopre l'acqua calda, per la {oggi}ª volta.",
    "{settimana} pentimenti post-pranzo in settimana. Il rimorso arriva sempre, l'autocontrollo mai.",
  ],
  2: [ // Mare meva
    "'Mare meva' numero {oggi}. Tua madre, ovunque sia, ha appena starnutito.",
    "Catalano d'emergenza attivato. {settimana} 'mare meva' in 7 giorni: il dramma è sempre in stock.",
    "'Mare meva' la {oggi}ª volta oggi. La Catalogna intera ha sentito e ha alzato gli occhi al cielo.",
    "{settimana} 'mare meva' in settimana. Gaudí ci avrebbe costruito una basilica, sopra.",
  ],
  3: [ // Mi fanno male le gambe
    "Le gambe fanno male per la {oggi}ª volta oggi. Strano, da ferme di solito reggono meglio.",
    "{settimana} lamentele sulle gambe in settimana. Le gambe vorrebbero lamentarsi di te.",
    "Ti fanno male le gambe, ma il pollice per cliccare qui funziona a meraviglia.",
    "Gambe doloranti, annuncio numero {oggi}. Curioso: i {totale} click li hai fatti senza problemi.",
    "{settimana} volte 'mi fanno male le gambe'. Le gambe chiedono un avvocato e una vacanza.",
    "Dolore alle gambe di nuovo. Forse perché ti portano dove non vuoi: lontano dal divano.",
  ],
  4: [ // Prendo un tarallo
    "Tarallo numero {oggi}. 'Uno' è evidentemente un concetto molto flessibile.",
    "{settimana} taralli annunciati in settimana. Il sacchetto ha più paura di te che tu di lui.",
    "'Prendo UN tarallo' per la {oggi}ª volta. Il singolare, in questa casa, è puramente decorativo.",
    "{settimana} taralli in 7 giorni. La Puglia ti ha già nominata cittadina onoraria.",
  ],
  5: [ // Sto per morire
    "{oggi}º annuncio di morte oggi. A questo punto è più un hobby che un'emergenza.",
    "Sto per morire x{settimana} questa settimana, e sei ancora qui a cliccare. Resistenza notevole.",
    "Pauleta, sei morta {totale} volte in totale. Persino un gatto ti invidia.",
    "'Sto per morire' numero {oggi}. La Morte ha smesso di rispondere alle tue chiamate, lo sai.",
    "{settimana} agonie in settimana. Se fosse una serie TV l'avrebbero già cancellata per ripetitività.",
    "Stai per morire di nuovo. Aggiorno il necrologio o aspetto il prossimo dei {oggi} di oggi?",
  ],
  6: [ // Forzaaa
    "FORZAAA per la {oggi}ª volta. L'entusiasmo c'è, i risultati… li vediamo.",
    "{settimana} 'forza' in settimana. Se l'energia fosse trasferibile saresti milionaria.",
    "FORZAAA numero {oggi}. Tanto fervore concentrato esclusivamente su questo bottone, peccato.",
    "{settimana} grida di battaglia in settimana, zero battaglie combattute. Coerenza ammirevole.",
  ],
  7: [ // mhhhh
    "Un 'mhhhh' molto eloquente. Il {oggi}º di oggi. Shakespeare trema.",
    "{settimana} 'mhhhh' in 7 giorni. Un intero monologo interiore, senza una sola parola.",
    "'Mhhhh' numero {oggi}. La profondità del pensiero è, come sempre, abissale.",
    "{settimana} 'mhhhh' in settimana. La Treccani ti ha bloccata su tutti i social.",
  ],
  8: [ // Voglio andare in piscina
    "Vuoi andare in piscina per la {oggi}ª volta. La piscina, intanto, è sempre nello stesso posto.",
    "{settimana} 'voglio andare in piscina' in settimana. Volere e andare restano due verbi diversi.",
    "Piscina, desiderio numero {oggi}. L'acqua ti aspetta da {totale} click. Inizia ad annoiarsi.",
    "{settimana} volte 'voglio andare in piscina'. Il costume, intatto nell'armadio, ringrazia.",
  ],
  9: [ // Devo camminare
    "'Devo camminare', detto comodamente da seduta, {oggi}ª volta oggi.",
    "{settimana} propositi di camminata in settimana. Passi fatti: tutti verso questo bottone.",
    "Devo camminare numero {oggi}. Il 'devo' c'è, manca solo il piccolo dettaglio del camminare.",
    "{settimana} 'devo camminare' in 7 giorni. Le scarpe da ginnastica hanno presentato le dimissioni.",
  ],
  10: [ // Questa è una visione coloniale delle cose
    "Ah, ci risiamo con l'analisi geopolitica. Il {oggi}º colonialismo smascherato di giornata.",
    "{settimana} visioni coloniali denunciate in settimana. Frantz Fanon ti manda i complimenti.",
    "Visione coloniale numero {totale}. La rivoluzione partirà sicuramente da questo bottone.",
    "Smascherato l'ennesimo colonialismo, il {oggi}º di oggi. Edward Said prende appunti, commosso.",
    "{settimana} denunce anti-coloniali in settimana. Il sistema, intanto, trema esattamente di zero.",
    "Analisi post-coloniale numero {oggi}. Profonda, urgente, e fatta rigorosamente dal divano.",
  ],
};

// Battute generiche, attivate da soglie sui dati
const BATTUTE_OGGI_ALTO = [ // oggi >= 4
  "{oggi} volte la stessa frase oggi. La fantasia è in ferie?",
  "Numero {oggi} di oggi. Lo sai che esistono anche le altre frasi, vero?",
  "{oggi}ª replica oggi. Il disco è rotto e nessuno lo cambia.",
  "{oggi} volte oggi. A questo punto non è un'abitudine, è un sintomo.",
  "Ancora questa? {oggi} volte in un giorno. Anche un pappagallo, a un certo punto, cambia frase.",
  "{oggi}º bis di giornata. Il pubblico, immaginario, comincia a fischiare.",
];
const BATTUTE_SETTIMANA_ALTO = [ // settimana >= 7
  "{settimana} volte in 7 giorni. Una media di una al giorno: encomiabile costanza nel nulla.",
  "Questa frase ha totalizzato {settimana} click in settimana. Più dei passi che hai fatto, probabilmente.",
  "{settimana} volte in una settimana. Se fosse una buona abitudine saresti un esempio. Ma non lo è.",
  "Record settimanale: {settimana}. Bravissima, davvero, nel senso meno utile del termine.",
];
const BATTUTE_PRIMO = [ // oggi == 1
  "E si riparte. Primo della giornata, ne mancano soltanto… beh, tanti.",
  "Click numero 1 di oggi. La giornata promette bene, cronisticamente parlando.",
  "Apertura ufficiale della giornata. Il cronista sospira e prepara il taccuino.",
  "Primo della giornata. Il bello deve ancora arrivare, purtroppo.",
];
const BATTUTE_NOTTE = [ // ora < 6
  "Le {ora} e già si lamenta. L'insonnia ha trovato la sua voce.",
  "Sono le {ora}. Pure di notte. Il bottone non dorme mai, e a quanto pare neanche tu.",
  "Le {ora} di notte. Persino i lamenti dovrebbero avere un orario di chiusura.",
  "Le {ora}. A quest'ora si dorme, ma evidentemente lamentarsi non conosce fuso orario.",
];
const BATTUTE_TOP = [ // è la frase più cliccata oggi, oggi >= 3
  "Frase campionessa di oggi con {oggi} click. Un trofeo che nessuno voleva.",
  "In testa alla classifica odierna: {oggi} volte. Orgoglio? Più imbarazzo statistico.",
  "Medaglia d'oro di giornata, {oggi} click. Il podio è triste, ma è un podio.",
  "Capolista con {oggi} click. La concorrenza non si è impegnata, e nemmeno tu, a dire il vero.",
];
const BATTUTE_FALLBACK = [ // sempre disponibili
  "Click registrato. Il cronista prende nota, sospirando.",
  "Annotato. La leggenda di Pauleta si arricchisce di un'altra, ehm, gemma.",
  "Segnato. Un altro mattoncino nella cattedrale del lamento.",
  "Preso nota. Gli archivi della pazienza umana ringraziano.",
  "Registrato. La cronaca è fedele, anche quando preferirebbe non esserlo.",
  "Ecco fatto. Un'altra perla per i posteri, che non hanno chiesto nulla.",
];

// Traguardi tondi: totale multiplo di 10
const BATTUTE_MILESTONE = [
  "Click numero {totale} per questa frase. Un traguardo che nessuno festeggerà.",
  "Tondi tondi: {totale} in totale. Inauguriamo il museo del lamento, ala permanente.",
  "{totale} volte in totale. A questo ritmo ti dedicano una targa. Di scuse.",
  "Quota {totale} raggiunta. Lo sforzo c'è, l'utilità un po' meno.",
];

// Cattiveria extra: oggi >= 7 oppure settimana >= 15
const BATTUTE_CATTIVE = [
  "{oggi} volte oggi. Non so se ammirare la costanza o chiamare qualcuno che ti aiuti.",
  "{oggi}ª di oggi. Ho perso il conto della tua dignità, non dei click.",
  "{oggi} oggi, {settimana} in settimana. A un certo punto il problema non è la frase, sei tu.",
  "Con {oggi} click oggi hai trasformato una frase in una diagnosi.",
  "{settimana} volte in settimana. Esistono terapie e gruppi di supporto. Tu hai scelto il bottone.",
  "{oggi} volte. Nemmeno un disco rotto insiste così. E almeno lui suonava qualcosa.",
];

// Monotematica: questa frase domina la giornata
const BATTUTE_MONO = [ // oggi >= 3 e oggi è >= 60% del totale di oggi
  "Su {totOggiTutte} lamentele di oggi, {oggi} sono questa. Repertorio impressionante, vero?",
  "{oggi} click su {totOggiTutte} totali oggi. Un solo argomento, tutto il giorno. Versatilità zero.",
  "Oggi hai cliccato {totOggiTutte} volte e {oggi} erano questa frase. Praticamente un singolo, non un album.",
];

// Confronti ironici tra coppie di frasi (scatta se entrambe hanno click oggi)
// {a} e {b} = conteggi odierni delle due frasi
const CONFRONTI = [
  { a: 0,  b: 1,  t: "Oggi 'Ho fame' ×{a} e 'Ho mangiato troppo' ×{b}. Un dramma in due atti, sempre lo stesso copione." },
  { a: 4,  b: 1,  t: "'Prendo un tarallo' ×{a}, poi 'Ho mangiato troppo' ×{b}. Causa ed effetto raramente così nitidi." },
  { a: 0,  b: 4,  t: "Hai fame ×{a} e prendi taralli ×{b}. Il problema, in teoria, si risolverebbe da sé." },
  { a: 3,  b: 9,  t: "'Mi fanno male le gambe' ×{a} ma anche 'Devo camminare' ×{b}. Coraggiosa, questa contraddizione." },
  { a: 8,  b: 9,  t: "'Voglio andare in piscina' ×{a} e 'Devo camminare' ×{b}. Due propositi sportivi, zero movimenti." },
  { a: 5,  b: 6,  t: "'Sto per morire' ×{a} e 'FORZAAA' ×{b} nello stesso giorno. Schizofrenia motivazionale di alto livello." },
  { a: 5,  b: 0,  t: "'Sto per morire' ×{a} e 'Ho fame' ×{b}. Se davvero morissi non avresti tutto questo appetito." },
  { a: 3,  b: 8,  t: "Gambe a pezzi ×{a}, ma voglia di piscina ×{b}. Stranamente l'acqua non fa male alle gambe." },
  { a: 1,  b: 5,  t: "'Ho mangiato troppo' ×{a} e 'Sto per morire' ×{b}. Il collegamento lo lascio intuire a te." },
  { a: 10, b: 5,  t: "Visione coloniale ×{a} e 'sto per morire' ×{b}. Oggi il dramma è sia geopolitico che personale." },
  { a: 10, b: 4, t: "Denunci il colonialismo ×{a} mentre prendi taralli ×{b}. La rivoluzione, ben nutrita." },
  { a: 6,  b: 5,  t: "'FORZAAA' ×{a} e 'sto per morire' ×{b}. Decidi se sei l'allenatore o il paziente." },
];

// ── Dati ──────────────────────────────────────────────
function getToday() { return new Date().toISOString().slice(0, 10); }

function loadData() {
  try { return JSON.parse(localStorage.getItem('pauleta_data') || '{}'); }
  catch { return {}; }
}

function saveData(data) {
  // Mantieni solo gli ultimi 30 giorni
  const keys = Object.keys(data).sort();
  while (keys.length > 30) delete data[keys.shift()];
  localStorage.setItem('pauleta_data', JSON.stringify(data));
}

function getCountToday(index) {
  const data = loadData();
  const today = getToday();
  return (data[today] && data[today][String(index)]) || 0;
}

function incrementFrase(index) {
  const data = loadData();
  const today = getToday();
  if (!data[today]) data[today] = {};
  data[today][String(index)] = (data[today][String(index)] || 0) + 1;
  saveData(data);
}

function getWinnerToday() {
  const data = loadData();
  const today = getToday();
  if (!data[today]) return null;
  let max = 0, winners = [];
  Object.entries(data[today]).forEach(([idx, count]) => {
    if (count > max) { max = count; winners = [idx]; }
    else if (count === max) winners.push(idx);
  });
  return max === 0 ? null : winners.map(i => ({ index: parseInt(i), count: max }));
}

function getStorico() {
  const data = loadData();
  const today = getToday();
  return Object.entries(data)
    .filter(([day]) => day !== today)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 30)
    .map(([day, counts]) => {
      let max = 0, winIdx = null;
      Object.entries(counts).forEach(([idx, count]) => {
        if (count > max) { max = count; winIdx = parseInt(idx); }
      });
      return { day, winIdx, max };
    });
}

// ── Motore del cronista (sarcasmo data-aware) ─────────
function dayKeyOffset(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function getCountUltimi7(index) {
  const data = loadData();
  let sum = 0;
  for (let n = 0; n < 7; n++) {
    const k = dayKeyOffset(n);
    if (data[k]) sum += data[k][String(index)] || 0;
  }
  return sum;
}

function getCountTotale(index) {
  const data = loadData();
  let sum = 0;
  Object.values(data).forEach(giorno => { sum += giorno[String(index)] || 0; });
  return sum;
}

function buildContesto(index) {
  const oggi = getCountToday(index);
  const settimana = getCountUltimi7(index);
  const totale = getCountTotale(index);
  const ora = new Date().getHours();
  const data = loadData();
  const today = getToday();
  const todayObj = data[today] || {};
  const maxOggi = Math.max(0, ...Object.values(todayObj));
  const isTop = oggi > 0 && oggi === maxOggi;
  const totOggiTutte = Object.values(todayObj).reduce((a, b) => a + b, 0);
  return { index, oggi, settimana, totale, ora, isTop, todayObj, totOggiTutte };
}

function fmtBattuta(tpl, ctx) {
  return tpl
    .replace(/{totOggiTutte}/g, ctx.totOggiTutte)
    .replace(/{oggi}/g, ctx.oggi)
    .replace(/{settimana}/g, ctx.settimana)
    .replace(/{totale}/g, ctx.totale)
    .replace(/{ora}/g, ctx.ora);
}

function confrontiDisponibili(ctx) {
  const cnt = (i) => ctx.todayObj[String(i)] || 0;
  const out = [];
  CONFRONTI.forEach(c => {
    // Solo confronti che coinvolgono la frase appena cliccata…
    if (ctx.index !== c.a && ctx.index !== c.b) return;
    const ca = cnt(c.a), cb = cnt(c.b);
    // …e solo se entrambe sono state cliccate oggi
    if (ca > 0 && cb > 0) out.push(c.t.replace(/{a}/g, ca).replace(/{b}/g, cb));
  });
  return out;
}

function costruisciPool(ctx) {
  const pool = [];
  // Battute specifiche per frase: peso doppio (più pertinenti)
  const specifiche = BATTUTE_FRASE[ctx.index] || [];
  pool.push(...specifiche, ...specifiche);
  // Soglie sui dati: peso extra per le battute che citano numeri "succosi"
  if (ctx.oggi >= 4)       pool.push(...BATTUTE_OGGI_ALTO, ...BATTUTE_OGGI_ALTO);
  if (ctx.settimana >= 7)  pool.push(...BATTUTE_SETTIMANA_ALTO, ...BATTUTE_SETTIMANA_ALTO);
  if (ctx.oggi === 1)      pool.push(...BATTUTE_PRIMO);
  if (ctx.ora < 6)         pool.push(...BATTUTE_NOTTE);
  if (ctx.isTop && ctx.oggi >= 3) pool.push(...BATTUTE_TOP);
  // Nuove categorie
  if (ctx.totale >= 10 && ctx.totale % 10 === 0) pool.push(...BATTUTE_MILESTONE, ...BATTUTE_MILESTONE);
  if (ctx.oggi >= 7 || ctx.settimana >= 15)      pool.push(...BATTUTE_CATTIVE, ...BATTUTE_CATTIVE);
  if (ctx.oggi >= 3 && ctx.oggi >= ctx.totOggiTutte * 0.6) pool.push(...BATTUTE_MONO);
  // Confronti tra frasi: i più gustosi, peso triplo
  const confr = confrontiDisponibili(ctx);
  pool.push(...confr, ...confr, ...confr);
  // Fallback sempre presente (peso minimo)
  pool.push(...BATTUTE_FALLBACK);
  return pool;
}

let ultimoCommento = '';
function generaCommento(index) {
  const ctx = buildContesto(index);
  const pool = costruisciPool(ctx);
  let scelte = pool.filter(t => fmtBattuta(t, ctx) !== ultimoCommento);
  if (scelte.length === 0) scelte = pool;
  const tpl = scelte[Math.floor(Math.random() * scelte.length)];
  const out = fmtBattuta(tpl, ctx);
  ultimoCommento = out;
  return out;
}

// ── Render ────────────────────────────────────────────
function renderVincitore() {
  const box = document.getElementById('vincitore-box');
  const winners = getWinnerToday();

  if (!winners) {
    box.innerHTML = `
      <div class="vincitore-label"><span class="stella">🏆</span> FRASE DEL GIORNO</div>
      <div class="vincitore-placeholder">Ancora nessun click oggi... Pauleta sta caricando! ⚡</div>
    `;
    return;
  }

  const fraseHtml = winners.map(w =>
    `<div class="vincitore-frase">"${FRASI[w.index]}"</div>`
  ).join('');
  const countLabel = winners[0].count === 1 ? '1 volta' : `${winners[0].count} volte`;

  box.innerHTML = `
    <div class="vincitore-label"><span class="stella">🏆</span> FRASE DEL GIORNO</div>
    ${fraseHtml}
    <div class="vincitore-count">Sostenuta ${countLabel} oggi${winners.length > 1 ? ' — parimerito!' : ''}</div>
  `;
}

function renderFrasi() {
  const container = document.getElementById('frasi-list');
  const winners = getWinnerToday();
  const winnerIndices = winners ? winners.map(w => w.index) : [];
  const maxCount = winners ? winners[0].count : 0;

  container.innerHTML = FRASI.map((frase, i) => {
    const count = getCountToday(i);
    const isRecord = count > 0 && count === maxCount && winnerIndices.includes(i);
    return `
      <div class="frase-card" id="card-${i}">
        <div class="frase-testo">"${frase}"</div>
        <div class="frase-destra">
          <div class="badge-count${isRecord ? ' record' : ''}" id="count-${i}">${count}</div>
          <button class="btn-incrementa" id="btn-${i}" aria-label="Incrementa: ${frase}" data-index="${i}">+1</button>
        </div>
      </div>
    `;
  }).join('');

  // Attach listeners
  FRASI.forEach((_, i) => {
    document.getElementById(`btn-${i}`).addEventListener('click', handleClick);
  });
}

function renderStorico() {
  const content = document.getElementById('storico-content');
  const giorni = getStorico();

  if (giorni.length === 0) {
    content.innerHTML = '<div class="storico-vuoto">Nessun giorno precedente registrato ancora.</div>';
    return;
  }

  content.innerHTML = giorni.map(({ day, winIdx, max }) => {
    const frase = winIdx !== null && FRASI[winIdx] ? FRASI[winIdx] : '—';
    const dataFmt = formatData(day);
    const countLabel = max === 1 ? '1 volta' : `${max} volte`;
    return `
      <div class="storico-giorno">
        <div class="storico-data">${dataFmt}</div>
        <div class="storico-info">
          <div class="storico-frase">"${frase}"</div>
          <div class="storico-count-label">Sostenuta ${countLabel}</div>
        </div>
      </div>
    `;
  }).join('');
}

function formatData(iso) {
  const [y, m, d] = iso.split('-');
  const mesi = ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
  return `${parseInt(d)} ${mesi[parseInt(m)-1]} ${y}`;
}

function renderUI() {
  renderVincitore();
  renderFrasi();
}

// ── Interazioni ───────────────────────────────────────
function handleClick(e) {
  const btn = e.currentTarget;
  const index = parseInt(btn.dataset.index);

  incrementFrase(index);

  // Aggiorna solo il count e il vincitore senza ri-renderare tutto
  const newCount = getCountToday(index);
  const countEl = document.getElementById(`count-${index}`);
  if (countEl) countEl.textContent = newCount;

  // Pop animation
  btn.classList.remove('pop');
  void btn.offsetWidth; // reflow
  btn.classList.add('pop');
  btn.addEventListener('animationend', () => btn.classList.remove('pop'), { once: true });

  // Commento sarcastico del cronista
  mostraCommento(index);

  // Aggiorna vincitore e badge record
  renderVincitore();
  aggiornaBadgeRecord();
}

function aggiornaBadgeRecord() {
  const winners = getWinnerToday();
  const maxCount = winners ? winners[0].count : 0;
  const winnerIndices = winners ? winners.map(w => w.index) : [];

  FRASI.forEach((_, i) => {
    const countEl = document.getElementById(`count-${i}`);
    if (!countEl) return;
    const count = getCountToday(i);
    const isRecord = count > 0 && count === maxCount && winnerIndices.includes(i);
    countEl.classList.toggle('record', isRecord);
  });
}

// ── Balloon del cronista ──────────────────────────────
let commentoTimer = null;
function mostraCommento(index) {
  const bubble = document.getElementById('commento-bubble');
  const testo  = document.getElementById('commento-testo');
  if (!bubble || !testo) return;

  testo.textContent = generaCommento(index);

  bubble.hidden = false;
  bubble.classList.remove('esci', 'entra');
  void bubble.offsetWidth; // reflow per riavviare l'animazione
  bubble.classList.add('entra');

  clearTimeout(commentoTimer);
  commentoTimer = setTimeout(nascondiCommento, 5500);
}

function nascondiCommento() {
  const bubble = document.getElementById('commento-bubble');
  if (!bubble || bubble.hidden) return;
  clearTimeout(commentoTimer);
  bubble.classList.remove('entra');
  bubble.classList.add('esci');
  bubble.addEventListener('animationend', () => {
    bubble.hidden = true;
    bubble.classList.remove('esci');
  }, { once: true });
}

// ── Storico toggle ─────────────────────────────────────
function initStoricoToggle() {
  const toggle = document.getElementById('storico-toggle');
  const content = document.getElementById('storico-content');

  toggle.addEventListener('click', () => {
    const aperto = content.classList.toggle('visibile');
    toggle.classList.toggle('aperto', aperto);
    if (aperto) renderStorico();
  });
}

// ── Reset a mezzanotte ────────────────────────────────
function scheduleaMezzanotte() {
  const ora = new Date();
  const domani = new Date(ora.getFullYear(), ora.getMonth(), ora.getDate() + 1);
  const msSiaMezzanotte = domani - ora;
  setTimeout(() => {
    renderUI();
    scheduleaMezzanotte();
  }, msSiaMezzanotte);
}

// ── Service Worker ─────────────────────────────────────
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('SW registration failed:', err);
    });
  }
}

// ── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderUI();
  initStoricoToggle();
  scheduleaMezzanotte();
  registerSW();

  // Chiusura del balloon: tap sul balloon o tasto Esc
  const bubble = document.getElementById('commento-bubble');
  if (bubble) bubble.addEventListener('click', nascondiCommento);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') nascondiCommento();
  });
});

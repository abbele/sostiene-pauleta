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

const ONOMATOPEE = ["CLICK!", "PAF!", "BOM!", "ZAP!", "POW!", "CRASH!", "BANG!", "WHAM!"];

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

  // Onomatopea
  spawnOnomatopea(btn);

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

function spawnOnomatopea(btn) {
  const word = ONOMATOPEE[Math.floor(Math.random() * ONOMATOPEE.length)];
  const el = document.createElement('span');
  el.className = 'onomatopea';
  el.textContent = word;

  const rect = btn.getBoundingClientRect();
  el.style.left = (rect.left + rect.width / 2 - 30) + 'px';
  el.style.top  = (rect.top - 10) + 'px';

  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
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
});

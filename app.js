// ── State ──────────────────────────────────────────────
let currentTab = 'home';
let detailOpen = false;
let calcCurrency = CURRENCIES[3]; // USD default
let products = JSON.parse(localStorage.getItem('products') || '[]');
let recognition = null;
let listening = false;

// ── Boot ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildCurrencyList();
  buildTranslation();
  buildProductList();
  buildCalcChips();
  initSpeech();
});

// ── Tab navigation (instant, no animation) ─────────────
function showTab(id) {
  // Close detail if open
  if (detailOpen) closeDetail();

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');

  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  const tabs = ['home', 'currency', 'calc', 'translate', 'products'];
  document.querySelectorAll('.tab')[tabs.indexOf(id)]?.classList.add('on');

  currentTab = id;
}

// ── Detail navigation (slide in/out) ───────────────────
function openDetail(currency) {
  buildDetail(currency);
  document.getElementById('page-detail').classList.add('open');
  detailOpen = true;
}

function closeDetail() {
  document.getElementById('page-detail').classList.remove('open');
  detailOpen = false;
}

// Legacy aliases used in onclick
function showPage(id, currency) {
  if (id === 'detail') { openDetail(currency); return; }
  showTab(id);
}
function goBack() { closeDetail(); }

// ── Currency List ──────────────────────────────────────
function buildCurrencyList() {
  const el = document.getElementById('currency-list');
  el.innerHTML = '<div class="cur-list">' +
    CURRENCIES.map((c, i) => {
      const inv = c.invalid.length;
      return `<button class="cur-item" onclick="openDetail(CURRENCIES[${i}])">
        <span class="flag">${c.flag}</span>
        <div class="cur-info">
          <div class="cur-code">${c.code}</div>
          <div class="cur-name">${c.name}</div>
        </div>
        ${inv > 0 ? `<span class="badge">⚠️ ${inv} geçersiz</span>` : ''}
        <span class="chev">›</span>
      </button>`;
    }).join('') + '</div>';
}

// ── Currency Detail with visual banknote cards ──────────
function lightenColor(hex, amount) {
  const num = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xFF) + amount);
  const b = Math.min(255, (num & 0xFF) + amount);
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

function buildDetail(c) {
  document.getElementById('detail-title').textContent = c.code;

  const color2 = lightenColor(c.color, 55);

  const makeCard = (b, isValid) => {
    const warnHtml = b.warn
      ? `<div class="bn-warn-badge">${b.warn}</div>`
      : `<div></div>`;
    if (isValid) {
      return `<div class="bn-card valid" style="--cur-color:${c.color};--cur-color2:${color2}">
        <div class="bn-top">
          <div class="bn-amount">${b.note}</div>
          <span class="bn-flag-sm">${c.flag}</span>
        </div>
        <div class="bn-bottom">
          ${warnHtml}
          <span class="bn-status">${b.warn ? '⚠️' : '✅'}</span>
        </div>
      </div>`;
    } else {
      return `<div class="bn-card invalid">
        <div class="bn-x">✕</div>
        <div class="bn-top">
          <div class="bn-amount">${b.note}</div>
          <span class="bn-flag-sm">${c.flag}</span>
        </div>
        <div class="bn-bottom">
          <div class="bn-warn-badge">${b.warn || 'Geçersiz'}</div>
          <span class="bn-status">❌</span>
        </div>
      </div>`;
    }
  };

  document.getElementById('detail-body').innerHTML = `
    <div class="det-head">
      <span class="det-flag">${c.flag}</span>
      <div>
        <div class="det-code">${c.code}</div>
        <div class="det-name">${c.name}</div>
        <div class="det-sym">${c.symbol}</div>
      </div>
    </div>

    ${c.valid.length ? `
      <div class="bn-sec-hd">✅ Geçerli Banknotlar</div>
      <div class="bn-grid">${c.valid.map(b => makeCard(b, true)).join('')}</div>
    ` : ''}

    ${c.invalid.length ? `
      <div class="bn-sec-hd">❌ Geçersiz / Dikkat</div>
      <div class="bn-grid">${c.invalid.map(b => makeCard(b, false)).join('')}</div>
    ` : ''}

    <div style="height:20px"></div>`;
}

// ── Calculator ─────────────────────────────────────────
function buildCalcChips() {
  const el = document.getElementById('calc-chips');
  el.innerHTML = CURRENCIES.map((c, i) =>
    `<button class="chip ${i === 3 ? 'on' : ''}" onclick="selectCalcCurrency(${i},this)">
      ${c.flag} ${c.code}
    </button>`
  ).join('');
  updateCalcLabel();
}

function selectCalcCurrency(i, btn) {
  calcCurrency = CURRENCIES[i];
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
  btn.classList.add('on');
  updateCalcLabel();
  document.getElementById('calc-result').style.display = 'none';
}

function updateCalcLabel() {
  document.getElementById('rate-label').textContent =
    `1 ${calcCurrency.code} = ? TL (kur girin)`;
}

function calculate() {
  const amt = parseFloat(document.getElementById('calc-amount').value.replace(',', '.'));
  const rate = parseFloat(document.getElementById('calc-rate').value.replace(',', '.'));
  if (isNaN(amt) || isNaN(rate)) return;
  document.getElementById('res-from').textContent = `${amt} ${calcCurrency.code}`;
  document.getElementById('res-val').textContent = `${(amt * rate).toFixed(2)} ₺`;
  const el = document.getElementById('calc-result');
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Translation ─────────────────────────────────────────
function buildTranslation() {
  document.getElementById('translate-body').innerHTML = PHRASES.map(sec => `
    <div class="tr-section">
      <div class="tr-hd">${sec.flag} ${sec.lang}</div>
      <div class="tr-card">
        ${sec.items.map(p => `
          <div class="ph-row" onclick="copyPhrase(this,'${p.native.replace(/'/g,"\\'")}')">
            <div style="flex:1">
              <div class="ph-tr">${p.tr}</div>
              <div class="ph-native">${p.native}</div>
            </div>
            <span class="copy-ic">📋</span>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function copyPhrase(row, text) {
  navigator.clipboard.writeText(text).catch(() => {});
  const ic = row.querySelector('.copy-ic');
  ic.textContent = '✅';
  ic.classList.add('ok');
  setTimeout(() => { ic.textContent = '📋'; ic.classList.remove('ok'); }, 1500);
}

// ── Products ───────────────────────────────────────────
function buildProductList() {
  const el = document.getElementById('prod-list');
  if (!products.length) {
    el.innerHTML = `<div class="empty">
      <div class="empty-ic">🏷️</div>
      <div class="empty-t">Ürün Yok</div>
      <div>Sağ üstteki + ile ekleyin</div>
    </div>`;
    return;
  }
  el.innerHTML = products.map((p, i) => `
    <div class="prod-item">
      <div class="prod-info">
        <div class="prod-name">${p.name}</div>
        <div class="prod-cur">${p.currency}</div>
      </div>
      <div class="prod-price">${p.price}</div>
      <button class="prod-del" onclick="deleteProduct(${i})">✕</button>
    </div>`).join('');
}

function toggleAddForm() {
  const f = document.getElementById('add-form');
  f.classList.toggle('show');
  if (f.classList.contains('show')) document.getElementById('prod-name').focus();
}

function saveProduct() {
  const name = document.getElementById('prod-name').value.trim();
  const price = document.getElementById('prod-price').value.trim();
  const currency = document.getElementById('prod-currency').value;
  if (!name || !price) return;
  products.push({ name, price, currency });
  localStorage.setItem('products', JSON.stringify(products));
  document.getElementById('prod-name').value = '';
  document.getElementById('prod-price').value = '';
  document.getElementById('add-form').classList.remove('show');
  buildProductList();
}

function deleteProduct(i) {
  products.splice(i, 1);
  localStorage.setItem('products', JSON.stringify(products));
  buildProductList();
}

// ── Voice Recognition ──────────────────────────────────
function initSpeech() {
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Rec) {
    document.querySelector('.voice-hint').textContent = 'Bu tarayıcıda sesli komut desteklenmiyor';
    return;
  }
  recognition = new Rec();
  recognition.lang = 'tr-TR';
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript.toLowerCase();
    document.getElementById('voice-out').textContent = '🎤 ' + text;
    for (const c of CURRENCIES) {
      if (c.keywords.some(k => text.includes(k))) {
        stopListening();
        showTab('currency');
        setTimeout(() => openDetail(c), 100);
        return;
      }
    }
  };

  recognition.onend = () => stopListening();
  recognition.onerror = () => stopListening();
}

function toggleVoice() { listening ? stopListening() : startListening(); }

function startListening() {
  if (!recognition) return;
  listening = true;
  document.getElementById('voice-btn').classList.add('on');
  document.getElementById('voice-mic').textContent = '🔴';
  document.getElementById('voice-lbl').textContent = 'Dinliyorum...';
  document.getElementById('voice-out').textContent = '';
  try { recognition.start(); } catch(e) {}
}

function stopListening() {
  listening = false;
  document.getElementById('voice-btn').classList.remove('on');
  document.getElementById('voice-mic').textContent = '🎤';
  document.getElementById('voice-lbl').textContent = 'Sesli Komut';
  try { recognition.stop(); } catch(e) {}
}

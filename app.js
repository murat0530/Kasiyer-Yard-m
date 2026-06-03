// ── State ──────────────────────────────────────────────
let currentPage = 'home';
let prevPage = null;
let selectedCurrency = null;
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

// ── Navigation ─────────────────────────────────────────
function showPage(id, currency) {
  if (id === 'detail') {
    selectedCurrency = currency;
    buildDetail(currency);
  }

  const prev = document.getElementById('page-' + currentPage);
  const next = document.getElementById('page-' + id);
  if (!next || next === prev) return;

  prev.classList.remove('active');
  prev.classList.add('behind');
  next.classList.add('active');
  next.classList.remove('behind');

  prevPage = currentPage;
  currentPage = id;

  // Update tab bar
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  const tabs = ['home', 'currency', 'calc', 'translate', 'products'];
  const tabIdx = tabs.indexOf(id);
  if (tabIdx !== -1) {
    document.querySelectorAll('.tab')[tabIdx].classList.add('on');
  }
}

function goBack() {
  if (prevPage) showPage(prevPage);
}

// ── Currency List ──────────────────────────────────────
function buildCurrencyList() {
  const el = document.getElementById('currency-list');
  el.innerHTML = '<div class="cur-list">' +
    CURRENCIES.map(c => {
      const inv = c.invalid.length;
      return `<button class="cur-item" onclick="showPage('detail', CURRENCIES[${CURRENCIES.indexOf(c)}])">
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

// ── Currency Detail ────────────────────────────────────
function buildDetail(c) {
  document.getElementById('detail-title').textContent = c.nameTR || c.name;

  const validRows = c.valid.map(b => `
    <div class="bn-row">
      <span class="bn-ic">✅</span>
      <div><div class="bn-name">${b.note}</div>${b.warn ? `<div class="bn-warn">⚠️ ${b.warn}</div>` : ''}</div>
    </div>`).join('');

  const invalidRows = c.invalid.map(b => `
    <div class="bn-row">
      <span class="bn-ic">❌</span>
      <div><div class="bn-name">${b.note}</div>${b.warn ? `<div class="bn-warn">${b.warn}</div>` : ''}</div>
    </div>`).join('');

  document.getElementById('detail-body').innerHTML = `
    <div class="det-head">
      <span class="det-flag">${c.flag}</span>
      <div>
        <div class="det-code">${c.code}</div>
        <div class="det-name">${c.name}</div>
        <div class="det-sym">${c.symbol}</div>
      </div>
    </div>
    ${c.valid.length ? `<div class="sec-card"><div class="sec-hd g">✅ Geçerli Banknotlar</div>${validRows}</div>` : ''}
    ${c.invalid.length ? `<div class="sec-card"><div class="sec-hd r">❌ Geçersiz / Dikkat</div>${invalidRows}</div>` : ''}
    <div style="height:16px"></div>`;
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
  const res = (amt * rate).toFixed(2);
  document.getElementById('res-from').textContent = `${amt} ${calcCurrency.code}`;
  document.getElementById('res-val').textContent = `${res} ₺`;
  const el = document.getElementById('calc-result');
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Translation ─────────────────────────────────────────
function buildTranslation() {
  const el = document.getElementById('translate-body');
  el.innerHTML = PHRASES.map(sec => `
    <div class="tr-section">
      <div class="tr-hd">${sec.flag} ${sec.lang}</div>
      <div class="tr-card">
        ${sec.items.map(p => `
          <div class="ph-row" onclick="copyPhrase(this, '${p.native.replace(/'/g,"\\'")}')">
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
  if (f.classList.contains('show')) {
    document.getElementById('prod-name').focus();
  }
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
    document.querySelector('.voice-hint').textContent = 'Sesli komut bu tarayıcıda desteklenmiyor';
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
        setTimeout(() => showPage('detail', c), 300);
        return;
      }
    }
  };

  recognition.onend = () => stopListening();
  recognition.onerror = () => stopListening();
}

function toggleVoice() {
  listening ? stopListening() : startListening();
}

function startListening() {
  if (!recognition) return;
  listening = true;
  document.getElementById('voice-btn').classList.add('on');
  document.getElementById('voice-mic').textContent = '🔴';
  document.getElementById('voice-lbl').textContent = 'Dinliyorum...';
  document.getElementById('voice-out').textContent = '';
  try { recognition.start(); } catch (e) {}
}

function stopListening() {
  listening = false;
  document.getElementById('voice-btn').classList.remove('on');
  document.getElementById('voice-mic').textContent = '🎤';
  document.getElementById('voice-lbl').textContent = 'Sesli Komut';
  try { recognition.stop(); } catch (e) {}
}

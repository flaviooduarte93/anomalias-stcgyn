// ── STCGYN — Tema do Modal de Apontamento ──
// Alterna entre tema escuro (padrão) e claro no modalAnomalia
// Não afeta o restante do sistema

(function () {
  const KEY    = 'stcgyn-modal-tema';
  const MODAL  = 'modalAnomalia';
  const SW_ID  = 'modalTemaSwitch';

  // ── CSS injetado dinamicamente ──────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    /* Tema claro */
    '#modalAnomalia.mt-light .modal {',
    '  background:#F4F7FC!important;',
    '  color:#1B2B5A!important;',
    '}',
    '#modalAnomalia.mt-light .modal-handle { background:#D9E3F5!important; }',
    '#modalAnomalia.mt-light .modal-title,',
    '#modalAnomalia.mt-light .modal-title span { color:#1B2B5A!important; }',
    '#modalAnomalia.mt-light .modal-label { color:#2F5FE3!important; }',
    '#modalAnomalia.mt-light .modal-value {',
    '  background:#fff!important;',
    '  border-color:#D9E3F5!important;',
    '  color:#1B2B5A!important;',
    '}',
    '#modalAnomalia.mt-light .modal-value.loading { color:#A0B3D0!important; }',
    /* Alerta de distância no claro */
    '#modalAnomalia.mt-light .modal-value[style*="error"],',
    '#modalAnomalia.mt-light #modalEndereco:not(.loading) {',
    '  background:#FFF1F3!important;',
    '  border-color:#FFD6DC!important;',
    '  color:#E54866!important;',
    '}',
    /* Inputs */
    '#modalAnomalia.mt-light input[type=text],',
    '#modalAnomalia.mt-light textarea {',
    '  background:#fff!important;',
    '  border-color:#D9E3F5!important;',
    '  color:#1B2B5A!important;',
    '}',
    '#modalAnomalia.mt-light input[type=text]::placeholder,',
    '#modalAnomalia.mt-light textarea::placeholder { color:#A0B3D0!important; }',
    /* Tipo buttons */
    '#modalAnomalia.mt-light .tipo-btn {',
    '  background:#fff!important;',
    '  border-color:#D9E3F5!important;',
    '  color:#1B2B5A!important;',
    '}',
    '#modalAnomalia.mt-light .tipo-btn.selected {',
    '  border-color:#2F5FE3!important;',
    '  background:#EEF3FF!important;',
    '  color:#2F5FE3!important;',
    '}',
    /* Foto upload */
    '#modalAnomalia.mt-light .foto-upload-btn {',
    '  background:#fff!important;',
    '  border-color:#D9E3F5!important;',
    '  color:#2F5FE3!important;',
    '}',
    /* Obs textarea */
    '#modalAnomalia.mt-light #modalObs {',
    '  background:#fff!important;',
    '  border-color:#D9E3F5!important;',
    '  color:#1B2B5A!important;',
    '}',
    /* Botão cancelar */
    '#modalAnomalia.mt-light .btn-cancel {',
    '  background:#f3f4f6!important;',
    '  border-color:#D9E3F5!important;',
    '  color:#8FA3C8!important;',
    '}',
    /* Campos dinâmicos injetados por JS */
    '#modalAnomalia.mt-light #camposExtras input,',
    '#modalAnomalia.mt-light #camposExtras select,',
    '#modalAnomalia.mt-light #camposExtras textarea {',
    '  background:#fff!important;',
    '  border-color:#D9E3F5!important;',
    '  color:#1B2B5A!important;',
    '}',
    '#modalAnomalia.mt-light #camposExtras label,',
    '#modalAnomalia.mt-light #camposExtras .modal-label { color:#2F5FE3!important; }',
    '#modalAnomalia.mt-light #camposExtras .modal-value { color:#1B2B5A!important; }',
  ].join('\n');
  document.head.appendChild(style);

  // ── Aplica tema ─────────────────────────────────────────────
  function set(tema) {
    var modal = document.getElementById(MODAL);
    var sw    = document.getElementById(SW_ID);
    if (!modal) return;

    if (tema === 'light') {
      modal.classList.add('mt-light');
      if (sw) sw.checked = true;
    } else {
      modal.classList.remove('mt-light');
      if (sw) sw.checked = false;
    }
    try { localStorage.setItem(KEY, tema); } catch(e) {}
  }

  // ── Restaura preferência ─────────────────────────────────────
  function init() {
    var saved = 'dark';
    try { saved = localStorage.getItem(KEY) || 'dark'; } catch(e) {}
    set(saved);
  }

  // ── API pública ──────────────────────────────────────────────
  window.modalTheme = { set: set };

  // ── Bind switch ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    init();
    // Re-aplica ao abrir o modal (caso seja aberto após carregar)
    var sw = document.getElementById(SW_ID);
    if (sw) {
      sw.onchange = function () {
        set(this.checked ? 'light' : 'dark');
      };
    }
  });
})();

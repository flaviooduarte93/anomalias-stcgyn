// ── STCGYN Theme System v2 ──
(function () {
  const KEY = 'stcgyn-theme';

  // Variáveis CSS que mudam entre temas
  const vars = {
    dark: {
      '--th-bg':       '#0a1628',
      '--th-bg2':      '#0d1e3a',
      '--th-surface':  'rgba(255,255,255,0.04)',
      '--th-card':     'rgba(255,255,255,0.03)',
      '--th-border':   'rgba(255,255,255,0.10)',
      '--th-border2':  'rgba(255,255,255,0.06)',
      '--th-text':     '#f0f4ff',
      '--th-text2':    '#8a9bbf',
      '--th-text3':    '#5a6d8f',
      '--th-input-bg': 'rgba(255,255,255,0.06)',
      '--th-hover':    'rgba(255,255,255,0.08)',
      '--th-shadow':   'rgba(0,0,0,0.4)',
      '--th-select-bg':'#0d1f3c',
      // brand vars
      '--eq-blue-dark': '#0a1628',
      '--eq-white':     '#f0f4ff',
      '--eq-gray':      '#8a9bbf',
      '--eq-cyan':      '#00aaff',
    },
    light: {
      '--th-bg':       '#eef2ff',
      '--th-bg2':      '#e4eaff',
      '--th-surface':  '#ffffff',
      '--th-card':     '#ffffff',
      '--th-border':   '#c8d4f0',
      '--th-border2':  '#dce6ff',
      '--th-text':     '#111827',
      '--th-text2':    '#374151',
      '--th-text3':    '#6b7280',
      '--th-input-bg': '#ffffff',
      '--th-hover':    'rgba(0,0,0,0.04)',
      '--th-shadow':   'rgba(0,0,0,0.10)',
      '--th-select-bg':'#ffffff',
      // brand vars
      '--eq-blue-dark': '#eef2ff',
      '--eq-white':     '#111827',
      '--eq-gray':      '#374151',
      '--eq-cyan':      '#0066bb',
    }
  };

  function apply(name) {
    const t = vars[name] || vars.dark;
    const root = document.documentElement;
    Object.entries(t).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute('data-theme', name);
    localStorage.setItem(KEY, name);
    updateBtn(name);
  }

  function updateBtn(name) {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    const isDark = name === 'dark';
    btn.title = isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro';
    btn.innerHTML = isDark
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <circle cx="12" cy="12" r="5"/>
           <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
           <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
           <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
           <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
         </svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
         </svg>`;
  }

  window.stcTheme = {
    toggle: () => apply(localStorage.getItem(KEY) === 'light' ? 'dark' : 'light'),
    current: () => localStorage.getItem(KEY) || 'dark',
    apply,
  };

  // Aplica imediatamente para evitar flash
  apply(localStorage.getItem(KEY) || 'dark');
})();

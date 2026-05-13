// ── STCGYN Theme System ──
// Aplica tema claro/escuro e persiste via localStorage
// Incluir em todas as abas antes do </body>

(function() {
  const THEME_KEY = 'stcgyn-theme';

  const themes = {
    dark: {
      '--eq-blue-dark':  '#0a1628',
      '--eq-blue':       '#0d3b8e',
      '--eq-blue-mid':   '#1a56c4',
      '--eq-cyan':       '#00aaff',
      '--eq-purple':     '#5b2d8e',
      '--eq-purple-mid': '#7c3fc0',
      '--eq-white':      '#f0f4ff',
      '--eq-gray':       '#8a9bbf',
      '--eq-error':      '#ff4d6d',
      '--eq-success':    '#00e5a0',
      '--eq-warning':    '#ffb300',
      '--theme-bg':      '#0a1628',
      '--theme-surface': 'rgba(255,255,255,0.04)',
      '--theme-border':  'rgba(255,255,255,0.1)',
      '--theme-text':    '#f0f4ff',
      '--theme-text2':   '#8a9bbf',
      '--theme-card':    'rgba(255,255,255,0.03)',
      '--theme-input':   'rgba(255,255,255,0.06)',
      '--theme-hover':   'rgba(255,255,255,0.08)',
      '--theme-shadow':  'rgba(0,0,0,0.4)',
    },
    light: {
      '--eq-blue-dark':  '#e8f0fe',
      '--eq-blue':       '#1a56c4',
      '--eq-blue-mid':   '#0d3b8e',
      '--eq-cyan':       '#0077cc',
      '--eq-purple':     '#5b2d8e',
      '--eq-purple-mid': '#7c3fc0',
      '--eq-white':      '#1a2340',
      '--eq-gray':       '#4a5568',
      '--eq-error':      '#d9213c',
      '--eq-success':    '#00875a',
      '--eq-warning':    '#b45309',
      '--theme-bg':      '#f0f4ff',
      '--theme-surface': 'rgba(0,0,0,0.04)',
      '--theme-border':  'rgba(0,0,0,0.12)',
      '--theme-text':    '#1a2340',
      '--theme-text2':   '#4a5568',
      '--theme-card':    'rgba(255,255,255,0.9)',
      '--theme-input':   'rgba(0,0,0,0.05)',
      '--theme-hover':   'rgba(0,0,0,0.06)',
      '--theme-shadow':  'rgba(0,0,0,0.12)',
    }
  };

  function applyTheme(name) {
    const t = themes[name] || themes.dark;
    const root = document.documentElement;
    Object.entries(t).forEach(([k, v]) => root.style.setProperty(k, v));
    document.documentElement.setAttribute('data-theme', name);
    document.body.style.background = t['--theme-bg'];
    document.body.style.color = t['--theme-text'];
    localStorage.setItem(THEME_KEY, name);
    // atualiza ícone do botão se existir
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.innerHTML = name === 'dark'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      btn.title = name === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro';
    }
  }

  window.stcTheme = {
    apply: applyTheme,
    toggle: function() {
      const cur = localStorage.getItem(THEME_KEY) || 'dark';
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    },
    current: function() {
      return localStorage.getItem(THEME_KEY) || 'dark';
    }
  };

  // Aplica imediatamente para evitar flash
  applyTheme(localStorage.getItem(THEME_KEY) || 'dark');
})();

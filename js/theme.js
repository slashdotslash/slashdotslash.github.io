(function () {
  'use strict';

  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function resolvedTheme() {
    const explicit = root.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateButton() {
    const theme = resolvedTheme();
    const label = theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему';
    const iconName = theme === 'dark' ? 'sun' : 'moon';
    toggle.innerHTML = window.MycoIcons ? window.MycoIcons.svg(iconName) : '';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
  }

  try {
    const saved = localStorage.getItem('myco-theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch {}

  toggle.type = 'button';
  toggle.addEventListener('click', function () {
    const next = resolvedTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('myco-theme', next);
    } catch {}
    updateButton();
  });

  updateButton();
})();

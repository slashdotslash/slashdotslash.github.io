(function () {
  'use strict';

  const ICONS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.42"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
    danger: '<circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>',
    note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    article: '<path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5"/>',
    type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
    paragraph: '<path d="M13 4v16M17 4v16M19 4H9a4 4 0 0 0 0 8h4"/>',
    code: '<path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/>',
    quote: '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 3-1 4-4 5M14 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 3-1 4-4 5"/>',
    table: '<path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    images: '<path d="M18 22H4a2 2 0 0 1-2-2V6M22 18V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"/><circle cx="13" cy="8" r="2"/><path d="m22 12-3-3-7 7"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    sidebar: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
    box: '<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="m3 8 9 5 9-5M3 13l9 5 9-5M3 18l9 5 9-5"/>',
    topbar: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>',
    arrows: '<path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/>',
    buttons: '<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M8 12h.01M12 12h4"/>',
    minus: '<path d="M5 12h14"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    newspaper: '<path d="M4 22h16a2 2 0 0 0 2-2V4H8v16a2 2 0 0 1-4 0V6H2v14a2 2 0 0 0 2 2Z"/><path d="M12 8h6M12 12h6M12 16h6"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    chevronUp: '<path d="m18 15-6-6-6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'
  };

  function svg(name, label) {
    const body = ICONS[name] || ICONS.info;
    const accessibility = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
    return [
      `<svg class="icon icon--${name}" ${accessibility} viewBox="0 0 24 24"`,
      ' fill="none" stroke="currentColor" stroke-width="2"',
      ' stroke-linecap="round" stroke-linejoin="round">',
      body,
      '</svg>'
    ].join('');
  }

  function render(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-icon]').forEach(function (host) {
      host.innerHTML = svg(host.getAttribute('data-icon'), host.getAttribute('data-icon-label'));
    });

    scope.querySelectorAll('.notice__title').forEach(function (title) {
      if (title.querySelector('.notice__icon')) return;
      const notice = title.closest('.notice');
      let name = 'note';
      if (notice.classList.contains('notice--warning')) name = 'warning';
      if (notice.classList.contains('notice--info')) name = 'info';
      if (notice.classList.contains('notice--danger') || notice.classList.contains('notice--error')) name = 'danger';
      title.insertAdjacentHTML('afterbegin', `<span class="notice__icon">${svg(name)}</span>`);
    });
  }

  window.MycoIcons = { svg: svg, render: render };
  render(document);
})();

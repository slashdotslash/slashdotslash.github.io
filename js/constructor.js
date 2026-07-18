(function () {
  'use strict';

  const BLOCKS = {
    article: {
      label: 'Article Content',
      icon: 'article',
      category: 'content',
      html: `<div class="constructor-block" data-type="article">
  <article class="article mycomarkup-doc">
    <h2 id="article-example">Article section <a class="heading__link" href="#article-example" aria-label="Link to this section"></a></h2>
    <p>An article container with headings, paragraphs, lists, inline <code>code</code> and links.</p>
    <ul>
      <li class="item_unordered"><p>Readable typography and consistent spacing</p></li>
      <li class="item_unordered"><p>Suitable for wiki pages and blog posts</p></li>
    </ul>
  </article>
</div>`
    },
    heading: {
      label: 'Heading',
      icon: 'type',
      category: 'content',
      html: `<div class="constructor-block" data-type="heading">
  <h2 id="section-title">Section Title <a class="heading__link" href="#section-title"></a></h2>
</div>`
    },
    paragraph: {
      label: 'Paragraph',
      icon: 'paragraph',
      category: 'content',
      html: `<div class="constructor-block" data-type="paragraph">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
</div>`
    },
    markdown: {
      label: 'Markdown',
      icon: 'code',
      category: 'content',
      html: `<div class="constructor-block" data-type="markdown">
  <div class="markdown-editor">
    <label class="markdown-editor__label">Markdown</label>
    <textarea class="markdown-editor__source" rows="9">## Markdown section

Write **bold text**, *emphasis*, [links](https://example.com) and inline \`code\`.

- First item
- Second item

> The preview updates while you type.</textarea>
    <div class="markdown-editor__preview article mycomarkup-doc" aria-live="polite"></div>
  </div>
</div>`
    },
    codeblock: {
      label: 'Code Block',
      icon: 'code',
      category: 'content',
      html: `<div class="constructor-block" data-type="codeblock">
  <pre class="codeblock"><code class="language-ocaml">let rec fibonacci n =
  match n with
  | 0 -> 0
  | 1 -> 1
  | n -> fibonacci (n - 1) + fibonacci (n - 2)</code></pre>
</div>`
    },
    blockquote: {
      label: 'Blockquote',
      icon: 'quote',
      category: 'content',
      html: `<div class="constructor-block" data-type="blockquote">
  <blockquote>
    <p>"Programs must be written for people to read, and only incidentally for machines to execute."</p>
    <p>— Harold Abelson</p>
  </blockquote>
</div>`
    },
    table: {
      label: 'Table',
      icon: 'table',
      category: 'content',
      html: `<div class="constructor-block" data-type="table">
  <table>
    <thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>map</code></td><td><code>('a -> 'b) -> 'a list -> 'b list</code></td><td>Apply function to each element</td></tr>
      <tr><td><code>filter</code></td><td><code>('a -> bool) -> 'a list -> 'a list</code></td><td>Keep elements matching predicate</td></tr>
      <tr><td><code>fold_left</code></td><td><code>('a -> 'b -> 'a) -> 'a -> 'b list -> 'a</code></td><td>Reduce from the left</td></tr>
    </tbody>
  </table>
</div>`
    },
    list: {
      label: 'List',
      icon: 'list',
      category: 'content',
      html: `<div class="constructor-block" data-type="list">
  <ul>
    <li class="item_unordered"><p><strong>First item</strong> — description of the first item</p></li>
    <li class="item_unordered"><p><strong>Second item</strong> — description of the second item</p></li>
    <li class="item_unordered"><p><strong>Third item</strong> — description of the third item</p></li>
  </ul>
</div>`
    },
    image: {
      label: 'Image',
      icon: 'image',
      category: 'content',
      html: `<div class="constructor-block" data-type="image">
  <figure class="binary-container">
    <div class="image-placeholder image-placeholder--large">
      <div class="image-placeholder__label">Image</div>
      <div>Image placeholder — 800×400</div>
    </div>
    <figcaption>Figure 1: Example image with caption</figcaption>
  </figure>
</div>`
    },
    gallery: {
      label: 'Image Gallery',
      icon: 'images',
      category: 'content',
      html: `<div class="constructor-block" data-type="gallery">
  <div class="img-gallery img-gallery_layout-grid">
    <figure>
      <div class="image-placeholder">Image 1</div>
      <figcaption>Image 1</figcaption>
    </figure>
    <figure>
      <div class="image-placeholder image-placeholder--reverse">Image 2</div>
      <figcaption>Image 2</figcaption>
    </figure>
  </div>
</div>`
    },
    transclusion: {
      label: 'Transclusion',
      icon: 'link',
      category: 'content',
      html: `<div class="constructor-block" data-type="transclusion">
  <div class="transclusion transclusion_stand-out">
    <a class="transclusion__link" href="#">Embedded article</a>
    <div class="transclusion__content">
      <p>Transcluded content from another wiki page appears here.</p>
    </div>
  </div>
</div>`
    },
    'notice-note': {
      label: 'Note',
      icon: 'note',
      category: 'notices',
      html: `<div class="constructor-block" data-type="notice-note">
  <div class="notice notice--note">
    <div class="notice__title">Note</div>
    <div class="notice__content">
      <p>This is a note block. Use it for supplementary information that adds context to the main content.</p>
    </div>
  </div>
</div>`
    },
    'notice-warning': {
      label: 'Warning',
      icon: 'warning',
      category: 'notices',
      html: `<div class="constructor-block" data-type="notice-warning">
  <div class="notice notice--warning">
    <div class="notice__title">Warning</div>
    <div class="notice__content">
      <p>This is a warning block. Use it to alert users about potential issues or important caveats.</p>
    </div>
  </div>
</div>`
    },
    'notice-info': {
      label: 'Info',
      icon: 'info',
      category: 'notices',
      html: `<div class="constructor-block" data-type="notice-info">
  <div class="notice notice--info">
    <div class="notice__title">Info</div>
    <div class="notice__content">
      <p>This is an info block. Use it for tips, references, or additional details.</p>
    </div>
  </div>
</div>`
    },
    'notice-danger': {
      label: 'Danger',
      icon: 'danger',
      category: 'notices',
      html: `<div class="constructor-block" data-type="notice-danger">
  <div class="notice notice--danger">
    <div class="notice__title">Danger</div>
    <div class="notice__content">
      <p>This is a danger block. Use it for critical errors, breaking changes, or destructive actions.</p>
    </div>
  </div>
</div>`
    },
    search: {
      label: 'Search',
      icon: 'search',
      category: 'layout',
      html: `<div class="constructor-block" data-type="search">
  <form class="search-bar" role="search">
    <input type="search" class="search-bar__input" placeholder="Search articles…">
    <button type="submit" class="btn btn_accent">Search</button>
  </form>
</div>`
    },
    sidebar: {
      label: 'Sidebar',
      icon: 'sidebar',
      category: 'layout',
      html: `<div class="constructor-block constructor-block--container" data-type="sidebar">
  <aside class="layout-card sidebar">
    <h3 class="layout-card__title">Sidebar</h3>
    <ul class="categories-card__entries">
      <li class="categories-card__entry"><a class="categories-card__link" href="#">Getting started</a></li>
      <li class="categories-card__entry"><a class="categories-card__link" href="#">Tutorials</a></li>
      <li class="categories-card__entry"><a class="categories-card__link" href="#">Reference</a></li>
    </ul>
    <div class="constructor-drop-zone" data-placeholder="Drop blocks here to nest inside sidebar"></div>
  </aside>
</div>`
    },
    card: {
      label: 'Card',
      icon: 'box',
      category: 'layout',
      html: `<div class="constructor-block constructor-block--container" data-type="card">
  <div class="card">
    <h3 class="card__title">Card Title</h3>
    <div class="card__meta">Meta information · Date</div>
    <p class="card__description">This is a card component. You can drag other blocks inside to create nested layouts.</p>
    <div class="constructor-drop-zone" data-placeholder="Drop blocks here to nest inside card"></div>
  </div>
</div>`
    },
    topbar: {
      label: 'Top Bar',
      icon: 'topbar',
      category: 'layout',
      html: `<div class="constructor-block" data-type="topbar">
  <header class="top-bar-preview">
    <nav class="main-width top-bar">
      <ul class="top-bar__wrapper">
        <li class="top-bar__section top-bar__section_home">
          <div class="top-bar__home-link-wrapper">
            <a class="top-bar__home-link" href="#">MishaOcaml</a>
          </div>
        </li>
        <li class="top-bar__section top-bar__section_search">
          <form class="top-bar__search"><input type="text" class="top-bar__search-bar" placeholder="Search…"></form>
        </li>
        <li class="top-bar__section top-bar__section_highlights">
          <ul class="top-bar__highlights">
            <li class="top-bar__highlight"><a class="top-bar__highlight-link" href="#">Recent</a></li>
            <li class="top-bar__highlight"><a class="top-bar__highlight-link" href="#">All pages</a></li>
            <li class="top-bar__highlight"><a class="top-bar__highlight-link" href="#">Help</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</div>`
    },
    prevnext: {
      label: 'Prev / Next',
      icon: 'arrows',
      category: 'layout',
      html: `<div class="constructor-block" data-type="prevnext">
  <section class="prevnext">
    <a class="prevnext__el prevnext__prev" href="#">← Previous Article</a>
    <a class="prevnext__el prevnext__next" href="#">Next Article →</a>
  </section>
</div>`
    },
    'hypha-info': {
      label: 'Meta Info',
      icon: 'info',
      category: 'layout',
      html: `<div class="constructor-block" data-type="hypha-info">
  <nav class="hypha-info">
    <ul class="hypha-info__list">
      <li class="hypha-info__entry"><a class="hypha-info__link" href="#">View history</a></li>
      <li class="hypha-info__entry"><a class="hypha-info__link" href="#">Rename</a></li>
      <li class="hypha-info__entry"><a class="hypha-info__link" href="#">Delete</a></li>
      <li class="hypha-info__entry"><a class="hypha-info__link" href="#">View markup</a></li>
      <li class="hypha-info__entry"><a class="hypha-info__link" href="#">Backlinks</a></li>
    </ul>
  </nav>
</div>`
    },
    buttons: {
      label: 'Buttons',
      icon: 'buttons',
      category: 'layout',
      html: `<div class="constructor-block" data-type="buttons">
  <div class="btn-group">
    <a class="btn btn_accent" href="#">Primary</a>
    <a class="btn" href="#">Default</a>
    <a class="btn btn_weak" href="#">Weak</a>
    <a class="btn btn_destructive" href="#">Destructive</a>
  </div>
</div>`
    },
    divider: {
      label: 'Divider',
      icon: 'minus',
      category: 'layout',
      html: `<div class="constructor-block" data-type="divider"><hr></div>`
    },
    'blog-header': {
      label: 'Blog Header',
      icon: 'user',
      category: 'blog',
      html: `<div class="constructor-block" data-type="blog-header">
  <div class="blog-header">
    <img src="https://avatars.githubusercontent.com/u/138378206?v=4" alt="MishaOcaml" class="blog-header__avatar">
    <h1 class="blog-header__name">MishaOcaml</h1>
    <p class="blog-header__bio">Personal blog about OCaml, tooling and thoughts by Misha.</p>
  </div>
</div>`
    },
    'post-row': {
      label: 'Post Row',
      icon: 'newspaper',
      category: 'blog',
      html: `<div class="constructor-block" data-type="post-row">
  <a class="post-row" href="#blog-post">
    <time class="post-row__date" datetime="2024-10-07">07.10.2024</time>
    <span class="post-row__title">Blog post title</span>
  </a>
</div>`
    }
  };

  const SCHEMES = {
    ocaml: {
      label: 'OCaml Orange',
      primary: '#EC6813',
      primaryDark: '#F08030',
      primaryHover: '#D45A0A',
      primaryHoverDark: '#FF9040',
      primaryLight: '#FFF3EB',
      primaryLightDark: '#3D2A1A'
    },
    ocean: {
      label: 'Ocean Blue',
      primary: '#2B6CB0',
      primaryHover: '#2458A0',
      primaryLight: '#E8F0FE',
      primaryLightDark: '#1A2540'
    },
    forest: {
      label: 'Forest Green',
      primary: '#2D8A4E',
      primaryHover: '#247040',
      primaryLight: '#E8F5EE',
      primaryLightDark: '#1A2E22'
    },
    lavender: {
      label: 'Lavender',
      primary: '#7C3AED',
      primaryHover: '#6B21D8',
      primaryLight: '#F0E8FF',
      primaryLightDark: '#2A1F3D'
    },
    rose: {
      label: 'Rose',
      primary: '#E11D48',
      primaryHover: '#C81840',
      primaryLight: '#FDE8EE',
      primaryLightDark: '#3B1D26'
    },
    midnight: {
      label: 'Midnight',
      primary: '#6366F1',
      primaryHover: '#5558E0',
      primaryLight: '#EBEEFF',
      primaryLightDark: '#23243D'
    }
  };

  let draggedEl = null;
  let blockIdCounter = 0;
  let activeScheme = 'ocaml';

  function renderIcon(name) {
    return window.MycoIcons ? window.MycoIcons.svg(name) : '';
  }

  document.addEventListener('DOMContentLoaded', () => {
    restoreTheme();
    renderPalette();
    renderSchemeSelector();
    bindCanvasEvents();
    bindExport();
    bindThemeToggle();
  });

  function renderPalette() {
    const palette = document.getElementById('block-palette');
    if (!palette) return;

    const categories = {
      content: 'Content',
      notices: 'Notices',
      layout: 'Layout',
      blog: 'Blog'
    };

    Object.entries(categories).forEach(([key, label]) => {
      const section = document.createElement('div');
      section.className = 'palette-section';
      section.innerHTML = `<h3 class="palette-section__title">${label}</h3>`;

      const items = Object.entries(BLOCKS).filter(([, b]) => b.category === key);
      items.forEach(([type, block]) => {
        const item = document.createElement('button');
        item.className = 'palette-item';
        item.type = 'button';
        item.setAttribute('data-block-type', type);
        item.setAttribute('aria-label', `Add block: ${block.label}`);
        item.draggable = true;
        item.innerHTML = `<span class="palette-item__icon">${renderIcon(block.icon)}</span><span class="palette-item__label">${block.label}</span>`;

        item.addEventListener('click', () => addBlock(type));
        item.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', type);
          e.dataTransfer.effectAllowed = 'copy';
          item.classList.add('palette-item--dragging');
        });
        item.addEventListener('dragend', () => {
          item.classList.remove('palette-item--dragging');
        });

        section.appendChild(item);
      });

      palette.appendChild(section);
    });
  }

  function addBlock(type, targetZone) {
    const block = BLOCKS[type];
    if (!block) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'canvas-block';
    const instanceId = ++blockIdCounter;
    wrapper.setAttribute('data-block-id', instanceId);
    wrapper.draggable = true;
    wrapper.innerHTML = `
      <div class="canvas-block__toolbar">
        <span class="canvas-block__label">${renderIcon(block.icon)} ${block.label}</span>
        <div class="canvas-block__actions">
          <button
            type="button"
            class="canvas-block__btn canvas-block__btn--up"
            data-action="up"
            title="Move up"
            aria-label="Move ${block.label} up"
          >${renderIcon('chevronUp')}</button>
          <button
            type="button"
            class="canvas-block__btn canvas-block__btn--down"
            data-action="down"
            title="Move down"
            aria-label="Move ${block.label} down"
          >${renderIcon('chevronDown')}</button>
          <button
            type="button"
            class="canvas-block__btn canvas-block__btn--delete"
            data-action="remove"
            title="Remove"
            aria-label="Remove ${block.label}"
          >${renderIcon('close')}</button>
        </div>
      </div>
      <div class="canvas-block__content">${block.html}</div>
    `;

    wrapper.querySelectorAll('[id]').forEach((element) => {
      const oldId = element.id;
      const newId = `${oldId}-${instanceId}`;
      element.id = newId;
      wrapper.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        if (anchor.getAttribute('href') === `#${oldId}`) anchor.setAttribute('href', `#${newId}`);
      });
    });

    
    wrapper.addEventListener('dragstart', (e) => {
      if (e.target !== wrapper) return;
      draggedEl = wrapper;
      wrapper.classList.add('canvas-block--dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', 'reorder');
    });

    wrapper.addEventListener('dragend', () => {
      wrapper.classList.remove('canvas-block--dragging');
      draggedEl = null;
      clearDropIndicators();
    });

    const canvas = targetZone || document.getElementById('block-canvas');
    if (canvas) {
      canvas.appendChild(wrapper);
      updateEmptyState();
      if (window.MycoIcons) window.MycoIcons.render(wrapper);
      prepareEditableContent(wrapper);
      updateMarkdownEditors(wrapper);
      if (window.MycoHighlight) window.MycoHighlight.highlight(wrapper);
      wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    return wrapper;
  }

  function bindCanvasEvents() {
    const canvas = document.getElementById('block-canvas');
    if (!canvas) return;

    canvas.addEventListener('dragover', (e) => {
      e.preventDefault();
      const dropZone = e.target.closest('.constructor-drop-zone');
      const target = dropZone && (!draggedEl || !draggedEl.contains(dropZone)) ? dropZone : canvas;
      const afterEl = getDragAfterElement(target, e.clientY);

      e.dataTransfer.dropEffect = draggedEl ? 'move' : 'copy';
      clearDropIndicators();
      document.querySelectorAll('.constructor-drop-zone--active').forEach(zone =>
        zone.classList.remove('constructor-drop-zone--active')
      );

      if (dropZone && target === dropZone) dropZone.classList.add('constructor-drop-zone--active');
      if (afterEl) afterEl.classList.add('canvas-block--drop-before');
      else if (target === canvas) canvas.classList.add('canvas--drop-end');
    });

    canvas.addEventListener('dragleave', (e) => {
      if (!canvas.contains(e.relatedTarget)) {
        clearDropIndicators();
        canvas.classList.remove('canvas--drop-end');
      }
    });

    canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      clearDropIndicators();
      canvas.classList.remove('canvas--drop-end');

      const dropZone = e.target.closest('.constructor-drop-zone');
      const target = dropZone && (!draggedEl || !draggedEl.contains(dropZone)) ? dropZone : canvas;
      const afterEl = getDragAfterElement(target, e.clientY);

      if (draggedEl) {
        if (afterEl) {
          target.insertBefore(draggedEl, afterEl);
        } else {
          target.appendChild(draggedEl);
        }
      } else {
        const type = e.dataTransfer.getData('text/plain');
        if (type && BLOCKS[type]) {
          const newBlock = addBlock(type, target);
          if (afterEl && newBlock) target.insertBefore(newBlock, afterEl);
        }
      }

      updateEmptyState();
    });

    canvas.addEventListener('click', (e) => {
      const button = e.target.closest('[data-action]');
      if (!button) return;
      const action = button.getAttribute('data-action');
      if (action === 'up') moveBlock(button, -1);
      if (action === 'down') moveBlock(button, 1);
      if (action === 'remove') removeBlock(button);
    });

    canvas.addEventListener('submit', (e) => e.preventDefault());
    canvas.addEventListener('input', (e) => {
      if (e.target.matches('.markdown-editor__source')) updateMarkdownEditor(e.target);
    });
  }

  function prepareEditableContent(root) {
    const selector = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'td', 'th',
      'blockquote', 'figcaption', 'code', '.notice__title', '.card__meta',
      '.image-placeholder__label', '.post-row__title', '.post-row__date'
    ].join(',');

    root.querySelectorAll(selector).forEach((element) => {
      if (element.closest('.markdown-editor')) return;
      if (element.closest('button')) return;
      element.contentEditable = 'true';
      element.spellcheck = true;
      element.setAttribute('data-editable', 'true');
    });
  }

  function updateMarkdownEditors(root) {
    root.querySelectorAll('.markdown-editor__source').forEach(updateMarkdownEditor);
  }

  function updateMarkdownEditor(source) {
    const preview = source.closest('.markdown-editor')?.querySelector('.markdown-editor__preview');
    if (preview) preview.innerHTML = renderMarkdown(source.value);
  }

  function renderMarkdown(markdown) {
    const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
    const output = [];
    let paragraph = [];
    let listType = '';
    let code = [];
    let inCode = false;

    const flushParagraph = () => {
      if (!paragraph.length) return;
      output.push(`<p>${renderMarkdownInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    };

    const closeList = () => {
      if (!listType) return;
      output.push(`</${listType}>`);
      listType = '';
    };

    lines.forEach((line) => {
      if (line.trim().startsWith('```')) {
        flushParagraph();
        closeList();
        if (inCode) {
          output.push(`<pre class="codeblock"><code>${escapeHTML(code.join('\n'))}</code></pre>`);
          code = [];
        }
        inCode = !inCode;
        return;
      }

      if (inCode) {
        code.push(line);
        return;
      }

      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
      const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
      const quote = line.match(/^>\s?(.*)$/);

      if (heading) {
        flushParagraph();
        closeList();
        const level = heading[1].length;
        output.push(`<h${level}>${renderMarkdownInline(heading[2])}</h${level}>`);
      } else if (unordered || ordered) {
        flushParagraph();
        const nextType = unordered ? 'ul' : 'ol';
        if (listType !== nextType) {
          closeList();
          output.push(`<${nextType}>`);
          listType = nextType;
        }
        output.push(`<li>${renderMarkdownInline((unordered || ordered)[1])}</li>`);
      } else if (quote) {
        flushParagraph();
        closeList();
        output.push(`<blockquote><p>${renderMarkdownInline(quote[1])}</p></blockquote>`);
      } else if (!line.trim()) {
        flushParagraph();
        closeList();
      } else {
        closeList();
        paragraph.push(line.trim());
      }
    });

    if (inCode && code.length) {
      output.push(`<pre class="codeblock"><code>${escapeHTML(code.join('\n'))}</code></pre>`);
    }
    flushParagraph();
    closeList();
    return output.join('');
  }

  function renderMarkdownInline(value) {
    const links = [];
    let html = escapeHTML(value).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
      const safeHref = /^(https?:\/\/|#|\/)/.test(href) ? href : '#';
      const token = `@@MYCO_LINK_${links.length}@@`;
      links.push(`<a href="${safeHref}">${label}</a>`);
      return token;
    });

    html = html
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/__([^_]+)__/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/_([^_]+)_/g, '<em>$1</em>');

    links.forEach((link, index) => {
      html = html.replace(`@@MYCO_LINK_${index}@@`, link);
    });
    return html;
  }

  function getDragAfterElement(container, y) {
    const blocks = [...container.querySelectorAll(':scope > .canvas-block:not(.canvas-block--dragging)')];

    return blocks.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > (closest.offset || -Infinity)) {
        return { offset, element: child };
      }
      return closest;
    }, {}).element;
  }

  function clearDropIndicators() {
    document.querySelectorAll('.canvas-block--drop-before').forEach(el =>
      el.classList.remove('canvas-block--drop-before')
    );
    document.querySelectorAll('.constructor-drop-zone--active').forEach(el =>
      el.classList.remove('constructor-drop-zone--active')
    );
    document.getElementById('block-canvas')?.classList.remove('canvas--drop-end');
  }

  function updateEmptyState() {
    const canvas = document.getElementById('block-canvas');
    const empty = document.getElementById('canvas-empty');
    if (canvas && empty) {
      empty.style.display = canvas.querySelectorAll('.canvas-block').length === 0 ? '' : 'none';
    }
  }

  function moveBlock(btn, direction) {
    const block = btn.closest('.canvas-block');
    if (!block) return;

    const parent = block.parentElement;
    if (direction === -1 && block.previousElementSibling &&
        block.previousElementSibling.classList.contains('canvas-block')) {
      parent.insertBefore(block, block.previousElementSibling);
    } else if (direction === 1 && block.nextElementSibling &&
               block.nextElementSibling.classList.contains('canvas-block')) {
      parent.insertBefore(block.nextElementSibling, block);
    }
  }

  function removeBlock(btn) {
    const block = btn.closest('.canvas-block');
    if (block) {
      block.style.animation = 'blockFadeOut 0.2s ease forwards';
      setTimeout(() => {
        block.remove();
        updateEmptyState();
      }, 200);
    }
  }

  function renderSchemeSelector() {
    const container = document.getElementById('scheme-selector');
    if (!container) return;

    Object.entries(SCHEMES).forEach(([key, scheme]) => {
      const btn = document.createElement('button');
      btn.className = 'scheme-btn' + (key === activeScheme ? ' scheme-btn--active' : '');
      btn.type = 'button';
      btn.setAttribute('data-scheme', key);
      btn.title = scheme.label;
      btn.style.setProperty('--scheme-color', scheme.primary);
      btn.innerHTML = `<span class="scheme-btn__swatch"></span><span class="scheme-btn__label">${scheme.label}</span>`;

      btn.addEventListener('click', () => {
        applyScheme(key);
        document.querySelectorAll('.scheme-btn').forEach(b => b.classList.remove('scheme-btn--active'));
        btn.classList.add('scheme-btn--active');
      });

      container.appendChild(btn);
    });
  }

  function applyScheme(key) {
    const scheme = SCHEMES[key];
    if (!scheme) return;
    const root = document.documentElement;
    const explicitTheme = root.getAttribute('data-theme');
    const dark = explicitTheme === 'dark' || (!explicitTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const primary = dark && scheme.primaryDark ? scheme.primaryDark : scheme.primary;
    const primaryHover = dark && scheme.primaryHoverDark ? scheme.primaryHoverDark : scheme.primaryHover;
    root.style.setProperty('--myco-primary', primary);
    root.style.setProperty('--myco-primary-hover', primaryHover);
    root.style.setProperty('--myco-primary-light', dark && scheme.primaryLightDark ? scheme.primaryLightDark : scheme.primaryLight);
    root.style.setProperty('--myco-primary-subtle', primary + '14');
    root.style.setProperty('--myco-link', primary);
    root.style.setProperty('--myco-secondary', primaryHover);
    activeScheme = key;
    try {
      localStorage.setItem('myco-scheme', key);
    } catch {}
  }

  function restoreTheme() {
    try {
      const savedTheme = localStorage.getItem('myco-theme');
      const savedScheme = localStorage.getItem('myco-scheme');
      if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedScheme && SCHEMES[savedScheme]) activeScheme = savedScheme;
    } catch {}
  }

  function bindThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme') ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try {
        localStorage.setItem('myco-theme', next);
      } catch {}
      updateThemeButton(toggle, next);
      applyScheme(activeScheme);
    });

    (function setInitial() {
      const html = document.documentElement;
      const cur = html.getAttribute('data-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      updateThemeButton(toggle, cur);
      applyScheme(activeScheme);
    })();
  }

  function updateThemeButton(toggle, theme) {
    const nextLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    toggle.innerHTML = renderIcon(theme === 'dark' ? 'sun' : 'moon');
    toggle.setAttribute('aria-label', nextLabel);
    toggle.title = nextLabel;
  }

  function bindExport() {
    const btn = document.getElementById('export-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const canvas = document.getElementById('block-canvas');
      if (!canvas) return;

      
      const clone = canvas.cloneNode(true);

      clone.querySelectorAll('#canvas-empty, .constructor-canvas__empty').forEach(el => el.remove());
      clone.querySelectorAll('.canvas-block__toolbar').forEach(el => el.remove());
      clone.querySelectorAll('.codeblock__copy').forEach(el => el.remove());
      clone.querySelectorAll('.codeblock--copyable').forEach(el => {
        el.classList.remove('codeblock--copyable');
      });
      clone.querySelectorAll('.markdown-editor').forEach(editor => {
        const preview = editor.querySelector('.markdown-editor__preview');
        if (preview) editor.replaceWith(...preview.childNodes);
      });
      clone.querySelectorAll('[contenteditable], [data-editable], [spellcheck]').forEach(el => {
        el.removeAttribute('contenteditable');
        el.removeAttribute('data-editable');
        el.removeAttribute('spellcheck');
      });

      clone.querySelectorAll('.constructor-drop-zone').forEach(zone => {
        while (zone.firstChild) {
          zone.parentNode.insertBefore(zone.firstChild, zone);
        }
        zone.remove();
      });

      clone.querySelectorAll('.canvas-block').forEach(block => {
        const content = block.querySelector(':scope > .canvas-block__content');
        if (content) {
          while (content.firstChild) {
            block.parentNode.insertBefore(content.firstChild, block);
          }
        }
        block.remove();
      });

      clone.querySelectorAll('.constructor-block').forEach(el => {
        const parent = el.parentNode;
        while (el.firstChild) {
          parent.insertBefore(el.firstChild, el);
        }
        el.remove();
      });

      
      let html = clone.innerHTML.trim();
      
      html = html.replace(/>\s+</g, '>\n<');

      
      const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My Page — Myco.css</title>
  <link rel="stylesheet" href="css/myco.css">
</head>
<body>
<main class="main-width">
${html}
</main>
</body>
</html>`;

      
      showExportModal(fullHTML);
    });
  }

  function showExportModal(html) {
    const existing = document.getElementById('export-modal');
    if (existing) existing.remove();
    const existingBackdrop = document.getElementById('export-backdrop');
    if (existingBackdrop) existingBackdrop.remove();

    const previouslyFocused = document.activeElement;
    const backdrop = document.createElement('div');
    backdrop.id = 'export-backdrop';
    backdrop.className = 'dialog-backdrop';
    backdrop.addEventListener('click', closeModal);

    const modal = document.createElement('div');
    modal.id = 'export-modal';
    modal.className = 'dialog';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'export-modal-title');
    modal.innerHTML = `
      <div class="dialog__header">
        <h2 class="dialog__title" id="export-modal-title">Exported HTML</h2>
        <button type="button" class="dialog__close-button" id="close-export-btn" aria-label="Close export dialog">${renderIcon('close')}</button>
      </div>
      <div class="dialog__content">
        <pre class="codeblock dialog__code"><code>${escapeHTML(html)}</code></pre>
        <div class="btn-group dialog__actions">
          <button type="button" class="btn btn_accent" id="copy-export-btn">Copy to Clipboard</button>
          <button type="button" class="btn" id="download-export-btn">Download HTML</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    function closeModal() {
      modal.remove();
      backdrop.remove();
      document.removeEventListener('keydown', handleModalKeydown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
    }

    function handleModalKeydown(event) {
      if (event.key === 'Escape') closeModal();
    }

    document.getElementById('close-export-btn').addEventListener('click', closeModal);
    document.addEventListener('keydown', handleModalKeydown);
    document.getElementById('close-export-btn').focus();

    document.getElementById('copy-export-btn').addEventListener('click', async () => {
      const btn = document.getElementById('copy-export-btn');
      try {
        await navigator.clipboard.writeText(html);
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = 'Copy to Clipboard'; }, 2000);
      } catch (_) {
        btn.textContent = 'Copy failed — select the code';
        setTimeout(() => { btn.textContent = 'Copy to Clipboard'; }, 2500);
      }
    });

    document.getElementById('download-export-btn').addEventListener('click', () => {
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'myco-page.html';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.MycoConstructor = {
    addBlock,
    moveBlock,
    removeBlock
  };

})();

(function () {
  'use strict';

  const LANGUAGE_RULES = {
    ocaml: {
      keywords: /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|false|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|object|of|open|or|private|rec|sig|struct|then|to|true|try|type|val|virtual|when|while|with)\b/g,
      types: /\b(?:bool|bytes|char|exn|float|int|int32|int64|list|nativeint|option|result|string|unit)\b/g,
      comments: /\(\*[\s\S]*?\*\)/g
    },
    c: {
      keywords: /\b(?:break|case|const|continue|default|do|else|enum|extern|for|goto|if|inline|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g,
      types: /\b(?:bool|char|double|float|int|int8_t|int16_t|int32_t|int64_t|long|short|signed|size_t|uint8_t|uint16_t|uint32_t|uint64_t|unsigned|void)\b/g,
      comments: /\/\*[\s\S]*?\*\/|\/\/[^\n]*/g
    }
  };

  function escapeHTML(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function collectMatches(source, regex, className, priority, matches) {
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(source))) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        value: match[0],
        className,
        priority
      });

      if (match[0].length === 0) regex.lastIndex += 1;
    }
  }

  function highlightSource(source, language) {
    const rules = LANGUAGE_RULES[language] || LANGUAGE_RULES.ocaml;
    const matches = [];
    collectMatches(source, rules.comments, 'comment', 10, matches);
    collectMatches(source, /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, 'string', 9, matches);
    collectMatches(source, rules.keywords, 'keyword', 5, matches);
    collectMatches(source, rules.types, 'type', 5, matches);
    collectMatches(source, /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?)\b/g, 'number', 4, matches);
    collectMatches(source, /\b[A-Z][A-Za-z0-9_]*\b/g, 'constructor', 3, matches);
    collectMatches(source, /(?:->|=>|:=|::|<>|<=|>=|&&|\|\||[|=<>:+\-*\/])/g, 'operator', 2, matches);

    matches.sort(function (a, b) {
      return a.start - b.start || b.priority - a.priority || b.end - a.end;
    });

    let cursor = 0;
    let html = '';

    matches.forEach(function (token) {
      if (token.start < cursor) return;

      html += escapeHTML(source.slice(cursor, token.start));
      html += `<span class="syntax syntax--${token.className}">${escapeHTML(token.value)}</span>`;
      cursor = token.end;
    });
    return html + escapeHTML(source.slice(cursor));
  }

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    const copied = document.execCommand('copy');
    textarea.remove();

    if (!copied) throw new Error('Unable to copy code');
  }

  function decorateCodeBlock(code) {
    const block = code.closest('pre.codeblock');
    if (!block || block.querySelector('.codeblock__copy')) return;

    const button = document.createElement('button');
    const icon = window.MycoIcons ? window.MycoIcons.svg('copy') : '';

    button.type = 'button';
    button.className = 'btn codeblock__copy';
    button.setAttribute('aria-label', 'Копировать код');
    button.innerHTML = `${icon}<span>Копировать</span>`;
    block.classList.add('codeblock--copyable');
    block.prepend(button);

    button.addEventListener('click', async function () {
      try {
        await copyText(code.textContent);
        button.classList.add('codeblock__copy--success');
        button.querySelector('span').textContent = 'Скопировано';
      } catch (_) {
        button.querySelector('span').textContent = 'Не удалось';
      }

      window.setTimeout(function () {
        button.classList.remove('codeblock__copy--success');
        button.querySelector('span').textContent = 'Копировать';
      }, 1800);
    });
  }

  function highlight(root) {
    const scope = root || document;

    scope.querySelectorAll('pre.codeblock code[class*="language-"]').forEach(function (code) {
      if (code.dataset.highlighted !== 'true') {
        const languageClass = Array.from(code.classList).find(function (name) {
          return name.indexOf('language-') === 0;
        });
        const language = languageClass ? languageClass.slice(9) : 'ocaml';

        code.innerHTML = highlightSource(code.textContent, language);
        code.dataset.highlighted = 'true';
      }

      decorateCodeBlock(code);
    });
  }

  window.MycoHighlight = { highlight: highlight };
  highlight(document);
})();

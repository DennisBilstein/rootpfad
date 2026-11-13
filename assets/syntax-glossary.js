/* Syntax-Glossar: Nachschlagewerk für Befehle und Schreibweisen aller Kurssprachen.
   Daten: assets/syntax-glossary-data.js (RP_GLOSSARY, wird beim ersten Öffnen nachgeladen), erzeugt von scripts/build-syntax-glossary.mjs.
   Es werden keine Daten gespeichert; Sprache, Suche und Kategorie gelten nur bis zum Neuladen. */
(function(){
  var view = { lang: null, query: '', cat: '', all: false };
  var MAX_ALL = 60;

  function data(){ return window.RP_GLOSSARY || []; }
  // Die Daten sind groß (über 500 KB) und werden erst beim Öffnen des Glossars nachgeladen, nicht beim Start der App.
  function ensureData(){
    if(data().length) return Promise.resolve();
    return rpLoadScriptOnce('assets/syntax-glossary-data.js').catch(function(){ throw new Error('Glossardaten konnten nicht geladen werden.'); });
  }
  function langById(id){ return data().filter(function(l){ return l.id === id; })[0] || data()[0]; }
  function norm(text){ return String(text || '').toLowerCase(); }

  function haystack(entry){
    if(!entry._hay) entry._hay = norm([entry.term, entry.syntax, entry.cat, entry.text, entry.code].join(' '));
    return entry._hay;
  }

  function score(entry, tokens){
    var title = norm(entry.term + ' ' + entry.syntax), total = 0;
    for(var i = 0; i < tokens.length; i++){
      if(haystack(entry).indexOf(tokens[i]) < 0) return -1;
      total += title.indexOf(tokens[i]) >= 0 ? 3 : 1;
    }
    return total;
  }

  function results(){
    var tokens = norm(view.query).split(/\s+/).filter(Boolean);
    var languages = view.all && tokens.length ? data() : [langById(view.lang)];
    var list = [];
    languages.forEach(function(language){
      language.entries.forEach(function(entry, index){
        if(!(view.all && tokens.length) && view.cat && entry.cat !== view.cat) return;
        var points = tokens.length ? score(entry, tokens) : 0;
        if(points < 0) return;
        list.push({ entry: entry, language: language, points: points, order: index });
      });
    });
    if(tokens.length) list.sort(function(a, b){ return b.points - a.points || a.order - b.order; });
    return list;
  }

  function entryHtml(item, showLanguage){
    var entry = item.entry, language = item.language, codeLang = entry.codeLang || language.codeLang;
    var lesson = entry.lesson && typeof lessonById === 'function' ? lessonById(entry.lesson) : null;
    var html = '<article class="gl-entry" id="gl-' + esc(entry.id) + '" aria-labelledby="gl-h-' + esc(entry.id) + '">';
    html += '<h3 id="gl-h-' + esc(entry.id) + '"><code>' + esc(entry.term) + '</code></h3>';
    html += '<p class="gl-meta">' + (showLanguage ? esc(language.label) + ' · ' : '') + esc(entry.cat) + '</p>';
    html += '<pre class="gl-syntax" tabindex="0" data-language="' + esc(codeLang) + '">' + esc(entry.syntax) + '</pre>';
    html += '<p>' + esc(entry.text) + '</p>';
    if(entry.setup) html += '<details class="gl-setup"><summary>Ausgangsdaten anzeigen</summary><pre tabindex="0" data-language="' + esc(codeLang) + '">' + esc(entry.setup) + '</pre></details>';
    html += '<p class="gl-label">Beispiel</p><pre class="gl-example" tabindex="0" data-language="' + esc(codeLang) + '">' + esc(entry.code) + '</pre>';
    if(entry.out !== undefined) html += '<p class="gl-label">Ausgabe</p><pre class="gl-out" tabindex="0">' + esc(entry.out) + '</pre>';
    if(entry.pitfall) html += '<p class="gl-pitfall"><strong>Achtung:</strong> ' + esc(entry.pitfall) + '</p>';
    html += '<p class="gl-foot"><span class="gl-badge' + (entry.tested ? ' gl-badge-ok' : '') + '">' +
      (entry.tested ? 'Beispiel getestet mit ' + esc(language.runner) : 'Beispiel nicht ausgeführt') + '</span>';
    if(lesson) html += ' <button type="button" class="gl-lesson" data-lesson="' + esc(entry.lesson) + '">Zur Lektion: ' + esc(lesson.title) + '</button>';
    return html + '</p></article>';
  }

  function categoryOptions(language){
    var seen = {}, html = '<option value="">Alle Kategorien</option>';
    language.entries.forEach(function(entry){
      if(seen[entry.cat]) return;
      seen[entry.cat] = true;
      html += '<option value="' + esc(entry.cat) + '"' + (view.cat === entry.cat ? ' selected' : '') + '>' + esc(entry.cat) + '</option>';
    });
    return html;
  }

  function paint(root){
    var language = langById(view.lang), searching = view.all && view.query.trim() !== '';
    var items = results(), shown = searching ? items.slice(0, MAX_ALL) : items;
    var list = root.querySelector('#glList'), status = root.querySelector('#glStatus');
    list.innerHTML = shown.map(function(item){ return entryHtml(item, searching); }).join('');
    if(!items.length) status.textContent = 'Keine Treffer. Andere Schreibweise oder „In allen Sprachen suchen“ versuchen.';
    else if(searching) status.textContent = items.length + ' Treffer in allen Sprachen' + (items.length > shown.length ? ' (die ersten ' + shown.length + ' werden gezeigt)' : '') + '.';
    else status.textContent = items.length + (items.length === 1 ? ' Eintrag' : ' Einträge') + ' in ' + language.label + (view.query.trim() ? ' für „' + view.query.trim() + '“' : '') + '.';
    root.querySelector('#glNotice').textContent = searching ? '' : (language.notice || '');
    root.querySelector('#glNotice').hidden = searching || !language.notice;
    root.querySelector('#glCat').disabled = searching;
    if(typeof rpColorCode === 'function') rpColorCode(list);
  }

  window.rpGlossaryRender = function(){
    if(!data().length) return '<div class="breadcrumb">Referenz</div><h1>Syntax-Glossar</h1><p id="glLoading" role="status">Glossar wird geladen …</p>';
    if(!view.lang) view.lang = data()[0].id;
    var language = langById(view.lang);
    var total = data().reduce(function(sum, l){ return sum + l.entries.length; }, 0);
    var buttons = data().map(function(l){
      return '<button type="button" class="gl-lang" data-lang="' + esc(l.id) + '" aria-pressed="' + (l.id === view.lang) + '">' + esc(l.label) + '</button>';
    }).join('');
    return '<div class="breadcrumb">Referenz</div><h1>Syntax-Glossar</h1>' +
      '<p class="intro-sub">Befehle und Schreibweisen aller Sprachen dieses Kurses zum Nachschlagen: ' + total + ' Einträge mit Erklärung, Beispiel, typischem Fehler und Link zur passenden Lektion.</p>' +
      '<section class="gl-controls" aria-label="Glossar filtern">' +
        '<div role="group" aria-labelledby="glLangLabel"><p class="gl-label" id="glLangLabel">Sprache</p><div class="gl-langs">' + buttons + '</div></div>' +
        '<div class="gl-fields">' +
          '<div><label for="glSearch">Befehl suchen</label><input id="glSearch" type="search" value="' + esc(view.query) + '" placeholder="z. B. const, JOIN, rebase" autocomplete="off" spellcheck="false"></div>' +
          '<div><label for="glCat">Kategorie</label><select id="glCat">' + categoryOptions(language) + '</select></div>' +
        '</div>' +
        '<label class="gl-check"><input type="checkbox" id="glAll"' + (view.all ? ' checked' : '') + '> In allen Sprachen suchen</label>' +
      '</section>' +
      '<p id="glStatus" class="gl-status" role="status"></p>' +
      '<p id="glNotice" class="gl-notice" hidden></p>' +
      '<div id="glList"></div>';
  };

  window.rpGlossaryWire = function(root){
    if(!data().length){
      ensureData().then(function(){
        if(root.querySelector('#glLoading')){ root.innerHTML = window.rpGlossaryRender(); window.rpGlossaryWire(root); }
      }, function(error){
        var info = root.querySelector('#glLoading');
        if(info){ info.setAttribute('role', 'alert'); info.textContent = error.message + ' Bitte die Seite neu laden.'; }
      });
      return;
    }
    var search = root.querySelector('#glSearch'), cat = root.querySelector('#glCat'), all = root.querySelector('#glAll');
    var timer = 0;
    paint(root);

    root.querySelectorAll('.gl-lang').forEach(function(button){
      button.addEventListener('click', function(){
        view.lang = button.getAttribute('data-lang'); view.cat = '';
        root.querySelectorAll('.gl-lang').forEach(function(other){ other.setAttribute('aria-pressed', String(other === button)); });
        cat.innerHTML = categoryOptions(langById(view.lang));
        paint(root);
      });
    });
    search.addEventListener('input', function(){
      view.query = search.value;
      clearTimeout(timer);
      timer = setTimeout(function(){ paint(root); }, 120);
    });
    cat.addEventListener('change', function(){ view.cat = cat.value; paint(root); });
    all.addEventListener('change', function(){ view.all = all.checked; paint(root); });
    root.querySelector('#glList').addEventListener('click', function(event){
      var button = event.target.closest('.gl-lesson');
      if(button) selectLesson(button.getAttribute('data-lesson'));
    });
  };
})();

/* Videos zu Lektionen: Zwei-Klick-Einbettung. Vor dem Klick gibt es keine Anfrage an Dritte (kein Vorschaubild
   von YouTube); erst der Klick auf „Video laden“ erzeugt den iframe auf youtube-nocookie.com. Daten: lesson-videos-data.js. */
(function(){
  var EMBED_ORIGIN = 'https://www.youtube-nocookie.com';
  var LANGUAGES = { en: 'Englisch', de: 'Deutsch' };
  function escapeHtml(value){
    return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  window.rpVideoSection = function(lessonId){
    var videos = (window.RP_LESSON_VIDEOS || {})[lessonId];
    if(!videos || !videos.length) return '';
    var html = '<section class="rp-videos" aria-labelledby="rpVideosHeading">' +
      '<h2 id="rpVideosHeading">Zum Weiterlernen: ' + (videos.length > 1 ? 'Videos' : 'Video') + '</h2>' +
      '<p class="rp-video-hint">Freie Videos Dritter, zusätzlich zur Lektion. Sie wurden nicht von ROOTPFAD inhaltlich geprüft und können vom Stand der Lektion abweichen.</p>';
    videos.forEach(function(video, index){
      var watchUrl = 'https://www.youtube.com/watch?v=' + encodeURIComponent(video.id);
      var noteId = 'rpVideoNote_' + lessonId + '_' + index;
      html += '<article class="rp-video" data-video-id="' + escapeHtml(video.id) + '">' +
        '<h3>' + escapeHtml(video.title) + '</h3>' +
        '<p class="rp-video-meta">' + escapeHtml(video.channel) + ' · ' + escapeHtml(LANGUAGES[video.language] || video.language) + '</p>' +
        '<p id="' + noteId + '" class="rp-video-note">' + escapeHtml(video.note) + '</p>' +
        '<div class="rp-video-stage" data-stage>' +
          '<p class="rp-video-privacy">Beim Laden werden Daten (u. a. deine IP-Adresse) an YouTube (Google) übertragen. Bis du klickst, passiert nichts.</p>' +
          '<div class="rp-video-actions">' +
            '<button type="button" class="rp-video-load" data-rp-video-load aria-describedby="' + noteId + '">Video laden: ' + escapeHtml(video.title) + '</button>' +
            '<a href="' + watchUrl + '" target="_blank" rel="noopener noreferrer">Auf YouTube öffnen</a>' +
          '</div>' +
        '</div></article>';
    });
    return html + '</section>';
  };

  document.addEventListener('click', function(event){
    var button = event.target.closest && event.target.closest('[data-rp-video-load]');
    if(!button) return;
    var card = button.closest('.rp-video');
    var stage = card && card.querySelector('[data-stage]');
    var id = card && card.getAttribute('data-video-id');
    if(!stage || !/^[A-Za-z0-9_-]{11}$/.test(id || '')) return;
    var frame = document.createElement('iframe');
    frame.src = EMBED_ORIGIN + '/embed/' + id + '?rel=0';
    frame.title = card.querySelector('h3').textContent;
    frame.loading = 'lazy';
    frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    /* Die App sendet sonst kein Referrer; YouTube verlangt für Einbettungen eine Herkunftsangabe. */
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.className = 'rp-video-frame';
    stage.replaceChildren(frame);
    frame.focus();
  });
})();

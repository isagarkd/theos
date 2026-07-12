/* Theos — page transitions. Internal pages load behind an ink curtain that
   peels away in staggered columns; clicking any internal link plays the
   reverse wipe before navigating. Reduced motion skips it all. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  var COLS = 5;
  var overlay = document.createElement('div');
  overlay.className = 'pt';
  overlay.setAttribute('aria-hidden', 'true');
  for (var i = 0; i < COLS; i++) {
    var c = document.createElement('span');
    c.style.setProperty('--i', i);
    overlay.appendChild(c);
  }
  document.body.appendChild(overlay);

  /* entrance: only on internal pages (body.pg) */
  if (document.body.classList.contains('pg')) {
    overlay.classList.add('pt-cover');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('pt-out');
        setTimeout(function () { overlay.classList.remove('pt-cover', 'pt-out'); }, 900);
      });
    });
  }

  /* exit: intercept internal navigation */
  document.addEventListener('click', function (e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.indexOf('#') === 0 || href.indexOf('mailto:') === 0 || a.target === '_blank') return;
    if (!/\.html(\?|#|$)/.test(href)) return;
    e.preventDefault();
    overlay.classList.add('pt-cover', 'pt-in');
    if (window.__theosAudio) window.__theosAudio.click();
    setTimeout(function () { window.location.href = href; }, 620);
  });

  /* hero backdrop word parallax */
  var bgWord = document.querySelector('.pg-bg-word');
  if (bgWord && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 30;
      var y = (e.clientY / window.innerHeight - 0.5) * 14;
      bgWord.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    }, { passive: true });
  }
})();

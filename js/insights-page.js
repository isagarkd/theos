/* Theos — Insights page: generative card art, filter, and an in-page detail
   view (grid morphs into the article; back returns). Progress bar + TOC. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* generative art (shared motifs with homepage) */
  function art(canvas, kind) {
    var w = canvas.width = 720, h = canvas.height = 420;
    var g = canvas.getContext('2d');
    var gr = g.createLinearGradient(0, 0, w, h);
    gr.addColorStop(0, '#241f1a'); gr.addColorStop(1, '#141210');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(203,191,175,0.05)';
    for (var x = 0.5; x < w; x += 40) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
    for (var y = 0.5; y < h; y += 40) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    if (kind === 0) {
      for (var i = 0; i < 26; i++) {
        var t0 = i / 26;
        g.strokeStyle = i === 13 ? 'rgba(243,109,31,0.9)' : 'rgba(210,200,186,' + (0.28 - t0 * 0.2) + ')';
        g.lineWidth = i === 13 ? 1.8 : 1;
        g.beginPath();
        g.moveTo(-10, t0 * h);
        g.bezierCurveTo(w * 0.4, t0 * h, w * 0.55, h * 0.5 + (t0 - 0.5) * h * 0.16, w + 10, h * 0.5 + (t0 - 0.5) * h * 0.1);
        g.stroke();
      }
      g.fillStyle = '#f36d1f'; g.beginPath(); g.arc(w * 0.82, h * 0.5, 7, 0, 7); g.fill();
    } else if (kind === 1) {
      var cx = w * 0.5, cy = h * 0.55;
      for (var r2 = 0; r2 < 5; r2++) {
        g.strokeStyle = 'rgba(210,200,186,' + (0.24 - r2 * 0.04) + ')';
        g.beginPath();
        for (var a = 0; a <= 64; a++) {
          var th = a / 64 * Math.PI * 2;
          var rad = 46 + r2 * 34 + Math.sin(th * 5 + r2 * 1.7) * (7 + r2 * 4);
          var px = cx + Math.cos(th) * rad * 1.25, py = cy + Math.sin(th) * rad * 0.8;
          if (a === 0) g.moveTo(px, py); else g.lineTo(px, py);
        }
        g.closePath(); g.stroke();
      }
      for (var n = 0; n < 26; n++) {
        var th2 = n / 26 * Math.PI * 2, rr = 46 + (n % 5) * 34;
        g.fillStyle = n === 7 ? '#f36d1f' : 'rgba(226,216,202,0.7)';
        g.beginPath(); g.arc(cx + Math.cos(th2) * rr * 1.25, cy + Math.sin(th2) * rr * 0.8, n === 7 ? 5 : 2, 0, 7); g.fill();
      }
    } else {
      for (var f = 7; f >= 0; f--) {
        var s = 1 - f * 0.11;
        var fw = w * 0.62 * s, fh = h * 0.6 * s;
        var fx = w * 0.5 - fw / 2 + f * 14, fy = h * 0.5 - fh / 2 - f * 6;
        g.strokeStyle = f === 0 ? 'rgba(243,109,31,0.85)' : 'rgba(210,200,186,' + (0.3 - f * 0.034) + ')';
        g.lineWidth = f === 0 ? 1.6 : 1;
        g.strokeRect(fx, fy, fw, fh);
      }
    }
    var v = g.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, w * 0.75);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.42)');
    g.fillStyle = v; g.fillRect(0, 0, w, h);
  }
  [].forEach.call(document.querySelectorAll('.inp-art'), function (c, i) { art(c, i); });

  /* filter */
  var search = document.querySelector('.inp-search input');
  var chips = [].slice.call(document.querySelectorAll('.ins-chip'));
  var cards = [].slice.call(document.querySelectorAll('.inp-card'));
  var activeCat = '';
  function applyFilter() {
    var q = (search ? search.value : '').toLowerCase();
    cards.forEach(function (c) {
      var hay = ((c.getAttribute('data-tags') || '') + ' ' + c.querySelector('h2').textContent).toLowerCase();
      var ok = (!q || hay.indexOf(q) >= 0) && (!activeCat || c.getAttribute('data-cat') === activeCat);
      c.classList.toggle('gone', !ok);
    });
  }
  if (search) search.addEventListener('input', applyFilter);
  chips.forEach(function (ch) {
    ch.addEventListener('click', function () {
      var cat = ch.getAttribute('data-cat');
      activeCat = activeCat === cat ? '' : cat;
      chips.forEach(function (c2) { c2.classList.toggle('on', c2.getAttribute('data-cat') === activeCat); });
      applyFilter();
    });
  });

  /* in-page detail view */
  var grid = document.getElementById('inp-grid');
  var hero = document.getElementById('inp-hero');
  var detail = document.getElementById('inp-detail');
  var dBody = detail.querySelector('.inp-article');
  var dToc = detail.querySelector('.inp-toc');
  var prog = document.querySelector('.inp-prog i');

  function openDetail(id, push) {
    var src = document.getElementById(id);
    if (!src) return;
    dBody.innerHTML = src.innerHTML;
    dToc.innerHTML = '';
    [].forEach.call(dBody.querySelectorAll('h3'), function (h, i) {
      h.id = 'sec-' + i;
      var a = document.createElement('a');
      a.href = '#sec-' + i;
      a.textContent = h.textContent;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: h.getBoundingClientRect().top + window.scrollY - 110, behavior: reduced ? 'auto' : 'smooth' });
      });
      dToc.appendChild(a);
    });
    grid.classList.add('hide');
    hero.classList.add('hide');
    detail.classList.add('show');
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    if (push) history.pushState({ a: id }, '', '#' + id);
    if (window.__theosAudio) window.__theosAudio.click();
  }
  function closeDetail(push) {
    detail.classList.remove('show');
    grid.classList.remove('hide');
    hero.classList.remove('hide');
    if (push) history.pushState({}, '', location.pathname);
  }
  cards.forEach(function (c) {
    c.addEventListener('click', function () { openDetail(c.getAttribute('data-article'), true); });
    c.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(c.getAttribute('data-article'), true); }
    });
  });
  detail.querySelector('.inp-back').addEventListener('click', function () { closeDetail(true); });
  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.a) openDetail(e.state.a, false); else closeDetail(false);
  });
  if (location.hash && document.getElementById(location.hash.slice(1))) {
    openDetail(location.hash.slice(1), false);
  }

  /* reading progress (page scroll) */
  window.addEventListener('scroll', function () {
    if (!detail.classList.contains('show') || !prog) return;
    var m = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.transform = 'scaleX(' + (m > 0 ? window.scrollY / m : 0) + ')';
  }, { passive: true });

  /* copy link */
  var copyBtn = detail.querySelector('.inp-copylink');
  copyBtn.addEventListener('click', function () {
    if (navigator.clipboard) navigator.clipboard.writeText(location.href);
    copyBtn.textContent = 'Copied';
    setTimeout(function () { copyBtn.textContent = 'Copy link'; }, 1800);
  });
})();

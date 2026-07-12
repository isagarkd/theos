/* Theos — Insights: pinned editorial choreography, neural background,
   generative card art, search/filter, and an in-page reading mode with
   progress + table of contents. Vanilla, 60fps, reduced-motion safe. */
(function () {
  var section = document.getElementById('insights');
  if (!section) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 900px)').matches;

  /* ---------------- generative card art ---------------- */
  function art(canvas, kind) {
    var w = canvas.width = 640, h = canvas.height = 400;
    var g = canvas.getContext('2d');
    var gr = g.createLinearGradient(0, 0, w, h);
    gr.addColorStop(0, '#fdfbf8'); gr.addColorStop(1, '#efe9e1');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(62,54,46,0.06)';
    for (var x = 0.5; x < w; x += 40) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
    for (var y = 0.5; y < h; y += 40) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    if (kind === 0) {
      /* collapsing attention funnel — light trails converging */
      for (var i = 0; i < 26; i++) {
        var t0 = i / 26;
        g.strokeStyle = i === 13 ? 'rgba(243,109,31,0.9)' : 'rgba(74,64,54,' + (0.3 - t0 * 0.22) + ')';
        g.lineWidth = i === 13 ? 1.8 : 1;
        g.beginPath();
        g.moveTo(-10, t0 * h);
        g.bezierCurveTo(w * 0.4, t0 * h, w * 0.55, h * 0.5 + (t0 - 0.5) * h * 0.16, w + 10, h * 0.5 + (t0 - 0.5) * h * 0.1);
        g.stroke();
      }
      g.fillStyle = '#f36d1f'; g.beginPath(); g.arc(w * 0.82, h * 0.5, 7, 0, 7); g.fill();
    } else if (kind === 1) {
      /* humane AI — organic node bloom */
      var cx = w * 0.5, cy = h * 0.55;
      for (var r2 = 0; r2 < 5; r2++) {
        g.strokeStyle = 'rgba(74,64,54,' + (0.26 - r2 * 0.045) + ')';
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
        var th2 = n / 26 * Math.PI * 2;
        var rr = 46 + (n % 5) * 34;
        g.fillStyle = n === 7 ? '#f36d1f' : 'rgba(74,64,54,0.55)';
        g.beginPath(); g.arc(cx + Math.cos(th2) * rr * 1.25, cy + Math.sin(th2) * rr * 0.8, n === 7 ? 5 : 2, 0, 7); g.fill();
      }
    } else {
      /* beyond screens — receding spatial frames */
      for (var f = 7; f >= 0; f--) {
        var s = 1 - f * 0.11;
        var fw = w * 0.62 * s, fh = h * 0.6 * s;
        var fx = w * 0.5 - fw / 2 + f * 14, fy = h * 0.5 - fh / 2 - f * 6;
        g.strokeStyle = f === 0 ? 'rgba(243,109,31,0.85)' : 'rgba(74,64,54,' + (0.32 - f * 0.037) + ')';
        g.lineWidth = f === 0 ? 1.6 : 1;
        g.strokeRect(fx, fy, fw, fh);
      }
      g.setLineDash([4, 6]);
      g.strokeStyle = 'rgba(74,64,54,0.4)';
      g.beginPath(); g.moveTo(w * 0.19, h * 0.2); g.lineTo(w * 0.81, h * 0.86); g.stroke();
      g.setLineDash([]);
    }
    /* vignette */
    var v = g.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, w * 0.75);
    v.addColorStop(0, 'rgba(255,252,248,0)'); v.addColorStop(1, 'rgba(236,229,220,0.55)');
    g.fillStyle = v; g.fillRect(0, 0, w, h);
  }
  [].forEach.call(section.querySelectorAll('.ins-art'), function (c, i) { art(c, i); });

  /* ---------------- neural background ---------------- */
  var bg = section.querySelector('.ins-bg');
  if (bg && !reduced) {
    var bgtx = bg.getContext('2d');
    var BW = 0, BH = 0;
    function sizeBg() {
      var r = bg.parentElement.getBoundingClientRect();
      BW = bg.width = Math.floor(r.width);
      BH = bg.height = Math.floor(r.height);
    }
    sizeBg();
    window.addEventListener('resize', sizeBg);
    var NB = isMobile ? 22 : 44;
    var nodes = [];
    for (var i = 0; i < NB; i++) {
      nodes.push({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00016, vy: (Math.random() - 0.5) * 0.00016, tw: Math.random() * 7 });
    }
    var insVisible = false;
    new IntersectionObserver(function (en) { insVisible = en[0].isIntersecting; }).observe(section);
    (function bgFrame() {
      requestAnimationFrame(bgFrame);
      if (!insVisible || document.hidden) return;
      var t = performance.now() / 1000;
      bgtx.clearRect(0, 0, BW, BH);
      for (var a = 0; a < NB; a++) {
        var n1 = nodes[a];
        n1.x += n1.vx; n1.y += n1.vy;
        if (n1.x < 0 || n1.x > 1) n1.vx *= -1;
        if (n1.y < 0 || n1.y > 1) n1.vy *= -1;
      }
      bgtx.lineWidth = 0.7;
      for (a = 0; a < NB; a++) {
        for (var b = a + 1; b < NB; b++) {
          var dx = (nodes[a].x - nodes[b].x) * BW, dy = (nodes[a].y - nodes[b].y) * BH;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170) {
            bgtx.strokeStyle = 'rgba(70, 60, 50,' + (0.12 * (1 - d / 170)) + ')';
            bgtx.beginPath();
            bgtx.moveTo(nodes[a].x * BW, nodes[a].y * BH);
            bgtx.lineTo(nodes[b].x * BW, nodes[b].y * BH);
            bgtx.stroke();
          }
        }
      }
      for (a = 0; a < NB; a++) {
        var n = nodes[a];
        var pulse = 0.5 + 0.5 * Math.sin(t * 0.8 + n.tw);
        bgtx.fillStyle = a % 9 === 0 ? 'rgba(243,109,31,' + (0.4 + pulse * 0.3) + ')' : 'rgba(70, 60, 50,' + (0.2 + pulse * 0.18) + ')';
        bgtx.beginPath(); bgtx.arc(n.x * BW, n.y * BH, a % 9 === 0 ? 2.4 : 1.4, 0, 7); bgtx.fill();
      }
    })();
  }

  /* ---------------- scroll choreography ---------------- */
  var track = section.querySelector('.ins-track');
  var cards = [].slice.call(section.querySelectorAll('.ins-card'));
  var hero = section.querySelector('.ins-hero');
  var prog = section.querySelector('.ins-prog i');
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ez(t) { return t * t * (3 - 2 * t); }

  if (!reduced && !isMobile && track) {
    (function frame() {
      requestAnimationFrame(frame);
      if (document.hidden) return;
      var r = track.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var u = clamp01(-r.top / Math.max(1, r.height - window.innerHeight));
      if (prog) prog.style.transform = 'scaleX(' + u + ')';

      /* hero condenses 0 → 0.22 */
      var hu = ez(clamp01(u / 0.22));
      if (hero) {
        hero.style.transform = 'translateY(' + (-hu * 26) + 'px) scale(' + (1 - hu * 0.14) + ')';
        hero.style.opacity = 1 - hu * 0.25;
      }
      /* cards rise from depth, staggered 0.08 → 0.62 */
      for (var i = 0; i < cards.length; i++) {
        var t0 = 0.08 + i * 0.14;
        var cu = ez(clamp01((u - t0) / 0.26));
        var depth = 1 - cu;
        cards[i].style.opacity = cu;
        cards[i].style.transform =
          'translateY(' + (depth * 120) + 'px)' +
          ' scale(' + (0.82 + cu * 0.18) + ')';
        cards[i].style.filter = 'blur(' + (depth * 10) + 'px)';
      }
    })();
  } else {
    /* static/mobile: everything visible */
    cards.forEach(function (c) { c.style.opacity = 1; });
  }

  /* hover parallax + lighting */
  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--tilt', 'perspective(900px) rotateY(' + px * 4 + 'deg) rotateX(' + (-py * 3) + 'deg)');
        card.style.setProperty('--lx', (px * 100 + 50) + '%');
        card.style.setProperty('--ly', (py * 100 + 50) + '%');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--tilt', 'none');
      });
    });
  }

  /* ---------------- search + filter ---------------- */
  var search = section.querySelector('.ins-search input');
  var chips = [].slice.call(section.querySelectorAll('.ins-chip'));
  var activeCat = '';
  function applyFilter() {
    var q = (search ? search.value : '').toLowerCase();
    cards.forEach(function (c) {
      var hay = (c.getAttribute('data-tags') || '') + ' ' + c.querySelector('h3').textContent.toLowerCase();
      var okQ = !q || hay.toLowerCase().indexOf(q) >= 0;
      var okC = !activeCat || c.getAttribute('data-cat') === activeCat;
      c.classList.toggle('dim', !(okQ && okC));
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

  /* ---------------- reading mode ---------------- */
  var overlay = document.getElementById('ins-reader');
  var readerBody = overlay.querySelector('.rd-body');
  var readerToc = overlay.querySelector('.rd-toc');
  var readerProg = overlay.querySelector('.rd-prog i');
  var readerScroll = overlay.querySelector('.rd-scroll');

  function openReader(id) {
    var src = document.getElementById(id);
    if (!src) return;
    readerBody.innerHTML = src.innerHTML;
    /* build TOC from h3 */
    readerToc.innerHTML = '';
    [].forEach.call(readerBody.querySelectorAll('h3'), function (h, i) {
      h.id = id + '-h' + i;
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        readerScroll.scrollTo({ top: h.offsetTop - 80, behavior: reduced ? 'auto' : 'smooth' });
      });
      readerToc.appendChild(a);
    });
    overlay.classList.add('open');
    document.body.classList.add('rd-lock');
    readerScroll.scrollTop = 0;
    if (window.__theosAudio) window.__theosAudio.click();
  }
  function closeReader() {
    overlay.classList.remove('open');
    document.body.classList.remove('rd-lock');
  }
  [].forEach.call(section.querySelectorAll('[data-read]'), function (btn) {
    btn.addEventListener('click', function () { openReader(btn.getAttribute('data-read')); });
  });
  overlay.querySelector('.rd-close').addEventListener('click', closeReader);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeReader(); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeReader(); });
  readerScroll.addEventListener('scroll', function () {
    var m = readerScroll.scrollHeight - readerScroll.clientHeight;
    if (readerProg) readerProg.style.transform = 'scaleX(' + (m > 0 ? readerScroll.scrollTop / m : 0) + ')';
  }, { passive: true });
  overlay.querySelector('.rd-copy').addEventListener('click', function (e) {
    var u = location.href.split('#')[0] + '#insights';
    if (navigator.clipboard) navigator.clipboard.writeText(u);
    e.target.textContent = 'Copied';
    setTimeout(function () { e.target.textContent = 'Copy link'; }, 1800);
  });
})();

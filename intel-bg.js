/* THEOS — intelligence field. A quiet neural constellation behind Meet THEOS:
   drifting ember motes with proximity links, reacting gently to the cursor.
   Pauses off-screen; disabled for reduced motion. */
(function () {
  var section = document.getElementById('intelligence');
  if (!section) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'intel-bg';
  canvas.setAttribute('aria-hidden', 'true');
  section.style.position = 'relative';
  section.insertBefore(canvas, section.firstChild);
  var g = canvas.getContext('2d');

  var dpr = 1, w = 0, h = 0;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = section.clientWidth; h = section.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', size);
  size();
  /* the section grows when the conversation mounts — track its real size */
  if (window.ResizeObserver) new ResizeObserver(size).observe(section);

  /* far starfield layer */
  var STARS = 90;
  var stars = [];
  for (var s = 0; s < STARS; s++) {
    stars.push({ x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 0.9, tw: Math.random() * 6.28 });
  }

  var N = window.matchMedia('(max-width: 768px)').matches ? 34 : 64;
  var pts = [];
  for (var i = 0; i < N; i++) {
    pts.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.14,
      r: 1 + Math.random() * 1.6,
      ember: Math.random() < 0.18
    });
  }

  var mx = -1e4, my = -1e4;
  section.addEventListener('pointermove', function (e) {
    var r = section.getBoundingClientRect();
    mx = e.clientX - r.left; my = e.clientY - r.top;
  }, { passive: true });
  section.addEventListener('pointerleave', function () { mx = -1e4; my = -1e4; });

  var visible = false;
  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(section);

  var LINK = 130;
  (function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    g.clearRect(0, 0, w, h);

    /* stars twinkle slowly behind everything */
    var tt = performance.now() / 1000;
    for (var si = 0; si < STARS; si++) {
      var st = stars[si];
      var a = 0.1 + 0.14 * (0.5 + 0.5 * Math.sin(tt * 0.6 + st.tw));
      g.fillStyle = 'rgba(230, 222, 210,' + a + ')';
      g.fillRect(st.x * w, st.y * h, st.r, st.r);
    }

    for (var i = 0; i < N; i++) {
      var p = pts[i];
      /* gentle cursor repulsion */
      var dx = p.x - mx, dy = p.y - my;
      var d2 = dx * dx + dy * dy;
      if (d2 < 22500 && d2 > 1) {
        var d = Math.sqrt(d2);
        p.vx += (dx / d) * 0.035;
        p.vy += (dy / d) * 0.035;
      }
      p.vx *= 0.985; p.vy *= 0.985;
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
    }

    /* links */
    g.lineWidth = 0.6;
    for (i = 0; i < N; i++) {
      for (var j = i + 1; j < N; j++) {
        var ax = pts[i].x - pts[j].x, ay = pts[i].y - pts[j].y;
        if (Math.abs(ax) > LINK || Math.abs(ay) > LINK) continue;
        var dd = Math.sqrt(ax * ax + ay * ay);
        if (dd < LINK) {
          var a = (1 - dd / LINK) * 0.11;
          g.strokeStyle = 'rgba(214, 205, 194,' + a + ')';
          g.beginPath(); g.moveTo(pts[i].x, pts[i].y); g.lineTo(pts[j].x, pts[j].y); g.stroke();
        }
      }
    }

    /* motes */
    for (i = 0; i < N; i++) {
      var q = pts[i];
      g.fillStyle = q.ember ? 'rgba(243, 109, 31, 0.55)' : 'rgba(214, 205, 194, 0.34)';
      g.beginPath(); g.arc(q.x, q.y, q.r, 0, 7); g.fill();
    }
  })();
})();

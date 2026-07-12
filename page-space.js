/* Theos — internal page space-tech backdrop. A fixed canvas behind content:
   drifting starfield with depth, an ember nebula pulse, and a faint
   perspective grid that recedes as you scroll. Scroll drives the star drift.
   Pauses when the tab is hidden; disabled for reduced motion. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !document.body.classList.contains('pg')) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'pg-space';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(canvas, document.body.firstChild);
  var g = canvas.getContext('2d');

  var dpr = 1, w = 0, h = 0;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', size);
  size();

  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  var N = isMobile ? 70 : 150;
  var stars = [];
  for (var i = 0; i < N; i++) {
    stars.push({
      x: Math.random(), y: Math.random(),
      z: 0.25 + Math.random() * 0.75,        /* depth: far dim/slow, near bright/fast */
      tw: Math.random() * 6.28,
      ember: Math.random() < 0.08
    });
  }

  var sy = window.scrollY, sySmooth = sy;
  var mx = 0.5, my = 0.5, mxs = 0.5, mys = 0.5;
  window.addEventListener('pointermove', function (e) {
    mx = e.clientX / w; my = e.clientY / h;
  }, { passive: true });

  /* occasional shooting star */
  var shot = null, nextShot = performance.now() + 4000;
  var hidden = false;
  document.addEventListener('visibilitychange', function () { hidden = document.hidden; });

  (function frame() {
    requestAnimationFrame(frame);
    if (hidden) return;
    var t = performance.now() / 1000;
    sy = window.scrollY;
    sySmooth += (sy - sySmooth) * 0.06;

    g.clearRect(0, 0, w, h);

    /* receding perspective grid, sinking with scroll */
    var horizon = h * 0.82 + Math.sin(t * 0.1) * 6;
    var gp = (sySmooth * 0.06) % 44;
    g.strokeStyle = 'rgba(214, 205, 194, 0.045)';
    g.lineWidth = 1;
    for (var row = 0; row < 9; row++) {
      var yy = horizon + Math.pow(row + gp / 44, 1.7) * 26;
      if (yy > h + 20) break;
      g.beginPath(); g.moveTo(0, yy); g.lineTo(w, yy); g.stroke();
    }
    var cx = w / 2;
    for (var col = -7; col <= 7; col++) {
      g.beginPath();
      g.moveTo(cx + col * 26, horizon);
      g.lineTo(cx + col * w * 0.14, h + 30);
      g.stroke();
    }

    /* nebula pulse */
    var nx = w * 0.78, ny = h * 0.2 - sySmooth * 0.04 % h;
    var nr = Math.min(w, h) * (0.5 + Math.sin(t * 0.17) * 0.04);
    var neb = g.createRadialGradient(nx, ny, 10, nx, ny, nr);
    neb.addColorStop(0, 'rgba(243, 109, 31, 0.05)');
    neb.addColorStop(1, 'rgba(243, 109, 31, 0)');
    g.fillStyle = neb;
    g.fillRect(0, 0, w, h);

    mxs += (mx - mxs) * 0.04; mys += (my - mys) * 0.04;

    /* cursor glow: a soft ember halo follows the pointer through the field */
    var cg = g.createRadialGradient(mxs * w, mys * h, 4, mxs * w, mys * h, 240);
    cg.addColorStop(0, 'rgba(243, 109, 31, 0.05)');
    cg.addColorStop(1, 'rgba(243, 109, 31, 0)');
    g.fillStyle = cg;
    g.fillRect(0, 0, w, h);

    /* shooting star */
    var now2 = performance.now();
    if (!shot && now2 > nextShot) {
      shot = { x: Math.random() * w * 0.7, y: Math.random() * h * 0.3, vx: 7 + Math.random() * 5, vy: 2.4 + Math.random() * 2, life: 1 };
    }
    if (shot) {
      shot.x += shot.vx; shot.y += shot.vy; shot.life -= 0.02;
      var tail = g.createLinearGradient(shot.x, shot.y, shot.x - shot.vx * 12, shot.y - shot.vy * 12);
      tail.addColorStop(0, 'rgba(255, 236, 218,' + (0.7 * shot.life) + ')');
      tail.addColorStop(1, 'rgba(255, 236, 218, 0)');
      g.strokeStyle = tail; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(shot.x, shot.y); g.lineTo(shot.x - shot.vx * 12, shot.y - shot.vy * 12); g.stroke();
      if (shot.life <= 0 || shot.x > w + 60) { shot = null; nextShot = now2 + 5000 + Math.random() * 9000; }
    }

    /* starfield: scroll + cursor drive drift by depth */
    for (var s = 0; s < N; s++) {
      var st = stars[s];
      var px = (st.x * w + Math.sin(t * 0.05 + st.tw) * 14 * st.z + (mxs - 0.5) * -46 * st.z);
      var py = (st.y * h - sySmooth * 0.12 * st.z + (mys - 0.5) * -24 * st.z);
      py = ((py % h) + h) % h;
      var a = (0.12 + 0.3 * st.z) * (0.6 + 0.4 * Math.sin(t * 0.7 + st.tw));
      if (st.ember) {
        g.fillStyle = 'rgba(243, 109, 31,' + (a * 1.1) + ')';
        g.beginPath(); g.arc(px, py, 1.1 + st.z * 1.2, 0, 7); g.fill();
      } else {
        g.fillStyle = 'rgba(226, 218, 206,' + a + ')';
        g.fillRect(px, py, 0.8 + st.z * 1.3, 0.8 + st.z * 1.3);
      }
    }
  })();
})();

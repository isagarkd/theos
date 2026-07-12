/* Theos — footer wire harp. The wordmark is rendered as horizontal wire lines
   on a canvas; hovering across a wire plucks it: a wave ripples along the line
   and a soft piano note plays (pentatonic, pitch mapped to the row).
   Respects the global mute; reduced motion gets a static line logo. */
(function () {
  var canvas = document.querySelector('.foot-harp');
  if (!canvas) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var g = canvas.getContext('2d');

  /* ---------- rasterize the wordmark into wire rows ---------- */
  var ROWS = 34;
  var rows = [];            /* [{y, segs:[{x0,x1,ember}], amp, px, t0, lastNote}] */
  var W = 0, H = 0, dpr = 1;
  var img = new Image();
  img.src = 'assets/logo-light.svg';

  function build() {
    var wrap = canvas.parentElement;
    W = Math.max(300, wrap.clientWidth);
    var logoH = W * (265 / 969);
    H = logoH + 70; /* headroom for wave amplitude */
    dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!img.complete || !img.naturalWidth) return;

    /* offscreen sample */
    var oc = document.createElement('canvas');
    var ow = 480, oh = Math.round(ow * (265 / 969));
    oc.width = ow; oc.height = oh;
    var og = oc.getContext('2d');
    og.drawImage(img, 0, 0, ow, oh);
    var data = og.getImageData(0, 0, ow, oh).data;

    rows = [];
    var top = 35;
    for (var r = 0; r < ROWS; r++) {
      var v = (r + 0.5) / ROWS;
      var sy = Math.floor(v * oh);
      var segs = [];
      var run = null, ember = false;
      for (var x = 0; x < ow; x++) {
        var idx = (sy * ow + x) * 4;
        var on = data[idx + 3] > 90;
        if (on && !run) { run = { x0: x, x1: x }; ember = data[idx] > 200 && data[idx + 2] < 120; }
        else if (on && run) { run.x1 = x; }
        else if (!on && run) {
          if (run.x1 - run.x0 > 3) segs.push({ x0: run.x0 / ow * W, x1: run.x1 / ow * W, ember: ember });
          run = null;
        }
      }
      if (run && run.x1 - run.x0 > 3) segs.push({ x0: run.x0 / ow * W, x1: run.x1 / ow * W, ember: ember });
      if (segs.length) rows.push({ y: top + v * logoH, segs: segs, amp: 0, px: 0, ph: 0, note: r, lastNote: 0 });
    }
    drawStatic();
  }
  img.onload = build;
  window.addEventListener('resize', build);
  build();

  function drawRow(row, offFn) {
    for (var s = 0; s < row.segs.length; s++) {
      var seg = row.segs[s];
      g.strokeStyle = seg.ember ? 'rgba(243, 109, 31, 0.75)' : 'rgba(219, 211, 199, 0.5)';
      g.lineWidth = 1;
      g.beginPath();
      if (!offFn) { g.moveTo(seg.x0, row.y); g.lineTo(seg.x1, row.y); }
      else {
        for (var x = seg.x0; x <= seg.x1; x += 7) {
          var yy = row.y + offFn(x);
          if (x === seg.x0) g.moveTo(x, yy); else g.lineTo(x, yy);
        }
        g.lineTo(seg.x1, row.y + offFn(seg.x1));
      }
      g.stroke();
    }
  }
  function drawStatic() {
    g.clearRect(0, 0, W, H);
    for (var r = 0; r < rows.length; r++) drawRow(rows[r], null);
  }
  if (reduced) { return; } /* static logo, no audio, no physics */

  /* ---------- piano ---------- */
  var actx = null;
  function ensureCtx() {
    if (!actx) {
      try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
    }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, ensureCtx, { passive: true });
  });

  /* pentatonic across the rows, high strings on top */
  var SCALE = [0, 3, 5, 7, 10];
  function rowFreq(r) {
    var n = rows.length - 1 - r;                 /* bottom = low */
    var deg = SCALE[n % 5] + 12 * Math.floor(n / 5);
    return 196 * Math.pow(2, deg / 12);          /* from G3 upward */
  }
  function piano(freq) {
    if (window.__theosAudio && window.__theosAudio.muted) return;
    var c = ensureCtx();
    if (!c || c.state !== 'running') return;
    var t0 = c.currentTime;
    var out = c.createGain();
    out.gain.setValueAtTime(0, t0);
    out.gain.linearRampToValueAtTime(0.09, t0 + 0.006);
    out.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.6);
    var lp = c.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.setValueAtTime(3400, t0);
    lp.frequency.exponentialRampToValueAtTime(900, t0 + 1.2);
    out.connect(lp); lp.connect(c.destination);
    [[1, 'triangle', 1], [2.001, 'sine', 0.4], [3.006, 'sine', 0.12]].forEach(function (h) {
      var o = c.createOscillator();
      o.type = h[1];
      o.frequency.value = freq * h[0];
      var hg = c.createGain(); hg.gain.value = h[2];
      o.connect(hg); hg.connect(out);
      o.start(t0); o.stop(t0 + 1.7);
    });
  }

  /* ---------- pluck on hover ---------- */
  var prev = null;
  function tryPluck(x, y) {
    if (!prev) { prev = { x: x, y: y }; return; }
    var lo = Math.min(prev.y, y), hi = Math.max(prev.y, y);
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      if (row.y < lo - 1 || row.y > hi + 1) continue;
      /* interpolate crossing x */
      var t = (row.y - prev.y) / ((y - prev.y) || 1);
      var cx = prev.x + (x - prev.x) * t;
      var inSeg = false;
      for (var s = 0; s < row.segs.length; s++) {
        if (cx >= row.segs[s].x0 - 6 && cx <= row.segs[s].x1 + 6) { inSeg = true; break; }
      }
      if (!inSeg) continue;
      row.amp = Math.min(16, row.amp + 12);
      row.px = cx;
      row.ph = 0;
      var now = performance.now();
      if (now - row.lastNote > 130) {
        row.lastNote = now;
        piano(rowFreq(r));
      }
    }
    prev = { x: x, y: y };
  }
  canvas.addEventListener('pointermove', function (e) {
    var rct = canvas.getBoundingClientRect();
    tryPluck(e.clientX - rct.left, e.clientY - rct.top);
  }, { passive: true });
  canvas.addEventListener('pointerleave', function () { prev = null; });

  /* ---------- physics loop (only while visible) ---------- */
  var visible = false;
  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; })
    .observe(canvas);

  (function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    var any = false;
    g.clearRect(0, 0, W, H);
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      if (row.amp > 0.08) {
        any = true;
        row.ph += 0.55;
        row.amp *= 0.945;
        (function (row2) {
          drawRow(row2, function (x) {
            var dx = x - row2.px;
            var falloff = Math.exp(-(dx * dx) / (2 * 130 * 130));
            return Math.sin(dx * 0.045 - row2.ph) * row2.amp * falloff;
          });
        })(row);
      } else {
        row.amp = 0;
        drawRow(row, null);
      }
    }
  })();
})();

/* THEOS — footer clouds. Soft warm mist blooms follow the cursor across the
   footer, drifting upward and dissolving. Pointer-only, reduced-motion off. */
(function () {
  var footer = document.querySelector('footer');
  if (!footer) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  if (reduced || !fine) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'foot-clouds';
  canvas.setAttribute('aria-hidden', 'true');
  footer.style.position = 'relative';
  footer.insertBefore(canvas, footer.firstChild);
  var g = canvas.getContext('2d');

  var dpr = 1, w = 0, h = 0;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = footer.clientWidth; h = footer.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', size);
  size();

  var blobs = [];
  var lastSpawn = 0;
  footer.addEventListener('pointermove', function (e) {
    var now = performance.now();
    if (now - lastSpawn < 40 || blobs.length > 46) return;
    lastSpawn = now;
    var r = footer.getBoundingClientRect();
    blobs.push({
      x: e.clientX - r.left + (Math.random() - 0.5) * 30,
      y: e.clientY - r.top + (Math.random() - 0.5) * 20,
      r: 50 + Math.random() * 90,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.18 - Math.random() * 0.25,
      life: 1
    });
  }, { passive: true });

  var running = false;
  function frame() {
    if (!blobs.length) { running = false; g.clearRect(0, 0, w, h); return; }
    requestAnimationFrame(frame);
    g.clearRect(0, 0, w, h);
    for (var i = blobs.length - 1; i >= 0; i--) {
      var b = blobs[i];
      b.x += b.vx; b.y += b.vy;
      b.r += 0.5;
      b.life -= 0.008;
      if (b.life <= 0) { blobs.splice(i, 1); continue; }
      var a = 0.05 * b.life * b.life;
      var gr = g.createRadialGradient(b.x, b.y, 1, b.x, b.y, b.r);
      gr.addColorStop(0, 'rgba(214, 205, 194,' + a + ')');
      gr.addColorStop(0.6, 'rgba(214, 205, 194,' + (a * 0.5) + ')');
      gr.addColorStop(1, 'rgba(214, 205, 194, 0)');
      g.fillStyle = gr;
      g.beginPath(); g.arc(b.x, b.y, b.r, 0, 7); g.fill();
    }
  }
  footer.addEventListener('pointerenter', function () {
    if (!running) { running = true; requestAnimationFrame(frame); }
  });
  footer.addEventListener('pointermove', function () {
    if (!running) { running = true; requestAnimationFrame(frame); }
  }, { passive: true });
})();

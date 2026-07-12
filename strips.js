/* THEOS — strip-merge entrances. Any section with [data-strips="#color"] gets
   full-width rows of the previous section's color that merge away with
   per-row lag as the section scrolls in. Rows only move while the scroll
   moves; center rows fuse first. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  var sections = [].slice.call(document.querySelectorAll('[data-strips]'));
  if (!sections.length) return;

  var ROWS = 11;
  var items = sections.map(function (section) {
    var canvas = document.createElement('canvas');
    canvas.className = 'strip-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    section.insertBefore(canvas, section.firstChild);
    var rows = [];
    for (var i = 0; i < ROWS; i++) rows.push({ cur: 0 });
    return {
      section: section, canvas: canvas, g: canvas.getContext('2d'),
      color: section.getAttribute('data-strips') || '#0e0c0a',
      rows: rows, w: 0, h: 0
    };
  });

  var dpr = 1;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    items.forEach(function (it) {
      it.w = it.section.clientWidth; it.h = window.innerHeight;
      it.canvas.width = it.w * dpr; it.canvas.height = it.h * dpr;
      it.canvas.style.width = it.w + 'px'; it.canvas.style.height = it.h + 'px';
      it.g.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  }
  window.addEventListener('resize', size);
  size();

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  (function frame() {
    requestAnimationFrame(frame);
    var vh = window.innerHeight;
    items.forEach(function (it) {
      var r = it.section.getBoundingClientRect();
      if (r.top > vh + 80 || r.top < -vh * 2.2) {
        if (r.top > vh) it.rows.forEach(function (row) { row.cur = 0; });
        if (it.canvas.style.display !== 'none') { it.canvas.style.display = 'none'; }
        return;
      }
      var p = clamp01((vh - r.top) / (vh * 1.05));
      var g = it.g;
      g.clearRect(0, 0, it.w, it.h);
      var rh = it.h / ROWS;
      var any = false;
      g.fillStyle = it.color;
      for (var i = 0; i < ROWS; i++) {
        var order = i / (ROWS - 1);
        var tgt = clamp01(p * 1.45 - order * 0.42);
        var row = it.rows[i];
        row.cur += (tgt - row.cur) * 0.16;
        var e = row.cur * row.cur * (3 - 2 * row.cur);
        var remain = (1 - e) * rh;
        if (remain > 0.25) {
          any = true;
          var cy = i * rh + rh / 2;
          g.fillRect(0, cy - remain / 2, it.w, remain + 0.5);
        }
      }
      it.canvas.style.display = any ? 'block' : 'none';
    });
  })();
})();

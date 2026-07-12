/* THEOS — selected work: horizontal exhibition (grey). Vertical scroll drives
   the rail sideways; separator lines draw in near the viewport center; at the
   end a white "our services" cover slides across — the services section then
   continues seamlessly on white. */
(function () {
  var section = document.getElementById('work');
  var track = section && section.querySelector('.wh-track');
  var rail = section && section.querySelector('.wh-rail');
  if (!section || !track || !rail) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = window.matchMedia('(max-width: 900px)');
  if (reduced) { document.body.classList.add('work-static'); return; }

  var barFill = section.querySelector('.wh-bar span');
  var cover = section.querySelector('.wh-cover');
  var panels = [].slice.call(rail.querySelectorAll('.wh-panel'));
  var seps = [].slice.call(rail.querySelectorAll('.wh-sep span'));

  function measure() {
    if (small.matches) { track.style.height = ''; return; }
    var dist = rail.scrollWidth - window.innerWidth;
    /* rail travel + 120vh for the cover slide + 60vh settle */
    track.style.height = 'calc(' + Math.max(0, dist) + 'px + 260vh)';
  }
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  measure();

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function sstep(t) { t = clamp01(t); return t * t * (3 - 2 * t); }

  function frame() {
    requestAnimationFrame(frame);
    if (small.matches) { rail.style.transform = ''; return; }
    var vh = window.innerHeight;
    var tr = track.getBoundingClientRect();
    if (tr.bottom < 0 || tr.top > vh) return;
    var dist = rail.scrollWidth - window.innerWidth;
    var y = -tr.top;
    var x = Math.max(0, Math.min(y, dist));
    rail.style.transform = 'translate3d(' + (-x) + 'px,0,0)';
    if (barFill) barFill.style.width = (dist > 0 ? (x / dist) * 100 : 0) + '%';


    /* panels rise from below as they enter from the right (trionn-style) */
    panels.forEach(function (pl) {
      var r2 = pl.getBoundingClientRect();
      var ent = (window.innerWidth - r2.left) / (window.innerWidth * 0.55);
      ent = ent < 0 ? 0 : ent > 1 ? 1 : ent;
      var e = sstep(ent);
      pl.style.transform = 'translateY(' + ((1 - e) * 110) + 'px)';
      pl.style.opacity = 0.15 + e * 0.85;
      var m = pl.querySelector('.wh-media');
      if (!m) return;
      var off2 = (r2.left + r2.width / 2 - window.innerWidth / 2) / window.innerWidth;
      m.style.transform = 'translateX(' + (off2 * -22) + 'px)';
    });

    /* services cover slides over the finished rail */
    if (cover) {
      var cp = sstep((y - dist - vh * 0.25) / (vh * 1.1));
      cover.style.transform = 'translateX(' + ((1 - cp) * 102) + '%)';
    }
  }
  frame();
})();

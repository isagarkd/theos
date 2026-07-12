/* THEOS — process conduit. Pinned scene: an ember current travels a line
   through the four phases; each phase ignites as the current reaches it.
   Scroll-scrubbed both directions; ticks as phases ignite. */
(function () {
  var section = document.getElementById('process');
  if (!section) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = window.matchMedia('(max-width: 900px)');
  if (reduced) return; // CSS static fallback

  var track = section.querySelector('.proc-track');
  var fill = section.querySelector('.proc-line-fill');
  var node = section.querySelector('.proc-node');
  var glow = section.querySelector('.proc-glow');
  var phases = [].slice.call(section.querySelectorAll('.proc-phase'));
  if (!track || !fill || !phases.length) return;

  var lastActive = -1;
  var starts = [0.06, 0.32, 0.58, 0.84];

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function sstep(t) { return t * t * (3 - 2 * t); }

  /* pointer tilt on phase cards */
  if (window.matchMedia('(pointer: fine)').matches) {
    phases.forEach(function (ph) {
      var card = ph.querySelector('.proc-card');
      ph.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width - 0.5;
        var dy = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--tx', (dx * 6) + 'deg');
        card.style.setProperty('--ty', (-dy * 6) + 'deg');
      });
      ph.addEventListener('pointerleave', function () {
        card.style.setProperty('--tx', '0deg');
        card.style.setProperty('--ty', '0deg');
      });
    });
  }

  function frame() {
    requestAnimationFrame(frame);
    if (small.matches || document.hidden) return;
    var vh = window.innerHeight;
    var tr = track.getBoundingClientRect();
    if (tr.bottom < 0 || tr.top > vh) return;
    var p = clamp01(-tr.top / Math.max(1, tr.height - vh));

    var line = sstep(clamp01(p * 1.06));
    fill.style.transform = 'scaleX(' + line + ')';
    node.style.left = (line * 100) + '%';
    if (glow) glow.style.left = (line * 100) + '%';

    var active = -1;
    for (var i = 0; i < phases.length; i++) {
      var on = p >= starts[i];
      phases[i].classList.toggle('on', on);
      phases[i].classList.toggle('now', on && (i === phases.length - 1 || p < starts[i + 1]));
      if (on) active = i;
    }
    if (active !== lastActive) {
      if (active > lastActive && lastActive >= -1 && window.__theosAudio && window.__theosAudio.tick) {
        window.__theosAudio.tick();
      }
      lastActive = active;
    }
  }
  frame();
})();

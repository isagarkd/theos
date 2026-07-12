/* THEOS — inertial smooth scrolling. Wheel input is eased through a lerp loop
   so every scroll-driven scene glides. Native behavior kept for touch,
   keyboard, scrollbar and reduced motion. Owns anchor-link easing too. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  if (reduced || coarse) return;

  /* We own the easing — CSS smooth-behavior would re-animate every frame. */
  document.documentElement.style.scrollBehavior = 'auto';

  var target = window.scrollY, current = window.scrollY, running = false;

  function maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function step() {
    current += (target - current) * 0.11;
    if (Math.abs(target - current) < 0.4) { current = target; running = false; }
    window.scrollTo(0, current);
  }
  function tick() {
    if (!running) return;
    step();
    var scheduled = false;
    requestAnimationFrame(function () { if (!scheduled) { scheduled = true; tick(); } });
    /* fallback driver so easing continues even when rAF is throttled */
    setTimeout(function () { if (!scheduled) { scheduled = true; tick(); } }, 60);
  }
  function go() { if (!running) { running = true; tick(); } }

  window.addEventListener('wheel', function (e) {
    if (e.ctrlKey || e.metaKey) return;                    // pinch zoom
    /* let any scrollable inner region (audit report, chat log, etc.) scroll natively */
    var el0 = e.target;
    while (el0 && el0 !== document.body && el0.nodeType === 1) {
      if (el0.matches && el0.matches('textarea, select')) return;
      if (el0.scrollHeight > el0.clientHeight + 2) {
        var oy = getComputedStyle(el0).overflowY;
        if (oy === 'auto' || oy === 'scroll') {
          var atTop = el0.scrollTop <= 0;
          var atBot = el0.scrollTop + el0.clientHeight >= el0.scrollHeight - 1;
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBot)) return;
        }
      }
      el0 = el0.parentElement;
    }
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;   // horizontal devices
    e.preventDefault();
    var d = e.deltaY;
    if (e.deltaMode === 1) d *= 33; else if (e.deltaMode === 2) d *= window.innerHeight;
    target = clamp(target + d, 0, maxScroll());
    go();
  }, { passive: false });

  /* external scroll (keyboard, scrollbar) re-syncs us */
  window.addEventListener('scroll', function () {
    if (!running) { target = current = window.scrollY; }
  }, { passive: true });

  /* anchor links ride the same easing */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var el = id ? document.getElementById(id) : null;
    if (!el) return;
    e.preventDefault();
    target = clamp(el.getBoundingClientRect().top + window.scrollY, 0, maxScroll());
    go();
  });

  /* for other scripts (AI companion scroll-to, etc.) */
  window.__theosScrollTo = function (y) {
    target = clamp(y, 0, maxScroll());
    go();
  };
})();

/* THEOS — interactions: cursor, magnetic elements, reveals, philosophy scroll,
   marquee, clocks, nav, newsletter, sound toggle. No dependencies. */
(function () {
  var body = document.body;
  var fine = window.matchMedia('(pointer: fine)').matches;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- custom cursor ---------- */
  if (fine) {
    body.classList.add('cursor-on');
    var dot = document.createElement('div'); dot.className = 'cursor-dot';
    var ring = document.createElement('div'); ring.className = 'cursor-ring';
    var lbl = document.createElement('span'); lbl.className = 'cl';
    ring.appendChild(lbl);
    body.appendChild(dot); body.appendChild(ring);
    var cx = -100, cy = -100, rxp = -100, ryp = -100;
    window.addEventListener('pointermove', function (e) {
      cx = e.clientX; cy = e.clientY;
      dot.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      var el = e.target.closest && e.target.closest('[data-cursor]');
      if (el) { lbl.textContent = el.getAttribute('data-cursor'); ring.classList.add('label'); }
      else ring.classList.remove('label');
    }, { passive: true });
    window.addEventListener('pointerdown', function () { ring.classList.add('down'); });
    window.addEventListener('pointerup', function () { ring.classList.remove('down'); });
    (function ringLoop() {
      rxp += (cx - rxp) * 0.16; ryp += (cy - ryp) * 0.16;
      ring.style.transform = 'translate(' + rxp + 'px,' + ryp + 'px)';
      requestAnimationFrame(ringLoop);
    })();
  }

  /* ---------- magnetic elements ---------- */
  if (fine && !reduced) {
    document.querySelectorAll('.magnetic').forEach(function (el) {
      var str = 0.28;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + dx * str + 'px,' + dy * str + 'px)';
      });
      el.addEventListener('pointerleave', function () {
        el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = '';
        setTimeout(function () { el.style.transition = ''; }, 500);
      });
    });
  }

  /* ---------- hover / click sounds ---------- */
  document.addEventListener('pointerenter', function (e) {
    if (e.target && e.target.matches && e.target.matches('a, button') && window.__theosAudio) window.__theosAudio.hover();
  }, true);
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('a, button') && window.__theosAudio) window.__theosAudio.click();
  });

  /* ---------- sound toggle ---------- */
  var st = document.getElementById('sound-toggle');
  function paintSound() {
    if (!st) return;
    var m = window.__theosAudio ? window.__theosAudio.muted : true;
    st.querySelector('.on').style.display = m ? 'none' : 'block';
    st.querySelector('.off').style.display = m ? 'block' : 'none';
    st.setAttribute('aria-label', m ? 'Unmute ambient sound' : 'Mute ambient sound');
  }
  if (st) {
    st.addEventListener('click', function () {
      if (window.__theosAudio) window.__theosAudio.toggle();
      paintSound();
    });
    paintSound();
  }

  /* ---------- nav morph ---------- */
  var nav = document.querySelector('.nav');
  function onScrollNav() {
    if (window.scrollY > 48) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- reveals ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

  /* ---------- philosophy word illumination ---------- */
  var philLine = document.querySelector('.phil-line');
  var philTrack = document.querySelector('.phil-track');
  var words = [];
  if (philLine && philTrack) {
    var frag = document.createDocumentFragment();
    var parts = [];
    philLine.querySelectorAll('span[data-seg]').forEach(function (seg) {
      var em = seg.hasAttribute('data-em');
      seg.textContent.split(' ').forEach(function (w) {
        if (w.trim()) parts.push({ w: w, em: em });
      });
    });
    philLine.textContent = '';
    parts.forEach(function (p, i) {
      var sp = document.createElement('span');
      sp.className = 'w' + (p.em ? ' em' : '');
      sp.textContent = p.w;
      frag.appendChild(sp);
      frag.appendChild(document.createTextNode(' '));
    });
    philLine.appendChild(frag);
    words = Array.prototype.slice.call(philLine.querySelectorAll('.w'));
    if (reduced) words.forEach(function (w) { w.classList.add('lit'); });
  }

  /* ---------- marquee (scroll-driven, no infinite loop) ---------- */
  var marquee = document.querySelector('.marquee');

  /* ---------- scroll rAF: philosophy + marquee ---------- */
  if (!reduced) {
    (function scrollLoop() {
      requestAnimationFrame(scrollLoop);
      var sy = window.scrollY;
      if (words.length && philTrack) {
        var pr = philTrack.getBoundingClientRect();
        var p = -pr.top / Math.max(1, pr.height - window.innerHeight);
        p = Math.max(0, Math.min(1, p * 1.15));
        var lit = Math.round(p * words.length);
        for (var i = 0; i < words.length; i++) {
          words[i].classList.toggle('lit', i < lit);
        }
      }
      if (marquee) {
        var r = marquee.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          var mp = (window.innerHeight - r.top) / (window.innerHeight + r.height);
          marquee.style.transform = 'translateX(' + (-mp * 30 + 5) + '%)';
        }
      }
    })();
  } else if (words.length) {
    words.forEach(function (w) { w.classList.add('lit'); });
  }

  /* ---------- live clocks ---------- */
  function clockFmt(tz) {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: tz });
  }
  var fDelhi = clockFmt('Asia/Kolkata'), fLondon = clockFmt('Europe/London');
  var elDelhi = document.getElementById('clock-delhi');
  var elLondon = document.getElementById('clock-london');
  function tick() {
    var now = new Date();
    if (elDelhi) elDelhi.textContent = fDelhi.format(now);
    if (elLondon) elLondon.textContent = fLondon.format(now);
  }
  tick(); setInterval(tick, 1000);

  /* ---------- newsletter ---------- */
  var nf = document.getElementById('news-form');
  if (nf) {
    nf.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = nf.querySelector('input');
      if (!input.value || input.value.indexOf('@') < 0) { input.focus(); return; }
      var done = document.createElement('p');
      done.className = 'news-done';
      done.textContent = 'You\u2019re on the list.';
      nf.replaceWith(done);
    });
  }

  /* ---------- ask-theos links from work cards ---------- */
  document.querySelectorAll('[data-ask]').forEach(function (el) {
    el.addEventListener('click', function () {
      var q = el.getAttribute('data-ask');
      var target = document.getElementById('intelligence');
      if (target) {
        var y = target.getBoundingClientRect().top + window.scrollY;
        if (window.__theosScrollTo) window.__theosScrollTo(y);
        else window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
      }
      setTimeout(function () {
        window.dispatchEvent(new CustomEvent('theos:ask', { detail: q }));
      }, reduced ? 50 : 700);
    });
  });

  /* ---------- footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* THEOS — word-mask heading reveals (trionn-style rise) */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.sec-head h2, .sec-head .lede, .wh-intro h2, .wh-intro .wh-sub, .proc-head h2');
  if (reduced || !targets.length) return;

  function splitEl(el) {
    el.classList.add('split');
    var idx = 0;
    function walk(node) {
      var kids = [].slice.call(node.childNodes);
      kids.forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          var tokens = child.textContent.split(/(\s+)/);
          tokens.forEach(function (tk) {
            if (!tk) return;
            if (/^\s+$/.test(tk)) { frag.appendChild(document.createTextNode(' ')); return; }
            var wm = document.createElement('span');
            wm.className = 'wm';
            var wi = document.createElement('span');
            wi.className = 'wi';
            wi.style.setProperty('--i', idx++);
            wi.textContent = tk;
            wm.appendChild(wi);
            frag.appendChild(wm);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR' && !child.classList.contains('wm')) {
          walk(child);
        }
      });
    }
    walk(el);
  }

  [].forEach.call(targets, splitEl);
  var wio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('ws-in'); wio.unobserve(en.target); }
    });
  }, { threshold: 0.3 });
  [].forEach.call(targets, function (el) { wio.observe(el); });
})();

/* THEOS — headline word morph */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cw = document.getElementById('cycle-word');
  if (!cw || reduced) return;
  var words = ['intelligence.', 'intention.', 'craft.'];
  var wi = 0;
  setInterval(function () {
    if (document.hidden) return;
    cw.classList.add('morph');
    setTimeout(function () {
      wi = (wi + 1) % words.length;
      cw.textContent = words[wi];
      cw.classList.remove('morph');
    }, 430);
  }, 4200);
})();

/* Theos — nav ink swap over light sections (logo letters only; square stays ember) */
(function () {
  var cap = document.getElementById('capabilities');
  var cli = document.getElementById('clients');
  var ins = document.getElementById('insights');
  var wrk = document.getElementById('work');
  if (!cap && !cli && !ins && !wrk) return;
  var y = 40;
  function check() {
    requestAnimationFrame(check);
    if (document.hidden) return;
    var light = false;
    [cap, cli, ins, wrk].forEach(function (el) {
      if (!el) return;
      var r = el.getBoundingClientRect();
      if (r.top <= y && r.bottom >= y) {
        if (el === cap) light = !el.classList.contains('storm'); /* capabilities is white outside the storm phase */
        else light = true;
      }
    });
    document.body.classList.toggle('nav-ink', light);
  }
  check();
})();

/* Theos — audit section: scan-line boot entrance */
(function () {
  var aud = document.getElementById('audit');
  if (!aud || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io = new IntersectionObserver(function (en) {
    if (en[0].isIntersecting) { aud.classList.add('scan'); io.disconnect(); }
  }, { threshold: 0.22 });
  io.observe(aud);
})();

/* Theos — the navigation OS. A Menu control that opens a right-anchored glass
   panel (65/35 split) while the page underneath pauses: scaled, dimmed,
   blurred. The left third is a living canvas whose scene changes per hovered
   item. Injected on every page from this one script. Esc / swipe closes,
   focus is trapped, reduced motion honored. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var navRight = document.querySelector('.nav-right');
  if (!navRight) return;

  /* ---------------- menu button ---------------- */
  var btn = document.createElement('button');
  btn.className = 'icon-btn menu-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Open menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span class="mb-l1"></span><span class="mb-l2"></span>';
  navRight.appendChild(btn);

  /* ---------------- overlay ---------------- */
  var ov = document.createElement('div');
  ov.id = 'menu-ov';
  ov.innerHTML =
    '<div class="mo-strips" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="mo-stage" aria-hidden="true"><canvas class="mo-canvas"></canvas><p class="mo-cap"></p></div>' +
    '<div class="mo-panel" role="dialog" aria-modal="true" aria-label="Navigation">' +
      '<div class="mo-head">' +
        '<span class="t-micro"><span class="sq"></span>Theos</span>' +
        '<button class="icon-btn mo-close" type="button" aria-label="Close menu"><span class="mb-l1"></span><span class="mb-l2"></span></button>' +
      '</div>' +
      '<nav class="mo-nav" aria-label="Primary">' +
        '<a href="work.html" data-scene="1" style="--i:0">Work</a>' +
        '<a href="services.html" data-scene="2" style="--i:1">Services</a>' +
        '<a href="index.html#audit" data-scene="3" style="--i:2">AI UX intelligence</a>' +
        '<a href="insights.html" data-scene="4" style="--i:3">Insights</a>' +
        '<a href="origin.html" data-scene="0" style="--i:4">The origin</a>' +
        '<a href="about.html" data-scene="0" style="--i:5">About</a>' +
        '<a href="contact.html" data-scene="5" style="--i:6">Contact</a>' +
      '</nav>' +
      '<div class="mo-actions">' +
        '<a class="btn btn-solid btn-sm" href="mailto:hello@theos.design?subject=Discovery%20call">Book a discovery call</a>' +
        '<a class="btn btn-ghost btn-sm" href="index.html#audit">Free UX audit</a>' +
        '<a class="btn btn-ghost btn-sm" href="contact.html">Start a project</a>' +
      '</div>' +
      '<div class="mo-foot">' +
        '<div><p class="fh">Enquiries</p><a href="mailto:hello@theos.design">hello@theos.design</a><a href="mailto:theosdesignstudio@gmail.com">theosdesignstudio@gmail.com</a></div>' +
        '<div><p class="fh">Studios</p><span>New Delhi</span><span>London</span></div>' +
        '<div><p class="fh">Social</p><a href="https://www.instagram.com/theosdesignstudio" target="_blank" rel="noopener">Instagram</a><a href="https://linkedin.com/company/theosdesign" target="_blank" rel="noopener">LinkedIn</a></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ov);

  var panel = ov.querySelector('.mo-panel');
  var cap = ov.querySelector('.mo-cap');
  var open = false;

  /* ---------------- sounds (respects global mute) ---------------- */
  var actx = null;
  function snd(kind) {
    if (window.__theosAudio && window.__theosAudio.muted) return;
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    if (actx.state === 'suspended') actx.resume();
    if (actx.state !== 'running') return;
    var t0 = actx.currentTime;
    if (kind === 'whoosh' || kind === 'air') {
      var dur = kind === 'whoosh' ? 0.55 : 0.4;
      var len = Math.floor(actx.sampleRate * dur);
      var b = actx.createBuffer(1, len, actx.sampleRate);
      var d = b.getChannelData(0);
      for (var i = 0; i < len; i++) {
        var p = i / len;
        var env = kind === 'whoosh' ? Math.sin(p * Math.PI) : Math.pow(1 - p, 1.6);
        d[i] = (Math.random() * 2 - 1) * env;
      }
      var src = actx.createBufferSource(); src.buffer = b;
      var f = actx.createBiquadFilter();
      f.type = 'bandpass'; f.Q.value = 0.8;
      f.frequency.setValueAtTime(kind === 'whoosh' ? 300 : 900, t0);
      f.frequency.exponentialRampToValueAtTime(kind === 'whoosh' ? 1400 : 250, t0 + dur);
      var g = actx.createGain(); g.gain.value = 0.05;
      src.connect(f); f.connect(g); g.connect(actx.destination);
      src.start();
    } else { /* glass click */
      var o = actx.createOscillator(); o.type = 'sine'; o.frequency.value = 1500;
      var g2 = actx.createGain();
      g2.gain.setValueAtTime(0.018, t0);
      g2.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.07);
      o.connect(g2); g2.connect(actx.destination);
      o.start(); o.stop(t0 + 0.09);
    }
  }

  /* ---------------- preview canvas ---------------- */
  var canvas = ov.querySelector('.mo-canvas');
  var g = canvas.getContext('2d');
  var CW = 0, CH = 0;
  function size() {
    var r = canvas.parentElement.getBoundingClientRect();
    CW = canvas.width = Math.max(10, Math.floor(r.width));
    CH = canvas.height = Math.max(10, Math.floor(r.height));
  }
  window.addEventListener('resize', function () { if (open) size(); });

  var scene = 0, sceneAlpha = 1, targetScene = 0;
  var CAPS = ['The studio', 'Selected work', 'Four disciplines', 'Instant UX intelligence', 'Thinking, published', 'Two studios, one team'];
  var tPath = new Path2D('M180 140H60C60 173.137 86.8629 200 120 200H180V260C114.616 260 81.9238 260 57.2822 246.545C38.7743 236.439 23.5612 221.226 13.4551 202.718C-0.000232574 178.076 0 145.384 0 80H180V140Z');

  function drawScene(s, t, a) {
    g.save();
    g.globalAlpha = a;
    var cx = CW / 2, cy = CH / 2;
    if (s === 0) { /* monolith: layered wireframe T */
      var sc = Math.min(CW, CH) / 320;
      for (var l = 6; l >= 0; l--) {
        g.save();
        g.translate(cx - 90 * sc + Math.sin(t * 0.4) * 8 + l * 3.5, cy - 170 * sc * 0.5 + Math.cos(t * 0.3) * 6 - l * 2.5);
        g.scale(sc, sc * 0.92);
        g.strokeStyle = l === 0 ? 'rgba(243,109,31,0.9)' : 'rgba(214,204,190,' + (0.3 - l * 0.04) + ')';
        g.lineWidth = l === 0 ? 1.6 / sc : 1 / sc;
        g.stroke(tPath);
        g.restore();
      }
      var gl = g.createRadialGradient(cx, cy + 40, 8, cx, cy + 40, 220);
      gl.addColorStop(0, 'rgba(243,109,31,0.14)'); gl.addColorStop(1, 'rgba(243,109,31,0)');
      g.fillStyle = gl; g.fillRect(0, 0, CW, CH);
    } else if (s === 1) { /* floating project cards */
      for (var i = 0; i < 5; i++) {
        var ph = t * 0.5 + i * 1.3;
        var x = cx + Math.sin(ph) * CW * 0.22 - 70;
        var y = cy + Math.cos(ph * 0.8) * CH * 0.16 - 50 + i * 8;
        var d2 = 0.6 + (i / 5) * 0.5;
        g.strokeStyle = i === 2 ? 'rgba(243,109,31,0.8)' : 'rgba(214,204,190,' + (0.4 * d2) + ')';
        g.lineWidth = 1;
        g.strokeRect(x, y, 140 * d2, 100 * d2);
        g.fillStyle = 'rgba(214,204,190,' + (0.06 * d2) + ')';
        g.fillRect(x, y, 140 * d2, 100 * d2);
      }
    } else if (s === 2) { /* service architecture: iso cubes */
      for (var r2 = 0; r2 < 3; r2++) for (var c2 = 0; c2 < 3; c2++) {
        var bx = cx + (c2 - 1) * 90 + (r2 - 1) * 44;
        var by = cy + (r2 - 1) * 52 - (c2 - 1) * 20 + Math.sin(t * 0.8 + r2 + c2) * 5;
        var em = r2 === 1 && c2 === 1;
        g.strokeStyle = em ? 'rgba(243,109,31,0.85)' : 'rgba(214,204,190,0.4)';
        g.lineWidth = 1.1;
        var S = 26;
        g.strokeRect(bx - S, by - S, S * 2, S * 2);
        g.beginPath();
        g.moveTo(bx - S, by - S); g.lineTo(bx - S + 12, by - S - 12);
        g.lineTo(bx + S + 12, by - S - 12); g.lineTo(bx + S, by - S);
        g.moveTo(bx + S + 12, by - S - 12); g.lineTo(bx + S + 12, by + S - 12); g.lineTo(bx + S, by + S);
        g.stroke();
      }
    } else if (s === 3) { /* AI neural core */
      var pulse = 0.5 + 0.5 * Math.sin(t * 1.4);
      for (var ring = 1; ring <= 4; ring++) {
        g.strokeStyle = 'rgba(243,109,31,' + (0.4 - ring * 0.08 + pulse * 0.1) + ')';
        g.beginPath(); g.arc(cx, cy, 26 + ring * 34 + pulse * 6, 0, 7); g.stroke();
      }
      for (var n = 0; n < 14; n++) {
        var th = n / 14 * Math.PI * 2 + t * 0.15;
        var rr = 60 + (n % 3) * 34;
        var nx = cx + Math.cos(th) * rr, ny = cy + Math.sin(th) * rr * 0.85;
        g.strokeStyle = 'rgba(214,204,190,0.22)';
        g.beginPath(); g.moveTo(cx, cy); g.lineTo(nx, ny); g.stroke();
        g.fillStyle = n % 4 === 0 ? '#f36d1f' : 'rgba(226,216,202,0.8)';
        g.beginPath(); g.arc(nx, ny, n % 4 === 0 ? 3.4 : 2, 0, 7); g.fill();
      }
      var core = g.createRadialGradient(cx, cy, 2, cx, cy, 30 + pulse * 10);
      core.addColorStop(0, 'rgba(255,178,125,0.9)'); core.addColorStop(1, 'rgba(243,109,31,0)');
      g.fillStyle = core; g.beginPath(); g.arc(cx, cy, 30 + pulse * 10, 0, 7); g.fill();
    } else if (s === 4) { /* editorial cards */
      for (var e2 = 0; e2 < 3; e2++) {
        var ex = cx - 150 + e2 * 105 + Math.sin(t * 0.6 + e2 * 2) * 7;
        var ey = cy - 90 + e2 * 26 + Math.cos(t * 0.5 + e2) * 6;
        g.strokeStyle = e2 === 0 ? 'rgba(243,109,31,0.7)' : 'rgba(214,204,190,0.4)';
        g.strokeRect(ex, ey, 120, 150);
        g.fillStyle = 'rgba(214,204,190,0.05)'; g.fillRect(ex, ey, 120, 150);
        for (var ln = 0; ln < 4; ln++) {
          g.fillStyle = 'rgba(214,204,190,' + (0.3 - ln * 0.05) + ')';
          g.fillRect(ex + 12, ey + 76 + ln * 14, (ln === 0 ? 96 : 70 - ln * 8), 3);
        }
        g.fillStyle = '#f36d1f'; g.fillRect(ex + 12, ey + 12, 10, 10);
      }
    } else { /* contact: two cities, one arc */
      var x1 = cx - CW * 0.2, x2 = cx + CW * 0.2, yy = cy + 20;
      g.strokeStyle = 'rgba(214,204,190,0.35)';
      g.setLineDash([3, 7]);
      g.beginPath(); g.moveTo(x1, yy); g.quadraticCurveTo(cx, yy - 130, x2, yy); g.stroke();
      g.setLineDash([]);
      var pp = (t * 0.25) % 1;
      var px2 = (1 - pp) * (1 - pp) * x1 + 2 * (1 - pp) * pp * cx + pp * pp * x2;
      var py2 = (1 - pp) * (1 - pp) * yy + 2 * (1 - pp) * pp * (yy - 130) + pp * pp * yy;
      g.fillStyle = '#f36d1f'; g.beginPath(); g.arc(px2, py2, 3.4, 0, 7); g.fill();
      [x1, x2].forEach(function (xx, i2) {
        var pl = 0.5 + 0.5 * Math.sin(t * 1.2 + i2 * 2);
        g.strokeStyle = 'rgba(243,109,31,' + (0.5 - pl * 0.3) + ')';
        g.beginPath(); g.arc(xx, yy, 8 + pl * 12, 0, 7); g.stroke();
        g.fillStyle = 'rgba(226,216,202,0.9)';
        g.beginPath(); g.arc(xx, yy, 3, 0, 7); g.fill();
      });
      g.fillStyle = 'rgba(214,204,190,0.55)';
      g.font = '11px Geist, sans-serif'; g.textAlign = 'center';
      g.fillText('NEW DELHI', x1, yy + 28); g.fillText('LONDON', x2, yy + 28);
    }
    g.restore();
  }

  (function frame() {
    requestAnimationFrame(frame);
    if (!open || document.hidden) return;
    var t = performance.now() / 1000;
    g.clearRect(0, 0, CW, CH);
    if (targetScene !== scene) {
      sceneAlpha -= 0.09;
      if (sceneAlpha <= 0) { scene = targetScene; sceneAlpha = 0; }
    } else if (sceneAlpha < 1) sceneAlpha = Math.min(1, sceneAlpha + 0.07);
    drawScene(scene, t, reduced ? 1 : sceneAlpha);
  })();

  /* ---------------- open / close ---------------- */
  function setOpen(v) {
    if (v === open) return;
    open = v;
    ov.classList.toggle('open', v);
    document.body.classList.toggle('menu-open', v);
    btn.classList.toggle('x', v);
    btn.setAttribute('aria-expanded', String(v));
    if (v) {
      size();
      snd('whoosh');
      targetScene = 0; scene = 0; sceneAlpha = 1;
      cap.textContent = CAPS[0];
      setTimeout(function () { ov.querySelector('.mo-nav a').focus(); }, reduced ? 0 : 500);
    } else {
      snd('air');
      btn.focus();
    }
  }
  btn.addEventListener('click', function () { setOpen(!open); });
  ov.querySelector('.mo-close').addEventListener('click', function () { setOpen(false); });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) setOpen(false);
    if (e.key === 'Tab' && open) {
      var f = ov.querySelectorAll('a, button');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  /* swipe right to close (mobile) */
  var tx0 = null;
  panel.addEventListener('touchstart', function (e) { tx0 = e.touches[0].clientX; }, { passive: true });
  panel.addEventListener('touchend', function (e) {
    if (tx0 !== null && e.changedTouches[0].clientX - tx0 > 70) setOpen(false);
    tx0 = null;
  }, { passive: true });

  /* hover: scene + sound */
  [].forEach.call(ov.querySelectorAll('.mo-nav a'), function (a) {
    /* letter-roll structure: two stacked rows of per-letter spans */
    var txt = a.textContent;
    a.setAttribute('aria-label', txt);
    a.textContent = '';
    function row(cls) {
      var r = document.createElement('span');
      r.className = 'row ' + cls;
      r.setAttribute('aria-hidden', 'true');
      for (var li = 0; li < txt.length; li++) {
        var lt = document.createElement('span');
        lt.className = 'lt';
        lt.style.setProperty('--l', li);
        lt.innerHTML = txt[li] === ' ' ? '&nbsp;' : txt[li];
        r.appendChild(lt);
      }
      return r;
    }
    a.appendChild(row('r1'));
    a.appendChild(row('r2'));
    a.addEventListener('pointerenter', function () {
      targetScene = parseInt(a.getAttribute('data-scene'), 10);
      cap.textContent = CAPS[targetScene];
      snd('click');
    });
    a.addEventListener('focus', function () {
      targetScene = parseInt(a.getAttribute('data-scene'), 10);
      cap.textContent = CAPS[targetScene];
    });
  });
})();

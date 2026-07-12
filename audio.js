/* THEOS — ambient audio engine. WebAudio synth: low detuned drones + filtered air.
   Starts only after first user interaction. Extremely low volume. Persistent mute. */
(function () {
  var STORE = 'theos-sound';
  var muted = localStorage.getItem(STORE) === 'off';
  var ctx = null, master = null, started = false;
  var stormGain = null;
  var LEVEL = 0.2;
  var confirmed = false;

  function unlock() {
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(function () {
        if (!confirmed && !muted) {
          confirmed = true;
          setTimeout(function () { blip(660, 0.28, 0.05); }, 60);
          setTimeout(function () { blip(990, 0.34, 0.035); }, 220);
        }
      }).catch(function () {});
    }
  }

  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Detuned drones: subs for weight + octaves for speakers that can't do 55Hz
    [[55, 'triangle', 0.3], [55.35, 'triangle', 0.3], [110.2, 'sine', 0.24], [164.8, 'sine', 0.1], [220.5, 'sine', 0.07]].forEach(function (cfg, i) {
      var o = ctx.createOscillator();
      o.type = cfg[1];
      o.frequency.value = cfg[0];
      var g = ctx.createGain();
      g.gain.value = cfg[2];
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 480; lp.Q.value = 0.4;
      o.connect(g); g.connect(lp); lp.connect(master);
      o.start();
      // very slow amplitude breathing
      var lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.017;
      var lg = ctx.createGain(); lg.gain.value = cfg[2] * 0.35;
      lfo.connect(lg); lg.connect(g.gain);
      lfo.start();
    });

    // Filtered noise "air"
    var len = ctx.sampleRate * 2;
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var noise = ctx.createBufferSource();
    noise.buffer = buf; noise.loop = true;
    var bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 0.6;
    var ng = ctx.createGain(); ng.gain.value = 0.03;
    noise.connect(bp); bp.connect(ng); ng.connect(master);
    noise.start();
    var nlfo = ctx.createOscillator(); nlfo.frequency.value = 0.031;
    var nlg = ctx.createGain(); nlg.gain.value = 300;
    nlfo.connect(nlg); nlg.connect(bp.frequency);
    nlfo.start();

    // Storm wind bed (silent until setStorm(true))
    stormGain = ctx.createGain(); stormGain.gain.value = 0;
    var wind = ctx.createBufferSource();
    wind.buffer = buf; wind.loop = true; wind.playbackRate.value = 0.6;
    var wlp = ctx.createBiquadFilter();
    wlp.type = 'lowpass'; wlp.frequency.value = 320; wlp.Q.value = 0.4;
    wind.connect(wlp); wlp.connect(stormGain); stormGain.connect(master);
    wind.start();
    var wlfo = ctx.createOscillator(); wlfo.frequency.value = 0.11;
    var wlg = ctx.createGain(); wlg.gain.value = 130;
    wlfo.connect(wlg); wlg.connect(wlp.frequency);
    wlfo.start();
  }

  function fadeTo(v, t) {
    if (!ctx) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(v, ctx.currentTime + (t || 2.5));
  }

  function start() {
    if (started) { unlock(); return; }
    started = true;
    try { build(); } catch (e) { started = false; return; }
    unlock();
    if (!muted) fadeTo(LEVEL, 4);
  }

  // UI sounds
  function blip(freq, dur, vol) {
    if (!ctx || muted || ctx.state !== 'running') return;    var o = ctx.createOscillator();
    o.type = 'sine'; o.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + dur + 0.02);
  }

  window.__theosAudio = {
    get muted() { return muted; },
    get running() { return !!(ctx && ctx.state === 'running'); },
    toggle: function () {
      muted = !muted;
      localStorage.setItem(STORE, muted ? 'off' : 'on');
      if (!started && !muted) start();
      unlock();
      fadeTo(muted ? 0 : LEVEL, 1.2);
      return muted;
    },
    hover: function () { blip(1180, 0.07, 0.02); },
    click: function () { blip(660, 0.1, 0.035); },
    tick: function () { blip(920, 0.16, 0.045); setTimeout(function () { blip(1240, 0.12, 0.02); }, 70); },
    zap: function (inten) {
      if (!ctx || muted || ctx.state !== 'running') return;
      var s = Math.min(1, inten || 0.6);
      var dur = 0.13 + s * 0.09;
      var len = Math.floor(ctx.sampleRate * dur);
      var b = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = b.getChannelData(0);
      for (var k = 0; k < len; k++) {
        var env = Math.pow(1 - k / len, 1.5);
        // sputtering electric crackle
        d[k] = (Math.random() * 2 - 1) * env * (Math.sin(k * 0.085 + Math.random() * 0.9) > -0.25 ? 1 : 0.12);
      }
      var src = ctx.createBufferSource(); src.buffer = b;
      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.frequency.value = 2400 + Math.random() * 1100; bp.Q.value = 2.4;
      var g = ctx.createGain(); g.gain.value = 0.12 * s;
      src.connect(bp); bp.connect(g); g.connect(ctx.destination);
      src.start();
    },
    blastStart: function () {
      if (!ctx || muted || ctx.state !== 'running') return;
      var t0 = ctx.currentTime;
      // deep boom
      var o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(78, t0);
      o.frequency.exponentialRampToValueAtTime(28, t0 + 0.9);
      var g = ctx.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.4, t0 + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.3);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(t0 + 1.4);
      // metal debris fizz
      var len = Math.floor(ctx.sampleRate * 0.8);
      var b = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = b.getChannelData(0);
      for (var k = 0; k < len; k++) d[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / len, 2.1);
      var src = ctx.createBufferSource(); src.buffer = b;
      var hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1400;
      var ng = ctx.createGain(); ng.gain.value = 0.16;
      src.connect(hp); hp.connect(ng); ng.connect(ctx.destination);
      src.start();
    },
    blastEnd: function () {
      if (!ctx || muted || ctx.state !== 'running') return;
      // metal reassembling: quick ascending metallic pings + soft shimmer
      blip(420, 0.18, 0.05);
      setTimeout(function () { blip(640, 0.18, 0.05); }, 90);
      setTimeout(function () { blip(960, 0.22, 0.045); }, 180);
      setTimeout(function () { blip(1440, 0.3, 0.03); }, 270);
    },
    setStorm: function (on) {
      if (!ctx || !stormGain) return;
      stormGain.gain.cancelScheduledValues(ctx.currentTime);
      stormGain.gain.setValueAtTime(stormGain.gain.value, ctx.currentTime);
      stormGain.gain.linearRampToValueAtTime(on ? 3.2 : 0, ctx.currentTime + (on ? 2.2 : 1.2));
    },
    scatter: function () {
      if (!ctx || muted || ctx.state !== 'running') return;
      // shimmering scatter: short bright noise sweep upward
      var dur = 1.1;
      var len = Math.floor(ctx.sampleRate * dur);
      var b2 = ctx.createBuffer(1, len, ctx.sampleRate);
      var d3 = b2.getChannelData(0);
      for (var i = 0; i < len; i++) d3[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.4);
      var src = ctx.createBufferSource(); src.buffer = b2;
      var bp2 = ctx.createBiquadFilter();
      bp2.type = 'bandpass'; bp2.Q.value = 1.1;
      bp2.frequency.setValueAtTime(900, ctx.currentTime);
      bp2.frequency.exponentialRampToValueAtTime(4200, ctx.currentTime + dur * 0.7);
      var g2 = ctx.createGain();
      g2.gain.setValueAtTime(0, ctx.currentTime);
      g2.gain.linearRampToValueAtTime(0.10, ctx.currentTime + 0.04);
      g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      src.connect(bp2); bp2.connect(g2); g2.connect(ctx.destination);
      src.start();
      // sparkle pings
      [1560, 2140, 2870].forEach(function (f, i2) {
        setTimeout(function () { blip(f, 0.24, 0.02); }, 60 + i2 * 110);
      });
    },
    crack: function () {
      if (!ctx || muted || ctx.state !== 'running') return;
      var now0 = ctx.currentTime;
      /* 1. sharp fracture snap */
      var len = Math.floor(ctx.sampleRate * 0.22);
      var b3 = ctx.createBuffer(1, len, ctx.sampleRate);
      var d4 = b3.getChannelData(0);
      for (var i = 0; i < len; i++) d4[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.4);
      var snap = ctx.createBufferSource(); snap.buffer = b3;
      var hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 750;
      var sg = ctx.createGain();
      sg.gain.setValueAtTime(0.7, now0);
      sg.gain.exponentialRampToValueAtTime(0.0001, now0 + 0.22);
      snap.connect(hp); hp.connect(sg); sg.connect(ctx.destination);
      snap.start();
      /* 2. deep body boom — saturated through a waveshaper for hard bass */
      var shaper = ctx.createWaveShaper();
      (function () {
        var n = 256, curve = new Float32Array(n);
        for (var ci = 0; ci < n; ci++) {
          var xx = (ci / (n - 1)) * 2 - 1;
          curve[ci] = Math.tanh(xx * 2.6);
        }
        shaper.curve = curve;
      })();
      var o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(72, now0);
      o.frequency.exponentialRampToValueAtTime(21, now0 + 1.5);
      var og = ctx.createGain();
      og.gain.setValueAtTime(0, now0);
      og.gain.linearRampToValueAtTime(0.95, now0 + 0.04);
      og.gain.exponentialRampToValueAtTime(0.0001, now0 + 2.1);
      var boomOut = ctx.createGain(); boomOut.gain.value = 0.62;
      o.connect(og); og.connect(shaper); shaper.connect(boomOut); boomOut.connect(ctx.destination);
      o.start(); o.stop(now0 + 2.2);
      /* 2b. sustained 30Hz sub floor */
      var sub = ctx.createOscillator(); sub.type = 'sine';
      sub.frequency.setValueAtTime(30, now0);
      var subG = ctx.createGain();
      subG.gain.setValueAtTime(0, now0);
      subG.gain.linearRampToValueAtTime(0.5, now0 + 0.06);
      subG.gain.exponentialRampToValueAtTime(0.0001, now0 + 1.7);
      sub.connect(subG); subG.connect(ctx.destination);
      sub.start(); sub.stop(now0 + 1.8);
      /* 3. tumbling rubble: staggered stone-on-stone thuds */
      for (var r = 0; r < 9; r++) {
        (function (ri) {
          var when = now0 + 0.12 + ri * (0.08 + Math.random() * 0.13);
          var dur = 0.1 + Math.random() * 0.08;
          var l2 = Math.floor(ctx.sampleRate * dur);
          var rb = ctx.createBuffer(1, l2, ctx.sampleRate);
          var rd = rb.getChannelData(0);
          for (var k = 0; k < l2; k++) rd[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / l2, 2.2);
          var src = ctx.createBufferSource(); src.buffer = rb;
          var bp2 = ctx.createBiquadFilter();
          bp2.type = 'bandpass'; bp2.frequency.value = 130 + Math.random() * 260; bp2.Q.value = 1.6;
          var rg = ctx.createGain(); rg.gain.value = 0.62 * (1 - ri / 11);
          src.connect(bp2); bp2.connect(rg); rg.connect(ctx.destination);
          src.start(when);
        })(r);
      }
      /* 4. gravel hiss tail */
      var l3 = Math.floor(ctx.sampleRate * 1.6);
      var gb = ctx.createBuffer(1, l3, ctx.sampleRate);
      var gd = gb.getChannelData(0);
      for (var k2 = 0; k2 < l3; k2++) gd[k2] = (Math.random() * 2 - 1) * Math.pow(1 - k2 / l3, 1.8);
      var gsrc = ctx.createBufferSource(); gsrc.buffer = gb;
      var glp = ctx.createBiquadFilter(); glp.type = 'lowpass'; glp.frequency.value = 900;
      var gg = ctx.createGain(); gg.gain.value = 0.14;
      gsrc.connect(glp); glp.connect(gg); gg.connect(ctx.destination);
      gsrc.start(now0 + 0.2);
    },
    sear: function () {
      if (!ctx || muted || ctx.state !== 'running') return;
      /* hot iron press: filtered noise swell + low tone */
      var t0 = ctx.currentTime;
      var len = Math.floor(ctx.sampleRate * 1.3);
      var b = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = b.getChannelData(0);
      for (var i = 0; i < len; i++) {
        var e = Math.sin(Math.PI * (i / len));
        d[i] = (Math.random() * 2 - 1) * e * e;
      }
      var src = ctx.createBufferSource(); src.buffer = b;
      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass'; bp.Q.value = 0.9;
      bp.frequency.setValueAtTime(2600, t0);
      bp.frequency.exponentialRampToValueAtTime(700, t0 + 1.2);
      var g = ctx.createGain(); g.gain.value = 0.09;
      src.connect(bp); bp.connect(g); g.connect(ctx.destination);
      src.start();
      blip(196, 0.7, 0.05);
    },
    thunder: function (strength) {
      if (!ctx || muted || ctx.state !== 'running') return;
      var s = strength || 0.8;
      var dur = 2.2 + s * 1.2;
      // rumble: noise through a falling lowpass
      var len = Math.floor(ctx.sampleRate * dur);
      var buf2 = ctx.createBuffer(1, len, ctx.sampleRate);
      var d2 = buf2.getChannelData(0);
      for (var i = 0; i < len; i++) d2[i] = (Math.random() * 2 - 1) * (1 - i / len);
      var src = ctx.createBufferSource(); src.buffer = buf2;
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.Q.value = 0.7;
      lp.frequency.setValueAtTime(420, ctx.currentTime);
      lp.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + dur * 0.8);
      var g = ctx.createGain();
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.62 * s, ctx.currentTime + 0.09);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      src.connect(lp); lp.connect(g); g.connect(ctx.destination);
      src.start();
      // sub thump
      var o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(52, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(34, ctx.currentTime + 1.2);
      var og = ctx.createGain();
      og.gain.setValueAtTime(0, ctx.currentTime);
      og.gain.linearRampToValueAtTime(0.32 * s, ctx.currentTime + 0.05);
      og.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);
      o.connect(og); og.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 1.8);
    },
    ensure: start
  };

  ['pointerdown', 'keydown', 'wheel', 'touchstart', 'click'].forEach(function (ev) {
    window.addEventListener(ev, start, { once: true, passive: true });
  });

  // Browsers only honor resume() from a real gesture — keep trying until running.
  function retryUnlock() {
    if (ctx && ctx.state === 'running') {
      ['pointerdown', 'pointerup', 'keydown', 'touchend', 'click'].forEach(function (ev) {
        window.removeEventListener(ev, retryUnlock);
      });
      return;
    }
    unlock();
  }
  ['pointerdown', 'pointerup', 'keydown', 'touchend', 'click'].forEach(function (ev) {
    window.addEventListener(ev, retryUnlock, { passive: true });
  });
})();

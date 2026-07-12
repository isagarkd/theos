/* THEOS — hero WebGL v2. Brushed-titanium T monolith, ember core, GPU particles,
   interactive wires that bend and spark under the cursor, hold-to-blast shatter.
   Scroll-choreographed: hero → philosophy → forge → finale. */
(function () {
  var canvas = document.getElementById('gl');
  var body = document.body;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function bail() { body.classList.add('intro-done'); }
  if (!canvas || !window.THREE) { bail(); return; }

  var THREE = window.THREE;
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch (e) { bail(); return; }

  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x0e0c0a, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0e0c0a, 0.052);
  var camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 60);
  camera.position.set(0, 0, 13);

  /* ---------- environment (softbox studio, PMREM) ---------- */
  var pmrem = new THREE.PMREMGenerator(renderer);
  (function () {
    var env = new THREE.Scene();
    env.background = new THREE.Color(0x0a0908);
    function strip(w, h, c, i, x, y, z, ry, rx) {
      var m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ color: c })
      );
      m.material.color.multiplyScalar(i);
      m.position.set(x, y, z);
      if (ry) m.rotation.y = ry;
      if (rx) m.rotation.x = rx;
      env.add(m);
    }
    strip(14, 2.2, 0xfff4e6, 5.5, -6, 5, -4, Math.PI / 3);
    strip(10, 1.4, 0xffffff, 3.2, 7, 3, -2, -Math.PI / 2.6);
    strip(20, 5, 0x9a938c, 0.5, 0, -7, 0, 0, Math.PI / 2);
    strip(6, 1.1, 0xf36d1f, 2.4, -2, -3.5, 6, Math.PI * 0.9);
    strip(9, 0.9, 0xffffff, 2.0, 0, 8, 2, 0, Math.PI / 2);
    scene.environment = pmrem.fromScene(env, 0.04).texture;
  })();

  /* ---------- brushed metal maps ---------- */
  function brushedTexture(rough) {
    var c = document.createElement('canvas');
    c.width = c.height = 512;
    var g = c.getContext('2d');
    g.fillStyle = rough ? '#6f6f6f' : '#808080';
    g.fillRect(0, 0, 512, 512);
    for (var i = 0; i < 2600; i++) {
      var y = Math.random() * 512;
      var x = Math.random() * 512;
      var len = 30 + Math.random() * 220;
      var v = 96 + Math.floor(Math.random() * 96);
      g.strokeStyle = 'rgba(' + v + ',' + v + ',' + v + ',' + (0.04 + Math.random() * 0.09) + ')';
      g.lineWidth = Math.random() < 0.12 ? 1.6 : 0.7;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + len, y + (Math.random() - 0.5) * 1.5); g.stroke();
    }
    for (i = 0; i < 60; i++) {
      g.strokeStyle = 'rgba(210,210,210,' + (0.05 + Math.random() * 0.08) + ')';
      g.lineWidth = 0.5;
      var sx = Math.random() * 512, sy = Math.random() * 512;
      g.beginPath(); g.moveTo(sx, sy);
      g.lineTo(sx + (Math.random() - 0.5) * 80, sy + (Math.random() - 0.5) * 26);
      g.stroke();
    }
    var t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    return t;
  }

  /* ---------- the T monolith (transcribed from uploads/theos.svg, path 2) ---------- */
  var shape = new THREE.Shape();
  var s = 1 / 90;
  function P(x, y) { return [(x - 90) * s, (170 - y) * s]; }
  function mv(x, y) { var p = P(x, y); shape.moveTo(p[0], p[1]); }
  function ln(x, y) { var p = P(x, y); shape.lineTo(p[0], p[1]); }
  function bz(a, b, c, d, e, f) {
    var p1 = P(a, b), p2 = P(c, d), p3 = P(e, f);
    shape.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
  }
  mv(180, 140); ln(60, 140);
  bz(60, 173.137, 86.8629, 200, 120, 200);
  ln(180, 200); ln(180, 260);
  bz(114.616, 260, 81.9238, 260, 57.2822, 246.545);
  bz(38.7743, 236.439, 23.5612, 221.226, 13.4551, 202.718);
  bz(0, 178.076, 0, 145.384, 0, 80);
  ln(180, 80); ln(180, 140);

  var geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.5, bevelEnabled: true, bevelThickness: 0.045, bevelSize: 0.035,
    bevelSegments: 4, curveSegments: 28
  });
  geo.center();

  var metal = new THREE.MeshPhysicalMaterial({
    color: 0x9b948c,
    metalness: 0.92,
    roughness: 0.4,
    roughnessMap: brushedTexture(true),
    bumpMap: brushedTexture(false),
    bumpScale: 0.012,
    envMapIntensity: 1.25,
    clearcoat: 0.28,
    clearcoatRoughness: 0.42,
    transparent: true
  });
  var metalShard = metal.clone();
  metalShard.transparent = false;

  var tGroup = new THREE.Group();
  var tMesh = new THREE.Mesh(geo, metal);
  tGroup.add(tMesh);
  /* wireframe skeleton — revealed while the metal is blasted apart */
  var edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 14),
    new THREE.LineBasicMaterial({ color: 0xf3a05f, transparent: true, opacity: 0 })
  );
  tGroup.add(edges);
  scene.add(tGroup);

  /* ---------- blast shards (sampled inside the T silhouette) ---------- */
  var outline = shape.getPoints(48);
  var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
  outline.forEach(function (p) {
    if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
  });
  var cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  function inPoly(x, y) {
    var inside = false;
    for (var i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      var xi = outline[i].x, yi = outline[i].y, xj = outline[j].x, yj = outline[j].y;
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  }
  var shardGroup = new THREE.Group();
  shardGroup.visible = false;
  tGroup.add(shardGroup);
  var shards = [];
  var guard = 0;
  while (shards.length < 34 && guard++ < 3000) {
    var rx = minX + Math.random() * (maxX - minX);
    var ry2 = minY + Math.random() * (maxY - minY);
    if (!inPoly(rx, ry2)) continue;
    var sg = new THREE.TetrahedronGeometry(0.1 + Math.random() * 0.15);
    var sm = new THREE.Mesh(sg, metalShard);
      var home = new THREE.Vector3(rx - cx, ry2 - cy, (Math.random() - 0.5) * 0.42);
    sm.position.copy(home);
    var dir = home.clone().add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 1.6
    ));
    if (dir.lengthSq() < 0.01) dir.set(0.3, 0.3, 0.5);
    dir.normalize();
    sm.userData = {
      home: home, dir: dir,
      speed: 1.2 + Math.random() * 2.2,
      rx: (Math.random() - 0.5) * 9,
      ryy: (Math.random() - 0.5) * 9,
      rz: (Math.random() - 0.5) * 9
    };
    shardGroup.add(sm);
    shards.push(sm);
  }

  var holding = false, holdTimer = null, blast = 0, wasHolding = false;
  function isInteractive(el) {
    return el.closest && el.closest('a, button, input, textarea, select, .companion-scope, .work-pin, .nav');
  }
  window.addEventListener('pointerdown', function (e) {
    if (isInteractive(e.target)) return;
    clearTimeout(holdTimer);
    holdTimer = setTimeout(function () { holding = true; }, 140);
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
    window.addEventListener(ev, function () {
      clearTimeout(holdTimer);
      holding = false;
    });
  });

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0x2a2622, 0.55));
  var key = new THREE.SpotLight(0xfff1e0, 90, 40, Math.PI / 5, 0.5, 1.6);
  key.position.set(-4, 4, 6);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xcfd6e0, 1.4);
  rim.position.set(6, 2, -5);
  scene.add(rim);
  var ember = new THREE.PointLight(0xf36d1f, 26, 14, 1.8);
  ember.position.set(-1.4, -1.2, -1.6);
  scene.add(ember);

  /* ---------- radial texture helper ---------- */
  function radialTexture(inner, outer) {
    var c = document.createElement('canvas');
    c.width = c.height = 256;
    var g = c.getContext('2d');
    var gr = g.createRadialGradient(128, 128, 4, 128, 128, 128);
    gr.addColorStop(0, inner); gr.addColorStop(1, outer);
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }
  var glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture('rgba(243,109,31,0.55)', 'rgba(243,109,31,0)'),
    blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.5
  }));
  glow.scale.set(7, 7, 1);
  glow.position.set(-0.6, -0.5, -1.8);
  scene.add(glow);

  var shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6),
    new THREE.MeshBasicMaterial({
      map: radialTexture('rgba(0,0,0,0.62)', 'rgba(0,0,0,0)'),
      transparent: true, depthWrite: false
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.7;
  scene.add(shadow);

  /* ---------- particles ---------- */
  var COUNT = isMobile ? 320 : 640;
  var pGeo = new THREE.BufferGeometry();
  var pos = new Float32Array(COUNT * 3);
  for (var i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 18;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var pMat = new THREE.PointsMaterial({
    size: 0.035, map: radialTexture('rgba(255,244,230,0.9)', 'rgba(255,244,230,0)'),
    transparent: true, opacity: 0.45, depthWrite: false,
    blending: THREE.AdditiveBlending, color: 0xbfb6aa, sizeAttenuation: true
  });
  var particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ---------- wires (the current) ---------- */
  var WP = 90;
  var wireDefs = [
    { a: [-17, 5.2, -2.2], b: [17, -2.6, -2.2], sag: 0.5 },
    { a: [-17, 1.4, -3.2], b: [17, 4.2, -3.2], sag: 0.7 },
    { a: [-16, -4.2, -1.4], b: [16, -0.8, -1.4], sag: 0.4 },
    { a: [-17, -0.8, 1.1], b: [17, -5.2, 1.1], sag: 0.6 },
    { a: [-16, 3.4, 0.5], b: [16, 0.4, 0.5], sag: 0.5 }
  ];
  var wires = wireDefs.map(function (def) {
    var base = new Float32Array(WP * 3);
    for (var k = 0; k < WP; k++) {
      var u = k / (WP - 1);
      base[k * 3] = def.a[0] + (def.b[0] - def.a[0]) * u;
      base[k * 3 + 1] = def.a[1] + (def.b[1] - def.a[1]) * u - Math.sin(u * Math.PI) * def.sag;
      base[k * 3 + 2] = def.a[2] + (def.b[2] - def.a[2]) * u;
    }
    var g2 = new THREE.BufferGeometry();
    g2.setAttribute('position', new THREE.BufferAttribute(base.slice(), 3));
    var mat = new THREE.LineBasicMaterial({ color: 0x958c81, transparent: true, opacity: 0.3 });
    var line = new THREE.Line(g2, mat);
    line.frustumCulled = false;
    scene.add(line);
    var spark = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture('rgba(255,196,140,1)', 'rgba(243,109,31,0)'),
      blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0
    }));
    spark.scale.set(0.7, 0.7, 1);
    scene.add(spark);
    return {
      base: base, line: line, mat: mat, spark: spark,
      off: new Float32Array(WP * 2), vel: new Float32Array(WP * 2),
      z: (def.a[2] + def.b[2]) / 2
    };
  });

  var rayDir = new THREE.Vector3();
  function mouseWorldAt(z, out) {
    rayDir.set(mouse.tx, -mouse.ty, 0.5).unproject(camera).sub(camera.position).normalize();
    var t2 = (z - camera.position.z) / rayDir.z;
    if (!isFinite(t2) || t2 < 0) { out.set(9999, 9999, z); return; }
    out.copy(camera.position).addScaledVector(rayDir, t2);
  }
  var mw = new THREE.Vector3();

  /* ---------- state ---------- */
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  var lastZap = 0;
  var intro = reduced ? 1 : 0;
  var introStart = performance.now();
  var introDone = reduced;
  var tweak = { glow: 1, motion: 1 };
  var hidden = false;

  window.addEventListener('theos:tweak', function (e) {
    var d = e.detail || {};
    if (d.key === 'glow') tweak.glow = d.value;
    if (d.key === 'motion') tweak.motion = d.value === 'calm' ? 0.35 : 1;
  });

  window.addEventListener('pointermove', function (e) {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  function skipIntro() {
    if (!introDone && intro < 0.98) introStart = performance.now() - 4600;
  }
  window.addEventListener('wheel', skipIntro, { passive: true });
  window.addEventListener('touchstart', skipIntro, { passive: true });
  window.addEventListener('pointerdown', skipIntro, { passive: true });

  if (reduced) body.classList.add('intro-done');

  var elPhil = document.getElementById('philosophy');
  var elCap = document.getElementById('capabilities');
  var elForge = document.getElementById('forge');
  var elPres = document.getElementById('presence');

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  document.addEventListener('visibilitychange', function () { hidden = document.hidden; });

  var lastW = window.innerWidth, lastH = window.innerHeight;
  window.addEventListener('resize', function () {
    lastW = window.innerWidth; lastH = window.innerHeight;
    camera.aspect = lastW / lastH;
    camera.updateProjectionMatrix();
    renderer.setSize(lastW, lastH);
    isMobile = window.matchMedia('(max-width: 768px)').matches;
  });

  var clock = new THREE.Clock();

  function frame() {
    requestAnimationFrame(frame);
    if (hidden) return;

    var t = clock.getElapsedTime();
    var now = performance.now();

    if (!introDone) {
      intro = clamp01((now - introStart) / 4600);
      if (intro >= 0.62 && !body.classList.contains('intro-done')) body.classList.add('intro-done');
      if (intro >= 1) introDone = true;
    }
    var ei = ease(intro);

    var sy = window.scrollY || 0;
    var vh = lastH;

    var pHero = clamp01(sy / (vh * 0.9));
    var philTop = elPhil ? elPhil.offsetTop : vh;
    var philH = elPhil ? elPhil.offsetHeight : vh * 2;
    var pPhil = clamp01((sy - philTop) / Math.max(1, philH - vh));
    var capTop = elCap ? elCap.offsetTop : vh * 4;
    var pGone = clamp01((sy - (capTop - vh)) / (vh * 0.85));
    var presTop = elPres ? elPres.offsetTop : 1e9;
    var pEnd = clamp01((sy - (presTop - vh)) / (vh * 1.2));

    var fIn = 0, fOut = 1;
    if (elForge) {
      var fTop = elForge.offsetTop, fH = elForge.offsetHeight;
      fIn = clamp01((sy - (fTop - vh * 0.85)) / (vh * 0.7));
      fOut = clamp01((sy - (fTop + fH - vh * 0.9)) / (vh * 0.7));
    }
    var fF = ease(fIn) * (1 - ease(fOut));

    var mAmt = 0.06 * tweak.motion + 0.01;
    mouse.x += (mouse.tx - mouse.x) * mAmt;
    mouse.y += (mouse.ty - mouse.y) * mAmt;

    /* ---- blast state ---- */
    blast += ((holding ? 1 : 0) - blast) * (holding ? 0.085 : 0.06);
    if (holding !== wasHolding) {
      wasHolding = holding;
      if (window.__theosAudio) {
        if (holding && window.__theosAudio.blastStart) window.__theosAudio.blastStart();
        else if (!holding && blast > 0.2 && window.__theosAudio.blastEnd) window.__theosAudio.blastEnd();
      }
    }
    if (blast > 0.03) {
      shardGroup.visible = true;
      metal.opacity = Math.max(0, 1 - blast * 1.7);
      tMesh.visible = metal.opacity > 0.02;
      edges.material.opacity = Math.min(1, blast * 2.0);
      var eb = easeOut(blast);
      for (var si = 0; si < shards.length; si++) {
        var sh = shards[si], ud = sh.userData;
        sh.position.copy(ud.home).addScaledVector(ud.dir, eb * ud.speed);
        sh.rotation.set(eb * ud.rx, eb * ud.ryy, eb * ud.rz);
      }
    } else {
      shardGroup.visible = false;
      tMesh.visible = true;
      metal.opacity = 1;
      edges.material.opacity = Math.max(0, edges.material.opacity - 0.05);
    }
    var wantBlastClass = blast > 0.25;
    if (wantBlastClass !== body.classList.contains('blasting')) {
      body.classList.toggle('blasting', wantBlastClass);
    }

    /* ---- T transform ---- */
    var float1 = Math.sin(t * 0.5) * 0.06 + Math.sin(t * 0.23 + 1.7) * 0.03;

    var px = lerp(0, 2.1, ease(pHero));
    var py = lerp(0, 0.25, ease(pHero)) + float1;
    var pz = 0;
    var scl = lerp(1.55, 1.0, ease(pHero));
    var ry = lerp(-0.35, 0.55, ei) + pHero * 1.7 + pPhil * 1.35 + mouse.x * 0.3 * tweak.motion;
    var rx2 = -0.08 + mouse.y * 0.14 * tweak.motion + pPhil * 0.15;
    var rz2 = pPhil * -0.12;

    px += pPhil * 1.4;
    scl -= pPhil * 0.25;

    if (fF > 0.001) {
      px = lerp(px, isMobile ? 0.15 : 2.0, fF);
      py = lerp(py, (isMobile ? -0.7 : 0) + float1, fF);
      scl = lerp(scl, isMobile ? 0.85 : 1.35, fF);
      ry = lerp(ry, 0.4 + t * 0.12, fF);
      rx2 = lerp(rx2, -0.05 + mouse.y * 0.1 * tweak.motion, fF);
      rz2 = lerp(rz2, 0, fF);
    }

    var eE = ease(pEnd);
    px = lerp(px, 0, eE);
    py = lerp(py, -0.15 + float1 * 0.7, eE);
    scl = lerp(scl, 1.9, eE);
    ry = lerp(ry, 0.25 + t * 0.05, eE);
    rx2 = lerp(rx2, -0.04 + mouse.y * 0.08, eE);
    rz2 = lerp(rz2, 0, eE);

    py += lerp(-1.1, 0, ei);

    /* blast slows rotation, adds tremor */
    ry += blast * Math.sin(t * 30) * 0.01;

    tGroup.position.set(px, py, pz);
    tGroup.scale.setScalar(scl);
    tGroup.rotation.set(rx2, ry, rz2);

    camera.position.z = lerp(15.5, 7.4, ei) + pHero * 1.1 - eE * 0.6;
    camera.position.x = mouse.x * 0.3 * tweak.motion + (Math.random() - 0.5) * 0.14 * blast;
    camera.position.y = -mouse.y * 0.18 * tweak.motion + (Math.random() - 0.5) * 0.14 * blast;
    camera.lookAt(lerp(0, px * 0.55, 0.5), 0, 0);

    var lightRamp = ei;
    key.intensity = 90 * lightRamp * (1 - pGone * 0.85 + eE * 0.8 + fF * 0.9);
    key.position.x = -4 + mouse.x * 5 * tweak.motion;
    key.position.y = 4 - mouse.y * 2.5 * tweak.motion;
    rim.intensity = 1.4 * lightRamp;
    var emberBase = (0.55 + Math.sin(t * 0.8) * 0.1) * tweak.glow;
    ember.intensity = 26 * emberBase * lightRamp * (1 - pHero * 0.55 + eE * 1.6 + fF * 1.5) * (1 + blast * 2.2);
    ember.position.x = -1.4 + mouse.x * 0.8;
    glow.material.opacity = Math.min(1, 0.5 * emberBase * lightRamp * (1 - pHero * 0.7 + eE * 1.2 + fF * 1.2) * (1 + blast));
    glow.position.x = px - 0.6;
    glow.scale.setScalar(7 + eE * 3 + blast * 2.5);

    shadow.material.opacity = lightRamp * (1 - pHero) * 0.9 * (1 - blast);
    shadow.position.x = px;

    particles.rotation.y = t * 0.008 * tweak.motion + mouse.x * 0.02;
    particles.position.y = Math.sin(t * 0.11) * 0.15;
    pMat.opacity = Math.min(0.6, 0.45 * lightRamp * (1 - pGone * 0.9 + eE + fF));
    pMat.color.setHex(eE > 0.4 ? 0xf5a066 : 0xbfb6aa);

    /* ---- wires ---- */
    var wireVis = lightRamp * (1 - pGone);
    for (var wi = 0; wi < wires.length; wi++) {
      var w = wires[wi];
      w.mat.opacity = 0.3 * wireVis;
      w.spark.material.opacity *= 0.86;
      if (wireVis <= 0.02) { w.line.visible = false; w.spark.visible = false; continue; }
      w.line.visible = true; w.spark.visible = true;

      mouseWorldAt(w.z, mw);
      var posAttr = w.line.geometry.attributes.position;
      var arr = posAttr.array;
      var maxSpeed = 0, maxK = -1;
      for (var k = 0; k < WP; k++) {
        var bx = w.base[k * 3], by = w.base[k * 3 + 1];
        var ox = w.off[k * 2], oy = w.off[k * 2 + 1];
        var vx = w.vel[k * 2], vy = w.vel[k * 2 + 1];

        var dx = (bx + ox) - mw.x, dy = (by + oy) - mw.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 1.44 && d2 > 0.0001) {
          var d = Math.sqrt(d2);
          var push = (1 - d / 1.2) * 0.09;
          vx += (dx / d) * push;
          vy += (dy / d) * push;
        }
        vx += -ox * 0.11 - vx * 0.12;
        vy += -oy * 0.11 - vy * 0.12;
        ox += vx; oy += vy;
        w.vel[k * 2] = vx; w.vel[k * 2 + 1] = vy;
        w.off[k * 2] = ox; w.off[k * 2 + 1] = oy;

        arr[k * 3] = bx + ox;
        arr[k * 3 + 1] = by + oy + Math.sin(t * 0.6 + k * 0.22 + wi * 2.1) * 0.035;
        arr[k * 3 + 2] = w.base[k * 3 + 2];

        var sp = vx * vx + vy * vy;
        if (sp > maxSpeed) { maxSpeed = sp; maxK = k; }
      }
      posAttr.needsUpdate = true;

      if (maxK >= 0 && maxSpeed > 0.0004) {
        w.spark.position.set(arr[maxK * 3], arr[maxK * 3 + 1], arr[maxK * 3 + 2] + 0.05);
        var flick = 0.6 + Math.random() * 0.4;
        w.spark.material.opacity = Math.min(0.95, Math.sqrt(maxSpeed) * 22) * flick * wireVis;
        var ss = 0.5 + Math.sqrt(maxSpeed) * 8;
        w.spark.scale.set(ss, ss, 1);
      }
      /* electric shock sound on strong wire contact */
      if (maxSpeed > 0.0032 && now - lastZap > 300) {
        lastZap = now;
        if (window.__theosAudio && window.__theosAudio.zap) {
          window.__theosAudio.zap(Math.min(1, Math.sqrt(maxSpeed) * 11));
        }
      }
    }

    if (pGone >= 1 && pEnd <= 0 && fF <= 0.001) return;
    renderer.render(scene, camera);
  }

  if (reduced) {
    tGroup.rotation.set(-0.08, 0.4, 0);
    tGroup.scale.setScalar(1.5);
    camera.position.z = 7.4;
    wires.forEach(function (w) { w.spark.visible = false; });
    renderer.render(scene, camera);
    window.addEventListener('resize', function () { renderer.render(scene, camera); });
  } else {
    frame();
  }

  setTimeout(function () { body.classList.add('intro-done'); }, 6000);
})();

/* Theos — The Origin. A scroll-driven cinematic journey: darkness → marble
   civilization → four monuments (wisdom, creation, communication, harmony) →
   digital evolution → the Theos monolith. Vanilla Three.js, one fixed canvas;
   page scroll is the camera dolly. Reduced motion gets a still frame. */
(function () {
  var canvas = document.getElementById('origin-gl');
  if (!canvas || !window.THREE) return;
  var THREE = window.THREE;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 768px)').matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: 'high-performance' });
  } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.4 : 1.7));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setClearColor(0x0a0908, 1);

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0908, 0.024);
  var camera = new THREE.PerspectiveCamera(isMobile ? 52 : 44, 1, 0.1, 200);

  /* ---------- procedural marble ---------- */
  function marbleTexture(letter) {
    var c = document.createElement('canvas');
    c.width = c.height = 512;
    var g = c.getContext('2d');
    g.fillStyle = '#b8b0a4'; g.fillRect(0, 0, 512, 512);
    for (var v = 0; v < 26; v++) {
      g.strokeStyle = 'rgba(' + (90 + Math.random() * 40) + ',' + (84 + Math.random() * 36) + ',' + (76 + Math.random() * 30) + ',' + (0.1 + Math.random() * 0.16) + ')';
      g.lineWidth = 0.6 + Math.random() * 1.6;
      g.beginPath();
      var x = Math.random() * 512, y = 0;
      g.moveTo(x, y);
      while (y < 512) {
        y += 14 + Math.random() * 30;
        x += (Math.random() - 0.5) * 46;
        g.lineTo(x, y);
      }
      g.stroke();
    }
    for (var d = 0; d < 2400; d++) {
      g.fillStyle = 'rgba(70,64,58,' + Math.random() * 0.05 + ')';
      g.fillRect(Math.random() * 512, Math.random() * 512, 1.4, 1.4);
    }
    if (letter) {
      g.font = '500 300px Geist, sans-serif';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillStyle = 'rgba(74,66,58,0.5)';
      g.fillText(letter, 256, 276);
      g.fillStyle = 'rgba(243,109,31,0.16)';
      g.fillText(letter, 254, 274);
    }
    var t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }

  function floorTexture() {
    var c = document.createElement('canvas');
    c.width = c.height = 1024;
    var g = c.getContext('2d');
    g.fillStyle = '#161311'; g.fillRect(0, 0, 1024, 1024);
    g.strokeStyle = 'rgba(196,186,172,0.1)'; g.lineWidth = 1;
    for (var i = 0; i <= 16; i++) {
      g.beginPath(); g.moveTo(i * 64, 0); g.lineTo(i * 64, 1024); g.stroke();
      g.beginPath(); g.moveTo(0, i * 64); g.lineTo(1024, i * 64); g.stroke();
    }
    /* golden-ratio construction circles + greek letters */
    g.strokeStyle = 'rgba(196,186,172,0.14)';
    [[512, 512, 300], [512, 512, 185], [700, 420, 115], [330, 640, 72]].forEach(function (cc) {
      g.beginPath(); g.arc(cc[0], cc[1], cc[2], 0, 7); g.stroke();
    });
    g.font = '500 64px Geist, sans-serif';
    g.fillStyle = 'rgba(196,186,172,0.13)';
    ['\u0398', '\u0395', '\u039F', '\u03A3'].forEach(function (L, i) {
      g.fillText(L, 180 + i * 220, 210 + (i % 2) * 560);
    });
    g.fillStyle = 'rgba(243,109,31,0.1)';
    g.fillText('\u0398', 178, 208);
    var t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 6);
    return t;
  }

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0x2b2723, 0.6));
  var moon = new THREE.DirectionalLight(0xbfc8d6, 0.9);
  moon.position.set(5, 10, -3);
  scene.add(moon);
  var key = new THREE.SpotLight(0xfff1e0, 60, 60, Math.PI / 4.5, 0.6, 1.5);
  key.position.set(-5, 9, 5);
  scene.add(key);
  var ember = new THREE.PointLight(0xf36d1f, 0, 26, 1.8);
  scene.add(ember);

  /* ---------- floor ---------- */
  var floor = new THREE.Mesh(
    new THREE.PlaneGeometry(240, 240),
    new THREE.MeshStandardMaterial({ map: floorTexture(), roughness: 0.35, metalness: 0.35, color: 0x8a8278 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.2;
  scene.add(floor);

  /* ---------- materials that evolve ---------- */
  var marbleMat = new THREE.MeshStandardMaterial({ map: marbleTexture(), roughness: 0.82, metalness: 0.05, color: 0xffffff });
  var evolving = []; // meshes whose material morphs stone→titanium

  /* ---------- architecture: columns + floating fragments ---------- */
  var CHAPTER_Z = [0, -16, -32, -48, -64, -80, -96, -112];
  function column(x, z, h, tilt) {
    var m = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.0, h, 22), marbleMat.clone());
    m.position.set(x, -3.2 + h / 2, z);
    if (tilt) m.rotation.z = tilt;
    scene.add(m); evolving.push(m);
    return m;
  }
  for (var ci = 0; ci < 12; ci++) {
    var zz = -10 - ci * 9 - Math.random() * 4;
    var side = ci % 2 === 0 ? -1 : 1;
    column(side * (5.5 + Math.random() * 3.5), zz, 7 + Math.random() * 5, Math.random() < 0.25 ? (Math.random() - 0.5) * 0.18 : 0);
  }
  /* floating fragments */
  var frags = [];
  for (var fi = 0; fi < (isMobile ? 16 : 30); fi++) {
    var geoF = fi % 3 === 0 ? new THREE.BoxGeometry(0.8 + Math.random(), 0.5 + Math.random() * 0.7, 0.6 + Math.random())
      : new THREE.TetrahedronGeometry(0.5 + Math.random() * 0.7);
    var mf = new THREE.Mesh(geoF, marbleMat.clone());
    mf.position.set((Math.random() - 0.5) * 22, Math.random() * 8 - 1, -8 - Math.random() * 110);
    mf.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    mf.userData = { spin: (Math.random() - 0.5) * 0.15, bob: Math.random() * 6.28 };
    scene.add(mf); frags.push(mf); evolving.push(mf);
  }

  /* ---------- four monuments (original abstract totems) ---------- */
  function latheTotem(profile, letter, z, x) {
    var pts = profile.map(function (p) { return new THREE.Vector2(p[0], p[1]); });
    var m = new THREE.Mesh(new THREE.LatheGeometry(pts, 40), new THREE.MeshStandardMaterial({
      map: marbleTexture(letter), roughness: 0.75, metalness: 0.08, color: 0xffffff
    }));
    m.position.set(x, -3.2, z);
    scene.add(m); evolving.push(m);
    /* plinth */
    var pl = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.5, 3.4), marbleMat.clone());
    pl.position.set(x, -3.0, z);
    scene.add(pl); evolving.push(pl);
    return m;
  }
  var totems = [
    /* wisdom: tall poised amphora */
    latheTotem([[0.02, 0], [1.15, 0.25], [0.85, 1.4], [1.35, 3.2], [0.62, 4.7], [0.85, 5.4], [0.3, 6.2], [0.02, 6.4]], '\u0398', CHAPTER_Z[2] - 4, 2.8),
    /* creation: heavy anvil-like form */
    latheTotem([[0.02, 0], [1.5, 0.2], [1.25, 1.1], [1.7, 2.1], [1.05, 3.4], [1.5, 4.4], [0.55, 5.2], [0.02, 5.35]], '\u0395', CHAPTER_Z[3] - 4, -3.0),
    /* communication: slender winged spindle */
    latheTotem([[0.02, 0], [0.9, 0.2], [0.4, 1.6], [1.2, 2.8], [0.35, 4.1], [0.95, 5.1], [0.18, 6.1], [0.02, 6.3]], '\u039F', CHAPTER_Z[4] - 4, 2.9),
    /* harmony: balanced double-curve */
    latheTotem([[0.02, 0], [1.25, 0.25], [0.7, 1.5], [1.15, 2.9], [0.7, 4.3], [1.05, 5.3], [0.4, 6.0], [0.02, 6.2]], '\u03A3', CHAPTER_Z[5] - 4, -2.9)
  ];

  /* wireframe overlays for the evolution chapter */
  var wires = [];
  totems.forEach(function (t) {
    var w = new THREE.LineSegments(
      new THREE.EdgesGeometry(t.geometry, 8),
      new THREE.LineBasicMaterial({ color: 0xf3a05f, transparent: true, opacity: 0 })
    );
    w.position.copy(t.position);
    scene.add(w);
    wires.push(w);
  });

  /* ---------- the T monolith (finale) ---------- */
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
  var tGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 3, curveSegments: 22 });
  tGeo.center();
  var tMono = new THREE.Mesh(tGeo, new THREE.MeshStandardMaterial({
    color: 0x9b948c, metalness: 0.92, roughness: 0.34
  }));
  tMono.position.set(0, 0.4, CHAPTER_Z[7] - 6);
  tMono.scale.setScalar(2.4);
  scene.add(tMono);
  var glowTex = (function () {
    var c = document.createElement('canvas'); c.width = c.height = 256;
    var g = c.getContext('2d');
    var gr = g.createRadialGradient(128, 128, 4, 128, 128, 128);
    gr.addColorStop(0, 'rgba(243,109,31,0.5)'); gr.addColorStop(1, 'rgba(243,109,31,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  })();
  var glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
  glow.scale.set(10, 10, 1);
  glow.position.copy(tMono.position);
  glow.position.z -= 1.5;
  scene.add(glow);

  /* ---------- particles: dust + stars ---------- */
  function points(n, spread, size, color, op) {
    var geo = new THREE.BufferGeometry();
    var pos = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread[0];
      pos[i * 3 + 1] = Math.random() * spread[1] - 4;
      pos[i * 3 + 2] = -Math.random() * spread[2] + 6;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var mat = new THREE.PointsMaterial({ size: size, map: glowTex, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, color: color });
    var p = new THREE.Points(geo, mat);
    scene.add(p);
    return p;
  }
  var dust = points(isMobile ? 260 : 520, [30, 14, 125], 0.05, 0xcfc6b8, 0.35);
  var stars = points(isMobile ? 200 : 400, [120, 70, 140], 0.09, 0xdfd8cc, 0.5);
  stars.position.y = 14;

  /* ---------- scroll + camera ---------- */
  var mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  window.addEventListener('pointermove', function (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  var vw = 0, vh = 0;
  function size() {
    vw = window.innerWidth; vh = window.innerHeight;
    renderer.setSize(vw, vh);
    camera.aspect = vw / vh;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', size);
  size();

  var track = document.getElementById('origin-track');
  var END_Z = CHAPTER_Z[7] - 0.5;
  var hidden = false;
  document.addEventListener('visibilitychange', function () { hidden = document.hidden; });
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  var clock = new THREE.Clock();
  var su = 0;

  function frame() {
    if (!reduced) requestAnimationFrame(frame);
    if (hidden) return;
    var t = clock.getElapsedTime();
    var rect = track.getBoundingClientRect();
    var u = clamp01(-rect.top / Math.max(1, rect.height - vh));
    su += (u - su) * 0.07;
    if (reduced) su = 0.05;

    mouse.sx += (mouse.x - mouse.sx) * 0.05;
    mouse.sy += (mouse.y - mouse.sy) * 0.05;

    /* camera dolly along the axis */
    var cz = 8 + su * (END_Z - 2 - 8);
    camera.position.set(
      Math.sin(su * Math.PI * 2.2) * 1.6 + mouse.sx * 0.6,
      0.6 + Math.sin(su * Math.PI * 3.1) * 0.5 - mouse.sy * 0.4,
      cz
    );
    camera.lookAt(Math.sin(su * Math.PI * 2.2) * 0.5, 0.2, cz - 9);

    /* evolution: 0 before ch6, ramps to 1 through ch6-7 */
    var evo = clamp01((su - 0.68) / 0.2);
    var finale = clamp01((su - 0.84) / 0.14);

    evolving.forEach(function (m, i) {
      var mm = m.material;
      mm.metalness = 0.05 + evo * 0.85;
      mm.roughness = 0.82 - evo * 0.5;
      if (mm.color) mm.color.setRGB(1 - evo * 0.45, 1 - evo * 0.47, 1 - evo * 0.48);
    });
    wires.forEach(function (w) { w.material.opacity = evo * (1 - finale) * 0.8 + finale * 0.15; });

    totems.forEach(function (tm, i) { tm.rotation.y = t * 0.08 + i; });
    frags.forEach(function (f) {
      f.rotation.y += f.userData.spin * 0.016;
      f.position.y += Math.sin(t * 0.5 + f.userData.bob) * 0.0035;
    });

    /* lights evolve */
    var intro = clamp01(su / 0.06);
    key.intensity = 60 * (0.25 + intro * 0.75);
    ember.intensity = 8 * clamp01((su - 0.32) / 0.2) + 30 * finale;
    ember.position.set(camera.position.x, 1.5, cz - 10);
    moon.intensity = 0.9 - evo * 0.4;
    scene.fog.density = 0.024 - finale * 0.008;

    /* finale monolith */
    tMono.rotation.y = 0.3 + t * 0.1 + mouse.sx * 0.2;
    tMono.position.y = 0.4 + Math.sin(t * 0.5) * 0.12;
    glow.material.opacity = finale * (0.5 + Math.sin(t * 0.9) * 0.1);
    dust.material.color.setHex(evo > 0.5 ? 0xf5a066 : 0xcfc6b8);

    renderer.render(scene, camera);
  }
  frame();
  if (reduced) { renderer.render(scene, camera); }
})();

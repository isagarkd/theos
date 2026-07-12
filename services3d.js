/* THEOS — services storm v2.
   Light typographic intro → animated shader storm clouds roll in → a realistic
   ridged stone descends → words shatter (with shimmer) → liquid-glass service
   cards surface one by one → the stone itself breaks into a particle field.
   Lightning + thunder throughout. Fully scroll-scrubbed. */
(function () {
  var section = document.getElementById('capabilities');
  var canvas = document.getElementById('cap-gl');
  if (!section || !canvas) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = window.matchMedia('(max-width: 900px)').matches;
  if (reduced || small || !window.THREE) { document.body.classList.add('svc-static'); return; }

  var THREE = window.THREE;
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { document.body.classList.add('svc-static'); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
  camera.position.set(0, 0, 9);

  /* ================= animated storm-cloud backdrop (shader) ================= */
  var cloudUniforms = {
    uTime: { value: 0 }, uDark: { value: 0 }, uFlash: { value: 0 }
  };
  var clouds = new THREE.Mesh(
    new THREE.PlaneGeometry(34, 16),
    new THREE.ShaderMaterial({
      uniforms: cloudUniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: [
        'varying vec2 vUv;',
        'uniform float uTime, uDark, uFlash;',
        'float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
        'float vnoise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);',
        '  return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), u.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), u.x), u.y); }',
        'float fbm(vec2 p){ float v = 0.0; float a = 0.5; for(int i = 0; i < 5; i++){ v += a * vnoise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; } return v; }',
        'void main(){',
        '  vec2 uv = vUv * vec2(2.8, 1.5);',
        '  float q = fbm(uv * 1.9 + vec2(uTime * 0.022, uTime * 0.006));',
        '  float c = fbm(uv * 3.8 + q * 1.4 - vec2(uTime * 0.014, 0.0));',
        '  float cl = smoothstep(0.32, 0.88, q * 0.65 + c * 0.55);',
        '  vec3 sky = mix(vec3(0.045, 0.042, 0.038), vec3(0.085, 0.08, 0.075), vUv.y);',
        '  vec3 cloudCol = mix(vec3(0.115, 0.108, 0.10), vec3(0.30, 0.29, 0.285), cl);',
        '  vec3 col = mix(sky, cloudCol, cl * 0.92);',
        '  col += uFlash * vec3(0.72, 0.76, 0.92) * (0.30 + 0.85 * cl);',
        '  col += vec3(0.34, 0.13, 0.03) * pow(1.0 - vUv.y, 3.0) * 0.22;',
        '  gl_FragColor = vec4(col, uDark);',
        '}'
      ].join('\n')
    })
  );
  clouds.position.z = -8;
  scene.add(clouds);

  /* ================= realistic ridged stone ================= */
  function hash(x, y, z) {
    var s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
    return s - Math.floor(s);
  }
  function noise3(x, y, z) {
    var xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    var xf = x - xi, yf = y - yi, zf = z - zi;
    function f(t) { return t * t * (3 - 2 * t); }
    var u = f(xf), v = f(yf), w = f(zf);
    function h(i, j, k) { return hash(xi + i, yi + j, zi + k); }
    return (h(0,0,0)*(1-u)+h(1,0,0)*u)*(1-v)*(1-w) + (h(0,1,0)*(1-u)+h(1,1,0)*u)*v*(1-w)
         + (h(0,0,1)*(1-u)+h(1,0,1)*u)*(1-v)*w + (h(0,1,1)*(1-u)+h(1,1,1)*u)*v*w;
  }
  function ridged(x, y, z) {
    var v = 0, a = 0.55, fq = 1;
    for (var o = 0; o < 4; o++) {
      var n = noise3(x * fq + 7, y * fq + 3, z * fq + 11);
      v += a * (1 - Math.abs(2 * n - 1));
      fq *= 2.1; a *= 0.5;
    }
    return v;
  }

  var rockGeo = new THREE.IcosahedronGeometry(2.0, 6);
  (function () {
    var pos = rockGeo.attributes.position;
    var v = new THREE.Vector3();
    for (var i = 0; i < pos.count; i++) {
      v.set(pos.getX(i), pos.getY(i), pos.getZ(i));
      var n = v.clone().normalize();
      var broad = noise3(n.x * 1.3 + 5, n.y * 1.3, n.z * 1.3) - 0.5;          // silhouette
      var ridge = ridged(n.x * 2.4, n.y * 2.4, n.z * 2.4) - 0.55;             // rocky ridges
      var fine = noise3(n.x * 9, n.y * 9 + 4, n.z * 9) - 0.5;                 // chatter
      /* deep crevices: carve where a band of noise crosses zero */
      var cband = noise3(n.x * 3.1 + 17, n.y * 3.1 + 9, n.z * 3.1) - 0.5;
      var crev = Math.max(0, 1 - Math.abs(cband) * 9);
      crev = crev * crev * 0.16;
      /* flat facets: quantize a low-frequency field for chiseled planes */
      var facet = Math.round(noise3(n.x * 1.9 + 31, n.y * 1.9, n.z * 1.9) * 5) / 5 - 0.5;
      var r = 2.0 * (0.9 + broad * 0.3 + ridge * 0.18 + facet * 0.12 + fine * 0.04 - crev);
      v.copy(n).multiplyScalar(r);
      v.x *= 1.18; v.y *= 0.9; v.z *= 0.98;
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    rockGeo.computeVertexNormals();
  })();

  /* height field → albedo + normal map (Sobel) for crisp rocky shading */
  function heightAt(x, y) {
    var v = 0, a = 0.5, f = 1;
    for (var o = 0; o < 5; o++) {
      v += a * noise3(x * f * 0.011, y * f * 0.011, o * 7.3);
      f *= 2.1; a *= 0.5;
    }
    /* ridged crack veins */
    var band = noise3(x * 0.02 + 40, y * 0.02, 3.7) - 0.5;
    v -= Math.max(0, 1 - Math.abs(band) * 12) * 0.3;
    return v;
  }
  var SIZE = 512;
  var heights = new Float32Array(SIZE * SIZE);
  for (var hy = 0; hy < SIZE; hy++)
    for (var hx = 0; hx < SIZE; hx++)
      heights[hy * SIZE + hx] = heightAt(hx, hy);

  function rockMap(kind) {
    var c = document.createElement('canvas'); c.width = c.height = SIZE;
    var g = c.getContext('2d');
    var img = g.createImageData(SIZE, SIZE);
    var d = img.data;
    for (var y = 0; y < SIZE; y++) {
      for (var x = 0; x < SIZE; x++) {
        var i4 = (y * SIZE + x) * 4;
        var h = heights[y * SIZE + x];
        if (kind === 'normal') {
          var xl = heights[y * SIZE + Math.max(0, x - 1)];
          var xr = heights[y * SIZE + Math.min(SIZE - 1, x + 1)];
          var yu = heights[Math.max(0, y - 1) * SIZE + x];
          var yd = heights[Math.min(SIZE - 1, y + 1) * SIZE + x];
          var str = 2.6;
          var nx = (xl - xr) * str, ny = (yd - yu) * str, nz = 1;
          var nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
          d[i4] = ((nx / nl) * 0.5 + 0.5) * 255;
          d[i4 + 1] = ((ny / nl) * 0.5 + 0.5) * 255;
          d[i4 + 2] = ((nz / nl) * 0.5 + 0.5) * 255;
        } else if (kind === 'rough') {
          var rv = 185 + h * 90;
          d[i4] = d[i4 + 1] = d[i4 + 2] = Math.max(140, Math.min(255, rv));
        } else { /* albedo: dark granite with strata + speckle */
          var base = 52 + h * 96;
          var speck = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
          speck = (speck - Math.floor(speck)) * 26 - 8;
          var v2 = Math.max(22, Math.min(150, base + speck));
          d[i4] = v2 + 6; d[i4 + 1] = v2 + 1; d[i4 + 2] = v2 - 5;
        }
        d[i4 + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    var t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    return t;
  }

  var rockMat = new THREE.MeshStandardMaterial({
    map: rockMap('albedo'),
    normalMap: rockMap('normal'),
    normalScale: new THREE.Vector2(1.35, 1.35),
    roughnessMap: rockMap('rough'), roughness: 1,
    metalness: 0.03, transparent: true
  });
  var rock = new THREE.Mesh(rockGeo, rockMat);
  rock.position.y = 8;
  scene.add(rock);

  /* ================= stone shatter particles ================= */
  var SHARDS = 1600;
  var srcPos = rockGeo.attributes.position;
  var homes = new Float32Array(SHARDS * 3);
  var dirs = new Float32Array(SHARDS * 3);
  var speeds = new Float32Array(SHARDS);
  var cols = new Float32Array(SHARDS * 3);
  for (var si = 0; si < SHARDS; si++) {
    var vi = Math.floor(Math.random() * srcPos.count);
    var hx = srcPos.getX(vi), hy = srcPos.getY(vi), hz = srcPos.getZ(vi);
    homes[si * 3] = hx; homes[si * 3 + 1] = hy; homes[si * 3 + 2] = hz;
    var len = Math.sqrt(hx * hx + hy * hy + hz * hz) || 1;
    dirs[si * 3] = hx / len + (Math.random() - 0.5) * 0.7;
    dirs[si * 3 + 1] = hy / len + (Math.random() - 0.5) * 0.7 + 0.25;
    dirs[si * 3 + 2] = hz / len + (Math.random() - 0.5) * 0.7;
    speeds[si] = 1.4 + Math.random() * 3.4;
    var shade = 0.32 + Math.random() * 0.34;
    cols[si * 3] = shade; cols[si * 3 + 1] = shade * 0.95; cols[si * 3 + 2] = shade * 0.88;
  }
  var shGeo = new THREE.BufferGeometry();
  shGeo.setAttribute('position', new THREE.BufferAttribute(homes.slice(), 3));
  shGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  var shMat = new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0, depthWrite: false });
  var shatterPts = new THREE.Points(shGeo, shMat);
  shatterPts.visible = false;
  scene.add(shatterPts);

  /* lights */
  scene.add(new THREE.AmbientLight(0x8a857e, 0.45));
  var key = new THREE.DirectionalLight(0xdfe4ea, 1.7); key.position.set(-4, 7, 5); scene.add(key);
  var under = new THREE.DirectionalLight(0xf36d1f, 0.32); under.position.set(2, -6, 3); scene.add(under);
  var flashLight = new THREE.DirectionalLight(0xeef2ff, 0); flashLight.position.set(3, 8, 4); scene.add(flashLight);

  /* ================= DOM pieces ================= */
  var pin = section.querySelector('.svc-pin');
  var track = section.querySelector('.svc-track');
  var darkEl = section.querySelector('.svc-dark');
  var flashEl = section.querySelector('.svc-flash');
  var smokes = [].slice.call(section.querySelectorAll('.svc-smoke'));
  var wordsEl = section.querySelector('.svc-words');
  var cardsEls = [].slice.call(section.querySelectorAll('.svc-cards .svc-card'));

  var letters = [];
  [].slice.call(section.querySelectorAll('.svc-word')).forEach(function (w, wi) {
    var txt = w.textContent;
    w.textContent = '';
    for (var i = 0; i < txt.length; i++) {
      var sp = document.createElement('span');
      sp.className = 'sl';
      sp.textContent = txt[i];
      w.appendChild(sp);
      var a = hash(i * 3.7 + wi * 13.1, wi * 7.3, i * 1.9);
      var b = hash(i * 9.2, wi * 3.3 + 4, i * 6.1);
      var cc = hash(i * 5.5 + 8, wi * 11.7, i * 2.3);
      letters.push({ el: sp, dx: (a - 0.5) * 150, dy: -(24 + b * 100), rot: (cc - 0.5) * 190, fall: 34 + a * 70 });
    }
  });

  /* ================= lightning + thunder ================= */
  /* one-time sound hint: shown when the storm arrives and audio is locked */
  var hint = null, hintDone = false;
  function soundHint() {
    if (hintDone || hint) return;
    var a = window.__theosAudio;
    if (!a || a.running || a.muted) { hintDone = true; return; }
    hint = document.createElement('div');
    hint.className = 'sound-hint';
    hint.innerHTML = '<span class="sq"></span>Click anywhere for sound';
    document.body.appendChild(hint);
    function kill() {
      hintDone = true;
      window.removeEventListener('pointerdown', kill);
      window.removeEventListener('keydown', kill);
      if (hint) {
        hint.classList.add('bye');
        setTimeout(function () { if (hint) { hint.remove(); hint = null; } }, 600);
      }
    }
    window.addEventListener('pointerdown', kill);
    window.addEventListener('keydown', kill);
  }

  var stormOn = false, nextBolt = 0;
  function bolt() {
    var strength = 0.5 + Math.random() * 0.5;
    cloudUniforms.uFlash.value = 1.1 * strength;
    flashEl.style.transition = 'none';
    flashEl.style.opacity = String(0.4 * strength);
    flashLight.intensity = 7 * strength;
    setTimeout(function () {
      flashEl.style.transition = 'opacity 120ms linear';
      flashEl.style.opacity = '0.05';
      setTimeout(function () {
        flashEl.style.transition = 'none';
        flashEl.style.opacity = String(0.3 * strength);
        cloudUniforms.uFlash.value = 0.8 * strength;
        setTimeout(function () {
          flashEl.style.transition = 'opacity 700ms ease-out';
          flashEl.style.opacity = '0';
        }, 60);
      }, 90);
    }, 70);
    if (window.__theosAudio && window.__theosAudio.thunder) {
      setTimeout(function () { window.__theosAudio.thunder(strength); }, 180 + Math.random() * 500);
    }
    nextBolt = performance.now() + 3600 + Math.random() * 5200;
  }

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function sstep(p, a, b) { var t = clamp01((p - a) / (b - a)); return t * t * (3 - 2 * t); }

  var visible = true;
  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(section);

  function size() {
    var w = pin.clientWidth, h = pin.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', size);
  size();

  var clock = new THREE.Clock();
  var scatterArmed = true, crackArmed = true;

  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) {
      if (stormOn) { stormOn = false; if (window.__theosAudio && window.__theosAudio.setStorm) window.__theosAudio.setStorm(false); }
      return;
    }
    var t = clock.getElapsedTime();
    var tr = track.getBoundingClientRect();
    var p = clamp01(-tr.top / Math.max(1, tr.height - window.innerHeight));

    var pDark = sstep(p, 0.06, 0.22);
    var pRock = sstep(p, 0.11, 0.36);
    var pExp = sstep(p, 0.40, 0.53);
    var pShatter = sstep(p, 0.92, 1.0);

    /* atmosphere */
    cloudUniforms.uTime.value = t;
    cloudUniforms.uDark.value = pDark;
    cloudUniforms.uFlash.value *= 0.88;
    darkEl.style.opacity = String(pDark * 0.55);
    canvas.style.opacity = String(pDark > 0.02 ? 1 : 0);
    smokes.forEach(function (s, sm) {
      s.style.opacity = String(pDark * (sm ? 0.35 : 0.5));
      s.style.transform = 'translate(' + Math.sin(t * 0.05 + sm * 2.4) * 4 + '%,' + Math.cos(t * 0.04 + sm) * 3 + '%) scale(1.15)';
    });
    section.classList.toggle('storm', pDark > 0.5);

    var wantStorm = pDark > 0.55;
    if (wantStorm !== stormOn) {
      stormOn = wantStorm;
      if (window.__theosAudio && window.__theosAudio.setStorm) window.__theosAudio.setStorm(stormOn);
      if (stormOn) { nextBolt = performance.now() + 600; soundHint(); }
    }
    if (stormOn && performance.now() >= nextBolt) bolt();

    /* stone */
    var intact = 1 - pShatter;
    rock.visible = pShatter < 0.55;
    rockMat.opacity = 1 - sstep(pShatter, 0.05, 0.5);
    rock.position.y = 8 - pRock * 7.7 + Math.sin(t * 0.5) * 0.07 * pRock;
    rock.position.x = Math.sin(t * 0.3) * 0.05 * pRock;
    rock.rotation.y = t * 0.06 + p * 1.1;
    rock.rotation.x = -0.12 + Math.sin(t * 0.23) * 0.04;
    rock.rotation.z = 0.07;
    rock.scale.setScalar(1 + sstep(p, 0.55, 0.8) * 0.1);

    /* pre-shatter tremor */
    var tremor = sstep(p, 0.885, 0.92) * intact;
    rock.position.x += Math.sin(t * 34) * 0.03 * tremor;
    rock.position.y += Math.cos(t * 41) * 0.02 * tremor;
    flashLight.intensity *= 0.9;

    /* shatter particles (fully scrubbed by scroll) */
    if (pShatter > 0.001) {
      shatterPts.visible = true;
      shMat.opacity = Math.min(1, pShatter * 4) * (1 - sstep(pShatter, 0.7, 1));
      var pp = shGeo.attributes.position.array;
      var e = pShatter;
      for (var k = 0; k < SHARDS; k++) {
        var b3 = k * 3;
        pp[b3] = homes[b3] * rock.scale.x + rock.position.x + dirs[b3] * e * speeds[k] * 2.4;
        pp[b3 + 1] = homes[b3 + 1] * rock.scale.y + rock.position.y + dirs[b3 + 1] * e * speeds[k] * 2.4 - 3.4 * e * e;
        pp[b3 + 2] = homes[b3 + 2] * rock.scale.z + dirs[b3 + 2] * e * speeds[k] * 2.4;
      }
      shGeo.attributes.position.needsUpdate = true;
    } else {
      shatterPts.visible = false;
    }

    /* sounds: word scatter + stone crack (re-armed when scrolling back) */
    if (pExp > 0.12 && scatterArmed) { scatterArmed = false; if (window.__theosAudio && window.__theosAudio.scatter) window.__theosAudio.scatter(); }
    if (pExp < 0.03) scatterArmed = true;
    if (pShatter > 0.04 && crackArmed) { crackArmed = false; if (window.__theosAudio && window.__theosAudio.crack) window.__theosAudio.crack(); }
    if (pShatter < 0.01) crackArmed = true;

    /* words shatter */
    for (var i = 0; i < letters.length; i++) {
      var L = letters[i];
      if (pExp <= 0) { L.el.style.transform = ''; L.el.style.opacity = ''; continue; }
      var ee = pExp;
      L.el.style.transform = 'translate(' + (L.dx * ee) + 'px,' + (L.dy * ee + L.fall * ee * ee) + 'px) rotate(' + (L.rot * ee) + 'deg)';
      L.el.style.opacity = String(1 - sstep(ee, 0.5, 1));
    }
    wordsEl.style.pointerEvents = pExp > 0.5 ? 'none' : '';

    /* rectangular glass cards: one by one, with sheen sweep */
    cardsEls.forEach(function (c, ci) {
      var o = sstep(p, 0.50 + ci * 0.07, 0.57 + ci * 0.07);
      c.style.opacity = String(o);
      c.style.transform = 'translateY(' + (34 * (1 - o)) + 'px) scale(' + (0.94 + o * 0.06) + ')';
      c.classList.toggle('shine', o > 0.6);
    });

    renderer.render(scene, camera);
  }
  frame();
})();

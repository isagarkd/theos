/* THEOS — <image-slot>. Production build: renders the studio's work imagery
   into the slots authored in the design phase. The design-time drop-zone,
   reframe and persistence machinery is gone; each slot resolves its id to a
   static asset and renders a cover-fit image. Unknown ids render an empty
   frame so layout holds. */
(function () {
  'use strict';

  var IMAGES = {
    'work-sofy': { src: 'assets/work/sofy.webp', alt: 'Sofy — women’s health platform interface' },
    'work-motherson': { src: 'assets/work/motherson.webp', alt: 'Motherson — enterprise supplier portal dashboard' },
    'work-intrude': { src: 'assets/work/intrude.webp', alt: 'Intrude — premium streetwear e-commerce experience' },
    'work-segreto': { src: 'assets/work/segreto.webp', alt: 'Segreto — hospitality brand identity' }
  };

  var CSS =
    ':host{display:block;position:relative;width:100%;height:100%;aspect-ratio:3/2}' +
    '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
    '.frame img{width:100%;height:100%;object-fit:cover;display:block;' +
    '  -webkit-user-drag:none;user-select:none}';

  class ImageSlot extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._done = true;
      var root = this.attachShadow({ mode: 'open' });
      var style = document.createElement('style');
      style.textContent = CSS;
      root.appendChild(style);
      var frame = document.createElement('div');
      frame.className = 'frame';
      root.appendChild(frame);
      var entry = IMAGES[this.id];
      if (entry) {
        var img = document.createElement('img');
        img.src = entry.src;
        img.alt = entry.alt || '';
        img.loading = 'lazy';
        img.decoding = 'async';
        frame.appendChild(img);
        this.setAttribute('data-filled', '');
      }
    }
  }

  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();

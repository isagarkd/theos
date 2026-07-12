/* THEOS — client stories interaction. Tab list + featured quote with
   crossfade; arrows and tabs both drive it. */
(function () {
  var QUOTES = [
    { org: 'Motherson', who: 'Program lead', industry: 'Enterprise',
      text: 'They understood the business before they touched the product. The portal shipped ahead of our own estimate.' },
    { org: 'Sofy', who: 'Founder', industry: 'Healthcare',
      text: 'Theos made complex health content feel simple without dumbing it down. Our users noticed.' },
    { org: 'Intrude', who: 'Creative director', industry: 'Fashion',
      text: 'One team carried the brand from strategy to shelf. Nothing was lost in between.' }
  ];
  var view = document.querySelector('.client-view');
  var tabs = [].slice.call(document.querySelectorAll('.ct'));
  var elText = document.getElementById('cq-text');
  var elBy = document.getElementById('cq-by');
  var elNum = document.getElementById('cq-num');
  var elIdx = document.getElementById('cq-idx');
  if (!view || !elText) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur = 0, busy = false;

  function pad(n) { return (n < 9 ? '0' : '') + (n + 1); }

  function show(i) {
    if (i === cur || busy) return;
    busy = true;
    cur = ((i % QUOTES.length) + QUOTES.length) % QUOTES.length;
    tabs.forEach(function (t, ti) {
      t.classList.toggle('on', ti === cur);
      t.setAttribute('aria-selected', ti === cur ? 'true' : 'false');
    });
    if (window.__theosAudio) window.__theosAudio.click();
    function apply() {
      var q = QUOTES[cur];
      elText.textContent = q.text;
      elBy.textContent = q.who + ' \u2014 ' + q.org + ' \u00b7 ' + q.industry;
      elNum.textContent = pad(cur);
      elIdx.textContent = pad(cur) + ' / 0' + QUOTES.length;
    }
    if (reduced) { apply(); busy = false; return; }
    view.classList.add('swap');
    setTimeout(function () {
      apply();
      view.classList.remove('swap');
      setTimeout(function () { busy = false; }, 340);
    }, 330);
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { show(parseInt(t.getAttribute('data-i'), 10)); });
  });
  var prev = document.getElementById('cq-prev');
  var next = document.getElementById('cq-next');
  if (prev) prev.addEventListener('click', function () { show(cur - 1); });
  if (next) next.addEventListener('click', function () { show(cur + 1); });
})();

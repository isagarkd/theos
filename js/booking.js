/* Theos — booking modal. Any "Book a discovery call" CTA opens a glass popup
   with the discovery-call form (skipped on the contact page, which has the
   full form inline). Submit prepares the email and shows confirmation. */
(function () {
  if (document.getElementById('cform')) return; // contact page: inline form owns this

  var modal = document.createElement('div');
  modal.id = 'book-modal';
  modal.innerHTML =
    '<div class="bm-panel" role="dialog" aria-modal="true" aria-label="Book a discovery call">' +
      '<button class="icon-btn bm-close" type="button" aria-label="Close">&#10005;</button>' +
      '<p class="t-micro"><span class="sq"></span>Discovery call</p>' +
      '<h3>Book a discovery call.</h3>' +
      '<p class="bm-sub">30 minutes on the problem, not a pitch. Reply within 24 hours.</p>' +
      '<form class="bm-form" novalidate>' +
        '<div class="bm-row">' +
          '<div class="cfield"><label for="b-name">Name</label><input id="b-name" type="text" autocomplete="name" placeholder="Your name"></div>' +
          '<div class="cfield"><label for="b-email">Email</label><input id="b-email" type="email" autocomplete="email" placeholder="you@company.com"></div>' +
        '</div>' +
        '<div class="bm-row">' +
          '<div class="cfield"><label for="b-company">Company</label><input id="b-company" type="text" placeholder="Company or product"></div>' +
          '<div class="cfield"><label for="b-budget">Budget</label><select id="b-budget">' +
            '<option value="">Select a range</option><option>Under $5k</option><option>$5k – $15k</option>' +
            '<option>$15k – $50k</option><option>$50k+</option><option>Retainer / ongoing</option></select></div>' +
        '</div>' +
        '<div class="bm-row">' +
          '<div class="cfield"><label for="b-need">What you need</label><select id="b-need">' +
            '<option value="">Select a service</option><option>Product design</option><option>Website</option>' +
            '<option>Brand identity</option><option>Web development</option><option>Mobile app</option>' +
            '<option>AI &amp; automation</option><option>Growth &amp; SEO</option><option>Not sure yet</option></select></div>' +
          '<div class="cfield"><label for="b-date">Preferred date</label><input id="b-date" type="date"></div>' +
        '</div>' +
        '<div class="cfield"><label for="b-msg">The problem</label><textarea id="b-msg" placeholder="A few sentences about what you are building."></textarea></div>' +
        '<button class="btn btn-solid" type="submit">Request the call</button>' +
        '<p class="cform-note">Or write to <a href="mailto:hello@theos.design">hello@theos.design</a></p>' +
      '</form>' +
      '<div class="bm-done"><h3>Received.</h3><p>Your email draft is ready. We reply within 24 hours &mdash; usually sooner.</p></div>' +
    '</div>';
  document.body.appendChild(modal);

  var panel = modal.querySelector('.bm-panel');
  var form = modal.querySelector('.bm-form');
  var done = modal.querySelector('.bm-done');

  function open() {
    modal.classList.add('open');
    document.body.classList.add('bm-lock');
    form.style.display = '';
    done.classList.remove('show');
    setTimeout(function () { var f = modal.querySelector('#b-name'); if (f) f.focus(); }, 350);
    if (window.__theosAudio) window.__theosAudio.click();
  }
  function close() {
    modal.classList.remove('open');
    document.body.classList.remove('bm-lock');
  }
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  modal.querySelector('.bm-close').addEventListener('click', close);
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  /* intercept every Book CTA (capture: beats the page-transition handler) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a, button');
    if (!a || panel.contains(a)) return;
    var label = (a.textContent || '').trim().toLowerCase();
    if (label.indexOf('book a discovery call') !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    open();
  }, true);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = modal.querySelector('#b-name');
    var email = modal.querySelector('#b-email');
    if (!name.value.trim()) { name.focus(); return; }
    if (!email.value.includes('@')) { email.focus(); return; }
    var val = function (id) { return (modal.querySelector(id).value || '').trim(); };
    var body = 'Name: ' + name.value + '\nEmail: ' + email.value +
      (val('#b-company') ? '\nCompany: ' + val('#b-company') : '') +
      (val('#b-need') ? '\nNeeds: ' + val('#b-need') : '') +
      (val('#b-budget') ? '\nBudget: ' + val('#b-budget') : '') +
      (val('#b-date') ? '\nPreferred date: ' + val('#b-date') : '') +
      (val('#b-msg') ? '\n\n' + val('#b-msg') : '');
    var href = 'mailto:hello@theos.design?subject=' +
      encodeURIComponent('Discovery call — ' + name.value) +
      '&body=' + encodeURIComponent(body);
    form.style.display = 'none';
    done.classList.add('show');
    if (window.__theosAudio) window.__theosAudio.tick();
    window.open(href, '_self');
    setTimeout(close, 3200);
  });
})();

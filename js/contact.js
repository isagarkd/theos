/* Theos — contact form. Chips toggle, validation, success state.
   No backend in this prototype: submission opens a prefilled email and
   shows the confirmation panel. */
(function () {
  var form = document.getElementById('cform');
  if (!form) return;
  var chips = [].slice.call(form.querySelectorAll('.cchips .chip'));
  chips.forEach(function (ch) {
    ch.addEventListener('click', function (e) {
      e.preventDefault();
      ch.classList.toggle('on');
      if (window.__theosAudio) window.__theosAudio.click();
    });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.querySelector('#f-name');
    var email = form.querySelector('#f-email');
    if (!name.value.trim()) { name.focus(); return; }
    if (!email.value.includes('@')) { email.focus(); return; }
    var company = form.querySelector('#f-company').value.trim();
    var budget = form.querySelector('#f-budget').value;
    var msg = form.querySelector('#f-msg').value.trim();
    var kinds = chips.filter(function (c) { return c.classList.contains('on'); })
      .map(function (c) { return c.textContent.trim(); }).join(', ');
    var body = 'Name: ' + name.value + '\nEmail: ' + email.value +
      (company ? '\nCompany: ' + company : '') +
      (kinds ? '\nProject: ' + kinds : '') +
      (budget ? '\nBudget: ' + budget : '') +
      (msg ? '\n\n' + msg : '');
    var href = 'mailto:hello@theos.design?subject=' +
      encodeURIComponent('Discovery call — ' + name.value) +
      '&body=' + encodeURIComponent(body);
    form.classList.add('hide');
    var done = document.getElementById('contact-done');
    if (done) {
      done.classList.add('show');
      var mail = done.querySelector('a.send-mail');
      if (mail) mail.setAttribute('href', href);
    }
    if (window.__theosAudio) window.__theosAudio.tick();
    window.open(href, '_self');
  });
})();

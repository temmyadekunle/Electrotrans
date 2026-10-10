document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });
  }

  var form = document.querySelector('form[data-validate]');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    var invalid = [];
    form.querySelectorAll('[required]').forEach(function (field) {
      if (!field.value.trim()) {
        invalid.push(field);
      }
    });

    if (invalid.length) {
      event.preventDefault();
      invalid.forEach(function (field) {
        field.classList.add('invalid');
      });
      var message = form.querySelector('.form-message');
      if (message) {
        message.textContent = 'Please complete all required fields before sending.';
      }
      return;
    }

    event.preventDefault();

    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var company = form.querySelector('[name="company"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();
    var service = form.querySelector('[name="service"]').value.trim();
    var messageText = form.querySelector('[name="message"]').value.trim();
    var messageEl = form.querySelector('.form-message');

    function savedLocally() {
      var subject = encodeURIComponent('New service request from ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Company: ' + company + '\n' +
        'Phone: ' + phone + '\n' +
        'Service needed: ' + service + '\n\n' +
        'Message:\n' + messageText
      );
      var mailtoLink = 'mailto:cranemechatronics4sure@outlook.com?subject=' + subject + '&body=' + body;
      window.location.href = mailtoLink;
    }

    function fail(message) {
      if (messageEl) {
        messageEl.textContent = message || 'Something went wrong. Please try again or email us directly.';
      }
    }

    form.querySelector('button[type="submit"]').disabled = true;

    var db = window.ElectrotransDB;
    if (!db) { savedLocally(); return; }

    db.insert('enquiries', {
      name: name,
      email: email,
      company: company || null,
      phone: phone || null,
      service: service,
      message: messageText
    }).then(function (res) {
      if (res.error) throw res.error;
      if (messageEl) {
        messageEl.textContent = 'Thank you, ' + name + '. Your enquiry has been received — we will reply within one business day.';
        messageEl.style.color = '#7ee2a8';
      }
      form.reset();
    }).catch(function (err) {
      if (db && db.notConfigured()) {
        savedLocally();
        return;
      }
      fail(err && err.message ? err.message : undefined);
      console.error('Supabase insert failed:', err);
    }).then(function () {
      form.querySelector('button[type="submit"]').disabled = false;
    });
  });
});

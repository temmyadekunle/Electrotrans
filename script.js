document.addEventListener('DOMContentLoaded', function () {
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
    var service = form.querySelector('[name="service"]').value.trim();
    var messageText = form.querySelector('[name="message"]').value.trim();
    var subject = encodeURIComponent('New service request from ' + name);
    var body = encodeURIComponent(
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Company: ' + company + '\n' +
      'Service needed: ' + service + '\n\n' +
      'Message:\n' + messageText
    );
    var mailtoLink = 'mailto:cranemechatronics4sure@outlook.com?subject=' + subject + '&body=' + body;

    window.location.href = mailtoLink;
  });
});

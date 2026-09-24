const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-nav');

if (menuButton && menu) {
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menüyü aç');
  };

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.matchMedia('(min-width: 721px)').addEventListener('change', closeMenu);
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const message = contactForm.querySelector('#contact-message');
  const count = contactForm.querySelector('#message-count');
  const feedback = contactForm.querySelector('#form-feedback');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  message.addEventListener('input', () => {
    count.textContent = `${message.value.length} / 1000 karakter`;
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    submitButton.disabled = true;
    feedback.textContent = 'Mesaj gönderiliyor…';
    feedback.classList.remove('is-error');
    const endpoint = new URL(contactForm.action);
    endpoint.pathname = `/ajax${endpoint.pathname}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(contactForm)),
          _url: window.location.href
        })
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) {
        throw new Error('Submission was not accepted');
      }
      feedback.textContent = 'Mesajın alındı. Teşekkürler!';
      contactForm.reset();
      count.textContent = '0 / 1000 karakter';
    } catch {
      feedback.textContent = 'Mesaj gönderilemedi. Lütfen tekrar dene.';
      feedback.classList.add('is-error');
    } finally {
      submitButton.disabled = false;
    }
  });
}

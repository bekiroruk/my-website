const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  const english = document.documentElement.lang === 'en';
  const messages = english
    ? { unit: 'characters', sending: 'Sending your message…', success: 'Your message was received. Thank you!', error: 'The message could not be sent. Please try again.' }
    : { unit: 'karakter', sending: 'Mesaj gönderiliyor…', success: 'Mesajın alındı. Teşekkürler!', error: 'Mesaj gönderilemedi. Lütfen tekrar dene.' };
  const message = contactForm.querySelector('#contact-message');
  const count = contactForm.querySelector('#message-count');
  const feedback = contactForm.querySelector('#form-feedback');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  message.addEventListener('input', () => {
    count.textContent = `${message.value.length} / 1000 ${messages.unit}`;
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    submitButton.disabled = true;
    feedback.textContent = messages.sending;
    feedback.classList.remove('is-error');
    const endpoint = new URL(contactForm.action);
    endpoint.pathname = `/ajax${endpoint.pathname}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(contactForm)), _url: window.location.href })
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('Submission was not accepted');
      feedback.textContent = messages.success;
      contactForm.reset();
      count.textContent = `0 / 1000 ${messages.unit}`;
    } catch {
      feedback.textContent = messages.error;
      feedback.classList.add('is-error');
    } finally {
      submitButton.disabled = false;
    }
  });
}


// Keep technology highlights inside each tile without changing its size.
{
  const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.tech').forEach((tile) => {
    let frame = null;
    let x = 0;
    let y = 0;
    tile.addEventListener('pointermove', (event) => {
      if (!hoverPointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
      const rect = tile.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        tile.style.setProperty('--light-x', `${x}px`);
        tile.style.setProperty('--light-y', `${y}px`);
        frame = null;
      });
    });
    tile.addEventListener('pointerleave', () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      tile.style.removeProperty('--light-x');
      tile.style.removeProperty('--light-y');
    });
  });
}

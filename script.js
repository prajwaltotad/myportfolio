const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('span');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeIcon.textContent = isDark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

setTheme(localStorage.getItem('theme') === 'dark');
themeToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  setTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formMessage = contactForm.querySelector('.form-message');
  const originalButtonText = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  formMessage.textContent = '';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Unable to send message');

    formMessage.textContent = 'Thanks! Your message has been sent.';
    contactForm.reset();
  } catch (error) {
    formMessage.textContent = 'Something went wrong. Please email me directly.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});
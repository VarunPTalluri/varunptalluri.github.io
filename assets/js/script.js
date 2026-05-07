'use strict';

const elementToggleFunc = (elem) => elem.classList.toggle('active');

/* Sidebar (mobile) */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
}

/* Theme */
const THEME_KEY = 'vt-theme';
const themeToggle = document.getElementById('theme-toggle');
function applyStoredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const light = stored === 'light';
  document.body.classList.toggle('light-mode', light);
  if (themeToggle) themeToggle.checked = light;
}
applyStoredTheme();
if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    const light = themeToggle.checked;
    document.body.classList.toggle('light-mode', light);
    localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
  });
}

/* Page navigation */
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

function navTarget(el) {
  const t = el.dataset.navTarget || el.textContent || '';
  return t.trim().toLowerCase();
}

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    const target = navTarget(this);
    for (let j = 0; j < pages.length; j++) {
      const match = pages[j].dataset.page === target;
      pages[j].classList.toggle('active', match);
    }
    for (let j = 0; j < navigationLinks.length; j++) {
      const t = navTarget(navigationLinks[j]);
      navigationLinks[j].classList.toggle('active', t === target);
    }
    window.scrollTo(0, 0);
  });
}

/* Rotating subtitle */
const rotatingEl = document.getElementById('rotatingText');
if (rotatingEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const phrases = ['Software Engineer', 'Builder', 'CS × Business', 'ML + Systems', 'Product-minded'];
  let index = 0;
  setInterval(() => {
    rotatingEl.classList.add('fade-out');
    setTimeout(() => {
      index = (index + 1) % phrases.length;
      rotatingEl.textContent = phrases[index];
      rotatingEl.classList.remove('fade-out');
    }, 320);
  }, 3600);
}

/* Highlight cards — reveal on scroll */
const revealEls = document.querySelectorAll('[data-reveal]');
if (
  revealEls.length &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('reveal');
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('reveal'));
}

/* Optional contact form (template hook) */
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
      if (form.checkValidity()) formBtn.removeAttribute('disabled');
      else formBtn.setAttribute('disabled', '');
    });
  }
}

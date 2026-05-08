'use strict';

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

const navAnchors = document.querySelectorAll('[data-nav-anchor]');

function setActiveNavByHash(hash) {
  if (!navAnchors.length) return;
  const h = hash || '#education';
  navAnchors.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === h);
  });
}

navAnchors.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      }
      setActiveNavByHash(href);
    }
  });
});

const sectionIds = ['education', 'experience', 'skills', 'projects'];
const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

if (sections.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        setActiveNavByHash(`#${id}`);
      });
    },
    { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
}

window.addEventListener('DOMContentLoaded', () => {
  if (location.hash && document.querySelector(location.hash)) {
    setActiveNavByHash(location.hash);
  } else {
    setActiveNavByHash('#education');
  }
});

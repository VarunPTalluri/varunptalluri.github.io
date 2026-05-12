'use strict';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        target.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
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

(function initReadProgressAndToTop() {
  const fill = document.getElementById('spec-read-progress-fill');
  const toTop = document.getElementById('spec-to-top');
  if (!fill || !toTop) return;

  if (reduceMotion()) {
    fill.style.transition = 'none';
  }

  function onScroll() {
    const st = document.documentElement.scrollTop || document.body.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const p = h > 0 ? Math.min(100, (st / h) * 100) : 0;
    fill.style.width = `${p}%`;
    toTop.hidden = st < 420;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
  });
})();

(function initScrollReveals() {
  const els = document.querySelectorAll('.spec-reveal');
  if (!els.length) return;
  if (reduceMotion()) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
  );
  els.forEach((el) => io.observe(el));
})();

(function initCopyEmailAndToast() {
  const toast = document.getElementById('spec-toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.removeAttribute('hidden');
    clearTimeout(toastTimer);
    requestAnimationFrame(() => {
      toast.classList.add('is-showing');
    });
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-showing');
      setTimeout(() => toast.setAttribute('hidden', ''), 320);
    }, 2600);
  }

  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy-email') || '';
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to your clipboard.');
      } catch {
        showToast('Could not copy automatically. Please copy the address manually.');
      }
    });
  });
})();

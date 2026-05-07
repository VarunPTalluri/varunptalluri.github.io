'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const modalContainer = document.querySelector('[data-project-modal-container]');
  const overlay = document.querySelector('[data-project-overlay]');
  const closeBtn = document.querySelector('[data-project-modal-close-btn]');
  const modalImg = document.querySelector('[data-project-modal-img]');
  const modalTitle = document.querySelector('[data-project-modal-title]');
  const modalText = document.querySelector('[data-project-modal-text]');
  const modalLink = document.querySelector('[data-project-modal-link]');

  if (!modalContainer || !overlay || !modalTitle || !modalText) return;

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function openModal(item) {
    const title =
      item.querySelector('.project-title a')?.textContent?.trim() ||
      item.querySelector('.project-title')?.textContent?.trim() ||
      '';
    const tagline = item.querySelector('.project-tagline')?.textContent?.trim() || '';
    const bullets = item.querySelectorAll('.project-bullets li');
    const stackSpans = item.querySelectorAll('.project-stack span');
    const img = item.querySelector('.project-img img');
    const gh = item.dataset.github || '';

    modalTitle.textContent = title;
    if (modalImg) {
      modalImg.src = img?.getAttribute('src') || './assets/images/project-1.jpg';
      modalImg.alt = img?.getAttribute('alt') || title;
    }

    let html = '';
    if (tagline) {
      html += `<p class="project-modal-tagline">${escapeHtml(tagline)}</p>`;
    }
    if (bullets.length) {
      html += '<ul class="project-modal-bullets">';
      bullets.forEach((li) => {
        html += `<li>${escapeHtml(li.textContent.trim())}</li>`;
      });
      html += '</ul>';
    }
    if (stackSpans.length) {
      const stack = Array.from(stackSpans)
        .map((s) => s.textContent.trim())
        .filter(Boolean)
        .join(' · ');
      if (stack) {
        html += `<p class="project-modal-stack"><span class="project-modal-stack-label">Stack</span> ${escapeHtml(stack)}</p>`;
      }
    }
    modalText.innerHTML = html;

    if (modalLink) {
      if (gh.startsWith('http')) {
        modalLink.href = gh;
        modalLink.hidden = false;
      } else {
        modalLink.href = '#';
        modalLink.hidden = true;
      }
    }

    modalContainer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalContainer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-project-modal-open]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.closest('.project-item');
      if (item) openModal(item);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
      closeModal();
    }
  });
});

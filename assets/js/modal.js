document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    const modalContainer = document.querySelector('[data-project-modal-container]');
    const overlay = document.querySelector('[data-project-overlay]');
    const closeBtn = document.querySelector('[data-project-modal-close-btn]');

    const modalImg = document.querySelector('[data-project-modal-img]');
    const modalTitle = document.querySelector('[data-project-modal-title]');
    const modalText = document.querySelector('[data-project-modal-text]');
    const modalLink = document.querySelector('[data-project-modal-link]');

    projectItems.forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();

        const title = item.querySelector('.project-title')?.textContent || '';
        const description = item.querySelector('.project-description')?.textContent || '';
        const skills = item.querySelector('.project-skills')?.textContent || '';
        const img = item.querySelector('img');
        const imgSrc = img?.getAttribute('src') || './assets/images/project-placeholder.png';
        const altText = img?.getAttribute('alt') || '';
        const link = item.querySelector('a')?.getAttribute('href') || '';

        // Update modal content
        modalTitle.textContent = title;
        modalImg.src = imgSrc;
        modalImg.alt = altText;

        modalText.innerHTML = `
          <p>${description}</p>
          ${skills ? `<h4 style="margin-top: 10px;">Tech Stack:</h4><p>${skills}</p>` : ''}
        `;

        // Show/hide GitHub link
        if (link && link !== '#' && link.includes('github.com')) {
          modalLink.href = link;
          modalLink.style.display = 'inline-block';
        } else {
          modalLink.href = '#';
          modalLink.style.display = 'none';
        }

        // Show modal
        modalContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modalContainer.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
  });

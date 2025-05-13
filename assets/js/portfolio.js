// assets/js/portfolio.js

const projects = {
  "instagram-clone": {
    title: "Instagram Clone",
    description: "An Instagram-style web application with a React frontend and Flask backend. Uses SQLite, REST APIs, authentication with cookies/sessions, and deployed on AWS EC2.",
    tech: ["React", "Flask", "SQLite", "REST API", "AWS EC2"]
  },
  "search-engine": {
    title: "Search Engine",
    description: "A distributed search engine using MapReduce for indexing, tf-idf and PageRank for relevance scoring, and fault-tolerant partitioned architecture.",
    tech: ["MapReduce", "PageRank", "tf-idf", "Distributed Systems", "Python"]
  }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech-stack');
const closeBtn = document.querySelector('.close-button');

document.querySelectorAll('.project-popup-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.project;
    const proj = projects[key];

    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.description;
    modalTech.innerHTML = proj.tech.map(t => `<li>${t}</li>`).join('');

    modal.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

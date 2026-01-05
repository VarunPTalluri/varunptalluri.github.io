'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (!modalImg || !modalTitle || !modalText) return;

    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");

    if (avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (title) modalTitle.innerHTML = title.innerHTML;
    if (text) modalText.innerHTML = text.innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    if (!selectValue) return;
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    if (!selectValue) return;
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (!form || !formBtn) return;
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

/* ============================================================
   CURSOR (bulletproof): created in JS, appended to BODY
   - cannot be hidden by .active toggles
   - styles forced with !important
   - uses pointermove (best coverage)
   ============================================================ */
(function initVTCursor() {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!finePointer) return;

  // If a previous cursor exists, remove it (prevents duplicates during hot reloads)
  const oldDot = document.getElementById("vt-cursor-dot");
  const oldRing = document.getElementById("vt-cursor-ring");
  if (oldDot) oldDot.remove();
  if (oldRing) oldRing.remove();

  const dot = document.createElement("div");
  const ring = document.createElement("div");

  dot.id = "vt-cursor-dot";
  ring.id = "vt-cursor-ring";

  // Force styles that nothing can override
  const forceBase = (el) => {
    el.style.setProperty("position", "fixed", "important");
    el.style.setProperty("top", "0", "important");
    el.style.setProperty("left", "0", "important");
    el.style.setProperty("pointer-events", "none", "important");
    el.style.setProperty("z-index", "2147483647", "important");
    el.style.setProperty("opacity", "1", "important");
    el.style.setProperty("visibility", "visible", "important");
    el.style.setProperty("display", "block", "important");
    el.style.setProperty("will-change", "transform", "important");
    el.style.setProperty("transform", "translate3d(-9999px,-9999px,0)", "important");
  };

  forceBase(dot);
  forceBase(ring);

  // Make it visible on ANY background (no blend-mode surprises)
  dot.style.setProperty("width", "10px", "important");
  dot.style.setProperty("height", "10px", "important");
  dot.style.setProperty("border-radius", "999px", "important");
  dot.style.setProperty("background", "rgba(255,255,255,0.95)", "important");
  dot.style.setProperty("box-shadow", "0 0 0 2px rgba(0,0,0,0.35), 0 0 14px rgba(255,255,255,0.25)", "important");

  ring.style.setProperty("width", "34px", "important");
  ring.style.setProperty("height", "34px", "important");
  ring.style.setProperty("border-radius", "999px", "important");
  ring.style.setProperty("border", "2px solid rgba(255,255,255,0.85)", "important");
  ring.style.setProperty("box-shadow", "0 0 0 2px rgba(0,0,0,0.20)", "important");

  document.body.appendChild(ring);
  document.body.appendChild(dot);

  // Hide native cursor (desktop only)
  document.documentElement.style.setProperty("cursor", "none");
  document.body.style.setProperty("cursor", "none");

  let x = -9999, y = -9999;
  let rx = -9999, ry = -9999;

  const place = (el, px, py) => {
    el.style.setProperty(
      "transform",
      `translate3d(${px}px, ${py}px, 0) translate3d(-50%, -50%, 0)`,
      "important"
    );
  };

  const onMove = (e) => {
    x = e.clientX;
    y = e.clientY;
    place(dot, x, y);

    // hard re-assert visibility (guards against any rogue CSS changes)
    dot.style.setProperty("opacity", "1", "important");
    ring.style.setProperty("opacity", "1", "important");
  };

  document.addEventListener("pointermove", onMove, { passive: true });

  // Keep cursor stable through scroll / overlays
  window.addEventListener("scroll", () => {
    place(dot, x, y);
    place(ring, rx, ry);
  }, { passive: true });

  // If focus is lost, don't "freeze" on screen awkwardly
  window.addEventListener("blur", () => {
    x = y = rx = ry = -9999;
    place(dot, x, y);
    place(ring, x, y);
  });

  function animate() {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    place(ring, rx, ry);
    requestAnimationFrame(animate);
  }
  animate();
})();

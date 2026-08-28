/* ============================================================
   NAMO 9 TEA — 2026 Vanilla JS
   Replaces jQuery 2.2.4 + all 17 plugins
   No dependencies. ~180 lines.
   ============================================================ */

'use strict';

/* === 1. HEADER SCROLL BEHAVIOR === */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 80;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run immediately on load
}

/* === 2. MOBILE MENU TOGGLE === */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close when a mobile nav link is clicked
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close button inside mobile menu
  const closeBtn = mobileMenu.querySelector('.mobile-menu-close');
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
}

/* === 3. CAROUSEL CLASS === */
class Carousel {
  constructor(el) {
    this.el = el;
    this.slides = [...el.querySelectorAll('.carousel-slide')];
    this.current = 0;
    this.total = this.slides.length;
    this.autoTimer = null;
    this.INTERVAL = 3500;

    if (this.total < 2) {
      // Single image — no carousel controls needed
      if (this.slides[0]) this.slides[0].classList.add('is-active');
      return;
    }

    this.slides[0].classList.add('is-active');
    this.bindButtons();
    this.startAuto();
  }

  go(n) {
    this.slides[this.current].classList.remove('is-active');
    this.current = (n + this.total) % this.total;
    this.slides[this.current].classList.add('is-active');
  }

  prev() {
    clearInterval(this.autoTimer);
    this.go(this.current - 1);
    this.startAuto();
  }

  next() {
    clearInterval(this.autoTimer);
    this.go(this.current + 1);
    this.startAuto();
  }

  bindButtons() {
    const prevBtn = this.el.querySelector('.carousel-btn--prev');
    const nextBtn = this.el.querySelector('.carousel-btn--next');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
  }

  startAuto() {
    this.autoTimer = setInterval(() => this.go(this.current + 1), this.INTERVAL);
  }
}

function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(el => new Carousel(el));
}

/* === 4. MODAL SYSTEM === */
function initModals() {
  // Open modal
  document.querySelectorAll('[data-modal-trigger]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const targetId = btn.dataset.modalTrigger;
      const overlay = document.getElementById(targetId);
      if (!overlay) return;

      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Focus the close button for accessibility
      const closeBtn = overlay.querySelector('[data-modal-close]');
      if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
    });
  });

  // Close modal via backdrop click or close button
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('[data-modal-close]')) {
        closeModal(overlay);
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.is-open').forEach(closeModal);
    }
  });
}

function closeModal(overlay) {
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* === 5. SCROLL REVEAL (Intersection Observer) === */
function initScrollReveal() {
  // Apply stagger delays from data attributes
  document.querySelectorAll('[data-reveal-delay]').forEach(el => {
    el.style.transitionDelay = el.dataset.revealDelay + 'ms';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

/* === 6. INIT ON DOM READY === */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initCarousels();
  initModals();
  initScrollReveal();
});

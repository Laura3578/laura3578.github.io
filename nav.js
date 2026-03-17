/* Walsh Psychology — Shared Navigation JS  nav.js */

(function () {
  'use strict';

  function getEls() {
    return {
      menu: document.getElementById('mobileMenu'),
      btn:  document.getElementById('hamburgerBtn')
    };
  }

  function openMenu() {
    const { menu, btn } = getEls();
    if (!menu || !btn) return;
    menu.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
    // Focus the first link in the mobile menu for keyboard users
    const firstLink = menu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    const { menu, btn } = getEls();
    if (!menu || !btn) return;
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }

  window.toggleMobileMenu = function () {
    const { menu } = getEls();
    if (!menu) return;
    menu.classList.contains('open') ? closeMenu() : openMenu();
  };

  window.closeMobileMenu = closeMenu;

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Focus trap inside mobile menu
  document.addEventListener('keydown', function (e) {
    const { menu } = getEls();
    if (!menu || !menu.classList.contains('open')) return;
    if (e.key !== 'Tab') return;
    const focusable = menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  });

  // Initialise aria attributes on hamburger button on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('hamburgerBtn');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'mobileMenu');
              btn.addEventListener('click', toggleMobileMenu);
    }
  });
}());

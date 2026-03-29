/* ==========================================================================
   LQM Mississauga — Main JavaScript
   Handles: smooth scroll, accordion (classes + resources), nav active state,
            mobile hamburger menu
   ========================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------------------------
     Hamburger / Mobile Nav
  -------------------------------------------------------------------------- */
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* -------------------------------------------------------------------------
     Accordion — Classes
     Only one item open at a time.
  -------------------------------------------------------------------------- */
  const classAccordion = document.getElementById('classes-accordion');

  if (classAccordion) {
    classAccordion.addEventListener('click', function (e) {
      const trigger = e.target.closest('.accordion-trigger');
      if (!trigger) return;

      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all items
      classAccordion.querySelectorAll('.accordion-item').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.accordion-trigger').setAttribute('aria-expanded', false);
      });

      // Open clicked item (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', true);
      }
    });
  }

  /* -------------------------------------------------------------------------
     Tabs — Madinah Book Resources (Book 1 / Book 2 / Book 3)
  -------------------------------------------------------------------------- */
  const tabNav = document.querySelector('.tab-nav[role="tablist"]');

  if (tabNav) {
    tabNav.addEventListener('click', function (e) {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      const tabId = btn.dataset.tab;

      // Update tab buttons
      tabNav.querySelectorAll('.tab-btn').forEach(function (b) {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive);
      });

      // Show matching panel, hide others
      document.querySelectorAll('.tab-panel').forEach(function (panel) {
        panel.classList.toggle('active', panel.id === 'tab-' + tabId);
      });
    });
  }

  /* -------------------------------------------------------------------------
     Nav Active State on Scroll
     Highlights the nav link corresponding to the section currently in view.
  -------------------------------------------------------------------------- */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('#nav-links a[href^="#"]');

  function onScroll() {
    const scrollY = window.scrollY + 80; // offset for fixed nav height

    let currentId = '';
    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

})();

/* ============================================================
   Accordion — Resource Groups
   Uses inline maxHeight so it works regardless of CSS cascade.
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.accordion-header').forEach(function(header) {
    header.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const chevron = this.querySelector('.accordion-chevron');

      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.overflow = 'visible';
        if (chevron) chevron.style.transform = 'rotate(90deg)';
      }
    });

    // Set all sections open by default on load
    const targetId = header.getAttribute('data-target');
    const content = document.getElementById(targetId);
    if (content) {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.overflow = 'visible';
    }
  });
});

/* ==========================================================================
   LQM Mississauga — Main JavaScript
   Handles: smooth scroll, accordion (classes + resources), nav active state,
            mobile hamburger menu, dynamic class rendering
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
  const sections   = document.querySelectorAll('section[id]');
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
   DOMContentLoaded — Classes rendering + all accordion setup
============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------------------
     Render Classes — builds cards from classes.js data array
  ----------------------------------------------------------------------- */
  var list = document.getElementById('classes-list');

  if (list && typeof classes !== 'undefined') {
    list.innerHTML = classes.map(function (cls) {
      // Build the register button based on status
      var buttonHTML;
      if (cls.status === 'active') {
        buttonHTML =
          '<a href="' + cls.registerLink + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-register">' +
          'Register for ' + cls.code + '</a>';
      } else if (cls.status === 'coming-soon') {
        buttonHTML =
          '<span class="btn btn-status-coming-soon btn-register">Coming Soon</span>';
      } else {
        buttonHTML =
          '<span class="btn btn-status-closed btn-register">Registration Closed</span>';
      }

      return (
        '<div class="accordion-item" data-slug="' + cls.slug + '">' +
          '<button class="accordion-trigger" aria-expanded="false" aria-controls="cls-' + cls.slug + '-body">' +
            '<span class="class-summary">' +
              '<span class="class-code">' + cls.code + '</span>' +
              ' \u2014 ' + cls.level + ' \u2014 ' + cls.format + ' \u2014 ' + cls.schedule +
            '</span>' +
            '<span class="class-toggle-icon" aria-hidden="true">+</span>' +
          '</button>' +
          '<div class="accordion-body" id="cls-' + cls.slug + '-body" role="region" aria-label="' + cls.code + ' details">' +
            '<div class="class-detail-grid">' +
              '<div class="class-detail-item">' +
                '<span class="class-detail-label">Instructor</span>' +
                '<span class="class-detail-value">' + cls.instructor + '</span>' +
              '</div>' +
              '<div class="class-detail-item">' +
                '<span class="class-detail-label">Schedule</span>' +
                '<span class="class-detail-value">' + cls.scheduleDetail + '</span>' +
              '</div>' +
              '<div class="class-detail-item">' +
                '<span class="class-detail-label">Prerequisite</span>' +
                '<span class="class-detail-value">' + cls.prerequisite + '</span>' +
              '</div>' +
              '<div class="class-detail-item class-detail-item--full">' +
                '<span class="class-detail-label">Comments</span>' +
                '<span class="class-detail-value">' + cls.comments + '</span>' +
              '</div>' +
            '</div>' +
            buttonHTML +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* -----------------------------------------------------------------------
     Classes Accordion — one card open at a time
  ----------------------------------------------------------------------- */
  if (list) {
    list.addEventListener('click', function (e) {
      var trigger = e.target.closest('.accordion-trigger');
      if (!trigger) return;

      var item   = trigger.closest('.accordion-item');
      var isOpen = item.classList.contains('open');

      // Close all
      list.querySelectorAll('.accordion-item').forEach(function (el) {
        el.classList.remove('open');
        el.querySelector('.accordion-trigger').setAttribute('aria-expanded', false);
        el.querySelector('.class-toggle-icon').textContent = '+';
      });

      // Open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', true);
        trigger.querySelector('.class-toggle-icon').textContent = '\u2212'; // minus sign
      }
    });
  }

  /* -----------------------------------------------------------------------
     Resource Accordion — independent per-section collapse/expand
  ----------------------------------------------------------------------- */
  var allHeaders = document.querySelectorAll('.accordion-header');

  allHeaders.forEach(function (header, index) {
    header.addEventListener('click', function () {
      var targetId = this.getAttribute('data-target');
      var content  = document.getElementById(targetId);
      var chevron  = this.querySelector('.accordion-chevron');

      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        content.style.overflow  = 'hidden';
        if (chevron) chevron.textContent = '+';
      } else {
        content.style.maxHeight = '5000px';
        if (chevron) chevron.textContent = '\u2212'; // minus sign
      }
    });

    // Only open the first section (Madinah Book Resources) by default
    var targetId = header.getAttribute('data-target');
    var content  = document.getElementById(targetId);
    if (content) {
      if (index === 0) {
        content.style.maxHeight = '5000px';
        var chevron = header.querySelector('.accordion-chevron');
        if (chevron) chevron.textContent = '\u2212';
      } else {
        content.style.maxHeight = '0px';
        content.style.overflow  = 'hidden';
      }
    }
  });

});

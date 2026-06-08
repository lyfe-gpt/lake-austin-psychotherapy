/* Lake Austin Psychotherapy — shared site behavior */
(function () {
  // Render Lucide icons
  if (window.lucide) lucide.createIcons();

  // Nav: transparent at top, frosted forest once scrolled
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 12); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mega menu ----
  var megaTrigger = document.getElementById('mega-trigger');
  var megaPanel   = document.getElementById('mega-panel');
  var megaBtn     = megaTrigger && megaTrigger.querySelector('.mega-btn');
  var closeTimer;

  function openMega() {
    clearTimeout(closeTimer);
    if (!megaPanel) return;
    megaPanel.classList.add('open');
    if (megaBtn) megaBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMega() {
    if (!megaPanel) return;
    megaPanel.classList.remove('open');
    if (megaBtn) megaBtn.setAttribute('aria-expanded', 'false');
  }

  function scheduledClose() {
    closeTimer = setTimeout(closeMega, 80);
  }

  if (megaTrigger && megaPanel) {
    // Hover open/close with a small grace window
    megaTrigger.addEventListener('mouseenter', openMega);
    megaTrigger.addEventListener('mouseleave', scheduledClose);
    megaPanel.addEventListener('mouseenter', function() { clearTimeout(closeTimer); });
    megaPanel.addEventListener('mouseleave', scheduledClose);

    // Click toggle (keyboard / touch)
    if (megaBtn) {
      megaBtn.addEventListener('click', function () {
        if (megaPanel.classList.contains('open')) closeMega();
        else openMega();
      });
    }

    // Escape to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMega();
    });

    // Click outside to close
    document.addEventListener('click', function (e) {
      if (!megaTrigger.contains(e.target) && !megaPanel.contains(e.target)) {
        closeMega();
      }
    });
  }

  // ---- Mobile hamburger ----
  var navHam    = document.getElementById('nav-ham');
  var navDrawer = document.getElementById('nav-drawer');

  if (navHam && navDrawer) {
    navHam.addEventListener('click', function () {
      var isOpen = navDrawer.classList.toggle('open');
      navHam.setAttribute('aria-expanded', String(isOpen));
      navDrawer.setAttribute('aria-hidden', String(!isOpen));
      // swap icon
      var icon = navHam.querySelector('i[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (window.lucide) lucide.createIcons({ nodes: [navHam] });
      }
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (q) q.addEventListener('click', function () { item.classList.toggle('open'); });
  });

  // Contact form — service pills (single select)
  document.querySelectorAll('.pill-row').forEach(function (row) {
    row.addEventListener('click', function (e) {
      var btn = e.target.closest('.pill');
      if (!btn) return;
      row.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('on'); });
      btn.classList.add('on');
    });
  });

  // Contact form — submit shows success state
  var form = document.getElementById('booking-form');
  if (form) {
    var success = document.getElementById('booking-success');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      if (success) success.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    var again = document.getElementById('send-another');
    if (again) again.addEventListener('click', function () {
      if (success) success.style.display = 'none';
      form.style.display = 'flex';
    });
  }
})();

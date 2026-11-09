(() => {
  'use strict';

  const fadeElements = document.querySelectorAll('.fadeUp, .fadeLeft, .fadeRight');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    fadeElements.forEach(element => observer.observe(element));
  } else {
    fadeElements.forEach(element => element.classList.add('visible'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  function setMenu(open) {
    hamburger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.inert = !open;
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (hamburger && menu && overlay) {
    setMenu(false);
    hamburger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    overlay.addEventListener('click', () => setMenu(false));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  }

  const track = document.getElementById('heroTrack');
  if (track) {
    const step = () => track.clientWidth / (matchMedia('(max-width:820px)').matches ? 1 : 3);
    document.getElementById('heroPrev')?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    document.getElementById('heroNext')?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  }

  const toggle = document.getElementById('galleryToggle');
  if (toggle) {
    const extraPhotos = [...document.querySelectorAll('[data-extra-photo]')];
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') !== 'true';
      extraPhotos.forEach(photo => { photo.hidden = !expanded; });
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.textContent = expanded ? 'Show fewer photos' : `Show all ${toggle.dataset.photoCount} photos`;
      if (!expanded) document.getElementById('photos')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const items = [...document.querySelectorAll('.gItem[data-src]')];
  const lightbox = document.getElementById('lightbox');
  const image = document.getElementById('lbImg');
  const close = document.getElementById('lbClose');
  const count = document.getElementById('lbCount');
  let current = 0;
  let previousFocus;
  let previousOverflow = '';
  function render() {
    const item = items[current];
    const alt = item.querySelector('img')?.alt || 'Property image';
    image.src = item.dataset.src;
    image.alt = alt;
    count.textContent = `${current + 1} / ${items.length} · ${alt}`;
  }
  function open(index) {
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    current = index;
    lightbox.hidden = false;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    render();
    close.focus();
  }
  function closeGallery() {
    lightbox.classList.remove('open');
    lightbox.hidden = true;
    document.body.style.overflow = previousOverflow;
    previousFocus?.focus();
  }
  function advance(direction) {
    current = (current + direction + items.length) % items.length;
    render();
  }
  if (items.length && lightbox && image && close && count) {
    items.forEach((item, index) => item.addEventListener('click', () => open(index)));
    close.addEventListener('click', closeGallery);
    document.getElementById('lbPrev')?.addEventListener('click', () => advance(-1));
    document.getElementById('lbNext')?.addEventListener('click', () => advance(1));
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeGallery(); });
  }
  document.addEventListener('keydown', event => {
    if (lightbox && !lightbox.hidden) {
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowLeft') advance(-1);
      if (event.key === 'ArrowRight') advance(1);
      if (event.key === 'Tab') {
        const controls = [...lightbox.querySelectorAll('button')];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    } else if (event.key === 'Escape' && menu?.classList.contains('open')) {
      setMenu(false);
      hamburger.focus();
    }
  });
})();

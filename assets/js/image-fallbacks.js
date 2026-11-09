(() => {
  'use strict';

  // Resolve from this script so fallback images also work on GitHub Pages subpaths.
  const fallback = new URL('../images/placeholders/image-unavailable.svg', document.currentScript.src).href;
  const triedSources = new WeakMap();

  function showFallback(img) {
    if (!(img instanceof HTMLImageElement)) return;
    const source = img.currentSrc || img.getAttribute('src');
    if (!source || source === fallback) return;

    let tried = triedSources.get(img);
    if (!tried) {
      tried = new Set();
      triedSources.set(img, tried);
    }
    // Prevent retry loops if a custom replacement is also unavailable.
    const custom = img.dataset.fallback;
    const replacement = custom && !tried.has(custom) ? custom : fallback;
    tried.add(replacement);
    img.removeAttribute('srcset');
    img.classList.add('image-fallback');
    if (replacement === fallback) img.alt = 'Photography coming soon';
    img.src = replacement;
  }

  document.addEventListener('error', event => showFallback(event.target), true);

  function checkImages() {
    document.querySelectorAll('img[src]').forEach(img => {
      if (img.getAttribute('src') && img.complete && img.naturalWidth === 0) showFallback(img);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkImages, { once: true });
  } else {
    checkImages();
  }
})();

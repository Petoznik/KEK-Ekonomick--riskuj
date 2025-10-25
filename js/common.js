document.addEventListener('DOMContentLoaded', () => {
  // set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mark active nav link
  const links = document.querySelectorAll('nav a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href === current || (href === 'index.html' && current === '')) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
});

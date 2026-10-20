(() => {
  const menu = document.querySelector('.work-menu');
  if (!menu) return;
  const trigger = menu.querySelector('summary');
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      trigger.focus();
    }
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  const toggle = document.querySelector('.work-theme');
  function syncTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    toggle.textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-pressed', String(dark));
  }
  toggle.addEventListener('click', () => {
    if (typeof applyTheme === 'function') applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    else {
      const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = theme;
      document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#292929' : '#1d7af1';
      try { localStorage.setItem('portfolio-theme', theme); } catch {}
    }
    syncTheme();
  });
  new MutationObserver(syncTheme).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
  syncTheme();
  if (document.body.classList.contains('work-page')) {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      if (!document.getElementById(link.hash.slice(1))) link.href = 'index.html' + link.hash;
    });
  }
})();

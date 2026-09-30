document.documentElement.classList.add('js');
(() => {
  const header = document.querySelector('.site-header');
  const glow = document.querySelector('.cursor-glow');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (glow && !reduceMotion) {
    window.addEventListener('pointermove', (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('open');
    mobileNav?.setAttribute('aria-hidden', 'true');
  };
  menuToggle?.addEventListener('click', () => {
    const open = mobileNav?.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
    mobileNav?.setAttribute('aria-hidden', String(!open));
  });
  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.case-card');
  filters.forEach((filter) => filter.addEventListener('click', () => {
    const selected = filter.dataset.filter;
    filters.forEach((item) => item.classList.toggle('active', item === filter));
    cards.forEach((card) => {
      const visible = selected === 'all' || card.dataset.category.split(' ').includes(selected);
      card.classList.toggle('is-hidden', !visible);
    });
  }));

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55%' });
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();

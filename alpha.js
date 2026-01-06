const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animateTargets = document.querySelectorAll('[data-animate]');
if (!prefersReduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animateTargets.forEach((el) => observer.observe(el));
} else {
  animateTargets.forEach((el) => el.classList.add('is-visible'));
}

const accordionItems = document.querySelectorAll('.accordion__item');
accordionItems.forEach((item) => {
  const trigger = item.querySelector('.accordion__trigger');
  const panel = item.querySelector('.accordion__panel');
  if (!trigger || !panel) return;
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
  trigger.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    trigger.click();
  });
});

const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const parallaxImage = document.querySelector('.parallax img');
if (!prefersReduced && parallaxImage) {
  let latestScroll = 0;
  let ticking = false;
  const update = () => {
    parallaxImage.style.transform = `translate3d(0, ${-(latestScroll * 0.12)}px, 0)`;
    ticking = false;
  };
  const onScroll = () => {
    latestScroll = window.scrollY || window.pageYOffset;
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

(function () {
  const header = document.querySelector('.home-header');
  const nav = document.querySelector('.home-nav');
  const toggle = document.querySelector('.nav-toggle');

  const body = document.body;

  if (!header || !nav || !toggle || !body) {
    return;
  }

  body.classList.add('nav-enhanced');

  const setExpandedState = (isOpen) => {
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    nav.classList.toggle('is-open', isOpen);
    nav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  };

  const closeNav = () => setExpandedState(false);

  setExpandedState(false);

  if (window.innerWidth > 640) {
    setExpandedState(true);
  }

  toggle.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('is-open');
    setExpandedState(willOpen);
  });

  nav.addEventListener('click', (event) => {
    if (
      event.target instanceof HTMLElement &&
      event.target.tagName === 'A' &&
      window.innerWidth <= 640
    ) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      setExpandedState(true);
    } else {
      closeNav();
    }
  });
})();

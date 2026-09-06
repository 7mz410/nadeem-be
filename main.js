(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* year */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* Brussels clock in the ticker */
  const clock = document.getElementById('clock');
  const tick = () => {
    const t = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/Brussels', hour: '2-digit', minute: '2-digit'
    });
    clock.textContent = `${t} (CET, UTC+1)`;
  };
  tick(); setInterval(tick, 30000);

  /* scroll reveals — one shot each */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      io.unobserve(e.target);
      if (e.target.classList.contains('stat')) countUp(e.target);
    }
  }, { rootMargin: '0px 0px -4% 0px', threshold: 0 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    io.observe(el);
  });

  /* hero headline mask-up, immediately */
  requestAnimationFrame(() => document.querySelector('.hero-h1').classList.add('in'));

  /* stat count-up */
  function countUp(el) {
    if (reduced) return;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const start = performance.now(), dur = 1100;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  document.querySelectorAll('.stat').forEach(el => io.observe(el));

  /* custom cursor */
  if (!reduced && matchMedia('(min-width:1024px) and (pointer:fine)').matches) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    document.body.classList.add('has-cursor');
    let rx = 0, ry = 0, tx = 0, ty = 0;
    addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      document.body.classList.add('cursor-live');
      dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      rx += (tx - rx) * 0.15; ry += (ty - ry) * 0.15;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    };
    loop();
    document.querySelectorAll('a, button, .row').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('big'));
      el.addEventListener('mouseleave', () => ring.classList.remove('big'));
    });
  }
})();

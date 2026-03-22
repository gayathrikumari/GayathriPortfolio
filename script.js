/* =============================================
   GAYATHRI KUMAR — PORTFOLIO JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── THEME TOGGLE ── */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('gk-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('gk-theme', next);
  });

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    const bars = hamburger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    });
  });

  /* ── INTERSECTION OBSERVER — REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  }

  /* ── ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--text-primary)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── SMOOTH PARALLAX ON ORBS ── */
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    if (orb1) {
      orb1.style.transform = `translate(${dx * 18}px, ${dy * 18}px)`;
    }
    if (orb2) {
      orb2.style.transform = `translate(${-dx * 12}px, ${-dy * 12}px)`;
    }
  });

  /* ── CURSOR CUSTOM EFFECT (subtle) ── */
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease, opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(cursor);

  const cursorRing = document.createElement('div');
  cursorRing.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 28px; height: 28px; border-radius: 50%;
    border: 1px solid var(--accent);
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(cursorRing);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    cursor.style.opacity = '1';
    cursorRing.style.left = mx + 'px';
    cursorRing.style.top = my + 'px';
    cursorRing.style.opacity = '0.5';
  });

  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '44px';
      cursorRing.style.height = '44px';
      cursorRing.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '28px';
      cursorRing.style.height = '28px';
      cursorRing.style.opacity = '0.5';
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });

  /* ── SKILL TAG HOVER STAGGER ── */
  document.querySelectorAll('.skill-card').forEach(card => {
    const tags = card.querySelectorAll('.skill-tags span');
    card.addEventListener('mouseenter', () => {
      tags.forEach((tag, i) => {
        setTimeout(() => {
          tag.style.transform = 'scale(1.05)';
        }, i * 30);
      });
    });
    card.addEventListener('mouseleave', () => {
      tags.forEach(tag => { tag.style.transform = ''; });
    });
  });

  /* ── HERO NAME LETTER SPLIT ANIMATE ── */
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    // Just ensure visibility animation fires on load
    setTimeout(() => {
      heroName.classList.add('visible');
    }, 200);
  }

  /* ── TIMELINE HOVER ── */
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.paddingLeft = '12px';
      item.style.transition = 'padding 0.3s ease';
    });
    item.addEventListener('mouseleave', () => {
      item.style.paddingLeft = '';
    });
  });

  /* ── PAGE PROGRESS BAR ── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; z-index: 200;
    background: var(--accent);
    transition: width 0.1s linear;
    width: 0%;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });

});

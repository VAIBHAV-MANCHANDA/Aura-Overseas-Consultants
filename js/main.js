// ============================================
// AURA OVERSEAS CONSULTANTS - MAIN JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('transparent');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll Animations (Intersection Observer) ----
  const animatedEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedEls.forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = i * 80;
    observer.observe(el);
  });

  // ---- Animated Counters ----
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  }

  // ---- Hero Particles ----
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('span');
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${6 + Math.random() * 6}s;
        width: ${1 + Math.random() * 3}px;
        height: ${1 + Math.random() * 3}px;
        opacity: ${0.2 + Math.random() * 0.5};
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));
      // Open clicked if it wasn't active
      if (!isActive) item.classList.add('active');
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Contact Form Submit ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent! We\'ll contact you soon.';
      btn.style.background = '#16a34a';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 4000);
    });
  }

});

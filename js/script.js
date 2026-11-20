/**
 * SHRUTI RAJ - PORTFOLIO INTERACTION ENGINE
 * Plain Vanilla JavaScript (ES6+), Zero Frameworks, Zero Dependencies.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Theme Switcher (Light / Dark Mode with System Preference & LocalStorage)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('sr_portfolio_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('sr_portfolio_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  };

  // Initialize theme
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Listen to OS theme changes if user hasn't set a manual override
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('sr_portfolio_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* ==========================================================================
     2. Mobile Navigation Menu & Backdrop
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = (forceState) => {
    if (!mobileMenuBtn || !navMenu) return;
    const isExpanded = forceState !== undefined
      ? forceState
      : mobileMenuBtn.getAttribute('aria-expanded') === 'true';

    const newState = !isExpanded;
    mobileMenuBtn.setAttribute('aria-expanded', String(newState));
    mobileMenuBtn.classList.toggle('active', newState);
    navMenu.classList.toggle('open', newState);
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  }

  // Close mobile menu when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        toggleMobileMenu(true); // force close
      }
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
      toggleMobileMenu(true);
    }
  });

  /* ==========================================================================
     3. Sticky Header & Active Nav Link Highlighting
     ========================================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Highlight active link as sections enter viewport
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => navObserver.observe(section));

  /* ==========================================================================
     4. Dynamic Typing Effect for Tagline
     ========================================================================== */
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const phrases = [
      'QA Engineer',
      'MCA Graduate',
      'Software Testing Specialist',
      'Bharatanatyam Artist'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at full phrase
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 350;
      }

      setTimeout(typeLoop, typingSpeed);
    };

    typeLoop();
  }

  /* ==========================================================================
     5. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add('revealed'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ==========================================================================
     6. Animated Counters
     ========================================================================== */
  const counterElements = document.querySelectorAll('[data-counter-target]');
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach((counter) => {
      const targetStr = counter.getAttribute('data-counter-target');
      const isDecimal = targetStr.includes('.');
      const target = parseFloat(targetStr);
      const suffix = counter.getAttribute('data-counter-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = easeProgress * target;

        if (isDecimal) {
          counter.textContent = currentVal.toFixed(1) + suffix;
        } else {
          counter.textContent = Math.floor(currentVal) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = targetStr + suffix;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }

  /* ==========================================================================
     7. Animated Skill Bars
     ========================================================================== */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillsSection = document.getElementById('skills');

  if (skillsSection && skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          skillBars.forEach((bar) => {
            const level = bar.getAttribute('data-level');
            if (level) {
              bar.style.width = level;
            }
          });
          skillsObserver.unobserve(skillsSection);
        }
      },
      { threshold: 0.2 }
    );
    skillsObserver.observe(skillsSection);
  }

  /* ==========================================================================
     8. Bharatanatyam Lightbox Modal
     ========================================================================== */
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  let previouslyFocusedElement = null;

  // Gallery dataset
  const galleryData = [
    {
      src: 'assets/images/bharatanatyam-1.jpg',
      title: 'Classical Solo Recital & Adavus',
      desc: 'Guru Shivkumar Pillai Disciple | Nataraja stance, stage presence, and rhythmic footwork'
    },
    {
      src: 'assets/images/bharatanatyam-2.jpg',
      title: 'Aramandi & Mudra Precision',
      desc: 'Traditional seated fan-spread posture with geometric hand mudra and poise'
    },
    {
      src: 'assets/images/bharatanatyam-3.jpg',
      title: 'Abhinaya & Expression',
      desc: 'Classical facial expression, delicate nuance, and expressive storytelling'
    },
    {
      src: 'assets/images/bharatanatyam-4.jpg',
      title: 'Cultural Honors & Trophy',
      desc: 'Celebrating stage victory and artistic accolades at cultural dance competitions'
    }
  ];

  const updateLightboxContent = (index) => {
    if (!lightboxImg || !galleryData[index]) return;
    currentGalleryIndex = index;
    const item = galleryData[index];

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxDesc) lightboxDesc.textContent = item.desc;
      if (lightboxCounter) {
        lightboxCounter.textContent = `Image ${index + 1} of ${galleryData.length}`;
      }
      lightboxImg.style.opacity = '1';
    }, 150);
  };

  const openLightbox = (index) => {
    if (!lightboxModal) return;
    previouslyFocusedElement = document.activeElement;
    currentGalleryIndex = index;
    updateLightboxContent(index);
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previouslyFocusedElement) previouslyFocusedElement.focus();
  };

  const showNextImage = () => {
    const nextIdx = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent(nextIdx);
  };

  const showPrevImage = () => {
    const prevIdx = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent(prevIdx);
  };

  // Gallery Card Click Handlers
  galleryCards.forEach((card, index) => {
    card.addEventListener('click', () => openLightbox(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Close when clicking backdrop
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });


  /* ==========================================================================
     11. Back to Top Button
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  const handleBackToTopVisibility = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
  handleBackToTopVisibility();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     12. Copy Email to Clipboard Feature
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'rajshruti.813@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalContent = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyEmailBtn.style.color = 'var(--accent-success)';
        copyEmailBtn.style.borderColor = 'var(--accent-success)';

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalContent;
          copyEmailBtn.style.color = '';
          copyEmailBtn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

  /* ==========================================================================
     13. Direct Mailto Fallback Link Handler
     ========================================================================== */
  const mailtoFallback = document.getElementById('mailto-fallback');
  if (mailtoFallback) {
    mailtoFallback.addEventListener('click', (e) => {
      e.preventDefault();
      const subject = encodeURIComponent('Inquiry from Portfolio Website - Shruti Raj');
      const body = encodeURIComponent(
        'Hello Shruti,\n\nI came across your portfolio and would like to connect with you regarding...'
      );
      window.location.href = `mailto:rajshruti.813@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});

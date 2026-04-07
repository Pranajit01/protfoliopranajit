/**
 * Pranajit Das Portfolio - Main Script
 * Handles animations, interactions, and dynamic effects.
 */

declare global {
  interface Window {
    lucide: any;
    ScrollReveal: any;
  }
}

// Initialize Lucide Icons
if (window.lucide) {
  window.lucide.createIcons();
}

// Cursor Glow Effect
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }
});

// Scroll Progress Indicator
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = `${scrolled}%`;
  }
});

// Scroll Reveal Animations
if (window.ScrollReveal) {
  const sr = window.ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
  });

  sr.reveal('.reveal', { interval: 100 });
}

// Dynamic Typing Effect for Hero
const heroTitle = document.querySelector('#hero h1');
if (heroTitle) {
  const roles = ['Future of AI', 'Data Analytics', 'Generative AI', 'Software Engineering'];
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = true;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  function type() {
    const currentRole = roles[roleIndex];
    const span = heroTitle?.querySelector('span');
    
    if (span) {
      if (isDeleting) {
        span.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        span.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
      }
    }
  }

  // Start typing effect after a small delay
  setTimeout(type, 1500);
}

// Form Submission (Mock)
const contactForm = document.querySelector('#contact form') as HTMLFormElement;
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    if (btn) {
      const originalText = btn.textContent;
      
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.backgroundColor = '#10b981'; // Success green
        contactForm.reset();
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    }
  });
}

// Smooth Scroll for Navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (!href) return;
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Populate GitHub Grid
const githubGrid = document.getElementById('github-grid');
if (githubGrid) {
  for (let i = 0; i < 48; i++) {
    const div = document.createElement('div');
    const opacity = Math.random() > 0.5 ? 'bg-blue-500/80' : 'bg-blue-500/20';
    div.className = `w-3 h-3 rounded-sm ${opacity}`;
    githubGrid.appendChild(div);
  }
}

console.log('Portfolio initialized successfully.');

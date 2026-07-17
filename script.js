/* ══════════════════════════════════════════════
   CS STUDENT PORTFOLIO — main.js
   ══════════════════════════════════════════════ */


// ── NAVBAR SCROLL ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active-link', l.getAttribute('href') === '#' + current);
  });
});

// Close mobile nav on link click
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('navMenu')?.classList.remove('show');
    }
  });
});

// ── TYPEWRITER ──
const words   = ['web apps.', 'cool stuff.', 'DSA solutions.', 'side projects.', 'the future.'];
const twEl    = document.getElementById('typewriter');
let wi = 0, ci = 0, deleting = false;

function type() {
  if (!twEl) return;
  const word = words[wi];
  twEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

  if (!deleting && ci === word.length + 1) {
    deleting = true;
    setTimeout(type, 1800);
    return;
  }
  if (deleting && ci < 0) {
    deleting = false;
    wi = (wi + 1) % words.length;
    ci = 0;
    setTimeout(type, 400);
    return;
  }
  setTimeout(type, deleting ? 55 : 95);
}
setTimeout(type, 1000);

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// ── SKILL BAR ANIMATION ──
const fills   = document.querySelectorAll('.lb-fill');
const barObs  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.style.width = e.target.dataset.w + '%'; }, 150);
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });
fills.forEach(f => barObs.observe(f));

// ── CONTACT FORM ──
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.cf-input');
    let valid = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        valid = false;
        inp.style.borderColor = '#ff6b6b';
        inp.addEventListener('input', () => { inp.style.borderColor = ''; }, { once: true });
      }
    });
    if (!valid) return;

    sendBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
    sendBtn.style.background = 'var(--green)';
    sendBtn.disabled = true;

    setTimeout(() => {
      sendBtn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
      sendBtn.style.background = '';
      sendBtn.disabled = false;
      inputs.forEach(inp => inp.value = '');
    }, 3500);
  });
}

// ── CURSOR GLOW on skill tags ──
document.querySelectorAll('.sk-tags span, .pc-tags span').forEach(tag => {
  tag.addEventListener('mouseenter', () => { tag.style.borderColor = 'rgba(0,230,200,0.4)'; tag.style.color = 'var(--cyan)'; });
  tag.addEventListener('mouseleave', () => { tag.style.borderColor = ''; tag.style.color = ''; });
});

// ── EASTER EGG in console ──
console.log(
  '%c Aryan Singh — Portfolio %c\n%c Built with HTML + CSS + JS + Bootstrap\n%c Hit me up: aryan.singh@gmail.com',
  'background:#00e6c8;color:#080c14;font-weight:bold;padding:6px 14px;border-radius:4px;',
  '',
  'color:#4afa8a;',
  'color:#7eb8ff;'
);

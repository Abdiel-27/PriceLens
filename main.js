// ================= HEADER: sombra al hacer scroll =================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
  } else {
    header.style.boxShadow = '0 1px 8px rgba(0,0,0,0.05)';
  }
});


// ================= NAV: resaltar enlace activo al hacer scroll =================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    link.style.fontWeight = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#3a9d4b';
      link.style.fontWeight = '700';
    }
  });
});


// ================= SCROLL SUAVE para enlaces del nav =================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});


// ================= ANIMACIÓN: elementos aparecen al entrar en vista =================
const animatedElements = document.querySelectorAll(
  '.step, .benefit-card, .testimonial-card, .mission-text, .mission-visual'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});


// ================= FAQ: solo un item abierto a la vez =================
const faqItems = document.querySelectorAll('.faq details');

faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach(other => {
        if (other !== item) other.removeAttribute('open');
      });
    }
  });
});


// ================= BOTONES "Descargar App": aviso temporal =================
const downloadBtns = document.querySelectorAll('.btn-download, .btn-primary');

downloadBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    let toast = document.getElementById('pl-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'pl-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #3a9d4b;
        color: white;
        padding: 14px 28px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 9999;
        font-family: 'Lato', sans-serif;
      `;
      toast.textContent = '🚀 ¡La app estará disponible muy pronto!';
      document.body.appendChild(toast);
    }

    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 3000);
  });
});

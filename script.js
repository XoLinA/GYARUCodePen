const elements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

elements.forEach((element) => observer.observe(element));

const prints = document.querySelectorAll('.hero-print, .banner-pattern');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function movePrints() {
  if (reduceMotion.matches) return;
  prints.forEach((print) => {
    const section = print.parentElement;
    const distance = section.getBoundingClientRect().top;
    print.style.setProperty('--move', `${-distance * 0.2}px`);
  });
}

window.addEventListener('scroll', movePrints, { passive: true });
movePrints();

// https://codepen.io/Styner14/pen/QWBqJEo
// Heart Cursor Trail
let lastHeartTime = 0;

function createHeart(x, y) {
  const heart = document.createElement('span');
  heart.classList.add('cursor-heart');

  heart.textContent = '♥';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 800);
}

document.addEventListener('mousemove', (event) => {
  if (reduceMotion.matches) return;
  const now = Date.now();

  if (now - lastHeartTime < 60) return;
  lastHeartTime = now;
  createHeart(event.clientX, event.clientY);
});

const progress = document.querySelector('.scroll-progress');
function updateProgress() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

  const percent = pageHeight > 0 ? window.scrollY / pageHeight * 100 : 0;
  progress.style.width = `${percent}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();



// LOADER
window.addEventListener('load', () => { setTimeout(() => { document.getElementById('loader').classList.add('hide') }, 800) });

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50) });

// HAMBURGER MENU
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobile-menu');
ham.addEventListener('click', () => { ham.classList.toggle('active'); mob.classList.toggle('open'); document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '' });
document.querySelectorAll('[data-mob]').forEach(link => { link.addEventListener('click', () => { ham.classList.remove('active'); mob.classList.remove('open'); document.body.style.overflow = '' }) });

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }) }, { threshold: .12 });
revealEls.forEach(el => observer.observe(el));

// COUNTER ANIMATION
function animateCounter(el, target) {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current + (target >= 50 && el.parentElement.classList.contains('stats-card') ? '' : '+');
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target + (el.parentElement.classList.contains('stats-card') || el.closest('.hero-stats') ? '+' : '')
    }
    requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { const target = parseInt(e.target.getAttribute('data-target')); if (target) animateCounter(e.target, target); counterObserver.unobserve(e.target) } }) }, { threshold: .5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// TESTIMONIAL CAROUSEL
const track = document.getElementById('testi-track');
const cards = track.querySelectorAll('.testi-card');
const dotsContainer = document.getElementById('testi-dots');
let currentIndex = 0;
const getVisible = () => window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
function buildDots() {
    dotsContainer.innerHTML = '';
    const total = Math.ceil(cards.length / getVisible());
    for (let i = 0; i < total; i++) { const d = document.createElement('div'); d.className = 'tc-dot' + (i === currentIndex ? ' active' : ''); d.addEventListener('click', () => goTo(i)); dotsContainer.appendChild(d) }
}
function goTo(idx) {
    const visible = getVisible();
    const maxIdx = Math.ceil(cards.length / visible) - 1;
    currentIndex = Math.max(0, Math.min(idx, maxIdx));
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentIndex * cardW * visible}px)`;
    document.querySelectorAll('.tc-dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}
document.getElementById('testi-next').addEventListener('click', () => goTo(currentIndex + 1));
document.getElementById('testi-prev').addEventListener('click', () => goTo(currentIndex - 1));
buildDots();
setInterval(() => goTo(currentIndex + 1 < Math.ceil(cards.length / getVisible()) ? currentIndex + 1 : 0), 5000);
window.addEventListener('resize', () => { buildDots(); goTo(0) });

// FAQ ACCORDION
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = '0' });
        if (!isOpen) { item.classList.add('open'); item.querySelector('.faq-a').style.maxHeight = item.querySelector('.faq-a-inner').scrollHeight + 'px' }
    });
});

// COUNTDOWN TIMER
function updateCountdown() {
    const end = new Date();
    end.setDate(end.getDate() + 7);
    end.setHours(23, 59, 59, 0);
    const diff = end - new Date();
    if (diff <= 0) return;
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1e3);
    document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// FORM SUBMIT
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    btn.textContent = '✅ Request Submitted! We\'ll call you soon.';
    btn.style.background = 'linear-gradient(135deg,#25D366,#1a9e4c)';
    btn.disabled = true;
}

// EXIT POPUP
let popupShown = false;
document.addEventListener('mouseleave', (e) => { if (e.clientY <= 0 && !popupShown) { popupShown = true; setTimeout(() => document.getElementById('exit-popup').classList.add('show'), 200) } });
document.getElementById('popup-close').addEventListener('click', () => document.getElementById('exit-popup').classList.remove('show'));
document.getElementById('exit-popup').addEventListener('click', (e) => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('show') });
document.getElementById('popup-cta').addEventListener('click', () => document.getElementById('exit-popup').classList.remove('show'));
setTimeout(() => { if (!popupShown) { popupShown = true; document.getElementById('exit-popup').classList.add('show') } }, 45000);

// SMOOTH ACTIVE NAV HIGHLIGHT
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id });
    navLinks.forEach(l => { l.style.background = l.getAttribute('href') === '#' + current ? 'var(--green-light)' : ''; l.style.color = l.getAttribute('href') === '#' + current ? 'var(--green)' : '' });
});

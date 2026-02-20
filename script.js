// ═══════════════════════════════════════════════════════════
// LIONS ROLLER DERBY — script.js
// ═══════════════════════════════════════════════════════════

// ── Header: scroll shadow ─────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,.45)';
    } else {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,.35)';
    }
});

// ── Mobile hamburger menu ─────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Back to top button ────────────────────────────────────
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Stats counter animation ───────────────────────────────
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        if (!num || isNaN(num)) return;

        const suffix = text.replace(/[\d]/g, '');
        let start = 0;
        const duration = 1200;
        const step = duration / num;

        const timer = setInterval(() => {
            start += Math.ceil(num / 40);
            if (start >= num) {
                el.textContent = num + suffix;
                clearInterval(timer);
            } else {
                el.textContent = start + suffix;
            }
        }, step);
    });
}

// Trigger counter animation when stats section is visible
const statsBar = document.querySelector('.stats-bar');
let countersAnimated = false;
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        observer.disconnect();
    }
}, { threshold: 0.4 });
if (statsBar) observer.observe(statsBar);

// ── Smooth scroll for nav links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 68; // header height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Cart counter (placeholder) ────────────────────────────
let cartCount = 0;
const cartBadge = document.querySelector('.cart-badge');
document.querySelectorAll('.merch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        if (cartBadge) cartBadge.textContent = cartCount;
        btn.textContent = 'ADDED ✓';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
        setTimeout(() => {
            btn.textContent = 'ADD TO CART';
            btn.style.background = '';
            btn.style.borderColor = '';
        }, 1800);
    });
});

// ── Entrance animations (Intersection Observer) ───────────
const animEls = document.querySelectorAll('.squad-card, .merch-card, .sponsor-logo, .stat');
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity .4s ease ${i * 0.04}s, transform .4s ease ${i * 0.04}s`;
    animObserver.observe(el);
});

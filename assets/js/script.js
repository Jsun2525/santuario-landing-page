// SANTUARIO DE BIENESTAR — Landing Page Scripts

// ============ PARTICLE SYSTEM ============
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 60;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.setProperty('--dur', (3 + Math.random() * 4) + 's');
        p.style.setProperty('--delay', -(Math.random() * 6) + 's');
        const size = 1 + Math.random() * 3;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        container.appendChild(p);
    }
})();

// ============ SCROLL REVEAL ============
(function initReveal() {
    const sections = document.querySelectorAll(
        '.split-content-inner, .pain-cards, .story-full-text, .story-full-image, .pillar, .benefit-item, .number-item, .for-who-item, .what-is-inner, .blog-card'
    );

    sections.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, (entry.target.dataset.delay || 0) * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Stagger children in grids
    document.querySelectorAll('.pain-cards, .stories-list, .pillars, .benefits-grid, .numbers-grid, .for-who-list, .blog-grid').forEach(grid => {
        Array.from(grid.children).forEach((child, i) => {
            child.dataset.delay = (i * 0.1).toFixed(1);
        });
    });

    sections.forEach(el => observer.observe(el));
})();

// ============ CTA PULSE ANIMATION ============
(function pulseCTA() {
    const btns = document.querySelectorAll('.cta-btn');
    btns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 0 0 0 rgba(201,169,110,0.5)';
        });
    });
})();

// ============ HEADER PARALLAX ============
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.hero .orb');
    orbs.forEach((orb, i) => {
        const speed = 0.1 + i * 0.05;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
}, { passive: true });

// ============ UTM PARAMETER PASSTHROUGH ============
(function passUTM() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
    const ctaLinks = document.querySelectorAll('a[href*="skool.com"]');

    ctaLinks.forEach(link => {
        const url = new URL(link.href);
        utmParams.forEach(param => {
            const val = urlParams.get(param);
            if (val) url.searchParams.set(param, val);
        });
        link.href = url.toString();
    });
})();


// ============ SMOOTH APPEAR ON LOAD ============
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
});

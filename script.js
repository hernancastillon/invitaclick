// =============================
//       HEADER SCROLL
// =============================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// =============================
//      MOBILE MENU
// =============================
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
    });
});

// =============================
//         FAQ ACCORDION
// =============================
document.querySelectorAll('.faq-question').forEach((question, index) => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// =============================
//    ANIMATED COUNTER (stats)
// =============================
function animateCounter(el) {
    const target = Number(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('es-MX');
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// =============================
//     SCROLL REVEAL ANIMATION
// =============================
function initReveal() {
    const elements = document.querySelectorAll('.section-header, .step, .event-card, .feature-card, .portfolio-card, .faq-item, .stat-item');
    const reveal = document.createElement('style');
    reveal.textContent = '.reveal-init { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; } .reveal-init.visible { opacity: 1; transform: translateY(0); }';
    document.head.appendChild(reveal);

    elements.forEach((el, i) => {
        el.classList.add('reveal-init');
        el.style.transitionDelay = (i % 3) * 0.1 + 's';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.classList.contains('stat-item') && entry.target.querySelector('[data-target]')) {
                    const counter = entry.target.querySelector('[data-target]');
                    if (!counter.dataset.done) {
                        counter.dataset.done = 'true';
                        animateCounter(counter);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);
// Enhanced JavaScript for Breeze Staffing Solutions

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observe all animated elements
    document.querySelectorAll('.slide-in-left, .slide-in-up, .zoom-in-stat').forEach(el => {
        observer.observe(el);
    });

    // Initialize everything
    initTestimonialsCarousel();
    initBrandsCarousel();
    initEventCarousel();   // FIX 4: now called here, not duplicated below
    initStatsAnimation();
    initDynamicBackgrounds();
    initParallaxEffect();
    initMobileMenu();
});

// Dynamic background loading
function initDynamicBackgrounds() {
    document.querySelectorAll('[data-bg]').forEach(el => {
        const bgUrl = el.getAttribute('data-bg');
        el.style.backgroundImage = `url('${bgUrl}')`;
    });
}

// Parallax scrolling effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-bg, .about-hero-bg');

    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Service section opacity on scroll
window.addEventListener('scroll', () => {
    const serviceRows = document.querySelectorAll('.service-overlay-gradient, .mv-overlay');

    serviceRows.forEach(overlay => {
        const rect = overlay.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
            const opacity = 0.6 + (scrollPercent * 0.3);
            overlay.style.opacity = Math.min(opacity, 0.9);
        }
    });
});

// ============================================================
// Generic Carousel Factory — used for brands, testimonials & events
// FIX 4: Event carousel now uses this shared function and responds
//         to the onclick buttons in services.html correctly
// ============================================================
function createCarousel(config) {
    const { slidesSelector, prevSelector, nextSelector, cardSelector, autoplayMs, getSlidesToShow } = config;

    const slides = document.querySelector(slidesSelector);
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);
    const cards = document.querySelectorAll(cardSelector);

    if (!slides || !prevBtn || !nextBtn || cards.length === 0) return null;

    let currentIndex = 0;

    function getSlidesCount() {
        return getSlidesToShow(window.innerWidth);
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // matches CSS gap: 2rem
        const offset = -(currentIndex * (cardWidth + gap));
        slides.style.transform = `translateX(${offset}px)`;
    }

    function next() {
        const slidesToShow = getSlidesCount();
        if (currentIndex < cards.length - slidesToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prev() {
        const slidesToShow = getSlidesCount();
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.max(0, cards.length - slidesToShow);
        }
        updateCarousel();
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // Autoplay
    if (autoplayMs) {
        setInterval(next, autoplayMs);
    }

    // Recalculate on resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });

    return { next, prev, updateCarousel };
}

// Brands Carousel
function initBrandsCarousel() {
    createCarousel({
        slidesSelector: '.brands-carousel-slides',
        prevSelector: '.prev-brand',
        nextSelector: '.next-brand',
        cardSelector: '.brand-card-carousel',
        autoplayMs: 3000,
        getSlidesToShow: (w) => w > 1200 ? 5 : w > 768 ? 3 : w > 480 ? 2 : 1
    });
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    createCarousel({
        slidesSelector: '.testimonials-slides',
        prevSelector: '.prev-testimonial',
        nextSelector: '.next-testimonial',
        cardSelector: '.testimonial-card',
        autoplayMs: 5000,
        getSlidesToShow: (w) => w > 1024 ? 3 : w > 768 ? 2 : 1
    });
}

// Event Gallery Carousel
// FIX 4: Removed duplicate DOMContentLoaded listener and inline onclick.
//         This function now wires up .event-arrow-left / .event-arrow-right
//         which match the buttons in services.html.
function initEventCarousel() {
    createCarousel({
        slidesSelector: '.event-carousel-slides',
        prevSelector: '.event-arrow-left',
        nextSelector: '.event-arrow-right',
        cardSelector: '.event-slide',
        autoplayMs: 4000,
        getSlidesToShow: (w) => w > 1200 ? 4 : w > 768 ? 3 : w > 480 ? 2 : 1
    });
}

// Stats Counter Animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number-large');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const stepTime = 2000 / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });

    // Close on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelectorAll('span').forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.querySelectorAll('span').forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (header) {
        if (currentScroll > 100) {
            header.style.padding = '0.8rem 0';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.padding = '1.2rem 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }
    }

    lastScroll = currentScroll;
});

// Page load fade in
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Hover effects
document.querySelectorAll('.brand-card, .feature-modern, .value-card, .diff-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Scroll progress indicator (optional — uncomment to enable)
function createScrollProgress() {
    const progress = document.createElement('div');
     progress.style.cssText = `
        position: fixed; top: 0; left: 0; width: 0%; height: 4px;
         background: linear-gradient(90deg, #1a3d7c 0%, #06b6d4 100%);
         z-index: 9999; transition: width 0.2s ease;
    `;
    document.body.appendChild(progress);
     window.addEventListener('scroll', () => {
         const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
       const scrolled = (window.pageYOffset / windowHeight) * 100;
        progress.style.width = scrolled + '%';
    });
}
createScrollProgress();

console.log('Breeze Staffing Solutions — Website Loaded Successfully');

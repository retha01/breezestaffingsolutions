// Enhanced Java// Enhanced JavaScript for Breeze Staffing Solutions

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

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Observe slide-in elements
    document.querySelectorAll('.slide-in-left, .slide-in-up, .zoom-in-stat').forEach(el => {
        observer.observe(el);
    });

    // Initialize all carousels
    initTestimonialsCarousel();
    initBrandsCarousel();
    initStatsAnimation();
    initDynamicBackgrounds();
    initParallaxEffect();
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

// Service section opacity change on scroll
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

// Brands Carousel
function initBrandsCarousel() {
    const slides = document.querySelector('.brands-carousel-slides');
    const prevBtn = document.querySelector('.prev-brand');
    const nextBtn = document.querySelector('.next-brand');
    const cards = document.querySelectorAll('.brand-card-carousel');
    
    if (!slides || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;
    const slidesToShow = window.innerWidth > 1200 ? 5 : window.innerWidth > 768 ? 3 : 1;
    const totalSlides = cards.length;
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32;
        const offset = -(currentIndex * (cardWidth + gap));
        slides.style.transform = `translateX(${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - slidesToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.max(0, totalSlides - slidesToShow);
        }
        updateCarousel();
    });

    // Auto-play
    setInterval(() => {
        if (currentIndex < totalSlides - slidesToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 3000);

    window.addEventListener('resize', () => {
        const newSlidesToShow = window.innerWidth > 1200 ? 5 : window.innerWidth > 768 ? 3 : 1;
        if (newSlidesToShow !== slidesToShow) {
            currentIndex = 0;
        }
        updateCarousel();
    });
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const slides = document.querySelector('.testimonials-slides');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!slides || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;
    const slidesToShow = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    const totalSlides = cards.length;
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32;
        const offset = -(currentIndex * (cardWidth + gap));
        slides.style.transform = `translateX(${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - slidesToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.max(0, totalSlides - slidesToShow);
        }
        updateCarousel();
    });

    // Auto-play
    setInterval(() => {
        if (currentIndex < totalSlides - slidesToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);

    window.addEventListener('resize', updateCarousel);
}

// Stats Counter Animation with zoom effect
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
    const duration = 2000;
    const stepTime = duration / 60;

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
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
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

    // Close menu when clicking nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelectorAll('span').forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelectorAll('span').forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        }
    });
}

// Smooth scroll for anchor links with easing
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

// Enhanced smooth scroll behavior for page navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling class to body
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.padding = '0.8rem 0';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.padding = '1.2rem 0';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// Add loading animation on page load
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

// Form validation (if forms are added later)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// Add hover effects to cards
document.querySelectorAll('.brand-card, .feature-modern, .value-card, .diff-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Scroll progress indicator (optional)
function createScrollProgress() {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #1a3d7c 0%, #06b6d4 100%);
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progress.style.width = scrolled + '%';
    });
}


// Event Gallery Carousel
function initEventCarousel() {
    const slides = document.querySelector('.event-carousel-slides');
    const prevBtn = document.querySelector('.event-arrow-left');
    const nextBtn = document.querySelector('.event-arrow-right');
    const cards = document.querySelectorAll('.event-slide');
    
    if (!slides || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;
    const slidesToShow = window.innerWidth > 1200 ? 4 : window.innerWidth > 768 ? 3 : 1;
    const totalSlides = cards.length;
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32;
        const offset = -(currentIndex * (cardWidth + gap));
        slides.style.transform = `translateX(${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - slidesToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.max(0, totalSlides - slidesToShow);
        }
        updateCarousel();
    });

    // Auto-play
    setInterval(() => {
        if (currentIndex < totalSlides - slidesToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 4000);

    window.addEventListener('resize', () => {
        const newSlidesToShow = window.innerWidth > 1200 ? 4 : window.innerWidth > 768 ? 3 : 1;
        if (newSlidesToShow !== slidesToShow) {
            currentIndex = 0;
        }
        updateCarousel();
    });
}

// Initialize event carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    initEventCarousel();
});

// Uncomment to enable scroll progress indicator
// createScrollProgress();

console.log('Breeze Staffing Solutions - Website Loaded Successfully');
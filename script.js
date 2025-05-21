document.addEventListener('DOMContentLoaded', function() {
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Portfolio Slider Functionality
const portfolioSlider = document.querySelector('.portfolio-slider');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
let currentIndex = 0;

// Initialize slider
function initSlider() {
    // Set initial positions
    portfolioItems.forEach((item, index) => {
        item.style.transform = `translateX(${index * 100}%)`;
    });
}

// Move to slide
function goToSlide(index) {
    portfolioItems.forEach((item) => {
        item.style.transform = `translateX(-${index * 100}%)`;
    });
    currentIndex = index;
}

// Next slide
function nextSlide() {
    if (currentIndex === portfolioItems.length - 1) {
        goToSlide(0);
    } else {
        goToSlide(currentIndex + 1);
    }
}

// Previous slide
function prevSlide() {
    if (currentIndex === 0) {
        goToSlide(portfolioItems.length - 1);
    } else {
        goToSlide(currentIndex - 1);
    }
}

// Event listeners
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);

// Initialize on load
document.addEventListener('DOMContentLoaded', initSlider);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling (prevent default for demo)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission would be handled here in a real implementation.');
            this.reset();
        });
    });
});

// Auto-advance slides (optional)
let slideInterval = setInterval(nextSlide, 5000);

// Pause on hover
portfolioSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
portfolioSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Touch support (optional)
let touchStartX = 0;
let touchEndX = 0;

portfolioSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

portfolioSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
});
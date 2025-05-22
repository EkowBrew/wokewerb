document.addEventListener('DOMContentLoaded', function() {
    // ===== Faster Scroll Animations =====
    const animateSections = function() {
        const triggerOffset = window.innerHeight * 0.15;
        const sections = document.querySelectorAll('section:not(.hero)');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            
            if (sectionTop < triggerOffset && sectionBottom > 0) {
                section.classList.add('animate-in');
                section.classList.remove('animate-out');
            }
        });
    };

    // Use IntersectionObserver if available for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.classList.remove('animate-out');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('section:not(.hero)').forEach(section => {
            section.classList.add('animate-out');
            observer.observe(section);
        });
    } else {
        // Fallback for older browsers
        window.addEventListener('scroll', animateSections);
        animateSections();
    }

    // ===== Sticky Navigation =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== Hamburger Menu =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = 
            navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // ===== Portfolio Slider =====
    const portfolioSlider = document.querySelector('.portfolio-slider');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    let currentIndex = 0;

    function updateSlider() {
        portfolioSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        updateSlider();
    }

    rightBtn.addEventListener('click', nextSlide);
    leftBtn.addEventListener('click', prevSlide);

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    portfolioSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    portfolioSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }, {passive: true});

    // ===== Smooth Scrolling =====
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

    // ===== Window Resize Handler =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        updateSlider();
    });

    // Initialize
    updateSlider();
});
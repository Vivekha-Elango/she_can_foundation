// ============================================
// SHE CAN FOUNDATION - GLOBAL APPLICATION
// Interactive Features: Theme, Scroll, Counters, Forms, Popups
// ============================================

(function() {
    'use strict';

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    
    const scrollBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // ANIMATED COUNTERS WITH INTERSECTION OBSERVER
    // ============================================
    
    const counters = document.querySelectorAll('.counter-value');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                counter.innerText = target.toLocaleString();
                return;
            }
            counter.innerText = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        };
        updateCounter();
    }
    
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }

    // ============================================
    // FADE UP ANIMATION ON SCROLL
    // ============================================
    
    const fadeElements = document.querySelectorAll('.glass-card, .program-card, .metric-card, .info-card, .form-card, .left-pane, .gallery-item, .pillar-card, .counter-card');
    
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-up');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => fadeObserver.observe(el));
    }

    // ============================================
    // NAVBAR ACTIVE LINK DETECTION
    // ============================================
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ============================================
    // NAVBAR SCROLL HIDE/SHOW EFFECT
    // ============================================
    
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }

    // ============================================
    // VOLUNTEER FORM HANDLER
    // ============================================
    
    const volunteerForm = document.getElementById('volunteerForm');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[placeholder="Enter your full name"]');
            const emailInput = this.querySelector('input[placeholder="you@example.com"]');
            const selectInput = this.querySelector('.glass-select');
            const textareaInput = this.querySelector('.glass-textarea');
            
            if (!nameInput.value.trim()) {
                alert('Please enter your full name.');
                nameInput.focus();
                return;
            }
            
            if (!emailInput.value.trim()) {
                alert('Please enter your email address.');
                emailInput.focus();
                return;
            }
            
            if (!selectInput.value || selectInput.value === 'Select an area') {
                alert('Please select your area of interest.');
                selectInput.focus();
                return;
            }
            
            if (!textareaInput.value.trim()) {
                alert('Please tell us why you want to volunteer.');
                textareaInput.focus();
                return;
            }
            
            // Show success popup if exists
            const successPopup = document.getElementById('successPopup');
            if (successPopup) {
                successPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                alert('🎉 Thank you for your application! Our team will reach out within 48 hours.');
            }
            
            this.reset();
        });
    }

    // ============================================
    // CONTACT FORM HANDLER
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[placeholder="Your Full Name"]');
            const emailInput = this.querySelector('input[placeholder="Email Address"]');
            const subjectInput = this.querySelector('input[placeholder="Subject"]');
            const messageInput = this.querySelector('.glass-textarea');
            
            if (!nameInput.value.trim()) {
                alert('Please enter your full name.');
                nameInput.focus();
                return;
            }
            
            if (!emailInput.value.trim()) {
                alert('Please enter your email address.');
                emailInput.focus();
                return;
            }
            
            if (!subjectInput.value.trim()) {
                alert('Please enter a subject.');
                subjectInput.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                alert('Please enter your message.');
                messageInput.focus();
                return;
            }
            
            // Show success popup if exists
            const successPopup = document.getElementById('successPopup');
            if (successPopup) {
                successPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                alert('📬 Message sent! Our team will respond within 24 hours.');
            }
            
            this.reset();
        });
    }

    // ============================================
    // SUCCESS POPUP HANDLER
    // ============================================
    
    const successPopup = document.getElementById('successPopup');
    
    if (successPopup) {
        // Close popup function
        window.closePopup = function() {
            successPopup.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        // Close popup when clicking outside
        successPopup.addEventListener('click', function(e) {
            if (e.target === successPopup) {
                window.closePopup();
            }
        });
        
        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successPopup.classList.contains('active')) {
                window.closePopup();
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // PRELOADER (Optional - removes after load)
    // ============================================
    
    window.addEventListener('load', () => {
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Remove any preloader if exists
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // ============================================
    // CONSOLE LOG (Development)
    // ============================================
    
    console.log('✨ She Can Foundation — Website Loaded Successfully!');
    console.log('📱 Responsive | 🎨 Glassmorphic Design | ⚡ Interactive Features Active');
})();
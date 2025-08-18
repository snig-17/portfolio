// Glass Morphism Portfolio JavaScript - Cinematic Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeGlassPortfolio();
});

function initializeGlassPortfolio() {
    // Core functionality
    handleLoadingScreen();
    setupNavigation();
    setupScrollEffects();
    setupCounters();
    setupContactForm();
    setupParallax();
    setupGlassEffects();
    
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1200,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        once: true,
        mirror: false,
        offset: 100,
        delay: 0
    });
    
    // Setup intersection observer for section transitions
    setupSectionTransitions();
}

// Enhanced Loading Screen
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time for dramatic effect
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                
                // Trigger hero animation after loading
                animateHeroEntrance();
            }, 1200);
        }, 1500);
    });
}

// Hero entrance animation
function animateHeroEntrance() {
    const heroGlass = document.querySelector('.hero-glass');
    if (heroGlass) {
        heroGlass.style.transform = 'translateY(50px)';
        heroGlass.style.opacity = '0';
        
        setTimeout(() => {
            heroGlass.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
            heroGlass.style.transform = 'translateY(0)';
            heroGlass.style.opacity = '1';
        }, 300);
    }
}

// Glass Navigation with Enhanced Effects
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Enhanced navbar scroll effect
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateX(-50%) translateY(-100%)';
        } else {
            navbar.style.transform = 'translateX(-50%) translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate bars
        const bars = navToggle.querySelectorAll('.bar');
        if (navToggle.classList.contains('active')) {
            bars[0].style.transform = 'translateY(9px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Smooth scrolling and active states
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active link on scroll
    setupActiveNavigation();
}

// Active navigation based on scroll position
function setupActiveNavigation() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Enhanced Scroll Effects
function setupScrollEffects() {
    // Parallax background movement
    const sections = document.querySelectorAll('.section');
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const speed = 0.5;
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrollY - section.offsetTop) * speed;
                const background = section.querySelector('.section-background');
                
                if (background) {
                    background.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    }
    
    // Throttled scroll handler
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });
}

// Section Transitions with Glass Effect Enhancement
function setupSectionTransitions() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const section = entry.target;
            const glassElements = section.querySelectorAll('.glass, .hero-glass, .skill-category, .project-card');
            
            if (entry.isIntersecting) {
                section.classList.add('in-view');
                
                // Animate glass elements with stagger
                glassElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.transform = 'translateY(0)';
                        element.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
        
        // Initialize glass elements
        const glassElements = section.querySelectorAll('.glass, .hero-glass, .skill-category, .project-card');
        glassElements.forEach(element => {
            element.style.transform = 'translateY(30px)';
            element.style.opacity = '0';
            element.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });
}

// Animated Counters
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += step;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Enhanced Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(formObject)) {
                return;
            }
            
            // Simulate form submission with glass effect
            const submitBtn = contactForm.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            
            // Add loading state with glass effect
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.style.background = 'rgba(100, 181, 246, 0.7)';
            submitBtn.style.backdropFilter = 'blur(10px)';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showGlassNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.backdropFilter = '';
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Enhanced form input effects
        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.background = 'rgba(255, 255, 255, 0.3)';
                this.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.style.background = 'rgba(255, 255, 255, 0.25)';
                this.style.transform = 'translateY(0)';
            });
        });
    }
}

// Form validation
function validateForm(formObject) {
    const required = ['name', 'email', 'subject', 'message'];
    
    for (let field of required) {
        if (!formObject[field] || formObject[field].trim() === '') {
            showGlassNotification(`Please fill in the ${field} field.`, 'error');
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formObject.email)) {
        showGlassNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

// Glass Morphism Notification System
function showGlassNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `glass-notification glass-notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${icons[type]}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('style[data-glass-notifications]')) {
        const style = document.createElement('style');
        style.setAttribute('data-glass-notifications', '');
        style.textContent = `
            .glass-notification {
                position: fixed;
                top: 30px;
                right: 30px;
                z-index: 10000;
                max-width: 400px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.25);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                transform: translateX(100%);
                transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                color: white;
            }
            
            .glass-notification-success {
                border-left: 4px solid #4CAF50;
            }
            
            .glass-notification-error {
                border-left: 4px solid #f44336;
            }
            
            .glass-notification-info {
                border-left: 4px solid #2196F3;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .notification-icon {
                font-size: 20px;
                flex-shrink: 0;
            }
            
            .notification-message {
                flex: 1;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 18px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .glass-notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        removeGlassNotification(notification);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeGlassNotification(notification);
    });
}

function removeGlassNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 600);
}

// Enhanced Parallax Effects
function setupParallax() {
    // Mouse movement parallax for glass elements
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Subtle parallax for glass elements
        const glassElements = document.querySelectorAll('.hero-glass, .skill-category, .project-card');
        glassElements.forEach((element, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            element.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
}

// Glass Effects Enhancement
function setupGlassEffects() {
    // Add hover effects to glass elements
    const glassElements = document.querySelectorAll('.glass, .hero-glass, .skill-category, .project-card, .btn-glass');
    
    glassElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.35)';
            this.style.transform += ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.25)';
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
    
    // Project card special effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform += ' rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' rotateY(5deg)', '');
        });
    });
}

// Scroll indicator
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
        
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// Initialize scroll indicator
setupScrollIndicator();

// Performance optimization
function optimizePerformance() {
    // Preload critical background images
    const backgroundImages = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'
    ];
    
    backgroundImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Lazy load non-critical images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize performance optimizations
optimizePerformance();

// Console message
console.log(
    '%c🌟 Glass Morphism Portfolio Loaded Successfully! 🌟',
    'color: #64b5f6; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(100, 181, 246, 0.5);'
);

console.log(
    '%cFeaturing cinematic backgrounds, smooth glass effects, and responsive design.',
    'color: #81c784; font-size: 12px;'
);

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid rgba(100, 181, 246, 0.8) !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(100, 181, 246, 0.2) !important;
    }
`;
document.head.appendChild(keyboardStyle);
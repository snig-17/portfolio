// Exact Layout Portfolio JavaScript - Smooth Photography Transitions

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Core functionality
    handleLoadingScreen();
    setupNavigation();
    setupBackgroundSlideshow();
    setupTimestamp();
    setupScrollEffects();
    setupResponsiveFeatures();
    
    console.log('%c✨ Portfolio Loaded Successfully!', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
}

// Enhanced Loading Screen
function handleLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simple timer-based loading for immediate display
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            startHeroAnimations();
        }, 1000);
    }, 2000); // Show loading for 2 seconds then continue
}

// Start hero animations after loading
function startHeroAnimations() {
    // Trigger CSS animations by adding loaded class
    document.body.classList.add('loaded');
    
    // Start background slideshow after initial animations
    setTimeout(() => {
        startBackgroundSlideshow();
    }, 3000);
}

// Navigation Setup
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Smooth scroll
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation based on scroll
    setupActiveNavigation();
}

// Active navigation highlighting
function setupActiveNavigation() {
    const sections = document.querySelectorAll('.section, .hero');
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

// Background Slideshow with Smooth Transitions
function setupBackgroundSlideshow() {
    const backgrounds = document.querySelectorAll('.hero-bg');
    const dots = document.querySelectorAll('.bg-dot');
    let currentBg = 0;
    let isTransitioning = false;
    
    // Manual background switching via dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (!isTransitioning && index !== currentBg) {
                switchBackground(index);
            }
        });
    });
    
    function switchBackground(newIndex) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Update dots
        dots[currentBg].classList.remove('active');
        dots[newIndex].classList.add('active');
        
        // Cross-fade backgrounds
        backgrounds[currentBg].classList.remove('active');
        backgrounds[newIndex].classList.add('active');
        
        currentBg = newIndex;
        
        // Reset transition flag after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 4000); // Match CSS transition duration
    }
    
    // Auto slideshow
    function startBackgroundSlideshow() {
        setInterval(() => {
            if (!isTransitioning) {
                const nextBg = (currentBg + 1) % backgrounds.length;
                switchBackground(nextBg);
            }
        }, 8000); // Change every 8 seconds
    }
    
    // Store function globally for later use
    window.startBackgroundSlideshow = startBackgroundSlideshow;
}

// Real-time Timestamp
function setupTimestamp() {
    const timestampElement = document.getElementById('currentTime');
    
    function updateTimestamp() {
        const now = new Date();
        const options = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        
        const formattedTime = now.toLocaleString('en-US', options).replace(',', '');
        timestampElement.textContent = formattedTime;
    }
    
    // Update immediately and then every minute
    updateTimestamp();
    setInterval(updateTimestamp, 60000);
}

// Scroll Effects
function setupScrollEffects() {
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollArrow = document.querySelector('.scroll-arrow');
    
    // Hide scroll indicator on scroll
    let ticking = false;
    
    function updateScrollIndicator() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollIndicator);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Scroll to about section on click
    scrollArrow.addEventListener('click', function() {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Parallax effect for hero content
    setupParallaxEffect();
}

// Subtle Parallax Effect
function setupParallaxEffect() {
    const heroContent = document.querySelector('.hero-container');
    const backgrounds = document.querySelectorAll('.hero-bg');
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const contentRate = scrolled * -0.1;
        
        // Move backgrounds slightly slower
        backgrounds.forEach(bg => {
            bg.style.transform = `translateY(${rate}px)`;
        });
        
        // Move content slightly for depth
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${contentRate}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxTick);
}

// Responsive Features
function setupResponsiveFeatures() {
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layouts after orientation change
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
    
    // Optimize for touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch-specific optimizations
        const touchElements = document.querySelectorAll('.bg-dot, .scroll-arrow, .nav-link');
        touchElements.forEach(element => {
            element.style.minHeight = '44px';
            element.style.minWidth = '44px';
        });
    }
    
    // Handle reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable auto slideshow for users who prefer reduced motion
        window.startBackgroundSlideshow = function() {
            console.log('Auto slideshow disabled due to reduced motion preference');
        };
        
        // Hide background controls
        const bgControls = document.querySelector('.bg-controls');
        if (bgControls) {
            bgControls.style.display = 'none';
        }
    }
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    const backgrounds = document.querySelectorAll('.hero-bg');
    const dots = document.querySelectorAll('.bg-dot');
    
    // Arrow keys for background navigation
    if (e.key === 'ArrowLeft' && document.querySelector('.hero').getBoundingClientRect().top >= -100) {
        e.preventDefault();
        const currentIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : backgrounds.length - 1;
        dots[prevIndex].click();
    } else if (e.key === 'ArrowRight' && document.querySelector('.hero').getBoundingClientRect().top >= -100) {
        e.preventDefault();
        const currentIndex = Array.from(dots).findIndex(dot => dot.classList.contains('active'));
        const nextIndex = (currentIndex + 1) % backgrounds.length;
        dots[nextIndex].click();
    }
    
    // Tab key for keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid rgba(255, 255, 255, 0.8) !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2) !important;
    }
`;
document.head.appendChild(keyboardStyle);

// Performance Monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`%cPage Load Performance:
                DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms
                Load Complete: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`, 
                'color: #4a90e2; font-size: 12px;');
            }, 0);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Add visual feedback for interactions
function addInteractionFeedback() {
    const interactiveElements = document.querySelectorAll('.bg-dot, .scroll-arrow, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Initialize interaction feedback
addInteractionFeedback();
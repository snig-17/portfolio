
        // Simple JavaScript for immediate functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Remove loading screen after 2 seconds
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }, 2000);
            
            // Update timestamp
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
                document.getElementById('currentTime').textContent = formattedTime;
            }
            
            updateTimestamp();
            setInterval(updateTimestamp, 60000);
            
            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Glass cards interaction
            document.querySelectorAll('.glass-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-12px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
            
            // GitHub corner interaction
            document.querySelectorAll('.github-corner').forEach(icon => {
                icon.addEventListener('click', function() {
                    const card = this.closest('.glass-card');
                    const title = card.querySelector('.card-title').textContent;
                    console.log(`🚀 Opening GitHub repository for: ${title}`);
                    
                    // Add click animation
                    this.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 150);
                    }, 100);
                });
            });
            
            // Add click analytics for project links
            document.querySelectorAll('.card-link').forEach(link => {
                link.addEventListener('click', function() {
                    const card = this.closest('.glass-card');
                    const title = card.querySelector('.card-title').textContent;
                    const linkText = this.textContent.trim();
                    console.log(`🔗 Clicking ${linkText} for: ${title}`);
                });
            });
            
            // Add parallax effect to projects section
            window.addEventListener('scroll', () => {
                const projectsSection = document.querySelector('.projects-section');
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.2;
                
                if (projectsSection) {
                    projectsSection.style.transform = `translateY(${rate}px)`;
                }
            });
            
            // Interactive Timeline Animation
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Add staggered animation delay
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, index * 200);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe timeline items
            document.querySelectorAll('.timeline-item').forEach(item => {
                timelineObserver.observe(item);
            });
            
            // Timeline item click interaction
            document.querySelectorAll('.timeline-content').forEach(content => {
                content.addEventListener('click', function() {
                    // Toggle active state
                    const isActive = this.classList.contains('timeline-active');
                    
                    // Remove active from all items
                    document.querySelectorAll('.timeline-content').forEach(item => {
                        item.classList.remove('timeline-active');
                    });
                    
                    // Add active to clicked item if it wasn't active
                    if (!isActive) {
                        this.classList.add('timeline-active');
                    }
                    
                    // Log interaction
                    const company = this.querySelector('.timeline-company').textContent;
                    console.log(`🎯 Timeline interaction: ${company}`);
                });
                
                // Enhanced hover effects
                content.addEventListener('mouseenter', function() {
                    const dot = this.parentElement.querySelector('.timeline-dot');
                    if (dot) {
                        dot.style.transform = 'translateY(-50%) scale(1.4)';
                        dot.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.9), 0 8px 25px rgba(0, 0, 0, 0.5)';
                    }
                });
                
                content.addEventListener('mouseleave', function() {
                    const dot = this.parentElement.querySelector('.timeline-dot');
                    if (dot && !this.classList.contains('timeline-active')) {
                        dot.style.transform = 'translateY(-50%) scale(1)';
                        dot.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)';
                    }
                });
            });
            
            // Add CSS for active timeline state
            const timelineActiveStyle = document.createElement('style');
            timelineActiveStyle.textContent = `
                .timeline-content.timeline-active {
                    background: rgba(255, 255, 255, 0.25) !important;
                    border-color: rgba(255, 255, 255, 0.4) !important;
                    transform: translateY(-15px) scale(1.03) !important;
                    box-shadow: 
                        0 25px 80px rgba(0, 0, 0, 0.5),
                        0 10px 30px rgba(0, 0, 0, 0.3),
                        inset 0 2px 0 rgba(255, 255, 255, 0.5) !important;
                }
                
                .timeline-content.timeline-active + .timeline-dot {
                    transform: translateY(-50%) scale(1.5) !important;
                    box-shadow: 
                        0 0 50px rgba(255, 255, 255, 1),
                        0 10px 30px rgba(0, 0, 0, 0.6) !important;
                }
                
                .timeline-content.timeline-active + .timeline-dot::before {
                    background: linear-gradient(135deg, #FF2D92 0%, #FF6B35 100%) !important;
                    transform: translate(-50%, -50%) scale(1.4) !important;
                }
            `;
            document.head.appendChild(timelineActiveStyle);
            
            // Animate glass cards on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const glassObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            // Observe glass cards with staggered animation
            document.querySelectorAll('.glass-card').forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = `all 0.6s ease ${index * 0.1}s`;
                glassObserver.observe(card);
            });
            
            
        });
 
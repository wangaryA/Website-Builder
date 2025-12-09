// ===================================
// WebCraft Studio - Premium Animations
// Modern, Impressive Interactions
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // CUSTOM CURSOR
    // ===================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        let cursorX = 0, cursorY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
        });

        // Smooth outline follow
        function animateOutline() {
            outlineX += (cursorX - outlineX) * 0.15;
            outlineY += (cursorY - outlineY) * 0.15;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .portfolio-item, .service-card, .magnetic');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }

    // ===================================
    // MAGNETIC BUTTON EFFECT
    // ===================================
    const magneticButtons = document.querySelectorAll('.magnetic');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // ===================================
    // NAVIGATION
    // ===================================
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    });

    // Mobile navigation
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // COUNTER ANIMATION
    // ===================================
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // ===================================
    // INTERSECTION OBSERVER
    // ===================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    // Animate elements on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        animateOnScroll.observe(el);
    });

    // Observe portfolio items
    document.querySelectorAll('.portfolio-item').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.15}s`;
        animateOnScroll.observe(el);
    });

    // Observe process steps
    document.querySelectorAll('.process-step').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.2}s`;
        animateOnScroll.observe(el);
    });

    // Counter animation observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // ===================================
    // PROCESS TIMELINE ANIMATION
    // ===================================
    const timelineProgress = document.querySelector('.timeline-progress');
    const processSection = document.querySelector('.process');

    if (timelineProgress && processSection) {
        window.addEventListener('scroll', () => {
            const sectionTop = processSection.offsetTop;
            const sectionHeight = processSection.offsetHeight;
            const scrollPosition = window.scrollY + window.innerHeight;

            const progress = Math.min(
                Math.max((scrollPosition - sectionTop) / sectionHeight, 0),
                1
            );

            timelineProgress.style.height = `${progress * 100}%`;
        });
    }

    // ===================================
    // TILT EFFECT ON CARDS
    // ===================================
    const tiltCards = document.querySelectorAll('.portfolio-item, .cta-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // TEXT SPLIT ANIMATION
    // ===================================
    const splitTexts = document.querySelectorAll('.section-title.split-text');

    const splitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach((span, i) => {
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, i * 150);
                });
                splitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    splitTexts.forEach(text => {
        const spans = text.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            span.style.display = 'block';
            span.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        splitObserver.observe(text);
    });

    // ===================================
    // PARALLAX EFFECT ON ORBS
    // ===================================
    const orbs = document.querySelectorAll('.orb');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.05;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ===================================
    // FORM INTERACTIONS
    // ===================================
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.color = '#6366f1';
                label.style.transform = 'translateY(-3px)';
            });

            input.addEventListener('blur', () => {
                label.style.color = '';
                label.style.transform = '';
            });
        }
    });

    // Form submission with Formspree
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            // Animate button - sending state
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;
            btnIcon.innerHTML = `
                <svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
            `;

            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success state
                    btnText.textContent = 'Sent!';
                    btnIcon.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    `;
                    submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                    this.reset();

                    setTimeout(() => {
                        btnText.textContent = 'Send Message';
                        btnIcon.innerHTML = `
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                            </svg>
                        `;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Error state
                btnText.textContent = 'Error - Try Again';
                btnIcon.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M15 9l-6 6M9 9l6 6"/>
                    </svg>
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                submitBtn.disabled = false;

                setTimeout(() => {
                    btnText.textContent = 'Send Message';
                    btnIcon.innerHTML = `
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    `;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // ===================================
    // SCROLL REVEAL ANIMATION
    // ===================================
    const revealElements = document.querySelectorAll('.section-tag, .section-subtitle, .contact-item, .social-link');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // ===================================
    // BROWSER MOCKUP ANIMATION
    // ===================================
    const mockup = document.querySelector('.browser-mockup');

    if (mockup) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const rotation = Math.min(scrollY * 0.02, 5);
            mockup.style.transform = `perspective(1000px) rotateY(${-rotation}deg) rotateX(${rotation * 0.5}deg)`;
        });
    }

    // ===================================
    // MARQUEE PAUSE ON HOVER
    // ===================================
    const marquee = document.querySelector('.marquee-content');

    if (marquee) {
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });
        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });
    }

    // ===================================
    // SERVICE CARD NUMBER ANIMATION
    // ===================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const number = card.querySelector('.service-number');

        card.addEventListener('mouseenter', () => {
            if (number) {
                number.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (number) {
                number.style.transform = '';
            }
        });
    });

    // ===================================
    // GLITCH TEXT EFFECT ON HOVER
    // ===================================
    const glitchElements = document.querySelectorAll('.portfolio-title');

    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease';
        });

        el.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // ===================================
    // ADD LOADED CLASS FOR ANIMATIONS
    // ===================================
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===================================
// DYNAMIC STYLES
// ===================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .service-card,
    .portfolio-item,
    .process-step {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .service-card.visible,
    .portfolio-item.visible,
    .process-step.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .service-number {
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s ease, opacity 0.4s ease;
    }

    .spin {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }

    body:not(.loaded) .hero-content > * {
        opacity: 0;
        transform: translateY(30px);
    }

    body.loaded .hero-content > * {
        opacity: 1;
        transform: translateY(0);
    }

    .portfolio-item,
    .cta-card {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
    }

    .browser-mockup {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .orb {
        transition: transform 0.1s linear;
    }
`;
document.head.appendChild(dynamicStyles);

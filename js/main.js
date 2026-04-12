// ===================================
// Webgari — Next-Level Animations
// Powered by Nano Banana ideation
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // Mark body so CSS reveal animations only activate when JS is running
    document.body.classList.add('js-ready');

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

        function animateOutline() {
            outlineX += (cursorX - outlineX) * 0.15;
            outlineY += (cursorY - outlineY) * 0.15;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

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
    // 🌟 NANO IDEA 1: CURSOR PARTICLE TRAIL
    // Glowing orbs bloom behind your cursor
    // ===================================
    const trailColors = ['#6366f1', '#a855f7', '#ec4899', '#38bdf8', '#34d399'];
    let lastTrailTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < 40) return;
        lastTrailTime = now;

        const particle = document.createElement('div');
        particle.className = 'cursor-trail-particle';
        const size = Math.random() * 8 + 4;
        const color = trailColors[Math.floor(Math.random() * trailColors.length)];
        particle.style.cssText = `
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 700);
    });

    // ===================================
    // 🌟 NANO IDEA 2: SCROLL VELOCITY SKEW
    // Fast scroll = elements warp like spaceship warp speed
    // ===================================
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let skewTimeout;

    const skewTargets = document.querySelectorAll(
        '.service-card, .portfolio-item, .process-step, .section-title, .hero-title, .hero-subtitle'
    );

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollVelocity = (currentScrollY - lastScrollY) * 0.08;
        scrollVelocity = Math.max(-8, Math.min(8, scrollVelocity));

        skewTargets.forEach(el => {
            el.style.transform = el.style.transform.replace(/skewY\([^)]*\)/, '') + ` skewY(${scrollVelocity}deg)`;
            el.style.transition = 'transform 0.1s ease-out';
        });

        clearTimeout(skewTimeout);
        skewTimeout = setTimeout(() => {
            skewTargets.forEach(el => {
                const base = el.style.transform.replace(/skewY\([^)]*\)/, '').trim();
                el.style.transform = base || '';
                el.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }, 80);

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        lastScrollY = currentScrollY;
    });

    // ===================================
    // 🌟 NANO IDEA 3: CHARACTER SCRAMBLE TEXT
    // Hero words decode like a hacker terminal
    // ===================================
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

    function scrambleText(element, finalText, duration = 1200) {
        let start = null;
        const totalFrames = duration / 16;

        function frame(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            const resolvedCount = Math.floor(progress * finalText.length);

            let display = '';
            for (let i = 0; i < finalText.length; i++) {
                if (finalText[i] === ' ') {
                    display += ' ';
                } else if (i < resolvedCount) {
                    display += finalText[i];
                } else {
                    display += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            element.textContent = display;

            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                element.textContent = finalText;
            }
        }
        requestAnimationFrame(frame);
    }

    // Apply scramble to hero title words after page load
    setTimeout(() => {
        const titleWords = document.querySelectorAll('.title-word');
        titleWords.forEach((word, i) => {
            const originalText = word.textContent;
            setTimeout(() => {
                scrambleText(word, originalText, 1000 + i * 200);
            }, i * 300);
        });
    }, 600);

    // ===================================
    // MAGNETIC BUTTON EFFECT
    // ===================================
    const magneticButtons = document.querySelectorAll('.magnetic');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // ===================================
    // NAVIGATION
    // ===================================
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

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
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                window.scrollTo({
                    top: target.offsetTop - navHeight - 20,
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
    // 🌟 NANO IDEA 4: CLIP-PATH WIPE REVEALS
    // Sections sweep in with a cinematic curtain wipe
    // ===================================
    const wipeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('wipe-visible');
                }, index * 120);
                wipeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    // Only section-tag gets the clip-path wipe — section-title uses splitObserver instead
    document.querySelectorAll('.section-tag').forEach(el => {
        el.classList.add('title-wipe-reveal');
        wipeObserver.observe(el);
    });
    // Note: .section-title uses splitObserver (below); keeping it out of wipeObserver
    // avoids clip-path conflict that hides span children after opacity animation fires

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
    if (statsSection) counterObserver.observe(statsSection);

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
            const progress = Math.min(Math.max((scrollPosition - sectionTop) / sectionHeight, 0), 1);
            timelineProgress.style.height = `${progress * 100}%`;
        });
    }

    // ===================================
    // 🌟 NANO IDEA 5: SHOCKWAVE RIPPLE ON CLICK
    // Every click sends a radial energy pulse across the screen
    // ===================================
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'shockwave-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    });

    // ===================================
    // TILT EFFECT ON CARDS
    // ===================================
    const tiltCards = document.querySelectorAll('.portfolio-item, .cta-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // 🌟 NANO IDEA 6: CRT SCANLINE BOOT
    // Browser mockup powers on like a vintage CRT monitor
    // ===================================
    const mockup = document.querySelector('.browser-mockup');
    const mockupWrapper = document.querySelector('.mockup-wrapper');

    if (mockup) {
        // Add scanline overlay
        const scanlines = document.createElement('div');
        scanlines.className = 'crt-scanlines';
        mockup.appendChild(scanlines);

        // Add power-on flash
        const crtFlash = document.createElement('div');
        crtFlash.className = 'crt-flash';
        mockup.appendChild(crtFlash);

        // Trigger boot sequence after load
        setTimeout(() => {
            mockup.classList.add('crt-boot');
            setTimeout(() => {
                crtFlash.classList.add('crt-flash-active');
                setTimeout(() => {
                    crtFlash.classList.remove('crt-flash-active');
                    mockup.classList.add('crt-on');
                }, 200);
            }, 300);
        }, 800);

        // Scroll rotation
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const rotation = Math.min(scrollY * 0.02, 5);
            if (!mockup.classList.contains('crt-boot')) return;
            mockup.style.transform = `perspective(1000px) rotateY(${-rotation}deg) rotateX(${rotation * 0.5}deg)`;
        });
    }

    // ===================================
    // TEXT SPLIT ANIMATION
    // ===================================
    const splitTexts = document.querySelectorAll('.section-title.split-text');

    const revealSpans = (text) => {
        const spans = text.querySelectorAll('span');
        spans.forEach((span, i) => {
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, i * 150);
        });
    };

    const splitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealSpans(entry.target);
                splitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    splitTexts.forEach(text => {
        const spans = text.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px)';
            span.style.display = 'block';
            span.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        splitObserver.observe(text);
    });

    // ===================================
    // PARALLAX EFFECT ON ORBS (enhanced)
    // ===================================
    const orbs = document.querySelectorAll('.orb');

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateOrbs() {
        const scrollY = window.scrollY;
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.05;
            const mouseInfluence = (i + 1) * 15;
            const tx = mouseX * mouseInfluence;
            const ty = mouseY * mouseInfluence + scrollY * speed;
            orb.style.transform = `translate(${tx}px, ${ty}px)`;
        });
        requestAnimationFrame(animateOrbs);
    }
    animateOrbs();

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

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;
            btnIcon.innerHTML = `<svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`;

            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btnText.textContent = 'Sent!';
                    btnIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
                    submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                    this.reset();
                    setTimeout(() => {
                        btnText.textContent = 'Send Message';
                        btnIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else throw new Error('failed');
            } catch {
                btnText.textContent = 'Error - Try Again';
                btnIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`;
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                submitBtn.disabled = false;
                setTimeout(() => {
                    btnText.textContent = 'Send Message';
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // ===================================
    // MARQUEE PAUSE ON HOVER
    // ===================================
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
        marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
    }

    // ===================================
    // SERVICE CARD NUMBER ANIMATION
    // ===================================
    document.querySelectorAll('.service-card').forEach(card => {
        const number = card.querySelector('.service-number');
        card.addEventListener('mouseenter', () => {
            if (number) number.style.transform = 'scale(1.2) rotate(10deg)';
        });
        card.addEventListener('mouseleave', () => {
            if (number) number.style.transform = '';
        });
    });

    // ===================================
    // GLITCH TEXT ON HOVER
    // ===================================
    document.querySelectorAll('.portfolio-title').forEach(el => {
        el.addEventListener('mouseenter', function () {
            this.style.animation = 'glitch 0.3s ease';
        });
        el.addEventListener('animationend', function () {
            this.style.animation = '';
        });
    });

    // ===================================
    // SCROLL REVEAL — service cards, portfolio, process
    // (restores visibility from dynamic opacity:0 styles)
    // ===================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

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

    document.querySelectorAll('.service-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
        animateOnScroll.observe(el);
    });
    document.querySelectorAll('.portfolio-item').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.15}s`;
        animateOnScroll.observe(el);
    });
    document.querySelectorAll('.process-step').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.2}s`;
        animateOnScroll.observe(el);
    });

    // Fade-in reveal for section tags, subtitles, contact items
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
    // SCROLL PROGRESS BAR
    // ===================================
    const scrollBar = document.getElementById('scrollProgressBar');
    if (scrollBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = (scrollTop / docHeight) * 100;
            scrollBar.style.width = pct + '%';
        });
    }

    // ===================================
    // SERVICE CARD MOUSE SPOTLIGHT
    // ===================================
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            this.style.setProperty('--mx', x + '%');
            this.style.setProperty('--my', y + '%');
        });
    });

    // ===================================
    // ADD LOADED CLASS
    // ===================================
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===================================
// DYNAMIC STYLES (all new animations)
// ===================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `

    /* ---- Base reveal states (only active when JS is running) ---- */
    body.js-ready .service-card,
    body.js-ready .portfolio-item,
    body.js-ready .process-step {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }
    body.js-ready .service-card.visible,
    body.js-ready .portfolio-item.visible,
    body.js-ready .process-step.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* ---- Nano Idea 1: Cursor Trail Particles ---- */
    .cursor-trail-particle {
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        animation: trailFade 0.7s ease-out forwards;
    }
    @keyframes trailFade {
        0%   { opacity: 0.9; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0;   transform: translate(-50%, -50%) scale(0.1); }
    }

    /* ---- Nano Idea 4: Clip-path Wipe Reveals ---- */
    .wipe-reveal {
        opacity: 0;
        clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
        transition:
            opacity 0.6s ease,
            clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        transform: translateY(30px);
    }
    .wipe-reveal.wipe-visible {
        opacity: 1;
        clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%);
        transform: translateY(0);
    }

    .title-wipe-reveal {
        opacity: 0;
        clip-path: inset(0 100% 0 0);
        transition:
            opacity 0.5s ease,
            clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .title-wipe-reveal.wipe-visible {
        opacity: 1;
        clip-path: inset(0 0% 0 0);
    }

    /* ---- Nano Idea 5: Shockwave Ripple ---- */
    .shockwave-ripple {
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%) scale(0);
        width: 20px;
        height: 20px;
        border: 2px solid rgba(99, 102, 241, 0.6);
        animation: shockwave 0.8s ease-out forwards;
    }
    @keyframes shockwave {
        0%   { transform: translate(-50%, -50%) scale(0);  opacity: 0.8; border-width: 3px; }
        50%  { opacity: 0.4; border-width: 2px; }
        100% { transform: translate(-50%, -50%) scale(20); opacity: 0;   border-width: 1px; }
    }

    /* ---- Nano Idea 6: CRT Scanline Boot ---- */
    .crt-scanlines {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 10;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.08) 2px,
            rgba(0, 0, 0, 0.08) 4px
        );
        animation: scanlineMove 8s linear infinite;
        opacity: 0;
        transition: opacity 0.4s ease;
    }
    .crt-boot .crt-scanlines { opacity: 1; }
    @keyframes scanlineMove {
        0%   { background-position: 0 0; }
        100% { background-position: 0 100px; }
    }

    .crt-flash {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: rgba(150, 160, 255, 0.9);
        pointer-events: none;
        z-index: 20;
        opacity: 0;
        transition: opacity 0.1s ease;
    }
    .crt-flash.crt-flash-active { opacity: 1; }

    .browser-mockup {
        opacity: 0;
        transform: perspective(1000px) rotateY(-8deg) rotateX(4deg) scale(0.92);
        transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .browser-mockup.crt-on {
        opacity: 1;
        transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1);
    }

    /* ---- Hero content load animations ---- */
    body:not(.loaded) .hero-content > * {
        opacity: 0;
        transform: translateY(30px);
    }
    body.loaded .hero-content > * {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    body.loaded .hero-content > *:nth-child(1) { transition-delay: 0.1s; }
    body.loaded .hero-content > *:nth-child(2) { transition-delay: 0.25s; }
    body.loaded .hero-content > *:nth-child(3) { transition-delay: 0.4s; }
    body.loaded .hero-content > *:nth-child(4) { transition-delay: 0.55s; }
    body.loaded .hero-content > *:nth-child(5) { transition-delay: 0.7s; }

    /* ---- Misc ---- */
    .service-number {
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s ease, opacity 0.4s ease;
    }
    .spin { animation: spin 1s linear infinite; }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
    }
    @keyframes glitch {
        0%   { transform: translate(0); }
        20%  { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
        40%  { transform: translate(-2px, -2px); filter: hue-rotate(180deg); }
        60%  { transform: translate(2px, 2px); filter: hue-rotate(270deg); }
        80%  { transform: translate(2px, -2px); filter: hue-rotate(360deg); }
        100% { transform: translate(0); filter: none; }
    }
    .portfolio-item,
    .cta-card {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
    }
    .orb { will-change: transform; }
`;
document.head.appendChild(dynamicStyles);

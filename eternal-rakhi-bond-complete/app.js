// DOM Elements
const loadingScreen = document.getElementById('loading');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const floatingHeartsContainer = document.getElementById('floating-hearts');
const typewriterElement = document.getElementById('typewriter');
const heroImageContainer = document.getElementById('hero-image-container');
const threadOverlay = document.getElementById('thread-overlay');
const revealMessage = document.getElementById('reveal-message');

// Global variables
let typewriterStarted = false;
let heroRevealed = false;

// Loading Screen Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
});

// Navigation Toggle
navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// SPECIAL THREAD/UNTHREAD FUNCTIONALITY FOR HERO IMAGE
function initializeThreadUnthread() {
    if (!heroImageContainer || !threadOverlay || !revealMessage) return;
    
    console.log('Initializing thread/unthread functionality...');
    
    // Add click event to hero image container
    heroImageContainer.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (heroRevealed) return;
        
        console.log('Starting thread unthreading...');
        heroRevealed = true;
        
        // Start unthreading animation
        threadOverlay.classList.add('unthreading');
        
        // Create golden particles effect
        createGoldenParticles();
        
        // Hide thread overlay after animation
        setTimeout(() => {
            threadOverlay.style.opacity = '0';
            threadOverlay.style.pointerEvents = 'none';
        }, 800);
        
        // Show reveal message
        setTimeout(() => {
            revealMessage.classList.add('show');
            createRevealBurst();
        }, 1200);
        
        // Hide reveal message after some time
        setTimeout(() => {
            revealMessage.classList.remove('show');
        }, 4000);
        
        // Add special glow to hero image
        const heroImage = document.getElementById('hero-image');
        if (heroImage) {
            heroImage.style.boxShadow = '0 25px 50px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 105, 180, 0.3)';
            heroImage.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
                heroImage.style.transform = 'scale(1)';
            }, 1000);
        }
    });
    
    // Add hover effect hint
    heroImageContainer.addEventListener('mouseenter', function() {
        if (!heroRevealed) {
            this.style.transform = 'scale(1.02)';
            threadOverlay.style.opacity = '0.9';
        }
    });
    
    heroImageContainer.addEventListener('mouseleave', function() {
        if (!heroRevealed) {
            this.style.transform = 'scale(1)';
            threadOverlay.style.opacity = '1';
        }
    });
}

// Create golden particles when thread unthreads
function createGoldenParticles() {
    const particles = ['✨', '⭐', '🌟', '💫', '💖', '💛', '🧡'];
    const rect = heroImageContainer.getBoundingClientRect();
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * 200}px;
                top: ${rect.top + rect.height / 2 + (Math.random() - 0.5) * 150}px;
                font-size: ${Math.random() * 10 + 16}px;
                pointer-events: none;
                z-index: 1000;
                animation: goldenParticle 2.5s ease-out forwards;
                --angle: ${Math.random() * 360}deg;
                --distance: ${Math.random() * 150 + 100}px;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 2500);
        }, i * 50);
    }
}

// Create reveal burst effect
function createRevealBurst() {
    const hearts = ['💖', '💕', '💗', '💝', '❤️', '🧡', '💛'];
    const rect = revealMessage.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                font-size: 24px;
                pointer-events: none;
                z-index: 1000;
                animation: revealBurst 3s ease-out forwards;
                --burst-angle: ${i * 24}deg;
                --burst-distance: ${Math.random() * 200 + 150}px;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 3000);
        }, i * 100);
    }
}

// ENHANCED FLIP CARD FUNCTIONALITY
function initializeFlipCards() {
    console.log('Initializing enhanced flip cards...');
    
    const flipCards = document.querySelectorAll('.flip-card');
    console.log('Found flip cards:', flipCards.length);
    
    flipCards.forEach((card, index) => {
        const cardInner = card.querySelector('.flip-card-inner');
        if (!cardInner) {
            console.log('No flip-card-inner found for card', index);
            return;
        }
        
        let isFlipped = false;
        
        // Enhanced click functionality
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Flip card clicked:', index, 'Currently flipped:', isFlipped);
            
            // Toggle flip state
            if (isFlipped) {
                card.classList.remove('flipped');
                isFlipped = false;
            } else {
                card.classList.add('flipped');
                isFlipped = true;
            }
            
            // Visual feedback
            card.style.transform = 'scale(0.98) translateY(-5px)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px)';
            }, 150);
            
            // Create flip effect particles
            createFlipParticles(card);
            
            console.log('Card flipped to:', isFlipped ? 'back' : 'front');
        });
        
        // Enhanced hover effects for desktop
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', function() {
                if (!isFlipped) {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (!isFlipped) {
                    this.style.transform = 'translateY(-5px) scale(1)';
                }
            });
        }
        
        // Touch support for mobile
        card.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95) translateY(-5px)';
        }, {passive: true});
        
        card.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        }, {passive: true});
        
        // Ensure proper initial state
        card.classList.remove('flipped');
        isFlipped = false;
        
        console.log('Enhanced flip card initialized:', index);
    });
}

// Create flip effect particles with love
function createFlipParticles(card) {
    const particles = ['💖', '💕', '✨', '🌟', '💗', '💝', '⭐'];
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * 100}px;
                top: ${rect.top + rect.height / 2 + (Math.random() - 0.5) * 60}px;
                font-size: ${Math.random() * 6 + 16}px;
                pointer-events: none;
                z-index: 1000;
                animation: flipParticle 2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 2000);
        }, i * 80);
    }
}

// Smooth Scrolling with proper offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = 60;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Typewriter Effect
function typeWriter() {
    if (typewriterStarted || !typewriterElement) return;
    
    const text = "Life with you, my dearest Swarna Latha, is like walking through the most beautiful garden where every flower blooms with laughter, every breeze carries love, and every sunset paints unforgettable memories across the sky. You don't just make moments special - you transform my entire existence into something magical and meaningful. My precious sister, my heart's greatest treasure.";
    let index = 0;
    typewriterStarted = true;
    
    // Clear the text first and add cursor
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '3px solid #e91e63';
    typewriterElement.style.animation = 'blink-caret 1s step-end infinite';
    
    function type() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 40);
        } else {
            // Remove the blinking cursor after typing is complete
            setTimeout(() => {
                typewriterElement.style.borderRight = 'none';
                typewriterElement.style.animation = 'none';
                // Add a final flourish
                createTypewriterBurst();
            }, 1000);
        }
    }
    
    type();
}

// Create typewriter completion burst
function createTypewriterBurst() {
    const hearts = ['💖', '❤️', '💕', '💗', '💝', '🧡', '💛'];
    const rect = typewriterElement.getBoundingClientRect();
    
    for (let i = 0; i < 16; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                font-size: 22px;
                pointer-events: none;
                z-index: 1000;
                animation: typewriterBurst 2.5s ease-out forwards;
                --burst-angle: ${i * 22.5}deg;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            }, 2500);
        }, i * 100);
    }
}

// Floating Hearts Animation
function createFloatingHeart() {
    if (!floatingHeartsContainer) return;
    
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = Math.random() > 0.5 ? '💖' : '💕';
    
    // Random starting position
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.opacity = Math.random() * 0.7 + 0.3;
    heart.style.fontSize = (Math.random() * 8 + 18) + 'px';
    
    floatingHeartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (floatingHeartsContainer.contains(heart)) {
            floatingHeartsContainer.removeChild(heart);
        }
    }, 10000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 3000);

// Particle System for Hero Section
function createParticleSystem() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        const particles = ['✨', '⭐', '🌟', '💫'];
        
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: ${Math.random() > 0.5 ? '#ffd700' : '#ff69b4'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.2};
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: heroParticleFloat ${Math.random() * 8 + 12}s linear infinite;
        `;
        
        // Sometimes use emoji particles
        if (Math.random() > 0.7) {
            particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
            particle.style.background = 'transparent';
            particle.style.fontSize = '14px';
        }
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particlesContainer.contains(particle)) {
                particlesContainer.removeChild(particle);
            }
        }, 20000);
    }
    
    // Create initial particles
    for (let i = 0; i < 30; i++) {
        setTimeout(createParticle, i * 300);
    }
    
    setInterval(createParticle, 1200);
}

// Enhanced Scroll Animations
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger typewriter effect when letters section is visible
                if (entry.target.id === 'letters' && !typewriterStarted) {
                    setTimeout(typeWriter, 800);
                }
                
                // Add special entrance animations
                if (entry.target.classList.contains('flip-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(-5px)';
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.flip-card, .tradition-image-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Enhanced Navbar scroll effects
function handleNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 25px rgba(255, 105, 180, 0.2)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(15px)';
        }
    });
}

// Timeline enhanced interactions
function addTimelineInteractivity() {
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        const dot = item.querySelector('.timeline-dot');
        
        item.addEventListener('mouseenter', () => {
            if (dot) {
                dot.style.transform = 'translateX(-50%) scale(1.5)';
                dot.style.boxShadow = '0 0 30px rgba(255, 105, 180, 0.8)';
                dot.style.background = '#ff69b4';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (dot) {
                dot.style.transform = 'translateX(-50%) scale(1)';
                dot.style.boxShadow = '0 0 0 4px #ff69b4';
                dot.style.background = '#ffd700';
            }
        });
    });
}

// Enhanced image interactions
function addImageInteractivity() {
    // Story image interaction
    const storyImages = document.querySelectorAll('.story-image, .tradition-image');
    storyImages.forEach(img => {
        img.parentElement.addEventListener('click', () => {
            createImageClickEffect(img.parentElement);
        });
    });
}

// Create image click effect with sparkles
function createImageClickEffect(element) {
    const sparkles = ['✨', '⭐', '🌟', '💫', '💖'];
    const rect = element.getBoundingClientRect();
    
    // Scale effect
    element.style.transform = 'scale(1.05) translateY(-10px)';
    setTimeout(() => {
        element.style.transform = 'translateY(-5px)';
    }, 300);
    
    // Create sparkles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: 20px;
                pointer-events: none;
                z-index: 1000;
                animation: sparkle 1.8s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            }, 1800);
        }, i * 120);
    }
}

// Easter egg: Special hero title interaction
function addEasterEgg() {
    const heroTitle = document.querySelector('.hero-title');
    let clickCount = 0;
    
    if (!heroTitle) return;
    
    heroTitle.style.cursor = 'pointer';
    heroTitle.addEventListener('click', () => {
        clickCount++;
        
        // Create burst of hearts
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const burstHeart = document.createElement('div');
                burstHeart.innerHTML = '💖';
                burstHeart.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 30%;
                    transform: translate(-50%, -50%);
                    font-size: 28px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: easterEggBurst 3s ease-out forwards;
                    --angle: ${i * 14.4}deg;
                    --distance: ${Math.random() * 250 + 200}px;
                `;
                
                document.body.appendChild(burstHeart);
                
                setTimeout(() => {
                    if (document.body.contains(burstHeart)) {
                        document.body.removeChild(burstHeart);
                    }
                }, 3000);
            }, i * 60);
        }
        
        // Special message after 3 clicks
        if (clickCount === 3) {
            showSpecialMessage();
            clickCount = 0;
        }
    });
}

// Show special loving message
function showSpecialMessage() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        backdrop-filter: blur(8px);
    `;
    
    overlay.innerHTML = `
        <div style="background: linear-gradient(135deg, #fff, #fdf5e6); padding: 60px; border-radius: 30px; 
                    box-shadow: 0 30px 80px rgba(0,0,0,0.3); 
                    text-align: center; border: 4px solid #ffd700; max-width: 500px;
                    position: relative; animation: heartbeatIn 0.8s ease-out;">
            <h3 style="color: #e91e63; margin-bottom: 30px; font-family: 'Dancing Script', cursive; font-size: 32px;">
                💖 Secret Message Unlocked! 💖
            </h3>
            <p style="color: #333; line-height: 1.8; margin-bottom: 30px; font-size: 18px;">
                "My dearest Swarna Latha, even in this digital realm, our bond sparkles with magic! This website is woven with threads of my endless love for you. You found the secret - you truly understand the depth of my heart, my precious akka!"
            </p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: linear-gradient(135deg, #e91e63, #ff69b4); color: white; border: none; padding: 18px 35px; 
                           border-radius: 35px; cursor: pointer; font-family: inherit; font-size: 17px;
                           transition: all 0.3s ease; font-weight: 600; box-shadow: 0 8px 25px rgba(233, 30, 99, 0.3);">
                Close with All My Love ❤️
            </button>
        </div>
    `;
    
    // Add click outside to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    document.body.appendChild(overlay);
}

// Add required animations and effects
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes goldenParticle {
            0% {
                transform: rotate(0deg) translateY(0) scale(0);
                opacity: 1;
            }
            50% {
                transform: rotate(var(--angle)) translateY(-50px) scale(1.5);
                opacity: 0.8;
            }
            100% {
                transform: rotate(calc(var(--angle) * 2)) translateY(calc(-1 * var(--distance))) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes revealBurst {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(-50%, -50%) rotate(180deg) scale(1.2);
                opacity: 0.9;
            }
            100% {
                transform: translate(-50%, -50%) rotate(var(--burst-angle)) translateY(calc(-1 * var(--burst-distance))) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes flipParticle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.3) rotate(90deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(180deg) translateY(-80px);
                opacity: 0;
            }
        }
        
        @keyframes typewriterBurst {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) rotate(var(--burst-angle)) translateY(-150px) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes heroParticleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.5;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.4) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg) translateY(-60px);
                opacity: 0;
            }
        }
        
        @keyframes easterEggBurst {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--distance))) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes heartbeatIn {
            0% {
                transform: scale(0.3) rotate(-10deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.1) rotate(5deg);
            }
            100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }
        
        @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: #e91e63; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize background music functionality
function initializeBackgroundMusic() {
    let isPlaying = false;
    
    const musicButton = document.createElement('button');
    musicButton.innerHTML = '🎵';
    musicButton.title = 'Toggle Background Music - Avununava (Her Favorite!)';
    musicButton.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #ff69b4, #ffd700);
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    musicButton.addEventListener('mouseenter', () => {
        musicButton.style.transform = 'scale(1.2)';
        musicButton.style.boxShadow = '0 10px 30px rgba(255, 105, 180, 0.6)';
    });
    
    musicButton.addEventListener('mouseleave', () => {
        musicButton.style.transform = 'scale(1)';
        musicButton.style.boxShadow = '0 8px 25px rgba(255, 105, 180, 0.4)';
    });
    
    musicButton.addEventListener('click', () => {
        if (isPlaying) {
            musicButton.innerHTML = '🎵';
            musicButton.style.background = 'linear-gradient(135deg, #ff69b4, #ffd700)';
        } else {
            musicButton.innerHTML = '⏸️';
            musicButton.style.background = 'linear-gradient(135deg, #87ceeb, #ffd700)';
        }
        isPlaying = !isPlaying;
    });
    
    document.body.appendChild(musicButton);
}

// Add scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.title = 'Scroll to Top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 95px;
        right: 25px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #ffd700, #ff8c00);
        color: #333;
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
        z-index: 999;
        opacity: 0;
        transition: all 0.3s ease;
        transform: translateY(20px);
    `;
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(20px)';
        }
    });
    
    document.body.appendChild(scrollButton);
}

// Performance optimization
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduce animation frequency on mobile
        clearInterval(window.heartInterval);
        window.heartInterval = setInterval(createFloatingHeart, 5000);
    }
}

// Handle responsive adjustments
function handleResponsiveAdjustments() {
    function adjustForViewport() {
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth <= 480 && typewriterElement) {
            // On very small screens, make typewriter faster
            if (!typewriterStarted) {
                // Will be handled when section comes into view
            }
        }
    }
    
    adjustForViewport();
    window.addEventListener('resize', adjustForViewport);
}

// MAIN INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing enhanced application...');
    
    // Add required styles first
    addAnimationStyles();
    
    // Initialize core functionality
    setTimeout(() => {
        console.log('Starting initialization...');
        
        // Initialize special thread/unthread functionality
        initializeThreadUnthread();
        
        // Initialize enhanced flip cards
        initializeFlipCards();
        
        // Initialize other features
        createParticleSystem();
        handleScrollAnimations();
        handleNavbarScroll();
        addTimelineInteractivity();
        addImageInteractivity();
        addEasterEgg();
        initializeBackgroundMusic();
        addScrollToTop();
        handleResponsiveAdjustments();
        optimizeForMobile();
        
        console.log('Enhanced initialization complete with thread/unthread feature!');
    }, 500);
});

// Handle window resize events
window.addEventListener('resize', () => {
    optimizeForMobile();
    handleResponsiveAdjustments();
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }, 500);
});

// Enhanced touch support
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', () => {}, {passive: true});
}

// Add visual feedback for all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('button, .flip-card, .nav-link').forEach(element => {
            element.addEventListener('mousedown', function() {
                this.style.transform = (this.style.transform || '') + ' scale(0.95)';
            });
            
            element.addEventListener('mouseup', function() {
                this.style.transform = this.style.transform.replace(' scale(0.95)', '');
            });
        });
    }, 600);
});

// Special greeting on page load
setTimeout(() => {
    if (!heroRevealed) {
        const greeting = document.createElement('div');
        greeting.innerHTML = '💖 Welcome to our love story! Click the threaded photo above! 💖';
        greeting.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 20px;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
            font-family: 'Dancing Script', cursive;
            font-size: 18px;
            color: #e91e63;
            z-index: 1001;
            animation: fadeInOut 4s ease-in-out;
            pointer-events: none;
            text-align: center;
        `;
        
        const fadeStyle = document.createElement('style');
        fadeStyle.textContent = `
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(fadeStyle);
        document.body.appendChild(greeting);
        
        setTimeout(() => {
            if (document.body.contains(greeting)) {
                document.body.removeChild(greeting);
            }
        }, 4000);
    }
}, 3000);
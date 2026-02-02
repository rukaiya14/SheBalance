// Global variables
let isVoiceActive = false;
let recognition = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Initialize speech recognition if available
    initializeSpeechRecognition();

    // Add form submission handlers
    setupFormHandlers();

    // Mobile menu toggle
    setupMobileMenu();
}

// Handle navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Setup mobile menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navButtons.classList.toggle('active');
        });
    }
}

// Modal functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchToSignup() {
    closeModal('loginModal');
    openSignupModal();
}

function switchToLogin() {
    closeModal('signupModal');
    openLoginModal();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Form submission handlers
function setupFormHandlers() {
    // Login form
    const loginForm = document.querySelector('#loginModal .auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.querySelector('#signupModal .auth-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulate login process
    showNotification('Logging in...', 'info');
    
    setTimeout(() => {
        showNotification('Login successful! Welcome back!', 'success');
        closeModal('loginModal');
        // Redirect to dashboard or update UI
        updateUIForLoggedInUser();
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const language = document.getElementById('signupLanguage').value;
    const password = document.getElementById('signupPassword').value;

    // Simulate signup process
    showNotification('Creating your account...', 'info');
    
    setTimeout(() => {
        showNotification(`Welcome to SheBalance, ${name}! Your journey begins now!`, 'success');
        closeModal('signupModal');
        
        // Set flag for new signup to trigger onboarding
        localStorage.setItem('shebalance_new_signup', 'true');
        localStorage.setItem('shebalance_signup_name', name);
        
        // Redirect to dashboard for onboarding
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 2000);
}

function updateUIForLoggedInUser() {
    // Update navigation buttons
    const navButtons = document.querySelector('.nav-buttons');
    if (navButtons) {
        navButtons.innerHTML = `
            <button class="btn-secondary" onclick="openDashboard()">Dashboard</button>
            <button class="btn-primary" onclick="logout()">Logout</button>
        `;
    }
}

function startOnboardingProcess() {
    // Simulate starting the onboarding process
    showNotification('Starting your skill assessment...', 'info');
    setTimeout(() => {
        showNotification('Welcome to SheBalance! Redirecting to dashboard...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 1000);
}

// Voice functionality
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN'; // Default to Hindi
        
        recognition.onstart = function() {
            console.log('Voice recognition started');
            updateVoiceStatus('Listening... Speak now!');
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            console.log('Voice input:', transcript);
            handleVoiceCommand(transcript);
        };
        
        recognition.onerror = function(event) {
            console.error('Voice recognition error:', event.error);
            updateVoiceStatus('Sorry, I couldn\'t hear you clearly. Please try again.');
            stopVoiceDemo();
        };
        
        recognition.onend = function() {
            console.log('Voice recognition ended');
            stopVoiceDemo();
        };
    } else {
        console.log('Speech recognition not supported');
    }
}

function startVoiceDemo() {
    document.getElementById('voiceDemoModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openVoiceDemo() {
    startVoiceDemo();
}

function toggleVoiceDemo() {
    if (!isVoiceActive) {
        startVoiceListening();
    } else {
        stopVoiceDemo();
    }
}

function startVoiceListening() {
    if (recognition) {
        isVoiceActive = true;
        recognition.start();
        
        const voiceBtn = document.getElementById('voiceBtn');
        const voiceCircle = document.querySelector('.voice-circle');
        
        if (voiceBtn) {
            voiceBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Listening';
            voiceBtn.style.background = '#ef4444';
        }
        
        if (voiceCircle) {
            voiceCircle.style.animation = 'pulse 1s infinite';
        }
        
        // Add wave animation
        document.querySelectorAll('.wave').forEach(wave => {
            wave.style.display = 'block';
        });
    } else {
        showNotification('Voice recognition not supported in your browser', 'error');
    }
}

function stopVoiceDemo() {
    if (recognition && isVoiceActive) {
        recognition.stop();
    }
    
    isVoiceActive = false;
    
    const voiceBtn = document.getElementById('voiceBtn');
    const voiceCircle = document.querySelector('.voice-circle');
    
    if (voiceBtn) {
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Listening';
        voiceBtn.style.background = '#f59e0b';
    }
    
    if (voiceCircle) {
        voiceCircle.style.animation = 'none';
    }
    
    // Hide wave animation
    document.querySelectorAll('.wave').forEach(wave => {
        wave.style.display = 'none';
    });
    
    updateVoiceStatus('Click the microphone to start');
}

function updateVoiceStatus(message) {
    const statusElement = document.getElementById('voiceStatus');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

function handleVoiceCommand(transcript) {
    const command = transcript.toLowerCase();
    
    // Simulate AI processing
    updateVoiceStatus('Processing your request...');
    
    setTimeout(() => {
        if (command.includes('कaam') || command.includes('काम') || command.includes('work') || command.includes('job')) {
            updateVoiceStatus('Great! I found 5 job opportunities matching your skills. Here are embroidery and cooking jobs near you.');
            showVoiceResponse('job-search');
        } else if (command.includes('skill') || command.includes('assessment') || command.includes('कौशल')) {
            updateVoiceStatus('Perfect! Let\'s assess your skills. Please upload photos of your work or describe your abilities.');
            showVoiceResponse('skill-assessment');
        } else if (command.includes('food') || command.includes('खाना') || command.includes('order')) {
            updateVoiceStatus('Wonderful! I see you have cooking skills. Here are 3 food orders waiting for you in your area.');
            showVoiceResponse('food-orders');
        } else {
            updateVoiceStatus('I understand you said: "' + transcript + '". How can I help you with your career goals?');
            showVoiceResponse('general');
        }
    }, 1500);
}

function showVoiceResponse(type) {
    const responses = {
        'job-search': {
            title: 'Job Opportunities Found!',
            content: `
                <div class="voice-response">
                    <h3>🎯 5 Jobs Matching Your Skills</h3>
                    <div class="job-list">
                        <div class="job-item">
                            <strong>Fashion Designer Assistant</strong><br>
                            ₹18,000/month • Remote<br>
                            <small>85% skill match</small>
                        </div>
                        <div class="job-item">
                            <strong>Home Chef for Office</strong><br>
                            ₹800/day • Nearby<br>
                            <small>92% skill match</small>
                        </div>
                        <div class="job-item">
                            <strong>Embroidery Trainer</strong><br>
                            ₹1,000/class • Online<br>
                            <small>88% skill match</small>
                        </div>
                    </div>
                </div>
            `
        },
        'skill-assessment': {
            title: 'Skill Assessment Ready!',
            content: `
                <div class="voice-response">
                    <h3>📸 Upload Your Work Photos</h3>
                    <p>I can analyze your:</p>
                    <ul>
                        <li>Embroidery and stitching work</li>
                        <li>Cooking and food presentation</li>
                        <li>Craft and handmade items</li>
                        <li>Any other creative work</li>
                    </ul>
                    <button class="btn-primary">Upload Photos</button>
                </div>
            `
        },
        'food-orders': {
            title: 'Food Orders Available!',
            content: `
                <div class="voice-response">
                    <h3>🍳 3 Orders Waiting</h3>
                    <div class="order-list">
                        <div class="order-item">
                            <strong>Rajma Chawal (5 portions)</strong><br>
                            ₹750 • Delivery: Tomorrow 1 PM
                        </div>
                        <div class="order-item">
                            <strong>Homemade Cookies (2 dozen)</strong><br>
                            ₹400 • Delivery: Friday
                        </div>
                        <div class="order-item">
                            <strong>Tiffin Service (Weekly)</strong><br>
                            ₹2,100 • Starting Monday
                        </div>
                    </div>
                </div>
            `
        },
        'general': {
            title: 'How Can I Help?',
            content: `
                <div class="voice-response">
                    <h3>🤖 I'm here to help you succeed!</h3>
                    <p>Try saying:</p>
                    <ul>
                        <li>"मुझे काम चाहिए" (I need work)</li>
                        <li>"मेरा skill assessment करो" (Assess my skills)</li>
                        <li>"Food orders दिखाओ" (Show food orders)</li>
                        <li>"मेरा progress दिखाओ" (Show my progress)</li>
                    </ul>
                </div>
            `
        }
    };
    
    const response = responses[type] || responses['general'];
    
    // Create and show response modal
    setTimeout(() => {
        showNotification(response.title, 'success');
        // You could create a more detailed response modal here
    }, 500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .voice-response {
        text-align: left;
    }
    
    .job-list, .order-list {
        margin-top: 15px;
    }
    
    .job-item, .order-item {
        background: #f8fafc;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 10px;
        border-left: 4px solid #6366f1;
    }
    
    .job-item small, .order-item small {
        color: #10b981;
        font-weight: 600;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Utility functions
function openDashboard() {
    showNotification('Redirecting to your dashboard...', 'info');
    // Redirect to dashboard page
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function logout() {
    showNotification('Logging out...', 'info');
    setTimeout(() => {
        // Reset UI to logged out state
        const navButtons = document.querySelector('.nav-buttons');
        if (navButtons) {
            navButtons.innerHTML = `
                <button class="btn-secondary" onclick="openLoginModal()">Login</button>
                <button class="btn-primary" onclick="openSignupModal()">Join Now</button>
            `;
        }
        showNotification('Logged out successfully!', 'success');
    }, 1000);
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
});

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumber = !isNaN(parseInt(finalValue));
        
        if (isNumber) {
            const finalNum = parseInt(finalValue.replace(/[^\d]/g, ''));
            let currentNum = 0;
            const increment = finalNum / 50;
            const timer = setInterval(() => {
                currentNum += increment;
                if (currentNum >= finalNum) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentNum) + (finalValue.includes('M') ? 'M+' : finalValue.includes('K') ? 'K' : '');
                }
            }, 30);
        }
    });
}

// Add scroll animations for feature cards
const featureCards = document.querySelectorAll('.feature-card');
const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, { threshold: 0.3 });

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    cardObserver.observe(card);
});

// Add fadeInUp animation
const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent = `
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInUpStyle);
// Carousel functionality
let currentSlide = 0;
const totalSlides = 6;
let carouselInterval;

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
});

function initializeCarousel() {
    startCarouselAutoplay();
    
    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarouselAutoplay);
        carouselContainer.addEventListener('mouseleave', startCarouselAutoplay);
    }
    
    // Touch/swipe support for mobile
    const carousel = document.querySelector('.carousel-slider');
    if (carousel) {
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            previousSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.pagination-dot');
    
    if (track) {
        // Move the carousel track
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update active states
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Update pagination dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

function startCarouselAutoplay() {
    stopCarouselAutoplay(); // Clear any existing interval
    carouselInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function stopCarouselAutoplay() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - go to previous slide
            previousSlide();
        } else {
            // Swipe left - go to next slide
            nextSlide();
        }
    }
}

// Export functions for global access
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;
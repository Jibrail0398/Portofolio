// ========== SMOOTH SCROLLING & ACTIVE NAV LINK ========== 
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
    initializeNavigation();
    initializeContactForm();
    initializeAnimations();
    addStarsEffect();
    initializeThemeToggle();
});

// ========== SMOOTH SCROLL FUNCTION ========== 
function initializeSmoothScroll() {
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
}

// ========== NAVIGATION ACTIVE STATE ========== 
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ========== CONTACT FORM HANDLING ========== 
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value,
                subject: form.querySelectorAll('input[type="text"]')[1].value,
                message: form.querySelector('textarea').value
            };
            
            // Validasi
            if (!validateForm(formData)) {
                showNotification('Mohon isi semua field dengan benar', 'error');
                return;
            }
            
            // Simulasi pengiriman
            console.log('Form Data:', formData);
            showNotification('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.', 'success');
            
            // Reset form
            form.reset();
            
            // Bisa menambahkan integrasi email service di sini
            // sendEmailViaService(formData);
        });
    }
}

// ========== FORM VALIDATION ========== 
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name.trim() || data.name.trim().length < 3) {
        return false;
    }
    if (!emailRegex.test(data.email)) {
        return false;
    }
    if (!data.subject.trim() || data.subject.trim().length < 5) {
        return false;
    }
    if (!data.message.trim() || data.message.trim().length < 10) {
        return false;
    }
    
    return true;
}

// ========== NOTIFICATION SYSTEM ========== 
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '2000',
        animation: 'slideInNotification 0.3s ease',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    });
    
    // Set background color based on type
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'info': '#6366f1',
        'warning': '#f59e0b'
    };
    
    notification.style.backgroundColor = colors[type] || colors['info'];
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== ANIMATIONS ON SCROLL ========== 
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe project cards and service cards
    document.querySelectorAll('.project-card, .service-card, .stat-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// ========== STARS EFFECT ========== 
function addStarsEffect() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        // Create multiple stars
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.position = 'absolute';
            star.style.width = Math.random() * 2 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.background = 'white';
            star.style.borderRadius = '50%';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.opacity = Math.random() * 0.5 + 0.3;
            
            // Random animation duration
            const duration = Math.random() * 3 + 2;
            star.style.animation = `twinkle ${duration}s ease-in-out infinite`;
            
            heroSection.style.position = 'relative';
            heroSection.appendChild(star);
        }
    }
}

// ========== SCROLL PROGRESS BAR ========== 
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 60px;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
        width: 0;
        z-index: 999;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// ========== HAMBURGER MENU (untuk responsive) ========== 
function initializeResponsiveMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Jika navbar sudah ada
    if (navbar && window.innerWidth <= 768) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        `;
        
        navbar.querySelector('.container').appendChild(hamburger);
    }
}

// ========== SKILLS ANIMATION ========== 
function initializeSkillsAnimation() {
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.parentElement.parentElement.querySelector('.skill-percentage').textContent;
                    bar.style.animation = `fillProgress 1.5s ease forwards`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ========== ADD ACTIVE STYLE TO NAV LINK ========== 
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #6366f1;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    @keyframes slideInNotification {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutNotification {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);

// ========== INIT SCROLL PROGRESS ========== 
initializeScrollProgress();
initializeSkillsAnimation();

// ========== DEMO FEATURES ========== 
console.log('🚀 Website Muhammad Jibrail Natadilaga');
console.log('📧 Email: jibrail.natadilaga@email.com');
console.log('💻 Teknologi: JavaScript, Python, React, Node.js, Django, dan banyak lagi!');
console.log('✨ Terima kasih telah mengunjungi portfolio saya!');

// ========== MOUSE TRACKING EFFECT (Optional) ========== 
function initializeMouseTracking() {
    const codeBox = document.querySelector('.code-box');
    
    if (codeBox) {
        document.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            codeBox.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
            codeBox.style.transition = 'none';
        });
        
        document.addEventListener('mouseleave', function() {
            codeBox.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            codeBox.style.transition = 'transform 0.3s ease';
        });
    }
}

initializeMouseTracking();

// ========== PAGE LOAD ANIMATION ========== 
window.addEventListener('load', function() {
    // Trigger animations when page fully loads
    document.body.style.opacity = '1';
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
});

// ========== COUNTER ANIMATION ========== 
function initializeCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const targetNumber = parseInt(entry.target.textContent.replace(/[^\d]/g, ''));
                const suffix = entry.target.textContent.replace(/\d/g, '');
                animateCounter(entry.target, targetNumber, suffix);
                entry.target.dataset.animated = 'true';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => observer.observe(number));
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// Initialize counter animation
initializeCounterAnimation();

// ========== THEME TOGGLE ========== 
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        const isLightMode = document.body.classList.contains('light-mode');
        
        // Update icon
        if (isLightMode) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
        
        // Show notification
        const message = isLightMode ? 'Light Mode Aktif' : 'Dark Mode Aktif';
        showNotification(message, 'info');
    });
}

// ========== DARK MODE TOGGLE (Optional Feature) ========== 
function initializeDarkModeToggle() {
    // Check if user prefers light mode
    if (localStorage.getItem('theme') === 'light') {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    }
}

// Uncomment if you want to add dark mode toggle
// initializeDarkModeToggle();

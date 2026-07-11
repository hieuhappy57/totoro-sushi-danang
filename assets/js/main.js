/**
 * Totoro Sushi & Grill - Main Javascript (main.js)
 * Handles navigation, responsiveness, scroll reveal, and common interactions.
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Sticky Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Responsive Mobile Navigation Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // 3. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = function() {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 120; // Visibility offset

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 4. FAQ Accordion Trigger
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isOpen = item.classList.contains('open');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            
            // Toggle clicked item
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // 5. Active Nav Link Highlighter
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Initialize cart count badge on page load
    updateCartBadge();
});

// Helper: Show custom alert popup toast
function showAlert(message, type = 'success') {
    // Check if element exists, otherwise create
    let popup = document.getElementById('global-alert-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'global-alert-popup';
        popup.className = 'alert-popup';
        document.body.appendChild(popup);
    }
    
    popup.innerHTML = `<span>${type === 'success' ? '🍣' : '⚠️'}</span> ${message}`;
    popup.className = `alert-popup show ${type === 'error' ? 'error' : ''}`;
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 4000);
}

// Helper: Update cart count badge
function updateCartBadge() {
    const badge = document.getElementById('cart-badge-count');
    if (!badge) return;
    
    try {
        const cart = JSON.parse(localStorage.getItem('totoro_cart')) || [];
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        badge.textContent = totalQty;
        badge.style.display = totalQty > 0 ? 'flex' : 'none';
        
        // Also update mobile navigation badge count if exists
        const mobileBadge = document.getElementById('mobile-cart-badge-count');
        if (mobileBadge) {
            mobileBadge.textContent = totalQty;
            mobileBadge.style.display = totalQty > 0 ? 'flex' : 'none';
        }
    } catch (e) {
        console.error("Lỗi đọc giỏ hàng: ", e);
    }
}

// ===================================
// NIKE REDESIGN - INTERACTIVE FEATURES
// ===================================

// ----- NAVIGATION SCROLL EFFECT -----
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolling down
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ----- SMOOTH SCROLL FOR NAVIGATION LINKS -----
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

// ----- SHOPPING CART FUNCTIONALITY -----
let cart = [];
let cartCount = 0;

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartBtn = document.getElementById('cart-btn');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Add item to cart
        cartCount++;
        
        // Visual feedback
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = 'linear-gradient(135deg, #00ff88 0%, #00b4d8 100%)';
        
        // Show notification
        showNotification('Added to cart!');
        
        // Update cart badge
        updateCartBadge();
        
        // Reset button after animation
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-plus"></i>';
        }, 2000);
    });
});

function updateCartBadge() {
    // Remove existing badge if any
    const existingBadge = cartBtn.querySelector('.cart-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Add new badge if cart has items
    if (cartCount > 0) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = cartCount;
        badge.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: linear-gradient(135deg, #ff006e 0%, #7b2cbf 100%);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 700;
            animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        cartBtn.style.position = 'relative';
        cartBtn.appendChild(badge);
    }
}

// ----- NOTIFICATION SYSTEM -----
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.9) 0%, rgba(0, 180, 216, 0.9) 100%);
        color: #0a0a0f;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(20px);
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
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
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            @keyframes popIn {
                0% {
                    transform: scale(0);
                }
                50% {
                    transform: scale(1.2);
                }
                100% {
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ----- PRODUCT CARD INTERACTIONS -----
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('click', function() {
        const productName = this.querySelector('h3').textContent;
        console.log(`Viewing product: ${productName}`);
        // In a real application, this would navigate to the product detail page
    });
});

// ----- COLLECTION BACKGROUND GRADIENTS -----
const collections = [
    {
        id: 'collection-1',
        gradient: 'linear-gradient(135deg, rgba(255, 0, 110, 0.4) 0%, rgba(123, 44, 191, 0.6) 100%)'
    },
    {
        id: 'collection-2',
        gradient: 'linear-gradient(135deg, rgba(0, 255, 136, 0.4) 0%, rgba(0, 180, 216, 0.6) 100%)'
    },
    {
        id: 'collection-3',
        gradient: 'linear-gradient(135deg, rgba(255, 190, 11, 0.4) 0%, rgba(255, 0, 110, 0.6) 100%)'
    },
    {
        id: 'collection-4',
        gradient: 'linear-gradient(135deg, rgba(123, 44, 191, 0.4) 0%, rgba(0, 180, 216, 0.6) 100%)'
    }
];

collections.forEach(collection => {
    const element = document.getElementById(collection.id);
    if (element) {
        const bg = element.querySelector('.collection-bg');
        bg.style.background = collection.gradient;
    }
});

// ----- PARALLAX EFFECT ON SCROLL -----
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px) rotate(-5deg)`;
    }
});

// ----- SEARCH FUNCTIONALITY -----
const searchBtn = document.getElementById('search-btn');
let searchOpen = false;

searchBtn.addEventListener('click', () => {
    if (!searchOpen) {
        createSearchBar();
        searchOpen = true;
    } else {
        removeSearchBar();
        searchOpen = false;
    }
});

function createSearchBar() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(10, 10, 15, 0.95);
        backdrop-filter: blur(20px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for products...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 90%;
        max-width: 600px;
        padding: 1.5rem 2rem;
        font-size: 1.5rem;
        background: rgba(26, 26, 46, 0.6);
        border: 2px solid rgba(0, 255, 136, 0.3);
        border-radius: 24px;
        color: white;
        outline: none;
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(20px);
        transition: all 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = 'rgba(0, 255, 136, 1)';
        searchInput.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.3)';
    });
    
    searchContainer.appendChild(searchInput);
    
    // Close on click outside
    searchContainer.addEventListener('click', (e) => {
        if (e.target === searchContainer) {
            removeSearchBar();
            searchOpen = false;
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            removeSearchBar();
            searchOpen = false;
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    document.body.appendChild(searchContainer);
    searchInput.focus();
}

function removeSearchBar() {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            searchContainer.remove();
        }, 300);
    }
}

// Add fade animations
if (!document.querySelector('#fade-styles')) {
    const style = document.createElement('style');
    style.id = 'fade-styles';
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ----- USER BUTTON INTERACTION -----
const userBtn = document.getElementById('user-btn');

userBtn.addEventListener('click', () => {
    showNotification('User profile coming soon!');
});

// ----- CART BUTTON INTERACTION -----
cartBtn.addEventListener('click', () => {
    if (cartCount > 0) {
        showNotification(`You have ${cartCount} item(s) in your cart`);
    } else {
        showNotification('Your cart is empty');
    }
});

// ----- INTERSECTION OBSERVER FOR ANIMATIONS -----
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards and collection cards
document.querySelectorAll('.product-card, .collection-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// ----- CONSOLE WELCOME MESSAGE -----
console.log('%cNIKE REDESIGN', 'font-size: 2rem; font-weight: bold; background: linear-gradient(135deg, #00ff88 0%, #00b4d8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cJust Do It ✓', 'font-size: 1rem; color: #00ff88;');
console.log('Website by Antigravity AI');

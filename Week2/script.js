// Product data
const products = [
    {
        id: 1,
        name: "Fresh Apples",
        category: "fruits",
        price: 2.99,
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Organic Bananas",
        category: "fruits",
        price: 1.49,
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Sweet Oranges",
        category: "fruits",
        price: 3.49,
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Juicy Strawberries",
        category: "fruits",
        price: 4.99,
        image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Fresh Carrots",
        category: "vegetables",
        price: 1.99,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Crisp Broccoli",
        category: "vegetables",
        price: 2.49,
        image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Organic Spinach",
        category: "vegetables",
        price: 3.29,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Fresh Tomatoes",
        category: "vegetables",
        price: 2.79,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');
const cartCount = document.querySelector('.cart-count');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const ctaButtons = document.querySelectorAll('.cta-button');

// Cart state
let cart = [];

// Initialize the page
function init() {
    displayProducts(products);
    setupEventListeners();
    addScrollAnimations();
    setupNavigation();
    setupBackgroundSearch();
    setupMobileNavigation();
}

// Setup navigation
function setupNavigation() {
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Navigation Toggle
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Background search functionality
function setupBackgroundSearch() {
    const heroSearchInput = document.getElementById('hero-search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchCircles = document.querySelectorAll('.search-circle');

    // Hero search functionality
    if (heroSearchInput) {
        heroSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            animateSearchCircles(searchTerm);
        });

        // Search button click
        searchBtn.addEventListener('click', function() {
            performHeroSearch();
        });

        // Enter key for search
        heroSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performHeroSearch();
            }
        });
    }

    // Animate search circles on hover
    if (searchCircles.length > 0) {
        searchCircles.forEach(circle => {
            circle.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.3) rotate(15deg)';
                this.style.background = 'rgba(255, 255, 255, 0.2)';
            });

            circle.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.background = '';
            });
        });
    }
}

function performHeroSearch() {
    const heroSearchInput = document.getElementById('hero-search-input');
    if (!heroSearchInput) return;
    
    const searchTerm = heroSearchInput.value.toLowerCase().trim();
    
    if (searchTerm) {
        // Scroll to products section
        document.querySelector('#products').scrollIntoView({
            behavior: 'smooth'
        });

        // Set the search term in products search
        setTimeout(() => {
            const productsSearchInput = document.getElementById('search-input');
            productsSearchInput.value = searchTerm;
            productsSearchInput.focus();
            
            // Trigger search
            const event = new Event('input', { bubbles: true });
            productsSearchInput.dispatchEvent(event);
            
            // Add search feedback animation
            showSearchFeedback(searchTerm);
        }, 800);
    }
}

function animateSearchCircles(searchTerm) {
    const searchCircles = document.querySelectorAll('.search-circle');
    
    searchCircles.forEach((circle, index) => {
        if (searchTerm.length > 0) {
            // Pulse animation when typing
            circle.style.animation = 'pulseSearch 0.5s ease-in-out';
            setTimeout(() => {
                circle.style.animation = '';
            }, 500);
            
            // Change color based on search length
            const intensity = Math.min(searchTerm.length / 10, 1);
            circle.style.background = `rgba(255, 255, 255, ${0.1 + intensity * 0.2})`;
        } else {
            circle.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });
}

function showSearchFeedback(searchTerm) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = 'search-feedback';
    feedback.innerHTML = `
        <i class="fas fa-search"></i>
        <span>Searching for: "${searchTerm}"</span>
    `;
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        animation: slideInDown 0.5s ease-out;
    `;

    document.body.appendChild(feedback);

    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOutUp 0.5s ease-in';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 500);
    }, 3000);
}

// Display products in the grid
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    productsToDisplay.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Add event listeners to the add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Filter products based on search, category, and price
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    const maxPrice = parseFloat(priceSlider.value);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    displayProducts(filteredProducts);
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    
    // Show feedback
    const button = e.target.closest('.add-to-cart');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.background = 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)';
    
    // Add bounce animation
    button.style.animation = 'bounceIn 0.6s ease';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.style.animation = '';
    }, 1500);
}

// Update cart count in the navbar
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add bounce animation to cart icon
    cartCount.style.animation = 'bounceIn 0.6s ease';
    setTimeout(() => {
        cartCount.style.animation = '';
    }, 600);
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.product-card, .section-title, .filters, .feature, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Set up event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', filterProducts);
    categorySelect.addEventListener('change', filterProducts);
    priceSlider.addEventListener('input', () => {
        priceValue.textContent = priceSlider.value;
        filterProducts();
    });
    
    // CTA button click events
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent.includes('Shop Now')) {
                // Scroll to products section
                document.querySelector('#products').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (e.target.textContent.includes('Learn More')) {
                // Scroll to about section
                document.querySelector('#about').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        const newsletterInput = newsletterForm.querySelector('input');
        const newsletterButton = newsletterForm.querySelector('button');
        
        newsletterButton.addEventListener('click', () => {
            if (newsletterInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterInput.value = '';
            }
        });
    }
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            filterProducts();
        }
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
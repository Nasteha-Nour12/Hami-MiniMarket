<<<<<<< HEAD
// Product data with real product images - 16 products total
const products = [
    { 
        id: 1, 
        name: "Fresh Red Apples", 
        price: 2.99, 
        image: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-1000x1000.jpg" 
    },
    { 
        id: 2, 
        name: "Organic Bananas", 
        price: 1.49, 
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 3, 
        name: "Fresh Mango", 
        price: 3.49, 
        image: "https://www.halegroves.com/images/xl/HG24-FloridaMango.webp?v=1" 
    },
    { 
        id: 4, 
        name: "Farm Fresh Eggs", 
        price: 4.99, 
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 5, 
        name: "Fresh Tomatoes", 
        price: 3.49, 
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 6, 
        name: "Fresh Onions", 
        price: 2.29, 
        image: "https://5.imimg.com/data5/AJ/DM/MY-3966004/fresh-onions-1000x1000.jpg" 
    },
    { 
        id: 7, 
        name: "Fresh Avocados", 
        price: 3.99, 
        image: "https://www.healthyfood.com/wp-content/uploads/2017/03/In_season_December_Avocados-500x333.jpg" 
    },
    { 
        id: 8, 
        name: "Fresh Spinach", 
        price: 2.49, 
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 9, 
        name: "Sweet Strawberries", 
        price: 4.99, 
        image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 10, 
        name: "Organic Carrots", 
        price: 2.49, 
        image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 11, 
        name: "Fresh Lemons", 
        price: 3.99, 
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 12, 
        name: "Green Grapes", 
        price: 5.49, 
        image: "https://www.tastingtable.com/img/gallery/17-different-types-of-grapes-explained/what-is-a-grape-and-where-are-they-grown-1648831512.webp" 
    },
    { 
        id: 13, 
        name: "Fresh Milk", 
        price: 2.79, 
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 14, 
        name: "Orange Juice", 
        price: 3.29, 
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 15, 
        name: "Fresh Watermelon", 
        price: 6.99, 
        image: "https://assets.digitalcontent.marksandspencer.app/image/upload/w_768,q_auto,c_fill,f_auto/59277c94ff24c5c7c7f4f440dd4ae596.jpg" 
    },
    { 
        id: 16, 
        name: "Fresh Salad Mix", 
        price: 4.49, 
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    }
];

// Cart functionality
class CartManager {
    constructor() {
        this.cart = [];
        this.taxRate = 0.05; // 5% tax
    }
    
    init() {
        this.loadCart();
        this.updateCartUI();
    }
    
    loadCart() {
        try {
            const savedCart = localStorage.getItem('hami_minimarket_cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
                console.log('Cart loaded from localStorage:', this.cart);
            } else {
                console.log('No cart found in localStorage, starting with empty cart');
                this.cart = [];
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            this.cart = [];
        }
    }
    
    saveCart() {
        try {
            localStorage.setItem('hami_minimarket_cart', JSON.stringify(this.cart));
            console.log('Cart saved to localStorage:', this.cart);
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }
    
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showToast(`${product.name} added to cart!`);
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }
    
    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartUI();
        }
    }
    
    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    calculateTotals() {
        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax;
        
        // Apply discount if total > $50
        let discount = 0;
        if (total > 50) {
            discount = total * 0.1; // 10% discount
        }
        
        const finalTotal = total - discount;
        
        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            discount: discount.toFixed(2),
            total: finalTotal.toFixed(2)
        };
    }
    
    updateCartUI() {
        // Update cart count
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = this.getCartCount();
        }
        
        // Update cart items
        const cartItems = document.getElementById('cartItems');
        const cartTotals = document.getElementById('cartTotals');
        
        if (!cartItems || !cartTotals) return;
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            cartTotals.innerHTML = '';
            return;
        }
        
        // Render cart items
        cartItems.innerHTML = '';
        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to cart controls
        cartItems.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;
            
            const productId = parseInt(button.getAttribute('data-id'));
            
            if (button.classList.contains('decrease')) {
                const item = this.cart.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity - 1);
                }
            } else if (button.classList.contains('increase')) {
                const item = this.cart.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity + 1);
                }
            } else if (button.classList.contains('remove-item')) {
                this.removeFromCart(productId);
            }
        });
        
        // Add event listeners to quantity inputs
        cartItems.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const newQuantity = parseInt(e.target.value);
                this.updateQuantity(productId, newQuantity);
            }
        });
        
        // Update totals
        const totals = this.calculateTotals();
        cartTotals.innerHTML = `
            <div class="total-line">
                <span>Subtotal:</span>
                <span>$${totals.subtotal}</span>
            </div>
            <div class="total-line">
                <span>Tax (5%):</span>
                <span>$${totals.tax}</span>
            </div>
            ${totals.discount > 0 ? `
            <div class="total-line">
                <span>Discount (10%):</span>
                <span>-$${totals.discount}</span>
            </div>
            ` : ''}
            <div class="total-line total-final">
                <span>Total:</span>
                <span>$${totals.total}</span>
            </div>
        `;
    }
    
    openCart() {
        document.getElementById('cartSidebar').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    }
    
    closeCart() {
        document.getElementById('cartSidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Checkout function
    checkout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty. Add some products before checkout.');
            return;
        }
        
        // Calculate totals
        const totals = this.calculateTotals();
        
        // Save order data to localStorage
        const orderData = {
            items: [...this.cart],
            subtotal: totals.subtotal,
            tax: totals.tax,
            total: totals.total,
            discount: totals.discount,
            orderNumber: 'HM-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('hami_order_data', JSON.stringify(orderData));
        
        // Clear the cart
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        this.closeCart();
        
        // Redirect to confirmation page
        window.location.href = 'order-confirmation.html';
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const cartManager = new CartManager();
    
    // Render products
    const productsGrid = document.getElementById('productsGrid');
    
    if (productsGrid) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to "Add to Cart" buttons
        productsGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                cartManager.addToCart(product);
            }
        });
    }
    
    // Initialize cart manager
    cartManager.init();
    
    // Set up event listeners
    const cartIcon = document.getElementById('cartIcon');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartManager.openCart();
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartManager.closeCart();
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            cartManager.closeCart();
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            cartManager.checkout();
        });
    }
});
=======
// ==== IMAGE SLIDER (HERO BACKGROUND) ====
const hero = document.querySelector(".hero");

const images = [
  "https://www.dreamstime.com/lettuce-orange-slices-being-washed-water-creating-refreshing-splash-bright-kitchen-enhances-vibrant-colors-image376120827",
  "https://img.freepik.com/free-photo/fresh-vegetables-table_144627-18449.jpg",
  
  "https://img.freepik.com/free-photo/assorted-fresh-vegetables-wooden-table_114579-7620.jpg"
];

let current = 0;

function changeBackground() {
  hero.style.backgroundImage = `url(${images[current]})`;
  current = (current + 1) % images.length;
}

setInterval(changeBackground, 5000);
changeBackground();

// ==== CONTACT FORM VALIDATION ====
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before submitting!");
    return;
  }

  alert(`Thank you ${name}! Your message has been sent successfully.`);
  form.reset();
});
>>>>>>> 1681405978c24bd0afc24a75b609daaecaff6716

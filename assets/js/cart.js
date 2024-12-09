// Initialize variables
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Get DOM elements
const cartModal = document.getElementById('cartModal');
const cartBtn = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cartItems');
const checkoutBtn = document.getElementById('checkoutBtn');

// Cart display functions
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = `Cart (${cartCount})`;
    localStorage.setItem('cartCount', cartCount);
}

function displayCartItems() {
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50">
            <span>${item.name}</span>
            <span>${item.price}</span>
            <button onclick="removeItem(${index})">Remove</button>
        </div>
    `).join('');
    updateCartTotal();
}

function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + price;
    }, 0);
    document.getElementById('cartTotal').textContent = `Total: $${total.toFixed(2)}`;
}

function removeItem(index) {
    cartItems.splice(index, 1);
    cartCount--;
    updateCartCount();
    saveCartItems();
    displayCartItems();
}

function saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = {
                name: productCard.querySelector('.product-title').textContent,
                price: productCard.querySelector('.product-price').textContent,
                image: productCard.querySelector('img').src
            };
            cartItems.push(product);
            cartCount++;
            updateCartCount();
            saveCartItems();
        });
    });

    // Cart modal controls
    cartBtn.addEventListener('click', () => {
        displayCartItems();
        cartModal.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Checkout functionality
    checkoutBtn.addEventListener('click', () => {
        window.location.href = 'https://www.facebook.com/JRASOXS/';
    });
});

function resetCart() {
    cartItems = [];
    cartCount = 0;
    updateCartCount();
    saveCartItems();
    displayCartItems();
}
document.getElementById('resetCartBtn').addEventListener('click', () => {
    resetCart();
});
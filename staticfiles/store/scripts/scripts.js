document.getElementById('help-button').addEventListener('click', () => {
    alert("How can we help you?");
});

document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            document.getElementById("cart-count").textContent = cartCount;
            alert("Product added to cart!");
        });
    });
});

document.getElementById("review-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let rating = document.getElementById("rating").value;
    let result = rating >= 4 ? "This product is highly rated!" : "This product has mixed reviews.";
    document.getElementById("review-result").textContent = result;
});
// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        const productId = product.dataset.id;
        const quantity = parseInt(product.querySelector('input').value);
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: product.dataset.name,
                price: parseFloat(product.dataset.price),
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });
});

// Initialize cart count
updateCartCount();
// Cart page functionality
function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        </div>
    `).join('');

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            cart.splice(e.target.dataset.index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartCount();
        });
    });
}

// Initialize cart display
displayCartItems();
// Review System
document.querySelectorAll('.submit-review').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product');
        const rating = product.querySelector('.rating-select').value;
        const reviewsContainer = product.querySelector('.reviews');
        
        const review = document.createElement('div');
        review.className = 'review';
        review.innerHTML = `
            <span class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
        `;
        
        reviewsContainer.appendChild(review);
        updateProductRating(product);
    });
});

function updateProductRating(product) {
    const reviews = product.querySelectorAll('.review');
    const avgRating = Array.from(reviews).reduce((sum, review) => {
        return sum + (review.querySelector('.rating').textContent.match(/★/g) || []).length;
    }, 0) / reviews.length || 0;
    
    product.querySelector('.rating-display')?.remove();
    const ratingDisplay = document.createElement('div');
    ratingDisplay.className = 'rating-display';
    ratingDisplay.innerHTML = `
        Average Rating: ${avgRating.toFixed(1)}/5
        ${avgRating >= 4 ? '<span class="recommended">✓ Recommended</span>' : ''}
    `;
    product.querySelector('.rating').appendChild(ratingDisplay);
}

// Sorting functionality
document.getElementById('sort-price').addEventListener('click', () => {
    const products = Array.from(document.querySelectorAll('.product'));
    products.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    document.querySelector('.product-list').append(...products);
});

document.getElementById('sort-rating').addEventListener('click', () => {
    const products = Array.from(document.querySelectorAll('.product'));
    products.sort((a, b) => {
        const aReviews = a.querySelectorAll('.review').length;
        const bReviews = b.querySelectorAll('.review').length;
        return bReviews - aReviews;
    });
    document.querySelector('.product-list').append(...products);
});

// Load cart items from localStorage
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
});

// Function to display cart items
function displayCartItems() {
    const cartContainer = document.getElementById("cart-container");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.innerHTML = "<strong>Total: $0</strong>";
        checkoutButton.disabled = true;
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: 
                <input type="number" class="cart-quantity" data-index="${index}" value="${item.quantity}" min="1">
            </p>
            <p><strong>Subtotal: $${itemTotal.toFixed(2)}</strong></p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    totalPriceElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    checkoutButton.disabled = false;

    // Event listeners for quantity updates
    document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("change", (event) => {
            updateQuantity(event.target.dataset.index, event.target.value);
        });
    });

    // Event listeners for removing items
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (event) => {
            removeItem(event.target.dataset.index);
        });
    });
}

// Function to update item quantity in the cart
function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    newQuantity = parseInt(newQuantity);

    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
    } else {
        cart.splice(index, 1); // Remove item if quantity is 0
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Function to remove an item from the cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
}

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalCount;
}

// Initialize cart count
updateCartCount();

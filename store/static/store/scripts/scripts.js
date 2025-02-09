document.getElementById('help-button').addEventListener('click', () => {
    alert("How can we help you?");
});

// Load cart items from localStorage
document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
});

// Cart management using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

// Handle "Add to Cart" button (API + localStorage)
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", async (e) => {
        const product = e.target.closest(".product");
        const productId = product.dataset.id;
        const quantity = parseInt(product.querySelector("input").value);

        // ✅ Send update to backend (API)
        const response = await fetch("/api/cart/add/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId, quantity: quantity }),
        });

        const result = await response.json();
        alert(result.message);

        // ✅ Update localStorage (for instant UI update)
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: productId, name: product.dataset.name, price: parseFloat(product.dataset.price), quantity: quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });
});

// Cart page functionality
function displayCartItems() {
    const cartContainer = document.getElementById("cart-container");
    if (!cartContainer) return;

    cartContainer.innerHTML = ""; // Clear existing items
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("total-price").innerHTML = "<strong>Total: $0</strong>";
        document.getElementById("checkout").disabled = true;
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

    document.getElementById("total-price").innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    document.getElementById("checkout").disabled = false;

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

// Function to update cart quantity
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

// Initialize cart count
updateCartCount();

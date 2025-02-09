document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
});

// ✅ Fetch cart data from API on page load
async function displayCartItems() {
    const cartContainer = document.getElementById("cart-container");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");

    try {
        const response = await fetch("/api/cart/");
        const cart = await response.json();

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceElement.innerHTML = "<strong>Total: $0</strong>";
            checkoutButton.disabled = true;
            return;
        }

        let totalPrice = 0;
        cartContainer.innerHTML = ""; // Clear existing items

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: 
                    <input type="number" class="cart-quantity" data-id="${item.id}" value="${item.quantity}" min="1">
                </p>
                <p><strong>Subtotal: $${itemTotal.toFixed(2)}</strong></p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        totalPriceElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
        checkoutButton.disabled = false;

        // ✅ Attach event listeners for updating quantity
        document.querySelectorAll(".cart-quantity").forEach(input => {
            input.addEventListener("change", (event) => {
                updateCartQuantity(event.target.dataset.id, event.target.value);
            });
        });

        // ✅ Attach event listeners for removing items
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                removeCartItem(event.target.dataset.id);
            });
        });

    } catch (error) {
        console.error("Error loading cart:", error);
    }
}

// ✅ Function to update cart quantity (Backend + UI)
async function updateCartQuantity(productId, quantity) {
    if (quantity < 1) return;  // Prevent negative values

    try {
        const response = await fetch(`/api/cart/update/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId, quantity: quantity }),
        });

        const result = await response.json();
        displayCartItems();  // Refresh UI
    } catch (error) {
        console.error("Error updating cart quantity:", error);
    }
}

// ✅ Function to remove item from cart
async function removeCartItem(productId) {
    try {
        const response = await fetch(`/api/cart/remove/${productId}/`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        displayCartItems();  // Refresh UI
    } catch (error) {
        console.error("Error removing item:", error);
    }
}

// ✅ Handle Checkout Button
document.getElementById("checkout").addEventListener("click", () => {
    alert("Redirecting to payment...");
    window.location.href = "/checkout/";
});

// ✅ Function to update cart count dynamically
async function updateCartCount() {
    try {
        const response = await fetch("/api/cart/count/");
        const data = await response.json();
        document.querySelectorAll("#cart-count").forEach(el => el.textContent = data.count);
    } catch (error) {
        console.error("Error updating cart count:", error);
    }
}
updateCartCount(); // Run on load

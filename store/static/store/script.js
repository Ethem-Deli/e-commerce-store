document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", async (e) => {
        const productId = e.target.dataset.id;
        const quantity = e.target.closest(".product").querySelector("input").value;

        const response = await fetch("/api/cart/add/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId, quantity: quantity }),
        });


        const result = await response.json();
        alert(result.message);
    });
});

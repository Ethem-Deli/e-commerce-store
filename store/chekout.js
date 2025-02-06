document.getElementById("checkout").addEventListener("click", async () => {
    const response = await fetch("/payments/create-checkout-session/", { method: "POST" });
    const data = await response.json();
    if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
    } else {
        alert("Error processing payment.");
    }
});

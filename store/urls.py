from django.urls import path
from .views import ProductListView, index, products, cart, add_to_cart, review, get_cart_items, update_cart

urlpatterns = [
    path("", index, name="index"),
    path("products/", ProductListView.as_view(), name="product-list"),  # API View
    path("store/products/", products, name="products"),
    path("cart/", cart, name="cart"),
    path("cart/add/<int:product_id>/", add_to_cart, name="add-to-cart"),  # Requires product ID
    path("review/", review, name="review"),
    path("api/cart/", get_cart_items, name="cart-items"),
    path("api/cart/update/", update_cart, name="cart-update"),
]

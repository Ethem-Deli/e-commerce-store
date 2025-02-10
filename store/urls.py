from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    ProductListView, index, products, cart, add_to_cart, review, 
    get_cart_items, update_cart, cart_count
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", index, name="index"),
    path("store/products/", products, name="products"),  # ✅ Fixed: Now correctly loads `products.html`
    path("cart/", cart, name="cart"),
    path("cart/add/<int:product_id>/", add_to_cart, name="add-to-cart"),
    path("review/", review, name="review"),
    
    # API Endpoints
    path("api/products/", ProductListView.as_view(), name="api-product-list"),
    path("api/cart/", get_cart_items, name="cart-items"),
    path("api/cart/update/", update_cart, name="cart-update"),
    path("api/cart/count/", cart_count, name="cart_count"),
]

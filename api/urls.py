from django.urls import path
from .views import ProductListView, add_to_cart

urlpatterns = [
    path("products/", ProductListView.as_view(), name="product-list"),
    path("cart/add/", add_to_cart, name="add-to-cart"),
]

from django.shortcuts import render, redirect
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from .models import Product, CartItem
from .serializers import ProductSerializer
from django.http import JsonResponse

# API: List all products (used by Django REST Framework)
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    renderer_classes = [JSONRenderer]  

# View: Home page
def index(request):
    return render(request, 'store/index.html')

# View: Show all products (uses template)
def products(request):
    products = Product.objects.all()
    return render(request, 'store/products.html', {'products': products})

# View: Shopping cart page
def cart(request):
    return render(request, 'store/cart.html')

# View: Add product to cart (Session-based)
def add_to_cart(request, product_id):
    cart = request.session.get('cart', {})
    cart[product_id] = cart.get(product_id, 0) + 1  # Increase quantity
    request.session['cart'] = cart  # Save to session
    return redirect('cart')

# View: Handle product reviews
def review(request):
    if request.method == "POST":
        rating = request.POST.get("rating")
        comment = request.POST.get("comment")
        return render(request, 'store/review.html', {"rating": rating, "comment": comment})
    return render(request, 'store/review.html')

# ✅ API: Return Cart Items for JavaScript
def get_cart_items(request):
    cart_items = CartItem.objects.all()
    cart_data = [
        {
            "id": item.id,
            "name": item.product.name,
            "price": item.product.price,
            "quantity": item.quantity
        }
        for item in cart_items
    ]
    return JsonResponse(cart_data, safe=False)

# ✅ API: Update Cart Quantity
def update_cart(request):
    if request.method == "POST":
        import json
        data = json.loads(request.body)
        product_id = data.get("product_id")
        quantity = data.get("quantity")

        try:
            cart_item = CartItem.objects.get(product_id=product_id)
            cart_item.quantity = quantity
            cart_item.save()
            return JsonResponse({"message": "Cart updated successfully"})
        except CartItem.DoesNotExist:
            return JsonResponse({"error": "Product not found in cart"}, status=404)

    return JsonResponse({"error": "Invalid request"}, status=400)
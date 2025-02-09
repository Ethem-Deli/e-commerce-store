from django.shortcuts import render, redirect
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from django.http import JsonResponse
from .models import Product, CartItem
from .serializers import ProductSerializer

# ✅ API: List all products (returns JSON)
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    renderer_classes = [JSONRenderer]

    def get_serializer_context(self):
        return {'request': self.request}  # Fix image URL issue

# ✅ View: Home page
def index(request):
    return render(request, 'store/index.html')

# ✅ View: Render products.html
def products(request):
    product_list = Product.objects.all()

    # Ensure image URLs are correct
    for product in product_list:
        if product.image:
            product.image_url = product.image.url  # Use correct image URL
    
    return render(request, 'store/products.html', {'products': product_list})

# ✅ View: Shopping cart
def cart(request):
    return render(request, 'store/cart.html')

# ✅ View: Add product to cart (Session-based)
def add_to_cart(request, product_id):
    cart = request.session.get('cart', {})
    cart[product_id] = cart.get(product_id, 0) + 1
    request.session['cart'] = cart
    return redirect('cart')

# ✅ View: Handle product reviews
def review(request):
    if request.method == "POST":
        rating = request.POST.get("rating")
        comment = request.POST.get("comment")
        return render(request, 'store/review.html', {"rating": rating, "comment": comment})
    return render(request, 'store/review.html')

# ✅ API: Return Cart Items
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

# ✅ API: Get cart count
def cart_count(request):
    return JsonResponse({"count": 0})

from django.shortcuts import render
from .models import Product  # Ensure Product model exists

def index(request):
    return render(request, 'store/index.html')

def products(request):
    products = Product.objects.all()  # Fetch products from the database
    return render(request, 'store/products.html', {'products': products})

def cart(request):
    return render(request, 'store/cart.html')

def review(request):
    return render(request, 'store/review.html')

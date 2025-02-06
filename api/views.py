from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@csrf_exempt
def add_to_cart(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            product_id = data.get("product_id")
            quantity = data.get("quantity", 1)

            if not product_id:
                return JsonResponse({"error": "Product ID is required"}, status=400)

            return JsonResponse({"message": f"Product {product_id} added to cart!", "quantity": quantity})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

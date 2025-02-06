import stripe
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(["POST"])
def create_checkout_session(request):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
    "price_data": {
        "currency": "usd",
        "product_data": {
            "name": "E-commerce Purchase"
        },
        "unit_amount": 5000  # Amount in cents ($50)
    },
    "quantity": 1
}],

            mode="payment",
            success_url="https://yourdomain.com/success",
            cancel_url="https://yourdomain.com/cancel",
        )
        return JsonResponse({"sessionId": session.id})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

from django.urls import path
from .views import create_checkout_session  # Fix import

urlpatterns = [
    path("create-checkout-session/", create_checkout_session, name="create-checkout-session"),
]

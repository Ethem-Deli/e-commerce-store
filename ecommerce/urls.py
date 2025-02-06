from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),  # API Endpoints
    path("store/", include("store.urls")),  # Store Frontend
    path("payments/", include("payments.urls")),  # Payment Integration
]

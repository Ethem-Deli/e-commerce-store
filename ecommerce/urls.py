from django.contrib import admin
from django.urls import path, include
from store.views import index  # Import the index view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),  # API Endpoints
    path("store/", include("store.urls")),  # Store Frontend
    path("payments/", include("payments.urls")),  # Payment Integration
    path("", index, name="index"),  # this to make "/" load index.html
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
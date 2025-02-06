from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('products/', views.products, name='product-list'),
    path('cart/', views.cart, name='cart'),
    path('review/', views.review, name='review'),
]

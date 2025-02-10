from rest_framework import serializers
from store.models import Product
from django.templatetags.static import static  # Import static method

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image_url']

    def get_image_url(self, obj):
        return static(obj.image)  # Convert static path to a full URL

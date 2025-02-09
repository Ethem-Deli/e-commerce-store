from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()  # Custom image URL fix

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image']

    def get_image(self, obj):
        """Ensure the correct absolute URL for images"""
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

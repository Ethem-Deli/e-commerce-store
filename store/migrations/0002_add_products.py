from django.db import migrations

def add_products(apps, schema_editor):
    Product = apps.get_model('store', 'Product')

    books = [
        {"name": "Python for Beginners", "price": 19.99, "image": "static/store/images/book1.jpg"},
        {"name": "Django Essentials", "price": 24.99, "image": "static/store/images/book2.jpg"},
        {"name": "Machine Learning Basics", "price": 29.99, "image": "static/store/images/book3.jpg"},
        {"name": "Deep Learning Explained", "price": 34.99, "image": "static/store/images/book4.jpg"},
        {"name": "Data Science with Python", "price": 27.99, "image": "static/store/images/book5.jpg"},
        {"name": "AI Fundamentals", "price": 32.99, "image": "static/store/images/book6.jpg"},
        {"name": "Software Engineering Principles", "price": 22.99, "image": "static/store/images/book7.jpg"},
        {"name": "Cloud Computing Guide", "price": 26.99, "image": "static/store/images/book8.jpg"},
        {"name": "Database Management", "price": 23.99, "image": "static/store/images/book9.jpg"},
        {"name": "Cybersecurity Essentials", "price": 28.99, "image": "static/store/images/book10.jpg"},
    ]

    for book in books:
        Product.objects.create(name=book["name"], price=book["price"], image=book["image"])

class Migration(migrations.Migration):
    dependencies = [
        ('store', '0001_initial'),  # Reference the latest migration
    ]

    operations = [
        migrations.RunPython(add_products),
    ]

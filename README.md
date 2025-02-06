# E-Commerce Store

## Project Description
E-Commerce Store is a web application that provides a platform for buying and selling products online. It includes features such as:

- **Product Listings:** Display products with images, descriptions, and prices.
- **Shopping Cart:** Add and manage products before checkout.
- **Secure Checkout:** Process transactions securely.
- **User Authentication:** Register and log in to manage orders.
- **Admin Dashboard:** Manage products, orders, and users.

## Features
- Product listings with images and descriptions.
- Shopping cart with real-time updates.
- Secure checkout process with order tracking.
- Admin dashboard for managing products and orders.
- REST API for accessing product and order data.

## Setup Instructions
### Clone the repository:
```sh
git clone <repository_url>
cd ecommerce-store
```

### Install dependencies:
```sh
pip install -r requirements.txt
```

### Set up environment variables in a `.env` file:
```sh
DB_USER=<your_username>
DB_PASSWORD=<your_password>
DB_DSN=<your_dsn>
```

### Initialize the database:
```sh
python manage.py migrate
```

### Create a superuser:
```sh
python manage.py createsuperuser
```

### Run the application:
```sh
python manage.py runserver
```

## API Endpoints
- `/api/products`: Fetch all available products.
- `/api/cart`: Manage shopping cart items.
- `/api/orders`: Handle order processing and history.

## Future Enhancements
- Implement a recommendation engine for users.
- Add support for multiple payment gateways.
- Enhance the front-end with a modern UI framework.

### Running Output:
```
Serving Django application
Environment: Development
Debug mode: On
Running on http://127.0.0.1:8000/ (Press CTRL+C to quit)
```

## Video Walkthrough
[YouTube Video Walkthrough](https://youtu.be/example_video_link)

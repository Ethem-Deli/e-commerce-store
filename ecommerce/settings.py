import os
from pathlib import Path

# Define BASE_DIR
BASE_DIR = Path(__file__).resolve().parent.parent

# Define Root URL Configuration
ROOT_URLCONF = 'ecommerce.urls'  # Replace 'ecommerce' with your actual project name

# Static Files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "store/static"),  # ✅ Ensure this path exists
]
STATIC_ROOT = BASE_DIR / "staticfiles"  # For production use

# MEDIA FILES (if using ImageField)
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Installed Applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'store',
    'api',
    'payments',
]

SECRET_KEY="ETHEM"

# Stripe Configuration (Ensure these are set via environment variables for security)
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "your_stripe_secret_key")
STRIPE_PUBLIC_KEY = os.getenv("STRIPE_PUBLIC_KEY", "your_stripe_public_key")

# Templates Configuration
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],  # Ensure templates folder exists
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.media",  # Ensures media handling
            ],
        },
    },
]


# Debug Mode (Set DEBUG = False in production)
DEBUG = True  # Change to False in production

# Allowed Hosts
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]

# Middleware Configuration
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",  # REQUIRED
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",  # REQUIRED
    "django.contrib.messages.middleware.MessageMiddleware",  # REQUIRED
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Database Configuration (Default: SQLite)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Default Auto Field
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

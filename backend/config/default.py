import os
SECRET_KEY = os.urandom(32)

# Enable debug mode.
DEBUG = True

PROPAGATE_EXCEPTIONS = True

# Database configuration
SQLALCHEMY_DATABASE_URI = os.getenv("DB_URI")
SQLALCHEMY_TRACK_MODIFICATIONS = False
SHOW_SQLALCHEMY_LOG_MESSAGES = False
ERROR_404_HELP = False
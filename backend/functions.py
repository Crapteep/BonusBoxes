from PIL import Image
from passlib.context import CryptContext
from cryptography.fernet import Fernet
from os import getcwd
from config import get_settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password):
    return pwd_context.hash(password)


def encrypt_password(password):
    settings = get_settings()
    f = Fernet(settings.key)
    return f.encrypt(password.encode())
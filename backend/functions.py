from PIL import Image
from passlib.context import CryptContext
from cryptography.fernet import Fernet
from os import getcwd
from config import get_settings
from database import fetch_all_items, update_item_expired
import datetime
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password):
    return pwd_context.hash(password)


def encrypt_password(password):
    settings = get_settings()
    f = Fernet(settings.key)
    return f.encrypt(password.encode())



async def check_item_expired():
    items = await fetch_all_items()
    current_time = datetime.datetime.now()

    for item in items:
        created_at = datetime.datetime.strptime(item["created_at"], '%Y-%m-%d %H:%M:%S.%f')
        if (current_time - created_at).total_seconds() > 43200 and not item["expired"]:
            await update_item_expired(str(item["_id"]))


async def delete_image(image_name):
    # Usuń plik obrazu z dysku
    image_path = f"static/{image_name}"
    if os.path.exists(image_path):
        os.remove(image_path)


def parse_datetime(date_str):
    for fmt in ('%Y-%m-%d %H:%M:%S.%f', '%Y-%m-%d %H:%M:%S'):
        try:
            return datetime.datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    raise ValueError(f"time data '{date_str}' does not match any known format")



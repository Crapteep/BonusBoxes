import motor.motor_asyncio
from model import Post
from datetime import datetime, time
from config import get_settings
import os

settings = get_settings()


client = motor.motor_asyncio.AsyncIOMotorClient(settings.db_url)
database = client.BonusBoxes
posts_collection = database.posts


async def check_posts_today():
    today = datetime.today().date()
    start_of_day = datetime.combine(today, time.min)
    end_of_day = datetime.combine(today, time.max)

    post = await posts_collection.find_one({"created_at": {"$gte": start_of_day, "$lt": end_of_day}})
    return post


async def create_post(post):
    document = post
    result = await posts_collection.insert_one(document)
    return document


async def fetch_all_posts():
    posts = []
    cursor = posts_collection.find({}).sort("created_at", -1)
    async for document in cursor:
        posts.append(Post(**document))  # konwersja na obiekt klasy Post
    return posts


async def fetch_one_post(id):
    document = await posts_collection.find_one({"title": id})
    return document


async def update_post_users(post_id, users):
    result = await posts_collection.update_one({"_id": post_id}, {"$set": {"users": users}})
    return result


async def find_user_by_name(username):
    result = await posts_collection.find_one({'users.name': username})
    return result

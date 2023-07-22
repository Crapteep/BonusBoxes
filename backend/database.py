import motor.motor_asyncio
from model import Post, Account
from datetime import datetime, time, timedelta
from config import get_settings
import os
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import HTTPException


settings = get_settings()


client = motor.motor_asyncio.AsyncIOMotorClient(settings.db_url)
database = client.BonusBoxes
posts_collection = database.posts
accounts_collection = database.accounts
settings_collection = database.settings


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


async def check_did_account_exists_by_accountID(account_id):
    try:
        document = await accounts_collection.find_one({"_id": ObjectId(account_id)})
        return document

    except InvalidId:
        raise HTTPException(400, detail="Invalid account ID")
    

async def check_did_account_exists_by_email(email):
    document = await accounts_collection.find_one({"email": email})
    return document

async def check_did_account_exists_by_username(username):
    document = await accounts_collection.find_one({"username": username})
    return document


async def insert_new_account(account):
    document = account
    result = await accounts_collection.insert_one(document)
    return result


async def update_account(account_id):
    result = await accounts_collection.update_one({"_id": ObjectId(account_id)}, {"$set": {"last_update": datetime.now()}})
    print(result)
    return result


async def fetch_username_from_all_accounts():
    accounts = []
    cursor = accounts_collection.find({}, {'username': 1})
    async for account in cursor:
        accounts.append(account["username"])
    return accounts


async def fetch_hashed_password():
    hashed_password = None
    document = await settings_collection.find_one({})
    if document and 'hashed_password' in document:
        hashed_password = document['hashed_password']
    return hashed_password


async def fetch_accounts_with_data():
    accounts = []
    cursor = accounts_collection.find({})
    async for account in cursor:
        accounts.append(Account(**account))
    return accounts


async def fetch_documents_older_than_one_day():
    one_day_ago = datetime.now() - timedelta(days=1)

    pipeline = [
        {
            "$match": {
                "$or": [
                    {"last_update": None},
                    {"last_update": {"$lt": one_day_ago}}
                ],
            }
        }
    ]

    cursor = accounts_collection.aggregate(pipeline)
    results = await cursor.to_list(length=None)
    for result in results:
        result["_id"] = str(result["_id"])

    sorted_results = sorted(results, key=lambda x: x.get("last_update") or datetime.min, reverse=False)
    return sorted_results


async def delete_account_by_email(email):
    account_exists = await check_did_account_exists_by_email(email)
    if account_exists:
        await accounts_collection.delete_one({"email": email})
        return {"email": email}
    raise HTTPException(404, f"There is no account with this email {email}")
    

async def delete_many_accounts(accounts):
    result = await accounts_collection.delete_many({"email": {"$in": accounts.emails}})
    return result


async def fetch_many_accounts_info(accounts):
    accounts = list(map(ObjectId, accounts))
    cursor = accounts_collection.find({"_id": {"$in": accounts}}, {"username": 1, "_id": 1})
    result = await cursor.to_list(length=None)
    return result
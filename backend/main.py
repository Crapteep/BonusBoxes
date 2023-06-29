from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from datetime import date
from settings import ORIGINS

import uuid
import aiofiles
import os

from model import Post, User
from database import (
    fetch_all_posts,
    fetch_one_post,
    check_posts_today,
    create_post,
    update_post_users,
    find_user_by_name,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/posts")
async def get_all_posts():
    response = await fetch_all_posts()
    if response:
        return response


@app.get("/posts/{id}", response_model=Post)
async def get_post_by_id(id):
    response = await fetch_one_post(id)
    if response:
        return response
    raise HTTPException(404, f"There is no post with this ID {id}")


@app.post('/upload_user')
async def upload_new_user(q: str, files: list[UploadFile] = File(..., length=3)):
    if len(files) != 3:
        raise HTTPException(400, "Bad request")

    new_user = User(name=q)

    for i, file in enumerate(files):
        file.name = f"{uuid.uuid4()}.jpg"
        async with aiofiles.open(f"static/{file.name}", "wb") as f:
            while content := await file.read(1024):
                await f.write(content)

        if i == 0:
            new_user.box = file.name
        elif i == 1:
            new_user.mbox = file.name
        elif i == 2:
            new_user.gbox = file.name


    existing_post = await check_posts_today()

    if existing_post:
        existing_post_users = existing_post["users"]

        user_exists = False
        for user in existing_post_users:
            if user["name"] == new_user.name:
                if user["box"]:
                    os.remove(f"static/{user['box']}")
                    user["box"] = new_user.box

                if user["mbox"]:
                    os.remove(f"static/{user['mbox']}")
                    user["mbox"] = new_user.mbox

                if user["gbox"]:
                    os.remove(f"static/{user['gbox']}")
                    user["gbox"] = new_user.gbox
                
                user_exists = True
                break

        if not user_exists:
            existing_post_users.append(new_user.dict())

        await update_post_users(existing_post["_id"], existing_post_users)


    else:
        new_post = Post(title=f"Post for {date.today()}", users=[new_user])
        await create_post(new_post.dict())
    return True


@app.get('/user/images/{username}')
async def get_user_images(username: str):
    try:
        user_data = await find_user_by_name(username)

        if user_data:
            users = user_data.get('users', [])

            image_names = []
            for user in users:
                if user['name'] == username:
                    image_names.extend(list(user.values())[1:])
            return {'images': image_names}
        raise HTTPException(status_code=404, detail='User not found')

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

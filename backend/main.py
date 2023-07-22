from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from datetime import date
from config import get_settings
import uuid
import aiofiles
import os

from model import Post, User, Account, DeleteAccount, DeleteAccounts, AccountBasicInfo
from database import (
    fetch_all_posts,
    fetch_one_post,
    check_posts_today,
    create_post,
    update_post_users,
    insert_new_account,
    check_did_account_exists_by_email,
    check_did_account_exists_by_accountID,
    update_account,
    fetch_username_from_all_accounts,
    fetch_hashed_password,
    fetch_accounts_with_data,
    fetch_documents_older_than_one_day,
    delete_account_by_email,
    delete_many_accounts,
    fetch_many_accounts_info
)

from functions import encrypt_password, pwd_context


settings = get_settings()
app = FastAPI()


origins = [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://bonus-boxes.netlify.app',
    'https://bonus-boxes.onrender.com',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
    return {"message": "There are no posts here."}


@app.get("/posts/{id}", response_model=Post)
async def get_post_by_id(id):
    response = await fetch_one_post(id)
    if response:
        return response
    raise HTTPException(404, f"There is no post with this ID {id}")


@app.post('/posts/account/{account_id}')
async def add_data_for_new_day(account_id: str, files: list[UploadFile] = File(..., length=3)):
    if not await check_did_account_exists_by_accountID(account_id):
        raise HTTPException(
            404, detail=f"There is no account with this ID {account_id}")

    if len(files) != 3:
        raise HTTPException(400, "Bad request")

    new_user = User(user_id=account_id)

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
            if user["user_id"] == new_user.user_id:
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
            existing_post_users.insert(0, new_user.dict())

        await update_post_users(existing_post["_id"], existing_post_users)

    else:
        new_post = Post(title=f"Post for {date.today()}", users=[new_user])
        await create_post(new_post.dict())

    await update_account(account_id)
    return {"message": "New data added!"}


@app.post('/accounts/add-new')
async def add_new_account(account: Account):
    acc_exists = await check_did_account_exists_by_email(account.email)
    if acc_exists:
        raise HTTPException(status_code=409, detail="Account already exist!")

    encrypted_password = encrypt_password(account.password)
    account_dict = account.dict()
    account_dict["password"] = encrypted_password
    await insert_new_account(account_dict)
    return {"message": "Account has been successfully added!"}


@app.get("/accounts")
async def get_all_accounts():
    response = await fetch_username_from_all_accounts()
    if response:
        return response
    return {"message": "There are no accounts here."}


@app.get("/accounts/data")
async def get_all_accounts_with_data(password: str):
    hashed_password = await fetch_hashed_password()
    if hashed_password and pwd_context.verify(password, hashed_password):
        response = await fetch_accounts_with_data()
        if response:
            return response
        else:
            return {"message": "There are no accounts here."}
    else:
        raise HTTPException(status_code=401, detail="Incorrect password!")


@app.get("/accounts/ready")
async def get_ready_accounts(password: str):
    hashed_password = await fetch_hashed_password()
    if hashed_password and pwd_context.verify(password, hashed_password):
        response = await fetch_documents_older_than_one_day()
        if response:
            return response
        else:
            return {"message": "There are no accounts here."}
    else:
        raise HTTPException(status_code=401, detail="Incorrect password!")


@app.delete("/accounts/delete/{email}", response_model=DeleteAccount)
async def delete_account(email):
    response = await delete_account_by_email(email)
    return {"message": "The account has been deleted"}


@app.delete("/accounts/delete", response_model=DeleteAccounts)
async def delete_accounts(accounts: DeleteAccounts):
    response = await delete_many_accounts(accounts)
    if response.deleted_count > 0:
        return {"message": "Accounts have been deleted"}
    raise HTTPException(404, f"No accounts found with the provided emails")


@app.get("/accounts/{account_id}/info", response_model=AccountBasicInfo)
async def get_account_info(account_id):
    response = await check_did_account_exists_by_accountID(account_id)
    if response:
        return AccountBasicInfo(id=account_id, username=response["username"])
    raise HTTPException(404, detail=f"There is no account with this ID {account_id}")


#poprawic gdy wpiszemy cos innego niz ID konta - wywala błąd 500
@app.put("/accounts/info")
async def get_accounts_info(accounts: list[str]):
    response = await fetch_many_accounts_info(accounts)
    info = []
    for account in response:
        account_info = AccountBasicInfo(id=str(account['_id']), username=account['username'])
        info.append(account_info)
    return info

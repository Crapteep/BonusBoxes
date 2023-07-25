from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from bson import ObjectId


class User(BaseModel):
    user_id: str
    box: str | None = None
    mbox: str | None = None
    gbox: str | None = None
    expired: bool = False


class Post(BaseModel):
    title: str = Field(default=None, max_length=200)
    description: str | None = None
    users: list[User]
    created_at: datetime | None = None
    expired: bool = False

    def __init__(self, **data):
        super().__init__(**data)
        self.created_at = datetime.now()


class Account(BaseModel):
    email: EmailStr
    username: str | None = None
    password: str
    last_update: datetime | None = None

    def __init__(self, **data):
        super().__init__(**data)
        self.last_update = datetime.now()


class AccountBasicInfo(BaseModel):
    id: str
    username: str


class DeleteAccount(BaseModel):
    email: EmailStr


class DeleteAccounts(BaseModel):
    emails: list[EmailStr]
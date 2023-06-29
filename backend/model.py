from pydantic import BaseModel, Field
from typing import Annotated
from datetime import datetime


class User(BaseModel):
    name: str
    box: str
    mbox: str
    gbox: str


class Post(BaseModel):
    title: str = Field(default=None, max_length=200)
    description: str | None = None
    users: list[User]
    created_at: datetime = datetime.now()

from pydantic import BaseModel, Field
from typing import Annotated
from datetime import datetime


class User(BaseModel):
    name: str
    box: str = Field(default="", alias="images")
    mbox: str = Field(default="", alias="images")
    gbox: str = Field(default="", alias="images")


class Post(BaseModel):
    title: str = Field(default=None, max_length=200)
    description: str | None = None
    users: list[User]
    created_at: datetime = datetime.now()

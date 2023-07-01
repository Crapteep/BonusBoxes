from pydantic import BaseModel, Field
from datetime import datetime


class User(BaseModel):
    name: str
    box: str | None = None
    mbox: str | None = None
    gbox: str | None = None


class Post(BaseModel):
    title: str = Field(default=None, max_length=200)
    description: str | None = None
    users: list[User]
    created_at: datetime | None = None

    def __init__(self, **data):
        super().__init__(**data)
        self.created_at = datetime.now()

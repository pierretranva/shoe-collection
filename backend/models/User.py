from typing import Optional

from sqlmodel import Field, SQLModel
from sqlmodel import SQLModel, Field, create_engine

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str
    password: str
    date_of_birth: str
    hometown: str
    admin_moderator_id: Optional[int] = Field(foreign_key="admin.id")


class Post(SQLModel, table=True):
    post_id: int = Field(default=None, primary_key=True)
    caption: str
    picture_url: str
    is_selling: bool
    price: float
    selling_link: str
    date: str
    creator_id: int = Field(foreign_key="user.id")
    related_shoe_id: int = Field(foreign_key="shoe.id")
    admin_moderator_id: int = Field(foreign_key="admin.id")

class Shoe(SQLModel, table=True):
    shoe_id: int = Field(default=None, primary_key=True)
    brand: str
    model: str
    year: int
    color: str
    creator_id: int = Field(foreign_key="user.id")

class Admin(SQLModel, table=True):
    admin_id: int = Field(default=None, primary_key=True)
    username: str
    password: str

class Followers(SQLModel, table=True):
    followers_id: int = Field(default=None, primary_key=True)
    follower: int = Field(foreign_key="user.id")
    followee: int = Field(foreign_key="user.id")

class Likes(SQLModel, table=True):
    likes_id: int = Field(default=None, primary_key=True)
    post_id: int = Field(foreign_key="post.id")
    user_id: int = Field(foreign_key="user.id")

class Comment(SQLModel, table=True):
    comment_id: int = Field(default=None, primary_key=True)
    text: str
    date: str
    creator_id: int = Field(foreign_key="user.id")
    post_id: int = Field(foreign_key="post.id")

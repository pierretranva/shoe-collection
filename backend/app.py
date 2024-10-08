from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import (
    get_all_users, get_user_by_id, get_user_by_name, delete_user_by_id, update_user_by_id, add_user_to_database,
    get_all_posts, get_post_by_id,
    get_all_shoes, get_shoe_by_id
)
import uvicorn

app = FastAPI()


class UpdateUserPayload(BaseModel):
    user_id: int
    name: str
    date_of_birth: str
    hometown: str


class CreateUserPayload(BaseModel):
    name: str
    password: str
    date_of_birth: str
    hometown: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get('/users')
def get_users():
    users = get_all_users()
    return users


@app.get('/users/{user_id}')
def get_user(user_id: int):
    user = get_user_by_id(user_id)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail='User not found')


@app.delete('/users/{user_id}')
def delete_user(user_id: int):
    deleted = delete_user_by_id(user_id)
    if deleted:
        return {'message': 'User deleted successfully'}
    else:
        raise HTTPException(status_code=404, detail='User not found')


@app.put('/update_user')
def update_user(payload: UpdateUserPayload):
    updated = update_user_by_id(payload.user_id, payload.name, payload.date_of_birth, payload.hometown)
    if updated:
        return {'message': 'User updated successfully'}
    else:
        raise HTTPException(status_code=404, detail='User not found')


@app.put('/add_user')
def add_user(payload: CreateUserPayload):
    updated = add_user_to_database(payload.name, payload.password, payload.date_of_birth, payload.hometown)
    if updated:
        return {'message': 'User created successfully'}
    else:
        raise HTTPException(status_code=404, detail='User not created')


@app.get('/users/name/{name}')
def get_users_by_name(name: str):
    users = get_user_by_name(name)
    if users:
        return users
    else:
        raise HTTPException(status_code=404, detail='No users found with the given name')


@app.get('/posts')
def get_posts():
    posts = get_all_posts()
    return posts


@app.get('/posts/{post_id}')
def get_post(post_id: int):
    post = get_post_by_id(post_id)
    if post:
        return post
    else:
        raise HTTPException(status_code=404, detail='Post not found')


@app.get('/shoes')
def get_shoes():
    shoes = get_all_shoes()
    return shoes


@app.get('/shoes/{shoe_id}')
def get_shoe(shoe_id: int):
    shoe = get_shoe_by_id(shoe_id)
    if shoe:
        return shoe
    else:
        raise HTTPException(status_code=404, detail='Shoe not found')


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=False)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from database import (
    get_all_users, get_user_by_id, get_user_by_name, delete_user_by_id, update_user_by_id, add_user_to_database,
    get_all_posts, get_post_by_id, delete_post_by_id, update_post_by_id,
    get_all_shoes, get_shoe_by_id, delete_shoe_by_id, update_shoe_by_id, add_shoe_to_database,
    get_post_by_userId, number_of_followers, number_of_following, follow, unfollow, is_following,
    verify_admin, verify_user, get_all_shoe_brands, get_all_shoe_models, get_all_shoe_colors, add_post_to_database,
    get_shoe_id, user_liked_post, edit_user_profile_by_id
)
from database_metrics import (
    get_total_users, get_total_posts, get_total_likes, get_total_comments, get_sum_price, get_oldest_user,
    get_youngest_user, get_avg_price, get_avg_year, get_most_expensive_shoe, get_user_post_count,
    get_user_follower_count, get_for_sale_posts, get_following_count, get_favorite_shoe_brand
)
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UpdateUserPayload(BaseModel):
    user_id: int
    name: str
    date_of_birth: str
    hometown: str

class EditProfileUserPayload(BaseModel):
    user_id: int
    password: str
    date_of_birth: str
    hometown: str


class CreateUserPayload(BaseModel):
    name: str
    password: str
    date_of_birth: str
    hometown: str


class UpdatePostPayload(BaseModel):
    post_id: int
    caption: str
    picture_url: str
    is_selling: int
    price: float
    selling_link: str
    date: str


class UpdateShoePayload(BaseModel):
    shoe_id: int
    brand: str
    model: str
    year: int
    color: str


class CreateShoePayload(BaseModel):
    brand: str
    model: str
    year: int
    color: str


class LoginPayload(BaseModel):
    username: str
    password: str


class AddPostPayload(BaseModel):
    username: str
    caption: str
    picture_url: str
    is_selling: int
    price: Optional[float] = None
    selling_link: Optional[str] = None
    date: str
    brand: str
    model: str
    year: int
    color: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.put('/admin/login')
def login_admin(payload: LoginPayload):
    return {"status": verify_admin(payload.username, payload.password)}


@app.put('/user/login')
def login_user(payload: LoginPayload):
    status, user_id = verify_user(payload.username, payload.password)
    return {"status": status, "user_id": user_id}


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


@app.get('/shoe/brands')
def get_shoe_brands():
    brands = get_all_shoe_brands()
    print(brands)
    return brands


@app.get('/shoe/colors')
def get_shoe_colors():
    colors = get_all_shoe_colors()
    return colors


@app.get('/shoe/models/{brand}')
def get_shoe_models(brand: str):
    models = get_all_shoe_models(brand)
    print(models)
    return models


@app.delete('/users/{user_id}')
def delete_user(user_id: int):
    deleted = delete_user_by_id(user_id)
    if deleted:
        return {'message': 'User deleted successfully'}
    else:
        raise HTTPException(status_code=404, detail='User not found')


@app.put('/post')
def add_post(payload: AddPostPayload):
    userData = get_user_by_name(payload.username)
    print(userData)
    shoe_id = get_shoe_id(payload.brand, payload.model, payload.year, payload.color)
    print(shoe_id)
    if shoe_id is None:
        shoe_id = add_shoe_to_database(payload.brand, payload.model, payload.year, payload.color)
    updated = add_post_to_database(payload.caption, payload.picture_url, payload.is_selling, payload.price,
                                   payload.selling_link, payload.date, userData[0]['user_id'], shoe_id)
    if updated:
        return {'message': 'Post created successfully'}
    else:
        raise HTTPException(status_code=404, detail='Post not created')


@app.put('/update_users')
def update_user(payload: UpdateUserPayload):
    updated = update_user_by_id(payload.user_id, payload.name, payload.date_of_birth, payload.hometown)
    if updated:
        return {'message': 'User updated successfully'}
    else:
        raise HTTPException(status_code=404, detail='User not found')


@app.put('/edit_profile')
def edit_profile(payload: EditProfileUserPayload):
    updated = edit_user_profile_by_id(payload.user_id, payload.password, payload.date_of_birth, payload.hometown)
    if updated:
        return {'message': 'User updated successfully'}
    else:
        raise HTTPException(status_code=404, detail='User not found')


@app.put('/add_users')
def add_user(payload: CreateUserPayload):
    if len(get_user_by_name(payload.name)) > 0:
        raise HTTPException(status_code=404, detail='Username already exists')
    updated = add_user_to_database(payload.name, payload.password, payload.date_of_birth, payload.hometown)
    if updated:
        return {'message': 'User created successfully', 'username': payload.name}
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
def get_posts(username: Optional[str] = None, page_number: Optional[int] = 1):
    posts = get_all_posts(page_number)
    if username:
        for post in posts:
            if user_liked_post(username, post['post_id']):
                post['liked'] = True
            else:
                post['liked'] = False
    else:
        for post in posts:
            post['liked'] = False

    return posts


@app.get('/posts/{post_id}')
def get_post(post_id: int):
    post = get_post_by_id(post_id)
    if post:
        return post
    else:
        raise HTTPException(status_code=404, detail='Post not found')


@app.get('/posts/user_id/{user_id}')
def get_posts_by_username(user_id: int):
    posts = get_post_by_userId(user_id)
    if posts:
        return posts
    else:
        raise HTTPException(status_code=404, detail='Post not found')


@app.get('/followers/{user_id}')
def get_followers(user_id: int):
    count = number_of_followers(user_id)
    return count


@app.get('/following/{user_id}')
def get_following(user_id: int):
    count = number_of_following(user_id)
    return count


@app.get('/is_following/{user_id}/{other_user_id}')
def is_follow_user(user_id: int, other_user_id: int):
    return {"status": is_following(user_id, other_user_id)}

@app.get('/unfollow/{user_id}/{other_user_id}')
def unfollow_user(user_id: int, other_user_id: int):
    unfollow(user_id, other_user_id)

@app.get('/follow/{user_id}/{other_user_id}')
def follow_user(user_id: int, other_user_id: int):
    follow(user_id, other_user_id)



@app.delete('/posts/{post_id}')
def delete_user(post_id: int):
    deleted = delete_post_by_id(post_id)
    if deleted:
        return {'message': 'Post deleted successfully'}
    else:
        raise HTTPException(status_code=404, detail='Post not found')


@app.put('/update_posts')
def update_user(payload: UpdatePostPayload):
    updated = update_post_by_id(payload.post_id, payload.caption, payload.picture_url, payload.is_selling,
                                payload.price, payload.selling_link, payload.date)
    if updated:
        return {'message': 'Post updated successfully'}
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


@app.delete('/shoes/{shoe_id}')
def delete_shoe(shoe_id: int):
    deleted = delete_shoe_by_id(shoe_id)
    if deleted:
        return {'message': 'Shoe deleted successfully'}
    else:
        raise HTTPException(status_code=404, detail='Shoe not found')


@app.put('/update_shoes')
def update_user(payload: UpdateShoePayload):
    updated = update_shoe_by_id(payload.shoe_id, payload.brand, payload.model, payload.year, payload.color)
    if updated:
        return {'message': 'Shoe updated successfully'}
    else:
        raise HTTPException(status_code=404, detail='Shoe not found')


@app.put('/add_shoes')
def add_user(payload: CreateShoePayload):
    updated = add_shoe_to_database(payload.brand, payload.model, payload.year, payload.color)
    if updated:
        return {'message': 'Shoe created successfully'}
    else:
        raise HTTPException(status_code=404, detail='Shoe not created')
    
#Get Endpoints for Metrics:
@app.get('/get_total_users')
def total_users():
    metric = get_total_users()
    if metric:
        return metric
    else:
        return 0
    
@app.get('/get_total_posts')
def total_posts():
    metric = get_total_posts()
    if metric:
        return metric
    else:
        raise HTTPException(status_code=404, detail='Metric Created Unsuccessfully')
    
@app.get('/get_total_likes')
def total_likes():
    metric = get_total_likes()
    if metric:
        return metric
    else:
        return 0
    
@app.get('/get_total_comments')
def total_comments():
    metric = get_total_comments()
    if metric:
        return metric
    else:
        return 0
    
@app.get('/get_sum_price')
def sum_price():
    metric = get_sum_price()
    if metric:
        return metric
    else:
        raise HTTPException(status_code=404, detail='Metric Created Unsuccessfully')

@app.get('/get_oldest_user')
def oldest_user():
    metric = get_oldest_user()
    if metric:
        return metric
    else:
        return "No Users in Database"
    
@app.get('/get_youngest_user')
def yougest_user():
    metric = get_youngest_user()
    if metric:
        return metric
    else:
        return "No Users in Database"
    
@app.get('/get_avg_price')
def avg_price():
    metric = get_avg_price()
    if metric:
        return metric
    else:
        raise HTTPException(status_code=404, detail='Metric Created Unsuccessfully')
    
@app.get('/get_avg_year')
def avg_year():
    metric = get_avg_year()
    if metric:
        return metric
    else:
        raise HTTPException(status_code=404, detail='Metric Created Unsuccessfully')
    
@app.get('/get_most_expensive_shoe')
def most_expensive_shoe():
    metric = get_most_expensive_shoe()
    if metric:
        return metric
    else:
        raise HTTPException(status_code=404, detail='Metric Created Unsuccessfully')

@app.get('/get_user_post_count/{user_id}')
def user_post_count(user_id):
    metric = get_user_post_count(user_id)
    if metric:
        return metric
    else:
        raise HTTPException(status_code=404, detail='Metric Created Unsuccessfully')
    
@app.get('/get_user_follower_count/{user_id}')
def user_follower_count(user_id):
    metric = get_user_follower_count(user_id)
    if metric:
        return metric
    else:
        return 0
    
@app.get('/get_following_count/{user_id}')
def following_count(user_id):
    metric = get_following_count(user_id)
    if metric:
        return metric
    else:
        return 0
    
@app.get('/get_for_sale_posts/{user_id}')
def for_sale_posts(user_id):
    metric = get_for_sale_posts(user_id)
    if metric:
        return metric
    else:
        return 0
    
@app.get('/get_favorite_shoe_brand/{user_id}')
def favorite_shoe_brand(user_id):
    metric = get_favorite_shoe_brand(user_id)
    if metric:
        return metric
    else:
        raise HTTPException(status_code=404, detail='Metric Created Unsuccessfully')


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=False)

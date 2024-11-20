import sqlite3
import pandas as pd

# Overall Metrics. Displayed on the Admin Homepage
def get_total_users():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM User")
    total_users = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return total_users

def get_total_posts():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM Post")
    total_posts = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return total_posts

def get_total_likes():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM Likes")
    total_likes = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return total_likes

def get_total_comments():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM Comment")
    total_comments = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return total_comments

def get_sum_price():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Sum(price) FROM Post")
    sum_price = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return sum_price

#Admin Related Metrics. Displayed under the Admin Metrics Button.
def get_oldest_user():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM User WHERE date_of_birth = (SELECT MIN(date_of_birth) FROM User)")
    min_user = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return min_user

def get_youngest_user():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT username FROM User WHERE date_of_birth = (SELECT MAX(date_of_birth) FROM User)")
    max_user = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return max_user

def get_avg_price():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Avg(price) FROM Post")
    avg_price = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return avg_price

def get_avg_year():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Avg(year) FROM Shoe")
    avg_year = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return avg_year

def get_most_expensive_shoe():
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Shoe.* FROM Shoe JOIN Post ON Shoe.shoe_id = Post.related_shoe_id WHERE Post.price = (SELECT MAX(price) FROM Post)")
    shoe = cursor.fetchone()  
    cursor.close()
    connection.close()
    return shoe

#User Specific Metrics Found on the User's profile page.
def get_user_post_count(user_id):
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Count(*) from Post WHERE creator_id = ?", (user_id))
    count = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return count

def get_user_follower_count(user_id):
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Count(*) from Followers WHERE followee = ?", (user_id))
    count = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return count

def get_for_sale_posts(user_id):
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Sum(is_selling) From Post WHERE creator_id = ?", (user_id))
    posts = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return posts

def get_following_count(user_id):
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Count(*) from Followers WHERE follower = ?", (user_id))
    count = cursor.fetchone()[0]  
    cursor.close()
    connection.close()
    return count

def get_favorite_shoe_brand(user_id):
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Shoe.* FROM Shoe JOIN Post ON Shoe.shoe_id = Post.related_shoe_id WHERE Post.creator_id = ?", (user_id))
    brands = pd.Series([shoe[0] for shoe in cursor.fetchall()]) 
    cursor.close()
    connection.close()

    brand_counts = brands.value_counts() 

    return brand_counts.idxmax()



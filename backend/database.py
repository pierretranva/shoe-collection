import sqlite3
import bcrypt
import random
import string

con = sqlite3.connect("database.db")

cur = con.cursor()


def init_db():
    # create all the tables if they don't exists

    sql_create_user = """CREATE TABLE IF NOT EXISTS User (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    date_of_birth TEXT, -- Use TEXT to store dates in ISO 8601 format ('YYYY-MM-DD')
    hometown TEXT,
    admin_moderator_id INTEGER,
    FOREIGN KEY (admin_moderator_id) REFERENCES Admin(admin_id))"""
    # sql_create_user = " ".join(line.strip() for line in sql_create_user.splitlines())

    sql_create_post = """CREATE TABLE IF NOT EXISTS Post (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    caption TEXT,
    picture_url TEXT,
    is_selling INTEGER,
    price REAL,
    selling_link TEXT,
    date TEXT,
    creator_id INTEGER,
    related_shoe_id INTEGER,
    admin_moderator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES User(user_id),
    FOREIGN KEY (related_shoe_id) REFERENCES Shoe(shoe_id),
    FOREIGN KEY (admin_moderator_id) REFERENCES Admin(admin_id))"""
    # sql_create_post = " ".join(line.strip() for line in sql_create_post.splitlines())

    sql_create_shoe = """CREATE TABLE IF NOT EXISTS Shoe (
    shoe_id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    year INTEGER,
    color TEXT,
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES User(user_id))"""
    # sql_create_shoe = " ".join(line.strip() for line in sql_create_shoe.splitlines())

    sql_create_admin = """CREATE TABLE IF NOT EXISTS Admin (
    admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT)"""
    # sql_create_admin = " ".join(line.strip() for line in sql_create_admin.splitlines())

    sql_create_shoe = """CREATE TABLE IF NOT EXISTS Shoe (
    shoe_id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    year INTEGER,
    color TEXT,
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES Admin(admin_id))"""
    # sql_create_shoe = " ".join(line.strip() for line in sql_create_shoe.splitlines())

    sql_create_followers = """CREATE TABLE IF NOT EXISTS Followers (
    followers_id INTEGER PRIMARY KEY AUTOINCREMENT,
    follower INTEGER,
    followee INTEGER,
    FOREIGN KEY (follower) REFERENCES User(user_id),
    FOREIGN KEY (followee) REFERENCES User(user_id))"""
    # sql_create_followers = " ".join(line.strip() for line in sql_create_followers.splitlines())

    sql_create_likes = """CREATE TABLE IF NOT EXISTS Likes (
    likes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES Post(post_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id))"""
    # sql_create_likes = " ".join(line.strip() for line in sql_create_likes.splitlines())

    sql_create_comment = """CREATE TABLE IF NOT EXISTS Comment (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    date TEXT,
    creator_id INTEGER,
    post_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES User(user_id),
    FOREIGN KEY (post_id) REFERENCES Post(post_id))"""
    # sql_create_comment = " ".join(line.strip() for line in sql_create_comment.splitlines())

    cur.execute(sql_create_user)
    cur.execute(sql_create_post)
    cur.execute(sql_create_shoe)
    cur.execute(sql_create_admin)
    cur.execute(sql_create_followers)
    cur.execute(sql_create_likes)
    cur.execute(sql_create_comment)
    con.commit()

    # cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
    # print(cur.fetchall())


def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def check_password(input_password, stored_hashed_password):
    return bcrpyy.checkpw(input_password.encode('utf-8'), stored_hashed_password)


def create_user(username, password, date_of_birth, hometown):
    password = hash_password(password)
    cur.execute("INSERT INTO User (username, password, date_of_birth, hometown) VALUES (?, ?, ?, ?)",
                (username, password, date_of_birth, hometown))
    con.commit()


def create_admin(username, password):
    password = hash_password(password)
    cur.execute("INSERT INTO Admin (username, password) VALUES (?, ?)", (username, password))
    con.commit()


def populate_db():
    create_admin("admin", "admin")
    # create 30 users
    for i in range(0, 29):
        create_user("test" + str(i), ''.join(random.choices(string.ascii_uppercase + string.digits, k=10)),
                    "1999-01-0" + str(i), "New York")
    # create 30 shoes
    for i in range(0, 29):
        cur.execute("INSERT INTO Shoe (brand, model, year, color, creator_id) VALUES (?, ?, ?, ?, ?)",
                    ("brand", "model" + str(i), 2021, "color", 1))
    # create 30 posts
    for i in range(0, 29):
        cur.execute(
            "INSERT INTO Post (caption, picture_url, is_selling, price, selling_link, date, creator_id, related_shoe_id, admin_moderator_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            ("caption", "picture_url", 1, 100, "selling_link", "2021-01-0" + str(i), 1, 1, 1))
    con.commit()


# cursor.execute("SELECT * FROM User")
try:
    cur.execute("SELECT * FROM User")
except:
    init_db()
    populate_db()


def get_all_users():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM User")
    users = [dict(user_id=row[0], name=row[1], date_of_birth=row[3]) for row in cursor.fetchall()]
    connection.close()
    return users


def get_user_by_id(user_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM User WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    connection.close()
    if row:
        return dict(user_id=row[0], name=row[1], date_of_birth=row[3])
    return None


def delete_user_by_id(user_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("DELETE FROM User WHERE user_id = ?", (user_id,))
    connection.commit()
    deleted = cursor.rowcount > 0
    connection.close()
    return deleted


def update_user_by_id(user_id, name, date_of_birth, home_town):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("UPDATE User SET username = ?, date_of_birth = ?, hometown = ? WHERE user_id = ?",
                   (name, date_of_birth, home_town, user_id))
    connection.commit()
    updated = cursor.rowcount > 0
    connection.close()
    return updated


def add_user_to_database(username, password, date_of_birth, hometown):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    password = hash_password(password)
    cursor.execute("INSERT INTO User (username, password, date_of_birth, hometown) VALUES (?, ?, ?, ?)",
                   (username, password, date_of_birth, hometown))
    connection.commit()
    updated = cursor.rowcount > 0
    connection.close()
    return updated


def get_user_by_name(name):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM User WHERE username LIKE ?", (f"%{name}%",))
    users = [dict(user_id=row[0], name=row[1], date_of_birth=row[3]) for row in cursor.fetchall()]
    connection.close()
    return users


def get_all_posts():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Post")
    posts = [dict(post_id=row[0], title=row[1], content=row[2]) for row in cursor.fetchall()]
    connection.close()
    return posts


def get_post_by_id(post_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Post WHERE post_id = ?", (post_id,))
    row = cursor.fetchone()
    connection.close()
    if row:
        return dict(post_id=row[0], title=row[1], content=row[2])
    return None


def get_all_shoes():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Shoe")
    shoes = [dict(shoe_id=row[0], brand=row[1], model=row[2]) for row in cursor.fetchall()]
    connection.close()
    return shoes


def get_shoe_by_id(shoe_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Shoe WHERE shoe_id = ?", (shoe_id,))
    row = cursor.fetchone()
    connection.close()
    if row:
        return dict(shoe_id=row[0], brand=row[1], model=row[2])
    return None

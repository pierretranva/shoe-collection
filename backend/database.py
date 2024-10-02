import sqlite3

con = sqlite3.connect("database.db")

cur = con.cursor()

def init_db():
    #create all the tables if they don't exists

    sql_create_user = """CREATE TABLE IF NOT EXISTS User (
    user_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    date_of_birth TEXT, -- Use TEXT to store dates in ISO 8601 format ('YYYY-MM-DD')
    hometown TEXT,
    admin_moderator_id INTEGER,
    FOREIGN KEY (admin_moderator_id) REFERENCES Admin(admin_id))"""
    # sql_create_user = " ".join(line.strip() for line in sql_create_user.splitlines())

    sql_create_post = """CREATE TABLE IF NOT EXISTS Post (
    post_id INTEGER PRIMARY KEY, 
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
    shoe_id INTEGER PRIMARY KEY,
    brand TEXT,
    model TEXT,
    year INTEGER,
    color TEXT,
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES User(user_id))"""
    # sql_create_shoe = " ".join(line.strip() for line in sql_create_shoe.splitlines())

    sql_create_admin = """CREATE TABLE IF NOT EXISTS Admin (
    admin_id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT)"""
    # sql_create_admin = " ".join(line.strip() for line in sql_create_admin.splitlines())

    sql_create_shoe = """CREATE TABLE IF NOT EXISTS Shoe (
    shoe_id INTEGER PRIMARY KEY,
    brand TEXT,
    model TEXT,
    year INTEGER,
    color TEXT,
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES User(user_id))"""
    # sql_create_shoe = " ".join(line.strip() for line in sql_create_shoe.splitlines())

    sql_create_followers = """CREATE TABLE IF NOT EXISTS Followers (
    followers_id INTEGER PRIMARY KEY,
    follower INTEGER,
    followee INTEGER,
    FOREIGN KEY (follower) REFERENCES User(user_id),
    FOREIGN KEY (followee) REFERENCES User(user_id))"""
    # sql_create_followers = " ".join(line.strip() for line in sql_create_followers.splitlines())

    sql_create_likes = """CREATE TABLE IF NOT EXISTS Likes (
    likes_id INTEGER PRIMARY KEY,
    post_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES Post(post_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id))"""
    # sql_create_likes = " ".join(line.strip() for line in sql_create_likes.splitlines())

    sql_create_comment = """CREATE TABLE IF NOT EXISTS Comment (
    comment_id INTEGER PRIMARY KEY,
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


init_db()
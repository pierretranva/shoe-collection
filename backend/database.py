import sqlite3
import bcrypt

#Encryption and Authentication.
def hash_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

def check_password(input_password, stored_hashed_password):
    return bcrypt.checkpw(input_password.encode("utf-8"), stored_hashed_password)

def verify_admin(username, password):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT password FROM Admin WHERE username == ?", (username,))
        row = cursor.fetchone()
        cursor.close()

        if row:
            stored_password = row[0]
            if check_password(password, stored_password):
                return True
    return False


def verify_user(username, password):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT password, user_id FROM User WHERE username == ?", (username,)
        )
        row = cursor.fetchone()
        cursor.close()

        if row:
            stored_password = row[0]
            if check_password(password, stored_password):
                return True, row[1]
    return False, -1


#Creating Database Entities.
def create_user(username, password, date_of_birth, hometown):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        password = hash_password(password)
        cursor.execute(
            "INSERT INTO User (username, password, date_of_birth, hometown) VALUES (?, ?, ?, ?)",
            (username, password, date_of_birth, hometown),
        )
        connection.commit()
        cursor.close()

def create_admin(username, password):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        password = hash_password(password)
        cursor.execute(
            "INSERT INTO Admin (username, password) VALUES (?, ?)", (username, password)
        )
        connection.commit()
        cursor.close()


#Creates the initial admin.
con = sqlite3.connect("database.db", timeout=1.0)
cur = con.cursor()

try:
    cur.execute("SELECT * FROM User")
    cur.close()
    con.close()
except:
    with open("schema.sql", "r") as sql_file:
        sql_script = sql_file.read()

    cur.executescript(sql_script)
    cur.close()
    con.close()
    create_admin("admin", "password")


#Admin Specific Functions.
def get_all_admins():
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Admin")
        admins = [
            dict(admin_id=row[0], name=row[1])
            for row in cursor.fetchall()
        ]
        cursor.close()
    return admins

def add_admin_to_database(username, password):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        password = hash_password(password)
        cursor.execute(
            "INSERT INTO Admin (username, password) VALUES (?, ?)", (username, password)
        )
        connection.commit()
        rowid = cursor.lastrowid
        cursor.close()
    return rowid

def delete_admin_by_id(admin_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM Admin WHERE admin_id = ?", (admin_id,))
        connection.commit()
        deleted = cursor.rowcount > 0
        cursor.close()
    return deleted

def update_admin_by_id(admin_id, name, password):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE Admin SET username = ?, password = ? WHERE admin_id = ?",
            (name, hash_password(password), admin_id),
        )
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated


#User Specific Functions.
def get_all_users():
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User")
        users = [
            dict(user_id=row[0], name=row[1], date_of_birth=row[3], hometown=row[4])
            for row in cursor.fetchall()
        ]
        cursor.close()
    return users

def get_user_by_id(user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return dict(
                user_id=row[0], name=row[1], date_of_birth=row[3], hometown=row[4]
            )
    return None

def delete_user_by_id(user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM User WHERE user_id = ?", (user_id,))
        connection.commit()
        deleted = cursor.rowcount > 0
        cursor.close()
    return deleted

def update_user_by_id(user_id, name, date_of_birth, home_town):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE User SET username = ?, date_of_birth = ?, hometown = ? WHERE user_id = ?",
            (name, date_of_birth, home_town, user_id),
        )
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated

def edit_user_profile_by_id(user_id, password, date_of_birth, home_town):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE User SET password = ?, date_of_birth = ?, hometown = ? WHERE user_id = ?",
            (hash_password(password), date_of_birth, home_town, user_id),
        )
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated

def get_id_by_username(username):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT user_id FROM User WHERE username = ?", (username,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row[0]
    return None

def add_user_to_database(username, password, date_of_birth, hometown):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        password = hash_password(password)
        cursor.execute(
            "INSERT or IGNORE INTO User (username, password, date_of_birth, hometown) VALUES (?, ?, ?, ?)",
            (username, password, date_of_birth, hometown),
        )
        connection.commit()
        id = get_id_by_username(username)
        cursor.close()
    return username, id

def get_user_by_name(name):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User WHERE username LIKE ?", (f"%{name}%",))
        users = [
            dict(user_id=row[0], name=row[1], date_of_birth=row[3])
            for row in cursor.fetchall()
        ]
        cursor.close()
    return users


#Post Specific.
def get_all_posts(page_number):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        offset_start = (page_number - 1) * 10
        query = """
        SELECT 
            Post.post_id, 
            Post.caption, 
            Post.picture_url, 
            Post.is_selling, 
            Post.price, 
            Post.selling_link, 
            Post.date, 
            User.username, 
            Shoe.brand, 
            Shoe.model, 
            Shoe.year, 
            Shoe.color, 
            COUNT(DISTINCT Likes.likes_id) as like_count, 
            COUNT(DISTINCT Comment.comment_id) as comment_count
        FROM Post
        LEFT JOIN User on Post.creator_id = User.user_id
        LEFT JOIN Shoe on Post.related_shoe_id = Shoe.shoe_id
        LEFT JOIN Likes on Post.post_id = Likes.post_id
        LEFT JOIN Comment on Post.post_id = Comment.post_id
        GROUP BY Post.post_id
        ORDER BY Post.date DESC
        LIMIT 10 OFFSET 
        """ + str(
            offset_start
        )
        cursor.execute(query)
        posts = [
            dict(
                post_id=row[0],
                caption=row[1],
                picture_url=row[2],
                is_selling=row[3],
                price=row[4],
                selling_link=row[5],
                date=row[6],
                creator=row[7],
                brand=row[8],
                model=row[9],
                year=row[10],
                color=row[11],
                like_count=row[12],
                comment_count=row[13],
            )
            for row in cursor.fetchall()
        ]
        cursor.close()

    return posts

def user_liked_post(user_id, post_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT EXISTS(SELECT 1 FROM Likes WHERE user_id = ? AND post_id = ?) as liked",
            (user_id, post_id),
        )
        row = cursor.fetchone()
        cursor.close()
        return row[0] == 1

def get_post_by_id(post_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Post WHERE post_id = ?", (post_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return dict(
                post_id=row[0],
                caption=row[1],
                picture_url=row[2],
                is_selling=row[3],
                price=row[4],
                selling_link=row[5],
                date=row[6],
            )
    return None

def get_post_by_userId(user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        query = """
        SELECT 
            Post.post_id, 
            Post.caption, 
            Post.picture_url, 
            Post.is_selling, 
            Post.price, 
            Post.selling_link, 
            Post.date, 
            User.username, 
            Shoe.brand, 
            Shoe.model, 
            Shoe.year, 
            Shoe.color, 
            COUNT(DISTINCT Likes.likes_id) as like_count, 
            COUNT(DISTINCT Comment.comment_id) as comment_count
        FROM Post 
        LEFT JOIN User on Post.creator_id = User.user_id
        LEFT JOIN Shoe on Post.related_shoe_id = Shoe.shoe_id
        LEFT JOIN Likes on Post.post_id = Likes.post_id
        LEFT JOIN Comment on Post.post_id = Comment.post_id
        WHERE Post.creator_id = ?
        GROUP BY Post.post_id
        ORDER BY Post.date DESC
        """
        cursor.execute(query, (user_id,))
        posts = [
            dict(
                post_id=row[0],
                caption=row[1],
                picture_url=row[2],
                is_selling=row[3],
                price=row[4],
                selling_link=row[5],
                date=row[6],
                creator=row[7],
                brand=row[8],
                model=row[9],
                year=row[10],
                color=row[11],
                like_count=row[12],
                comment_count=row[13],
            )
            for row in cursor.fetchall()
        ]
        cursor.close()

    return posts

def delete_post_by_id(user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM Post WHERE post_id = ?", (user_id,))
        connection.commit()
        deleted = cursor.rowcount > 0
        cursor.close()
    return deleted

def update_post_by_id(
    post_id, caption, picture_url, is_selling, price, selling_link, date
):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE Post SET caption = ?, picture_url = ?, is_selling = ?, price = ?, selling_link = ?, date = ? WHERE post_id = ?",
            (caption, picture_url, is_selling, price, selling_link, date, post_id),
        )
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated

def add_post_to_database(
    caption,
    picture_url,
    is_selling,
    price,
    selling_link,
    date,
    creator_id,
    related_shoe_id,
):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO Post (caption, picture_url, is_selling, price, selling_link, date, creator_id, related_shoe_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (
                caption,
                picture_url,
                is_selling,
                price,
                selling_link,
                date,
                creator_id,
                related_shoe_id,
            ),
        )
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated


#Shoe specific.
def get_all_shoes():
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Shoe")
        shoes = [
            dict(shoe_id=row[0], brand=row[1], model=row[2], year=row[3], color=row[4])
            for row in cursor.fetchall()
        ]
        cursor.close()
    return shoes

def get_shoe_by_id(shoe_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Shoe WHERE shoe_id = ?", (shoe_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return dict(
                shoe_id=row[0], brand=row[1], model=row[2], year=row[3], color=row[4]
            )
    return None

def delete_shoe_by_id(shoe_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM Shoe WHERE shoe_id = ?", (shoe_id,))
        connection.commit()
        deleted = cursor.rowcount > 0
        cursor.close()
    return deleted

def update_shoe_by_id(shoe_id, brand, model, year, color):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE Shoe SET brand = ?, model = ?, year = ?, color = ? WHERE shoe_id = ?",
            (brand, model, year, color, shoe_id),
        )
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated

def add_shoe_to_database(brand, model, year, color):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO Shoe (brand, model, year, color) VALUES (?, ?, ?, ?)",
            (brand, model, year, color),
        )
        connection.commit()
        rowid = cursor.lastrowid
        cursor.close()
    return rowid

def get_all_shoe_brands():
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT DISTINCT brand FROM Shoe")
        brands = [row[0] for row in cursor.fetchall()]
        cursor.close()
    return brands

def get_all_shoe_models(brand):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT DISTINCT model FROM Shoe WHERE brand = ?", (brand,))
        models = [row[0] for row in cursor.fetchall()]
        cursor.close()
    return models

def get_all_shoe_colors():
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT DISTINCT color FROM Shoe")
        colors = [row[0] for row in cursor.fetchall()]
        cursor.close()
    return colors

def get_shoe_id(brand, model, year, color):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT shoe_id FROM Shoe WHERE brand = ? AND model = ? AND year = ? AND color = ?",
            (brand, model, year, color),
        )
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row[0]
    return None


#Profile Metrics.
def number_of_followers(user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Followers WHERE followee = ?", (user_id,))
        rows = cursor.fetchall()

        cursor.close()
    return len(rows)

def number_of_following(user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Followers WHERE follower = ?", (user_id,))
        rows = cursor.fetchall()

        cursor.close()
    return len(rows)

def unfollow(user_id, other_user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM Followers WHERE follower = ? AND followee = ?",
            (user_id, other_user_id),
        )
        connection.commit()
        cursor.close()

def follow(user_id, other_user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO Followers (follower, followee) VALUES (?, ?)",
            (other_user_id, user_id),
        )
        connection.commit()
        cursor.close()

def is_following(user_id, other_user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM Followers WHERE follower = ? AND followee = ?",
            (user_id, other_user_id),
        )
        rows = cursor.fetchall()
        cursor.close()
        if rows:
            return True
    return False


#Post Interaction.
def add_comment_to_post(post_id, user_id, text, date):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO Comment (creator_id, post_id, text, date) VALUES (?, ?, ?, ?)",
            (user_id, post_id, text, date),
        )
        connection.commit()
        cursor.close()

def get_post_comments(post_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            SELECT Comment.comment_id, Comment.text, Comment.date, Comment.creator_id, Comment.post_id, User.username
            FROM Comment
            JOIN User ON Comment.creator_id = User.user_id
            WHERE Comment.post_id = ?
            ORDER BY Comment.date ASC
        """,
            (post_id,),
        )
        comments = [
            dict(
                comment_id=row[0],
                text=row[1],
                date=row[2],
                creator_id=row[3],
                post_id=row[4],
                username=row[5],
            )
            for row in cursor.fetchall()
        ]
        cursor.close()
    return comments

def db_like_post(post_id, user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO Likes (user_id, post_id) VALUES (?, ?)", (user_id, post_id)
        )
        connection.commit()
        cursor.close()

def db_unlike_post(post_id, user_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM Likes WHERE user_id = ? AND post_id = ?", (user_id, post_id)
        )
        connection.commit()
        cursor.close()

def get_post_likes(post_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Likes WHERE post_id = ?", (post_id,))
        rows = cursor.fetchall()
        cursor.close()
    return len(rows)

def get_if_user_likes_post(user_id, post_id):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM Likes WHERE user_id = ? AND post_id = ?", (user_id, post_id)
        )
        rows = cursor.fetchall()
        cursor.close()
    if rows:
        return True
    return False

def search_for_users(query):
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User WHERE username LIKE ?", (f"%{query}%",))
        users = [
            dict(user_id=row[0], name=row[1], date_of_birth=row[3])
            for row in cursor.fetchall()
        ]
        cursor.close()
    return users
def search_for_posts(search_query):
    print(search_query)

    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        query = """
        SELECT 
            Post.post_id, 
            Post.caption, 
            Post.picture_url, 
            Post.is_selling, 
            Post.price, 
            Post.selling_link, 
            Post.date, 
            User.username, 
            Shoe.brand, 
            Shoe.model, 
            Shoe.year, 
            Shoe.color, 
            COUNT(DISTINCT Likes.likes_id) as like_count, 
            COUNT(DISTINCT Comment.comment_id) as comment_count
        FROM Post
        LEFT JOIN User on Post.creator_id = User.user_id
        LEFT JOIN Shoe on Post.related_shoe_id = Shoe.shoe_id
        LEFT JOIN Likes on Post.post_id = Likes.post_id
        LEFT JOIN Comment on Post.post_id = Comment.post_id
        WHERE Post.caption LIKE ?
        GROUP BY Post.post_id
        ORDER BY Post.date DESC
        LIMIT 10
        """
        cursor.execute(query, ( (f"%{search_query}%",)))
        posts = [
            dict(
                post_id=row[0],
                caption=row[1],
                picture_url=row[2],
                is_selling=row[3],
                price=row[4],
                selling_link=row[5],
                date=row[6],
                creator=row[7],
                brand=row[8],
                model=row[9],
                year=row[10],
                color=row[11],
                like_count=row[12],
                comment_count=row[13],
            )
            for row in cursor.fetchall()
        ]
        cursor.close()

    return posts

def search_for_shoe_posts(search_query):
    print(search_query)
    with sqlite3.connect("database.db") as connection:
        cursor = connection.cursor()
        query = """
        SELECT 
            Post.post_id, 
            Post.caption, 
            Post.picture_url, 
            Post.is_selling, 
            Post.price, 
            Post.selling_link, 
            Post.date, 
            User.username, 
            Shoe.brand, 
            Shoe.model, 
            Shoe.year, 
            Shoe.color, 
            COUNT(DISTINCT Likes.likes_id) as like_count, 
            COUNT(DISTINCT Comment.comment_id) as comment_count
        FROM Post
        LEFT JOIN User on Post.creator_id = User.user_id
        LEFT JOIN Shoe on Post.related_shoe_id = Shoe.shoe_id
        LEFT JOIN Likes on Post.post_id = Likes.post_id
        LEFT JOIN Comment on Post.post_id = Comment.post_id
        WHERE Shoe.brand LIKE ? OR Shoe.model LIKE ? OR Shoe.year LIKE ? OR Shoe.color LIKE ?
        GROUP BY Post.post_id
        ORDER BY Post.date DESC
        LIMIT 10
        """
        cursor.execute(query, ( (f"%{search_query}%",)))
        posts = [
            dict(
                post_id=row[0],
                caption=row[1],
                picture_url=row[2],
                is_selling=row[3],
                price=row[4],
                selling_link=row[5],
                date=row[6],
                creator=row[7],
                brand=row[8],
                model=row[9],
                year=row[10],
                color=row[11],
                like_count=row[12],
                comment_count=row[13],
            )
            for row in cursor.fetchall()
        ]
        cursor.close()

    return posts

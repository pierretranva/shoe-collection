import sqlite3
import bcrypt


def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def check_password(input_password, stored_hashed_password):
    return bcrypt.checkpw(input_password.encode('utf-8'), stored_hashed_password)


def create_user(username, password, date_of_birth, hometown):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        password = hash_password(password)
        cursor.execute("INSERT INTO User (username, password, date_of_birth, hometown) VALUES (?, ?, ?, ?)",
                       (username, password, date_of_birth, hometown))
        connection.commit()
        cursor.close()


def create_admin(username, password):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        password = hash_password(password)
        cursor.execute("INSERT INTO Admin (username, password) VALUES (?, ?)", (username, password))
        connection.commit()
        cursor.close()


con = sqlite3.connect('database.db', timeout=1.0)
cur = con.cursor()

try:
    cur.execute("SELECT * FROM User")
    cur.close()
    con.close()
except:
    with open('schema.sql', 'r') as sql_file:
        sql_script = sql_file.read()

    cur.executescript(sql_script)
    cur.close()
    con.close()
    create_admin("admin", "password")


def get_all_users():
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User")
        users = [dict(user_id=row[0], name=row[1], date_of_birth=row[3]) for row in cursor.fetchall()]
        cursor.close()
    return users


def get_user_by_id(user_id):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User WHERE user_id = ?", (user_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return dict(user_id=row[0], name=row[1], date_of_birth=row[3])
    return None


def delete_user_by_id(user_id):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM User WHERE user_id = ?", (user_id,))
        connection.commit()
        deleted = cursor.rowcount > 0
        cursor.close()
    return deleted


def update_user_by_id(user_id, name, date_of_birth, home_town):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("UPDATE User SET username = ?, date_of_birth = ?, hometown = ? WHERE user_id = ?",
                       (name, date_of_birth, home_town, user_id))
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated


def add_user_to_database(username, password, date_of_birth, hometown):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        password = hash_password(password)
        cursor.execute("INSERT or IGNORE INTO User (username, password, date_of_birth, hometown) VALUES (?, ?, ?, ?)",
                       (username, password, date_of_birth, hometown))
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated


def get_user_by_name(name):
    with sqlite3.connect('database.db') as connection:
        connection = sqlite3.connect('database.db')
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM User WHERE username LIKE ?", (f"%{name}%",))
        users = [dict(user_id=row[0], name=row[1], date_of_birth=row[3]) for row in cursor.fetchall()]
        cursor.close()
    return users


def get_all_posts():
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Post ORDER BY date DESC")
        posts = [dict(post_id=row[0], caption=row[1], picture_url=row[2], is_selling=row[3], price=row[4],
                      selling_link=row[5], date=row[6]) for row in cursor.fetchall()]
        cursor.close()
    return posts


def get_post_by_id(post_id):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Post WHERE post_id = ?", (post_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return dict(post_id=row[0], caption=row[1], picture_url=row[2], is_selling=row[3], price=row[4],
                        selling_link=row[5], date=row[6])
    return None


def delete_post_by_id(user_id):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM Post WHERE post_id = ?", (user_id,))
        connection.commit()
        deleted = cursor.rowcount > 0
        cursor.close()
    return deleted


def update_post_by_id(post_id, caption, picture_url, is_selling, price, selling_link, date):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE Post SET caption = ?, picture_url = ?, is_selling = ?, price = ?, selling_link = ?, date = ? WHERE post_id = ?",
            (caption, picture_url, is_selling, price, selling_link, date, post_id))
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated


def get_all_shoes():
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Shoe")
        shoes = [dict(shoe_id=row[0], brand=row[1], model=row[2], year=row[3], color=row[4]) for row in
                 cursor.fetchall()]
        cursor.close()
    return shoes


def get_shoe_by_id(shoe_id):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Shoe WHERE shoe_id = ?", (shoe_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return dict(shoe_id=row[0], brand=row[1], model=row[2], year=row[3], color=row[4])
    return None


def delete_shoe_by_id(shoe_id):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM Shoe WHERE shoe_id = ?", (shoe_id,))
        connection.commit()
        deleted = cursor.rowcount > 0
        cursor.close()
    return deleted


def update_shoe_by_id(shoe_id, brand, model, year, color):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("UPDATE Shoe SET brand = ?, model = ?, year = ?, color = ? WHERE shoe_id = ?",
                       (brand, model, year, color, shoe_id))
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated


def add_shoe_to_database(brand, model, year, color):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("INSERT INTO Shoe (brand, model, year, color) VALUES (?, ?, ?, ?)",
                       (brand, model, year, color))
        connection.commit()
        rowid = cursor.lastrowid
        cursor.close()
        connection.close()
    return rowid


def add_post_to_database(caption, picture_url, is_selling, price, selling_link, date, creator_id, related_shoe_id):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO Post (caption, picture_url, is_selling, price, selling_link, date, creator_id, related_shoe_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (caption, picture_url, is_selling, price, selling_link, date, creator_id, related_shoe_id))
        connection.commit()
        updated = cursor.rowcount > 0
        cursor.close()
    return updated


def get_all_shoe_brands():
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT DISTINCT brand FROM Shoe")
        brands = [row[0] for row in cursor.fetchall()]
        cursor.close()
    return brands


def get_all_shoe_models(brand):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT DISTINCT model FROM Shoe WHERE brand = ?", (brand,))
        models = [row[0] for row in cursor.fetchall()]
        cursor.close()
    return models


def get_all_shoe_colors():
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT DISTINCT color FROM Shoe")
        colors = [row[0] for row in cursor.fetchall()]
        cursor.close()
    return colors


def get_shoe_id(brand, model, year, color):
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT shoe_id FROM Shoe WHERE brand = ? AND model = ? AND year = ? AND color = ?",
                       (brand, model, year, color))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row[0]
    return None


def verify_admin(username, password):
    with sqlite3.connect('database.db') as connection:
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
    with sqlite3.connect('database.db') as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT password FROM User WHERE username == ?", (username,))
        row = cursor.fetchone()
        cursor.close()

        if row:
            stored_password = row[0]
            if check_password(password, stored_password):
                return True
    return False

import sqlite3
import bcrypt

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def check_password(input_password, stored_hashed_password):
    return bcrpyy.checkpw(input_password.encode('utf-8'), stored_hashed_password)


def create_user(username, password, date_of_birth, hometown):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    password = hash_password(password)
    cursor.execute("INSERT INTO User (username, password, date_of_birth, hometown) VALUES (?, ?, ?, ?)",
                (username, password, date_of_birth, hometown))
    connection.commit()
    connection.close()


def create_admin(username, password):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    password = hash_password(password)
    cursor.execute("INSERT INTO Admin (username, password) VALUES (?, ?)", (username, password))
    connection.commit()
    connection.close()



con = sqlite3.connect('database.db', timeout=1.0)
cur = con.cursor()


try:
    cur.execute("SELECT * FROM User")
    con.close()
except:
    with open('schema.sql', 'r') as sql_file:
        sql_script = sql_file.read()

    cur.executescript(sql_script)
    con.close()


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
    posts = [dict(post_id=row[0], caption=row[1], picture_url=row[2], is_selling=row[3], price=row[4], selling_link=row[5], date=row[6]) for row in cursor.fetchall()]
    connection.close()
    return posts


def get_post_by_id(post_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Post WHERE post_id = ?", (post_id,))
    row = cursor.fetchone()
    connection.close()
    if row:
        return dict(post_id=row[0], caption=row[1], picture_url=row[2], is_selling=row[3], price=row[4], selling_link=row[5], date=row[6])
    return None


def delete_post_by_id(user_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("DELETE FROM Post WHERE post_id = ?", (user_id,))
    connection.commit()
    deleted = cursor.rowcount > 0
    connection.close()
    return deleted


def update_post_by_id(post_id, caption, picture_url, is_selling, price, selling_link, date):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("UPDATE Post SET caption = ?, picture_url = ?, is_selling = ?, price = ?, selling_link = ?, date = ? WHERE post_id = ?",
                   (caption, picture_url, is_selling, price, selling_link, date, post_id))
    connection.commit()
    updated = cursor.rowcount > 0
    connection.close()
    return updated


def get_all_shoes():
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Shoe")
    shoes = [dict(shoe_id=row[0], brand=row[1], model=row[2], year=row[3], color=row[4]) for row in cursor.fetchall()]
    connection.close()
    return shoes


def get_shoe_by_id(shoe_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Shoe WHERE shoe_id = ?", (shoe_id,))
    row = cursor.fetchone()
    connection.close()
    if row:
        return dict(shoe_id=row[0], brand=row[1], model=row[2], year=row[3], color=row[4])
    return None


def delete_shoe_by_id(shoe_id):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("DELETE FROM Shoe WHERE shoe_id = ?", (shoe_id,))
    connection.commit()
    deleted = cursor.rowcount > 0
    connection.close()
    return deleted


def update_shoe_by_id(shoe_id, brand, model, year, color):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("UPDATE Shoe SET brand = ?, model = ?, year = ?, color = ? WHERE shoe_id = ?",
                   (brand, model, year, color, shoe_id))
    connection.commit()
    updated = cursor.rowcount > 0
    connection.close()
    return updated


def add_shoe_to_database(brand, model, year, color):
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO Shoe (brand, model, year, color) VALUES (?, ?, ?, ?)",
                   (brand, model, year, color))
    connection.commit()
    updated = cursor.rowcount > 0
    connection.close()
    return updated

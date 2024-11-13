--Tables

CREATE TABLE IF NOT EXISTS Admin (
    admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT);


CREATE TABLE IF NOT EXISTS User (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    date_of_birth TEXT, -- Use TEXT to store dates in ISO 8601 format ('YYYY-MM-DD')
    hometown TEXT);


CREATE TABLE IF NOT EXISTS Post (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    caption TEXT,
    picture_url TEXT,
    is_selling INTEGER,
    price REAL,
    selling_link TEXT,
    date TEXT, -- Use TEXT to store dates in ISO 8601 format ('YYYY-MM-DD')
    creator_id INTEGER,
    related_shoe_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES User(user_id),
    FOREIGN KEY (related_shoe_id) REFERENCES Shoe(shoe_id));


CREATE TABLE IF NOT EXISTS Shoe (
    shoe_id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    year INTEGER,
    color TEXT);


CREATE TABLE IF NOT EXISTS Followers (
    followers_id INTEGER PRIMARY KEY AUTOINCREMENT,
    follower INTEGER,
    followee INTEGER,
    FOREIGN KEY (follower) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followee) REFERENCES User(user_id) ON DELETE CASCADE);


CREATE TABLE IF NOT EXISTS Likes (
    likes_id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE);


CREATE TABLE IF NOT EXISTS Comment (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    date TEXT,
    creator_id INTEGER,
    post_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE);


-- Data
INSERT INTO Shoe (brand, model, year, color) VALUES
    ('Nike', 'Air Max', 2020, 'Red'),
    ('Adidas', 'Ultraboost', 2019, 'Black'),
    ('Puma', 'RS-X', 2021, 'White'),
    ('Reebok', 'Classic', 2018, 'Blue'),
    ('Asics', 'Gel-Lyte', 2022, 'Green'),
    ('New Balance', '990v5', 2020, 'Grey'),
    ('Nike', 'Jordan 1', 2021, 'Red/Black'),
    ('Adidas', 'NMD', 2019, 'White/Blue'),
    ('Puma', 'Suede', 2020, 'Black/Gold'),
    ('Reebok', 'Nano X', 2022, 'Orange'),
    ('Asics', 'Kayano', 2019, 'Pink'),
    ('New Balance', '574', 2021, 'Navy'),
    ('Nike', 'Pegasus', 2020, 'Yellow'),
    ('Adidas', 'Superstar', 2018, 'White/Black'),
    ('Puma', 'Ignite', 2021, 'Purple'),
    ('Reebok', 'Zig Kinetica', 2020, 'Green'),
    ('Asics', 'Nimbus', 2022, 'Blue/White'),
    ('New Balance', '1080v11', 2021, 'Red'),
    ('Nike', 'Air Force 1', 2019, 'White'),
    ('Adidas', 'Gazelle', 2020, 'Black'),
    ('Puma', 'Future Rider', 2022, 'Blue/Red'),
    ('Reebok', 'Club C', 2018, 'White/Green'),
    ('Asics', 'Quantum 360', 2021, 'Black/Gold'),
    ('New Balance', '1500', 2019, 'Grey/Orange'),
    ('Nike', 'Blazer', 2020, 'Green'),
    ('Adidas', 'Stan Smith', 2021, 'White/Green'),
    ('Puma', 'Cali', 2022, 'Pink/White'),
    ('Reebok', 'Pump', 2019, 'Blue/Yellow'),
    ('Asics', 'Noosa Tri', 2020, 'Multi-color'),
    ('New Balance', '997H', 2021, 'Black/Red');

INSERT INTO Post (caption, picture_url, is_selling, price, selling_link, date, creator_id, related_shoe_id) VALUES
    ('Great shoes for running!', 'url1', 1, 120.0, 'link1', '2024-01-01', 1, 1),
    ('Stylish and comfortable', 'url2', 0, NULL, NULL, '2024-01-02', 2, 2),
    ('Limited edition sneakers', 'url3', 1, 200.0, 'link3', '2024-01-03', 3, 3),
    ('Perfect for workouts', 'url4', 1, 100.0, 'link4', '2024-01-04', 4, 4),
    ('Vintage look!', 'url5', 0, NULL, NULL, '2024-01-05', 5, 5),
    ('Brand new release', 'url6', 1, 150.0, 'link6', '2024-01-06', 6, 6),
    ('Classic sneakers', 'url7', 1, 110.0, 'link7', '2024-01-07', 7, 7),
    ('Comfortable walking shoes', 'url8', 0, NULL, NULL, '2024-01-08', 8, 8),
    ('Great for sports', 'url9', 1, 130.0, 'link9', '2024-01-09', 9, 9),
    ('Trendy and fashionable', 'url10', 0, NULL, NULL, '2024-01-10', 10, 10),
    ('Amazing design!', 'url11', 1, 140.0, 'link11', '2024-01-11', 11, 11),
    ('All-day comfort', 'url12', 0, NULL, NULL, '2024-01-12', 12, 12),
    ('Top-notch quality', 'url13', 1, 160.0, 'link13', '2024-01-13', 13, 13),
    ('Limited stock available', 'url14', 1, 170.0, 'link14', '2024-01-14', 14, 14),
    ('Classic design', 'url15', 0, NULL, NULL, '2024-01-15', 15, 15),
    ('Perfect for casual wear', 'url16', 1, 90.0, 'link16', '2024-01-16', 16, 16),
    ('Sporty and stylish', 'url17', 0, NULL, NULL, '2024-01-17', 17, 17),
    ('High performance', 'url18', 1, 180.0, 'link18', '2024-01-18', 18, 18),
    ('Comfortable fit', 'url19', 0, NULL, NULL, '2024-01-19', 19, 19),
    ('Great for running', 'url20', 1, 120.0, 'link20', '2024-01-20', 20, 20),
    ('Best sneakers this year', 'url21', 1, 190.0, 'link21', '2024-01-21', 21, 21),
    ('Stylish and affordable', 'url22', 0, NULL, NULL, '2024-01-22', 22, 22),
    ('Durable and comfy', 'url23', 1, 100.0, 'link23', '2024-01-23', 23, 23),
    ('Latest trend', 'url24', 1, 150.0, 'link24', '2024-01-24', 24, 24),
    ('Unique colorway', 'url25', 0, NULL, NULL, '2024-01-25', 25, 25),
    ('Best value for money', 'url26', 1, 110.0, 'link26', '2024-01-26', 26, 26),
    ('Classic look', 'url27', 1, 120.0, 'link27', '2024-01-27', 27, 27),
    ('Great for all activities', 'url28', 0, NULL, NULL, '2024-01-28', 28, 28),
    ('Awesome sneakers', 'url29', 1, 130.0, 'link29', '2024-01-29', 29, 29),
    ('New collection', 'url30', 0, NULL, NULL, '2024-01-30', 30, 30);
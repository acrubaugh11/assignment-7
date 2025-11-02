
CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE jokes(
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    setup TEXT NOT NULL,
    delivery TEXT NOT NULL
);

INSERT INTO categories VALUES ('funnyJoke'), ('lameJoke')
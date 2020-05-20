DROP TABLE IF EXISTS people;

CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

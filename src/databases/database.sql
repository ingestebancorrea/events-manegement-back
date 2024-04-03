CREATE DATABASE event_managenement_db;

CREATE TABLE locations (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    latitude DECIMAL(10, 8),
    length DECIMAL(11, 8)
);

CREATE TABLE events (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE attendances (
    id INT PRIMARY KEY,
    user_id INT,
    event_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

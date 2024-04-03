CREATE DATABASE event_managenement_db;

CREATE TABLE event(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email Text
);
CREATE DATABASE mapqueue;

-- Run "/c mapqueue" to Change Into Newly Created Database

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL UNIQUE,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_osu_name VARCHAR(255),
    user_bio VARCHAR(255),
    user_queues INTEGER [],
    user_favorites INTEGER [],
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

CREATE TABLE queues(
    queue_id INTEGER,
    queue_creator UUID,
    queue_favorites INTEGER DEFAULT 0,
    queue_description VARCHAR(255),
    queue_beatmaps INTEGER [],
    PRIMARY KEY (queue_ID),
    FOREIGN KEY (queue_creator) REFERENCES users(user_id)
);
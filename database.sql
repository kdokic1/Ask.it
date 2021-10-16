CREATE TABLE IF NOT EXISTS users (
    id serial NOT NULL PRIMARY KEY,
    first_name text,
    last_name text,
    email text NOT NULL,
    password text NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id serial NOT NULL PRIMARY KEY,
    user_id integer NOT NULL,
    title text NOT NULL,
    description text,
    date timestamp without time zone NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS notifications (
    id serial NOT NULL PRIMARY KEY,
    user_to_notify integer NOT NULL,
    user_who_fired_event integer NOT NULL,
    question_id integer NOT NULL,
    seen_by_user boolean,
    event text,
    FOREIGN KEY (question_id) REFERENCES questions (id),
    FOREIGN KEY (user_to_notify) REFERENCES users (id),
    FOREIGN KEY (user_who_fired_event) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS likes (
    id serial NOT NULL PRIMARY KEY,
    user_id integer NOT NULL,
    question_id integer NOT NULL,
    is_like boolean,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (question_id) REFERENCES questions (id)
);

CREATE TABLE IF NOT EXISTS answers (
    id serial NOT NULL PRIMARY KEY,
    user_id integer NOT NULL,
    question_id integer NOT NULL,
    description text NOT NULL,
    date timestamp without time zone NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (question_id) REFERENCES questions (id)
);
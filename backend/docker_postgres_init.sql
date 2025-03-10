CREATE TABLE IF NOT EXISTS tbl_user (
                                        id SERIAL PRIMARY KEY,
                                        username VARCHAR(40) NOT NULL UNIQUE
    );

CREATE TABLE IF NOT EXISTS tbl_media (
                                         id SERIAL PRIMARY KEY,
                                         url VARCHAR(1024) NOT NULL,
    title VARCHAR(80) NOT NULL,
    owner_id INTEGER NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES tbl_user(id)
    );

CREATE TABLE IF NOT EXISTS tbl_favourites (
                                              id SERIAL PRIMARY KEY,
                                              user_id INTEGER NOT NULL,
                                              media_id INTEGER NOT NULL,
                                              FOREIGN KEY (user_id) REFERENCES tbl_user(id),
    FOREIGN KEY (media_id) REFERENCES tbl_media(id) ON DELETE CASCADE
    );

create table if not exists tbl_user
(
    id       serial  primary key,
    username varchar not null
);

create table if not exists tbl_media
(
    id      serial                  primary key,
    url     varchar                 not null,
    title   varchar                 not null,
    created timestamp default now() not null,
    user_id integer
        constraint fk_media_user_id
            references tbl_user
);

create table if not exists tbl_favourites
(
    id       serial  primary key,
    user_id  integer
        constraint fk_fav_user_id
            references tbl_user,
    media_id integer
        constraint fk_fav_media_id
            references tbl_media
);

create unique index if not exists idx_fav_user_media
    on tbl_favourites (user_id, media_id);


INSERT INTO tbl_user (id, username) VALUES (1, 'phillip');
INSERT INTO tbl_user (id, username) VALUES (2, 'sharyn');
INSERT INTO tbl_user (id, username) VALUES (3, 'testuser');
INSERT INTO tbl_user (id, username) VALUES (8, 'John doe');
INSERT INTO tbl_user (id, username) VALUES (4, 'john smith');
INSERT INTO tbl_user (id, username) VALUES (7, 'Michaela');
INSERT INTO tbl_user (id, username) VALUES (6, 'tom');
INSERT INTO tbl_user (id, username) VALUES (5, 'test user');

INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (1, 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Pug dog', '2025-03-10 07:21:49.305481', 5);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (2, 'https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Squirrel', '2025-03-10 07:21:49.305481', 5);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (3, 'https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Tiger', '2025-03-10 07:21:49.305481', 5);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (4, 'https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Giraffes', '2025-03-10 11:29:33.966891', 5);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (5, 'https://images.pexels.com/photos/37833/rainbow-lorikeet-parrots-australia-rainbow-37833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Lorikeet parrots', '2025-03-10 11:36:08.512158', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (6, 'https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Two Zebras', '2025-03-14 12:31:51.595190', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (7, 'https://images.pexels.com/photos/60023/baboons-monkey-mammal-freeze-60023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Baboon monkeys', '2025-03-11 09:19:00.186582', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (9, 'https://images.pexels.com/photos/1216482/pexels-photo-1216482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Rooster', '2025-03-15 09:44:05.008856', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (10, 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Kingfisher', '2025-03-15 09:44:59.557091', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (11, 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Kitten', '2025-03-15 09:45:37.117276', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (12, 'https://images.pexels.com/photos/62289/yemen-chameleon-chamaeleo-calyptratus-chameleon-reptile-62289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Yellow and green lizard', '2025-03-15 09:46:28.372936', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (13, 'https://images.pexels.com/photos/53581/bald-eagles-bald-eagle-bird-of-prey-adler-53581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Bald Eagle', '2025-03-15 09:47:08.857511', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (14, 'https://images.pexels.com/photos/288621/pexels-photo-288621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Sheep', '2025-03-15 09:48:15.775301', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (15, 'https://images.pexels.com/photos/1321524/pexels-photo-1321524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Butterflys', '2025-03-15 09:48:50.308532', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (16, 'https://images.pexels.com/photos/52509/penguins-emperor-antarctic-life-52509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Emperor penguins', '2025-03-15 09:50:23.201737', 1);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (17, 'https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Panda', '2025-03-15 09:52:14.931263', 6);
INSERT INTO tbl_media (id, url, title, created, user_id) VALUES (18, 'https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Blue whale', '2025-03-15 09:52:44.904894', 6);

INSERT INTO tbl_favourites (id, user_id, media_id) VALUES (1, 1, 2);
INSERT INTO tbl_favourites (id, user_id, media_id) VALUES (2, 1, 3);
INSERT INTO tbl_favourites (id, user_id, media_id) VALUES (3, 1, 6);
INSERT INTO tbl_favourites (id, user_id, media_id) VALUES (4, 1, 1);
INSERT INTO tbl_favourites (id, user_id, media_id) VALUES (5, 1, 7);
INSERT INTO tbl_favourites (id, user_id, media_id) VALUES (6, 5, 7);
INSERT INTO tbl_favourites (id, user_id, media_id) VALUES (7, 8, 7);

SELECT setval('tbl_user_id_seq', (SELECT COALESCE(MAX(id), 0) FROM tbl_user) + 1);
SELECT setval('tbl_media_id_seq', (SELECT COALESCE(MAX(id), 0) FROM tbl_media) + 1);
SELECT setval('tbl_favourites_id_seq', (SELECT COALESCE(MAX(id), 0) FROM tbl_favourites) + 1);

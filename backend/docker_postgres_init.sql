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

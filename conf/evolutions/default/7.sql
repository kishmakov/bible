# --- !Ups

create table `specifications` (
    `lang` VARCHAR(5) not null,
    `book_id` VARCHAR(10) not null,
    `chapter` INTEGER not null,
    `verse` INTEGER not null,
    `type` VARCHAR(10) not null,
    `text` VARCHAR(200) not null,
    `link` VARCHAR(200),
    `info` VARCHAR(200));

create index `specifications_index` on `specifications` (`lang`, `book_id`, `chapter`, `verse`);

# --- !Downs

drop table `specifications`;


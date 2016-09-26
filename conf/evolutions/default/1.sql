# --- !Ups

create table `books` (
    `prev_book_id` VARCHAR(10) not null,
    `prev_chapters` INTEGER not null,
    `book_id` VARCHAR(10) not null primary key,
    `chapters` INTEGER not null,
    `next_book_id` VARCHAR(10) not null,
    `next_chapters` INTEGER not null);

create index `books_index` on `books` (`book_id`);

create table `headers` (
    `lang` VARCHAR(5) not null,
    `book_id` VARCHAR(10) not null,
    `name` VARCHAR(50) not null,
    `short_name` VARCHAR(50),
    `clarification` VARCHAR(50),
    `presented` BOOLEAN);

create index `headers_index` on `headers` (`lang`, `book_id`);
alter table `headers` add primary key (`lang`, `book_id`);

create table `supported_langs` (
    `lang` VARCHAR(5) not null,
    `self_name` VARCHAR(50) not null);

alter table `supported_langs` add primary key (`lang`);

create table `verses` (
    `lang` VARCHAR(5) not null,
    `book_id` VARCHAR(10) not null,
    `chapter` INTEGER not null,
    `verse` INTEGER not null,
    `text` VARCHAR(500) not null);

alter table `verses` add primary key (`lang`, `book_id`, `chapter`, `verse`);

# --- !Downs

drop table `books`;
drop table `headers`;
drop table `supported_langs`;
drop table `verses`;


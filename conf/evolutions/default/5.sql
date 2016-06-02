# --- !Ups

create table `books` (
    `prev_book_id` VARCHAR(10) not null,
    `prev_chapters` INTEGER not null,
    `book_id` VARCHAR(10) not null primary key,
    `chapters` INTEGER not null,
    `next_book_id` VARCHAR(10) not null,
    `next_chapters` INTEGER not null);

create index `books_index` on `books` (`book_id`);

# --- !Downs

drop table `books`;


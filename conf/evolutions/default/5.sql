# --- !Ups

create table `books` (
    `book_id` VARCHAR(10) not null primary key,
    `chapters` INTEGER not null,
    `next_book` VARCHAR(10) not null,
    `prev_book` VARCHAR(10) not null);

create index `books_index` on `books` (`book_id`);

# --- !Downs

drop table `books`;


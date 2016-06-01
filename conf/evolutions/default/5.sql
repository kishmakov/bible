# --- !Ups

create table `books` (
    `book` VARCHAR(10) not null primary key,
    `chapters` INTEGER not null,
    `next_book` VARCHAR(10) not null,
    `prev_book` VARCHAR(10) not null);

create index `books_index` on `books` (`book`);

# --- !Downs

drop table `books`;


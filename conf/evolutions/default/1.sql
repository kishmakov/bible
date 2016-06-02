# --- !Ups

create table `headers` (
    `locale` VARCHAR(10) not null,
    `book_id` VARCHAR(10) not null,
    `name` VARCHAR(50) not null,
    `modern_name` VARCHAR(50));

create index `headers_index` on `headers` (`locale`, `book_id`);

# --- !Downs

drop table `headers`;


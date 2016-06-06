# --- !Ups

create table `headers` (
    `lang` VARCHAR(10) not null,
    `book_id` VARCHAR(10) not null,
    `name` VARCHAR(50) not null,
    `short_name` VARCHAR(50),
    `clarification` VARCHAR(50),
    `presented` BOOLEAN);

create index `headers_index` on `headers` (`lang`, `book_id`);
alter table `headers` add primary key (`lang`, `book_id`);

# --- !Downs

drop table `headers`;


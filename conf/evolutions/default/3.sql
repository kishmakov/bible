# --- !Ups

create table `verses` (
    `lang` VARCHAR(5) not null,
    `book_id` VARCHAR(10) not null,
    `chapter` INTEGER not null,
    `verse` INTEGER not null,
    `text` VARCHAR(500) not null,
    `specifiable` BOOLEAN default false);

alter table `verses` add primary key (`lang`, `book_id`, `chapter`, `verse`);

# --- !Downs

drop table `verses`;


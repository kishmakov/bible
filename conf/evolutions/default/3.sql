# --- !Ups

create table `verses` (
    `lang` VARCHAR(5) not null,
    `book` VARCHAR(10) not null,
    `chapter` INTEGER not null,
    `verse` INTEGER not null,
    `text` VARCHAR(500) not null,
    `specifiable` BOOLEAN default true);

# --- !Downs

drop table `verses`;


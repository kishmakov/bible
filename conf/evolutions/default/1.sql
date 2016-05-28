# --- !Ups

create table `headers` (
    `locale` VARCHAR(10) not null,
    `code` VARCHAR(10) not null,
    `name` VARCHAR(50) not null,
    `modern_name` VARCHAR(50));

# --- !Downs

drop table `headers`;


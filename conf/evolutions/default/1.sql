# --- !Ups

create table `headers` (
    `locale` VARCHAR(10),
    `code` VARCHAR(10),
    `name` VARCHAR(50),
    `modern_name` VARCHAR(50));

# --- !Downs

drop table `headers`;


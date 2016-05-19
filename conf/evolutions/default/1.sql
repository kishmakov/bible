# --- !Ups

create table `testimonies_headers` (
    `locale` VARCHAR(5),
    `new_in_locale` VARCHAR(50),
    `old_in_locale` VARCHAR(50),
    `new_current` VARCHAR(50),
    `old_current` VARCHAR(50));

insert into `testimonies_headers` values ("ru_RU", "Новый Завет", "Ветхий Завет", "Новый Завет", "Ветхий Завет");

# --- !Downs

drop table `testimonies_headers`;


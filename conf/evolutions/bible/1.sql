# --- !Ups

create table `testimonies_headers` (
    `locale` VARCHAR(5),
    `new_testimony_canonical` VARCHAR(50),
    `old_testimony_canonical` VARCHAR(50),
    `new_testimony_current` VARCHAR(50),
    `old_testimony_current` VARCHAR(50))

# --- !Downs

drop table `testimonies_headers`;


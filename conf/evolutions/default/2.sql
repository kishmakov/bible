# --- !Ups

create table `parallel` (
  `lang` VARCHAR(5) not null,
  `src_book_id` VARCHAR(10) not null,
  `src_chapter` INTEGER not null,
  `src_verse` INTEGER not null,
  `dst_book_id` VARCHAR(10) not null,
  `dst_chapter` INTEGER not null,
  `dst_verse` INTEGER not null);

alter table `parallel` add primary key (`lang`, `src_book_id`, `src_chapter`, `src_verse`, `dst_book_id`, `dst_chapter`, `dst_verse`);
create index `parallel_index` on `parallel` (`lang`, `src_book_id`, `src_chapter`, `src_verse`);

# --- !Downs

drop table `parallel`;




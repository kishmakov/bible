# --- !Ups

create database bible
    default character set utf8
    default collate utf8_general_ci;

# --- !Downs

drop database bible;

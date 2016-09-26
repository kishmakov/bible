# --- !Ups

insert into `supported_langs` values
    ("chu", "Црькъвьнословѣ́ньскъ"),
    ("gr",              "Ελληνικά"),
    ("la",                "Latina"),
    ("ru",               "Русский");

# --- !Downs

truncate table `supported_langs`;




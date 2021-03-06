# --- !Ups

update `headers` set `presented`=true where `lang`="ru" and `book_id`="3In";

insert into `verses`
    (`lang`, `book_id`, `chapter`, `verse`, `text`)
    values
    ("ru", "3In", 1, 1, "Старец – возлюбленному Гаию, которого я люблю по истине."),
    ("ru", "3In", 1, 2, "Возлюбленный! молюсь, чтобы ты здравствовал и преуспевал во всем, как преуспевает душа твоя."),
    ("ru", "3In", 1, 3, "Ибо я весьма обрадовался, когда пришли братия и засвидетельствовали о твоей верности, как ты ходишь в истине."),
    ("ru", "3In", 1, 4, "Для меня нет бóльшей радости, как слышать, что дети мои ходят в истине."),
    ("ru", "3In", 1, 5, "Возлюбленный! ты как верный поступаешь в том, что делаешь для братьев и для странников."),
    ("ru", "3In", 1, 6, "Они засвидетельствовали перед церковью о твоей любви. Ты хорошо поступишь, если отпустишь их, как должно ради Бога,"),
    ("ru", "3In", 1, 7, "ибо они ради имени Его пошли, не взяв ничего от язычников."),
    ("ru", "3In", 1, 8, "Итак мы должны принимать таковых, чтобы сделаться споспешниками истине."),
    ("ru", "3In", 1, 9, "Я писал церкви;; но любящий первенствовать у них Диотреф не принимает нас."),
    ("ru", "3In", 1, 10, "Посему, если я приду, то напомню о делах, которые он делает, понося нас злыми словами, и не довольствуясь тем, и сам не принимает братьев, и запрещает желающим, и изгоняет из церкви."),
    ("ru", "3In", 1, 11, "Возлюбленный! не подражай злу, но добру. Кто делает добро, тот от Бога;; а делающий зло не видел Бога."),
    ("ru", "3In", 1, 12, "О Димитрии засвидетельствовано всеми и самою истиною;; свидетельствуем также и мы, и вы знаете, что свидетельство наше истинно."),
    ("ru", "3In", 1, 13, "Многое имел я писать;; но не хочу писать к тебе чернилами и тростью,"),
    ("ru", "3In", 1, 14, "а надеюсь скоро увидеть тебя и поговорить устами к устам."),
    ("ru", "3In", 1, 15, "Мир тебе. Приветствуют тебя друзья;; приветствуй друзей поименно. Аминь.");

# --- !Downs

update `headers` set `presented`=false where `lang`="ru" and `book_id`="3In";

delete from `verses` where `lang`="ru" and `book_id`="3In";

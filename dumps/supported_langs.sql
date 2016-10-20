DROP TABLE IF EXISTS `supported_langs`;
CREATE TABLE `supported_langs` (
  `lang` varchar(5) NOT NULL,
  `self_name` varchar(50) NOT NULL,
  PRIMARY KEY (`lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `supported_langs` VALUES ('chu','Црькъвьнословѣ́ньскъ'),('gr','Ελληνικά'),('la','Latina'),('ru','Русский');

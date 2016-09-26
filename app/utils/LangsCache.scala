package utils

import java.util.concurrent.ConcurrentHashMap
import javax.inject.{Inject, Singleton}

import models.{Lang, LangComponent}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.collection.JavaConverters._
import scala.collection._
import scala.util.{Failure, Success}

import slick.driver.JdbcProfile

@Singleton
class LangsCache @Inject()(val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] with LangComponent {
  import driver.api._

  private val codeToLang: concurrent.Map[String, Lang] = new ConcurrentHashMap[String, Lang] asScala

  def all() = codeToLang map {case (k, lang) => k -> lang.selfName} toMap

  db.run(allLangs.result).onComplete({
    case Success(langs) => langs foreach {lang => codeToLang += (lang.langId -> lang)}
    case Failure(exception) => println(exception)
  })
}

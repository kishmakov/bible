package utils

import java.util.concurrent.ConcurrentHashMap
import javax.inject.{Inject, Singleton}

import models.{HeaderComponent, Header}
import play.api.db.slick.{HasDatabaseConfigProvider, DatabaseConfigProvider}
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global
import scala.collection.JavaConverters._
import scala.collection._
import scala.util.{Failure, Success}

@Singleton
class HeadersCache @Inject()(val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] with HeaderComponent {
  private val langToHeaders: concurrent.Map[String, immutable.Map[String, Header]]
    = new ConcurrentHashMap[String, immutable.Map[String, Header]] asScala

  import driver.api._

  def apply(lang: String) = langToHeaders.get(lang)

  List("ru", "csu").foreach(lang => {
    db.run(allHeaders.filter(_.lang === lang).result).onComplete({
      case Success(list) => langToHeaders += (lang -> (list map (h => h.code -> h) toMap))
      case Failure(exception) => println(exception)
    })
  })
}

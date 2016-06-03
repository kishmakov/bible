package models

import javax.inject.{Inject, Singleton}

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile

import scala.concurrent.Future

case class Header(code: String,
                  name: String,
                  shortName: Option[String],
                  clarification: Option[String],
                  presented: Option[Boolean])

trait HeaderComponent extends HasDatabaseConfigProvider[JdbcProfile] {
  protected val driver: JdbcProfile

  import driver.api._

  class HeaderTable(tag: Tag) extends Table[Header](tag, "headers") {
    def locale        = column[String]("locale")
    def bookId        = column[String]("book_id")
    def name          = column[String]("name")
    def shortName     = column[Option[String]]("short_name")
    def clarification = column[Option[String]]("clarification")
    def presented     = column[Option[Boolean]]("presented")

    def * = (bookId, name, shortName, clarification, presented) <> (Header.tupled, Header.unapply)
  }

  val allHeaders = TableQuery[HeaderTable]
}

@Singleton
class HeadersDAO @Inject()(val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] with HeaderComponent {

  import driver.api._

  def findByLocale(locale: String): Future[Seq[Header]] = {
    db.run(allHeaders.filter(_.locale === locale).result)
  }

  def findByLocaleCode(locale: String, code: String): Future[Header] = {
    db.run(allHeaders.filter(h => h.locale === locale && h.bookId === code).result.head)
  }
}


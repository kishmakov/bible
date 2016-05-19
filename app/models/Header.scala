package models

import javax.inject.{Inject, Singleton}

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile

import scala.concurrent.Future

case class Header(newInLocale: String,
                  oldInLocale: String,
                  newCurrent: String,
                  oldCurrent: String)

trait HeaderComponent extends HasDatabaseConfigProvider[JdbcProfile] {
  protected val driver: JdbcProfile

  import driver.api._

  class HeaderTable(tag: Tag) extends Table[Header](tag, "testimonies_headers") {
    def locale      = column[String]("locale")
    def newInLocale = column[String]("new_in_locale")
    def oldInLocale = column[String]("old_in_locale")
    def newCurrent  = column[String]("new_current")
    def oldCurrent  = column[String]("old_current")

    def * = (newInLocale, oldInLocale, newCurrent, oldCurrent) <>
      (Header.tupled, Header.unapply)

  }

  val allHeaders = TableQuery[HeaderTable]
}

@Singleton
class HeadersDAO @Inject()(val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] with HeaderComponent {

  import driver.api._

  def findByLocale(locale: String): Future[Option[Header]] = {
    db.run(allHeaders.filter(_.locale === locale).result.headOption)
  }
}


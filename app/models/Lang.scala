package models

import play.api.db.slick.HasDatabaseConfigProvider
import slick.driver.JdbcProfile

case class Lang(langId: String,
                selfName: String)

trait LangComponent extends HasDatabaseConfigProvider[JdbcProfile] {
  protected val driver: JdbcProfile

  import driver.api._

  class LangTable(tag: Tag) extends Table[Lang](tag, "supported_langs") {
    def langId       = column[String]("lang")
    def selfName     = column[String]("self_name")

    def * = (langId, selfName) <> (Lang.tupled, Lang.unapply)
  }

  val allLangs = TableQuery[LangTable]
}
package models

import javax.inject.{Inject, Singleton}

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile

import scala.concurrent.Future

case class Verse(chapter: Int, verse: Int, text: String, specifiable: Boolean)

trait VerseComponent extends HasDatabaseConfigProvider[JdbcProfile] {
  protected val driver: JdbcProfile

  import driver.api._

  class VerseTable(tag: Tag) extends Table[Verse](tag, "verses") {
    def lang        = column[String]("lang")
    def book        = column[String]("book")
    def chapter     = column[Int]("chapter")
    def verse       = column[Int]("verse")
    def text        = column[String]("text")
    def specifiable = column[Boolean]("specifiable")

    def * = (chapter, verse, text, specifiable) <> (Verse.tupled, Verse.unapply)

  }

  val allVerses = TableQuery[VerseTable]
}

@Singleton
class VersesDAO @Inject()(val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] with VerseComponent {

  import driver.api._

  def findByLangBookChapter(lang: String, book: String, chapter: Int): Future[Seq[Verse]] = {
    db.run(allVerses.filter(v => v.lang === lang && v.book === book && v.chapter === chapter ).result)
  }
}



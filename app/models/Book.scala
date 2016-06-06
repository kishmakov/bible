package models

import javax.inject.{Inject, Singleton}

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile

import scala.concurrent.Future

case class Book(bookId: String,
                chapters: Int,
                nextId: String,
                nextChapters: Int,
                prevId: String,
                prevChapters: Int)

trait BookComponent extends HasDatabaseConfigProvider[JdbcProfile] {
  protected val driver: JdbcProfile

  import driver.api._

  class BookTable(tag: Tag) extends Table[Book](tag, "books") {
    def bookId       = column[String]("book_id")
    def chapters     = column[Int]("chapters")
    def nextId       = column[String]("next_book_id")
    def nextChapters = column[Int]("next_chapters")
    def prevId       = column[String]("prev_book_id")
    def prevChapters = column[Int]("prev_chapters")

    def * = (bookId, chapters, nextId, nextChapters, prevId, prevChapters) <> (Book.tupled, Book.unapply)
  }

  val allBooks = TableQuery[BookTable]
}

@Singleton
class BooksDAO @Inject()(val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] with BookComponent with HeaderComponent {

  import driver.api._

  def findByIdLang(bookId: String, lang: String): Future[(Book, Header)] = {
    val books = allBooks.filter(_.bookId === bookId)
    val headers = allHeaders.filter(_.lang === lang)
    val jn = books join headers on { case (book, header) => book.bookId === header.bookId }
    db.run(jn.result.head)
  }
}


package models

import javax.inject.{Inject, Singleton}

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile

import scala.concurrent.Future

case class Book(code: String,
                chapters: Int,
                nextBook: String,
                prevBook: String)

trait BookComponent extends HasDatabaseConfigProvider[JdbcProfile] {
  protected val driver: JdbcProfile

  import driver.api._

  class BookTable(tag: Tag) extends Table[Book](tag, "books") {
    def bookId   = column[String]("book_id")
    def chapters = column[Int]("chapters")
    def next     = column[String]("next_book")
    def prev     = column[String]("prev_book")

    def * = (bookId, chapters, next, prev) <> (Book.tupled, Book.unapply)
  }

  val allBooks = TableQuery[BookTable]
}

@Singleton
class BooksDAO @Inject()(val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] with BookComponent with HeaderComponent {

  import driver.api._

  def findByIdLocale(bookId: String, locale: String): Future[(Book, Header)] = {
    val books = allBooks.filter(_.bookId === bookId)
    val headers = allHeaders.filter(_.locale === locale)
    val jn = books join headers on { case (book, header) => book.bookId === header.bookId }
    db.run(jn.result.head)
  }
}


package models

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile

case class Book(book: String,
                chapter: Int,
                nextBook: String,
                prevBook: String)

trait BookComponent extends HasDatabaseConfigProvider[JdbcProfile] {
  protected val driver: JdbcProfile

  import driver.api._

  class BookTable(tag: Tag) extends Table[Book](tag, "books") {
    def book     = column[String]("book")
    def chapter  = column[Int]("chapter")
    def next     = column[String]("next_book")
    def prev     = column[String]("prev_book")

    def * = (book, chapter, next, prev) <> (Book.tupled, Book.unapply)
  }

  val allBooks = TableQuery[BookTable]
}

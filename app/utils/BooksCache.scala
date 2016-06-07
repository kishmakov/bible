package utils

import java.util.concurrent.ConcurrentHashMap
import javax.inject.{Inject, Singleton}

import models.{Book, BookComponent}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.collection.JavaConverters._
import scala.collection._
import scala.util.{Failure, Success}

import slick.driver.JdbcProfile

@Singleton
class BooksCache @Inject()(val dbConfigProvider: DatabaseConfigProvider)
  extends HasDatabaseConfigProvider[JdbcProfile] with BookComponent {
  import driver.api._

  private val codeToBook: concurrent.Map[String, Book] = new ConcurrentHashMap[String, Book] asScala

  def apply(code: String) = codeToBook.get(code)

  db.run(allBooks.result).onComplete({
    case Success(books) => books.foreach(book => codeToBook += (book.bookId -> book))
    case Failure(exception) => println(exception)
  })
}

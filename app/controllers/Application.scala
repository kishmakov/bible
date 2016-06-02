package controllers

import javax.inject.{Singleton, Inject}

import models.{BooksDAO, HeadersDAO, VersesDAO}
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class Application @Inject()(val headersDAO: HeadersDAO,
                            val booksDAO: BooksDAO,
                            val versesDAO: VersesDAO
                           ) extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def bible = Action.async {
    val headers = headersDAO.findByLocale("ru_RU")
    headers map { result =>
      Ok(views.html.bible(result map (h => h.code -> h) toMap))
    }
  }

  def chapter(bookId: String, chapter: Int) = Action.async {
    val result = booksDAO.findByIdLocale(bookId, "ru_RU").
      zip(versesDAO.findByLangBookChapter("ru", bookId, chapter))

    result map { _ match {
        case ((book, header), verses) =>
          Ok(views.html.chapter(chapter, header, book, verses.sortWith(_.verse < _.verse)))
        case _ =>
          Ok(views.html.index("There are some problems on server. Try to refresh page later."))
      }
    }
  }

}
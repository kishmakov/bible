package controllers

import javax.inject.{Singleton, Inject}

import models.HeadersDAO
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class Application @Inject()(val headersDAO: HeadersDAO
                           ) extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def bibleBooks = Action.async {
    val headers = headersDAO.findByLocale("ru_RU")
    headers.map { result =>
      Ok(views.html.bibleBooks(result map (h => h.code -> h) toMap))
    }
  }

  def chapter(bookCode: String, chapter: Int) = Action {
    Ok(views.html.index("Oops. " + bookCode + " is not ready yet."))
//    val headers = headersDAO.findByLocale("ru_RU")
//    headers.map { result =>
//      Ok(views.html.bible(result map (h => h.code -> h) toMap))
//    }
  }

}
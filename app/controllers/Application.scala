package controllers

import javax.inject.{Singleton, Inject}

import models.{BooksDAO, VersesDAO}
import utils.HeadersCache
import play.api.libs.json.{JsNumber, JsString, JsObject, Json}
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class Application @Inject()(val headers: HeadersCache,
                            val booksDAO: BooksDAO,
                            val versesDAO: VersesDAO
                           ) extends Controller {

  def index = Action { request =>
    val lang = request.cookies.get("lang") match {
      case Some(cookie) => cookie.value
      case None => "ru"
    }
    Redirect(s"/books/$lang/")
  }

  def books(lang: String) = Action {
    if (headers.langToHeaders.contains(lang))
      Ok(views.html.books(lang, headers.langToHeaders(lang))).withCookies(
        Cookie("lang", lang, httpOnly = false))
    else
      NotFound
  }

  def chapter(bookId: String, chapter: Int, lang: String) = Action.async {
    val result = booksDAO.findByIdLang(bookId, lang).
      zip(versesDAO.findByLangBookChapter(lang, bookId, chapter))

    result map { _ match {
        case ((book, header), verses) =>
          Ok(views.html.chapter(lang, chapter, header, book, verses.sortWith(_.verse < _.verse)))
        case _ => NotFound
      }
    }
  }

  def info(book: String, chapter: Int, verse: Int, lang: String) = Action {
    Ok(Json.toJson(JsObject(Seq(
      "book" -> JsString(book),
      "chapter" -> JsNumber(chapter),
      "verse" -> JsNumber(verse)
    ))))
  }
}
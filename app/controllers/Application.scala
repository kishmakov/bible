package controllers

import javax.inject.{Singleton, Inject}

import models.{VersesDAO}
import utils.{LangsCache, BooksCache, HeadersCache}
import play.api.libs.json.{JsNumber, JsString, JsObject, Json}
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class Application @Inject()(val headersCache: HeadersCache,
                            val booksCache: BooksCache,
                            val langsCache: LangsCache,
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
    headersCache(lang) match {
      case Some(headers) => Ok(views.html.books(lang, headers, langsCache.all))
        .withCookies(Cookie("lang", lang, httpOnly = false))
      case None => NotFound
    }
  }

  def chapter(bookId: String, chapter: Int, lang: String) = Action.async {
    val book = booksCache(bookId)
    val headers = headersCache(lang)
    val header = headersCache(lang) flatMap(m => m get bookId)
    versesDAO.findByLangBookChapter(lang, bookId, chapter) map {
      verses => (book, header, headers) match {
        case (Some(b), Some(h), Some(hs)) =>
          Ok(views.html.chapter(lang, chapter, h, b, verses.sortWith(_.verse < _.verse), hs))
            .withCookies(Cookie("lang", lang, httpOnly = false))
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
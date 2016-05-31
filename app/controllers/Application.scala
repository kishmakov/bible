package controllers

import javax.inject.{Singleton, Inject}

import models.{HeadersDAO, VersesDAO}
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class Application @Inject()(val headersDAO: HeadersDAO,
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

  def chapter(bookCode: String, chapter: Int) = Action.async {
    val result = headersDAO.findByLocaleCode("ru_RU", bookCode).
      zip(versesDAO.findByLangBookChapter("ru", bookCode, chapter))

    result map { _ match {
        case (Some(h), vs) => Ok(views.html.chapter(h, vs.sortWith(_.verse < _.verse)))
        case _ => Ok(views.html.index("There are some problems on server. Try to refresh page later."))
      }
    }
  }

}
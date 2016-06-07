package utils

import java.util.concurrent.ConcurrentHashMap
import javax.inject.{Inject, Singleton}

import models.{Header, HeadersDAO}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.collection.JavaConverters._
import scala.collection._
import scala.util.{Failure, Success}

@Singleton
class HeadersCache @Inject()(val headersDAO: HeadersDAO) {
  val langs = List("ru", "cs")
  val langToHeaders: concurrent.Map[String, immutable.Map[String, Header]]
    = new ConcurrentHashMap[String, immutable.Map[String, Header]] asScala

  langs.foreach(lang => {
    headersDAO.findByLang(lang).onComplete({
      case Success(list) => langToHeaders += (lang -> (list map (h => h.code -> h) toMap))
      case Failure(exception) => println(exception)
    })
  })
}

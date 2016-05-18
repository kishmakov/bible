name := "bible"

version := "1.0"

organization := "org.kshmakov"

lazy val `bible` = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  cache,
  evolutions,
  jdbc,
  "mysql" % "mysql-connector-java" % "5.1.36",
  ws,
  specs2 % Test )

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"

package scala_utils

import java.io.FileWriter
import java.io.File
import java.nio.file.Paths
import java.nio.file.Files

object Init {

  val FolderRegex = raw"(\d{4}).(\d+)".r
  def argError() = throw new MatchError(
    "Please specify folder, like 'sbt \"runMain scala_utils.Init 2015/1\"'"
  )

  def fileContents(year: String, day: String, part: String): String = {
    s"""package `$year`.`$day`
        |
        |import scala_utils.Aoc
        |
        |object $part {
        |  implicit val ctx: Aoc.Context = new Aoc.Context(this);
        |
        |  def main(args: Array[String]) = Aoc { infile =>
        |    0
        |  }
        |}
        |""".stripMargin
  }

  def writeFile(year: String, day: String, part: String) = {
    val file = Paths.get("src", year, day, s"$part.scala")
    if (!Files.exists(file)) {

      println(s"Writing file: $file")
      val fileWriter = new FileWriter(
        new File(file.toString())
      )
      try {
        fileWriter.write(fileContents(year, day, part))
      } finally {
        fileWriter.close()
      }
    }
  }

  def main(args: Array[String]) = {

    if (args.length eq 0) {
      argError()
    }

    val (year, day) = args(0) match {
      case FolderRegex(y, d) => (y, d)
      case _                 => argError()
    }

    Files.createDirectories(Paths.get("src", year, day))
    writeFile(year, day, "a")
    writeFile(year, day, "b")
    Aoc.fetchInput(year, day)
  }
}

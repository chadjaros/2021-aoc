package scala_utils

import scala.collection.mutable.Buffer
import scala.annotation.constructorOnly
import java.nio.file.Paths
import scala.io.Source
import java.io.File
import scala.io.BufferedSource
import java.nio.file.Path
import java.nio.file.Files
import java.net.http.HttpClient
import java.net.http.HttpResponse.BodyHandlers
import java.net.http.HttpRequest
import java.net.URI

object Aoc {

  implicit class Context(val typ: Any) {}

  @annotation.implicitNotFound(
    "Aoc return value must be Int, Long, Float, Double, or String"
  )
  sealed trait Result[T]

  type ValueType = String | Integer | Long | Double;
  type ResultType = ValueType | (ValueType, Any)

  class FileHelper(filePath: String) {

    def sample(filename: String = "sample-input.txt"): FileHelper = {
      new FileHelper(
        Paths
          .get(Paths.get(filePath).getParent().toString(), filename)
          .toString()
      )
    }

    private def read[T](op: (file: BufferedSource) => T): T = {
      val source = Source.fromFile(filePath)
      try {
        return op(source)
      } finally {
        source.close()
      }

    }

    def buffer: Buffer[Char] = {
      this.read { file =>
        file.toBuffer
      }
    }

    def string: String = {
      this.read { file =>
        file.mkString.trim()
      }
    }

    def lines: Seq[String] = {
      this.string.split("\n").toSeq
    }

    def split(break: String): Seq[String] = {
      this.string.split(break).toSeq
    }
  }

  def fetchInput(year: String, day: String): Path = {

    val toFile = Paths.get("src", year, day, "input.txt")

    if (Files.exists(toFile)) {
      return toFile;
    }

    val session = System.getenv("AOC_SESSION");
    if (session == null) {
      throw new Error(
        "Please set environment variable AOC_SESSION to session cookie from AOC website to automatically download inputs"
      );
    }

    val uri = new URI(s"https://adventofcode.com/$year/day/$day/input")

    println(
      s"Fetching input data from $uri"
    )

    val start = System.nanoTime()

    val request = HttpRequest
      .newBuilder()
      .uri(uri)
      .header("cookie", session.replace(':', '='))
      .header(
        "User-Agent",
        "https://github.com/chadjaros/advent-of-code chad.jaros@gmail.com"
      )
      .GET()
      .build()

    val response = HttpClient
      .newBuilder()
      .build()
      .send(request, BodyHandlers.ofFile(toFile))

    if (response.statusCode() != 200) {
      Files.delete(toFile)
      throw new Error(
        s"Failed with status ${response.statusCode()}"
      );
    }

    val dur = (System.nanoTime() - start) / 10000000.0;
    println(
      f"Fetched and written to ${toFile.toAbsolutePath()} in $dur%.3f ms"
    );
    println("---")

    toFile
  }

  def apply[T](
      method: (infile: FileHelper) => ResultType
  )(implicit ctx: Context) = {
    val regex = "(\\d{4})\\.(\\d+)\\.([ab])\\$?".r
    val regex(year, day, part) = ctx.typ.getClass().getName(): @unchecked

    val inputPath = this.fetchInput(year, day)

    val file = new FileHelper(inputPath.toAbsolutePath.toString)

    val start = System.nanoTime()

    val result = method(file);

    val dur = (System.nanoTime() - start) / 10000000.0;

    val tuple = result match {
      case (a: (ValueType, Any)) => a
      case (it: ValueType)       => (it, "")
    }

    println("")
    println("---")
    println(s"value: ${tuple._1}");
    println(s"extra: ${tuple._2}");
    println("---")
    println(f"time: $dur%.3f ms")
  }
}

package scala_utils

import scala.collection.mutable.Buffer
import java.nio.CharBuffer
import scala.annotation.constructorOnly

object Aoc {

  @annotation.implicitNotFound(
    "Aoc return value must be Int, Long, Float, Double, or String"
  )
  sealed trait Result[T]

  object Result {
    implicit val intResult: Result[Int] = new Result[Int] {}
    implicit val lngResult: Result[Long] = new Result[Long] {}
    implicit val strResult: Result[String] = new Result[String] {}
    implicit val floResult: Result[Float] = new Result[Float] {}
    implicit val idouResult: Result[Double] = new Result[Double] {}
  }

  class FileHelper(filePath: String) {

    def sample(filename: String): FileHelper = {
      throw new Error();
    }

    def buffer(): CharBuffer = {
      throw new Error();
    }
  }

  def apply[T](method: (infile: FileHelper) => T)(implicit ev: Result[T]) = {
    val file = new FileHelper("file");

    val result = method(file);

    println(System.getProperty("sun.java.command"));
    println(s"Result: $result");
  }
}

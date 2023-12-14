package `2016`.`6`

import scala_utils._
import scala.collection.mutable._

object b {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  def main(args: Array[String]) = Aoc { infile =>
    infile.lines
      .foldLeft[ArrayBuffer[Map[Char, Int]]](ArrayBuffer())((acc, str) => {
        if (acc.size == 0) {
          acc.appendAll(0.until(str.length()).map(_ => Map()))
        }
        for (i <- 0.until(str.length())) {
          val c = str(i)
          acc(i).put(c, acc(i).get(c).getOrElse(0) + 1)
        }
        acc;
      })
      .map((map) => {
        map.reduce((a, b) => if (a._2 < b._2) then a else b)._1
      })
      .mkString
  }
}

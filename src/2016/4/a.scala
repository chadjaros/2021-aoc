package `2016`.`4`

import scala_utils._

object a {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  def main(args: Array[String]) = Aoc { infile =>

    val regex = "([\\w-]+)-(\\d{3})\\[(\\w+)]".r

    infile.lines
      .map(l => {
        val regex(name, room, hash) = l: @unchecked
        val calculatedHash =
          name
            .replaceAll("-", "")
            .split("")
            .foldLeft(collection.mutable.Map[String, Int]()) { (acc, str) =>
              acc.update(str, acc.get(str).getOrElse(0) + 1)
              acc
            }
            .toSeq
            .sortWith((a, b) =>
              if (a._2 == b._2) {
                a._1.compareTo(b._1) < 0
              } else {
                a._2 > b._2
              }
            )
            .take(5)
            .map(x => x._1)
            .mkString
        (
          room.toInt,
          hash,
          calculatedHash
        )
      })
      .filter(x => {
        x._2 == x._3
      })
      .foldLeft(0) { (acc, v) => acc + v._1 }
  }
}

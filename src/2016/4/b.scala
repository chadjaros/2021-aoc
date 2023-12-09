package `2016`.`4`

import scala_utils._

object b {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  def map =
    'a'
      .to('z')
      .map((c) =>
        if (c == 'z') {
          c.toString -> "a"
        } else {
          c.toString -> (c + 1).toChar.toString
        }
      )
      .toMap

  def rotate(str: String, move: Int): String = {
    if (move == 0) {
      return str;
    }
    rotate(map.get(str).get, move - 1);
  }

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
          name,
          room.toInt,
          hash,
          calculatedHash
        )
      })
      .filter(x => {
        x._3 == x._4
      })
      .map(l => {
        (l._1.split("-").toSeq, l._2)
      })
      .find((t) => {
        val moves = t._2 % 26
        t._1
          .map((w) => w.split("").map((c) => rotate(c, moves)).mkString)
          .exists(s => s.startsWith("north"))
      })
      .get
      ._2
  }
}

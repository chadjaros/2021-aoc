package `2016`.`2`

import scala_utils._

object a {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  val grid = Array(
    Array(1, 2, 3),
    Array(4, 5, 6),
    Array(7, 8, 9)
  )

  val dirs = Map(
    "U" -> ((curr: Point) => curr.copy(y = Math.max(0, curr.y - 1))),
    "D" -> ((curr: Point) => curr.copy(y = Math.min(2, curr.y + 1))),
    "R" -> ((curr: Point) => curr.copy(x = Math.min(2, curr.x + 1))),
    "L" -> ((curr: Point) => curr.copy(x = Math.max(0, curr.x - 1)))
  )

  def main(args: Array[String]) = Aoc { infile =>

    var curr = Point(1, 1);

    infile.lines
      .map(line => {
        line
          .split("")
          .foreach(s => {
            curr = dirs.get(s).get(curr)
          })
        grid(curr.y)(curr.x)
      })
      .mkString("")
  }
}

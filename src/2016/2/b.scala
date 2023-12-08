package `2016`.`2`

import scala_utils._

object b {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  val grid = Array(
    Array(".", ".", "1", ".", "."),
    Array(".", "2", "3", "4", "."),
    Array("5", "6", "7", "8", "9"),
    Array(".", "A", "B", "C", "."),
    Array(".", ".", "D", ".", ".")
  )

  val dirs = Map(
    "U" -> ((curr: Point) => curr.copy(y = curr.y - 1)),
    "D" -> ((curr: Point) => curr.copy(y = curr.y + 1)),
    "R" -> ((curr: Point) => curr.copy(x = curr.x + 1)),
    "L" -> ((curr: Point) => curr.copy(x = curr.x - 1))
  )

  def main(args: Array[String]) = Aoc { infile =>

    var curr = Point(1, 1);

    infile.lines
      .map(line => {
        line
          .split("")
          .foreach(s => {
            val maybeNext = dirs.get(s).get(curr)
            if (
              maybeNext.x >= 0
              && maybeNext.x < grid(0).length
              && maybeNext.y >= 0
              && maybeNext.y < grid.length
              && grid(maybeNext.y)(maybeNext.x).ne(".")
            ) {
              curr = maybeNext
            }
          })
        grid(curr.y)(curr.x)
      })
      .mkString("")
  }
}

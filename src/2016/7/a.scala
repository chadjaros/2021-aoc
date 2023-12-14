package `2016`.`7`

import scala_utils._
import scala.util.boundary
import scala.util.boundary.break

object a {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  def scanMatch(line: String): Boolean = {
    boundary:
      var inside = false;
      var hasOutside = false;
      for (i <- 0.to(line.length() - 4)) {
        if (line(i) == '[') {
          inside = true;
        } else if (line(i) == ']') {
          inside = false;
        }
        if (
          line(i) == line(i + 3)
          && line(i + 1) == line(i + 2)
          && line(i) != line(i + 1)
        ) {
          if (inside) {
            break(false)
          } else {
            hasOutside = true;
          }
        }
      }
      hasOutside
  }

  def main(args: Array[String]) = Aoc { infile =>
    infile.lines
      .filter((line) => scanMatch(line))
      .length
  }
}

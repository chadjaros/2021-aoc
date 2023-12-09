package `2016`.`3`

import scala_utils._

object a {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  def main(args: Array[String]) = Aoc { infile =>
    infile.lines
      .map(x => {
        x.trim().split("\\s+").map(Integer.parseInt).sorted
      })
      .filter(x => {
        x(2) < x(1) + x(0)
      })
      .length
  }
}

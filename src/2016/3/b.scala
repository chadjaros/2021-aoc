package `2016`.`3`

import scala_utils._

object b {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  def main(args: Array[String]) = Aoc { infile =>
    infile.lines
      .map(x => {
        x.trim().split("\\s+").map(Integer.parseInt)
      })
      .grouped(3)
      .flatMap(grp => {
        grp.transpose
      })
      .filter((x) => {
        val s = x.sorted
        s(2) < s(1) + s(0)
      })
      .length
  }
}

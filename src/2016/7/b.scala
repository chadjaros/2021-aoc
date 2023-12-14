package `2016`.`7`

import scala_utils._
import scala.util.boundary
import scala.util.boundary.break
import scala.collection.mutable.ArrayBuffer

object b {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  def scanMatch(line: String): Boolean = {
    var inside = false;
    var abas = (ArrayBuffer[String](), ArrayBuffer[String]());
    for (i <- 0.to(line.length() - 3)) {
      if (line(i) == '[') {
        inside = true;
      } else if (line(i) == ']') {
        inside = false;
      }
      if (
        line(i) == line(i + 2)
        && line(i) != line(i + 1)
      ) {
        if (inside) {
          abas._2.addOne(line.substring(i, i + 3))
        } else {
          abas._1.addOne(line.substring(i, i + 3))
        }
      }
    }

    abas._1.exists((aba) => {
      abas._2.exists((bab) => aba(0) == bab(1) && aba(1) == bab(0))
    })
  }

  def main(args: Array[String]) = Aoc { infile =>
    infile.lines
      .filter((line) => scanMatch(line))
      .length
  }
}

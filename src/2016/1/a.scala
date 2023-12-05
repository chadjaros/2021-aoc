package `2016`.`1`

import scala_utils.Aoc
import scala_utils.Aoc.FileHelper

object a {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  def main(args: Array[String]) = Aoc { infile =>

    var x = 0;
    var y = 0;

    def N = (moves: Int) => y += moves;
    def E = (moves: Int) => x += moves
    def S = (moves: Int) => y -= moves
    def W = (moves: Int) => x -= moves

    val dirs = Map(
      "N" -> N,
      "E" -> E,
      "S" -> S,
      "W" -> W
    )

    var currDir = "N";

    infile
      .split(", ")
      .foreach(dir => {

        val turn = dir.charAt(0)
        val move = dir.substring(1).toInt;

        val orignalDir = currDir;

        currDir = if (currDir == "N") {
          if (turn == 'R') "E" else "W"
        } else if (currDir == "E") {
          if (turn == 'R') "S" else "N"
        } else if (currDir == "S") {
          if (turn == 'R') "W" else "E"
        } else {
          if (turn == 'R') "N" else "S"
        }

        dirs.get(currDir).get(move)
        println(s"$turn $move $orignalDir>$currDir $x,$y")
      })

    Math.abs(x) + Math.abs(y)
  }

}

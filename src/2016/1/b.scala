package `2016`.`1`

import scala_utils.Aoc
import scala.util.boundary
import scala.annotation.tailrec

case class Point(x: Int, y: Int)

object b {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  type Dir = (p: Point, moves: Int) => Seq[Point]

  val N = (p: Point, moves: Int) => (p.y + 1).to(p.y + moves).map(Point(p.x, _))
  val E = (p: Point, moves: Int) => (p.x + 1).to(p.x + moves).map(Point(_, p.y))
  val S = (p: Point, moves: Int) =>
    (p.y - 1).to(p.y - moves, -1).map(Point(p.x, _))
  val W = (p: Point, moves: Int) =>
    (p.x - 1).to(p.x - moves, -1).map(Point(_, p.y))

  def turn(turn: Char, currDir: Dir): Dir = {
    if (currDir == N) {
      if (turn == 'R') E else W
    } else if (currDir == E) {
      if (turn == 'R') S else N
    } else if (currDir == S) {
      if (turn == 'R') W else E
    } else {
      if (turn == 'R') N else S
    }
  }

  def dirName(dir: Dir) = dir match {
    case N => "N"
    case W => "W"
    case S => "S"
    case _ => "E"
  }

  @tailrec
  def calculate(
      current: Point,
      dir: Dir,
      visited: Set[Point],
      instructions: Seq[String]
  ): Int = {
    val turn = instructions.head.charAt(0)
    val move = instructions.head.substring(1).toInt

    val nextDir = this.turn(turn, dir)
    val steps = nextDir(current, move)

    val intersection = steps.find(visited.contains(_))
    if (intersection.isDefined) {
      return Math.abs(intersection.get.x) + Math.abs(intersection.get.y)
    }

    calculate(steps.last, nextDir, visited ++ steps, instructions.tail)
  }

  def main(args: Array[String]) = Aoc { infile =>
    var start = Point(0, 0)
    calculate(start, this.N, Set(start), infile.split(", "))
  }
}

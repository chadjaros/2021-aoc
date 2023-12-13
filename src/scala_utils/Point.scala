package `scala_utils`

case class Point(x: Int, y: Int) {
  def manhattanDistance(other: Point) = {
    Math.abs(this.x - other.x) + Math.abs(this.y - other.y)
  }

  def plus(other: Point) = Point(this.x + other.x, this.y - other.y)

}

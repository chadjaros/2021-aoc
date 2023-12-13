package `2016`.`5`

import scala_utils._
import java.security.MessageDigest

object a {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  val md5 = MessageDigest.getInstance("MD5")

  def bytesToHex(bytes: Array[Byte]): String = {
    val sb = new StringBuilder
    for (b <- bytes) {
      sb.append(String.format("%02x", Byte.box(b)))
    }
    sb.toString
  }

  def md5Matches(str: String): Option[String] = {
    val hash = bytesToHex(md5.digest(str.getBytes()))
    md5.reset()

    if (hash.take(5).forall((x) => x == '0')) {
      println(s"$str $hash")
      Some(hash.charAt(5).toString)
    } else {
      None
    }
  }

  def main(args: Array[String]) = Aoc { infile =>

    val hashBase = infile.string

    var ct = 0
    var pw = ""
    while (pw.length < 8) {
      val test = hashBase + ct.toString
      val res = md5Matches(test)
      if (res.isDefined) {
        pw = pw + res.get
        println(pw)
      }
      ct += 1
    }

    pw
  }
}

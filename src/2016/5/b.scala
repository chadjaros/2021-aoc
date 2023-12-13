package `2016`.`5`

import scala_utils._
import java.security.MessageDigest
import scala.util.Try

object b {
  implicit val ctx: Aoc.Context = new Aoc.Context(this);

  val md5 = MessageDigest.getInstance("MD5")

  def bytesToHex(bytes: Array[Byte]): String = {
    val sb = new StringBuilder
    for (b <- bytes) {
      sb.append(String.format("%02x", Byte.box(b)))
    }
    sb.toString
  }

  def md5Matches(str: String): Option[(Int, String)] = {
    val hash = bytesToHex(md5.digest(str.getBytes()))
    md5.reset()

    if (hash.take(5).forall((x) => x == '0')) {
      val index = hash.charAt(5).toString.toIntOption.filter(_ < 8)
      println(s"$str $hash")
      if (index.isDefined) {
        Some((index.get, hash.charAt(6).toString))
      } else {
        None
      }
    } else {
      None
    }
  }

  def main(args: Array[String]) = Aoc { infile =>

    val hashBase = infile.string

    var ct = 0
    var pw: Array[String] = 0.to(7).map((f) => ".").toArray
    while (pw.exists(_ == ".")) {
      val test = hashBase + ct.toString
      val res = md5Matches(test)
      if (res.isDefined) {
        if (pw(res.get._1) == ".") {
          pw(res.get._1) = res.get._2
          println(pw.mkString)
        }
      }
      ct += 1
    }

    pw.mkString
  }
}

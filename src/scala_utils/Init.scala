package scala_utils

import java.io.FileWriter
import java.io.File

object Init {
  def main(args: Array[String]) = {
    val fileWriter = new FileWriter(new File("/tmp/hello.txt"))
    fileWriter.write("hello there")
    fileWriter.close()
  }
}

import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files

public class Counting {
  public static void main(String[] args) {
    try {
      File myObj = new File("Day 1/Input.txt");
      Scanner myReader = new Scanner(myObj);
      int max = 0;
      int sum = 0;
      while (myReader.hasNextLine()) {
        String lineData = myReader.nextLine();
        // if the line is empty, calculate sum and compare with max number
        if (lineData != "") {
          int lineNumber = Integer.parseInt(lineData);
          System.out.println("number: " + lineNumber);
          sum += lineNumber;
          System.out.println("sum: " + sum);
        } else if (lineData == "") {
          if (sum > max) {
            max = sum;
          }
          sum = 0;
        }
      }
      
      System.out.println("max: " + max);
      myReader.close();
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }
}
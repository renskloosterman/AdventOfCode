import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files

public class Counting {
  public static void main(String[] args) {
    try {
      File myObj = new File("Day 1/Input.txt");
      Scanner myReader = new Scanner(myObj);
      int max1 = 0;
      int max2 = 0;
      int max3 = 0;
      int sum = 0;
      while (myReader.hasNextLine()) {
        String lineData = myReader.nextLine();
        // if the line is empty, calculate sum and compare with max number
        if (lineData != "") {
          int lineNumber = Integer.parseInt(lineData);
          sum += lineNumber;
        } else if (lineData == "") {
          if (sum > max3) {
            if (sum > max2) {
              if (sum > max1) {
                max3 = max2;
                max2 = max1;
                max1 = sum;
              } else {
                max3 = max2;
                max2 = sum;
              }
            } else {
              max3 = sum;
            }
          }
          sum = 0;
        }
      }
      
      int totalsum = max1 + max2 + max3;
      System.out.println("max1: " + max1);
      System.out.println("max2: " + max2);
      System.out.println("max3: " + max3);
      System.out.println("total: " + totalsum);
      myReader.close();
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }
}
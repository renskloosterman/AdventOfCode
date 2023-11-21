import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files

public class RockPaperScissors {
  public static void main(String[] args) {
    int score = 0;
    try {
      File myObj = new File("Day 2/Input.txt");
      Scanner myReader = new Scanner(myObj);
      while (myReader.hasNextLine()) {
        String lineData = myReader.nextLine();
        //split the line into two strings and store them in an array
        String[] lineDataArray = lineData.split(" ");
        //store the two strings in variables
        String opponent = lineDataArray[0];
        String you = lineDataArray[1];
        score += shapeScore(you);
        score += outcomeScore(opponent, you);
      }

      myReader.close();
      System.out.println("Your score is: " + score);
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
  }

  private static int outcomeScore(String opponent, String you) {
    if(opponent.equals("A") && you.equals("X")) {
      return 3;
    } else if(opponent.equals("A") && you.equals("Y")) {
      return 6;
    } else if(opponent.equals("A") && you.equals("Z")) {
      return 0;
    } else if(opponent.equals("B") && you.equals("X")) {
      return 0;
    } else if(opponent.equals("B") && you.equals("Y")) {
      return 3;
    } else if(opponent.equals("B") && you.equals("Z")) {
      return 6;
    } else if(opponent.equals("C") && you.equals("X")) {
      return 6;
    } else if(opponent.equals("C") && you.equals("Y")) {
      return 0;
    } else if(opponent.equals("C") && you.equals("Z")) {
      return 3;
    } else {
      return -10000000;
    }
  }

  private static int shapeScore(String you) {
    if(you.equals("X")) {
      return 1;
    } else if(you.equals("Y")) {
      return 2;
    } else if(you.equals("Z")) {
      return 3;
    } else {
      return -1000000000;
    }
  }
}
import * as fs from "fs";
import { config } from "process";
console.log("");
console.log("");
console.log("");
let answer = BigInt(0);
let input = null;
const operators = ["+", "*"];

function calculateLeftToRight(expression) {
  const numbers = expression.split(" ");
  let result = parseFloat(numbers[0]);

  for (let i = 1; i < numbers.length; i += 2) {
    const operator = numbers[i];
    const nextNumber = parseFloat(numbers[i + 1]);

    switch (operator) {
      case "+":
        result += nextNumber;
        break;
      case "-":
        result -= nextNumber;
        break;
      case "*":
        result *= nextNumber;
        break;
      case "/":
        result /= nextNumber;
        break;
      default:
        throw new Error(`Unsupported operator ${operator}`);
    }
  }

  return result;
}

fs.readFile(
  "C:/Users/rkloost3/OneDrive - Enexis productie/desktop/AOC 2024/Day-7/Input.txt",
  "UTF8",
  (err, data) => {
    if (err) throw err;

    input = data.split("\n");

    input.forEach((line) => {
      parseAndCheck(line);
    });

    console.log(answer);
  }
);

function parseAndCheck(input) {
  const parts = input
    .split(/[\s,:]+/)
    .map(Number)
    .filter((value) => !isNaN(value));

  const targetNumber = parts[0];
  const numbers = parts.slice(1);

  const configurationsToCheck = getPossibleConfigurations(
    operators.length,
    numbers.length - 1
  );
  // console.log(configurationsToCheck);
  for (let i = 0; i < configurationsToCheck.length; i++) {
    const configuration = configurationsToCheck[i];
    const equationString = getEquation(configuration, numbers);
    const calculatedNumber = calculateLeftToRight(equationString);
    if (targetNumber == calculatedNumber) {
      answer += BigInt(targetNumber);
      break; // Exit the loop
    }
  }

  // This function converts a decimal number to binary
  function decimalToBinary(decimal) {
    return decimal.toString(2);
  }

  // This function prints the binary representation of numbers from 0 to given limit
  function getPossibleConfigurations(numberOfOperators, amountOfOperatorSpots) {
    const numberOfPossibleConfigurations = Math.pow(
      numberOfOperators,
      amountOfOperatorSpots
    );
    const configurationsToCheck = [];
    for (let i = 0; i < numberOfPossibleConfigurations; i++) {
      const binaryCode = decimalToBinary(i);
      configurationsToCheck.push(padNumber(binaryCode, amountOfOperatorSpots));
    }
    return configurationsToCheck;
  }

  function padNumber(number, size) {
    let s = number.toString();
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  }

  function getEquation(configuration, numbers) {
    const configurations = configuration.split("");
    let equationString = "";
    for (let i = 0; i < numbers.length; i++) {
      equationString += numbers[i];
      if (i < configurations.length) {
        const operator = configurations[i] == 1 ? " + " : " * ";
        equationString += operator;
      }
    }

    return equationString;
  }
}

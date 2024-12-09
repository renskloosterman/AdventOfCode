import * as fs from "fs";
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a path
const __dirname = path.dirname(__filename);

console.clear()
const TESTING = false
const txtFile = TESTING ? 'TestInput.txt' : 'Input.txt'
const filePath = path.join(__dirname, txtFile);

let answer = BigInt(0);
let input = null;
const operators = ["+", "*", "||"];

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
      case "||":
        const numberOne = result.toString()
        const numberTwo = nextNumber.toString()
        const added = numberOne+numberTwo
        // result = BigInt((result.toString()+nextNumber.toString()))
        result = parseInt(added)
        break
      default:
        throw new Error(`Unsupported operator ${operator}`);
    }
  }

  return result;
}

fs.readFile(
  filePath,
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
  const parts = input.match(/\d+/g).map(Number)

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
      console.log(`${targetNumber} can be done with ${equationString}`);
      break; // Exit the loop
    }
  }

  // This function converts a decimal number to binary
  function decimalToTertiary(decimal) {
    return decimal.toString(3);
  }

  // This function prints the binary representation of numbers from 0 to given limit
  function getPossibleConfigurations(numberOfOperators, amountOfOperatorSpots) {
    const numberOfPossibleConfigurations = Math.pow(
      numberOfOperators,
      amountOfOperatorSpots
    );
    const configurationsToCheck = [];
    for (let i = 0; i < numberOfPossibleConfigurations; i++) {
      const binaryCode = decimalToTertiary(i);
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
        const operator = operators[configurations[i]];
        equationString += ` ${operator} `;
      }
    }

    return equationString;
  }
}

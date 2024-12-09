import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url';
import { logMatrix } from '../helpers/logMatrix.js';
const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a path
const __dirname = path.dirname(__filename);

console.clear()
const TESTING = false
const txtFile = TESTING ? 'TestInput.txt' : 'Input.txt'
const filePath = path.join(__dirname, txtFile);

let startRow = null
let startColumn = null
const matrix = []
let answer = 0


const rowMap = {
    N: -1,
    E: 0,
    S: 1,
    W: 0,
  };
  
  const columnMap = {
    N: 0,
    E: 1,
    S: 0,
    W: -1,
  };
  
  const directionMap = {
    N: "E",
    E: "S",
    S: "W",
    W: "N",
  };


function tryPosition(matrix, playerRow, playerColumn, obstacleRow, obstacleColumn) {
    let visited = new Map()
    let playerDirection = "N";
    let playerExists = true

    while(playerExists) {
        if( // Check for out of bounds
            playerRow <= 0 ||
            playerRow >= matrix.length - 1 ||
            playerColumn <= 0 ||
            playerColumn >= matrix[obstacleRow].length - 1
        ) {
            playerExists = false;
            return 0;
        }

        const key = `${playerRow},${playerColumn},${playerDirection}`
        if(visited.has(key)) {
            return 1;
        }

        visited.set(key, true)

        let newRow = playerRow + rowMap[playerDirection]
        let newColumn = playerColumn + columnMap[playerDirection]

        if(
            matrix[newRow][newColumn].value !== '.' ||
            (newRow === obstacleRow && newColumn === obstacleColumn)
        ) {
            playerDirection = directionMap[playerDirection]
        } else {
            playerRow = newRow
            playerColumn = newColumn
        }
    }
}


fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return
    }

    data.split('\n').forEach(element => {
        const line = []
        element = element.trim().split("")
        element.forEach(value => {
            line.push({value, visited: 0})
        })
        matrix.push(line)
    })

    for (let row = 0; row < matrix.length; row++) {
        for (let column = 0; column < matrix[row].length; column++) {
            if (matrix[row][column].value === "^") {
                matrix[row][column].value = ".";
                startRow = row;
                startColumn = column;
          }
        }
    }

    for (let row = 0; row < matrix.length; row++) { // FOR EACH ARRAY IN MATRIX
        for (let column = 0; column < matrix[row].length; column++) { // FOR EACH ENTRY IN ARRAY
            if (matrix[row][column].value === '.' && (row !== startRow || column !== startColumn)) {
                answer += tryPosition(matrix, startRow, startColumn, row, column)
            }
        }
    }
   
    console.log(answer)
})
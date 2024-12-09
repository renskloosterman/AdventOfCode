import { group } from 'console';
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url';
import { logMatrix } from '../helpers/logMatrix.js'

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a path
const __dirname = path.dirname(__filename);

console.clear()
const TESTING = false
const txtFile = TESTING ? 'TestInput.txt' : 'Input.txt'
const filePath = path.join(__dirname, txtFile);

console.log('start')
let answer = 0
const antiNodesCoordinates = []
const matrix = []
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return
  }

  const input = data.split("\n");

  const groupedCoordinates = {};

  // Process the input
  input.forEach((line, y) => {
    // Remove the '\r' character from the line
    line = line.replace('\r', '');
    const lineArray = []
    for (let x = 0; x < line.length; x++) {
      const character = line[x];
      lineArray.push(character)
      if (character !== '.') { // Ignore '.'
        if (!groupedCoordinates[character]) {
          groupedCoordinates[character] = [];
        }
        // Add the coordinates to the character's group
        groupedCoordinates[character].push({ x, y });
      }
    }
    matrix.push(lineArray)
  });
  logMatrix(matrix)

  console.log(groupedCoordinates)
  for(const character in groupedCoordinates) {
    groupedCoordinates[character].forEach(coord => {
      // console.log(`${character}: checking coord ${coord.x}, ${coord.y} with `);
      
      for(let i = 0; i < groupedCoordinates[character].length; i++) {
        if(groupedCoordinates[character][i] == coord) {
          continue;
        }
        const antiNodeCoordinate = calculateAntiNodeCoordinate(coord, groupedCoordinates[character][i])
        if(
          antiNodeCoordinate.x >= 0 &&
          antiNodeCoordinate.y >= 0 &&
          antiNodeCoordinate.x < matrix[0].length &&
          antiNodeCoordinate.y < matrix.length
        ) {
          antiNodesCoordinates.push(antiNodeCoordinate)
        }
        // console.log(`${JSON.stringify(groupedCoordinates[character][i])}`)

      }
      // console.log('')
    })
  }
  console.log(antiNodesCoordinates)
  const uniqueCoordinates = new Set(
    antiNodesCoordinates.map(coord => `${coord.x},${coord.y}`)
  );
  console.log(uniqueCoordinates.size)
})

function calculateAntiNodeCoordinate(coordinate1, coordinate2) {
  const deltaX = coordinate2.x - coordinate1.x 
  const deltaY = coordinate2.y - coordinate1.y 
  const possibleAntiNodeCoordinate = { x: (coordinate2.x + deltaX), y: (coordinate2.y + deltaY)} 
  // console.log(possibleAntiNodeCoordinate)
  return possibleAntiNodeCoordinate
}
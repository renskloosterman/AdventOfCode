import { match } from 'assert';
import * as fs from 'fs'
import { totalmem } from 'os';
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a path
const __dirname = path.dirname(__filename);

console.clear()
const TESTING = true
const txtFile = TESTING ? 'TestInput.txt' : 'Input.txt'
const filePath = path.join(__dirname, txtFile);

const directions = {
    0: { dx: 0, dy: -1 }, // Above
    1: { dx: 1, dy: 0 }, // Right
    2: { dx: 0, dy: 1 }, // Below
    3: { dx: -1, dy: 0 }, // Left
  }
  
let currentRotation = 0;
function addRotation() {
    currentRotation = (currentRotation + 1) % 4
}

let currentCoordinate = { x: 0, y: 0 }
const matrix = []
const totalUniqueCoordinates = new Set()

const addToSet = (set, array) => set.add(JSON.stringify(array));

function logMatrix(matrix) {
    // Find the width of the largest number for consistent spacing
    const colWidth = Math.max(
      ...matrix.flat().map(num => num.toString().length)
    );
  
    // Format and log each row
    matrix.forEach(row => {
      const formattedRow = row
        .map(num => num.toString().padStart(colWidth)) // Pad each number
        .join(" "); // Join numbers with a space
    });
  }

function lookInFront(matrix, currentCoordinate, rotation) {
    const delta = directions[rotation] 
    const coordinateToLookAt = { x: (currentCoordinate.x+delta.dx), y: (currentCoordinate.y+delta.dy) }
    const objectInFront = matrix[coordinateToLookAt.y][coordinateToLookAt.x]
    return objectInFront
}

function walkToFront(currentCoordinate, rotation) {
    matrix[currentCoordinate.y][currentCoordinate.x] = '.'
    currentCoordinate.x += directions[rotation].dx
    currentCoordinate.y += directions[rotation].dy
    
    matrix[currentCoordinate.y][currentCoordinate.x] = '^'
    // logMatrix(matrix);
    addToSet(totalUniqueCoordinates, [currentCoordinate.x, currentCoordinate.y])
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return
    }

    data.split('\n').forEach(line => {
        const x = (line.trim().split(''))
        matrix.push(x)
    })
    
    for(let y = 0; y < matrix.length; y++) { // FOR EACH ARRAY IN MATRIX
        for(let x = 0; x < matrix[y].length; x++) { // FOR EACH ENTRY IN ARRAY
            if(matrix[y][x] == "^") {
                currentCoordinate.x = x;
                currentCoordinate.y = y;
                addToSet(totalUniqueCoordinates, [x,y])
            }
        }
    }

    try {
        while(true){
            while(lookInFront(matrix, currentCoordinate, currentRotation) === '.') {
                walkToFront(currentCoordinate, currentRotation)
            }
            addRotation()
        }
    } catch(error) {
        console.log(totalUniqueCoordinates.size)
    }
})
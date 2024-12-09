import { match } from 'assert';
import * as fs from 'fs'
import { totalmem } from 'os';
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a path
const __dirname = path.dirname(__filename);

console.clear()
const TESTING = false
const txtFile = TESTING ? 'TestInput.txt' : 'Input.txt'
const filePath = path.join(__dirname, txtFile);

function checkNorthEast(matrix, y, x) {
    if (matrix[y-1][x+1] == "M") { // NE has M, check SW for S
        return checkSouthWest(matrix, y, x, "S")
    }

    if (matrix[y-1][x+1] == "S") { // NE has S, check SW for M
        return checkSouthWest(matrix, y, x, "M")
    }
}

function checkSouthEast(matrix, y, x, letter) {
    return matrix[y+1][x+1] == letter
}

function checkSouthWest(matrix, y, x, letter) {
    return matrix[y+1][x-1] == letter
}

function checkNorthWest(matrix, y, x) {
    if (matrix[y-1][x-1] == "M") {
        return checkSouthEast(matrix, y, x, "S")
    }

    if (matrix[y-1][x-1] == "S") {
        return checkSouthEast(matrix, y, x, "M")
    }
}

function checkForXmas(matrix, y, x) {
    const NESW = checkNorthEast(matrix, y, x)
    const NWSE = checkNorthWest(matrix, y, x)
    return NESW && NWSE;
}
console.log('start')

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return
    }
    const matrix = []

    data.split('\n').forEach(line => {
        const x = (line.trim().split(''))
        matrix.push(x)
    })
    let totalMatches = 0
    for(let y = 0; y < matrix.length; y++) { // FOR EACH ARRAY IN MATRIX
        for(let x = 0; x < matrix[y].length; x++) { // FOR EACH ENTRY IN ARRAY
            if (y === 0 || y === matrix.length - 1 || x === 0 || x === matrix[0].length - 1) { // Skip coordinates on the edge of the matrix
                continue;
            }

            if(matrix[y][x] == "A") {
                if(checkForXmas(matrix, y, x)) {
                    totalMatches++
                }
            }
        }
    }

    console.log(totalMatches)
})
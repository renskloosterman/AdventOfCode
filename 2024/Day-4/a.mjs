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

function checkNorth(matrix, y, x) {
    if(y < 3) {
        return false;
    }

    if(matrix[y-1][x] != "M") {
        return false;
    }

    if(matrix[y-2][x] != "A") {
        return false;
    }

    if(matrix[y-3][x] != "S") {
        return false;
    }

    return true;
}

function checkNorthEast(matrix, y, x) {
    if (y < 3 || x > matrix[0].length - 4) {
        return false;
    }

    if (matrix[y-1][x+1] != "M") {
        return false;
    }

    if (matrix[y-2][x+2] != "A") {
        return false;
    }

    if (matrix[y-3][x+3] != "S") {
        return false;
    }

    return true;
}

function checkEast(matrix, y, x) {
    if (x > matrix[0].length - 4) {
        return false;
    }

    if (matrix[y][x+1] != "M") {
        return false;
    }

    if (matrix[y][x+2] != "A") {
        return false;
    }

    if (matrix[y][x+3] != "S") {
        return false;
    }

    return true;
}

function checkSouthEast(matrix, y, x) {
    if (y > matrix.length - 4 || x > matrix[0].length - 4) {
        return false;
    }

    if (matrix[y+1][x+1] != "M") {
        return false;
    }

    if (matrix[y+2][x+2] != "A") {
        return false;
    }

    if (matrix[y+3][x+3] != "S") {
        return false;
    }

    return true;
}

function checkSouth(matrix, y, x) {
    if (y > matrix.length - 4) {
        return false;
    }

    if (matrix[y+1][x] != "M") {
        return false;
    }

    if (matrix[y+2][x] != "A") {
        return false;
    }

    if (matrix[y+3][x] != "S") {
        return false;
    }

    return true;
}

function checkSouthWest(matrix, y, x) {
    if (y > matrix.length - 4 || x < 3) {
        return false;
    }

    if (matrix[y+1][x-1] != "M") {
        return false;
    }

    if (matrix[y+2][x-2] != "A") {
        return false;
    }

    if (matrix[y+3][x-3] != "S") {
        return false;
    }

    return true;
}

function checkWest(matrix, y, x) {
    if (x < 3) {
        return false;
    }

    if (matrix[y][x-1] != "M") {
        return false;
    }

    if (matrix[y][x-2] != "A") {
        return false;
    }

    if (matrix[y][x-3] != "S") {
        return false;
    }

    return true;
}

function checkNorthWest(matrix, y, x) {
    if (y < 3 || x < 3) {
        return false;
    }

    if (matrix[y-1][x-1] != "M") {
        return false;
    }

    if (matrix[y-2][x-2] != "A") {
        return false;
    }

    if (matrix[y-3][x-3] != "S") {
        return false;
    }

    return true;
}

function checkForXmas(matrix, y, x) {
    let matches = 0
    if(checkNorth(matrix, y, x)) {
        matches++
    }
    if(checkNorthEast(matrix, y, x)) {
        matches++
    }
    if(checkEast(matrix, y, x)) {
        matches++
    }
    if(checkSouthEast(matrix, y, x)) {
        matches++
    }
    if(checkSouth(matrix, y, x)) {
        matches++
    }
    if(checkSouthWest(matrix, y, x)) {
        matches++
    }
    if(checkWest(matrix, y, x)) {
        matches++
    }
    if(checkNorthWest(matrix, y, x)) {
        matches++
    }
    return matches;
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
            if(matrix[y][x] == "X") {
                totalMatches += checkForXmas(matrix, y, x)
            }
        }
    }

    console.log(totalMatches)
})
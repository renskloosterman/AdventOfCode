import { getInput } from '../utils/fileReader.js'

const input = getInput(import.meta.url, "inputTest2.txt")



const maxWidth = input.reduce((max, line) => Math.max(max, line.length), 0);
const maze = Array.from({ length: input.length }, () => Array(maxWidth).fill(' '));
// Populate the matrix with characters from the input
input.forEach((line, row) => {
    for (let col = 0; col < line.length; col++) {
        maze[row][col] = line[col];
    }
});
const sPos = findS(maze);
const sSymbol = calculateS()
console.log(sSymbol)
maze[sPos.y][sPos.x] = sSymbol
let currentPos = sPos
let currentSteps = 0
let started = false
maze.forEach(row => console.log(row.join('')));

traverse(sPos)

console.log(currentSteps/2)

function traverse(startingPoint, comingFrom) {
    const symbol = maze[startingPoint.y][startingPoint.x]
    const allowedDirections = possibleDirections(symbol)
    if(!comingFrom) {
        goTo(allowedDirections[0])
    } else {
        const index = allowedDirections.indexOf(comingFrom)
        goTo(allowedDirections[Math.abs(index-1)])
    }
}

function goTo(direction) {
    if(currentPos.x == sPos.x && currentPos.y == sPos.y && started) {
        return
    }
    started = true
    currentSteps++
    switch(direction) {
        case "north":
            currentPos = {y: currentPos.y-1, x: currentPos.x}
            traverse(currentPos, "south")
            break;
        case "east":
            currentPos = {y: currentPos.y, x: currentPos.x+1}
            traverse(currentPos, "west")
            break;
        case "south":
            currentPos = {y: currentPos.y+1, x: currentPos.x}
            traverse(currentPos, "north")
            break;
        case "west":
            currentPos = {y: currentPos.y, x: currentPos.x-1}
            traverse(currentPos, "east")
            break;
    }
}

function possibleDirections(symbol) {
    switch(symbol) {
        case "|":
            return ["north", "south"]
            break;
        case "-":
            return ["east", "west"]
            break;
        case "L":
            return ["north", "east"]
            break;
        case "J":
            return ["north", "west"]
            break;
        case "7":
            return ["south", "west"]
            break;
        case "F":
            return ["south", "east"]
            break;
    }
}

function calculateS() {
    let north = false
    let east = false
    let south = false
    let west = false
    const northSymbol = calcNorth(sPos.x, sPos.y)
    const eastSymbol = calcEast(sPos.x, sPos.y)
    const southSymbol = calcSouth(sPos.x, sPos.y)
    const westSymbol = calcWest(sPos.x, sPos.y)
    if("|7F".includes(northSymbol)) north = true
    if("-J7".includes(eastSymbol)) east = true
    if("|LJ".includes(southSymbol)) south = true
    if("-LF".includes(westSymbol)) west = true

    if(north && south) return "|"
    if(east && west) return "-"
    if(north && east) return "L"
    if(north && west) return "J"
    if(south && west) return "7"
    if(south && east) return "F"
    throw Error("Cannot calculate S symbol.")
}

function calcNorth(x, y) {
    if ((y - 1) < 0) {
        throw Error(`${x}, ${y-1} Out of bounds`)
    }
    return maze[y - 1][x]
}

function calcEast(x, y) {
    if ((x + 1) > maze[y].length-1) {
        throw Error(`${x+1}, ${y} Out of bounds`)
    }
    return maze[y][x + 1]
}

function calcSouth(x, y) {
    if((y + 1) > maze.length-1) {
        throw Error(`${x}, ${y+1} Out of bounds`)
    }
    return maze[y + 1][x]
}

function calcWest(x, y) {
    if ((x - 1) < 0) {
        throw Error(`${x-1}, ${y} Out of bounds`)
    }
    return maze[y][x-1]
}

function findS(maze) {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 'S') {
                return { y: row, x: col };
            }
        }
    }
    // If the target is not found, return null
    return null;
}
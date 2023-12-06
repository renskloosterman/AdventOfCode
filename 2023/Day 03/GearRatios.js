import { getInput } from '../utils/fileReader.js'

const input = getInput(import.meta.url, "inputTest.txt")

partOne();

function partOne() {
    let partialNumbers = []
    const symbols = "@#$%&*/+=-"
    for(let i = 0; i < input.length; i++) {
        input[i] = input[i].split('')
    }
    
    for(let y = 0; y < input.length; y++) {
        for(let x = 0; x < input[0].length; x++) {
            if(symbols.includes(input[y][x])) {
                // if found a symbol
                checkCircle(input, y, x)
            }
        }
    }
}

function checkCircle(input, y, x) {
    console.log(`Found symbol ${input[y][x]} at ${y+1},${x+1}`)
}
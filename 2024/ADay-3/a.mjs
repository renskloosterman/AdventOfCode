import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a path
const __dirname = path.dirname(__filename);

console.clear()
const TESTING = false
const txtFile = TESTING ? 'TestInput.txt' : 'Input.txt'
const filePath = path.join(__dirname, txtFile);

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return
    }

    const regex = /mul\(\d+,\d+\)/g

    const matches = data.match(regex);

    if(matches) {
        console.log('Found matches: ', matches)
    }

    let total = 0
    matches.forEach(match => {
        const numbersInMatch = match.match(/\((\d+),(\d+)\)/)
        const numberOne = parseInt(numbersInMatch[1], 10)
        const numberTwo = parseInt(numbersInMatch[2])

        total += (numberOne*numberTwo)
        // console.log(`${numberOne * numberTwo}`);
        
    });
    console.log(`${total}`);
    
})


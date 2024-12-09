import { match } from 'assert';
import * as fs from 'fs'
import { validateHeaderValue } from 'http';
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
    const modifiedData = `do() ${data} don't()`
    const doDontRegex = /do\(\)(.*?)don't\(\)/gs

    const validLines = modifiedData.match(doDontRegex)

    console.log(validLines)
    const regex = /mul\(\d+,\d+\)/g

    let total = 0
    validLines.forEach(validLine => {
        const matches = validLine.match(regex)
        if(matches) {
            console.log('Found matches: ', matches)
        }
        
        matches.forEach(match => {
            const numbersInMatch = match.match(/\((\d+),(\d+)\)/)
            const numberOne = parseInt(numbersInMatch[1])
            const numberTwo = parseInt(numbersInMatch[2])
    
            total += (numberOne*numberTwo)
            // console.log(`${numberOne * numberTwo}`);
            
        });
        console.log(`${total}`);
        
        
    });


})


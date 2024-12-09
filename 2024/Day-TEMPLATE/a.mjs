import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a path
const __dirname = path.dirname(__filename);

console.clear()
const TESTING = false
const txtFile = TESTING ? 'TestInput.txt' : 'Input.txt'
const filePath = path.join(__dirname, txtFile);

console.log('start')
let answer = null

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return
    }

    const input = data.split("\n");

    input.forEach((line) => {
      parseAndCheck(line);
    });

    console.log(answer)
})

function parseAndCheck(line) {

}
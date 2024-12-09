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
    const leftList = []
    const rightList = []
    data.split('\n').forEach(line => {
        const [left, right] = line.trim().split(/\s+/)
        rightList.push(right)
        leftList.push(left)
    });

    leftList.sort()
    rightList.sort()

    let totalDistance = 0
    for(let i = 0; i < leftList.length; i++) {
        const distance = Math.abs(leftList[i] - rightList[i])
        console.log(`Distance of ${leftList[i]} and ${rightList[i]} = ${distance}`);
        
        totalDistance += distance
    }
    
    console.log(totalDistance)
})
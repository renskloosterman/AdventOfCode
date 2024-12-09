import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url';
const TESTING = false

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a path
const __dirname = path.dirname(__filename);
const txtFile = TESTING ? './TestInput.txt' : './Input.txt'
const filePath = path.join(__dirname, txtFile);

console.clear()

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

    let totalSimilarity = 0
    for(let i = 0; i < leftList.length; i++) {
        const leftNumber = leftList[i] 
        let counter = 0
        for(let j = 0; j < rightList.length; j++) {
            const rightNumer = rightList[j]
            if (leftNumber == rightNumer) {
                counter++
            }
        }
        const similarity = leftNumber * counter
        totalSimilarity += similarity
    }
    console.log(`${totalSimilarity}`);
    
})
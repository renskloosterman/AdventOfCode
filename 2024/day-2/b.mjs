import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a path
const __dirname = path.dirname(__filename);

console.clear()
const TESTING = false
const txtFile = TESTING ? 'TestInput.txt' : 'Input.txt'
const filePath = path.join(__dirname, txtFile);

function isSorted(array) {
    let isAsc = true
    let isDesc = true

    for(let i = 1; i < array.length; i++) {
        if(Number.parseInt(array[i]) < Number.parseInt(array[i-1])) { 
            isAsc = false 
     
        }
        if(Number.parseInt(array[i]) > Number.parseInt(array[i-1])) { 
            isDesc = false 
        }
    }

    return isAsc || isDesc
}

function checkAdjacent(arr) {
    for (let i = 1; i < arr.length; i++) {
        const diff = Math.abs(arr[i] - arr[i - 1]);
        if (diff < 1 || diff > 3) {
            return false; // If difference is <= 1 or >= 3, return false
        }
    }
    return true; // All differences are within the required range
}


fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return
    }
    const reports = []
    data.split('\n').forEach(line => {
        reports.push(line.trim().split(/\s+/))
    });

    let numberOfSafeReports = 0
    reports.forEach(report => {
        const sorted = isSorted(report)
        const adjacentSafe = checkAdjacent(report)

        
        

        if(sorted && adjacentSafe) { 
            numberOfSafeReports++ 
        } else {
            for(let i = 0; i < report.length; i++) {
                const newReport = [...report];
                newReport.splice(i, 1)

                const newReportSorted = isSorted(newReport)
                const newReportAdjacentSafe = checkAdjacent(newReport)

                if(newReportSorted && newReportAdjacentSafe) {
                    numberOfSafeReports++
                    break;
                }
            }
        }
    });
    console.log(numberOfSafeReports)
})


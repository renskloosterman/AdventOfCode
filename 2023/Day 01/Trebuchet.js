import { getInput } from '../utils/fileReader.js'

const input = getInput(import.meta.url, "input.txt")

PartOne(input)
PartTwo(input)

function PartOne(input) {
    let sumCalibrationValue = 0
    input.forEach(line => {
        const cleanLine = line.replace(/[a-z]/g, '')
        const calibrationValue = cleanLine.charAt(0) + cleanLine.charAt(cleanLine.length - 1)
        sumCalibrationValue += Number(calibrationValue)
    });

    console.log(`Answer part 1: ${sumCalibrationValue}`)
}

function PartTwo(input) {
    let sumCalibrationValue = 0 
    const numberMap = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9"
    };
    input.forEach(line => {
        for (const [word, replacement] of Object.entries(numberMap)) {
            const regex = new RegExp(word, 'g');
            line = line.replace(regex, word + replacement + word);
        }
        const cleanLine = line.replace(/[a-z]/g, '')
        const calibrationValue = cleanLine.charAt(0) + cleanLine.charAt(cleanLine.length - 1)
        sumCalibrationValue += Number(calibrationValue)
    });
    console.log(`Answer part 2: ${sumCalibrationValue}`)
    
}
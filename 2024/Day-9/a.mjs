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
let answer = 0
let id = 0

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return
  }

  let dataArray = data.split('')
  let isFile = true;
  let id = 0
  let diskStringArray = []
  for (let i = 0; i < dataArray.length; i++) {
    let value = parseInt(dataArray[i]);  // Get the digit at each position
    for (let i = 0; i < value; i++) {
      diskStringArray.push(((isFile) ? id : '.'))
    }
    if (isFile) {
      id++
    }
    isFile = !isFile
  }

  for (let i = 0; i < diskStringArray.length; i++) {
    let value = diskStringArray[i];
    if (value != '.') {
      continue
    }

    for (let j = diskStringArray.length - 1; j >= 0 && j > i; j--) {
      let jValue = diskStringArray[j];
      if (jValue != '.') {
        diskStringArray[i] = diskStringArray[j]
        diskStringArray[j] = '.'
        break;
      }
    }
  }

  for(let i = 0; i < diskStringArray.length; i++) {
    let value = null
    value = diskStringArray[i]
    if(value == '.') {
      break;
    }
    answer += parseInt(value)*i
  }
  console.log(answer)
})
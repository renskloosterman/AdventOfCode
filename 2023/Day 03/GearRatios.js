import { getInput } from '../utils/fileReader.js'

const input = getInput(import.meta.url, "input.txt")

console.log(`Answer part 1: ${partOne()}`);
console.log(`Answer part 2: ${partTwo()}`);


function partOne() {
  let total = 0

  for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
    let numbers = []

    let match = null;
    let pattern = /\d+/g;
    while ((match = pattern.exec(input[lineIndex])) !== null) {
      numbers.push({ start: match.index, end: pattern.lastIndex, number: match[0] });
    }

    for (let number of numbers) {
      let partOfSum = false
      for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
        for (let x = number.start - 1; x <= number.end; x++) {
          if (y >= 0 && y < input.length && x >= 0 && input[lineIndex].length > x) {
            if (isNaN(parseInt(input[y][x])) && input[y][x] != '.') {
              partOfSum = true
            }
          }
        }
      }
      if (partOfSum) total += parseInt(number.number);
    }
  }

  return total
}

function partTwo() {
    let total = 0;
    let map = [];

    for(let lineIndex = 0; lineIndex < input.length; lineIndex++) {
        let numbers = []
        
        let match = null;
        let pattern = /\d+/g;
        while((match = pattern.exec(input[lineIndex])) !== null) {
            numbers.push({ start: match.index, end: pattern.lastIndex - 1, number: match[0] });
        }

        for(let number of numbers) {
            for(let y = lineIndex - 1; y <= lineIndex + 1; y++) {
                for(let x = number.start - 1; x <= number.end + 1; x++) {
                    if(y >= 0 && y < input.length && x >= 0 && x < input[lineIndex].length) {
                        if(input[y][x] == '*') {
                            map.push({ x, y, number: parseInt(number.number) })
                        }
                    }
                }
            }
        }
    }

    for(let y = 0; y < input.length; y++) {
        for(let x = 0; x < input[y].length; x++) {
            let selected = map.filter(el => el.x == x && el.y == y);
            if(selected.length == 2) {
                let nums = selected.map(el => el.number);
                total += nums[0] * nums[1];
            }
        }
    }
    return total
}
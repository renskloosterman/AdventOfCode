import { getInput } from '../utils/fileReader.js'

const input = getInput(import.meta.url, "input.txt")

partOne(input, 12, 13, 14);
partTwo(input)

function partOne(input, maxRed, maxGreen, maxBlue) {
    let totalValue = 0
    input.forEach(row => {
        const [gameInfo, values] = row.trim().split(':');
        const gameId = gameInfo.replace(/[a-zA-Z]/g, '').trim()
        const colorCounts = values.trim().split(/[,;]/).map(pair => {
            const [count, color] = pair.trim().split(' ')
            return { color, count: parseInt(count) }
        })

        const isImpossible = colorCounts.some(({ color, count }) => {
            switch (color) {
                case 'red':
                    return count > maxRed;
                case 'green':
                    return count > maxGreen;
                case 'blue':
                    return count > maxBlue;
                default:
                    return false;
            }
        });
        if (!isImpossible) {
            totalValue += parseInt(gameId);
        }
    });
    console.log(`Answer part 1: ${totalValue}`)
}

function partTwo(input) {
    let sumPowerCubeSets = 0
    input.forEach(row => {
        let [minRed, minGreen, minBlue] = [0, 0, 0];
        const [gameInfo, values] = row.trim().split(':');
        // gameInfo: Game 1
        // values: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        const sets = values.trim().split(';')
        // [ '3 blue, 4 red', ' 1 red, 2 green, 6 blue', ' 2 green' ]
        for (const set of sets) {
            let [minRedInSet, minGreenInSet, minBlueInSet] = [0,0,0]
            const colorCounts = set.trim().split(',').map(pair => {
                // 3 blue
                // 4 red
                const [count, color] = pair.trim().split(' ')
                switch (color) {
                    case 'red':
                        minRedInSet += parseInt(count);
                        break;
                    case 'green':
                        minGreenInSet += parseInt(count);
                        break;
                    case 'blue':
                        minBlueInSet += parseInt(count);
                        break;
                }
            })
            minRed = Math.max(minRed, minRedInSet)
            minGreen = Math.max(minGreen, minGreenInSet)
            minBlue = Math.max(minBlue, minBlueInSet)
        }
        const powerCubeSet = minRed*minGreen*minBlue;
        sumPowerCubeSets += powerCubeSet;
    })
    console.log(`Answer part 2: ${sumPowerCubeSets}`)
}
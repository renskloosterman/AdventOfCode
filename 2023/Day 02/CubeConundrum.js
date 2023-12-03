import { getInput } from '../utils/fileReader.js'

const input = getInput(import.meta.url, "input.txt")

partOne(input, 12, 13, 14);

function partOne(input, maxRed, maxGreen, maxBlue) {
    let totalValue = 0
    input.forEach(row => {
        const [gameInfo, values] = row.trim().split(':');
        const gameId = gameInfo.replace(/[a-zA-Z]/g, '').trim()
        const colorCounts = values.trim().split(/[,;]/).map(pair => {
            const [count, color] = pair.trim().split(' ')
            return { color, count: parseInt(count)}
        })

        const isImpossible = colorCounts.some(({ color, count }) => {
            switch (color) {
                case 'blue':
                    return count > maxBlue;
                case 'red':
                    return count > maxRed;
                case 'green':
                    return count > maxGreen;
                default:
                    return false;
            }
        });
        if(!isImpossible) {
            console.log(`Game ${gameId} is possible`)
            totalValue += parseInt(gameId);
        }
    });
    console.log(totalValue)
}
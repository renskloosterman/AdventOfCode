import { getInput } from '../utils/fileReader.js'

const input = getInput(import.meta.url, "input.txt")

partOne();
function partOne() {
    let totalWinnings = 0
    input.forEach(card => {
        let numberOfWinningNumbers = 0
        const [gameInfo, cardNumbers] = card.trim().split(':');
        const winningNumbers = cardNumbers.split("|")[0].match(/(\d+)/g);
        const ownNumbers = cardNumbers.split("|")[1].match(/(\d+)/g);

        ownNumbers.forEach(number => {
            if(number != ' ') {
                if(winningNumbers.includes(number)) {
                    numberOfWinningNumbers += 1
                }
            }
        });
        let cardValue = 0
        if(numberOfWinningNumbers > 0) cardValue = 2**(numberOfWinningNumbers-1);
        totalWinnings += cardValue;
    });
    console.log(`Answer part 1: ${totalWinnings}`)
}
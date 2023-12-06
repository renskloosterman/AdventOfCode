import { getInput } from '../utils/fileReader.js'

const input = getInput(import.meta.url, "input.txt")
let cards = []

input.forEach(card => {
    const [gameInfo, cardNumbers] = card.trim().split(':');
    const winningNumbers = cardNumbers.split("|")[0].match(/(\d+)/g);
    const ownNumbers = cardNumbers.split("|")[1].match(/(\d+)/g);
    cards.push([winningNumbers, ownNumbers])
});

partOne(cards);
partTwo(cards);

function partOne(cards) {
    let totalWinnings = 0
    cards.forEach(card => {
        let cardValue = 0
        const numbersThatWon = calculateWinningNumbers(card);
        if (numbersThatWon.length > 0) {
            cardValue = 2 ** (numbersThatWon.length - 1);
        }
        totalWinnings += cardValue;
    })

    console.log(`Answer part 1: ${totalWinnings}`)
}

function calculateWinningNumbers([winningNumbers, ownNumbers]) {
    let numbersThatWon = []
    winningNumbers.forEach(number => {
        if (ownNumbers.includes(number)) {
            numbersThatWon.push(number)
        }
    });
    return numbersThatWon;
}
function partTwo(cards) {
    let totalScratchCards = cards.length
    let cardWinnings = []
    cards.forEach((card, index) => {
        cardWinnings.push([index, calculateWinningNumbers(card).length, 1])
    });
    // console.log('startValue: ', cardWinnings)
    for (let i = 0; i < cards.length; i++) {
        let numberOfWonScratchCards = cardWinnings[i][1]
        // console.log(`Card ${i + 1} won ${numberOfWonScratchCards} cards`);
        for (let k = 0; k < cardWinnings[i][2]; k++) {
            for (let j = 0; j < numberOfWonScratchCards; j++) {
                if (j + 1 + i < cardWinnings.length) {
                    // console.log(`Added +1 to card ${Number(i) + 2 + Number(j)} because of card ${i + 1}`);

                    cardWinnings[j + 1 + i][2] += 1
                }
            }
            // console.log(cardWinnings)
        }
    }

    console.log(`Answer part 2: ${cardWinnings.map(item => item[2]).reduce((acc, currentValue) => acc + currentValue, 0)}`)
}
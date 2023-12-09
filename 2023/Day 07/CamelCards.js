import { getInput } from '../utils/fileReader.js'

const input = getInput(import.meta.url, "input.txt")

console.log(`Answer part 1: ${partOne()}`)
console.log(`Answer part 2: ${partTwo()}`)

function partOne() {
    const cardOrder = '23456789TJQKA';
    let hands = []
    input.forEach(line => {
        const [hand, bid] = line.split(" ");
        const counts = hand.split('').reduce(count, {})
        const duplicates = Object.values(counts).reduce(count, {})
        let rank =
            (duplicates[5] && 1) ||
            (duplicates[4] && 2) ||
            (duplicates[3] && duplicates[2] && 3) ||
            (duplicates[3] && 4) ||
            (duplicates[2] > 1 && 5) ||
            (duplicates[2] && 6) ||
            7
        const result = {
            cards: hand,
            bid: bid,
            rank: rank
        }
        hands.push(result)        
    })
    hands.sort((a,b) => {
        if(a.rank !== b.rank) {
            return b.rank - a.rank
        }

        for(let i = 0; i < a.cards.length; i++) {
            const indexA = cardOrder.indexOf(a.cards[i]);
            const indexB = cardOrder.indexOf(b.cards[i])

            if(indexA !== indexB) {
                return indexA - indexB
            }
        }
        return 0
    })
    // console.log(hands)
    let totalWinnings = 0
    for(let i = 0; i < hands.length; i++) {
        totalWinnings += (i+1)*hands[i].bid
    }
    return totalWinnings
}

function count(c, a) {
    c[a] = (c[a] || 0) + 1
    return c
}

function partTwo() {
    return 't.b.d'
}
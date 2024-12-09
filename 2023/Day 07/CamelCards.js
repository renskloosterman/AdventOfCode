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
    hands.sort((a, b) => {
        if (a.rank !== b.rank) {
            return b.rank - a.rank
        }

        for (let i = 0; i < a.cards.length; i++) {
            const indexA = cardOrder.indexOf(a.cards[i]);
            const indexB = cardOrder.indexOf(b.cards[i])

            if (indexA !== indexB) {
                return indexA - indexB
            }
        }
        return 0
    })
    // console.log(hands)
    let totalWinnings = 0
    for (let i = 0; i < hands.length; i++) {
        totalWinnings += (i + 1) * hands[i].bid
    }
    return totalWinnings
}

function count(c, a) {
    c[a] = (c[a] || 0) + 1
    return c
}

function partTwo() {
    const cardOrder = 'J23456789TQKA';
    let hands = []
    input.forEach(line => {
        const [hand, bid] = line.split(" ");
        const counts = hand.split('').reduce(count, {})
        const duplicates = Object.values(counts).reduce(count, {})
        // console.log(hand)
        if (counts.J > 0) {
            // console.log(duplicates)
            // console.log(`Hand: ${hand} has ${counts.J} jokers`)
            let _continue = true;
            if (duplicates[4] && counts.J != 4 && _continue) {
                duplicates[4] -= 1;
                duplicates[(4 + counts.J)] = (duplicates[4 + counts.J] || 0) + 1
                _continue = false;
            }
            if (duplicates[3] && counts.J != 3 && _continue) {
                duplicates[3] -= 1;
                duplicates[(3 + counts.J)] = (duplicates[3 + counts.J] || 0) + 1
                _continue = false;
            }
            if (duplicates[2] && _continue) {
                if (duplicates[2] > 1) {
                    duplicates[2] -= 1;
                    duplicates[(2 + counts.J)] = (duplicates[2 + counts.J] || 0) + 1
                    _continue = false;
                }
                if (duplicates[2] == 1 && counts.J != 2 && _continue) {
                    duplicates[2] -= 1;
                    duplicates[(2 + counts.J)] = (duplicates[2 + counts.J] || 0) + 1
                    _continue = false;
                }
            }
            if (duplicates[1] && counts.J != 2 && _continue) {
                duplicates[1] -= 1;
                duplicates[(1 + counts.J)] = (duplicates[1 + counts.J] || 0) + 1
                _continue = false;
            }
        }
        let rank =
            (duplicates[5] && 1) ||
            (duplicates[4] && 2) ||
            (duplicates[3] && duplicates[2] && 3) ||
            (duplicates[3] && 4) ||
            (duplicates[2] > 1 && 5) ||
            (duplicates[2] && 6) ||
            7
        // if (counts.J > 0) {
        let s = (
            rank == 1 && (`5 of a kind`) ||
            rank == 2 && (`4 of a kind`) ||
            rank == 3 && (`full house`) ||
            rank == 4 && (`3 of a kind`) ||
            rank == 5 && (`2 pairs`) ||
            rank == 6 && (`1 pair`) ||
            rank == 7 && (`high card`)
        )
        // }

        const result = {
            cards: hand,
            type: s,
            rank: rank,
            bid: bid,
        }
        hands.push(result)
        // console.clear()
    })
    hands.sort((a, b) => {
        if (a.rank !== b.rank) {
            return b.rank - a.rank
        }

        for (let i = 0; i < a.cards.length; i++) {
            const indexA = cardOrder.indexOf(a.cards[i]);
            const indexB = cardOrder.indexOf(b.cards[i])

            if (indexA !== indexB) {
                return indexA - indexB
            }
        }
        return 0
    })
    hands.forEach((element) => {
        //if (element.cards && element.cards.includes('J')) {
          console.log(JSON.stringify(element));
       // }
      });
    let totalWinnings = 0
    for (let i = 0; i < hands.length; i++) {
        totalWinnings += (i + 1) * hands[i].bid
    }
    return totalWinnings
}
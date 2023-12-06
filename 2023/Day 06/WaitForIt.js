partOne();
partTwo();

function partOne() {
    let raceTime = [40, 70, 98, 79]
    let bestTimes = [215, 1051, 2147, 1005]

    // let bestTimes = [9, 40, 200]
    // let raceTime = [7, 15, 30]
    const startingSpeed = 0
    const acceleration = 1

    let marginOfError = []

    raceTime.forEach(race => {
        let differentWaysToWin = 0
        for (let i = 0; i < race; i++) {
            const speed = acceleration * i;
            const time = race - i;
            const distance = time * speed;
            if (distance > bestTimes[raceTime.indexOf(race)]) {
                differentWaysToWin++
            }
        }
        marginOfError.push(differentWaysToWin)
    });
    console.log(`Answer to part 1: ${marginOfError.reduce((a, b) => a * b)}`)
}

function partTwo() {
    let raceTime = 40709879
    let bestDistance = 215105121471005
    const startingSpeed = 0
    const acceleration = 1
    let speed = 0
    let differentWaysToWin = 0
    for (let i = 0; i < raceTime; i++) {
        const speed = acceleration * i;
        const time = raceTime - i;
        const distance = time * speed;
        if (distance > bestDistance) {
            differentWaysToWin++
        }
    }
    console.log(`Answer to part 2: ${differentWaysToWin}`)
}
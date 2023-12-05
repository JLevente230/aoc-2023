import * as fs from 'fs';

let input = fs.readFileSync('4/input.txt', 'utf-8');

let inputArray = input.split('\n');
let winningNumbers: string[][] = [];
let yourNumbers: string[][] = [];

let result = inputArray.length;

function computeCard(index: number) {
    let winners = 0;
    for (let i = 0; i < yourNumbers[index].length; i++) {
        if (winningNumbers[index].includes(yourNumbers[index][i])) {
            result++;
            winners++;
        }
    }

    for(let i = 0; i < winners; i++) {
        computeCard(index + i + 1);
    }
}

for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = inputArray[i].slice(inputArray[i].indexOf(':') + 2);
    const splitGames = inputArray[i].split('|');

    while (splitGames[0].includes('  ')) splitGames[0] = splitGames[0].replace('  ', ' ');
    while (splitGames[1].includes('  ')) splitGames[1] = splitGames[1].replace('  ', ' ');

    winningNumbers.push(splitGames[0].trim().split(' '));
    yourNumbers.push(splitGames[1].trim().split(' '));
}

for(let i = 0; i < inputArray.length; i++) {
    computeCard(i);
}

console.log(result);
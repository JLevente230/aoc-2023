import * as fs from 'fs';

let input = fs.readFileSync('4/input.txt', 'utf-8');

let inputArray = input.split('\n');
let winningNumbers = [];
let yourNumbers = [];

let result = 0;

for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = inputArray[i].slice(inputArray[i].indexOf(':') + 2);
    const splitGames = inputArray[i].split('|');

    while (splitGames[0].includes('  ')) splitGames[0] = splitGames[0].replace('  ', ' ');
    while (splitGames[1].includes('  ')) splitGames[1] = splitGames[1].replace('  ', ' ');

    winningNumbers.push(splitGames[0].trim().split(' '));
    yourNumbers.push(splitGames[1].trim().split(' '));

    let points = 0;

    for (let j = 0; j < yourNumbers[i].length; j++) {
        if (winningNumbers[i].includes(yourNumbers[i][j])) {
            if (points === 0) {
                points = 1;
            } else {
                points = points * 2;
            }
        }
    }
    result += points;
}

console.log(result);
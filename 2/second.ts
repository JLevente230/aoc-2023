import * as fs from 'fs';

let input = fs.readFileSync('2/input.txt', 'utf-8');
let splitInput = input.split('\n');

const redLimit = 12;
const greenLimit = 13;
const blueLimit = 14;

let result = 0;

for (let i = 0; i < splitInput.length; i++) {
    const gameID = +splitInput[i].split(' ')[1].slice(0, -1);
    const game = splitInput[i].split(' ').slice(2);
    let possible = true;

    for (let j = 0; j < game.length - 2; j = j + 2) {
        const amount = +game[j];
        let color = game[j + 1].replace(',', '').replace(';', '');

        if (color === 'red' && amount >= redLimit ||
            color === 'green' && amount >= greenLimit ||
            color === 'blue' && amount >= blueLimit) {
            possible = false;
            console.log(gameID)
            break;
        }
    }

    if (possible) result += gameID;
}

console.log(result);
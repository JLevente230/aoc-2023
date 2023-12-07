import * as fs from 'fs';

let input = fs.readFileSync('6/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.trim().split('\n');

for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = inputArray[i].slice(inputArray[i].indexOf(':') + 1);
    while (inputArray[i].includes('  ')) inputArray[i] = inputArray[i].replace('  ', ' ');
    inputArray[i] = inputArray[i].trim();
}

let times: string[] = inputArray[0].split(' ');
let distances: string[] = inputArray[1].split(' ');

let amountOfDifferentWaysToWinForEachRace: number[] = [];

for (let i = 0; i < times.length; i++) { // races
    amountOfDifferentWaysToWinForEachRace.push(0);
    let pivot = Math.floor(+times[i] / 2);
    for (let j = pivot + 1; j < +times[i]; j++) {
        if (j * (+times[i] - j) > +distances[i]) {
            amountOfDifferentWaysToWinForEachRace[i]++;
        }
    }
    for (let j = pivot; j > 0; j--) {
        if (j * (+times[i] - j) > +distances[i]) {
            amountOfDifferentWaysToWinForEachRace[i]++;
        }
    }
}

let result = 1;
for (let i = 0; i < amountOfDifferentWaysToWinForEachRace.length; i++) {
    result *= amountOfDifferentWaysToWinForEachRace[i];
}

console.log(result);
import * as fs from 'fs';

let input = fs.readFileSync('6/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.trim().split('\n');

for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = inputArray[i].slice(inputArray[i].indexOf(':') + 1);
    while (inputArray[i].includes(' ')) inputArray[i] = inputArray[i].replace(' ', '');
}

let time: number = +inputArray[0];
let distance: number = +inputArray[1];

let result: number = 0;

let pivot = Math.floor(+time / 2);
for (let j = pivot + 1; j < +time; j++) {
    if (j * (+time - j) > +distance) {
        result++;
    } else break;
}
for (let j = pivot; j > 0; j--) {
    if (j * (+time - j) > +distance) {
        result++;
    } else break;
}

console.log(result);
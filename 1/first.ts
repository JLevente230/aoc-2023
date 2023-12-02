import * as fs from 'fs';

function isNumber(char: string) {
    return char === '0' ||
        char === '1' ||
        char === '2' ||
        char === '3' ||
        char === '4' ||
        char === '5' ||
        char === '6' ||
        char === '7' ||
        char === '8' ||
        char === '9';
}

let input = fs.readFileSync('input.txt', 'utf-8');
let splitInput = input.split('\n');

let result = 0;
for (let i = 0; i < splitInput.length; i++ ) {
    let first = '';
    let second = '';
    for (let j = 0; j < splitInput[i].length; j++) {
        if (isNumber(splitInput[i][j]) && first === '') {
            first = splitInput[i][j];
        }
        if (isNumber(splitInput[i][splitInput[i].length - 1 - j]) && second === '') {
            second = splitInput[i][splitInput[i].length - 1 - j];
        }
        if(first !== '' && second !== '') {
            break;
        }
    }
    result += +(first + second);
}

console.log(result);
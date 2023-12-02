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

function containsSpelled(text: string, index: number, forward: boolean) {
    forward ? text = text.substring(0, index) : text = text.substring(index, text.length);

    if (text.includes('one')) {
        return '1';
    } else if (text.includes('two')) {
        return '2';
    } else if (text.includes('three')) {
        return '3';
    } else if (text.includes('four')) {
        return '4';
    } else if (text.includes('five')) {
        return '5';
    } else if (text.includes('six')) {
        return '6';
    } else if (text.includes('seven')) {
        return '7';
    } else if (text.includes('eight')) {
        return '8';
    } else if (text.includes('nine')) {
        return '9';
    }

    return 'nope';
}

let input = fs.readFileSync('1/input.txt', 'utf-8');
let splitInput = input.split('\n');

let result = 0;
for (let i = 0; i < splitInput.length; i++) {
    let first = '';
    let second = '';
    for (let j = 0; j < splitInput[i].length; j++) {
        if (isNumber(splitInput[i][j]) && first === '') {
            first = splitInput[i][j];
        }
        if (isNumber(splitInput[i][splitInput[i].length - 1 - j]) && second === '') {
            second = splitInput[i][splitInput[i].length - 1 - j];
        }
        if (containsSpelled(splitInput[i], j + 1, true) !== 'nope' && first === '') {
            first = containsSpelled(splitInput[i], j + 1, true);
        }
        if (containsSpelled(splitInput[i], splitInput[i].length - 1 - j, false) !== 'nope' && second === '') {
            second = containsSpelled(splitInput[i], splitInput[i].length - 1 - j, false);
        }
        if (first !== '' && second !== '') {
            break;
        }
    }

    result += +(first + second);
}

console.log(result);
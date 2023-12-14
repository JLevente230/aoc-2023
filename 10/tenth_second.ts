import * as fs from 'fs';

let input = '..........\n' +
    '.S------7.\n' +
    '.|F----7|.\n' +
    '.||OOOO||.\n' +
    '.||OOOO||.\n' +
    '.|L-7F-J|.\n' +
    '.|II||II|.\n' +
    '.L--JL--J.\n' +
    '..........';//fs.readFileSync('10/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputMatrix: string[][] = [];
for (let i = 0; i < input.trim().split('\n').length; i++) {
    let rows = input.trim().split('\n')
    inputMatrix.push(rows[i].split(''));
}

let sI = -1;
let sJ = -1;

for (let i = 0; i < inputMatrix.length; i++) {
    if (sI !== -1 && sJ !== -1) break;
    for (let j = 0; j < inputMatrix[i].length; j++) {
        if (inputMatrix[i][j] === 'S') {
            sI = i;
            sJ = j;
            break;
        }
    }
}

let outPutMatrix: string[][] = [];

for (let i = 0; i < inputMatrix.length; i++) {
    outPutMatrix.push([]);
    for (let j = 0; j < inputMatrix[i].length; j++) {
        outPutMatrix[i].push('.');
    }
}

function determineDirection(i: number, j: number, dir: string) {
    outPutMatrix[i][j] = inputMatrix[i][j];
    switch (inputMatrix[i][j]) {
        case '|':
            if (dir === 'n') return 'n';
            if (dir === 's') return 's';
            break;
        case '-':
            if (dir === 'e') return 'e';
            if (dir === 'w') return 'w';
            break;
        case 'L':
            if (dir === 's') return 'e';
            if (dir === 'w') return 'n';
            break;
        case 'J':
            if (dir === 's') return 'w';
            if (dir === 'e') return 'n';
            break;
        case '7':
            if (dir === 'e') return 's';
            if (dir === 'n') return 'w';
            break;
        case 'F':
            if (dir === 'n') return 'e';
            if (dir === 'w') return 's';
            break;
        case 'S':
            return 'done';
        default:
            return '';
    }

    return '';
}

function findNextPart(partI: number, partJ: number, direction: string) {
    let result = [[-1, -1], ''];

    switch (direction) {
        case 'done':
            result[1] = 'done';
            break;
        case 's':
            result[0] = [partI + 1, partJ];
            result[1] = determineDirection(partI + 1, partJ, 's');
            break;
        case 'n':
            result[0] = [partI - 1, partJ];
            result[1] = determineDirection(partI - 1, partJ, 'n');
            break;
        case 'e':
            result[0] = [partI, partJ + 1];
            result[1] = determineDirection(partI, partJ + 1, 'e');
            break;
        case 'w':
            result[0] = [partI, partJ - 1];
            result[1] = determineDirection(partI, partJ - 1, 'w');
            break;

    }

    return result;
}

let partI = sI;
let partJ = sJ;
let direction = 's';
let steps = 0;
while (true) {
    let result = findNextPart(partI, partJ, direction);
    if (result[1] === 'done') {
        break;
    }
    let [nextI, nextJ] = result[0];
    partI = +nextI;
    partJ = +nextJ;
    direction = result[1].toString();
    steps++;
}

let expandedMatrix: string[][] = [];
for (let i = 0; i < outPutMatrix.length * 2; i++) {
    expandedMatrix.push([]);
    for (let j = 0; j < outPutMatrix[0].length * 2; j++) {
        if (i % 2 === 0 && j % 2 === 0) {
            expandedMatrix[i][j] = outPutMatrix[i / 2][j / 2];
        } else {
            expandedMatrix[i][j] = '.';
        }
    }
}

let foundS = false;
for (let i = 0; i < expandedMatrix.length && !foundS; i++) {
    for (let j = 0; j < expandedMatrix[i].length; j++) {
        if (expandedMatrix[i][j] === 'S') {
            expandedMatrix[i][j] = 'F'; // REWRITE THIS
            foundS = true;
            break;
        }
    }
}

for (let i = 0; i < expandedMatrix.length; i++) {
    for (let j = 0; j < expandedMatrix[i].length; j++) {
        if (i < expandedMatrix.length - 1 &&
            (expandedMatrix[i][j] === '|' ||
                expandedMatrix[i][j] === '7')) {
            if (expandedMatrix[i + 1][j] === '.') expandedMatrix[i + 1][j] = '|';
        } else if (j < expandedMatrix[i].length - 1 &&
            (expandedMatrix[i][j] === '-' ||
                expandedMatrix[i][j] === 'L')) {
            if (expandedMatrix[i][j + 1] === '.') expandedMatrix[i][j + 1] = '-';
        } else if ((j < expandedMatrix[i].length - 1 && i < expandedMatrix.length - 1) &&
            expandedMatrix[i][j] === 'F') {
            if (expandedMatrix[i][j + 1] === '.') expandedMatrix[i][j + 1] = '-';
            if (expandedMatrix[i + 1][j] === '.') expandedMatrix[i + 1][j] = '|';
        }
    }
}

let startingI = -1;
let startingJ = -1;
for (let i = 0; i < expandedMatrix.length && startingI === -1; i++) {
    for (let j = 0; j < expandedMatrix[i].length; j++) {
        if (expandedMatrix[i][j] === '.') {
            startingI = i;
            startingJ = j;
            break;
        }
    }
}

function infect(indexI: number, indexJ: number) {
    expandedMatrix[indexI][indexJ] = 'o';

    if (indexJ < expandedMatrix[0].length - 1) {
        if (expandedMatrix[indexI][indexJ + 1] === '.') {
            infect(indexI, indexJ + 1);
        }
    }
    if (indexJ > 0) {
        if (expandedMatrix[indexI][indexJ - 1] === '.') {
            infect(indexI, indexJ - 1);
        }
    }
    if (indexI < expandedMatrix.length - 1) {
        if (expandedMatrix[indexI + 1][indexJ] === '.') {
            infect(indexI + 1, indexJ);
        }
    }
    if (indexI > 0) {
        if (expandedMatrix[indexI - 1][indexJ] === '.') {
            infect(indexI - 1, indexJ);
        }
    }
}

infect(startingI, startingJ);

let realOutPutMatrix: string[] = [];
for (let i = 0; i < expandedMatrix.length; i++) {
    let row = '';
    for (let j = 0; j < expandedMatrix[i].length; j++) {
        row = row + expandedMatrix[i][j];
    }
    realOutPutMatrix.push(row);
}

console.log(realOutPutMatrix);
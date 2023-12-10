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
    outPutMatrix[i][j] = 'X';
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

function noWayOut(indexI: number, indexJ: number) {
    let x = indexI;
    let y = indexJ;
    while (x > 0) {
        if (outPutMatrix[x][indexJ] !== '.') break;
        x--;
    }
    if (x === 0) return false;
    x = indexI;
    while (x < outPutMatrix.length - 1) {
        if (outPutMatrix[x][indexJ] !== '.') break;
        x++;
    }
    if (x === outPutMatrix.length - 1) return false;

    while (y > 0) {
        if (outPutMatrix[indexI][y] !== '.') break;
        y--;
    }
    if (y === 0) return false;
    y = indexJ;
    while (y < outPutMatrix[0].length - 1) {
        if (outPutMatrix[indexI][y] !== '.') break;
        y++;
    }
    if (y === outPutMatrix[0].length - 1) return false;

    return true;
}

let potentiallyCovered: number[][] = [];
for (let i = 0; i < outPutMatrix.length; i++) {
    for (let j = 0; j < outPutMatrix[i].length; j++) {
        if (outPutMatrix[i][j] === '.' && noWayOut(i, j)) {
            outPutMatrix[i][j] = 'O';
            potentiallyCovered.push([i, j]);
        }
    }
}

let realOutPutMatrix: string[] = [];
for (let i = 0; i < outPutMatrix.length; i++) {
    let row = '';
    for (let j = 0; j < outPutMatrix[i].length; j++) {
        row = row + outPutMatrix[i][j];
    }
    realOutPutMatrix.push(row);
}

console.log(realOutPutMatrix);
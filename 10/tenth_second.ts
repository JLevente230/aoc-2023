import * as fs from 'fs';

let input = '.F----7F7F7F7F-7....\n' +
    '.|F--7||||||||FJ....\n' +
    '.||.FJ||||||||L7....\n' +
    'FJL7L7LJLJ||LJ.L-7..\n' +
    'L--J.L7...LJS7F-7L7.\n' +
    '....F-J..F7FJ|L7L7L7\n' +
    '....L7.F7||L7|.L7L7|\n' +
    '.....|FJLJ|FJ|F7|.LJ\n' +
    '....FJL-7.||.||||...\n' +
    '....L---J.LJ.LJLJ...';//fs.readFileSync('10/input.txt', 'utf-8');

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

function infect(indexI: number, indexJ: number, count: number) {
    expandedMatrix[indexI][indexJ] = 'o';
    areas[count].push([indexI, indexJ]);

    if (indexJ < expandedMatrix[0].length - 1) {
        if (expandedMatrix[indexI][indexJ + 1] === '.') {
            infect(indexI, indexJ + 1, count);
        }
    }
    if (indexJ > 0) {
        if (expandedMatrix[indexI][indexJ - 1] === '.') {
            infect(indexI, indexJ - 1, count);
        }
    }
    if (indexI < expandedMatrix.length - 1) {
        if (expandedMatrix[indexI + 1][indexJ] === '.') {
            infect(indexI + 1, indexJ, count);
        }
    }
    if (indexI > 0) {
        if (expandedMatrix[indexI - 1][indexJ] === '.') {
            infect(indexI - 1, indexJ, count);
        }
    }
}

let areas: number[][][] = [];
let count = 0;
while (true) {
    for (let i = 0; i < expandedMatrix.length && startingI === -1; i++) {
        for (let j = 0; j < expandedMatrix[i].length; j++) {
            if (expandedMatrix[i][j] === '.') {
                startingI = i;
                startingJ = j;
                break;
            }
        }
    }

    if (startingI === -1) break;
    areas.push([]);
    infect(startingI, startingJ, count);
    count++;
    startingI = -1;
    startingJ = -1;
}

function wayOut(indexI: number, indexJ: number) {
    let indexFirst = indexI;
    let indexSecond = indexJ;
    while (indexFirst >= 0) {
        if (expandedMatrix[indexFirst][indexJ] !== 'o') {
            break;
        }
        indexFirst--;
    }

    if (indexFirst <= 0) return true;

    indexFirst = indexI;

    while (indexFirst <= expandedMatrix.length - 1) {
        if (expandedMatrix[indexFirst][indexJ] !== 'o') {
            break;
        }
        indexFirst++;
    }
    if (indexFirst >= expandedMatrix.length - 1) return true;

    while (indexSecond >= 0) {
        if (expandedMatrix[indexI][indexSecond] !== 'o') {
            break;
        }
        indexSecond--;
    }
    if (indexSecond <= 0) return true;

    indexSecond = indexJ;

    while (indexSecond <= expandedMatrix[0].length - 1) {
        if (expandedMatrix[indexI][indexSecond] !== 'o') {
            break;
        }
        indexSecond++;
    }
    if (indexSecond >= expandedMatrix[0].length - 1) return true;
    return false;
}

let coveredAreas: number[][] = [];
let thereIsAWayOut = false;
for (let i = 0; i < areas.length; i++) {
    for (let j = 0; j < areas[i].length; j++) {
        if (wayOut(areas[i][j][0], areas[i][j][1])) {
            thereIsAWayOut = true;
            break;
        }
    }
    if (!thereIsAWayOut) {
        for (let k = 0; k < areas[i].length; k++) {
            coveredAreas.push(areas[i][k]);
        }
    }
    thereIsAWayOut = false;
}

function coveredIncludes(indexI: number, indexJ: number): boolean {
    for (let i = 0; i < coveredAreas.length; i++) {
        if (coveredAreas[i][0] === indexI && coveredAreas[i][1] === indexJ) {
            return true;
        }
    }
    return false;
}

for (let i = 0; i < expandedMatrix.length; i++) {
    for (let j = 0; j < expandedMatrix[i].length; j++) {
        if (expandedMatrix[i][j] === 'o' && coveredIncludes(i, j)) {
            expandedMatrix[i][j] = 'X';
        }
    }
}

console.log(areas)

let result = 0;
for (let i = 0; i < expandedMatrix.length; i++) {
    for (let j = 0; j < expandedMatrix[i].length; j++) {
        if (i < expandedMatrix.length - 1 && j < expandedMatrix[i].length - 1 &&
            expandedMatrix[i + 1][j] === 'X' && expandedMatrix[i][j] === 'X' &&
            expandedMatrix[i][j + 1] === 'X' && expandedMatrix[i + 1][j + 1] === 'X') {
            result++;
            j++;
        }
    }
}

let realOutPutMatrix: string[] = [];
for (let i = 0; i < expandedMatrix.length; i++) {
    let row = '';
    for (let j = 0; j < expandedMatrix[i].length; j++) {
        row = row + expandedMatrix[i][j];
    }
    realOutPutMatrix.push(row);
}

console.log(realOutPutMatrix);
console.log(result / 2);
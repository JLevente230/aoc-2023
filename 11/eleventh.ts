import * as fs from 'fs';

let input = '...#......\n' +
    '.......#..\n' +
    '#.........\n' +
    '..........\n' +
    '......#...\n' +
    '.#........\n' +
    '.........#\n' +
    '..........\n' +
    '.......#..\n' +
    '#...#.....';//fs.readFileSync('11/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.split('\n');

let inputMatrix: string[][] = [];
for (let i = 0; i < inputArray.length; i++) {
    inputMatrix.push(inputArray[i].split(''));
}

let transposedMatrix: string[][] = inputMatrix.map(function (row) {
    return row.slice();
});


// this code is by Rajput-Ji
for (let i = 0; i < transposedMatrix.length / 2; i++) {
    for (let j = i; j < transposedMatrix.length - i - 1; j++) {
        let temp = transposedMatrix[i][j];
        transposedMatrix[i][j] = transposedMatrix[transposedMatrix.length - 1 - j][i];
        transposedMatrix[transposedMatrix.length - 1 - j][i] = transposedMatrix[transposedMatrix.length - 1 - i][transposedMatrix.length - 1 - j];
        transposedMatrix[transposedMatrix.length - 1 - i][transposedMatrix.length - 1 - j] = transposedMatrix[j][transposedMatrix.length - 1 - i];
        transposedMatrix[j][transposedMatrix.length - 1 - i] = temp;
    }
}

let columns: number[] = [];
for (let i = 0; i < transposedMatrix.length; i++) {
    if (!transposedMatrix[i].includes('#')) {
        columns.push(i);
    }
}

for (let i = 0; i < inputMatrix.length; i++) {
    if (!inputMatrix[i].includes('#')) {
        let inputFirst = inputMatrix.slice(0, i);
        let row: string[] = [];
        for (let j = 0; j < inputMatrix[i].length; j++) {
            row.push('.');
        }
        inputFirst.push(row);
        let inputSecond = inputMatrix.slice(i);

        inputMatrix = inputFirst.concat(inputSecond);
        i = i + 2;
    }
}

for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[i].length; j++) {
        if (columns.includes(j)) {
            let inputFirst = inputMatrix[i].slice(0, j);
            let value = '.';
            inputFirst.push(value);
            let inputSecond = inputMatrix[i].slice(j);
            inputMatrix[i] = inputFirst.concat(inputSecond);
            j++;
        }
    }
}


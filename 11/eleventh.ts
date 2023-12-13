import * as fs from 'fs';

let input = fs.readFileSync('11/input.txt', 'utf-8');

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

for (let i = 0; i < inputMatrix.length;) {
    if (!inputMatrix[i].includes('#')) {
        let inputFirst = inputMatrix.slice(0, i);
        let row: string[] = [];
        for (let j = 0; j < inputMatrix[i].length; j++) {
            row.push('.');
        }
        for (let k = 0; k < 1000000 - 1; k++) {
            inputFirst.push(row);
        }
        let inputSecond = inputMatrix.slice(i);

        inputMatrix = inputFirst.concat(inputSecond);
        i = i + 1000000;
    } else i++;
}

for (let i = 0; i < inputMatrix.length; i++) {
    let offset = 0;
    for (let j = 0; j < inputMatrix[i].length;) {
        if (columns.includes(j - offset)) {
            let firstPart = inputMatrix[i].slice(0, j);
            let secondPart = inputMatrix[i].slice(j);
            for (let k = 0; k < 1000000 - 1; k++) {
                firstPart.push('.');
            }
            inputMatrix[i] = firstPart.concat(secondPart);
            j = j + 1000000;
            offset = offset + 1000000;
        } else {
            j++;
        }
    }
}

let tempArray = [];
for (let i = 0; i < inputMatrix.length; i++) {
    tempArray.push(inputMatrix[i].join(''));
}

let galaxies: number[][] = [];

for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[i].length; j++) {
        if (inputMatrix[i][j] === '#') galaxies.push([i, j]);
    }
}

let result = 0;
for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        result += (Math.abs((galaxies[j][1] - galaxies[i][1])) + Math.abs((galaxies[j][0] - galaxies[i][0])));
    }
}

console.log(result)
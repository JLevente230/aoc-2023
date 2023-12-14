import * as fs from 'fs';

let input = fs.readFileSync('11/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.split('\n');

let inputMatrix: string[][] = [];
for (let i = 0; i < inputArray.length; i++) {
    inputMatrix.push(inputArray[i].split(''));
}

let tempArray = [];
for (let i = 0; i < inputMatrix.length; i++) {
    tempArray.push(inputMatrix[i].join(''));
}

console.log(tempArray);

function findRows(): number[] {
    let rows: number[] = [];
    for (let i = 0; i < inputMatrix.length; i++) {
        if (!inputMatrix[i].includes('#')) {
            rows.push(i);
        }
    }
    return rows;
}

function findColumns() {
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
    return columns;
}

let rows: number[] = findRows();
let columns: number[] = findColumns();

let galaxies: number[][] = [];

for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[i].length; j++) {
        if (inputMatrix[i][j] === '#') {
            let galaxyI = i;
            let galaxyJ = j;
            for (let k = 0; k < rows.length; k++) {
                if (rows[k] <= i) {
                    galaxyI += 1000000 - 1;
                }
            }
            for (let k = 0; k < columns.length; k++) {
                if (columns[k] <= j) {
                    galaxyJ += 1000000 - 1;
                }
            }
            galaxies.push([galaxyI, galaxyJ]);
        }
    }
}

console.log(galaxies)

let result = 0;
for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        result += (Math.abs((galaxies[j][1] - galaxies[i][1])) + Math.abs((galaxies[j][0] - galaxies[i][0])));
    }
}

console.log(result)
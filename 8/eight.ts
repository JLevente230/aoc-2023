import * as fs from 'fs';

let input = fs.readFileSync('8/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.trim().split('\n');

let directions = inputArray[0];

let map: Map<string, string[]> = new Map();

for (let i = 0; i < inputArray.length - 2; i++) {
    let row = inputArray[i + 2].split('=');
    let pair = row[1].trim().split(',');
    map.set(row[0].trim(), [
        pair[0].slice(1),
        pair[1].trim().slice(0, -1)
    ]);
}

let leftMap: Map<string, string> = new Map();
let rightMap: Map<string, string> = new Map();
for (let i = 2; i < inputArray.length; i++) {
    let position = inputArray[i].split('=')[0].trim();
    let left = lookUpPosition(position, 'L');
    let right = lookUpPosition(position, 'R');
    leftMap.set(position, left);
    rightMap.set(position, right);
}

function lookUpPosition(position: string, direction: string) {
    let newPositions = map.get(position);
    if (direction === 'L' && newPositions) {
        return newPositions[0];
    } else if (direction === 'R' && newPositions) {
        return newPositions[1];
    } else return 'XDDDDDDDDDDDDDDDDDD';
}

let counter = 0;
let prevResult = 'AAA';
while (true) {
    let direction = directions[counter % directions.length];
    let result = direction === 'L' ? leftMap.get(prevResult) : rightMap.get(prevResult);
    if (result !== undefined) prevResult = result;
    counter++;
    if (result === 'ZZZ') {
        break;
    }
}

console.log(counter);
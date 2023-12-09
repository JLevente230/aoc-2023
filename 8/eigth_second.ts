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

let nodes: string[] = [];
for (let key of map.keys()) {
    if (key[2] === 'A') nodes.push(key);
}

let result = 0;
let zArray: number[] = new Array(nodes.length);
let zFound = false;
while (true) {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i][2] === 'Z' && zArray[i] === undefined) {
            zArray[i] = result;
            zFound = true;
        }
    }

    for (let i = 0; i < zArray.length; i++) {
        if (zArray[i] === undefined) {
            zFound = false;
            break;
        }
    }

    if (zFound) break;

    let direction = directions[result % directions.length];
    for (let i = 0; i < nodes.length; i++) {
        let compute = direction === 'L' ? leftMap.get(nodes[i]) : rightMap.get(nodes[i]);
        if (compute !== undefined) nodes[i] = compute;
    }
    result++;
}

// most of this function is copied from user https://stackoverflow.com/users/1613023/rgbchris
function findLeastCommonMultiple(array: number[]) {
    function gcd(a: number, b: number): number {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a: number, b: number): number {
        return (a * b) / gcd(a, b);
    }

    var multiple = Math.min(...array);
    array.forEach(function (n) {
        multiple = lcm(multiple, n);
    });

    return multiple;
}

console.log(findLeastCommonMultiple(zArray));
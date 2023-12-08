import * as fs from 'fs';

let input = fs.readFileSync('8/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.trim().split('\n');

let directions = inputArray[0];
console.log(directions.length)

let map: Map<string, string[]> = new Map();

for (let i = 0; i < inputArray.length - 2; i++) {
    let row = inputArray[i + 2].split('=');
    let pair = row[1].trim().split(',');
    map.set(row[0].trim(), [
        pair[0].slice(1),
        pair[1].trim().slice(0, -1)
    ]);
}

console.log(map)

function lookUpPosition(position: string, direction: string) {
    let newPositions = map.get(position);
    if (direction === 'L' && newPositions) {
        return newPositions[0];
    } else if (direction === 'R' && newPositions) {
        return newPositions[1];
    } else return 'XDDDDDDDDDDDDDDDDDD';
}

function right(position: string) {
    return lookUpPosition(position, 'R');
}

function left(position: string) {
    return lookUpPosition(position, 'L');
}

function evaluate(position: string, direction: string) {
    if (direction === 'L') return left(position);
    return right(position);
}

function getDirection(steps: number) {
    let index = (steps % directions.length);
    return directions[index];
}

function follow(position: string, steps: number, direction: string) {
    let evaluation = evaluate(position, direction);
    if (evaluation === 'ZZZ') {
        return steps;
    } else {
        let newDirection = getDirection(steps);
        return follow(evaluation, steps + 1, newDirection);
    }
}

console.log(follow('AAA', 1, directions[0]));
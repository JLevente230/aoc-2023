import * as fs from 'fs';

let input = fs.readFileSync('9/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let histories = input.trim().split('\n');

function filledWithZeroes(array: number[]) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 0) return false;
    }
    return true;
}

let resArray = [];
for (let i = 0; i < histories.length; i++) {
    let history = histories[i].split(' ');
    let newHistory: number[] = [];
    let prevHistory: number[] = [];
    for (let j = 0; j < history.length; j++) newHistory[j] = +history[j];
    newHistory.reverse();
    let zeroed = false;
    let increase = 0;
    while (!zeroed) {
        prevHistory = [...newHistory];
        for (let j = 0; j < prevHistory.length - 1; j++) {
            newHistory[j] = prevHistory[j + 1] - prevHistory[j];
            if (j === prevHistory.length - 2) {
                increase += prevHistory[prevHistory.length - 1];
            }
        }
        newHistory = newHistory.slice(0, -1);
        if (filledWithZeroes(newHistory)) {
            resArray.push(increase);
            zeroed = true;
        }
    }
}

let result = 0;
for (let i = 0; i < resArray.length; i++) {
    result += resArray[i];
}

console.log(result)
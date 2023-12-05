import * as fs from 'fs';

let input = fs.readFileSync('5/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.trim().split('\n\n');

for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = inputArray[i].slice(inputArray[i].indexOf(':') + 1).trim();
}

let seeds = inputArray[0].split(' ');

let result = Number.MAX_SAFE_INTEGER;

for (let i = 0; i < seeds.length; i++) { // seeds
    let seed = +seeds[i];
    //console.log('CURRENT SEED: ' + seed)
    for (let j = 1; j <= 7; j++) { // maps
        let currentMap = inputArray[j].split('\n');
        //console.log('   CURRENT MAP: ' + j)
        for (let k = 0; k < currentMap.length; k++) { // rows
            let row = currentMap[k].split(' '); // row, only 3 values
            if (inRange(seed, +row[1], +row[1] + +row[2] - 1)) {
                seed += +row[0] - +row[1];
                //console.log('CHANGED: ' + seed + ' ON ROW: ' + row)
                break;
            }
        }
    }

    if (seed < result) {
        result = seed;
    }
}

function inRange(n:number, from:number, to:number) {
    return n >= from && n <= to;
}

console.log(result)
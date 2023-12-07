import * as fs from 'fs';

let input = fs.readFileSync('5/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.trim().split('\n\n');

for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = inputArray[i].slice(inputArray[i].indexOf(':') + 1).trim();
}

let actualSeeds = inputArray[0].split(' ');

let backMappedSeeds = [];

let ssArray = inputArray[1].split('\n');
let sfArray = inputArray[2].split('\n');
let fwArray = inputArray[3].split('\n');
let wlArray = inputArray[4].split('\n');
let ltArray = inputArray[5].split('\n');
let thArray = inputArray[6].split('\n');
let hlArray = inputArray[7].split('\n');

let allDestinations: number[][] = [];
allDestinations.push([]);
ssArray.forEach(function (row) {
    allDestinations[0].push(+row.split(' ')[0]);
});
allDestinations.push([]);
sfArray.forEach(function (row) {
    allDestinations[1].push(+row.split(' ')[0]);
});
allDestinations.push([]);
fwArray.forEach(function (row) {
    allDestinations[2].push(+row.split(' ')[0]);
});
allDestinations.push([]);
wlArray.forEach(function (row) {
    allDestinations[3].push(+row.split(' ')[0]);
});
allDestinations.push([]);
ltArray.forEach(function (row) {
    allDestinations[4].push(+row.split(' ')[0]);
});
allDestinations.push([]);
thArray.forEach(function (row) {
    allDestinations[5].push(+row.split(' ')[0]);
});
allDestinations.push([]);
hlArray.forEach(function (row) {
    allDestinations[6].push(+row.split(' ')[0]);
});

for (let i = 0; i < allDestinations.length; i++) {
    for (let j = 0; j < allDestinations[i].length; j++) {
        let currentUnit = allDestinations[i][j];
        for (let k = 1 + i; k >= 1; k--) {
            let map = inputArray[k].split('\n');
            for (let l = 0; l < map.length; l++) {
                let splitMap = map[l].split(' ');
                let from = +splitMap[0];
                let to = +splitMap[0] + +splitMap[2] - 1;
                if (isInInterval(currentUnit, from, to)) {
                    currentUnit += +splitMap[1] - +splitMap[0];
                    break;
                }
            }
        }
        backMappedSeeds.push(currentUnit);
    }
}

backMappedSeeds = backMappedSeeds.filter(isValidSeed);

let result = Number.MAX_SAFE_INTEGER;

for (let i = 0; i < backMappedSeeds.length; i++) {
    let seed = backMappedSeeds[i];
    for (let j = 1; j <= 7; j++) {
        let currentMap = inputArray[j].split('\n');
        for (let k = 0; k < currentMap.length; k++) {
            let row = currentMap[k].split(' ');
            if (isInInterval(seed, +row[1], +row[1] + +row[2] - 1)) {
                seed += +row[0] - +row[1];
                break;
            }
        }
    }

    if (seed < result) {
        result = seed;
    }
}

console.log(result)

function isInInterval(n: number, from: number, to: number) {
    return n >= from && n <= to;
}

function isValidSeed(seed: number) {
    for (let i = 0; i < actualSeeds.length; i = i + 2) {
        if (isInInterval(seed, +actualSeeds[i], +actualSeeds[i] + +actualSeeds[i + 1] - 1)) {
            return true;
        }
    }
    return false;
}
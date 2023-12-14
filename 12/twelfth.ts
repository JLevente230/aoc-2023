import * as fs from 'fs';

let input = '???.### 1,1,3\n' +
    '.??..??...?##. 1,1,3\n' +
    '?#?#?#?#?#?#?#? 1,3,1,6\n' +
    '????.#...#... 4,1,1\n' +
    '????.######..#####. 1,6,5\n' +
    '?###???????? 3,2,1';//fs.readFileSync('12/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.split('\n');

let parts: string[] = [];
let brokens: string[][] = [];
for (let i = 0; i < inputArray.length; i++) {
    let row = inputArray[i].split(' ');
    parts.push(row[0]);
    brokens.push(row[1].split(','));
}

console.log(parts)
console.log(brokens)

function getArrangements(parts: string, brokens: string[]): number {
    for (let i = 0; i < parts.length; i++) {
        /// here goes the logic
    }
    return 0;
}

let result = 0;
for (let i = 0; i < inputArray.length; i++) {
    result += getArrangements(parts[i], brokens[i]);
}
console.log(result);
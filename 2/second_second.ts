import * as fs from 'fs';

let input = fs.readFileSync('2/input.txt', 'utf-8');
let splitInput = input.split('\n');

let result = 0;

function replaceAll(xd: string, from: string, to: string) {
    let xdd = '';
    for (let i = 0; i < xd.length; i++) {
        if (xd[i] === from){
            xdd += to;
        } else {
            xdd += xd[i];
        }
    }

    return xdd;
}

splitInput.forEach(function (game) {
        const colon = game.indexOf(':');
        game = game.slice(colon + 1);
        game = game.replace('\r', '');

        let gameXd = replaceAll(game, ';', ',');

        let redMax = 1;
        let greenMax = 1;
        let blueMax = 1;

        let gameArray = gameXd.split(',');

        gameArray.forEach(function (pair){
            let number = pair.split(' ')[1];
            let color = pair.split(' ')[2];

            switch (color) {
                case ('red'):
                    if (+number > redMax) redMax = +number;
                    break;
                case ('green'):
                    if (+number > greenMax) greenMax = +number;
                    break;
                case ('blue'):
                    if (+number > blueMax) blueMax = +number;
                    break;
            }
        });

        result += redMax * greenMax * blueMax;
    }
);

console.log(result);
import * as fs from 'fs';

let input = fs.readFileSync('7/input.txt', 'utf-8');

while (input.includes('\r')) input = input.replace('\r', '');

let inputArray = input.trim().split('\n');

let hands: string[] = [];
let bids: string[] = [];
for (let i = 0; i < inputArray.length; i++) {
    let row = inputArray[i].split(' ');
    hands.push(row[0]);
    bids.push(row[1]);
}

function lookUpBid(hand: string) {
    for (let i = 0; i < hands.length; i++) {
        if (hands[i] === hand) {
            return bids[i];
        }
    }

    return '';
}

enum HandType {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind
}

enum CardType {
    Nothing = 0,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace
}

function determineCardType(card: string) {
    let cardType: CardType = CardType.Nothing;
    switch (card) {
        case '2':
            cardType = CardType.Two;
            break;
        case '3':
            cardType = CardType.Three;
            break;
        case '4':
            cardType = CardType.Four;
            break;
        case '5':
            cardType = CardType.Five;
            break;
        case '6':
            cardType = CardType.Six;
            break;
        case '7':
            cardType = CardType.Seven;
            break;
        case '8':
            cardType = CardType.Eight;
            break;
        case '9':
            cardType = CardType.Nine;
            break;
        case 'T':
            cardType = CardType.Ten;
            break;
        case 'J':
            cardType = CardType.Jack;
            break;
        case 'Q':
            cardType = CardType.Queen;
            break;
        case 'K':
            cardType = CardType.King;
            break;
        case 'A':
            cardType = CardType.Ace;
            break;
    }
    return cardType;
}

function compareSameType(first: string, second: string) {
    for (let i = 0; i < first.length; i++) {
        if (determineCardType(first[i]) > determineCardType(second[i])) {
            return -1;
        } else if (determineCardType(second[i]) > determineCardType(first[i])) {
            return 1;
        }
    }

    return 0;
}

function compareHands(first: string, second: string) {
    if (determineHandType(first) > determineHandType(second)) {
        return -1;
    } else if (determineHandType(second) > determineHandType(first)) {
        return 1;
    } else {
        return compareSameType(first, second);
    }
}

function determineHandType(hand: string) {

    let counterArray: number[] = new Array(14).fill(0);

    for (let i = 0; i < hand.length; i++) {
        counterArray[determineCardType(hand[i])]++;
    }

    let pairs = 0;
    let threes = 0;
    let fours = 0;
    let fives = 0;
    for (let i = 0; i < counterArray.length; i++) {
        if (counterArray[i] === 2) {
            pairs++;
        } else if (counterArray[i] === 3) {
            threes++;
        } else if (counterArray[i] === 4) {
            fours++;
        } else if (counterArray[i] === 5) {
            fives++;
        }
    }

    if (fives === 1) return HandType.FiveOfAKind;
    else if (fours === 1) return HandType.FourOfAKind;
    else if (threes === 1) {
        if (pairs === 1) return HandType.FullHouse;
        else return HandType.ThreeOfAKind;
    } else if (pairs === 2) return HandType.TwoPair;
    else if (pairs === 1) return HandType.OnePair;
    else return HandType.HighCard;
}

let sortedHands = [...hands];
sortedHands.sort(compareHands).reverse();

let result = 0;
for (let i = 0; i < sortedHands.length; i++) {
    result += +lookUpBid(sortedHands[i]) * (i + 1);
}

console.log(result);
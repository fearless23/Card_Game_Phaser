import { DeckType } from "./deckTypes";

const createDeck = function () {
  const suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];
  const deck = [];
  let i = 1;
  for (let suit of suits) {
    for (let val of values) {
      deck.push({
        suit,
        val,
        name: `${val}_of_${suit}`.toLowerCase(),
        pos: i,
      });
      i++;
    }
  }
  return deck;
};

const createDeckPos = () => {
  const pos = [];
  for (let i = 0; i < 52; i++) {
    pos.push(i);
  }
  return pos;
};

const deck: DeckType = [
  { pos: 1, suit: "Spades", val: "Ace", name: "Ace of Spades" },
  { pos: 2, suit: "Spades", val: "2", name: "2 of Spades" },
  { pos: 3, suit: "Spades", val: "3", name: "3 of Spades" },
  { pos: 4, suit: "Spades", val: "4", name: "4 of Spades" },
  { pos: 5, suit: "Spades", val: "5", name: "5 of Spades" },
  { pos: 6, suit: "Spades", val: "6", name: "6 of Spades" },
  { pos: 7, suit: "Spades", val: "7", name: "7 of Spades" },
  { pos: 8, suit: "Spades", val: "8", name: "8 of Spades" },
  { pos: 9, suit: "Spades", val: "9", name: "9 of Spades" },
  { pos: 10, suit: "Spades", val: "10", name: "10 of Spades" },
  { pos: 11, suit: "Spades", val: "Jack", name: "Jack of Spades" },
  { pos: 12, suit: "Spades", val: "Queen", name: "Queen of Spades" },
  { pos: 13, suit: "Spades", val: "King", name: "King of Spades" },
  { pos: 14, suit: "Hearts", val: "Ace", name: "Ace of Hearts" },
  { pos: 15, suit: "Hearts", val: "2", name: "2 of Hearts" },
  { pos: 16, suit: "Hearts", val: "3", name: "3 of Hearts" },
  { pos: 17, suit: "Hearts", val: "4", name: "4 of Hearts" },
  { pos: 18, suit: "Hearts", val: "5", name: "5 of Hearts" },
  { pos: 19, suit: "Hearts", val: "6", name: "6 of Hearts" },
  { pos: 20, suit: "Hearts", val: "7", name: "7 of Hearts" },
  { pos: 21, suit: "Hearts", val: "8", name: "8 of Hearts" },
  { pos: 22, suit: "Hearts", val: "9", name: "9 of Hearts" },
  { pos: 23, suit: "Hearts", val: "10", name: "10 of Hearts" },
  { pos: 24, suit: "Hearts", val: "Jack", name: "Jack of Hearts" },
  { pos: 25, suit: "Hearts", val: "Queen", name: "Queen of Hearts" },
  { pos: 26, suit: "Hearts", val: "King", name: "King of Hearts" },
  { pos: 27, suit: "Clubs", val: "Ace", name: "Ace of Clubs" },
  { pos: 28, suit: "Clubs", val: "2", name: "2 of Clubs" },
  { pos: 29, suit: "Clubs", val: "3", name: "3 of Clubs" },
  { pos: 30, suit: "Clubs", val: "4", name: "4 of Clubs" },
  { pos: 31, suit: "Clubs", val: "5", name: "5 of Clubs" },
  { pos: 32, suit: "Clubs", val: "6", name: "6 of Clubs" },
  { pos: 33, suit: "Clubs", val: "7", name: "7 of Clubs" },
  { pos: 34, suit: "Clubs", val: "8", name: "8 of Clubs" },
  { pos: 35, suit: "Clubs", val: "9", name: "9 of Clubs" },
  { pos: 36, suit: "Clubs", val: "10", name: "10 of Clubs" },
  { pos: 37, suit: "Clubs", val: "Jack", name: "Jack of Clubs" },
  { pos: 38, suit: "Clubs", val: "Queen", name: "Queen of Clubs" },
  { pos: 39, suit: "Clubs", val: "King", name: "King of Clubs" },
  { pos: 40, suit: "Diamonds", val: "Ace", name: "Ace of Diamonds" },
  { pos: 41, suit: "Diamonds", val: "2", name: "2 of Diamonds" },
  { pos: 42, suit: "Diamonds", val: "3", name: "3 of Diamonds" },
  { pos: 43, suit: "Diamonds", val: "4", name: "4 of Diamonds" },
  { pos: 44, suit: "Diamonds", val: "5", name: "5 of Diamonds" },
  { pos: 45, suit: "Diamonds", val: "6", name: "6 of Diamonds" },
  { pos: 46, suit: "Diamonds", val: "7", name: "7 of Diamonds" },
  { pos: 47, suit: "Diamonds", val: "8", name: "8 of Diamonds" },
  { pos: 48, suit: "Diamonds", val: "9", name: "9 of Diamonds" },
  { pos: 49, suit: "Diamonds", val: "10", name: "10 of Diamonds" },
  { pos: 50, suit: "Diamonds", val: "Jack", name: "Jack of Diamonds" },
  { pos: 51, suit: "Diamonds", val: "Queen", name: "Queen of Diamonds" },
  { pos: 52, suit: "Diamonds", val: "King", name: "King of Diamonds" },
];

const deckPos = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
];

export const getDeckPos = () => {
  return [...deckPos];
};

export const getDeck = () => {
  return createDeck();
};

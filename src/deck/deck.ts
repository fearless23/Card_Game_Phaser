import { Players } from "../players";
import { getDeck, getDeckPos } from "./data";
import { CardType } from "./deckTypes";

export class Deck {
  deck: CardType[] = getDeck();
  deckPos: number[] = getDeckPos();
  constructor() {
    
  }

  private _reset() {
    this.deckPos = getDeckPos();
  }

  private _randIdx() {
    return Math.floor(Math.random() * this.deckPos.length);
  }

  private _takeACard() {
    const randIdx = this._randIdx();
    const randPos = this.deckPos[randIdx];
    this.deckPos.splice(randIdx, 1);
    return this.deck[randPos];
  }

  private _takeNCards(n = 1) {
    if (n === 0 || n > 13) throw new Error("Wrong Cards");
    if (n > this.deckPos.length)
      throw new Error(`Only ${this.deckPos.length} cards left`);
    const cards = [];
    for (let i = 0; i < n; i++) {
      cards.push(this._takeACard());
    }
    return cards;
  }

  private _orderCards(randomCards: CardType[]) {
    return randomCards.sort((a, b) => a.pos - b.pos);
  }

  dealCards(playerNames: string[], teams: boolean) {
    this._reset();
    const pp = new Players();
    const players = pp.createPlayers(playerNames, teams);

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      const cards = this._orderCards(this._takeNCards(13));
      player.cards.push(...cards);
    }
    return players;
  }
}

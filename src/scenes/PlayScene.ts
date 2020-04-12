import { CST } from "../CST";
import { CardImage } from "../customClasses/CardImage";
import { Deck, CardType } from "./../deck";
import { PlayerType } from "../players";

type Trick = {
  hands: { card: CardType; pIdx: number }[];
  suit: string;
  hasTrump: boolean;
  tmpC: CardImage[];
};

const initTrick = () => {
  return <Trick>{
    hands: [],
    suit: "",
    hasTrump: false,
    tmpC: [],
  };
};

export class PlayScene extends Phaser.Scene {
  players: PlayerType[] = [];
  trick: Trick = initTrick();
  trumpSuit: string = "Diamonds";
  pTurn: number = 0;
  play: boolean = false;
  constructor() {
    super({ key: CST.SCENES.PLAY });
  }

  preload() {}

  addCard(x: number, y: number, texture: string, pIdx: number, cIdx: number) {
    const c = new CardImage(this, x, y, texture);
    const { width, height } = this.game.renderer;
    const mh = height / 2;
    const mw = width / 2;
    const { name, cards } = this.players[pIdx];
    const card = cards[cIdx];
    c.setInteractive();

    // c.on("pointerover", () => {
    //   c.setScale(0.4);
    // });
    // c.on("pointerout", () => {
    //   c.setScale(0.4);
    // });
    c.on("pointerup", () => {
      if (!this.play) {
        console.log("WAIT");
        return;
      }
      this.play = false;
      // 1. If its my Turn
      if (this.pTurn !== pIdx) {
        console.log("Not your turn");
        this.play = true;
        return;
      }
      console.log("HANDS", this.trick.hands.length);
      // 2. My Turn
      // but i am first...
      if (this.trick.hands.length === 0) {
        this.trick.suit = card.suit;
      }
      // but i am not first...
      else {
        const iHaveTrickSuit = cards
          .filter((c) => !c.used)
          .some((c) => c.suit === this.trick.suit);
        // If suit not match trick suit
        if (card.suit !== this.trick.suit && iHaveTrickSuit) {
          console.log(`R: ${this.trick.suit} P: ${card.suit}`);
          this.play = true;
          return;
        }
      }
      if (card.suit === this.trumpSuit) this.trick.hasTrump = true;

      c.input.enabled = false;
      if (pIdx === 0) {
        c.y = mh - 90;
        c.x = mw;
      }
      if (pIdx === 1) {
        c.x = mw - 90;
      }
      if (pIdx === 2) {
        c.y = mh + 90;
        c.x = mw;
      }
      if (pIdx === 3) {
        c.x = mw + 90;
      }
      card.used = true;
      this.trick.hands.push({ card, pIdx });
      this.trick.tmpC.push(c);

      if (this.trick.hands.length === 4) {
        this.allFourDealt();
      } else {
        this.pTurn = this.pTurn + 1 > 3 ? 0 : this.pTurn + 1;
        this.play = true;
      }
    });
    // return c;
  }

  allFourDealt() {
    let cards = [];
    if (this.trick.hasTrump) {
      cards = this.trick.hands.filter((c) => c.card.suit === this.trumpSuit);
    } else {
      cards = this.trick.hands.filter((c) => c.card.suit === this.trick.suit);
    }
    const winnerCard = cards.sort((a, b) => b.card.pos - a.card.pos)[0];
    this.pTurn = winnerCard.pIdx;
    console.log(winnerCard);
    this.trick.tmpC.forEach((tc) => tc.setAlpha(0.5));
    setTimeout(() => {
      this.trick.tmpC.forEach((tc) => tc.destroy());
      this.trick = initTrick();
      this.play = true;
    }, 1500);
  }

  create() {
    const { TABLEBG } = CST.IMAGES;
    this.add.image(0, 0, TABLEBG).setScale(1.42).setOrigin(0).setDepth(0);

    // cg = cardGroup
    const pad = 20;
    const cardPad = 15;
    const cWidth = 111;
    const cHeight = 161;
    const cgWidth = 12 * cardPad + cWidth;

    const { width, height } = this.game.renderer;

    const ax = 0.5 * width - 6 * cardPad; //(width - cgWidth) / 2 + 0.5 * cWidth;
    const bx = pad + 0.5 * cWidth;
    const ay = height / 2; //(height - cgHeight) / 2 + 0.5 * cHeight;
    const by = pad + 0.5 * cHeight;
    const positions = [
      { x: ax, y: by },
      { x: bx, y: ay },
      { x: ax, y: height - by },
      { x: width - pad + 0.5 * cWidth - cgWidth, y: ay },
    ];
    const style = {
      font: "30px Arial",
      fill: "#ffffff",
      align: "center",
    };

    const d = new Deck();
    this.players = d.dealCards(["Pandit", "Sushil", "Jassi", "Akshay"], true);
    const msg = this.add
      .text(width / 2, height / 2, "Hello", style)
      .setDepth(2);
    msg.x -= msg.width / 2;

    for (let i = 0; i < 4; i++) {
      const { name, cards } = this.players[i];
      const { x, y } = positions[i];

      this.add.text(x + 50, y + 65, name, style).setDepth(2);

      for (let j = 0; j < 13; j++) {
        const { name } = cards[j];
        this.addCard(x + j * cardPad, y, name + ".png", i, j);
      }
    }

    this.play = true;
  }

  update(time: number, delta: number) {}
}

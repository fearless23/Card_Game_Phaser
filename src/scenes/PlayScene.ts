import { CST } from "../CST";
import { CardImage } from "../customClasses/CardImage";
import { Deck, CardType } from "./../deck";
import { PlayerType } from "../players";
import { gamesDB } from "../fbdb/fbdb";

type Trick = {
  hands: { card: CardType; pIdx: number }[];
  suit: string;
  hasTrump: boolean;
};

type PlaySceneInput = { me: meType; playersNames: string[]; gameId: string };

const initTrick = () => {
  return <Trick>{
    hands: [],
    suit: "",
    hasTrump: false,
  };
};

const style = {
  font: "30px Arial",
  fill: "#ffffff",
  align: "center",
};

const pad = 20;
const cardPad = 20;
const cHeight = 161;

type meType = { name: string; idx: number; admin: boolean };
export class PlayScene extends Phaser.Scene {
  me!: meType;
  playersNames!: string[];
  gameId!: string;
  gameNum = 1;
  gameDataDB!: firebase.firestore.DocumentReference;

  myCards!: CardType[];

  play: boolean = false;
  pTurn: number = 0;
  trick: Trick = initTrick();
  trumpSuit: string = "Diamonds";
  tmpC: CardImage[] = [];
  constructor() {
    super({ key: CST.SCENES.PLAY });
  }

  init(data: PlaySceneInput) {
    this.me = data.me;
    this.playersNames = data.playersNames;
    this.gameId = data.gameId;
    this.gameDataDB = gamesDB
      .doc(this.gameId)
      .collection("games")
      .doc(`g${this.gameNum}`);
  }

  preload() {}

  private addText(
    x: number,
    y: number,
    text: string,
    fill: string = "#ffffff"
  ) {
    const t = this.add.text(x, y, text, {
      fill,
      font: "30px Arial",
      align: "center",
    });
    t.setDepth(2);
    return t;
  }

  private cardClicked(c: CardImage, pIdx: number, cIdx: number) {
    const { width, height } = this.game.renderer;
    const mh = height / 2;
    const mw = width / 2;
    const cards = this.myCards;
    const card = cards[cIdx];
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

    c.y = mh + 90;
    c.x = mw;

    this.tmpC.push(c);

    // Update on DB
    this.trick.hands.push({ card, pIdx });
    this.pTurn = this.pTurn + 1 > 3 ? 0 : this.pTurn + 1;
    this.play = true;
    // If i was last to play
    if (this.trick.hands.length === 4) {
      this.play = false;
      this.pTurn = -1;
    }
    this.gameDataDB.update({ ...this.trick, play: true, pTurn: this.pTurn });
  }

  private allFourDealt() {
    // Only do calc on admin
    if (this.me.idx === 0) {
      let cards = [];
      if (this.trick.hasTrump) {
        cards = this.trick.hands.filter((c) => c.card.suit === this.trumpSuit);
      } else {
        cards = this.trick.hands.filter((c) => c.card.suit === this.trick.suit);
      }
      const winnerCard = cards.sort((a, b) => b.card.pos - a.card.pos)[0];
      this.pTurn = winnerCard.pIdx;
      console.log("WINNER: ", winnerCard);
      this.trick = initTrick();
      this.gameDataDB.update({
        hands: [],
        suit: "",
        hasTrump: false,
        play: true,
        pTurn: this.pTurn,
      });
    }

    // Do this on all...
    this.tmpC.forEach((tc) => tc.setAlpha(0.5));
    setTimeout(() => {
      this.tmpC.forEach((tc) => tc.destroy());
      this.tmpC = [];
    }, 500);
  }

  private getPos(width: number, height: number) {
    const mw = 0.5 * width;
    const my = 0.5 * height;
    const by = pad + 0.5 * cHeight;

    return [
      { x: mw, y: pad },
      { x: pad, y: my },
      { x: 0.5 * width - 6 * cardPad, y: height - by },
      { x: width - pad - 100, y: my },
    ];
  }

  private showMyCards(
    pIdx: number,
    positions: { x: number; y: number }[],
    cards: CardType[]
  ) {
    this.myCards = cards;
    const { x, y } = positions[2];
    this.add.text(x + 50, y + 65, this.me.name, style).setDepth(2);

    for (let i = 0; i < 13; i++) {
      const { name } = this.myCards[i];
      const c = new CardImage(this, x + i * cardPad, y, name + ".png");
      c.setInteractive();
      c.on("pointerup", () => {
        this.cardClicked(c, pIdx, i);
      });
    }
    this.play = true;
  }

  private addCardsToDb(pIdx: number, cards: CardType[]) {
    return gamesDB
      .doc(this.gameId)
      .collection("cards")
      .doc(`P${pIdx + 1}`)
      .set({ cards });
  }

  create() {
    const { width, height } = this.game.renderer;
    const { TABLEBG } = CST.IMAGES;
    this.add.image(0, 0, TABLEBG).setScale(1.42).setOrigin(0).setDepth(0);

    const positions = this.getPos(width, height);
    const pIdx = this.me.idx;

    // Set Names of other 3 players
    for (let i = 1; i < 4; i++) {
      const playerIdx = (pIdx + i) % 4;
      const name = this.playersNames[playerIdx];
      const posIdx = (2 + i) % 4;
      const { x, y } = positions[posIdx];
      this.add.text(x, y, name, style).setDepth(2);
    }
    const msg = this.addText(width / 2, height / 2, "Hello").setDepth(2);
    msg.x -= msg.width / 2;

    // If Admin, deal cards i.e calc are done on admin client...
    if (this.me.admin) {
      const d = new Deck();
      const players = d.dealCards(this.playersNames, true);

      const x = [
        this.addCardsToDb(0, players[0].cards),
        this.addCardsToDb(1, players[1].cards),
        this.addCardsToDb(2, players[2].cards),
        this.addCardsToDb(3, players[3].cards),
        this.gameDataDB.set({
          hands: [],
          suit: "",
          hasTrump: false,
          pTurn: 0,
          trumpSuit: "Spades",
        }),
      ];
      Promise.all(x).then(() => {
        this.showMyCards(pIdx, positions, players[0].cards);
        this.play = true;
      });
    } else {
      gamesDB
        .doc(this.gameId)
        .collection("cards")
        .doc(`P${pIdx + 1}`)
        .onSnapshot((d) => {
          const doc = <{ cards: CardType[] }>d.data();
          if (!this.myCards && doc && doc.cards) {
            this.showMyCards(pIdx, positions, doc["cards"]);
          }
        });
    }

    this.gameDataDB.onSnapshot((d) => {
      const doc = d.data();
      if (doc) {
        const { hands, suit, hasTrump, pTurn, play } = doc;
        this.trick = { hands, suit, hasTrump };
        this.pTurn = pTurn;
        this.play = play;

        // Tick hands are updated, one by one
        // My card is added to tmpC and shown on click
        // so, add/show last added card
        if (hands.length > 0) {
          // i.e 1/2/3/4
          const { card, pIdx } = hands[hands.length - 1];
          const mw = width / 2;
          const mh = height / 2;
          const trickPos = [
            { y: mh - 90, x: mw },
            { x: mw - 90, y: mh },
            { y: mh + 90, x: mw },
            { x: mw + 90, y: mh },
          ];
          if (pIdx !== this.me.idx) {
            const myIdx = this.me.idx;
            const pIdxDiff = pIdx - myIdx;
            const posIdx = (6 + pIdxDiff) % 4;
            const { x, y } = trickPos[posIdx];
            const c = new CardImage(this, x, y, card.name + ".png");
            this.tmpC.push(c);
          }
        }

        if (hands.length === 4 && pTurn === -1) {
          this.allFourDealt();
        }
      }
    });
  }

  update(time: number, delta: number) {}
}

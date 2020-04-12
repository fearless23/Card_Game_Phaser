import { CST } from "../CST";
import { gamesDB } from "../fbdb/fbdb";
import { GameType } from "../fbdb/GameType";

export class NewGameScene extends Phaser.Scene {
  tmpCategory!: string;
  constructor() {
    super({ key: CST.SCENES.NEWGAME });
  }

  init(d: { tmpCategory: string }) {
    this.tmpCategory = d.tmpCategory;
  }

  create() {
    // Later, take user input
    const category = () => (Math.random() <= 0.5 ? "COURTPIECE" : "LAKDI");
    const randomGame = {
      name: "Court Peice",
      id: Math.floor(Math.random() * 10) + 1,
      // category: category(),
      category: this.tmpCategory,
      maxPlayers: 4,
      playersJoined: 1,
      private: false,
      joinAble: true,
    };
    const currentPlayer = {
      name: "Jassi",
      idx: 0,
      admin: true,
    };
    const docId = gamesDB.doc().id;

    gamesDB.doc(docId).set({
      ...randomGame,
      docId,
      players: [currentPlayer],
    });

    gamesDB.doc(docId).onSnapshot((d) => {
      const doc = <GameType>d.data();
      if (doc.playersJoined === doc.maxPlayers) {
        this.scene.start(CST.SCENES.PLAY, {
          me: { ...currentPlayer, admin: true },
          // playersNames: ["Jassi", "Sushil", "Pandit", "Akshay"],
          playersNames: doc.players.map((x) => x.name),
          gameId: doc.docId,
        });
      }
    });
  }
}

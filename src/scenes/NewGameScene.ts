import { CST } from "../CST";
import { gamesDB } from "../fbdb/fbdb";

export class NewGameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.NEWGAME });
  }

  init() {}

  create() {
    // Later, take user input
    const category = () => (Math.random() <= 0.5 ? "COURTPIECE" : "LAKDI");
    const randomGame = {
      name: "Court Peice",
      id: Math.floor(Math.random() * 10) + 1,
      category: category(),
      maxPlayers: 4,
      playersJoined: 1,
      private: false,
      joinAble: true,
    };
    const currentPlayer = {
      name: "Jassi",
      idx: 1,
    };
    const docId = gamesDB.doc().id;

    gamesDB.doc(docId).set({
      ...randomGame,
      docId,
      players: [currentPlayer],
    });

    gamesDB.doc(docId).onSnapshot((d) => {
      console.log(d.data());
    });
  }
}

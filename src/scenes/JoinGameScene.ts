import { CST } from "../CST";
import { gamesDB, arrayUnion } from "../fbdb/fbdb";

type Game = {
  name: string;
  id: number;
  category: string;
  maxPlayers: number;
  playersJoined: number;
  private: boolean;
  joinAble: boolean;
  docId: string;
  players: { name: string; idx: string }[];
};

export class JoinGameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.JOINGAME });
  }

  init() {}

  create() {
    // Look for Court Piece

    const filteredGames = gamesDB
      .where("category", "==", "COURTPIECE")
      .where("joinAble", "==", true)
      .limit(1);

    filteredGames.get().then((querySnapshot) => {
      const docs: firebase.firestore.DocumentData[] = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        docs.push(doc.data());
      });

      if (docs.length === 1 && docs[0]["joinAble"]) {
        this.joinPlayer(<Game>docs[0]);
      } else {
        console.log("Cant join");
      }
    });
  }

  async joinPlayer(gameToJoin: Game) {
    try {
      const name = "Sushil";
      const { playersJoined, maxPlayers } = gameToJoin;
      await gamesDB.doc(gameToJoin.docId).update({
        playersJoined: playersJoined + 1,
        joinAble: playersJoined + 1 === maxPlayers ? false : true,
        players: arrayUnion({ name, idx: playersJoined + 1 }),
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}

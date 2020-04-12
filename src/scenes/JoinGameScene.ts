import { CST } from "../CST";
import { gamesDB, arrayUnion, FBQuery } from "../fbdb/fbdb";
import { GameType } from "../fbdb/GameType";

export class JoinGameScene extends Phaser.Scene {
  tmpCategory!: string;
  me!: { name: string; idx: number; admin: boolean };
  constructor() {
    super({ key: CST.SCENES.JOINGAME });
  }

  init(d: { tmpCategory: string }) {
    this.tmpCategory = d.tmpCategory;
  }

  private async joinPlayer(gameToJoin: GameType) {
    try {
      const { playersJoined: pj, maxPlayers, docId } = gameToJoin;
      this.me = { name: `P${pj + 1}`, idx: pj, admin: false };
      const newData = {
        playersJoined: pj + 1,
        joinAble: pj + 1 === maxPlayers ? false : true,
        players: arrayUnion(this.me),
      };
      await gamesDB.doc(docId).update(newData);
      this.addText(500, 300, "Thanks for joining");
      this.checkGame(gameToJoin);
    } catch (error) {
      this.addText(200, 500, error.message);
      console.error(error.message);
    }
  }

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
    t.setDepth(1);
    t.setInteractive();
    return t;
  }

  private checkGame(game: GameType) {
    gamesDB.doc(game.docId).onSnapshot((d) => {
      const g = <GameType>d.data();
      if (g.playersJoined === g.maxPlayers) {
        this.addText(200, 400, "All Joined");
        this.scene.start(CST.SCENES.PLAY, {
          playersNames: g.players.map((x) => x.name),
          me: this.me,
          gameId: g.docId,
        });
      } else {
        const p = g.players[g.players.length - 1];
        let t = this.addText(200, 500, "new player joined" + p.name);
        setTimeout(() => {
          t.destroy();
        }, 3000);
      }
    });
  }

  async create() {
    this.cameras.main.setBackgroundColor("#2a98ef");
    const xx = new FBQuery("games");
    const g = <GameType | null>await xx.query({
      // find: { category: "COURTPIECE", joinAble: true },
      find: { category: this.tmpCategory, joinAble: true },
      limit: 1,
    });
    if (!g) {
      const backBtn = this.addText(200, 200, "NOTHING TO JOIN, GO BACK");
      backBtn.on("pointerup", () => this.scene.start(CST.SCENES.MENU));
    } else {
      const btn = this.addText(200, 200, "JOIN");
      this.addText(200, 300, g.category);
      btn.on("pointerup", () =>
        this.joinPlayer(g).then(() => {
          btn.destroy();
        })
      );
    }
  }
}

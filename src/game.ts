import "phaser";
import { PlayScene, LoadScene, MenuScene, NewGameScene, JoinGameScene } from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  // type: Phaser.AUTO,
  // backgroundColor: "#125555",
  parent: "cardGame",
  width: 1200,
  height: 764,
  scene: [LoadScene, MenuScene, PlayScene, NewGameScene, JoinGameScene],
  // render: {
  //   pixelArt: true, // When sprtiesheet are pixelated. Phaser
  //   // by default smooth sprites.
  // },

  physics: {
    default: "arcade",
    // arcade: {
    //   debug: true,
    // },
  },
};

const game = new Phaser.Game(config);

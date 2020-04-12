import { CST } from "../CST";

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  init() {}

  loadImages() {
    this.load.setPath("./assets/images");
    Object.values(CST.IMAGES).forEach((val) => this.load.image(val, val));
  }

  loadCards() {
    this.load.setPath("./assets/images/cards");
    Object.values(CST.CARDS).forEach((val) => this.load.image(val, val));
  }

  loadSprites() {
    this.load.setPath("./assets/sprites");
    Object.values(CST.SPRITES).forEach((val) =>
      this.load.spritesheet(val, val, {
        frameWidth: 32,
        frameHeight: 32,
      })
    );
  }

  loadAudios() {
    this.load.setPath("./assets/audios");
    Object.values(CST.AUDIOS).forEach((val) => this.load.audio(val, val));
  }

  preload() {
    this.loadImages();
    this.loadCards();
    this.loadSprites();
    this.loadAudios();

    // Loading Bar
    let loadingBar = this.add.graphics({
      fillStyle: { color: 0xffffff },
    });

    const { width, height } = this.game.renderer;
    const wPad = 0.1 * width;
    const hPad = 0.1 * height;

    const t = this.add.text(width / 2, height / 2, "Loading", {
      fill: "#ffffff",
    });
    this.load.on("progress", (per: number) => {
      const { height, width } = this.game.renderer;
      loadingBar.fillRect(
        wPad,
        height / 2 + 2 * hPad,
        per * (width - 2 * wPad),
        30
      );
      t.text = "Loading " + Math.floor(per * 10000) / 100 + " %";
    });

    this.load.on("complete", () => {});
  }
  create() {
    this.scene.start(CST.SCENES.MENU);
  }
}

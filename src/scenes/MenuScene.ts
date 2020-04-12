import { CST } from "../CST";

export class MenuScene extends Phaser.Scene {
  mouseIcon!: Phaser.GameObjects.Sprite;
  constructor() {
    super({ key: CST.SCENES.MENU });
  }

  init() {}

  private addMenuBG(menuBackWidth: number, width: number, height: number) {
    let menuBack = this.add.graphics({
      fillStyle: { color: 0x2a98ef },
    });
    menuBack.fillRect(
      (width - menuBackWidth) / 2,
      height * 0.2 + 50,
      menuBackWidth,
      400
    );
    menuBack.setDepth(2);
  }

  private addText(x: number, y: number, text: string, width: number) {
    const t = this.add.text(x, y, text, {
      fill: "#ffffff",
      font: "30px Arial",
      align: "center",
    });
    t.x += (width - t.width) / 2;
    t.setDepth(3);
    t.setInteractive();
    t.on("pointerover", () => t.setFill("#green"));
    t.on("pointerout", () => t.setFill("#ffffff"));
    return t;
  }

  create() {
    const menuBGWidth = 250;
    const { LOGO, TITLEBG } = CST.IMAGES;
    const { TITLEMUSIC } = CST.AUDIOS;
    const { width, height } = this.game.renderer;

    this.add.image(0, 0, TITLEBG).setOrigin(0).setDepth(0).setScale(0.63);
    this.add.image(width / 2, height * 0.2, LOGO).setDepth(1);
    this.addMenuBG(menuBGWidth, width, height);
    // this.sound.play(TITLEMUSIC, { loop: true });

    const btnX = (width - menuBGWidth) / 2;
    const btnY = height * 0.2 + 50;
    // MENU BTNS
    const aBtn = this.addText(btnX, btnY + 50, "NEW GAME", menuBGWidth);
    const bBtn = this.addText(btnX, btnY + 100, "JOIN GAME", menuBGWidth);
    const cBtn = this.addText(btnX, btnY + 150, "SETTINGS", menuBGWidth);
    const dBtn = this.addText(btnX, btnY + 200, "FEEDBACK", menuBGWidth);

    aBtn.on("pointerup", () => {
      this.scene.start(CST.SCENES.NEWGAME);
    });
    bBtn.on("pointerup", () => {
      this.scene.start(CST.SCENES.JOINGAME);
    });
  }
}

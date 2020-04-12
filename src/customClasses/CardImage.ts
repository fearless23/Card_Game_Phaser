export class CardImage extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number | undefined
  ) {
    super(scene, x, y, texture, frame);
    // scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    // Defaults
    this.setScale(0.4);
    this.setDepth(1);
  }
}

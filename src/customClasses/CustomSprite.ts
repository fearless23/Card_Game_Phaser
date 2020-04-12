export class CustomSprite extends Phaser.GameObjects.Sprite {
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
  }
}

class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, "bg-opening")
      .setDisplaySize(width, height);

    this.add.text(width / 2, height * 0.4, "Our Story", {
      fontSize: Math.round(width * 0.08) + "px",
      color: "#ffffff"
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.52, "Tap to begin", {
      fontSize: Math.round(width * 0.035) + "px",
      color: "#cccccc"
    }).setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.cameras.main.fadeOut(800, 0, 0, 0);
      this.time.delayedCall(800, () => {
        this.scene.start("StoryScene");
      });
    });
  }
}

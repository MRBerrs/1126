class ChoiceButton {
  constructor(scene, x, y, text, callback) {
    const { width } = scene.scale;

    this.scene = scene;

    const btnWidth = width * 0.6;
    const btnHeight = Math.round(width * 0.08);

    this.bg = scene.add.rectangle(x, y, btnWidth, btnHeight, 0x222222)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setDepth(5);

    this.label = scene.add.text(x, y, text, {
      fontSize: Math.round(width * 0.035) + "px",
      color: "#ffffff"
    }).setOrigin(0.5).setDepth(6);

    this.bg.on("pointerover", () => {
      this.bg.setFillStyle(0x444444);
    });

    this.bg.on("pointerout", () => {
      this.bg.setFillStyle(0x222222);
    });

    this.bg.on("pointerdown", () => {
      callback();
    });
  }

  destroy() {
    this.bg.destroy();
    this.label.destroy();
  }
}

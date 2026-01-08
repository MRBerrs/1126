window.ChoiceButton = class ChoiceButton {
  constructor(scene, x, y, text, callback) {
    const { width } = scene.scale;
    this.scene = scene;

    const btnWidth = width * 0.6;
    const btnHeight = Math.round(width * 0.08);

    this.bg = scene.add.rectangle(x, y, btnWidth, btnHeight, 0x222222)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setDepth(60)
      .setScale(1);

    this.label = scene.add.text(x, y, text, {
      fontSize: Math.round(width * 0.035) + "px",
      color: "#ffffff"
    }).setOrigin(0.5).setDepth(61).setScale(1);

    this._destroyed = false;

    this.bg.on("pointerover", () => this.bg.setFillStyle(0x444444));
    this.bg.on("pointerout", () => this.bg.setFillStyle(0x222222));

    this.bg.on("pointerup", () => {
      if (this._destroyed) return;
      this.bg.disableInteractive();
      this.scene.tweens.add({
        targets: [this.bg, this.label],
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 80,
        yoyo: true,
        ease: "Power1",
        onComplete: () => {
          if (typeof callback === "function") callback();
        }
      });
    });
  }

  destroy() {
    if (this._destroyed) return;
    this._destroyed = true;
    if (this.bg) this.bg.destroy();
    if (this.label) this.label.destroy();
  }
};
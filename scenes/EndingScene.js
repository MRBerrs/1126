class EndingScene extends Phaser.Scene {
  constructor() {
    super("EndingScene");
    this.celebrateBtn = null;
    this.isTransitioning = false;
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, "bg-ending").setDisplaySize(width, height);

    this.typewriter = new Typewriter(this, width / 2, height * 0.35, {
      fontSize: Math.round(width * 0.04) + "px",
      color: "#ffffff",
      align: "center",
      wordWrap: { width: width * 0.85 }
    });

    const lines = [
      "Maybe we haven't met each other yet.",
      "But believe me.",
      "I will come there,",
      "to fulfill my promise to you."
    ];

    this.typewriter.setLines(lines);

    this.typewriter.onFinish = () => {
      // create Celebrate button
      this.celebrateBtn = new ChoiceButton(
        this,
        width / 2,
        height * 0.7,
        "Celebrate 🎉",
        () => {
          if (this.isTransitioning) return;
          this.isTransitioning = true;
          this.input.enabled = false;
          if (this.celebrateBtn) { this.celebrateBtn.destroy(); this.celebrateBtn = null; }
          this.cameras.main.fadeOut(600, 0, 0, 0);
          this.time.delayedCall(600, () => {
            this.isTransitioning = false;
            this.input.enabled = true;
            this.scene.start("CelebrationScene");
          });
        }
      );
    };

    this.typewriter.start();

    this.add.text(width / 2, height - 40, "Tap to continue",
      { fontSize: "14px", color: "#aaaaaa" }).setOrigin(0.5);

    this.input.on("pointerdown", () => {
      if (this.typewriter && this.typewriter.isTyping && !this.isTransitioning) this.typewriter.skip();
    });
  }
}
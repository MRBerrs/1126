window.EndingScene = class EndingScene extends Phaser.Scene {
  constructor() {
    super("EndingScene");
    this.celebrateBtn = null;
    this.isTransitioning = false;
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, "bg-ending").setDisplaySize(width, height);

    // ensure visible if we came from a fadeOut
    this.cameras.main.fadeIn(300);

    this.typewriter = new window.Typewriter(this, width / 2, height * 0.35, {
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
      // show Celebrate button when all lines done
      this.celebrateBtn = new window.ChoiceButton(
        this,
        width / 2,
        height * 0.7,
        "Celebrate 🎉",
        () => {
          if (this.isTransitioning) return;
          this.isTransitioning = true;
          this.input.enabled = false;
          if (this.celebrateBtn) { this.celebrateBtn.destroy(); this.celebrateBtn = null; }

          this.cameras.main.fadeOut(600);
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

    // Handle taps:
    // - if typing -> skip current line
    // - else -> advance to next line
    this.input.on("pointerdown", () => {
      if (this.isTransitioning) return;
      if (!this.typewriter) return;
      if (this.typewriter.isTyping) {
        this.typewriter.skip();
      } else {
        this.typewriter.next();
      }
    });
  }
};
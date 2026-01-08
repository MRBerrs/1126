window.EndingScene = class EndingScene extends Phaser.Scene {
  constructor() {
    super("EndingScene");
    this.celebrateBtn = null;
    this.isTransitioning = false;
  }

  create() {
    const { width, height } = this.scale;
    // use bg-ending if available
    if (this.textures.exists('bg-ending')) {
      this.add.image(width / 2, height / 2, "bg-ending").setDisplaySize(width, height);
    } else {
      this.add.rectangle(width / 2, height / 2, width, height, 0x111111).setDepth(0);
    }

    this.cameras.main.fadeIn(300);

    this.typewriter = new window.Typewriter(this, width / 2, height * 0.35, {
      fontSize: Math.round(width * 0.04) + "px",
      color: "#ffffff",
      align: "center",
      wordWrap: { width: width * 0.85 }
    });

    // get lines from I18N_STRINGS ending block
    const lines = window.I18N_STRINGS && window.I18N_STRINGS[window.I18n.lang] && window.I18N_STRINGS[window.I18n.lang].ending
      ? window.I18N_STRINGS[window.I18n.lang].ending.lines
      : window.I18N_STRINGS.en.ending.lines;

    this.typewriter.setLines(lines);

    this.typewriter.onFinish = () => {
      const celebrateLabel = window.I18N_STRINGS && window.I18N_STRINGS[window.I18n.lang] && window.I18N_STRINGS[window.I18n.lang].ending
        ? window.I18N_STRINGS[window.I18n.lang].ending.celebrate
        : window.I18N_STRINGS.en.ending.celebrate;

      this.celebrateBtn = new window.ChoiceButton(
        this,
        width / 2,
        height * 0.7,
        celebrateLabel,
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

    const tapLabel = window.I18N_STRINGS && window.I18N_STRINGS[window.I18n.lang] && window.I18N_STRINGS[window.I18n.lang].ending
      ? window.I18N_STRINGS[window.I18n.lang].ending.tapContinue
      : window.I18N_STRINGS.en.ending.tapContinue;

    this.add.text(width / 2, height - 40, tapLabel, { fontSize: "14px", color: "#aaaaaa" }).setOrigin(0.5);

    this.input.on("pointerdown", () => {
      if (this.isTransitioning) return;
      if (this.typewriter && this.typewriter.isTyping) {
        this.typewriter.skip();
      } else {
        this.typewriter.next();
      }
    });
  }
};
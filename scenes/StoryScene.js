window.StoryScene = class StoryScene extends Phaser.Scene {
  constructor() {
    super("StoryScene");
    this.state = "IDLE";
    this.choices = [];
    this.isTransitioning = false;
    this.currentChapter = null;
  }

  create() {
    const { width, height } = this.scale;
    this.bg = this.add.image(width / 2, height / 2, "bg-chat").setDisplaySize(width, height);

    this.typewriter = new window.Typewriter(this, width / 2, height * 0.35, {
      fontSize: Math.round(width * 0.04) + "px",
      color: "#fff",
      align: "center",
      wordWrap: { width: width * 0.85 }
    });

    // language toggle top-right
    this.createLangToggle(width - 60, 40);

    this.input.on("pointerdown", (pointer) => {
      if (this.isTransitioning) return;
      try {
        const cam = (this.cameras && this.cameras.main) ? this.cameras.main : null;
        if (cam) {
          const hits = this.input.manager.hitTest(pointer, this.children.list, cam);
          if (hits && hits.length) {
            const anyInteractive = hits.some(h => h.input && h.input.enabled);
            if (anyInteractive) return;
          }
        }
      } catch (e) { /* ignore */ }

      this.showTapFeedback(pointer.x, pointer.y);
      if (this.state === "TYPING") this.typewriter.next();
    });

    this.loadChapter("intro");
  }

  createLangToggle(x, y) {
    const size = 40;
    this.langBtnBg = this.add.rectangle(x, y, size, size, 0x222222).setOrigin(0.5).setInteractive({ useHandCursor: true }).setDepth(100);
    this.langBtnLabel = this.add.text(x, y, window.I18n.lang.toUpperCase(), { fontSize: "14px", color: "#fff" }).setOrigin(0.5).setDepth(101);

    this.langBtnBg.on("pointerup", () => {
      const next = window.I18n.lang === 'en' ? 'tr' : 'en';
      window.I18n.setLang(next);
      this.langBtnLabel.setText(next.toUpperCase());
      // reload current chapter in new language
      if (this.currentChapter) this.loadChapter(this.currentChapter);
    });
  }

  showTapFeedback(x, y) {
    const circle = this.add.circle(x, y, 6, 0xffffff, 0.9).setDepth(100);
    circle.setScale(0.6);
    this.tweens.add({ targets: circle, scale: 2.5, alpha: 0, duration: 400, ease: "Cubic.easeOut", onComplete: () => circle.destroy() });
  }

  loadChapter(id) {
    // allow load calls; set currentChapter for language toggle refresh
    this.currentChapter = id;
    this.clearChoices();
    const chapter = window.I18n.getChapter(id);
    this.state = "TYPING";

    if (chapter && chapter.bg) {
      this.bg.setTexture(chapter.bg);
      this.bg.setDisplaySize(this.scale.width, this.scale.height);
    }

    this.typewriter.setLines((chapter && chapter.lines) || []);
    this.typewriter.onFinish = () => {
      if (chapter && chapter.choices) {
        this.state = "CHOICE";
        this.showChoices(chapter.choices);
      } else if (chapter && chapter.next === "ending") {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.input.enabled = false;
        this.cameras.main.fadeOut(600);
        this.time.delayedCall(600, () => {
          this.isTransitioning = false;
          this.input.enabled = true;
          this.scene.start("EndingScene");
        });
      } else if (chapter && chapter.next) {
        this.loadChapter(chapter.next);
      }
    };

    this.typewriter.start();
  }

  showChoices(choices) {
    if (!choices || !choices.length) return;
    const { width, height } = this.scale;
    choices.forEach((c, i) => {
      const btn = new window.ChoiceButton(
        this,
        width / 2,
        height * (0.6 + i * 0.08),
        c.text,
        () => {
          if (this.isTransitioning) return;
          this.isTransitioning = true;
          this.input.enabled = false;
          this.clearChoices();
          this.cameras.main.fadeOut(500);
          this.time.delayedCall(500, () => {
            this.isTransitioning = false;
            this.input.enabled = true;
            this.loadChapter(c.next);
            this.cameras.main.fadeIn(300);
          });
        }
      );
      this.choices.push(btn);
    });
  }

  clearChoices() {
    this.choices.forEach(b => b.destroy());
    this.choices = [];
  }
};
const chapters = window.STORY_CHAPTERS;

class StoryScene extends Phaser.Scene {
  constructor() {
    super("StoryScene");
    this.state = "IDLE";
    this.choices = [];
    this.isTransitioning = false;
  }

  create() {
    const { width, height } = this.scale;
    this.bg = this.add.image(width / 2, height / 2, "bg-chat").setDisplaySize(width, height);

    this.typewriter = new Typewriter(this, width / 2, height * 0.35, {
      fontSize: Math.round(width * 0.04) + "px",
      color: "#fff",
      align: "center",
      wordWrap: { width: width * 0.85 }
    });

    this.input.on("pointerdown", (pointer) => {
      // ignore inputs while transitioning between scenes
      if (this.isTransitioning) return;
      this.showTapFeedback(pointer.x, pointer.y);
      if (this.state === "TYPING") this.typewriter.next();
    });

    this.loadChapter("intro");
  }

  showTapFeedback(x, y) {
    const circle = this.add.circle(x, y, 6, 0xffffff, 0.9).setDepth(100);
    circle.setScale(0.6);
    this.tweens.add({
      targets: circle, scale: 2.5, alpha: 0, duration: 400, ease: "Cubic.easeOut",
      onComplete: () => circle.destroy()
    });
  }

  loadChapter(id) {
    if (this.isTransitioning) return;
    this.clearChoices();
    const chapter = chapters[id];
    this.state = "TYPING";

    if (chapter.bg) {
      this.bg.setTexture(chapter.bg);
      this.bg.setDisplaySize(this.scale.width, this.scale.height);
    }

    this.typewriter.setLines(chapter.lines || []);
    this.typewriter.onFinish = () => {
      if (chapter.choices) {
        this.state = "CHOICE";
        this.showChoices(chapter.choices);
      } else if (chapter.next === "ending") {
        this.startSceneTransition("EndingScene", 600);
      } else {
        this.loadChapter(chapter.next);
      }
    };

    this.typewriter.start();
  }

  showChoices(choices) {
    const { width, height } = this.scale;
    choices.forEach((c, i) => {
      const btn = new ChoiceButton(
        this,
        width / 2,
        height * (0.6 + i * 0.08),
        c.text,
        () => {
          if (this.isTransitioning) return;
          this.isTransitioning = true;
          // disable all input so extra clicks don't do anything
          this.input.enabled = false;
          // remove buttons so user can't click them again
          this.clearChoices();
          this.cameras.main.fadeOut(500, 0, 0, 0);
          this.time.delayedCall(500, () => {
            // restore input in the new chapter (loadChapter will run in same scene)
            this.input.enabled = true;
            this.isTransitioning = false;
            this.loadChapter(c.next);
          });
        }
      );
      this.choices.push(btn);
    });
  }

  startSceneTransition(targetScene, ms = 600) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.input.enabled = false;
    this.cameras.main.fadeOut(ms, 0, 0, 0);
    this.time.delayedCall(ms, () => {
      this.isTransitioning = false;
      this.input.enabled = true;
      this.scene.start(targetScene);
    });
  }

  clearChoices() {
    this.choices.forEach(b => b.destroy());
    this.choices = [];
  }
}
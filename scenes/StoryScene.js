const chapters = window.STORY_CHAPTERS;

class StoryScene extends Phaser.Scene {
  constructor() {
    super("StoryScene");
    this.state = "IDLE";
    this.choices = [];
  }

  create() {
    const { width, height } = this.scale;

    this.bg = this.add.image(width / 2, height / 2, "bg-chat")
      .setDisplaySize(width, height);

    this.typewriter = new Typewriter(this, width / 2, height * 0.35, {
      fontSize: Math.round(width * 0.04) + "px",
      color: "#fff",
      align: "center",
      wordWrap: { width: width * 0.85 }
    });

    this.input.on("pointerdown", () => {
      if (this.state === "TYPING") this.typewriter.next();
    });

    this.loadChapter("intro");
  }

  loadChapter(id) {
    this.clearChoices();
    const chapter = chapters[id];
    this.state = "TYPING";

    if (chapter.bg) {
      this.bg.setTexture(chapter.bg);
      this.bg.setDisplaySize(this.scale.width, this.scale.height);
    }

    this.typewriter.setLines(chapter.lines);
    this.typewriter.onFinish = () => {
      if (chapter.choices) {
        this.state = "CHOICE";
        this.showChoices(chapter.choices);
      } else if (chapter.next === "ending") {
        this.scene.start("EndingScene");
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
        () => this.loadChapter(c.next)
      );
      this.choices.push(btn);
    });
  }

  clearChoices() {
    this.choices.forEach(b => b.destroy());
    this.choices = [];
  }
}

class Typewriter {
  constructor(scene, x, y, style) {
    this.scene = scene;
    this.textObj = scene.add.text(x, y, "", style).setOrigin(0.5);
    this.textObj.setDepth(10);

    this.lines = [];
    this.lineIndex = 0;
    this.charIndex = 0;
    this.isTyping = false;
    this.event = null;

    // Callbacks
    this.onAllComplete = null; // existing name
    this.onFinish = null;      // alias StoryScene/Ending expect
  }

  setLines(lines) {
    this.lines = lines;
    this.lineIndex = 0;
  }

  start() {
    if (this.lineIndex >= this.lines.length) {
      if (this.onAllComplete) this.onAllComplete();
      if (this.onFinish) this.onFinish();
      return;
    }

    this.textObj.setText("");
    this.charIndex = 0;
    this.isTyping = true;

    const line = this.lines[this.lineIndex] || "";

    if (this.event) {
      this.event.remove(false);
      this.event = null;
    }

    this.event = this.scene.time.addEvent({
      delay: 40,
      repeat: Math.max(0, line.length - 1),
      callback: () => {
        this.textObj.text += line[this.charIndex] || "";
        this.charIndex++;
      },
      onComplete: () => {
        this.isTyping = false;
        // If this was the final line, notify finish
        if (this.lineIndex >= this.lines.length - 1) {
          if (this.onAllComplete) this.onAllComplete();
          if (this.onFinish) this.onFinish();
        }
      }
    });
  }

  skip() {
    if (!this.isTyping) return;

    if (this.event) {
      this.event.remove(false);
      this.event = null;
    }

    this.textObj.setText(this.lines[this.lineIndex] || "");
    this.isTyping = false;

    if (this.lineIndex >= this.lines.length - 1) {
      if (this.onAllComplete) this.onAllComplete();
      if (this.onFinish) this.onFinish();
    }
  }

  next() {
    if (this.isTyping) {
      this.skip();
    } else {
      this.lineIndex++;
      this.start();
    }
  }
}
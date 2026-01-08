class CelebrationScene extends Phaser.Scene {
  constructor() {
    super("CelebrationScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, "bg-ending")
      .setDisplaySize(width, height);

    this.greet = new Typewriter(this, width / 2, height * 0.25, {
      fontSize: Math.round(width * 0.06) + "px",
      color: "#fff",
      align: "center",
      wordWrap: { width: width * 0.9 }
    });

    this.greet.setLines([
      "Happy Birthday, sayang! 🎂",
      "I made this just for you."
    ]);

    this.greet.onFinish = () => {
      this.spawnConfetti();
      this.add.text(width / 2, height * 0.75, "Love you ❤", {
        fontSize: Math.round(width * 0.04) + "px",
        color: "#fff"
      }).setOrigin(0.5);
    };

    this.greet.start();

    const gfx = this.add.graphics();
    gfx.fillStyle(0xffffff, 1);
    gfx.fillCircle(4, 4, 4);
    gfx.generateTexture("dot", 8, 8);
    gfx.destroy();

    this.input.on("pointerdown", (pointer) => {
      this.tapConfetti(pointer.x, pointer.y);
      const c = this.add.circle(pointer.x, pointer.y, 6, 0xffffff, 0.9).setDepth(50);
      this.tweens.add({
        targets: c,
        scale: 2.5,
        alpha: 0,
        duration: 400,
        onComplete: () => c.destroy()
      });
    });
  }

  spawnConfetti() {
    const { width, height } = this.scale;

    const particles = this.add.particles("dot");
    particles.createEmitter({
      x: { min: 0, max: width },
      y: -10,
      lifespan: 3000,
      speedY: { min: 100, max: 300 },
      speedX: { min: -100, max: 100 },
      scale: { start: 1, end: 0.5 },
      quantity: 30,
      blendMode: "NORMAL",
      tint: [0xff5e5e, 0xffd86b, 0x7fe7a4, 0x79c2ff, 0xd89bff]
    });

    this.time.delayedCall(2500, () => particles.destroy());
  }

  tapConfetti(x, y) {
    const particles = this.add.particles("dot");
    particles.createEmitter({
      x: x,
      y: y,
      lifespan: 1200,
      speed: { min: 100, max: 250 },
      angle: { min: 0, max: 360 },
      scale: { start: 1, end: 0.5 },
      quantity: 20,
      tint: [0xff5e5e, 0xffd86b, 0x7fe7a4, 0x79c2ff, 0xd89bff]
    });
    this.time.delayedCall(1200, () => particles.destroy());
  }
}
window.CelebrationScene = class CelebrationScene extends Phaser.Scene {
  constructor() { super("CelebrationScene"); }

  create() {
    const { width, height } = this.scale;
    console.log('CelebrationScene: create');

    // background: if texture exists, use it; otherwise fallback to solid rect
    if (this.textures.exists('bg-ending')) {
      this.add.image(width / 2, height / 2, 'bg-birthday').setDisplaySize(width, height).setDepth(0);
    } else {
      console.warn('CelebrationScene: bg-ending texture not found, using fallback background.');
      this.add.rectangle(width / 2, height / 2, width, height, 0x111111).setDepth(0);
    }

    this.cameras.main.fadeIn(300);

    // ensure dot texture exists
    if (!this.textures.exists('dot')) {
      const gfx = this.add.graphics();
      gfx.fillStyle(0xffffff, 1);
      gfx.fillCircle(4, 4, 4);
      gfx.generateTexture('dot', 8, 8);
      gfx.destroy();
      console.log('CelebrationScene: generated texture "dot"');
    }

    // greeting typewriter
    this.greet = new window.Typewriter(this, width / 2, height * 0.25, {
      fontSize: Math.round(width * 0.06) + 'px',
      color: '#fff',
      align: 'center',
      wordWrap: { width: width * 0.9 }
    });

    this.greet.setLines([
      'Happy Birthday, sayang! 🎂',
      'I made this just for you.'
    ]);

    this.greet.onFinish = () => {
      console.log('CelebrationScene: greet finished -> spawnConfetti');
      this.spawnConfetti();
      this.add.text(width / 2, height * 0.75, 'Love you ❤', {
        fontSize: Math.round(width * 0.04) + 'px',
        color: '#fff'
      }).setOrigin(0.5);
    };

    this.greet.start();

    // input -> tap confetti
    this.input.on('pointerdown', (pointer) => {
      this.tapConfetti(pointer.x, pointer.y);
      const c = this.add.circle(pointer.x, pointer.y, 6, 0xffffff, 0.9).setDepth(100);
      this.tweens.add({
        targets: c,
        scale: 2.5,
        alpha: 0,
        duration: 400,
        onComplete: () => c.destroy()
      });
    });
  }

  // big celebration of confetti across the screen
  spawnConfetti() {
    const { width, height } = this.scale;
    const colors = [0xff5e5e, 0xffd86b, 0x7fe7a4, 0x79c2ff, 0xd89bff];
    const count = 40;

    for (let i = 0; i < count; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = -Phaser.Math.Between(10, 150);
      const tint = Phaser.Utils.Array.GetRandom(colors);
      const scale = Phaser.Math.FloatBetween(0.8, 1.2);
      const angle = Phaser.Math.Between(0, 360);
      const targetX = x + Phaser.Math.Between(-150, 150);
      const duration = Phaser.Math.Between(1800, 3200);
      const delay = Phaser.Math.Between(0, 400);

      const piece = this.add.image(x, y, 'dot').setTint(tint).setScale(scale).setAngle(angle).setDepth(80);

      this.tweens.add({
        targets: piece,
        x: targetX,
        y: height + 50,
        angle: angle + Phaser.Math.Between(-720, 720),
        alpha: 0,
        ease: 'Cubic.easeIn',
        delay,
        duration,
        onComplete: () => {
          if (piece && piece.destroy) piece.destroy();
        }
      });
    }
  }

  // small burst where user tapped
  tapConfetti(x, y) {
    const colors = [0xff5e5e, 0xffd86b, 0x7fe7a4, 0x79c2ff, 0xd89bff];
    const count = 14;

    for (let i = 0; i < count; i++) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const speed = Phaser.Math.Between(80, 250);
      const dx = Math.cos(angle) * Phaser.Math.Between(40, 140);
      const dy = Math.sin(angle) * Phaser.Math.Between(40, 200);
      const tint = Phaser.Utils.Array.GetRandom(colors);
      const scale = Phaser.Math.FloatBetween(0.7, 1.1);
      const duration = Phaser.Math.Between(600, 1100);
      const piece = this.add.image(x, y, 'dot').setTint(tint).setScale(scale).setDepth(90);

      this.tweens.add({
        targets: piece,
        x: x + dx,
        y: y + Math.abs(dy) + 40, // ensure mostly downward
        angle: Phaser.Math.Between(-360, 360),
        alpha: 0,
        ease: 'Cubic.easeOut',
        duration,
        onComplete: () => {
          if (piece && piece.destroy) piece.destroy();
        }
      });
    }
  }
};
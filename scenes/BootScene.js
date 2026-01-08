window.BootScene = class BootScene extends Phaser.Scene {
  constructor() { super("BootScene"); }

  preload() {
    this.load.image("bg-opening", "assets/bg/bg_opening2.png");
    this.load.image("bg-chat", "assets/bg/bg_chat.png");
    this.load.image("bg-argue", "assets/bg/bg_argument.jpg");
    this.load.image("bg-silent", "assets/bg/bg_ending (2).jpg");
    this.load.image("bg-sorry", "assets/bg/bg_opening.png");
    this.load.image("bg-ending", "assets/bg/bg_promise (2).jpg");
    this.load.image("bg-birthday", "assets/bg/bg_birthday (1).jpg");
    this.load.audio("bgm", "assets/audio/emotional-background-437820.mp3");
  }

  create() {
    const bgm = this.sound.add("bgm", { volume: 0.5, loop: true });
    bgm.play();
    this.registry.set("bgm", bgm);
    this.scene.start("MenuScene");
  }
};
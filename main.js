const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [
    window.BootScene,
    window.MenuScene,
    window.StoryScene,
    window.EndingScene,
    window.CelebrationScene
  ]
};

new Phaser.Game(config);
class EndingScene extends Phaser.Scene {
  constructor() {
    super("EndingScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.image(width / 2, height / 2, "bg-ending")
      .setDisplaySize(width, height);

    this.add.text(width / 2, height / 2,
      "Maybe we haven't met each other yet.\nBut believe me.\nI will come there,\nto fulfill my promise to you.",
      {
        fontSize: Math.round(width * 0.04) + "px",
        color: "#ffffff",
        align: "center",
        wordWrap: { width: width * 0.85 }
      }
    ).setOrigin(0.5);

    this.add.text(width / 2, height - 80,
      "Happy Birthday 🤍",
      { fontSize: "16px", color: "#aaaaaa" }
    ).setOrigin(0.5);
  }
}

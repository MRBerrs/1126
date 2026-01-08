window.MenuScene = class MenuScene extends Phaser.Scene {
  constructor() { super("MenuScene"); }

  create() {
    const { width, height } = this.scale;

    // background
    this.add.image(width / 2, height / 2, "bg-opening").setDisplaySize(width, height);

    // title & begin text use I18n
    this.titleText = this.add.text(width / 2, height * 0.4, window.I18n.t('menu.title'), {
      fontSize: Math.round(width * 0.08) + "px",
      color: "#ffffff"
    }).setOrigin(0.5);

    this.beginText = this.add.text(width / 2, height * 0.52, window.I18n.t('menu.begin'), {
      fontSize: Math.round(width * 0.035) + "px",
      color: "#cccccc"
    }).setOrigin(0.5);

    // language toggle button (top-right)
    this.createLangToggle(width - 60, 40);

    // start handler that ignores clicks on the lang toggle
    const startGame = (pointer) => {
      // safe hitTest: if pointer is over lang toggle, do not start the game
      try {
        const cam = (this.cameras && this.cameras.main) ? this.cameras.main : null;
        if (cam) {
          const hits = this.input.manager.hitTest(pointer, this.children.list, cam);
          if (hits && hits.length) {
            const clickedLang = hits.some(h => h === this.langBg || h === this.langLabel);
            if (clickedLang) {
              // re-register the start handler and ignore this click
              this.input.once("pointerdown", startGame);
              return;
            }
          }
        }
      } catch (e) {
        // ignore hitTest errors and proceed
      }

      this.cameras.main.fadeOut(800, 0, 0, 0);
      this.time.delayedCall(800, () => {
        this.scene.start("StoryScene");
      });
    };

    // register once; startGame will re-register itself if the lang toggle was clicked
    this.input.once("pointerdown", startGame);
  }

  createLangToggle(x, y) {
    const size = 44;
    this.langBg = this.add.rectangle(x, y, size, size, 0x222222)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setDepth(100);

    this.langLabel = this.add.text(x, y, window.I18n.lang.toUpperCase(), {
      fontSize: "14px",
      color: "#fff"
    }).setOrigin(0.5).setDepth(101);

    this.langBg.on("pointerup", () => {
      const next = window.I18n.lang === 'en' ? 'tr' : 'en';
      window.I18n.setLang(next);
      this.langLabel.setText(next.toUpperCase());
      // update visible strings
      this.titleText.setText(window.I18n.t('menu.title'));
      this.beginText.setText(window.I18n.t('menu.begin'));
    });
  }
};
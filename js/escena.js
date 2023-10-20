export class LoadScene extends Phaser.Scene 
{
    constructor() {
        super({ key: 'LoadScene' });
        this.texts = ["Cargando", "Cargando.", "Cargando..", "Cargando..."];
        this.contador = 0;
        this.textNumber = 0;
        this.loadingText = null;
    }

    preload() {
        const image = this.load.image("background", "Assets/WebPage/Img/Logo.png");
    }
    create() {
        let image = this.add.image(0, 0, "background");
        image.setOrigin(0.5,0.5);
        image.setPosition(this.game.config.width/ 2, this.game.config.height/ 2);
        image.setScale(0.785,0.785);
        this.loadingText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Cargando...", {
            fontFamily: "Arial",
            fontSize: "26px",
            color: "#ffffff"
        });
        this.loadingText.setPosition(650,550)
        setInterval(() => {
            this.updateText();
        }, 500);
    }
    updateText() {
        this.loadingText.setText(this.texts[this.textNumber]);
        this.textNumber++;
        if (this.textNumber >= this.texts.length) {
            this.textNumber = 0;
        }
    }
}  
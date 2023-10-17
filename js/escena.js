export class LoadScene extends Phaser.Scene 
{

    preload() {
        const image = this.load.image("background", "img/Logo.png");
    }
    create() {
        let image = this.add.image(0, 0, "background");
        image.setOrigin(0.5,0.5);
        image.setPosition(this.game.config.width/ 2, this.game.config.height/ 2);
        image.setScale(0.785,0.785);
        this.background = image;

        const loadingText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Cargando...", {
            fontFamily: "Arial",
            fontSize: "26px",
            color: "#ffffff"
        });
        loadingText.setPosition(650,550)
    }
    update() {
        //aqui va el contador para el cargado...
    }
}  
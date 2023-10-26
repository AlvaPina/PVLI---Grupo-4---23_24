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
        const image = this.load.image("backgroundINI", "Assets/WebPage/Img/Logo.png");
    }
    create() {
        // Agregar imagen de fondo
        let image = this.add.image(0, 0, "backgroundINI");
        image.setOrigin(0.5, 0.5);
        image.setPosition(this.game.config.width / 2, this.game.config.height / 2);
        image.setScale(0.785, 0.785);

        // Configurar texto de carga
        this.loadingText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Cargando...", {
            fontFamily: "Arial",
            fontSize: "26px",
            color: "#ffffff"
        });
        this.loadingText.setPosition(650, 550);

        // Evento periódico para actualizar texto
        this.time.addEvent({
            delay: 500,                // intervalo de 500 ms
            callback: this.updateText, // función a ejecutar
            callbackScope: this,       // contexto (LoadScene)
            loop: true                 // repetir indefinidamente
        });

        // Cambiar a MainScene después de un tiempo determinado
        this.time.delayedCall(3000, () => {
            this.scene.stop('LoadScene');
            this.scene.start('MainScene');
        });
    }

    updateText() {
        if (this.loadingText) {
            this.loadingText.setText(this.texts[this.textNumber]);
            this.textNumber++;
            if (this.textNumber >= this.texts.length) {
                this.textNumber = 0;
            }
        }
    }

}  
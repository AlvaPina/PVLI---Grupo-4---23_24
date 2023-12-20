export class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }
    //Recargamos recursos
    preload(){
    }
    create(){
        //Añadimos imagen de fondo
        let image = this.add.image(0, 0, "FondoGameOver");
        image.setOrigin(0.5);
        image.setPosition(this.game.config.width / 2, this.game.config.height / 2);
        image.setScale(0.5);

        //Añadimos letras con animacion implementada con tweens
        let text = this.add.image(this.game.config.width/ 2, 190, "TextoGameOver");
        text.setScale(0.5);

        //Boton de start
        let buttonRetry = this.add.image(this.game.config.width / 2, 360, 'botonReintentarClaro');
        buttonRetry.setScale(0.5);
        //Volvemos interactuable al boton de Start
        buttonRetry.setInteractive();

        //Añadimos eventos de puntero de raton para que la textura del boton start cambie cuando el puntero esta sobre el boton
        buttonRetry.on('pointerover' , () =>{
            buttonRetry.setTexture('botonReintentarOscuro');
        })
        buttonRetry.on('pointerout', () =>{
            buttonRetry.setTexture('botonReintentarClaro');
        })
        //Cuando pulsamos el boton Start, vamos a la escena de carga
        buttonRetry.on('pointerup', () => {
           this.scene.start('LoadScene');
        });
    }
}
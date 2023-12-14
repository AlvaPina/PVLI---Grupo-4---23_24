export class MenuInicial extends Phaser.Scene{
    constructor() {
        super({ key: 'MenuInicial' });
    }
    //Recargamos recursos
    preload(){
        //Background
        this.load.image('FondoMenuInicial', 'Assets/Pantallas/PantallaInicio.png');
        //Texto de las siglas de TID
        this.load.image('Siglas', 'Assets/Pantallas/TID_Text.png');
        //Texturas del boton (cuando se le clica y cuando no)
        this.load.image('botonStartClaro', 'Assets/Pantallas/BotonStartClaro.png');
        this.load.image('botonStartOscuro', 'Assets/Pantallas/BotonStartOscuro.png');
    }
    create(){
        //Añadimos imagen de fondo
        let image = this.add.image(0, 0, "FondoMenuInicial");
        image.setOrigin(0.5);
        image.setPosition(this.game.config.width / 2, this.game.config.height / 2);
        image.setScale(0.5);

        //Añadimos letras con animacion implementada con tweens
        let letres = this.add.image(this.game.config.width/ 2, 210, "Siglas");
        letres.setScale(0.5);
        this.tweens.add({
            targets: letres,
            scale: 0.6,
                  duration: 1000,
                  ease: 'Sine.easeInOut',
                  yoyo: true,
                  repeat: -1,
                  delay: 2000
        });

        //Boton de start
        let buttonSt = this.add.image(this.game.config.width / 2, 300, "botonStartClaro");
        buttonSt.setScale(0.5);
        //Volvemos interactuable al boton de Start
        buttonSt.setInteractive();

        //Añadimos eventos de puntero de raton para que la textura del boton start cambie cuando el puntero esta sobre el boton
        buttonSt.on('pointerover' , () =>{
            buttonSt.setTexture('botonStartOscuro');
        })
        buttonSt.on('pointerout', () =>{
            buttonSt.setTexture('botonStartClaro');
        })
        //Cuando pulsamos el boton Start, vamos a la escena de carga
        buttonSt.on('pointerup', () => {
           this.scene.start('LoadScene');
        });
    }
}
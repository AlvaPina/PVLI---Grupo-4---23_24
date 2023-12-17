export class SelectionMenu extends Phaser.Scene {
    constructor(){
        super({ key: 'SelectionMenu' });
    }

    init(data){
        console.log(data.scene);
        this.previousScene = data.scene;
    }
    preload(){
        
        //Configuramos input de las teclas
        this.cursors = this.input.keyboard.addKeys({
            control: Phaser.Input.Keyboard.KeyCodes.CTRL,
            //change : Phaser.Input.Keyboard.KeyCodes.ESC
        });
    }
    create(){
        //Background
        // Crear un rectángulo de tamaño de la venmtana de juego
        const rect = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x1C70A7);
        rect.setOrigin(0, 0); // Establecer el origen en la esquina superior izquierda
 
        //Añadimos rueda de selección
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'wheel').setScale(0.5);
        //Añadimos partes grises (partes no seleccionables)
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'down').setScale(0.5);
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'left').setScale(0.5);
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'right').setScale(0.5);
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'up').setScale(0.5);
        this.add.image(this.game.config.width/2 , 60, 'text').setScale(0.5);
        //Añadimos parte de seleccion de personaje
        let logicPanel = this.add.image(this.game.config.width / 2 , this.game.config.height/3.5 , 'logic').setScale(0.5);
        let defenderPanel = this.add.image(this.game.config.width / 1.55 , this.game.config.height/ 1.82 , 'defender').setScale(0.5);
        let virtuousPanel = this.add.image(this.game.config.width / 2.85, this.game.config.height/ 1.8, 'virtuous').setScale(0.5);
        let protagonistPanel = this.add.image(this.game.config.width / 2 , this.game.config.height/ 1.21, 'protagonist').setScale(0.5);
        
        //Manejamos la visbilidad de las opciones disponibles
        logicPanel.visible = true;
        defenderPanel.visible = true;
        virtuousPanel.visible = true;
        protagonistPanel.visible = true;

        //Hacemos que el puntero pueda ser interactuable con las selecciones de la rueda, siempre y cuando sean visibles
        logicPanel.setInteractive();
        defenderPanel.setInteractive();
        virtuousPanel.setInteractive();
        protagonistPanel.setInteractive();

        // Agregamos un evento de clic a la imagen de cada personalidad, cunado el jugador pulsa, volvemos al nivel
        logicPanel.on('pointerdown', () => {
            console.log("has elegido a Logica");
            this.returnToGame('l');
        });
        defenderPanel.on('pointerdown', function () {
            console.log("Has elegido a Defensor");
            this.returnToGame('d');
        },this);
        virtuousPanel.on('pointerdown', function () {
            console.log("Has elegido a Virtuoso");
            this.returnToGame('v');
        },this);
        protagonistPanel.on('pointerdown', function () {
            console.log("Has elegido a Protagonista");
            this.returnToGame('p');
        },this);
    }
    //Metodo para volver al juego de nuevo (simpre y cuando el jugador este en este menu de seleccion)
    returnToGame(spriteId){ 
        //Volvemos a la escena del nivel
        this.scene.resume(this.previousScene, (spriteId));
        //Paramos esta escena...
        this.scene.stop();
        console.log("Cambio de escena...");
    }
    //Metodo update
    update(){
        //Si volvemos a pulsar la tecla control salimos del menu sin hacer cambios
        if(this.cursors.control.isDown){
            //Devolvemos un char que no hace ningun cambio
           this.returnToGame('x');
        }
    }


}
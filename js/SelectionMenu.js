export class SelectionMenu extends Phaser.Scene {
    constructor(){
        super({ key: 'SelectionMenu' });
    }
    preload(){
        //Cargamos todos los recursos necesarios para el renderizado de la rueda
        this.load.image('wheel', 'Assets/SelectionWheel/Rueda.png'); 
        //Selecciones no disponibles
        this.load.image('down', 'Assets/SelectionWheel/Down.png');
        this.load.image('up', 'Assets/SelectionWheel/Up.png' );
        this.load.image('left', 'Assets/SelectionWheel/Left.png' );
        this.load.image('right', 'Assets/SelectionWheel/Right.png' );
        //Selecciones de personalidad
        this.load.image('logic', 'Assets/SelectionWheel/Logic_Sel Escalado.png');
        this.load.image('defender', 'Assets/SelectionWheel/Defender_Sel Escalado.png');
        this.load.image('virtuous', 'Assets/SelectionWheel/Virtuous_Sel Escalado.png');
        this.load.image('protagonist', 'Assets/SelectionWheel/Protagonist_Sel Escalado.png');
        //Textos del menu
        this.load.image('text', 'Assets/SelectionWheel/SelectionText.png')
        
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
        let logicPanel = this.add.image(this.game.config.width / 2 , this.game.config.height/3.2 , 'logic').setScale(0.5);
        let defenderPanel = this.add.image(this.game.config.width-263 , this.game.config.height/1.82 , 'defender').setScale(0.5);
        let virtuousPanel = this.add.image(this.game.config.width-540 , this.game.config.height/1.8 , 'virtuous').setScale(0.5);
        let protagonistPanel = this.add.image(this.game.config.width/2 , this.game.config.height-121 , 'protagonist').setScale(0.5);
        
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

        // Agregar un evento de clic a la imagen
        logicPanel.on('pointerdown', () => {
            console.log("has elegido a Logica");
            this.returnToGame();
        });
        // Agregar un evento de clic a la imagen
        defenderPanel.on('pointerdown', function () {
            console.log("Has elegido a Defensor");
            this.returnToGame();
        },this);
        // Agregar un evento de clic a la imagen
        virtuousPanel.on('pointerdown', function () {
            console.log("Has elegido a Virtuoso");
            this.returnToGame();
        },this);
        // Agregar un evento de clic a la imagen
        protagonistPanel.on('pointerdown', function () {
            console.log("Has elegido a Protagonista");
            this.returnToGame();
        },this);

        // Método init para recibir los datos pasados desde la escena origen
        /*init(data) 
        {
        console.log(data.data); // Accediendo al dato pasado desde la escena origen
        // Puedes hacer lo que necesites con el dato recibido aquí dentro de init()
        }*/
    }
    

    //Metodo para volver al juego de nuevo (simpre y cuando el jugador este en este menu de seleccion)
    returnToGame(){ 
        this.scene.resume('MainScene');
        this.scene.stop();
        console.log("Cambio de escena...");
    }
    //Metodo update
    update(){
        if(this.cursors.control.isDown){
           this.returnToGame();
        }
    }


}
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
        this.load.image('logic', 'Assets/SelectionWheel/Logic_Sel.png');
        this.load.image('defender', 'Assets/SelectionWheel/Defender_Sel.png');
        this.load.image('virtuous', 'Assets/SelectionWheel/Virtuous_Sel.png');
        this.load.image('protagonist', 'Assets/SelectionWheel/Protagonist_Sel.png');
        
        //Configuramos input de las teclas
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    create(){
        //Background
        // Crear un rectángulo de tamaño de la venmtana de juego
        const rect = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x1C70A7);
        rect.setOrigin(0, 0); // Establecer el origen en la esquina superior izquierda
 
        //Añadimos rueda de selección
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'wheel').setScale(0.5,0.5);
        //Añadimos partes grises (partes no seleccionables)
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'down').setScale(0.5,0.5);
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'left').setScale(0.5,0.5);
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'right').setScale(0.5,0.5);
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'up').setScale(0.5,0.5);
        //Añadimos parte de seleccion de personaje
        this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'logic').setScale(0.5,0.5);
        //this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'defender').setScale(0.5,0.5);
        //this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'virtuous').setScale(0.5,0.5);
        //this.add.image(this.game.config.width/2 , this.game.config.height/1.8 , 'protagonist').setScale(0.5,0.5);

       
        
    }
    //Metodo para volver al juego de nuevo (simpre y cuando el jugador este en este menu de seleccion)
    returnToGame(){ 
        this.scene.pause();
        this.scene.resume('MainScene');
        
        console.log("Cambio de escena...");
    }
    //Metodo update
    update(){
        if(this.cursors.left.isDown){
           this.returnToGame();
        }
    }


}
import Player from './Characters/player.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.cursors = null;
        this.groundLayer = null;
    }

    preload() {
        //Elementos del escenario
        this.load.image('background1', 'Assets/Mapa/Img/CapaFondo.png'); 
        this.load.image('suelos', 'Assets/Mapa/Img/CapaSuelos.png'); 
        this.load.image('ground', 'Assets/WebPage/Img/groundInvisible.png');
        this.load.image('potion', 'Assets/Objetos/PocionLanzable.png' );
        this.load.image('turret', 'Assets/Objetos/Torreta.png');
        this.load.image('bullet', 'Assets/Objetos/Bala.png');
        //Animaciones de Logica
        this.load.spritesheet('logic_idle', 'Assets/Characters/Logic_Idle.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_jump', 'Assets/Characters/Logic_Jump.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_move', 'Assets/Characters/Logic_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_attack', 'Assets/Characters/Logic_Attack.png',{frameWidth: 300 , frameHeight: 300 });

        this.load.tilemapTiledJSON('mapa', 'Assets/Mapa/JSON/Tutorial.json');
    }
    // Método llamado cuando el jugador colisiona con el punto de cambio
    onOverlapChangeScene(player, changeScenePoint) {
        this.scene.start('Nivel2'); // Cambia a la nueva escena
    }
    create() {
        // Dimensiones y configuración del juego
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        // Configuración del fondo y otros elementos de la escena
        let background = this.add.image(gameWidth / 2, gameHeight / 2, 'background1').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
        let suelos = this.add.image(gameWidth / 2, gameHeight / 2, 'suelos').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        // Configuración del mapa y las capas de colisiones
        var mapa = this.make.tilemap({ key: 'mapa' });
        var capaColisiones = mapa.getObjectLayer('Capa de Objetos 1');

        // Creación del suelo
        this.groundLayer = this.physics.add.staticGroup();
        capaColisiones.objects.forEach(objeto => {
            var colisionObject = this.add.rectangle(objeto.x / 2, objeto.y / 2, objeto.width / 2, objeto.height / 2).setOrigin(0, 0);
            this.physics.world.enable(colisionObject);
            colisionObject.body.setCollideWorldBounds(true);
            this.groundLayer.create(colisionObject.x, colisionObject.y, 'ground').setOrigin(0, 0).setDisplaySize(colisionObject.width, colisionObject.height).refreshBody();
            colisionObject.destroy();
        });

        // Configuración de la gravedad
        this.physics.world.gravity.y = 700;

        // Creación y configuración del jugador
        this.player = new Player(this, 100, 250, 280, 10, null, 'l');
        this.player.startAnimation();
        this.player.setScale(0.18, 0.18);
        this.physics.add.collider(this.player, this.groundLayer); // Colisión entre el jugador y el suelo

        // Configuración de la cámara
        let camera = this.cameras.main;
        camera.setBounds(0, 0, gameWidth, gameHeight);
        camera.startFollow(this.player);
        camera.setZoom(1.4);


        // Creación del punto de cambio de escena
        this.changeScenePoint = this.add.rectangle(100, 100, 100, 100, 0x0000ff, 0); // x, y, width, height son los parámetros de la posición y tamaño
        this.physics.add.existing(this.changeScenePoint, true); // 'true' hace que sea estático

        // Configuración de la colisión entre el jugador y el punto de cambio
        this.physics.add.overlap(this.player, this.changeScenePoint, this.onOverlapChangeScene, null, this);

        //Metodo asociado al resume de esta escena, con los parametros scene y el id actual del jugador
         this.events.on('resume', (scene , id) =>{
            //Llama al metodo de confirmar cambios ubicado en el player
            this.player.confirmChange(id);
        });
    }

     //Metodo para cambiar al menu de seleccion (llamado a traves del input del jugador)
     changeToSelection(){
        //Pausamos el menu de juego...
        this.scene.pause();
        //Vamos al menu de seleccion
        this.scene.launch('SelectionMenu');
        console.log("Estas en el menú de cambio de personaje...");
    }

    update() {
    
    }
}

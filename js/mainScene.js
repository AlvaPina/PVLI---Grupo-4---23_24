import Player from './Characters/player.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.cursors = null;
    }

    preload() {
        this.load.image('background', 'Assets/Mapa/Img/CapaFondo.png'); 
        this.load.image('suelos', 'Assets/Mapa/Img/CapaSuelos.png'); 
        this.load.image('ground', 'Assets/WebPage/Img/groundInvisible.png');
        this.load.image('potion', 'Assets/Objetos/PocionLanzable.png' );
        this.load.spritesheet('logic_idle', 'Assets/Characters/Logic_Idle.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_jump', 'Assets/Characters/Logic_Jump.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_move', 'Assets/Characters/Logic_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_attack', 'Assets/Characters/Logic_Attack.png',{frameWidth: 300 , frameHeight: 300 });
        this.load.tilemapTiledJSON('mapa', 'Assets/Mapa/JSON/Tutorial.json');
    }

    create() {
         // Dimensiones del juego
        const gameWidth = this.game.config.width; // Ancho del juego
        const gameHeight = this.game.config.height; // Alto del juego

         // Fondo
        let background = this.add.image(gameWidth / 2, gameHeight / 2, 'background'); 
        background.setOrigin(0.5, 0.5); // Centra la imagen
        background.setScale(0.5, 0.5);

        let suelos = this.add.image(gameWidth / 2, gameHeight / 2, 'suelos'); 
        suelos.setOrigin(0.5, 0.5); // Centra la imagen
        suelos.setScale(0.5, 0.5);
      
        //JSON
        var mapa = this.make.tilemap({ key: 'mapa' });
        var capaColisiones = mapa.getObjectLayer('Capa de Objetos 1');

        //Creamos el suelo
        let ground = this.physics.add.staticGroup();

        capaColisiones.objects.forEach(function (objeto) {
            var colisionObject = this.add.rectangle(objeto.x/2, objeto.y/2, objeto.width/2, objeto.height/2);
            colisionObject.setOrigin(0,0);
            this.physics.world.enable(colisionObject);
            colisionObject.body.setCollideWorldBounds(true);

            // Creamos el objeto ground en la misma posición y tamaño que la colisionObject
            ground.create(colisionObject.x, colisionObject.y, 'ground').setOrigin(0,0).setDisplaySize(colisionObject.width, colisionObject.height).refreshBody();
            //destruimos colisionObject
            colisionObject.destroy();
        }, this);

        // Configurar la gravedad
        this.physics.world.gravity.y = 700;

        //refreshBody() -> Para detectar colisiones con el player
        //Creamos los suelos

        //crear player
        this.player = new Player(this, 100, 250, 160);
        //Empieza animacion
        this.player.startAnimation();
        //Seteamos escala
        this.player.setScale(0.2, 0.2);
        //Añadimos las colisiones entre el player y el suelo
        this.physics.add.collider(this.player,ground);

        //Camara
        let camera = this.cameras.main;
        camera.setBounds(0,0,this.game.config.width,this.game.config.height);
        camera.startFollow(this.player);
        camera.setZoom(1.4);
    }

    update() {
    
    }
}

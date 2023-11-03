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


        // Configurar la gravedad
        this.physics.world.gravity.y = 500;

        //Creamos el suelo
        let ground = this.physics.add.staticGroup();
        //refreshBody() -> Para detectar colisiones con el player
        //Creamos los suelos
        ground.create(50, 390, 'ground').setScale(0.05, 1).refreshBody();
        ground.create(160, 350, 'ground').setScale(0.01, 1).refreshBody();
        ground.create(380, 340, 'ground').setScale(0.01, 0.2).refreshBody();
        
        // Crea el suelo con las coordenadas y la escala
        let suelo = ground.create(200, 390, 'ground').setScale(0.05, 1);

        // Configura el cuerpo de físicas del suelo
        suelo.body.setSize(width, height).setOffset(offsetX, offsetY).setAngle(angle);

        //crear player
        this.player = new Player(this, 100, 250, 160);
        //Empieza animacion
        this.player.startAnimation();
        //Seteamos escala
        this.player.setScale(0.2, 0.2);
        //Añadimos las colisiones entre el player y el suelo
        this.physics.add.collider(this.player,ground);
    }

    update() {
    
    }
}

import Player from './Characters/player.js';

export class Nivel2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel2' });
        // Inicializar variables que se usarán en la escena
        this.player = null;  // Referencia al jugador
        this.cursors = null; // Referencia a los controles
        this.groundLayer = null; // Referencia a la capa del suelo
        this.changeScenePoint = null; // Referencia al punto para cambiar de escena
    }

    preload() {
        // Cargar los recursos necesarios para la escena
        this.load.image('background2', 'Assets/Mapa/Img/MapaCiudad.png');
        this.load.image('potion', 'Assets/Objetos/PocionLanzable.png');
        this.load.image('turret', 'Assets/Objetos/Torreta.png');
        this.load.image('bullet', 'Assets/Objetos/Bala.png');

        // Cargar animaciones de Logica
        this.load.spritesheet('logic_idle', 'Assets/Characters/Logic_Idle.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_jump', 'Assets/Characters/Logic_Jump.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_move', 'Assets/Characters/Logic_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_attack', 'Assets/Characters/Logic_Attack.png', { frameWidth: 300, frameHeight: 300 });

        // Cargar el mapa en formato JSON
        this.load.tilemapTiledJSON('mapa', 'Assets/Mapa/JSON/Mapa2JSON.json');
    }

    create() {
        // Establecer las dimensiones del juego
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        // Configurar el fondo de la escena
        let background = this.add.image(gameWidth / 2, gameHeight / 2, 'background2').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        // Configurar el mapa y las capas de colisiones
        var mapa = this.make.tilemap({ key: 'mapa' });
        var capaColisiones = mapa.getObjectLayer('Capa de Objetos 1');

        // Creación y configuración del jugador
        this.player = new Player(this, 100, 250, 280, 10, null, 'l');
        this.player.startAnimation();
        this.player.setScale(0.18, 0.18);
        this.physics.add.collider(this.player, this.groundLayer); // Colisión entre el jugador y el suelo

        // Crear el suelo básico en línea recta
        this.groundLayer = this.physics.add.staticGroup();
        this.groundLayer.create(gameWidth / 2, gameHeight - 20, 'ground').setScale(gameWidth / 64, 1).refreshBody(); // Ajustar el tamaño del suelo

        // Configurar la colisión entre el jugador y el suelo
        this.physics.add.collider(this.player, this.groundLayer);

        // Configurar la cámara para seguir al jugador
        let camera = this.cameras.main;
        camera.setBounds(0, 0, gameWidth, gameHeight);
        camera.startFollow(this.player);
        camera.setZoom(1.4);

        // Crear el punto de cambio de escena
        this.changeScenePoint = this.add.rectangle(gameWidth - 100, gameHeight / 2, 100, gameHeight, 0x0000ff, 0); // Ajustar la posición y tamaño
        this.physics.add.existing(this.changeScenePoint, true); // Hacerlo estático

        // Configurar la colisión para cambiar de escena
        this.physics.add.overlap(this.player, this.changeScenePoint, this.onOverlapChangeScene, null, this);
    }

    // Método para crear las animaciones del jugador
    createPlayerAnimations() {
        this.anims.create({
            key: 'l_idle',
            frames: this.anims.generateFrameNumbers('logic_idle', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        // Agregar aquí más animaciones según sea necesario
    }

    // Método llamado cuando el jugador colisiona con el punto de cambio de escena
    onOverlapChangeScene(player, changeScenePoint) {
        this.scene.start('Nivel3'); // Cambiar a la escena 'Nivel3'
    }

    update() {
        // Lógica de actualización para cada frame
    }
}

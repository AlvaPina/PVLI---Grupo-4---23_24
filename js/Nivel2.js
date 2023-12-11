import Player from './Characters/player.js';
export class Nivel2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel2' });
        this.player = null;
        this.cursors = null;
        this.groundLayer = null;
        this.changeScenePoint = null;
    }

    preload() {
        //Elementos del escenario
        this.load.image('background2', 'Assets/Mapa/Img/MapaCiudad.png');
        this.load.image('potion', 'Assets/Objetos/PocionLanzable.png');
        //Animaciones de Logica
        this.load.spritesheet('logic_idle', 'Assets/Characters/Logic_Idle.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_jump', 'Assets/Characters/Logic_Jump.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_move', 'Assets/Characters/Logic_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_attack', 'Assets/Characters/Logic_Attack.png', { frameWidth: 300, frameHeight: 300 });

        this.load.tilemapTiledJSON('mapa', 'Assets/Mapa/JSON/Tutorial.json');
    }

    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        // Configuración del fondo y otros elementos de la escena
        let background = this.add.image(gameWidth / 2, gameHeight / 2, 'background2').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        // Creación y configuración del jugador
        this.player = new Player(this, 100, 250, 160); // Ajusta la posición según sea necesario
        this.player.startAnimation();
        this.player.setScale(0.2, 0.2);

        // Creación del suelo básico en línea recta
        this.groundLayer = this.physics.add.staticGroup();
        this.groundLayer.create(gameWidth / 2, gameHeight - 20, 'ground').setScale(gameWidth / 64, 1).refreshBody(); // Ajusta según el tamaño de tu imagen 'ground'

        // Colisión entre el jugador y el suelo
        this.physics.add.collider(this.player, this.groundLayer);

        // Configuración de la cámara
        let camera = this.cameras.main;
        camera.setBounds(0, 0, gameWidth, gameHeight);
        camera.startFollow(this.player);
        camera.setZoom(1.4);

        // Creación del punto de cambio de escena
        this.changeScenePoint = this.add.rectangle(gameWidth - 100, gameHeight / 2, 100, gameHeight, 0x0000ff, 0); // Ajusta según la posición deseada
        this.physics.add.existing(this.changeScenePoint, true);

        // Configuración de la colisión para cambiar de escena
        this.physics.add.overlap(this.player, this.changeScenePoint, this.onOverlapChangeScene, null, this);
    }

    // Método llamado cuando el jugador colisiona con el punto de cambio
    onOverlapChangeScene(player, changeScenePoint) {
        this.scene.start('MainScene'); // Cambia a la escena MainScene
    }

    update() {
        // Lógica de actualización para cada frame
    }
}


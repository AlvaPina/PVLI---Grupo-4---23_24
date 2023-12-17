import Player from './Characters/player.js';
export class Nivel4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel4' });
        this.player = null;
        this.cursors = null;
        this.groundLayer = null;
        this.changeScenePoint = null;
    }

    preload() {

        this.load.tilemapTiledJSON('mapa', 'Assets/Mapa/JSON/Mapa4JSON.json');
    }
    // M�todo llamado cuando el jugador colisiona con el punto de cambio
    onOverlapChangeScene(player, changeScenePoint) {
        this.scene.start('MainScene'); // Cambia a la escena MainScene
    }
    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        // Configuraci�n del fondo y otros elementos de la escena
        let background = this.add.image(gameWidth / 2, gameHeight / 2, 'background4').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        // Configuración del mapa y las capas de colisiones
        var mapa = this.make.tilemap({ key: 'mapa' });
        var capaColisiones = mapa.getObjectLayer('Capa de Objetos 1');

        // Creación y configuración del jugador
        this.player = new Player(this, 100, 250, 280, 10, null, 'l');
        this.player.startAnimation();
        this.player.setScale(0.18, 0.18);
        this.physics.add.collider(this.player, this.groundLayer); // Colisión entre el jugador y el suelo

        // Creaci�n del suelo b�sico en l�nea recta
        this.groundLayer = this.physics.add.staticGroup();
        this.groundLayer.create(gameWidth / 2, gameHeight - 20, 'ground').setScale(gameWidth / 64, 1).refreshBody(); // Ajusta seg�n el tama�o de tu imagen 'ground'

        // Colisi�n entre el jugador y el suelo
        this.physics.add.collider(this.player, this.groundLayer);

        // Configuraci�n de la c�mara
        let camera = this.cameras.main;
        camera.setBounds(0, 0, gameWidth, gameHeight);
        camera.startFollow(this.player);
        camera.setZoom(1.4);

        // Creaci�n del punto de cambio de escena
        this.changeScenePoint = this.add.rectangle(gameWidth - 100, gameHeight / 2, 100, gameHeight, 0x0000ff, 0); // Ajusta seg�n la posici�n deseada
        this.physics.add.existing(this.changeScenePoint, true);

        // Configuraci�n de la colisi�n para cambiar de escena
        this.physics.add.overlap(this.player, this.changeScenePoint, this.onOverlapChangeScene, null, this);
    }



    update() {
        // L�gica de actualizaci�n para cada frame
    }
}


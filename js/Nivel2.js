import Player from './Characters/player.js';
import Puton from './Characters/Enemy/puton.js';
import Problemas from './Characters/Enemy/problemas.js';

export class Nivel2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel2' });
        this.player = null;  // Referencia al jugador
        this.cursors = null; // Referencia a los controles
        this.groundLayer = null; // Referencia a la capa del suelo
        this.changeScenePoint = null; // Referencia al punto para cambiar de escena
    }

    init(data) {
        // Recibir datos del jugador (vida, spriteId, etc.)
        this.previousSpriteId = data.player.spriteId;
        this.previousLives = data.player.getLives();
    }

    preload() {
        // Cargar recursos si es necesario
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
        this.player = new Player(this, 100, 250, 280, this.previousLives, null, this.previousSpriteId);
        this.player.startAnimation();
        this.player.setScale(0.18, 0.18);

        // Crear el suelo básico en línea recta
        this.groundLayer = this.physics.add.staticGroup();
        capaColisiones.objects.forEach(objeto => {
            var colisionObject = this.add.rectangle(objeto.x / 2, objeto.y / 2, objeto.width / 2, objeto.height / 2).setOrigin(0, 0);
            this.physics.world.enable(colisionObject);
            colisionObject.body.setCollideWorldBounds(true);
            this.groundLayer.create(colisionObject.x, colisionObject.y, 'ground').setOrigin(0, 0).setDisplaySize(colisionObject.width, colisionObject.height).refreshBody();
            colisionObject.destroy();
        });

        // Configurar la colisión entre el jugador y el suelo
        this.physics.add.collider(this.player, this.groundLayer);

        // Configurar la cámara para seguir al jugador
        let camera = this.cameras.main;
        camera.setBounds(0, 0, gameWidth, gameHeight);
        camera.startFollow(this.player);
        camera.setZoom(1.4);

        // Crear el punto de cambio de escena
        this.changeScenePoint = this.add.rectangle(gameWidth, gameHeight / 2, 100, 200, 0x0000ff, 0); // Ajustar la posición y tamaño
        this.physics.add.existing(this.changeScenePoint, true); // Hacerlo estático

        // Configurar la colisión para cambiar de escena
        this.physics.add.overlap(this.player, this.changeScenePoint, this.onOverlapChangeScene, null, this);

        // Creación de enemigos
        this.enemiesGroup = this.physics.add.group();

        this.enemigo1 = new Puton(this, 200, 250);
        this.enemigo1.setScale(0.15, 0.15);
        this.physics.add.collider(this.enemigo1, this.groundLayer);
        this.enemiesGroup.add(this.enemigo1);

        
    }

    // Método llamado cuando el jugador colisiona con el punto de cambio de escena
    onOverlapChangeScene(player, changeScenePoint) {
        this.scene.start('Nivel3', { player: this.player }); // Cambiar a la escena 'Nivel3'
    }

    // Método para cambiar al menú de selección
    changeToSelection() {
        // Pausamos el menú de juego...
        this.scene.pause();
        // Vamos al menú de selección
        this.scene.launch('SelectionMenu', { scene: this });
        console.log("Estas en el menú de cambio de personaje...");
    }

    update() {
        // Lógica de actualización para cada frame
    }

    // Método para obtener todos los enemigos del nivel
    getEnemies() {
        return this.enemiesGroup.getChildren();
    }
}

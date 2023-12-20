import Player from './Characters/player.js';
import Puton from './Characters/Enemy/puton.js';

export class Nivel3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel3' });
        this.player = null;
        this.groundLayer = null;
        this.changeScenePoint = null;
        this.enemiesGroup = null;
    }

    init(data) {
        this.previousSpriteId = data.player.spriteId;
        this.previousLives = data.player.getLives();
    }

    preload() {
    }

    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        let background = this.add.image(gameWidth / 2, gameHeight / 2, 'background3').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        var mapa = this.make.tilemap({ key: 'mapa3' });
        var capaColisiones = mapa.getObjectLayer('Capa de Objetos 1');

        this.groundLayer = this.physics.add.staticGroup();
        capaColisiones.objects.forEach(objeto => {
            var colisionObject = this.add.rectangle(objeto.x / 2, objeto.y / 2, objeto.width / 2, objeto.height / 2).setOrigin(0, 0);
            this.physics.world.enable(colisionObject);
            colisionObject.body.setCollideWorldBounds(true);
            this.groundLayer.create(colisionObject.x, colisionObject.y, 'ground').setOrigin(0, 0).setDisplaySize(colisionObject.width, colisionObject.height).refreshBody();
            colisionObject.destroy();
        });

        this.player = new Player(this, 100, 250, 280, this.previousLives, this.previousSpriteId);
        this.player.startAnimation();
        this.player.setScale(0.18, 0.18);
        this.physics.add.collider(this.player, this.groundLayer);

        let camera = this.cameras.main;
        camera.setBounds(0, 0, gameWidth, gameHeight);
        camera.startFollow(this.player);
        camera.setZoom(1.4);

        this.changeScenePoint = this.add.rectangle(gameWidth - 100, gameHeight / 2, 100, gameHeight, 0x0000ff, 0);
        this.physics.add.existing(this.changeScenePoint, true);

        this.physics.add.overlap(this.player, this.changeScenePoint, this.onOverlapChangeScene, null, this);

        this.enemiesGroup = this.physics.add.group();
        this.createEnemies(); // Esta función debe crearse para agregar enemigos específicos del nivel
    }

    createEnemies() {
        // Aquí puedes agregar la lógica para crear enemigos específicos de este nivel
    }

    onOverlapChangeScene(player, changeScenePoint) {
        this.scene.start('Nivel4', { player: this.player });
    }

    update() {
        // Lógica de actualización
    }

    getEnemies() {
        return this.enemiesGroup.getChildren();
    }
    //Metodo para ir al menu de GameOver
    GameOver() {
        this.player.lifeComp.Die();
        this.scene.stop('MainScene');
        this.scene.start('GameOver');
        console.log("Has muerto D:");
    }
    changeToSelection() {
        //Pausamos el menu de juego...
        this.scene.pause();
        //Vamos al menu de seleccion
        this.scene.launch('SelectionMenu', { scene: this });
        console.log("Estas en el menú de cambio de personaje...");
    }
}

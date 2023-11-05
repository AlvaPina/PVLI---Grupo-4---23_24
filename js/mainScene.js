import Player from './Characters/player.js';
import Proyectile from './Objetos/PocionLanzable.js';
export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.cursors = null;
        this.projectiles = null;
    }

    preload() {

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

        //crear player
        this.player = new Player(this, 100, 250, 160);
        //Empieza animacion
        this.player.startAnimation();
        //Seteamos escala
        this.player.setScale(0.2, 0.2);

        //------------------------------- Colisiones 
        //Añadimos las colisiones entre el player y el suelo
        this.physics.add.collider(this.player, ground);
        // Grupo para los proyectiles
        this.projectiles = this.physics.add.group({
            classType: Proyectile
        });
        // Collider entre proyectiles y el suelo
        this.physics.add.collider(this.projectiles, ground, this.handlePotionHitGround, null, this);
    }

    handlePotionHitGround(potion, ground) {
        // Aquí se puede colocar una animación antes de la destrucción.
        //potion.playDestroyAnimation(); // Método ficticio que se deberá implementar en Proyectile
        potion.destroy();
    }

    update() {
    
    }
}

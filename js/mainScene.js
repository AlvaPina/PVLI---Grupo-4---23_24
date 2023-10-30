import Player from './Characters/player.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.cursors = null;
    }

    preload() {
        this.load.image('background', 'Assets/WebPage/Img/background.png'); 
        this.load.image('ground', 'Assets/WebPage/Img/ground.png');
        this.load.image('potion', 'Assets/Objetos/PocionLanzable.png' );
        this.load.spritesheet('logic_idle', 'Assets/Characters/Logic_Idle.png', { frameWidth: 96, frameHeight: 100 });
        this.load.spritesheet('logic_jump', 'Assets/Characters/Logic_Jump.png', { frameWidth: 96, frameHeight: 100 });
        this.load.spritesheet('logic_move', 'Assets/Characters/Logic_Move.png', { frameWidth: 96, frameHeight: 100 });
    }

    create() {
        this.add.image(400, 300, 'background'); // Ajusta las coordenadas seg�n necesites

        // Configurar la gravedad
        this.physics.world.gravity.y = 300;

        // Crear el suelo
        let ground = this.physics.add.staticGroup();
        ground.create(400, 568, 'ground').setScale(2).refreshBody(); // Asumiendo que tienes una imagen para el suelo

        //crear player
        this.player = new Player(this, 100, 250);
        //Empieza animacion
        this.player.startAnimation();
        //Seteamos escala
        this.player.setScale(3,3);
        // Dentro de tu escena de Phaser
        //this.debug.graphic(this.player, { fillStyle: { color: 0xff0000 } });
    }

    update() {
        // Input del Jugador
        /*if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if ((this.cursors.up.isDown || this.cursors.space.isDown) /*&& this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            console.log("Salto");
        }*/
    }

    /*ataqueIzquierdo() {
        // L�gica del ataque izquierdo
        console.log("Ataque izquierdo activado");
    }

    ataqueDerecho() {
        // L�gica del ataque derecho
        console.log("Ataque derecho activado");
        d
    }*/
}

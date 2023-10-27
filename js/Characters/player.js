import Proyectile from '../Objetos/PocionLanzable.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de la física del jugador
        //this.setBounce(0.2);
        this.setCollideWorldBounds(true);

		// Configurar entradas del teclado
		this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

         // Eventos de raton
         scene.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.ataqueIzquierdo();
            } else if (pointer.rightButtonDown()) {
                this.ataqueDerecho();
            }
        });
    }
    startAnimation() {
        this.anims.create({
            key: 'player_idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.load('player_idle');
        this.play('player_idle');
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.playerInput();
    }

    playerInput(){
        // Input del Jugador
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
        } else {
            this.setVelocityX(0);
        }

        if ((this.cursors.space.isDown) /*&& this.body.touching.down*/) {
            this.setVelocityY(-330);
            console.log("Salto");
        } 
    }

    ataqueIzquierdo() {
        console.log("Ataque izquierdo activado");
    }

    ataqueDerecho() {
        console.log("Ataque derecho activado");
        new Proyectile(this.scene, this.x, this.y, 'potion');
    }
}

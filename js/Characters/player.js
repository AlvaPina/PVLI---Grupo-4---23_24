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
        // Animación de Idle
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('logic_idle', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        // Animación de Salto
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('logic_jump', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        // Animación de Movimiento
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('logic_move', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.load('idle');
        this.play('idle');
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.playerInput();

        // Gestión de animaciones
        if (!this.body.touching.down) {
            this.play('jump', true);
            console.log("ASalto");
        } 
        else if (this.body.velocity.x !== 0) {
            this.play('move', true);
            console.log("AMovimiento");
        } 
        else {
            this.play('idle', true);
            console.log("Aidle");
        }
    }


    playerInput() {
        if ((this.cursors.space.isDown && this.cursors.up.isDown) /*&& this.body.touching.down*/) {
            this.setVelocityY(-330);
            console.log("Salto");
        } 
        // Input del Jugador
        else if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
            this.play('move', true);
            console.log("AMovimiento");
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            this.play('move', true);
            console.log("AMovimiento");
        }

        else {
            this.setVelocityX(0);
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

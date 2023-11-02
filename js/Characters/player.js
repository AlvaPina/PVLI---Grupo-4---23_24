import Proyectile from '../Objetos/PocionLanzable.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed) {
        super(scene, x, y, speed , 'player');
        //Instanciamos personaje en escena
        scene.add.existing(this);
        //Añadimos físicas
        scene.physics.add.existing(this);
        this.setTexture('logic_idle');

        // Obtener el tamaño del frame para hacer collider
        //var width_frame = this.frame.width;
        //var height_frame = this.frame.height;

        // Ajustar el collider
        this.body.setSize(this.frame.width, this.frame.height);

        // Configuración de la física del jugador
        this.setCollideWorldBounds(true);

        this.isAttack=false;
		// Configurar entradas del teclado
		this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        //determina si esta atacando o no
        this.isAttack = false;
        //determina direccion
        this.dir = 1;
        // Eventos de raton
        this.scene.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.isAttack = true;
                this.attack();
            }
        });
        
    }
    startAnimation() {
        // Animación de Idle
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('logic_idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        // Animación de Salto
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('logic_jump', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        // Animación de Movimiento
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('logic_move', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        //Animacion de ataque
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('logic_attack', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.load('idle');
        this.play('idle');
    }
   
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        //detectamos input
        this.playerInput();
        if(this.isAttack === true) thiss.play('attack');
        if(this.body.touching.down === false) this.play('jump', true);
    }


    playerInput() {
        //Input para salto (Comprobamos si toca el suelo o no)
        if (this.cursors.space.isDown && this.body.touching.down) {
            this.setVelocityY(300 * -1);
            this.play('jump',true);
            console.log("Salto");
        } 
        // Input del Jugador
        //Izquierda
        if (this.cursors.left.isDown && !this.isAttack) {
            this.dir = -1; 
            this.setVelocityX(160 * this.dir);
			this.setFlip(true, false);
            this.play('move', true);
            console.log("Izquierda");
        }
        //Derecha
        else if (this.cursors.right.isDown && !this.isAttack) {
            this.dir = 1;
            this.setVelocityX(160 * this.dir);
            this.setFlip(false,false);
            this.play('move', true);
            console.log("Derecha");
        }
        //Si no hay input, idle
        else {
            this.setVelocityX(0);
            this.play('idle', true);
        }
    }
    attack() {
        //if(this.sprite.flipX) new Proyectile(this.scene, this.x, this.y, 'potion', -1);
        //else new Proyectile(this.scene, this.x, this.y, 'potion', 1);
        new Proyectile(this.scene, this.x, this.y, 'potion', 1);
        console.log("Ataque activado");
        this.isAttack=false;
    }
}

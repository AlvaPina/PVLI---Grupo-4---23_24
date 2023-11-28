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
        this.anims.load('l_idle');
        this.play('l_idle');
    }
   
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        //detectamos input
        this.playerInput();
        if(this.isAttack === true) thiss.play('l_attack');
        if(this.body.touching.down === false) this.play('l_jump', true);
    }


    playerInput() {
        //Input para salto (Comprobamos si toca el suelo o no)
        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.body.touching.down) {
            this.setVelocityY(300 * -1);
            this.play('l_jump',true);
            console.log("Salto");
        } 
        // Input del Jugador
        //Izquierda
        if (this.cursors.left.isDown && !this.isAttack) {
            this.dir = -1; 
            this.setVelocityX(160 * this.dir);
			this.setFlip(true, false);
            this.play('l_move', true);
            console.log("Izquierda");
        }
        //Derecha
        else if (this.cursors.right.isDown && !this.isAttack) {
            this.dir = 1;
            this.setVelocityX(160 * this.dir);
            this.setFlip(false,false);
            this.play('l_move', true);
            console.log("Derecha");
        }
        //Si no hay input, idle
        else {
            this.setVelocityX(0);
            this.play('l_idle', true);
        }
    }
    attack() {
        // Obtener el vector de velocidad actual del jugador
        let velocityVector = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y);

        // Normalizar el vector si el jugador está quieto (para que el proyectil no se quede estático)
        if (velocityVector.length() === 0) {
            velocityVector = new Phaser.Math.Vector2(this.dir, 0);
        }

        new Proyectile(this.scene, this.x, this.y, 'potion', velocityVector);
        console.log("Ataque activado");
        this.isAttack = false;
    }


}

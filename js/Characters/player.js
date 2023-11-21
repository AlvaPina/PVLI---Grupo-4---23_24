import Proyectile from '../Objetos/PocionLanzable.js';
import LifeComponent from '../LifeComponent.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed, iniLives, maxLives) {
        super(scene, x, y, speed, 'player');
        //Instanciamos personaje en escena
        scene.add.existing(this);
        //Añadimos físicas
        scene.physics.add.existing(this);
         // Asignamos el spriteSheet al objeto
        this.setTexture('logic_idle');

        // Obtener el tamaño del frame para hacer collider
        var width_frame = this.frame.width;
        var height_frame = this.frame.height;

        // Ajustar el collider
        this.body.setSize(width_frame, height_frame);

        // Configuración de la física del jugador
        this.setCollideWorldBounds(true);

		// Configurar entradas del teclado
		this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        this.isAttack = false;
        // Eventos de raton
        this.scene.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.isAttack = true;
                this.attack();
                this.isAttack = false;
            }
        });
        this.LifeComponent = new LifeComponent(iniLives,maxLives);
        
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
            frames: this.anims.generateFrameNumbers('logic_jump', { start: 0, end: 3 }),
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
    }


    playerInput() {
        //Input para salto (Comprobamos si toca el suelo o no)
        if (this.cursors.space.isDown && this.body.touching.down) {
            this.setVelocityY(300 * -1);
            console.log("Salto");
        } 
        // Input del Jugador
        //Izquierda
        if (this.cursors.left.isDown && !this.isAttack) { 
            this.setVelocityX(160 * -1);
			this.setFlip(true, false);
            this.play('move', true);
            console.log("Izquierda");
        }
        //Derecha
        else if (this.cursors.right.isDown && !this.isAttack) {
            this.setVelocityX(160 * 1);
            this.setFlip(false,false);
            this.play('move', true);
            console.log("Derecha");
        }
        else if(this.isAttack){
            this.play('attack', true);
        }
        //Si no hay input, idle
        else {
            this.setVelocityX(0);
            this.play('idle', true);
        }
    }
    attack() {
        new Proyectile(this.scene, this.x, this.y, 'potion');
        console.log("Ataque activado");
    }

    recieveDamage(damage){
        this.LifeComponent.Damage(damage);
    }
    
}

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.cursors = null;
    }

    preload() {
        this.load.image('background', 'Assets/WebPage/Img/background.png'); 
        this.load.image('player', 'Assets/WebPage/Img/player.png'); 
        this.load.image('ground', 'Assets/WebPage/Img/ground.png'); 
    }

    create() {
        this.add.image(400, 300, 'background'); // Ajusta las coordenadas según necesites

        // Configurar la gravedad
        this.physics.world.gravity.y = 300;

        // Crear el jugador
        this.player = this.physics.add.sprite(100, 250,'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Crear el suelo
        let ground = this.physics.add.staticGroup();
        ground.create(400, 568, 'ground').setScale(2).refreshBody(); // Asumiendo que tienes una imagen para el suelo

        // Añadir colisión entre el jugador y el suelo
        this.physics.add.collider(this.player, ground);

        // Configurar entradas del teclado
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        // Eventos de ratón
        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.ataqueIzquierdo();
            } else if (pointer.rightButtonDown()) {
                this.ataqueDerecho();
            }
        });

    }

    update() {
        // Movimiento del jugador
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if ((this.cursors.up.isDown || this.cursors.space.isDown) /*&& this.player.body.touching.down*/) {
            this.player.setVelocityY(-330);
            console.log("Salto");
        }
    }

    ataqueIzquierdo() {
        // Lógica del ataque izquierdo
        console.log("Ataque izquierdo activado");
    }

    ataqueDerecho() {
        // Lógica del ataque derecho
        console.log("Ataque derecho activado");
    }
}

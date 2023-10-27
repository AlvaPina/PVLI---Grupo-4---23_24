export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de la física del jugador
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

		// Configurar entradas del teclado
		this.cursors = scene.input.keyboard.createCursorKeys();
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}

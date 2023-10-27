export default class Logic extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de la personalidad Logic
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'logic');

		this.scene.add.existing(this); //Añadimos personaje a la escena

		// Creamos las animaciones de nuestro caballero
		this.scene.anims.create({
			key: 'idle',
			frames: scene.anims.generateFrameNumbers('logic', {start:0, end:3}),
			frameRate: 5,
			repeat: -1
		});
        //La animacion que se ejecutará es 'idle'
        this.play('idle');

        this.setScale(5,5);
	}
    /**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);

		//this.play('idle');
	}
}

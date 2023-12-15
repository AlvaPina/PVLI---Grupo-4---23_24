export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height); // Rectángulo rojo (puedes cambiar el color)
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}
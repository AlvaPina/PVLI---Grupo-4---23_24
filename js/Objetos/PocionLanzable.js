export default class Proyectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, dir) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 8;
        this.setScale(0.05, 0.05);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        this.dir = dir;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.x += this.speed * this.dir;
    }
}

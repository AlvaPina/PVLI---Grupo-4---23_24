class Proyectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, dir) {
        super(scene, x, y, texture, dir);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 15;
        this.setScale(0.1, 0.1);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.x += this.speed;
    }
}

export default Proyectile;

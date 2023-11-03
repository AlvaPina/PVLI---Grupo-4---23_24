class Proyectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocityVector) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Definir la velocidad del proyectil
        this.speed = 700;
        this.velocityVector = velocityVector.normalize().scale(this.speed);

        // Ajusta la gravedad específica para este proyectil si es necesario
        this.body.setGravityY(500); // Ajusta a lo que sea adecuado para tu juego

        // Establecer la velocidad inicial
        this.body.velocity.copy(this.velocityVector);

        this.setScale(0.1, 0.1);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        // Tiempo de vida del proyectil
        this.lifespan = 5000; // 5000 milisegundos o 5 segundos

        // Destruir el proyectil después de su tiempo de vida
        this.setLifeTime(this.lifespan);
    }

    setLifeTime(duration) {
        this.scene.time.delayedCall(duration, this.destroy, [], this);
    }
}

export default Proyectile;


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

        this.setScale(0.05, 0.05);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        // Tiempo de vida del proyectil
        this.lifespan = 5000; // 5000 milisegundos o 5 segundos

        // Destruir el proyectil después de su tiempo de vida
        this.setLifeTime(this.lifespan);
    }

    setLifeTime(duration) {
        this.scene.time.delayedCall(duration, () => {
            this.playDestroyAnimation(); // Cambiar la lógica para la destrucción aquí
        }, [], this);
    }

        // Método para manejar la animación antes de la destrucción
    playDestroyAnimation() {
        // Ejemplo: Suponiendo que tienes una animación llamada 'potion_destroy'
        // this.play('potion_destroy');
        // Esperar a que termine la animación para destruir el objeto, si es necesario
        // this.on('animationcomplete', () => {
        //     this.destroy();
        // });
        
        // O si no hay animación, solo destruir el objeto
        this.destroy();
    }

}

export default Proyectile;


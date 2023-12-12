import SerVivo from "../Characters/serVivo.js";

export default class Proyectile extends SerVivo {
    constructor(scene, x, y, texture, velocityVector) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Definir la velocidad del proyectil
        this.speed = 9;
        this.velocityVector = velocityVector.normalize().scale(this.speed);

        // Establecer la velocidad inicial
        this.body.velocity.copy(this.velocityVector);

        this.setScale(0.05, 0.05);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        // Tiempo de vida del proyectil
        this.lifespan = 5000; // 5000 milisegundos o 5 segundos

        // Destruir el proyectil después de su tiempo de vida
        this.setLifeTime(this.lifespan);

        // Llama a esta función para manejar la colisión con el suelo.
        this.handleCollisionWithGround();
    }

    handleCollisionWithGround() {
        // Obtiene una referencia al suelo de la escena
        const groundLayer = this.scene.groundLayer;

        // Si no hay una capa de suelo, no hacer nada
        if (!groundLayer) return;

        // Añadir colisionador con el suelo
        this.scene.physics.add.collider(this, groundLayer, () => {
            this.destroy(); // Destruye la poción al colisionar con el suelo
        }, null, this);
    }

    setLifeTime(duration) {
        this.scene.time.delayedCall(duration, this.destroy, [], this);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }
}

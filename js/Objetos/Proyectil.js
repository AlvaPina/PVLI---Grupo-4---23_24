import LifeComponent from "../Characters/lifeComponent.js";

export default class Proyectil extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocityVector, damage) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Definir la velocidad del proyectil
        this.speed = 700; // Puedes ajustar la velocidad según necesites

        // Establecer la velocidad del proyectil basada en el vector de velocidad
        this.body.velocity.copy(velocityVector.normalize().scale(this.speed));

        // Configuraciones adicionales
        this.setScale(0.05); // Ajustar la escala si es necesario
        this.setBounce(0.2); // Ajustar el rebote si es necesario
        this.setCollideWorldBounds(true);

        // Tiempo de vida del proyectil
        this.lifespan = 5000; // 5000 milisegundos o 5 segundos

        // Destruir el proyectil después de su tiempo de vida
        this.setLifeTime(this.lifespan);

        // Llama a esta función para manejar la colisión con el suelo.
        this.handleCollisionWithGround();

        // Llama a esta función para manejar la colisión con enemigos.
        this.handleCollisionWithEnemies();

        // Guardar el daño que el proyectil inflige
        this.damage = damage;
    }

    handleCollisionWithGround() {
        // Obtiene una referencia al suelo de la escena
        const groundLayer = this.scene.groundLayer;

        // Si no hay una capa de suelo, no hacer nada
        if (!groundLayer) return;

        // Añadir colisionador con el suelo
        this.scene.physics.add.collider(this, groundLayer, () => {
            this.destroy(); // Destruye el proyectil al colisionar con el suelo
        }, null, this);
    }

    setLifeTime(duration) {
        this.scene.time.delayedCall(duration, this.destroy, [], this);
    }

    handleCollisionWithEnemies() {
        // Obtiene una referencia a los enemigos de la escena
        let enemies = this.scene.getEnemies();

        // Añadir colisionador con los enemigos
        this.scene.physics.add.collider(this, enemies, (proyectil, enemy) => {
            enemy.receiveDamage(this.damage); // Suponiendo que los enemigos tienen un método `receiveDamage`
            this.destroy(); // Destruye el proyectil al colisionar con un enemigo
        });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // Aquí podrías agregar lógica adicional que se ejecute en cada frame, si es necesario
    }
}
